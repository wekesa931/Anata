import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

/**
 * get a specific query param
 * @param key
 * @returns
 */
export function useQueryParam(key: string): string | null {
  const location = useLocation()

  return useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get(key)
  }, [location.search, key])
}

/**
 * add or update a query param
 * @returns
 */
export function useSetQueryParam() {
  const location = useLocation()
  const navigate = useNavigate()

  return (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(key, value)

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    })
  }
}

/**
 * remove a specific query param
 * @returns
 */
export function useRemoveQueryParam() {
  const location = useLocation()
  const navigate = useNavigate()

  return (key: string) => {
    const searchParams = new URLSearchParams(location.search)

    if (!searchParams.has(key)) return

    searchParams.delete(key)

    const newQuery = searchParams.toString()
    const newUrl = newQuery
      ? `${location.pathname}?${newQuery}`
      : location.pathname

    navigate(newUrl, { replace: true })
  }
}

/**
 * clear all query params
 * @returns
 */
export function useClearAllQueryParams() {
  const location = useLocation()
  const navigate = useNavigate()

  return () => {
    navigate(location.pathname, { replace: true })
  }
}

export function useUpdateQueryParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const updateQueryParams = (newParams: Record<string, string | boolean>) => {
    const currentParams = new URLSearchParams(location.search)

    Object.entries(newParams).forEach(([key, value]) => {
      currentParams.set(key, String(value))
    })

    const newSearch = currentParams.toString()
    navigate(`${location.pathname}?${newSearch}`, { replace: true })
  }

  return updateQueryParams
}

export function useDeleteQueryParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const deleteQueryParams = (keysToRemove: string[]) => {
    const currentParams = new URLSearchParams(location.search)

    keysToRemove.forEach((key) => {
      currentParams.delete(key)
    })

    const newSearch = currentParams.toString()
    const newUrl = newSearch
      ? `${location.pathname}?${newSearch}`
      : location.pathname

    navigate(newUrl, { replace: true })
  }

  return deleteQueryParams
}

export function usePreserveOnlyQueryParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const preserveOnlyQueryParams = (keysToPreserve: string[]) => {
    const currentParams = new URLSearchParams(location.search)
    const newParams = new URLSearchParams()

    keysToPreserve.forEach((key) => {
      const value = currentParams.get(key)
      if (value !== null) {
        newParams.set(key, value)
      }
    })

    const newSearch = newParams.toString()
    const newUrl = newSearch
      ? `${location.pathname}?${newSearch}`
      : location.pathname

    navigate(newUrl, { replace: true })
  }

  return preserveOnlyQueryParams
}
