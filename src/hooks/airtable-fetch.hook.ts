import { useEffect, useReducer } from 'react'
import airtableFetch from '../resources/airtableFetch'

const useAirtableFetch = (url: string) => {
  const reducer = (
    state: {
      isLoading: boolean
      isError: boolean
      isRefreshing: boolean
      data: any
    },
    action: { type: string; payload?: any }
  ) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          isRefreshing: false,
          data: action.payload,
        }
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isRefreshing: false,
          isError: true,
        }
      case 'REFRESH':
        return {
          ...state,
          isRefreshing: true,
        }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    isRefreshing: false,
    data: {},
  })
  const refresh = () => dispatch({ type: 'REFRESH' })
  useEffect(() => {
    let didCancel = false

    if (!url) return
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await airtableFetch(url)
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    }
    fetchData()
    // eslint-disable-next-line consistent-return
    return () => {
      didCancel = true
    }
  }, [url, state.isRefreshing])

  return { ...state, refresh }
}

export default useAirtableFetch
