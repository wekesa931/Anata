import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { TimeFilters, TimeRange } from 'src/modules/vitals/types'

const now = dayjs().toDate()

export const useTimeRangeFilter = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>([null, null])
  const [timeFilter, setTimeFilter] = useState<TimeFilters>(
    TimeFilters.ONE_MONTH
  )

  const findNextTime = (
    currTime: Date,
    periodInMonths: number,
    op?: 'next' | 'prev'
  ): Date => {
    if (op === 'next') {
      return dayjs(currTime).add(periodInMonths, 'month').toDate()
    }

    return dayjs(currTime).subtract(periodInMonths, 'month').toDate()
  }

  const mapTimeFilterToTimeRange = (
    filter: TimeFilters,
    range: TimeRange,
    op?: 'next' | 'prev'
  ): TimeRange => {
    const end = range[1] || now
    const start = range[0] || now

    switch (filter) {
      case TimeFilters.ONE_MONTH: {
        const startPeriod = findNextTime(start, 1, op || 'prev')
        const endPeriod = op ? findNextTime(end, 1, op) : now
        return [startPeriod, endPeriod]
      }
      case TimeFilters.THREE_MONTHS: {
        const startPeriod = findNextTime(start, 3, op || 'prev')
        const endPeriod = op ? findNextTime(end, 3, op) : now
        return [startPeriod, endPeriod]
      }
      case TimeFilters.TWELVE_MONTHS: {
        const startPeriod = findNextTime(start, 12, op || 'prev')
        const endPeriod = op ? findNextTime(end, 12, op) : now
        return [startPeriod, endPeriod]
      }
      default:
        return [null, null]
    }
  }

  useEffect(() => {
    const range = mapTimeFilterToTimeRange(timeFilter, [null, null])
    setTimeRange(range)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter])

  const next = () => {
    const range = mapTimeFilterToTimeRange(timeFilter, timeRange, 'next')
    setTimeRange(range)
  }

  const prev = () => {
    const range = mapTimeFilterToTimeRange(timeFilter, timeRange, 'prev')
    setTimeRange(range)
  }

  // is next disabled if the end of the time range is today or in the future based on DD MM YYYY
  const isNextDisabled =
    timeRange[1] === null || dayjs().isSame(dayjs(timeRange[1]), 'day')

  return {
    timeRange,
    setTimeRange,
    timeFilter,
    setTimeFilter,
    isNextDisabled,
    prev,
    next,
  }
}
