import { Button, ButtonGroup, Popper } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'

export type DateRangeValue = {
  startDate: Date
  endDate: Date
} | null

enum FilterType {
  MONTH,
  ALL_TIME,
  CUSTOM_RANGE,
}

interface MonthFilter {
  type: FilterType.MONTH
  months: number
  getLabel: () => string
}

export function MonthFilter(months: number): MonthFilter {
  return {
    type: FilterType.MONTH,
    months,
    getLabel: () => `${months}M`,
  }
}

interface AllTimeFilter {
  type: FilterType.ALL_TIME
  getLabel: () => string
}

export function AllTimeFilter(): AllTimeFilter {
  return {
    type: FilterType.ALL_TIME,
    getLabel: () => 'All time',
  }
}

interface CustomRangeFilter {
  type: FilterType.CUSTOM_RANGE
  getLabel: () => string
}

export function CustomRangeFilter(range?: DateRangeValue): CustomRangeFilter {
  return {
    type: FilterType.CUSTOM_RANGE,
    getLabel: () =>
      range
        ? `${dayjs(range?.startDate).format('DD MMM YYYY')} - ${dayjs(
            range?.endDate
          ).format('DD MMM YYYY')}`
        : 'Custom range',
  }
}

export type Filters = MonthFilter | AllTimeFilter | CustomRangeFilter

type FilterMap = {
  monthly: Filters[]
  allTime: Filters
  customRange: Filters
}

type Props = {
  monthSlots?: number[]
  defaultMonthSlot?: number
  showCustomRange?: boolean
  showAllTime?: boolean
  children: React.ReactNode
}

type DateRangeSelectorProps = {
  anchorEl: HTMLElement | null
  onClose: (range: DateRangeValue) => void
}

function DateRangeSelector({ anchorEl, onClose }: DateRangeSelectorProps) {
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const handleDateRangeChange = (item: any) => {
    setState([item.selection])
    if (!dayjs(item.selection.startDate).isSame(item.selection.endDate)) {
      onClose(item.selection)
    }
  }

  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="bottom-start"
      className="z-20"
    >
      <DateRange
        editableDateInputs
        onChange={handleDateRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </Popper>
  )
}

type ContextType = {
  currentFilter: Filters
  currentRange: DateRangeValue
  next: () => void
  prev: () => void
}

export const DateRangeContext = React.createContext<ContextType>({
  currentFilter: AllTimeFilter(),
  currentRange: null,
  next: () => null,
  prev: () => null,
})

