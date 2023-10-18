import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import Loading from 'src/components/loaders/centered'
import TimeRangeFilter from 'src/modules/vitals/components/time-filter'
import { TimeRange, TimeFilters } from 'src/modules/vitals/types'
import LineSeriesChat from 'src/components/charts/line'
import { withCustomBmiDot } from 'src/modules/vitals/components/custom-bmi-dot'
import {
  HealthMetricNames,
  ReferenceDomain,
} from 'src/modules/vitals/types/clusters.types'
import { getTickCount, getTimeFormat } from 'src/modules/vitals/utils'

dayjs.extend(advancedFormat)

export function BMICharts() {
  const { isLoading, getBmiData, getRanges } = useClustersData()
  const [bmiData, setBmiData] = useState<any[]>([])
  const [xDomain, setXDomain] = useState<[number, number]>([
    dayjs().subtract(1, 'month').valueOf(),
    dayjs().valueOf(),
  ])
  const [currentTimeFilter, setCurrentTimeFilter] = useState<TimeFilters>(
    TimeFilters.ONE_MONTH
  )
  const [bmiReferences, setBmiReferences] = useState<ReferenceDomain>({
    domain: [0, 50],
    referenceRanges: [],
  })

  useEffect(() => {
    getRanges(HealthMetricNames.BMI).then((data) => {
      setBmiReferences(data)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeRangeChange = (range: TimeRange, filter: TimeFilters) => {
    if (range[0] === null || range[1] === null) return
    setCurrentTimeFilter(filter)
    setXDomain([range[0].valueOf(), range[1].valueOf()])
    getBmiData(range, currentTimeFilter).then((data) => {
      setBmiData(data)
    })
  }
  const CustomBpDot = withCustomBmiDot({
    filter: currentTimeFilter,
    type: 'BMI',
  })

  return (
    <div>
      <TimeRangeFilter onRangeChange={handleTimeRangeChange} type="BMI" />
      {isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading BMI Data ..." />
        </div>
      ) : (
        <div className="relative">
          {!bmiData.length ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-gray-400">No BMI Data within this period</p>
            </div>
          ) : (
            <LineSeriesChat
              data={bmiData}
              xAxisDataKey={{
                key: 'timestamp',
                formatter: getTimeFormat(currentTimeFilter),
              }}
              yAxisDataKeys={[
                {
                  key: 'mean',
                  name: 'BMI',
                  color: '#007AFF',
                },
              ]}
              CustomDot={CustomBpDot}
              xAxisDomain={xDomain}
              referenceRanges={bmiReferences.referenceRanges}
              isPadded={false}
              yAxisDomain={bmiReferences.domain}
              xTicks={getTickCount(currentTimeFilter, xDomain)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default BMICharts
