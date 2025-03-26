import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface IRefreshTrigger {
  refreshKey: string
  triggerRefreshComponent: (val: string) => void
  setRefreshKey: React.Dispatch<React.SetStateAction<string>>
}

const RefreshContext = createContext<IRefreshTrigger>({
  refreshKey: '',
  triggerRefreshComponent: () => {},
  setRefreshKey: () => {},
})

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshKey, setRefreshKey] = useState<string>('')

  const triggerRefreshComponent = useCallback(
    (val: string) => {
      setRefreshKey(val)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshKey]
  )

  // memoized context values to prevent re-renders
  const memoedValue = useMemo(
    () => ({
      refreshKey,
      triggerRefreshComponent,
      setRefreshKey,
    }),
    [refreshKey, triggerRefreshComponent, setRefreshKey]
  )

  return (
    <RefreshContext.Provider value={memoedValue}>
      {children}
    </RefreshContext.Provider>
  )
}

// Hook to use the shared refresh state
const useRefreshTrigger = () => {
  const context = useContext(RefreshContext)

  if (context === undefined) {
    throw new Error('useRefreshTrigger must be used within a RefreshContext')
  }

  return context
}

export { RefreshContext, useRefreshTrigger }