function DateRangeFiltered({
  monthSlots = [1, 3, 12],
  defaultMonthSlot = 3,
  showAllTime = true,
  showCustomRange = true,
  children,
}: Props) {
  const allMonthFilters = monthSlots.map(MonthFilter)
  const defaultFilter =
    allMonthFilters.find((filter) => filter.months === defaultMonthSlot) ||
    AllTimeFilter()

  const [allFilters, setAllFilters] = useState<FilterMap>({
    monthly: allMonthFilters,
    allTime: AllTimeFilter(),
    customRange: CustomRangeFilter(),
  })

  const [currentFilter, setCurrentFilter] = useState<Filters>(defaultFilter)
  const [currentRange, setCurrentRange] = useState<DateRangeValue>(null)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleCustomRangeClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setCurrentFilter(allFilters.customRange)
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleCustomDateRange = (range: DateRangeValue) => {
    setCurrentRange(range)
    setAnchorEl(null)
    const newCustomFilter = CustomRangeFilter(range)
    setAllFilters({
      ...allFilters,
      customRange: newCustomFilter,
    })
    setCurrentFilter(newCustomFilter)
  }

  const mapMonthToRange = (month: number): DateRangeValue => {
    const end = new Date()
    const start = dayjs(end).subtract(month, 'month').toDate()
    return {
      startDate: start,
      endDate: end,
    }
  }

  useEffect(() => {
    if (currentFilter.type === FilterType.MONTH) {
      setCurrentRange(mapMonthToRange(currentFilter.months))
    } else if (currentFilter.type === FilterType.ALL_TIME) {
      setCurrentRange(null)
    }
  }, [currentFilter])

  const nextRange = () => {
    if (currentFilter.type === FilterType.MONTH) {
      const range = {
        startDate: dayjs(currentRange?.startDate)
          .add(currentFilter.months, 'month')
          .toDate(),
        endDate: dayjs(currentRange?.endDate)
          .add(currentFilter.months, 'month')
          .toDate(),
      }

      setCurrentRange(range)
    }
  }

  const prevRange = () => {
    if (currentFilter.type === FilterType.MONTH) {
      const range = {
        startDate: dayjs(currentRange?.startDate)
          .subtract(currentFilter.months, 'month')
          .toDate(),
        endDate: dayjs(currentRange?.endDate)
          .subtract(currentFilter.months, 'month')
          .toDate(),
      }

      setCurrentRange(range)
    }
  }

  const providerValue = useMemo(
    () => ({
      currentFilter,
      currentRange,
      next: nextRange,
      prev: prevRange,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFilter, currentRange]
  )

  return (
    <DateRangeContext.Provider value={providerValue}>
      <div className="sticky mt-4 mb-4 top-0 bg-white p-0 font-rubik z-10">
        <ButtonGroup size="small" variant="outlined" className="p-0">
          {allFilters.monthly.map((filter, index) => (
            <Button
              key={index}
              size="small"
              className={`
                  border border-dark-blue-10
                  ${
                    currentFilter === filter
                      ? 'bg-dark-blue-10 text-dark-blue-100'
                      : 'text-dark-blue-50'
                  }
                `}
              onClick={() => setCurrentFilter(filter)}
            >
              {filter.getLabel()}
            </Button>
          ))}
          {showAllTime && (
            <Button
              size="small"
              className={`
                  border border-dark-blue-10
                  ${
                    currentFilter === allFilters.allTime
                      ? 'bg-dark-blue-10 text-dark-blue-100'
                      : 'text-dark-blue-50'
                  }
                `}
              onClick={() => setCurrentFilter(allFilters.allTime)}
            >
              {allFilters.allTime.getLabel()}
            </Button>
          )}

          {showCustomRange && (
            <Button
              size="small"
              className={`
                  border border-dark-blue-10
                  ${
                    currentFilter === allFilters.customRange
                      ? 'bg-dark-blue-10 text-dark-blue-100'
                      : 'text-dark-blue-50'
                  }
                `}
              onClick={handleCustomRangeClick}
            >
              {allFilters.customRange.getLabel()}
            </Button>
          )}
        </ButtonGroup>
      </div>
      <DateRangeSelector anchorEl={anchorEl} onClose={handleCustomDateRange} />
      <div>{children}</div>
    </DateRangeContext.Provider>
  )
}

export const useDateRangeFilter = () => {
  const context = React.useContext(DateRangeContext)
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeContext')
  }
  return context
}

export const makeFilterDataByDate =
  (filterByDate: boolean, dateRange: DateRangeValue) =>
  (arr: any[], dateColumnKey: string) => {
    if (filterByDate && dateRange) {
      return arr.filter((item: any) => {
        return dayjs(item[dateColumnKey]).isBetween(
          dateRange.startDate,
          dateRange.endDate,
          'day',
          '[]'
        )
      })
    }

    return arr
  }

export const makeFilterListDataByDate =
  (filterByDate: boolean, dateRange: DateRangeValue) =>
  (arr: any[], dateColumnKey: string) => {
    if (filterByDate && dateRange) {
      return arr.filter((item: any) => {
        return dayjs(item?.data[dateColumnKey]).isBetween(
          dateRange.startDate,
          dateRange.endDate,
          'day',
          '[]'
        )
      })
    }

    return arr
  }

export default DateRangeFiltered
