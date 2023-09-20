import React, { useEffect, useState } from 'react'
import TimeRangeFilter from 'src/modules/vitals/components/time-filter'
import { TimeRange, TimeFilters } from 'src/modules/vitals/types'
import LineSeriesChat from 'src/components/charts/line'
import dayjs from 'dayjs'
import { useClustersData } from 'src/modules/vitals/hooks/clusters.data.hook'
import Loading from 'src/components/loaders/centered'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { withCustomBmiDot } from 'src/modules/vitals/components/custom-bmi-dot'
import { getTickCount, getTimeFormat } from 'src/modules/vitals/utils'
import { HealthMetricNames, ReferenceDomain } from '../../types/clusters.types'

dayjs.extend(advancedFormat)

function HBA1CView() {
  const { getHba1cClusters, isLoading, getRanges } = useClustersData()
  const [data, setData] = useState<any[]>([])
  const [xDomain, setXDomain] = useState<[number, number]>([
    dayjs().subtract(1, 'month').valueOf(),
    dayjs().valueOf(),
  ])
  const [currentTimeFilter, setCurrentTimeFilter] = useState<TimeFilters>(
    TimeFilters.ONE_MONTH
  )

  const [references, setReferences] = useState<ReferenceDomain>({
    domain: [0, 100],
    referenceRanges: [],
  })

  useEffect(() => {
    getRanges(HealthMetricNames.HbA1c).then((res) => {
      setReferences(res)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeRangeChange = (range: TimeRange, filter: TimeFilters) => {
    if (range[0] === null || range[1] === null) return
    setCurrentTimeFilter(filter)
    setXDomain([range[0].valueOf(), range[1].valueOf()])

    getHba1cClusters(range, currentTimeFilter).then((bmi) => {
      setData(bmi)
    })
  }

  const CustomDot = withCustomBmiDot({ filter: currentTimeFilter })

  return (
    <div>
      <TimeRangeFilter onRangeChange={handleTimeRangeChange} />
      {isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading HbA1c Data ..." />
        </div>
      ) : (
        <div className="relative">
          {!data.length ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-gray-400">No HbA1c Data within this period</p>
            </div>
          ) : (
            <LineSeriesChat
              data={data}
              xAxisDataKey={{
                formatter: getTimeFormat(currentTimeFilter),
                key: 'timestamp',
              }}
              CustomDot={CustomDot}
              xAxisDomain={xDomain}
              yAxisDataKeys={[
                {
                  key: 'mean',
                  name: 'HbA1c',
                  color: '#007AFF',
                },
              ]}
              yAxisDomain={references.domain}
              referenceRanges={references.referenceRanges}
              isPadded={false}
              xTicks={getTickCount(currentTimeFilter, xDomain)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default HBA1CView
