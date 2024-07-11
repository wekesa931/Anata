import { useMember } from 'src/context/member'
import {
  useClustersApi,
  useReferenceRanges,
} from 'src/modules/vitals/services/clusters.api'
import {
  transformBpAggregateMetrics,
  transformBMIAggregateMetrics,
  transformChlMeasurements,
  transformBSAggregateMetrics,
  transformReferenceRanges,
  mapBsRefsToDomain,
  transformHbMeasurements,
} from 'src/modules/vitals/utils/data-transforms/query'
import { adjustExclusiveDates } from 'src/utils/date-time/helpers'
import { TimeFilters, TimeRange } from '../types'
import {
  BPAggregatedMetricData,
  HealthMetricNames,
  ReferenceDomain,
} from '../types/clusters.types'

export const useClustersData = () => {
  const { member } = useMember()
  const {
    getAggregateBPMetrics,
    getAggregateMetrics,
    isLoading,
    getChlMeasurementsData,
    getAggregateBsMetrics,
  } = useClustersApi()
  const { getReferences, loading, getBsReferences } = useReferenceRanges()

  const getBpClusters = async (
    range: TimeRange,
    filter: TimeFilters,
    refetch: boolean = false
  ) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      // due to dates being exclusive, we need to add a day to the end date and subtract a day from the start date
      const [startDate, endDate] = adjustExclusiveDates(range)

      const data = await getAggregateBPMetrics({
        startDate,
        endDate,
        refetch,
        dailyMetrics: filter === TimeFilters.ONE_MONTH,
      })

      const metrics: BPAggregatedMetricData[] =
        transformBpAggregateMetrics(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }

    return []
  }

  const getBsClusters = async (
    range: TimeRange,
    filter: TimeFilters,
    refetch: boolean = false
  ) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      // due to dates being exclusive, we need to add a day to the end date and subtract a day from the start date
      const [startDate, endDate] = adjustExclusiveDates(range)

      const data = await getAggregateBsMetrics({
        startDate,
        endDate,
        dailyMetrics: filter === TimeFilters.ONE_MONTH,
        refetch,
      })

      const metrics: any[] = transformBSAggregateMetrics(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    return []
  }

  const getBmiData = async (
    range: TimeRange,
    filter: TimeFilters,
    refetch: boolean = false
  ) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      const [startDate, endDate] = adjustExclusiveDates(range)
      const data = await getAggregateMetrics({
        healthMetric: HealthMetricNames.BMI,
        startDate,
        endDate,
        dailyMetrics: filter === TimeFilters.ONE_MONTH,
        refetch,
      })
      const metrics = transformBMIAggregateMetrics(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    return []
  }

  const getLipidsClusters = async (refetch: boolean = false) => {
    if (member) {
      const data = await getChlMeasurementsData(refetch)
      const metrics = transformChlMeasurements(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    return []
  }

  const getRanges = async (healthMetric: HealthMetricNames) => {
    if (member) {
      const data = await getReferences(healthMetric)
      return transformReferenceRanges(data?.referenceRanges?.edges || [])
    }
    return {} as ReferenceDomain
  }

  const getBsReference = async () => {
    if (member) {
      const data = await getBsReferences()
      return mapBsRefsToDomain(data)
    }
    return []
  }

  const getHba1cClusters = async (
    range: TimeRange,
    filter: TimeFilters,
    refetch: boolean = false
  ) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      const [startDate, endDate] = adjustExclusiveDates(range)
      const data = await getAggregateMetrics({
        healthMetric: HealthMetricNames.HbA1c,
        startDate,
        endDate,
        dailyMetrics: filter === TimeFilters.ONE_MONTH,
        refetch,
      })
      const metrics = transformHbMeasurements(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    return []
  }

  return {
    getBpClusters,
    isLoading: isLoading || loading,
    getBmiData,
    getLipidsClusters,
    getBsClusters,
    getRanges,
    getBsReference,
    getHba1cClusters,
  }
}
