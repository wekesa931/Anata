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
import { getTickCount, getTimeFormat } from 'src/modules/vitals/utils'
import {
  BP_OBSERVER,
  useClustersObserver,
} from 'src/modules/vitals/services/observers'
import { useRefreshTrigger } from 'src/context/refresh-trigger'

dayjs.extend(advancedFormat)

function BloodPressureView() {
  const { getBpClusters, getRanges, isLoading } = useClustersData()
  const [xDomain, setXDomain] = useState<[number, number]>([
    dayjs().subtract(1, 'month').valueOf(),
    dayjs().valueOf(),
  ])
  const [yDomain, setYDomain] = useState<[number, number]>([0, 160])

  const {
    currentTimeFilter,
    loading,
    clusters,
    refetchClusters,
    updateRangeFilterControls: setRangeFilterControls,
  } = useClustersObserver(BP_OBSERVER, getBpClusters)

  useEffect(() => {
    getRanges(HealthMetricNames.Systolic).then((data) => {
      setYDomain(data?.domain)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeRangeChange = (range: TimeRange, filter: TimeFilters) => {
    if (range[0] === null || range[1] === null) return
    setRangeFilterControls({ range, filter })
    setXDomain([range[0].valueOf(), range[1].valueOf()])
  }

  const CustomBpDot = withCustomBpDot({
    filter: currentTimeFilter,
    type: 'Blood pressure',
  })

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  useEffect(() => {
    if (refreshKey.includes('BP Mon')) {
      refetchClusters()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div>
      <TimeRangeFilter
        onRangeChange={handleTimeRangeChange}
        type="Blood pressure"
      />
      {loading || isLoading ? (
        <div className="h-[300px]">
          <Loading message="Loading BP Data ..." />
        </div>
      ) : (
        <div className="relative">
          {!clusters.length ? (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <p className="text-gray-400">No BP Data within this period</p>
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
              xTicks={getTickCount(currentTimeFilter, xDomain)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default BloodPressureView
