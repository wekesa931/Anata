import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { TimeFilters, TimeRange } from 'src/modules/vitals/types'
import { useTimeRangeFilter } from 'src/modules/vitals/hooks/time-range-filter.hook'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'react-feather'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useModuleAnalytics } from 'src/modules/analytics'

dayjs.extend(advancedFormat)

type FilterButtonProps = {
  filter: TimeFilters
  activeFilter: TimeFilters
  onClick: (filter: TimeFilters) => void
  children?: React.ReactNode
}

function FilterButton({
  filter,
  activeFilter,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <Button
      size="small"
      className={`border border-dark-blue-10 ${
        filter === activeFilter
          ? 'bg-dark-blue-10 text-dark-blue-100'
          : 'text-dark-blue-50'
      }`}
      onClick={() => onClick(filter)}
    >
      {children}
    </Button>
  )
}

type Props = {
  onRangeChange: (range: TimeRange, filter: TimeFilters) => void
  type: string
}

function TimeRangeFilter({ onRangeChange, type }: Props) {
  const { timeFilter, timeRange, setTimeFilter, isNextDisabled, prev, next } =
    useTimeRangeFilter()
  const {
    trackLabsAndVitalsRangeSelected,
    trackLabsAndVitalsPreviousPeriodClicked,
    trackLabsAndVitalsPreviousNextClicked,
  } = useModuleAnalytics()

  React.useEffect(() => {
    onRangeChange(timeRange, timeFilter)
    const selectedRange = {
      start: timeRange[0],
      end: timeRange[1],
    }
    trackLabsAndVitalsRangeSelected(selectedRange, type, timeFilter.toString())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange, timeFilter])

  return (
    <div className="p-0">
      <ButtonGroup size="small" variant="outlined" className="p-0">
        <FilterButton
          filter={TimeFilters.ONE_MONTH}
          activeFilter={timeFilter}
          onClick={setTimeFilter}
        >
          1M
        </FilterButton>
        <FilterButton
          filter={TimeFilters.THREE_MONTHS}
          activeFilter={timeFilter}
          onClick={setTimeFilter}
        >
          3M
        </FilterButton>
        <FilterButton
          filter={TimeFilters.TWELVE_MONTHS}
          activeFilter={timeFilter}
          onClick={setTimeFilter}
        >
          12M
        </FilterButton>
      </ButtonGroup>
      <div className="my-4">
        <ButtonGroup className="p-0" variant="outlined">
          <Button
            size="small"
            onClick={() => {
              trackLabsAndVitalsPreviousPeriodClicked(
                type,
                timeFilter.toString()
              )
              prev()
            }}
            className="border border-dark-blue-10 text-dark-blue-100 p-0 bg-dark-blue-10"
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center justify-start gap-2 mx-2">
            <p className="text-sm font-medium text-dark-blue-50">
              {' '}
              {dayjs(timeRange[0]).format('Do MMM YYYY')}{' '}
            </p>{' '}
            -
            <p className="text-sm font-medium text-dark-blue-50">
              {' '}
              {dayjs(timeRange[1]).format('Do MMM YYYY')}{' '}
            </p>
          </div>
          {!isNextDisabled && (
            <Button
              size="small"
              onClick={() => {
                trackLabsAndVitalsPreviousNextClicked(
                  type,
                  timeFilter.toString()
                )
                next()
              }}
              className="border border-dark-blue-10 text-dark-blue-100 p-0 bg-dark-blue-10"
            >
              <ChevronRight />
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  )
}

export default TimeRangeFilter
