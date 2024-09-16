import { useMember } from 'src/context/member'
import dayjs from 'dayjs'
import {
  GET_CLUSTERS_BY_PANEL,
  GET_AGGREGATED_METRICS,
  GET_AGGREGATED_BP_METRICS,
  GET_CHL_MEASUREMENTS,
  GET_BS_AGGREGATES,
  GET_REFERENCE_RANGE,
  GET_BS_REFERENCE_RANGE,
} from 'src/modules/vitals/services/gql'
import { useLazyQuery } from '@apollo/client'
import {
  HealthMetricNames,
  PanelNames,
  AggregateMetricsParams,
} from '../types/clusters.types'

export const useClustersApi = () => {
  const [getData, { loading, error }] = useLazyQuery(GET_CLUSTERS_BY_PANEL, {
    context: {
      clientName: 'v2',
    },
  })

  const [
    getAggregates,
    {
      loading: aggregatesLoading,
      error: aggregatesError,
      refetch: refetchAggregates,
    },
  ] = useLazyQuery(GET_AGGREGATED_METRICS, {
    context: {
      clientName: 'v2',
    },
  })

  const [
    getBpAggregates,
    {
      loading: bpAggregatesLoading,
      error: bpAggregatesError,
      refetch: refetchBpAggregates,
    },
  ] = useLazyQuery(GET_AGGREGATED_BP_METRICS, {
    context: {
      clientName: 'v2',
    },
  })

  const [
    getBsAggregates,
    {
      loading: bsAggregatesLoading,
      error: bsAggregatesError,
      refetch: refetchBsAggregates,
    },
  ] = useLazyQuery(GET_BS_AGGREGATES, {
    context: {
      clientName: 'v2',
    },
  })

  const [
    getChlMeasurements,
    {
      loading: chlMeasurementsLoading,
      error: chlMeasurementsError,
      refetch: refetchChlMeasurements,
    },
  ] = useLazyQuery(GET_CHL_MEASUREMENTS, {
    context: {
      clientName: 'v2',
    },
  })

  const { member } = useMember()

  const getClusters = async (
    measurementPanelType: PanelNames,
    startDate: string | Date,
    endDate: string | Date
  ) => {
    const startDateOffset = dayjs(startDate).format('YYYY-MM-DD')
    const stopDateOffset = dayjs(endDate).format('YYYY-MM-DD')

    const { data } = await getData({
      variables: {
        measurementPanelType,
        startDateOffset,
        antaraId: member?.antaraId,
        stopDateOffset,
      },
    })

    const { measurementPanelTypeAggregatedMeasurements } = data

    const results: any = measurementPanelTypeAggregatedMeasurements?.edges?.map(
      (item: any) => item.node?.clusters || []
    )

    return results.flat()
  }

  const getAggregateMetrics = async (args: AggregateMetricsParams) => {
    const { startDate, endDate, healthMetric, refetch, dailyMetrics } = args
    const startDateOffset = dayjs(startDate).format('YYYY-MM-DD')
    const stopDateOffset = dayjs(endDate).format('YYYY-MM-DD')

    const fetchFn = refetch ? refetchAggregates : getAggregates
    let data: any
    if (refetch) {
      data = (await refetchAggregates()).data
    }

    data = (
      await fetchFn({
        variables: {
          healthMetric,
          startDateOffset,
          antaraId: member?.antaraId,
          stopDateOffset,
          granularity: dailyMetrics ? 'day' : 'cluster',
        },
      })
    ).data

    const { healthMetricAggregatedMeasurements } = data
    if (!healthMetricAggregatedMeasurements?.edges?.length)
      return { aggregates: [] }
    const firstCluster = healthMetricAggregatedMeasurements?.edges[0]?.node
    return { aggregates: firstCluster?.aggregates }
  }

  const getAggregateBPMetrics = async (
    args: AggregateMetricsParams
  ): Promise<any[]> => {
    const { startDate, endDate, refetch, dailyMetrics } = args
    const startDateOffset = dayjs(startDate).format('YYYY-MM-DD')
    const stopDateOffset = dayjs(endDate).format('YYYY-MM-DD')

    if (refetch) {
      const { data } = await refetchBpAggregates()

      return data
    }

    const { data } = await getBpAggregates({
      variables: {
        startDateOffset,
        antaraId: member?.antaraId,
        stopDateOffset,
        granularity: dailyMetrics ? 'day' : 'cluster',
      },
    })

    return data
  }

  const getChlMeasurementsData = async (
    refetch: boolean = false,
    offset?: number,
    first?: number
  ): Promise<any[]> => {
    if (refetch) {
      const { data } = await refetchChlMeasurements()
      return data?.cholesterolMonitoring?.edges || []
    }
    const { data } = await getChlMeasurements({
      variables: {
        antaraId: member?.antaraId,
        offset,
        first,
      },
    })

    return data?.cholesterolMonitoring?.edges || []
  }

  const getAggregateBsMetrics = async (args: AggregateMetricsParams) => {
    const { startDate, endDate, dailyMetrics, refetch } = args
    const startDateOffset = dayjs(startDate).format('YYYY-MM-DD')
    const stopDateOffset = dayjs(endDate).format('YYYY-MM-DD')

    if (refetch) {
      const { data } = await refetchBsAggregates()
      return data
    }

    const { data } = await getBsAggregates({
      variables: {
        startDateOffset,
        antaraId: member?.antaraId,
        stopDateOffset,
        granularity: dailyMetrics ? 'day' : 'cluster',
      },
    })

    return data
  }

  return {
    getClusters,
    isLoading:
      loading ||
      chlMeasurementsLoading ||
      aggregatesLoading ||
      bpAggregatesLoading ||
      bsAggregatesLoading,
    error,
    getAggregateMetrics,
    aggregatesError,
    getAggregateBPMetrics,
    bpAggregatesError,
    getChlMeasurementsData,
    chlMeasurementsError,
    getAggregateBsMetrics,
    bsAggregatesError,
  }
}

export const useReferenceRanges = () => {
  const { member } = useMember()
  const [getReferenceRange, { loading, error }] = useLazyQuery(
    GET_REFERENCE_RANGE,
    {
      context: {
        clientName: 'v2',
      },
    }
  )

  const [getBsReferenceRange, { loading: loadingBs, error: bsError }] =
    useLazyQuery(GET_BS_REFERENCE_RANGE, {
      context: {
        clientName: 'v2',
      },
    })

  const getReferences = async (healthMetric: HealthMetricNames) => {
    const sex = member?.sex
    const ageInMonths = dayjs().diff(member?.birthDate, 'month')

    const { data } = await getReferenceRange({
      variables: {
        sex,
        ageInMonths,
        healthMetric,
      },
    })

    return data
  }

  const getBsReferences = async () => {
    const sex = member?.sex
    const ageInMonths = dayjs().diff(member?.birthDate, 'month')

    const { data } = await getBsReferenceRange({
      variables: {
        sex,
        ageInMonths,
      },
    })

    return data
  }

  return {
    loading: loading || loadingBs,
    error,
    getReferences,
    getBsReferences,
    bsError,
  }
}
