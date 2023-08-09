import React from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import { interactionlogform } from 'src/modules/workflows/utils'
import logError from 'src/utils/logging/logger'
import { useUser } from 'src/context/user'

type AirtableMetaType = {
  airtableMeta: any
  loading: boolean
}

const AirtableMetaContext = React.createContext<AirtableMetaType>({
  airtableMeta: null,
  loading: false,
})

export function AirtableMetaProvider({ children }: any) {
  const [airtableMeta, setAirtableMeta] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const user = useUser()

  const providerValue = React.useMemo(
    () => ({
      airtableMeta,
      loading,
    }),
    [airtableMeta, loading]
  )

  React.useEffect(() => {
    setLoading(true)
    if (airtableMeta === null && user) {
      airtableFetch('tables')
        .then((res) => {
          const tables = res?.tables || res
          let tableMap: any = {}
          
          tables?.forEach((tb: any) => {
            let fields: any = {}
            tb?.fields?.forEach((fl: any) => {
              fields = {
                ...fields,
                primaryFieldName: tb.fields[0]?.name,
                [fl.id]: fl,
              }
            })
            tableMap = {
              ...tableMap,
              [tb.id]: {
                ...tb,
                fields,
              },
            }
          })
          setAirtableMeta({ ...tableMap, interactionlogform })
        })
        .catch((e) => logError(e))
        .finally(() => {
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AirtableMetaContext.Provider value={providerValue}>
      {children}
    </AirtableMetaContext.Provider>
  )
}

export const useAirtableMeta = () => {
  return React.useContext(AirtableMetaContext)
}
