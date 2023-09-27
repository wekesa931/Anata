import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import {
  HealthMetricNames,
  BPAggregatedMetricData,
  ReferenceRange,
  ReferenceDomain,
} from 'src/modules/vitals/types/clusters.types'

interface Aggregate {
  id: string
  startDate: string
  endDate: string
  [key: string]: any
}

type Input = {
  edges?: { node?: { aggregates?: Aggregate[] } }[]
}

const extractClusterData = (
  clusters: Aggregate[],
  healthMetricName: string
) => {
  return clusters?.map((c: any) => ({
    id: c?.id,
    startDate: c?.startDate,
    endDate: c?.endDate,
    ...c?.healthMetrics[healthMetricName],
    healthMetricName,
  }))
}

export const parseAggregatedMetrics = (
  data: Input,
  healthMetricName: HealthMetricNames
): Aggregate[] => {
  const { edges } = data
  const clusters = edges && edges?.length > 0 ? edges[0]?.node?.aggregates : []

  if (!clusters?.length) return []

  return extractClusterData(clusters, healthMetricName)
}

const processSystolicDiastolicClusterItem = (
  timestamp: string,
  systolic?: Aggregate | null,
  diastolic?: Aggregate | null
) => {
  const readableValue = `${parseInt(systolic?.mean) || 0}/${parseInt(
    diastolic?.mean || 0
  )}`

  const systolicMeasurements = systolic?.measurements || []
  const diastolicMeasurements = diastolic?.measurements || []

  // zip the measurements together
  const measurements = systolicMeasurements.map((item: any, index: number) => {
    return {
      systolic: item,
      diastolic:
        diastolicMeasurements.length > index
          ? diastolicMeasurements[index]
          : null,
      timestamp: item?.timestamp,
      day: dayjs(item?.timestamp).format('DD MMM YYYY'),
    }
  })

  return {
    timestamp: dayjs(timestamp).valueOf(),
    ...(systolic && {
      Systolic: {
        ...systolic,
        readableValue,
        measurements,
      },
    }),
    ...(diastolic && {
      Diastolic: {
        ...diastolic,
        readableValue,
        measurements,
      },
    }),
  }
}

export const transformBpAggregateMetrics = (
  data: any
): BPAggregatedMetricData[] => {
  const sys: Input = data?.systolic || { edges: [] }
  const dia: Input = data?.diastolic || { edges: [] }

  const allValues = [
    ...parseAggregatedMetrics(sys, HealthMetricNames.Systolic),
    ...parseAggregatedMetrics(dia, HealthMetricNames.Diastolic),
  ]

  const groups = groupBy(allValues, 'endDate')
  return Object.keys(groups).map((key) => {
    const systolic = groups[key].find(
      (item) => item.healthMetricName === HealthMetricNames.Systolic
    )
    const diastolic = groups[key].find(
      (item) => item.healthMetricName === HealthMetricNames.Diastolic
    )
    return processSystolicDiastolicClusterItem(key, systolic, diastolic)
  })
}

export const parseBpClusters = (data: Aggregate[]) => {
  return data.map((item: Aggregate) => {
    const { endDate, healthMetrics } = item

    const systolics = healthMetrics[HealthMetricNames.Systolic]
    const diastolics = healthMetrics[HealthMetricNames.Diastolic]
    const timestamp = endDate

    return processSystolicDiastolicClusterItem(timestamp, systolics, diastolics)
  })
}

export const transformAggregateMeasurements = (
  data: any,
  healthMetric: HealthMetricNames
): any[] => {
  const clusters = extractClusterData(data?.aggregates || [], healthMetric).map(
    (item: any) => {
      const measurements = (item?.measurements || []).map((m: any) => ({
        ...m,
        day: dayjs(m?.timestamp).format('DD MMM YYYY'),
      }))

      return {
        ...item,
        measurements,
        timestamp: dayjs(item?.endDate).valueOf(),
        mean: parseFloat(item?.mean || 0).toFixed(2),
      }
    }
  )
  return clusters
}

export const transformBMIAggregateMetrics = (data: any): any[] => {
  return transformAggregateMeasurements(data, HealthMetricNames.BMI)
}

export const transformChlMeasurements = (chl: { node: any }[]): any[] => {
  return chl?.map((item: any) => {
    const { node } = item

    const { timestamp, data: nodeData } = node
    const dataPoint: any = {
      timestamp,
      day: dayjs(timestamp).format('DD MMM YYYY'),
    }

    Object.keys(nodeData).forEach((key) => {
      dataPoint[key] = {
        ...nodeData[key],
        textColor: nodeData[key]?.reference_range?.text_color || '',
      }
    })
    return dataPoint
  })
}

const parseIndividualBsItemMeasurements = (item: any) => {
  const measurements = (item?.measurements || []).map((m: any) => ({
    ...m,
    day: dayjs(m?.timestamp).format('DD MMM YYYY'),
  }))

  return {
    ...item,
    measurements,
    timestamp: dayjs(item?.endDate).valueOf(),
    mean: parseFloat(item?.mean || 0).toFixed(2),
  }
}

export const transformBSAggregateMetrics = (data: any): any[] => {
  const fastingBs: Input = data?.fastingBloodGlucose || { edges: [] }
  const randomBs: Input = data?.randomBloodGlucose || { edges: [] }

  const allValues = [
    ...parseAggregatedMetrics(fastingBs, HealthMetricNames.FASTING_BS),
    ...parseAggregatedMetrics(randomBs, HealthMetricNames.RANDOM_BS),
  ]

  const groups = groupBy(allValues, 'endDate')
  return Object.keys(groups).map((key) => {
    const fasting = groups[key].find(
      (item) => item.healthMetricName === HealthMetricNames.FASTING_BS
    )
    const random = groups[key].find(
      (item) => item.healthMetricName === HealthMetricNames.RANDOM_BS
    )
    return {
      ...(random && {
        [HealthMetricNames.RANDOM_BS]: {
          ...parseIndividualBsItemMeasurements(random),
        },
      }),
      ...(fasting && {
        [HealthMetricNames.FASTING_BS]: {
          ...parseIndividualBsItemMeasurements(fasting),
        },
      }),
      timestamp: dayjs(key).valueOf(),
    }
  })
}

export const transformHbMeasurements = (data: any): any[] => {
  return transformAggregateMeasurements(data, HealthMetricNames.HbA1c)
}

export const transformReferenceRanges = (data: any): ReferenceDomain => {
  const referenceRanges: ReferenceRange[] = data?.map((item: any) => {
    const node = item?.node || {}

    return {
      minimum: node?.minimumValue || 0,
      maximum: node?.maximumValue || 0,
      color: node?.backgroundColor || '',
      name: node?.name || '',
    }
  })

  const domain: [number, number] = [
    Math.min(...referenceRanges.map((item: any) => item?.minimum)),
    Math.max(...referenceRanges.map((item: any) => item?.maximum)),
  ]

  return {
    referenceRanges,
    domain,
  }
}

export const mapBsRefsToDomain = (data: any): any => {
  return data
}
