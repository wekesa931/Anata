import React from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import { interactionlogform } from 'src/modules/workflows/utils'
import logError from 'src/utils/logging/logger'
import { useUser } from 'src/context/user'
import { keyBy } from 'lodash'
import { useTasksAPI } from 'src/modules/tasks/services/tasks.service'

export type GetFieldOptionsFn = (tableName: string, fieldName: string) => any

type AirtableMetaType = {
  airtableMeta: any
  loading: boolean
  taskDefinitions: any
  getTaskDefinitionById: (id: string) => any
  getFieldOptions: GetFieldOptionsFn
}

const AirtableMetaContext = React.createContext<AirtableMetaType>({
  airtableMeta: null,
  loading: false,
  taskDefinitions: [],
  getTaskDefinitionById: () => null,
  getFieldOptions: () => null,
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

  const findFromObjectValuesByName = (obj: any, value: any) => {
    return Object.values(obj).find((v: any) => v.name === value)
  }

  const getFieldOptions = (tableName: string, fieldName: string) => {
    if (!airtableMeta) return []

    const table: any = findFromObjectValuesByName(airtableMeta, tableName)
    if (!table) return []
    const field: any = findFromObjectValuesByName(table?.fields, fieldName)
    if (!field) return []

    if (field?.options?.choices) {
      return field.options.choices?.map((choice: any) => ({
        label: choice?.name,
        value: choice?.name,
      }))
    }
  }

  const providerValue = React.useMemo(
    () => ({
      airtableMeta,
      loading,
      taskDefinitions,
      getTaskDefinitionById,
      getFieldOptions,
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
