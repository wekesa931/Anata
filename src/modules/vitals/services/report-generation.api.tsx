import { useLazyQuery } from '@apollo/client'
import {
  GET_REPORT_GEN_MEASUREMENTS,
  GET_REPORT_GEN_MEASUREMENTS_RANGES,
  GET_BP_DIFF,
  GET_BS_DIFF,
  GET_HBA1C_DIFF,
  GET_CHL_DIFF,
  GET_VITALS_DIFF,
} from 'src/modules/vitals/services/report-generation.gql'
import type {
  ReportGenVariables,
  ReportGenNormalRangeVariables,
} from 'src/modules/vitals/types'

type Edges = {
  edges: { node: any }[]
}
type DiffData = {
  earliest: Edges
  recent: Edges
}

const extractDiffFromData = (data: DiffData) => {
  const earliest = data?.earliest || {}
  const recent = data?.recent || {}
  const earliestNode = earliest?.edges?.length ? earliest?.edges[0]?.node : null
  const recentNode = recent?.edges?.length ? recent?.edges[0]?.node : null

  return {
    earliest: earliestNode,
    recent: recentNode,
  }
}

export const useReportGenerationApi = () => {
  const context = {
    clientName: 'v2',
  }

  const [getReportGenMeasurements, { loading: gettingReportGenMeasurements }] =
    useLazyQuery(GET_REPORT_GEN_MEASUREMENTS, {
      context,
    })

  // pull normal ranges
  const [
    getReportGenMeasurementsNormalRanges,
    { loading: gettingReportGenMeasurementsNormalRanges },
  ] = useLazyQuery(GET_REPORT_GEN_MEASUREMENTS_RANGES(), {
    context,
  })

  // ealiest to latest data
  const [getBpDiff, { loading: gettingBpDiff }] = useLazyQuery(GET_BP_DIFF, {
    context,
  })

  const [getBsDiff, { loading: gettingBsDiff }] = useLazyQuery(GET_BS_DIFF, {
    context,
  })

  const [getHba1cDiff, { loading: gettingHba1cDiff }] = useLazyQuery(
    GET_HBA1C_DIFF,
    {
      context,
    }
  )

  const [getChlDiff, { loading: gettingChlDiff }] = useLazyQuery(GET_CHL_DIFF, {
    context,
  })

  const [getVitalsDiff, { loading: gettingVitalsDiff }] = useLazyQuery(
    GET_VITALS_DIFF,
    {
      context,
    }
  )

  const getBpDiffData = async (antaraId: string) => {
    const { data } = await getBpDiff({
      variables: { antaraId },
    })

    return extractDiffFromData(data)
  }

  const getBsDiffData = async (antaraId: string) => {
    const { data } = await getBsDiff({
      variables: { antaraId },
    })

    return extractDiffFromData(data)
  }

  const getHba1cDiffData = async (antaraId: string) => {
    const { data } = await getHba1cDiff({
      variables: { antaraId },
    })

    return extractDiffFromData(data)
  }

  const getChlDiffData = async (antaraId: string) => {
    const { data } = await getChlDiff({
      variables: { antaraId },
    })

    return extractDiffFromData(data)
  }

  const getVitalsDiffData = async (antaraId: string) => {
    const { data } = await getVitalsDiff({
      variables: { antaraId },
    })

    return extractDiffFromData(data)
  }

  const getLabsAndVitalsDiffData = async (antaraId: string) => {
    const [bpDiff, bsDiff, hba1cDiff, chlDiff, vitalsDiff] = await Promise.all([
      getBpDiffData(antaraId),
      getBsDiffData(antaraId),
      getHba1cDiffData(antaraId),
      getChlDiffData(antaraId),
      getVitalsDiffData(antaraId),
    ])

    return {
      bp: bpDiff,
      bs: bsDiff,
      hba1c: hba1cDiff,
      chl: chlDiff,
      vitals: vitalsDiff,
    }
  }

  const getLabsAndVitalsData = async (variables: ReportGenVariables) => {
    const { data } = await getReportGenMeasurements({
      variables,
    })

    return Object.keys(data).reduce((acc, key) => {
      const { edges } = data[key]
      const node = edges && edges.length ? edges[0]?.node : null

      const aggregates = node ? node.aggregates : []
      const firstItem = aggregates && aggregates.length ? aggregates[0] : null

      // get the healthMetrics key
      const [healthMetricName, healthMetric] = firstItem
        ? Object.entries(firstItem?.healthMetrics)[0]
        : [null, null]

      return {
        ...acc,
        [key]: {
          ...node,
          healthMetricName,
          healthMetric,
        },
      }
    }, {})
  }

  const getReportGenMeasurementsNormalRangesData = async (
    variables: ReportGenNormalRangeVariables
  ) => {
    const { data } = await getReportGenMeasurementsNormalRanges({
      variables,
    })

    return Object.keys(data).reduce((acc, key) => {
      const { edges } = data[key]
      const node = edges && edges.length ? edges[0]?.node : null

      return {
        ...acc,
        [key]: node,
      }
    }, {})
  }

  return {
    getReportGenMeasurementsData: getLabsAndVitalsData,
    getReportGenMeasurementsNormalRangesData,
    loading:
      gettingReportGenMeasurements || gettingReportGenMeasurementsNormalRanges,
    getLabsAndVitalsDiffData,
    loadingDiff:
      gettingBpDiff ||
      gettingBsDiff ||
      gettingHba1cDiff ||
      gettingChlDiff ||
      gettingVitalsDiff,
  }
}
