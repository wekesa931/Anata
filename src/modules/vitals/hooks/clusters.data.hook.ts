import { useMember } from 'src/context/member'
import {
  useClustersApi,
  useReferenceRanges,
} from 'src/modules/vitals/services/clusters.api'
import dayjs from 'dayjs'
import {
  transformBpAggregateMetrics,
  transformBMIAggregateMetrics,
  transformChlMeasurements,
  transformBSAggregateMetrics,
  transformReferenceRanges,
  mapBsRefsToDomain,
  transformHbMeasurements,
} from 'src/modules/vitals/utils/data-transforms/query'
import { TimeFilters, TimeRange } from '../types'
import {
  BPAggregatedMetricData,
  HealthMetricNames,
} from '../types/clusters.types'

const adjustExclusiveDates = (range: TimeRange) => {
  const start = dayjs(range[0]).subtract(1, 'day').toDate()
  const end = dayjs(range[1]).add(1, 'day').toDate()
  return [start, end]
}

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

  const getBpClusters = async (range: TimeRange, filter: TimeFilters) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      // due to dates being exclusive, we need to add a day to the end date and subtract a day from the start date
      const [start, end] = adjustExclusiveDates(range)

      const data = await getAggregateBPMetrics(
        start,
        end,
        filter === TimeFilters.ONE_MONTH
      )

      const metrics: BPAggregatedMetricData[] =
        transformBpAggregateMetrics(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    throw new Error('Member not found')
  }

  const getBsClusters = async (range: TimeRange, filter: TimeFilters) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      // due to dates being exclusive, we need to add a day to the end date and subtract a day from the start date
      const [start, end] = adjustExclusiveDates(range)

      const data = await getAggregateBsMetrics(
        start,
        end,
        filter === TimeFilters.ONE_MONTH
      )

      const metrics: any[] = transformBSAggregateMetrics(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    throw new Error('Member not found')
  }

  const getBmiData = async (range: TimeRange, filter: TimeFilters) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      const [start, end] = adjustExclusiveDates(range)
      const data = await getAggregateMetrics(
        HealthMetricNames.BMI,
        start,
        end,
        filter === TimeFilters.ONE_MONTH
      )
      const metrics = transformBMIAggregateMetrics(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    throw new Error('Member not found')
  }

  const getLipidsClusters = async () => {
    if (member) {
      const data = await getChlMeasurementsData()
      const metrics = transformChlMeasurements(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    throw new Error('Member not found')
  }

  const getRanges = async (healthMetric: HealthMetricNames) => {
    if (member) {
      const data = await getReferences(healthMetric)
      return transformReferenceRanges(data?.referenceRanges?.edges || [])
    }
    throw new Error('Member not found')
  }

  const getBsReference = async () => {
    if (member) {
      const data = await getBsReferences()
      return mapBsRefsToDomain(data)
    }
    throw new Error('Member not found')
  }

  const getHba1cClusters = async (range: TimeRange, filter: TimeFilters) => {
    if (member) {
      if (range[0] === null || range[1] === null) {
        return []
      }

      const [start, end] = adjustExclusiveDates(range)
      const data = await getAggregateMetrics(
        HealthMetricNames.HbA1c,
        start,
        end,
        filter === TimeFilters.ONE_MONTH
      )
      const metrics = transformHbMeasurements(data)
      metrics.sort((a, b) => a.timestamp - b.timestamp)
      return metrics
    }
    throw new Error('Member not found')
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
