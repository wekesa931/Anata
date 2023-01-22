import React from 'react'
import airtableFetch from '../resources/airtable-fetch'
import { interactionlogform } from '../components/bene-dashboard/actions/workflows/Forms/form-fields'
import logError from '../components/utils/error_handling/sentry'

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

  const providerValue = React.useMemo(
    () => ({
      airtableMeta,
      loading,
    }),
    [airtableMeta, loading]
  )

  React.useEffect(() => {
    setLoading(true)
    if (airtableMeta === null) {
      airtableFetch('tables')
        .then((res) => {
          let tableMap: any = {}
          res?.tables?.forEach((tb: any) => {
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
