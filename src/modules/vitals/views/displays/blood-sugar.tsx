import React, { useState } from 'react'
import TimeRangeFilter from 'src/modules/vitals/components/time-filter'
import { TimeRange, TimeFilters } from 'src/modules/vitals/types'
import LineSeriesChat from 'src/components/charts/line'
import dayjs from 'dayjs'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import Loading from 'src/components/loaders/centered'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { withCustomBsDot } from 'src/modules/vitals/components/custom-bs-dot'
import { getTickCount, getTimeFormat } from 'src/modules/vitals/utils'

dayjs.extend(advancedFormat)

function BloodSugarView() {
  const { getBsClusters, isLoading } = useClustersData()
  const [bsData, setBsData] = useState<any[]>([])
  const [xDomain, setXDomain] = useState<[number, number]>([
    dayjs().subtract(1, 'month').valueOf(),
    dayjs().valueOf(),
  ])
  const [currentTimeFilter, setCurrentTimeFilter] = useState<TimeFilters>(
    TimeFilters.ONE_MONTH
  )

  const handleTimeRangeChange = (range: TimeRange, filter: TimeFilters) => {
    if (range[0] === null || range[1] === null) return
    setCurrentTimeFilter(filter)
    setXDomain([range[0].valueOf(), range[1].valueOf()])
    getBsClusters(range, currentTimeFilter).then((data) => {
      setBsData(data)
    })
  }

  const CustomDot = withCustomBsDot({
    filter: currentTimeFilter,
    type: 'Blood sugar',
  })

  return (
    <div>
      <TimeRangeFilter
        onRangeChange={handleTimeRangeChange}
        type="Blood sugar"
      />
      {isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading BS Data ..." />
        </div>
      ) : (
        <div className="relative">
          {!bsData.length ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-gray-400">No BS Data within this period</p>
            </div>
          ) : (
            <LineSeriesChat
              data={bsData}
              xAxisDataKey={{
                formatter: getTimeFormat(currentTimeFilter),
                key: 'timestamp',
              }}
              CustomDot={CustomDot}
              xAxisDomain={xDomain}
              yAxisDataKeys={[
                {
                  key: 'Fasting Blood Glucose.mean',
                  name: 'Fasting Blood Glucose',
                  color: '#007AFF',
                },
                {
                  key: 'Random Blood Glucose.mean',
                  name: 'Random Blood Glucose',
                  color: '#26187B',
                },
              ]}
              xTicks={getTickCount(currentTimeFilter, xDomain)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default BloodSugarView
