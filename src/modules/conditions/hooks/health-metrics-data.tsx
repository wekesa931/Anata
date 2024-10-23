import { useMember } from 'src/context/member'
import {
  useConditionsApi,
  useLoadMeasurements,
} from 'src/modules/conditions/services/conditions.api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useGetHealthMetrics } from 'src/modules/vitals/services/vitals.api'
import { useEffect, useState } from 'react'
import { useNotifications } from 'src/context/notifications'
import { adjustExclusiveDates } from 'src/utils/date-time/helpers'
import { camelToTitleCase } from 'src/utils/text-utils'

dayjs.extend(utc)

type HealthMetrics = {
  name: string
  label: string
  helperText?: string
  value: string
}

export const useHealthMetricsData = () => {
  const { addMetricsData } = useConditionsApi()
  const { member } = useMember()
  const { getHealthMetrics } = useGetHealthMetrics()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const { notify } = useNotifications()
  const [healthMetricsOptions, setHealthMetricOptions] = useState<
    HealthMetrics[]
  >([])
  const { loadHealthMetrics } = useLoadMeasurements(
    healthMetricsOptions.map((h) => h.name)
  )

  const parseMeasurement = (measurement: any) => ({
    healthMetric: measurement.healthMetric?.name,
    measurementUnit: measurement.healthMetric?.measurementUnit?.name,
    value: measurement.value,
    modifiedAt: measurement.modifiedAt,
    createdAt: measurement.createdAt,
    id: measurement.id,
  })

  const getMeasurements = async (timerange: [Date | null, Date | null]) => {
    if (member) {
      const [start, end] = adjustExclusiveDates(timerange)

      const data = await loadHealthMetrics(start, end)

      let formattedData = {}

      if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          if (data[key] && Array.isArray(data[key]?.edges)) {
            formattedData = {
              ...formattedData,
              [camelToTitleCase(key)]: data[key].edges.map((e: any) =>
                parseMeasurement(e.node)
              ),
            }
          } else {
            formattedData = {
              ...formattedData,
              [camelToTitleCase(key)]: [],
            }
          }
        })
      }

      return formattedData
    }

    return {}
  }

  const getOptionsFromMetrics = async () => {
    const { metrics } = await getHealthMetrics()
    const metricsNotInPanel = metrics?.filter(
      (m: any) => !m.isInPanel || m.name === 'BMI Percentile'
    )

    return metricsNotInPanel.map((m: any) => ({
      name: m?.name,
      label: m?.name,
      helperText: m?.helperText,
      value: m?.name,
      unit: m?.measurementUnit,
    }))
  }

  useEffect(() => {
    setLoading(true)
    setError(undefined)
    if (member) {
      getOptionsFromMetrics()
        .then((m) => {
          setHealthMetricOptions(m)
        })
        .catch((e: any) => {
          notify('An error occurred fetching metrics', 'error')
          setError(e?.message ?? 'Cannot fetch health metrics')
        })
        .finally(() => {
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const handleUpdateMetrics = async (values: any) => {
    if (member?.antaraId) {
      const antaraId = member?.antaraId
      const measurer = member?.antaraId
      const timestamp = dayjs(values.metricsCreatedDate).utc().toISOString()

      const { healthMetrics } = values

      const payload = healthMetrics.map((metric: any) => ({
        antaraId,
        healthMetricName: metric.name,
        value: parseFloat(values[metric.name]),
        measurementPanelId: null,
        measurer,
        timestamp,
      }))
      return addMetricsData(payload)
    }

    return null
  }

  return {
    handleUpdateMetrics,
    loadingHealthMetrics: loading,
    error,
    healthMetricsOptions,
    getMeasurements,
  }
}

export default useHealthMetricsData
