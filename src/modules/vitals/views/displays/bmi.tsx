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
import {
  VITALS_OBSERVER,
  useClustersObserver,
} from 'src/modules/vitals/services/observers'

dayjs.extend(advancedFormat)

export function BMICharts() {
  const { getBmiData, getRanges, isLoading } = useClustersData()
  const [xDomain, setXDomain] = useState<[number, number]>([
    dayjs().subtract(1, 'month').valueOf(),
    dayjs().valueOf(),
  ])

  const [bmiReferences, setBmiReferences] = useState<ReferenceDomain>({
    domain: [0, 50],
    referenceRanges: [],
  })

  const {
    loading,
    clusters,
    currentTimeFilter,
    updateRangeFilterControls: setRangeFilterControls,
  } = useClustersObserver(VITALS_OBSERVER, getBmiData)

  useEffect(() => {
    getRanges(HealthMetricNames.BMI).then((data) => {
      setBmiReferences(data)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeRangeChange = (range: TimeRange, filter: TimeFilters) => {
    if (range[0] === null || range[1] === null) return
    setRangeFilterControls({ range, filter })
    setXDomain([range[0].valueOf(), range[1].valueOf()])
  }
  const CustomBpDot = withCustomBmiDot({
    filter: currentTimeFilter,
    type: 'BMI',
  })

  return (
    <div>
      <TimeRangeFilter onRangeChange={handleTimeRangeChange} type="BMI" />
      {loading || isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading BMI Data ..." />
        </div>
      ) : (
        <div className="relative">
          {!clusters.length ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-gray-400">No BMI Data within this period</p>
            </div>
          ) : (
            <LineSeriesChat
              data={clusters}
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
