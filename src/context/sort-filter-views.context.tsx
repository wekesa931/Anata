import React, { useReducer, Dispatch } from 'react'

type ContextType = {
  ops: {
    sort: string
    filters: {
      appointments: any
      medications: any
      interactions: any
      conditions: any
    }
  }
  updateOps: Dispatch<{ type: string; payload: any }>
}

const SortFilterContext = React.createContext<ContextType>({
  ops: {
    sort: 'desc',
    filters: {
      appointments: null,
      medications: null,
      interactions: null,
      conditions: null,
    },
  },
  updateOps: ({ type }) => type,
})

enum Actions {
  SORT = 'sort',
  FILTER_APPOINTMENTS = 'filterAppts',
  FILTER_MEDICATIONS = 'filterMeds',
  FILTER_INTERACTIONS = 'filterInteractions',
  FILTER_CONDITIONS = 'filterConditions',
}

function SortFilterProvider({ children }: any) {
  const reducer = (state: any, action: { type: string; payload: any }) => {
    switch (action.type) {
      case Actions.SORT:
        return { ...state, sort: action.payload }
      case Actions.FILTER_APPOINTMENTS:
        return {
          ...state,
          filters: {
            ...state.filters,
            appointments: { ...state.filters.appointments, ...action.payload },
          },
        }
      case Actions.FILTER_MEDICATIONS:
        return {
          ...state,
          filters: {
            ...state.filters,
            medications: { ...state.filters.medications, ...action.payload },
          },
        }
      case Actions.FILTER_CONDITIONS:
        return {
          ...state,
          filters: {
            ...state.filters,
            conditions: { ...state.filters.conditions, ...action.payload },
          },
        }
      case Actions.FILTER_INTERACTIONS:
        return {
          ...state,
          filters: {
            ...state.filters,
            interactions: { ...state.filters.interactions, ...action.payload },
          },
        }
      default:
        return state
    }
  }

  const initialState = {
    sort: 'desc',
    filters: {
      appointments: {
        service: null,
        status: null,
      },
      medications: {
        name: null,
        status: 'ongoing',
      },
      interactions: {
        type: null,
        direction: null,
        mode_of_communication: null,
      },
      conditions: {
        status: 'Active',
      },
    },
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const sortProviderValue = React.useMemo(
    () => ({ ops: state, updateOps: dispatch }),
    [state]
  )

  return (
    <SortFilterContext.Provider value={sortProviderValue}>
      {children}
    </SortFilterContext.Provider>
  )
}
const useSortFilter = () => React.useContext(SortFilterContext)

export { SortFilterProvider, useSortFilter, Actions as SortFilterActions }
