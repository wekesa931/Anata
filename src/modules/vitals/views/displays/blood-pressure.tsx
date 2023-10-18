import React, { useEffect, useState } from 'react'
import TimeRangeFilter from 'src/modules/vitals/components/time-filter'
import { TimeRange, TimeFilters } from 'src/modules/vitals/types'
import LineSeriesChat from 'src/components/charts/line'
import dayjs from 'dayjs'
import { withCustomBpDot } from 'src/modules/vitals/components/custom-bp-dot'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import Loading from 'src/components/loaders/centered'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { HealthMetricNames } from 'src/modules/vitals/types/clusters.types'
import { getTimeFormat } from 'src/modules/vitals/utils'

dayjs.extend(advancedFormat)

function BloodPressureView() {
  const { getBpClusters, isLoading, getRanges } = useClustersData()
  const [bpClusters, setBpClusters] = useState<Record<string, any>[]>([])
  const [xDomain, setXDomain] = useState<[number, number]>([
    dayjs().subtract(1, 'month').valueOf(),
    dayjs().valueOf(),
  ])
  const [currentTimeFilter, setCurrentTimeFilter] = useState<TimeFilters>(
    TimeFilters.ONE_MONTH
  )
  const [yDomain, setYDomain] = useState<[number, number]>([0, 160])

  useEffect(() => {
    getRanges(HealthMetricNames.Systolic).then((data) => {
      setYDomain(data?.domain)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeRangeChange = (range: TimeRange, filter: TimeFilters) => {
    if (range[0] === null || range[1] === null) return
    setCurrentTimeFilter(filter)
    setXDomain([range[0].valueOf(), range[1].valueOf()])

    getBpClusters(range, currentTimeFilter).then((data) => {
      setBpClusters(data)
    })
  }

  const CustomBpDot = withCustomBpDot({
    filter: currentTimeFilter,
    type: 'Blood pressure',
  })

  return (
    <div>
      <TimeRangeFilter
        onRangeChange={handleTimeRangeChange}
        type="Blood pressure"
      />
      {isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading BP Data ..." />
        </div>
      ) : (
        <div className="relative">
          {!bpClusters.length ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-gray-400">No BP Data within this period</p>
            </div>
          ) : (
            <LineSeriesChat
              data={bpClusters}
              xAxisDataKey={{
                formatter: getTimeFormat(currentTimeFilter),
                key: 'timestamp',
              }}
              yAxisDataKeys={[
                {
                  key: 'Systolic.mean',
                  name: 'Systolic',
                  color: '#58A9F3',
                },
                {
                  key: 'Diastolic.mean',
                  name: 'Diastolic',
                  color: '#007AFF',
                },
              ]}
              CustomDot={CustomBpDot}
              xAxisDomain={xDomain}
              yAxisDomain={yDomain}
              filter={currentTimeFilter}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default BloodPressureView
