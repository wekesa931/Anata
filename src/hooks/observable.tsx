import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'

type FetchFunction<T> = (refetch?: boolean) => Promise<T[] | any>

export default function useObservable<T>(
  observable: Observable<T>,
  initial?: any,
  deps: any[] = []
) {
  const [state, setState] = useState(initial)

  useEffect(() => {
    const subscription = observable.subscribe((c) => {
      setState(c)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}

export function useRefetchDataObserver<T>(
  observable: Observable<void>,
  fetchFunction: FetchFunction<T>,
  initialData: any = [],
  deps: any[] = []
) {
  const [data, setData] = useState<any>(initialData)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const loadData = async (refetch: boolean = false) => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetchFunction(refetch)
      setData(res)
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps])

  useEffect(() => {
    const subscription = observable.subscribe(() => loadData(true))

    return () => {
      subscription.unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observable])

  return {
    data,
    loading,
    error,
  }
}
