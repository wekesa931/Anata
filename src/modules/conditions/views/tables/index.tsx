import React, { useEffect, useState } from 'react'
import Table, { Column } from 'src/components/table/data-table'
import ErrorComponent from 'src/components/feedbacks/error-retry'
import TimeRangeFilter from 'src/modules/vitals/components/time-filter'
import { TimeRange } from 'src/modules/vitals/types'
import useHealthMetricsData from 'src/modules/conditions/hooks/health-metrics-data'
import dayjs from 'dayjs'
import { useRefreshTrigger } from 'src/context/refresh-trigger'

type TableProps = {
  data: any[]
  loading: boolean
  columns: readonly Column[]
  title: string
  defaultSortColumn?: string
  loadingContext?: string | undefined
}

const METRICS_COLUMNS: Column[] = [
  {
    id: 'modifiedAt',
    label: 'Date',
    sortable: true,
    type: 'date',
    format: (v) => dayjs(v).format('Do MMM YY'),
  },
  { id: 'healthMetric', label: 'Metrics Name' },
  { id: 'measurementUnit', label: 'Measurement Unit' },
  { id: 'value', label: 'Value' },
]

function DataTable({
  data,
  loading,
  columns,
  defaultSortColumn,
  loadingContext,
}: TableProps) {
  const { refreshKey } = useRefreshTrigger()

  // loading state triggered by refresh key change
  const [refreshTableLoading, setRefreshTableLoading] = useState(false)

  // determines if datatable will refresh on refreshKey change
  const refreshTableContext = refreshKey?.includes(loadingContext!)

  // determines loading state for the datatable, normal loading and trigger refetch loading
  const showLoading = loading || (refreshTableContext && refreshTableLoading)

  // trigger datatable loading when refresh key changes
  useEffect(() => {
    if (refreshTableContext) {
      setRefreshTableLoading(true)
    }
  }, [refreshTableContext, refreshKey])

  // reset datatable loading state when refresh completes
  useEffect(() => {
    if (!loading && refreshTableContext) {
      setRefreshTableLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, refreshTableContext])

  return (
    <div className="mb-4">
      <div>
        <Table
          columns={columns}
          data={data}
          title=""
          loading={showLoading}
          loadingContext={
            refreshKey.includes('Health Metrics') ? refreshKey : undefined
          }
          defaultSortColumn={defaultSortColumn || 'timestamp'}
          defaultFilterColumn={defaultSortColumn || 'timestamp'}
          dateColumnKey={defaultSortColumn || 'timestamp'}
          filterByDate
        />
      </div>
    </div>
  )
}

function MeasurementTable() {
  const { getMeasurements } = useHealthMetricsData()
  const [metricsLoading, setMetricsLoading] = useState(true)
  const [metrics, setMetrics] = useState<any>([])
  const [metricsError, setMetricsError] = useState<any>(null)
  const [timeRange, setTimeRange] = useState<TimeRange>([null, null])

  const handleTimeRangeChange = (range: TimeRange) => {
    if (range[0] === null || range[1] === null) return
    setTimeRange(range)
    fetchMetrics(range)
  }

  const refetchMetricsData = () => {
    fetchMetrics(timeRange)
  }

  const fetchMetrics = (range: TimeRange) => {
    if (range[0] === null || range[1] === null) return
    setMetricsLoading(true)
    getMeasurements(range)
      .then((data) => {
        const filteredMetrics = Object.values(data)
          .filter((entries: any) => entries.length > 0)
          .flat()
        setMetrics(filteredMetrics)
      })
      .catch((error) => {
        setMetricsError(error)
      })
      .finally(() => {
        setMetricsLoading(false)
      })
  }

  const [retryLoadingMetrics, setRetryLoadingMetrics] = useState(false)

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  useEffect(() => {
    if (refreshKey.includes('Health Metrics')) {
      setRetryLoadingMetrics(true)
      refetchMetricsData()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
      setRetryLoadingMetrics(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div>
      {metricsError ? (
        <div>
          <p className="text-lg text-left mb-1">Health Metrics</p>
          <ErrorComponent retry={refetchMetricsData} />
        </div>
      ) : (
        <>
          <h4 className="text-xl text-[#444] font-rubik font-medium mb-4">
            Health Metrics
          </h4>
          <TimeRangeFilter
            onRangeChange={handleTimeRangeChange}
            type="Health Metrics"
          />
          <div className="my-2">
            <DataTable
              data={metrics || []}
              columns={METRICS_COLUMNS}
              loading={metricsLoading || retryLoadingMetrics}
              loadingContext={
                refreshKey.includes('Health Metrics') ? refreshKey : undefined
              }
              title=""
            />
          </div>
        </>
      )}
    </div>
  )
}

function HealthAndMetricsTable() {
  return (
    <div className="font-rubik">
      <MeasurementTable />
    </div>
  )
}

export default HealthAndMetricsTable
