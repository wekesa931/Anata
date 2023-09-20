import React from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import { interactionlogform } from 'src/modules/workflows/utils'
import logError from 'src/utils/logging/logger'
import { useUser } from 'src/context/user'
import { keyBy } from 'lodash'

type AirtableMetaType = {
  airtableMeta: any
  loading: boolean
}

const AirtableMetaContext = React.createContext<AirtableMetaType>({
  airtableMeta: null,
  loading: false,
})

type Props = {
  children: React.ReactNode
  meta?: any
}

export function AirtableMetaProvider({ children, meta }: Props) {
  const [airtableMeta, setAirtableMeta] = React.useState<any>(meta || null)
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
          // The server sometimes misses the tables key and returns the tables within the response as a flat array.
          let tables = res?.tables || res
          tables = tables?.map((tb: any) => {
            const fieldsById = keyBy(tb?.fields, 'id')
            return {
              ...tb,
              primaryFieldName: fieldsById[tb.primaryFieldId]?.name,
              fields: fieldsById,
            }
          })
          const tableMap: any = keyBy(tables, 'id')
          // interaction log mapping is not part of Airtable tables. We pull the schema from our frontend definition
          tableMap.interactionlogform = interactionlogform
          setAirtableMeta(tableMap)
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
