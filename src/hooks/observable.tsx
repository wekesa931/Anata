import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'

export default function useObservable<T>(
  observable: Observable<T>,
  initial?: any,
  deps: any[] = []
) {
  const [state, setState] = useState(initial)

  useEffect(() => {
    const subscription = observable.subscribe(setState)
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
