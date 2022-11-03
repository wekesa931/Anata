import React from 'react'

type LoadingContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingContext = React.createContext<LoadingContextType>({
  loading: false,
  setLoading: () => null,
})

// handle submitting state outside the component for updates
export const initialReducerState = {
  loading: false,
}

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

function LoadingProvider({ children }: any) {
  const [state, dispatch] = React.useReducer(reducer, initialReducerState)

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const loadingContextValue = React.useMemo(
    () => ({
      loading: state.loading,
      setLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.loading]
  )

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => React.useContext(LoadingContext)

export { LoadingProvider, useLoading }
