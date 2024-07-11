import React, { useState } from 'react'
import Loading from 'src/components/loaders/centered'
import Table, { Column } from 'src/components/table/data-table'
import ErrorComponent from 'src/components/feedbacks/error-retry'
import TimeRangeFilter from 'src/modules/vitals/components/time-filter'
import { TimeRange } from 'src/modules/vitals/types'
import useHealthMetricsData from 'src/modules/conditions/hooks/health-metrics-data'
import dayjs from 'dayjs'

type TableProps = {
  data: any[]
  loading: boolean
  columns: readonly Column[]
  title: string
  defaultSortColumn?: string
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

function DataTable({ data, loading, columns, defaultSortColumn }: TableProps) {
  return (
    <div className="mb-4">
      {loading ? (
        <div className="h-[300px]">
          <Loading message="Loading Health Metrics" />
        </div>
      ) : (
        <div>
          <Table
            columns={columns}
            data={data}
            title=""
            defaultSortColumn={defaultSortColumn || 'timestamp'}
            defaultFilterColumn={defaultSortColumn || 'timestamp'}
            dateColumnKey={defaultSortColumn || 'timestamp'}
            filterByDate
          />
        </div>
      )}
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
              loading={metricsLoading}
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
