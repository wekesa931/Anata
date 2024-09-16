import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { TimeRange, TimeFilters } from 'src/modules/vitals/types'

export const BP_OBSERVER = new Subject<void>()
export const BS_OBSERVER = new Subject<void>()
export const VITALS_OBSERVER = new Subject<void>()
export const CHL_OBSERVER = new Subject<void>()

type FetchFunction = () => Promise<any>
type ClustersFetchFunction = (
  range: TimeRange,
  filter: TimeFilters,
  refetch: boolean
) => Promise<any>

export const useLabsAndVitalsObserver = (
  observer: Subject<void>,
  fetchFunction: FetchFunction,
  refetchFunction: FetchFunction,
  initialData: any = []
) => {
  const [data, setData] = useState<any>(initialData)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (refetch: boolean = false) => {
    try {
      setError(null)
      setLoading(true)
      const fn = refetch ? refetchFunction : fetchFunction
      const res = await fn()
      setData(res)
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const subscription = observer.subscribe(() => fetchData(true))

    return () => {
      subscription.unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observer])

  return {
    data,
    error,
    loading,
  }
}

/**
 * This hook is used to observe the clusters data
 *
 * It maintains the current time filter and range and reacts appropriately to changes
 */

type RangeFilterContols = {
  range: TimeRange
  filter: TimeFilters
}

export const useClustersObserver = (
  observer: Subject<void>,
  fetchFunction: ClustersFetchFunction
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [clusters, setClusters] = useState<Record<string, any>[]>([])
  const [rangeFilterControls, setRangeFilterControls] =
    useState<RangeFilterContols>({
      range: [null, null],
      filter: TimeFilters.ONE_MONTH,
    })

  const updateRangeFilterControls = (controls: RangeFilterContols) => {
    setLoading(true)
    // spread to ensure clone
    setRangeFilterControls({ ...rangeFilterControls, ...controls })
  }

  const loadData = async (refetch: boolean = false) => {
    setLoading(true)

    try {
      setError(null)
      return fetchFunction(
        rangeFilterControls.range,
        rangeFilterControls.filter,
        refetch
      )
    } catch (e: any) {
      setError(e)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 100)
    }
  }

  useEffect(() => {
    // flag to check if component is mounted and ensure that previous calls do not override the latest call
    let isMounted = true

    const fetchData = async () => {
      const data = await loadData()
      if (isMounted) {
        setClusters(data)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeFilterControls.filter, rangeFilterControls.range])

  useEffect(() => {
    const subscription = observer.subscribe(async () => {
      setLoading(true)
      const data = await loadData(true)

      setClusters(data)
    })

    return () => {
      subscription.unsubscribe()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observer])

  return {
    currentTimeFilter: rangeFilterControls.filter,
    currentRange: rangeFilterControls.range,
    clusters,
    loading,
    error,
    updateRangeFilterControls,
  }
}
