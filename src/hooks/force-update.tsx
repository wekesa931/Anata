import { useCallback, useLayoutEffect, useState } from 'react'

const createNewObject = (): Record<string, never> => ({})

const CURRENT_VERSION = 1

export default function useForceUpdate(): VoidFunction {
  const [, setValue] = useState<Record<string, never>>(createNewObject)

  return useCallback((): void => {
    setValue(createNewObject())
  }, [])
}

/**
 * A util hook to force cache clearing whenever an update happens.
 *
 * Usage - we updated the handling of cached data and we'd need users to logout, it provides this convenience
 */
export function useCheckAppUpdate() {
  useLayoutEffect(() => {
    let cachedVersion: number | null | string =
      localStorage.getItem('CURRENT_VERSION')
    cachedVersion = cachedVersion ? Number(cachedVersion) : null

    if (cachedVersion !== CURRENT_VERSION) {
      // clear session storage
      sessionStorage.clear()
      localStorage.setItem('CURRENT_VERSION', `${CURRENT_VERSION}`)
      // trigger a refresh
      window.location.reload()
    }
  }, [])
}
