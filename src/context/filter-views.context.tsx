import React from 'react'
import dayjs, { Dayjs } from 'dayjs'

enum Actions {
  SET_DATE_RANGE = 'setDateRange',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  LAST_3_MONTHS = 'last3Months',
  LAST_6_MONTHS = 'last6Months',
}

type TDateRange = [Dayjs | null, Dayjs | null]

type ContextType = {
  dateRange: TDateRange
  handleAction: (action: Actions, payload?: TDateRange) => void
  currentFilter: Actions | null
}

const DateRangeContext = React.createContext<ContextType>({
  dateRange: [null, null],
  handleAction: () => undefined,
  currentFilter: null,
})

function DateFilterProvider({ children }: any) {
  const [currentFilter, setCurrentFilter] = React.useState<Actions | null>(
    Actions.LAST_3_MONTHS
  )

  const reducer = (state: any, action: { type: Actions; payload: any }) => {
    switch (action.type) {
      case Actions.SET_DATE_RANGE:
        setCurrentFilter(Actions.SET_DATE_RANGE)
        return { ...state, dateRange: action.payload }
      case Actions.WEEKLY:
        setCurrentFilter(Actions.WEEKLY)
        return { ...state, dateRange: [dayjs().subtract(7, 'day'), dayjs()] }
      case Actions.MONTHLY:
        setCurrentFilter(Actions.MONTHLY)
        return { ...state, dateRange: [dayjs().subtract(1, 'month'), dayjs()] }
      case Actions.LAST_3_MONTHS:
        setCurrentFilter(Actions.LAST_3_MONTHS)
        return { ...state, dateRange: [dayjs().subtract(3, 'month'), dayjs()] }
      case Actions.LAST_6_MONTHS:
        setCurrentFilter(Actions.LAST_6_MONTHS)
        return { ...state, dateRange: [dayjs().subtract(6, 'month'), dayjs()] }
      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reducer, {
    dateRange: [null, null],
  })

  const handleAction = (action: Actions, payload?: TDateRange) => {
    dispatch({ type: action, payload })
  }

  const providerValue = React.useMemo(() => {
    return {
      dateRange: state.dateRange,
      handleAction,
      currentFilter,
    }
  }, [state.dateRange, currentFilter])

  return (
    <DateRangeContext.Provider value={providerValue}>
      {children}
    </DateRangeContext.Provider>
  )
}

const useDateRangeFilter = () => {
  const context = React.useContext(DateRangeContext)
  if (context === undefined) {
    throw new Error(
      'useDateRangeFilter must be used within a DateFilterProvider'
    )
  }
  return context
}

const makeFilterDataByDate =
  (filterByDate: boolean, dateRange: TDateRange) =>
  (arr: any[], dateColumnKey: string) => {
    if (filterByDate && dateRange.every((item: any) => item !== null)) {
      return arr.filter((item: any) => {
        return dayjs(item[dateColumnKey]).isBetween(
          dateRange[0],
          dateRange[1],
          'day',
          '[]'
        )
      })
    }

    return arr
  }

const makeFilterListDataByDate =
  (filterByDate: boolean, dateRange: TDateRange) =>
  (arr: any[], dateColumnKey: string) => {
    if (filterByDate && dateRange.every((item: any) => item !== null)) {
      return arr.filter((item: any) => {
        return dayjs(item?.data[dateColumnKey]).isBetween(
          dateRange[0],
          dateRange[1],
          'day',
          '[]'
        )
      })
    }

    return arr
  }

export {
  DateFilterProvider,
  DateRangeContext,
  Actions,
  useDateRangeFilter,
  makeFilterDataByDate,
  makeFilterListDataByDate,
}
