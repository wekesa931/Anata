import {
  QueryLazyOptions,
  useLazyQuery,
  useQuery,
  QueryHookOptions,
} from '@apollo/client'
import { DocumentNode } from 'graphql'
import { useState } from 'react'

export type NormalizeDataFn<T> = (data: any) => T
type ApiResponseType<T> = {
  data: T
  getData: (opts?: any) => void
  loading: boolean
  error: unknown
}

export type ApiDataSource<Q, T> = (
  query: Q extends DocumentNode ? Q : unknown,
  opts?: QueryLazyOptions<Q>,
  normalizeData?: NormalizeDataFn<T>
) => ApiResponseType<T>

export function useLazyDataSource<T, Q>(
  query: any,
  normalizeData?: NormalizeDataFn<T>,
  opts?: QueryLazyOptions<Q>
) {
  const [data, setData] = useState<T | null>(null)

  const [getData, { loading, error, refetch }] = useLazyQuery(query, {
    ...opts,
    onCompleted: (response: any) =>
      setData(normalizeData ? normalizeData(response) : response),
  })

  return {
    data,
    getData,
    loading,
    error,
    refetch,
  }
}

export function useDataSource<T, Q>(
  query: any,
  normalizeData?: NormalizeDataFn<T>,
  opts?: QueryHookOptions<Q>
) {
  const [data, setData] = useState<T | null>(null)
  const { loading, error } = useQuery(query, {
    ...opts,
    onCompleted: (response: any) =>
      setData(normalizeData ? normalizeData(response) : response),
  })

  return {
    data,
    loading,
    error,
  }
}
