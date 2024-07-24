import { ApolloCache, useLazyQuery, useMutation, gql } from '@apollo/client'
import {
  CONDITIONSV2_QUERY,
  UPDATE_CONDITIONS,
  LOOKUP_QUERY,
  CONDITIONS_DEFINITION_QUERY,
  CREATE_NEW_CONDITION,
  ADD_MEASUREMENT,
} from 'src/modules/conditions/services'
import {
  transformRawConditions,
  transformRawConditionDefinitions,
} from 'src/modules/conditions/utils'
import { NewConditionValues } from 'src/modules/conditions/types'
import { useMember } from 'src/context/member'
import { camelCase } from 'lodash'
import { CACHE_KEYS, getFromCache } from 'src/storage/localstorage-cache'

const API_CONFIG = {
  context: {
    clientName: 'v2',
  },
}

export const useConditionsApi = () => {
  const { member } = useMember()
  const [fetch] = useLazyQuery(CONDITIONSV2_QUERY, API_CONFIG)

  const [fetchLookupsQuery] = useLazyQuery(LOOKUP_QUERY, API_CONFIG)
  const [addMeasurement] = useMutation(ADD_MEASUREMENT, API_CONFIG)
  const [fetchConditionsDefinitionQuery] = useLazyQuery(
    CONDITIONS_DEFINITION_QUERY,
    API_CONFIG
  )

  const updateCache = (
    cache: ApolloCache<any>,
    data: any,
    dataKey: string,
    isAnUpdate: boolean = false
  ) => {
    const conditionData = data[dataKey] || {}
    const { condition = {} } = conditionData

    const existingCondition: any = cache.readQuery({
      query: CONDITIONSV2_QUERY,
      variables: { antaraId: member?.antaraId },
      ...API_CONFIG,
    })

    let memberConditions = []

    if (isAnUpdate) {
      // replace the exisitng condition with the updated condition
      memberConditions = existingCondition?.memberConditions?.map((c: any) => {
        if (
          c?.conditionDefinition?.conditionDefinitionId ===
          condition?.conditionDefinition?.conditionDefinitionId
        ) {
          return condition
        }

        return c
      })
    } else {
      memberConditions = [...existingCondition.memberConditions, condition]
    }

    cache.writeQuery({
      query: CONDITIONSV2_QUERY,
      variables: { antaraId: member?.antaraId },
      ...API_CONFIG,
      data: {
        memberConditions,
      },
    })
  }

  const [mutate] = useMutation(UPDATE_CONDITIONS, {
    ...API_CONFIG,
    refetchQueries: [
      {
        query: CONDITIONSV2_QUERY,
        context: { clientName: 'v2' },
        variables: { antaraId: member?.antaraId },
      },
    ],
    update: (cache, { data = {} }) =>
      updateCache(cache, data, 'updateCondition', true),
  })

  /** Support refetching conditions after update */
  const [createCondition] = useMutation(CREATE_NEW_CONDITION, {
    ...API_CONFIG,
    update: (cache, { data = {} }) => {
      return updateCache(cache, data, 'addCondition')
    },
    refetchQueries: [
      {
        query: CONDITIONSV2_QUERY,
        context: { clientName: 'v2' },
        variables: { antaraId: member?.antaraId },
      },
    ],
  })

  const fetchConditionsDefinitionsAPI = async () => {
    const { data } = await fetchConditionsDefinitionQuery()

    return transformRawConditionDefinitions(
      data?.conditionDefinitions?.edges?.map((item: any) => item.node) || []
    )
  }

  const fetchConditionsDefinitions = async () => getFromCache(CACHE_KEYS.CONDITION_DEFINITIONS, fetchConditionsDefinitionsAPI)

  const fetchLookupsAPI = async () => {
    const { data } = await fetchLookupsQuery()

    return Object.keys(data).reduce((acc: any, key) => {
      acc[key] = data[key]?.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))
      return acc
    }, {})
  }

  const fetchLookups = async () => getFromCache(CACHE_KEYS.CONDITION_LOOKUPS, fetchLookupsAPI)

  const throwGraphErrors = (error: any) => {
    const allErrors = error?.graphQLErrors?.map((e: any) => {
      const { extensions } = e
      const eValues = Object.values(extensions?.fields)

      if (Array.isArray(eValues)) {
        return eValues.map((e: any) => Object.values(e).join(', '))
      }

      return eValues
    })

    throw new Error(allErrors.join(', '))
  }

  const fetchConditionsData = async (antaraId: string) => {
    // '22V-K57Q'
    try {
      const { data } = await fetch({ variables: { antaraId } })
      return transformRawConditions(data?.memberConditions || [])
    } catch (error) {
      console.error('Error fetching conditions data:', error)
      throw error
    }
  }

  const updateConditionsData = async (input: any) => {
    try {
      const variables = {
        input,
      }
      return mutate({
        variables,
      })
    } catch (error) {
      return throwGraphErrors(error)
    }
  }

  const createNewCondition = async (input: Partial<NewConditionValues>) => {
    try {
      const variables = {
        input,
      }

      const res = await createCondition({
        variables,
      })

      return res
    } catch (error: any) {
      return throwGraphErrors(error)
    }
  }
  const addMetricsData = async (input: any) => {
    try {
      const variables = {
        input,
      }
      const res = await addMeasurement({
        variables,
      })

      return res
    } catch (error) {
      return throwGraphErrors(error)
    }
  }

  return {
    fetchConditionsData,
    fetchLookups,
    updateConditionsData,
    fetchConditionsDefinitions,
    createNewCondition,
    addMetricsData,
  }
}

export const useLoadMeasurements = (healthMetrics: string[]) => {
  const createMeasurementTemplate = (metric: string) => `
    ${camelCase(metric)}: measurements (
      healthMetric: "${metric}"
      startDateOffset: $startDateOffset
      antaraId: $antaraId
      stopDateOffset: $stopDateOffset
    ) {
      edges {
        node {
          id 
          healthMetric {
            name 
            measurementUnit {
              name
            }
          }
          value 
          createdAt 
          modifiedAt
        }
      }
    }
  `

  // since health metrics are loaded async
  // we use this to prevent the query from breaking
  const PLACEHOLDER_BEFORE_METRICS_LOAD = `
  weight: measurement (
    healthMetric: "Weight"
    startDateOffset: $startDateOffset
    antaraId: $antaraId
    stopDateOffset: $stopDateOffset
    ) {
      edges {
        node {
          id
        }
      }
    }
  `

  const GET_MEASUREMENTS_QUERY = gql`
    query measurements (
      $startDateOffset: DateTime!
      $antaraId: String!
      $stopDateOffset: DateTime!
    ) {
      ${
        healthMetrics.length
          ? healthMetrics.map(createMeasurementTemplate).join('\n')
          : PLACEHOLDER_BEFORE_METRICS_LOAD
      }
      
    }
  `

  const [query] = useLazyQuery(GET_MEASUREMENTS_QUERY, API_CONFIG)
  const { member } = useMember()

  const loadHealthMetrics = async (
    start: string | Date,
    end: string | Date
  ) => {
    if (!member?.antaraId) return

    const { data } = await query({
      variables: {
        antaraId: member.antaraId,
        startDateOffset: start,
        stopDateOffset: end,
      },
    })

    return data
  }

  return {
    loadHealthMetrics,
  }
}
