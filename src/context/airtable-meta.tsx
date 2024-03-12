import React from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import { interactionlogform } from 'src/modules/workflows/utils'
import logError from 'src/utils/logging/logger'
import { useUser } from 'src/context/user'
import { keyBy } from 'lodash'
import { useTasksAPI } from 'src/modules/tasks/services/tasks.service'

type AirtableMetaType = {
  airtableMeta: any
  loading: boolean
  taskDefinitions: any
  getTaskDefinitionById: (id: string) => any
}

const AirtableMetaContext = React.createContext<AirtableMetaType>({
  airtableMeta: null,
  loading: false,
  taskDefinitions: [],
  getTaskDefinitionById: () => null,
})

type Props = {
  children: React.ReactNode
  meta?: any
}

export type AirtableMetaData = ReturnType<typeof useAirtableMeta>

export function AirtableMetaProvider({ children, meta }: Props) {
  const [airtableMeta, setAirtableMeta] = React.useState<any>(meta || null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const user = useUser()
  const [taskDefinitions, setTaskDefinitions] = React.useState<any>([])
  const { getAllDefinitionTemplates } = useTasksAPI()

  const getTaskDefinitionById = (id: string) => {
    return taskDefinitions.find((t: any) => t.recordId === id)
  }
  const providerValue = React.useMemo(
    () => ({
      airtableMeta,
      loading,
      taskDefinitions,
      getTaskDefinitionById,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [airtableMeta, loading, taskDefinitions]
  )

  React.useEffect(() => {
    if (user) {
      getAllDefinitionTemplates()
        .then((res: any) => {
          setTaskDefinitions(res)
        })
        .catch(logError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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
  }, [user])

  return (
    <AirtableMetaContext.Provider value={providerValue}>
      {children}
    </AirtableMetaContext.Provider>
  )
}

export const useAirtableMeta = () => {
  return React.useContext(AirtableMetaContext)
}
