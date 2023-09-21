import { useMutation } from '@apollo/client'
import { useState } from 'react'
import logError from 'src/utils/logging/logger'
import airtableFetch from 'src/services/airtable/fetch'
import {
  CreateWorkflowVariables,
  CreateCaseVariables,
  UpdateCaseVariables,
  SaveWorkflowVariables,
  SaveModuleData,
  TWorkflow,
  WorkflowVariables,
  DeleteModuleVariables,
  DeleteWorkflowVariables,
} from 'src/modules/workflows/types'
import { useLazyDataSource, NormalizeDataFn } from 'src/services/api/utils'
import { generateId } from 'src/storage/utils'
import {
  CREATE_WORKFLOW,
  SAVE_WORKFLOW,
  SAVE_MODULE_DATA,
  GET_WORKFLOWS,
  REMOVE_MODULE,
  CANCEL_WORKFLOW,
  ADD_MODULE_TO_WORKFLOW,
} from './gql'

type RawForm = {
  name: string
  moduleId: string
  isDraft: boolean
  data: Record<string, any>
  createdAt?: string
}

const isFormDraft = (workflow: TWorkflow, formData: any, formName: string) => {
  if (formData[formName]?.status === 'Draft') {
    return true
  }

  if (formData[formName]?.status === 'Saved') {
    return false
  }

  if (workflow.completed) {
    return false
  }

  return true
}

const transformWorkflow = (workflow: TWorkflow) => {
  const { currentModules, moduleData, ...rest } = workflow

  const forms: RawForm[] = []
  currentModules.forEach((moduleName: string) => {
    if (!moduleData[moduleName]) {
      forms.push({
        name: moduleName,
        moduleId: generateId(),
        isDraft: true,
        data: {},
      })
    } else {
      let moduleValues = moduleData[moduleName]?.filled_values || []
      if (moduleValues && !Array.isArray(moduleValues)) {
        moduleValues = [moduleValues]
      }

      moduleValues.forEach((moduleValue: any) => {
        const values = moduleValue || {}
        const isDraft =
          'isDraft' in values
            ? values.isDraft
            : isFormDraft(workflow, moduleData, moduleName)

        const formModuleId = values?.moduleId || generateId()
        forms.push({
          name: moduleName,
          moduleId: formModuleId,
          isDraft,
          data: {
            ...values,
            moduleId: formModuleId,
          },
          createdAt: moduleData[moduleName]?.created_at,
        })
      })
    }
  })

  return {
    ...rest,
    forms,
  }
}

export const normalizeWorkflowData: NormalizeDataFn<TWorkflow[]> = (
  data: any
) => {
  return data?.workflows?.edges?.map(({ node }: { node: TWorkflow }) =>
    transformWorkflow(node)
  )
}

export const useLoadWorkflows = () =>
  useLazyDataSource<TWorkflow[], WorkflowVariables>(
    GET_WORKFLOWS,
    normalizeWorkflowData
  )

export const useCreateWorkflow = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_WORKFLOW)

  return {
    createWorkflow: async (variables: CreateWorkflowVariables) => {
      const res = await mutate({
        variables,
      })

      if (res?.data?.createWorkflow?.status !== 200) {
        throw new Error(JSON.stringify(res.data.createWorkflow.errors))
      }

      return res?.data?.createWorkflow?.workflow
    },
    loading,
    error,
  }
}

export const useCreateCase = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const createCase = async (variables: CreateCaseVariables) => {
    setLoading(true)
    const res = await airtableFetch('create/caseId', 'post', {
      fields: variables,
    })
    if (Array.isArray(res)) {
      setLoading(false)
      throw new Error('The workflow has not been saved in airtable')
    }

    setLoading(false)
    return res
  }

  const updateCase = async (variables: UpdateCaseVariables) => {
    setLoading(true)
    const updated = await airtableFetch('caseId', 'post', variables)
    if (Array.isArray(updated)) {
      setLoading(false)
      throw new Error('The workflow has not been saved in airtable')
    }

    setLoading(false)
    return updated
  }
  return {
    createCase,
    updateCase,
    loading,
  }
}

export const useAddWorkflowModule = () => {
  const [mutate, { loading, error }] = useMutation(ADD_MODULE_TO_WORKFLOW)

  return {
    addModule: async (variables: any) => {
      const res = await mutate({
        variables,
      })

      if (res?.data?.addWorkflowModule?.status !== 200) {
        throw new Error(JSON.stringify(res.data.addWorkflowModule.errors))
      }

      return res?.data?.addWorkflowModule?.workflow
    },
    loading,
    error,
  }
}

export const useSaveWorkflow = () => {
  const [mutate, { loading, error }] = useMutation(SAVE_WORKFLOW)

  return {
    saveWorkflow: async (variables: SaveWorkflowVariables) => {
      const res = await mutate({
        variables,
      })

      if (res?.data?.updateWorkflow?.status !== 200) {
        throw new Error(JSON.stringify(res.data.updateWorkflow.errors))
      }

      return res?.data?.updateWorkflow?.workflow
    },
    loading,
    error,
  }
}

export const useHNOSData = () => {
  const getHifInfo = async (memberId?: string | null) => {
    if (memberId) {
      const hifInfo = await airtableFetch(
        `hif/list?filterByFormula=FIND("${memberId}", {Member Record ID})`
      )

      if (hifInfo.length > 0) {
        return hifInfo[0]['HIF Record ID']
      }
    }

    return null
  }

  const post = async (tableName: string, payload: any) => {
    const res = await airtableFetch(tableName, 'post', payload)

    if (typeof res === 'string') {
      logError(res)
      throw new Error(res)
    }

    if (Array.isArray(res)) {
      throw new Error(res[0].error)
    }

    return res
  }

  const createHif = async (hifId: string, payload: any) => {
    return post('hif', {
      id: hifId,
      fields: payload?.fields,
    })
  }

  const createTableEntry = async (tableName: string, payload: any) => {
    return post(`create/${tableName}`, payload)
  }

  return {
    getHifInfo,
    createHif,
    createTableEntry,
  }
}

export const useSaveModuleData = () => {
  const [mutate, { loading, error }] = useMutation(SAVE_MODULE_DATA)

  const saveModuleData = async (variables: SaveModuleData) => {
    const res = await mutate({
      variables,
    })

    if (res?.data?.saveModuleData?.status !== 200) {
      throw new Error(JSON.stringify(res.data.saveModuleData.errors))
    }

    return res?.data?.saveModuleData?.workflow
  }

  return {
    saveModuleData,
    loading,
    error,
  }
}

export const useRemoveModule = () => {
  const [mutate, { loading, error }] = useMutation(REMOVE_MODULE)

  const removeModule = async (variables: DeleteModuleVariables) => {
    const res = await mutate({
      variables,
    })

    if (res?.data?.removeWorkflowModule?.status !== 200) {
      throw new Error(JSON.stringify(res.data.removeWorkflowModule.errors))
    }
    return res?.data?.removeWorkflowModule?.workflow
  }

  return {
    removeModule,
    loading,
    error,
  }
}

export const useRemoveWorkflow = () => {
  const [mutate, { loading, error }] = useMutation(CANCEL_WORKFLOW)

  const removeWorkflow = async (variables: DeleteWorkflowVariables) => {
    const res = await mutate({
      variables,
    })

    if (res?.data?.cancelWorkflow?.status !== 200) {
      throw new Error(JSON.stringify(res.data.cancelWorkflow.errors))
    }
    return res?.data?.cancelWorkflow?.workflow
  }

  return {
    removeWorkflow,
    loading,
    error,
  }
}
