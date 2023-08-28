import { useMutation } from '@apollo/client'
import { useState } from 'react'
import logError from 'src/utils/logging/logger'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import airtableFetch from 'src/services/airtable/fetch'
import {
  CreateWorkflowVariables,
  CreateCaseVariables,
  UpdateCaseVariables,
  SaveWorkflowVariables,
  InteractionsVariables,
  FeedbackVariables,
  SaveModuleData,
  TWorkflow,
  WorkflowVariables,
  DeleteModuleVariables,
  DeleteWorkflowVariables,
} from 'src/modules/workflows/types'
import {
  ActiveForm,
  extractUsername,
  feedbackPayload,
  generatePayload,
  interactionLogPayload,
  omitKeys,
  renameField,
} from 'src/modules/workflows/utils'
import TABLE_ROUTES from 'src/config/airtable-tables'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { useLazyDataSource, NormalizeDataFn } from 'src/services/api/utils'
import { generateId } from 'src/storage/utils'
import {
  CREATE_WORKFLOW,
  SAVE_WORKFLOW,
  CREATE_INTERACTION,
  CREATE_MEMBER_FEEDBACK,
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

export const useProcessNewWorkflowModule = () => {
  const { getHifInfo, createHif, createTableEntry } = useHNOSData()
  const { airtableMeta } = useAirtableMeta()
  const { member } = useMember()

  const processNewWorkflowData = async (
    data: any,
    formName: string,
    formMeta: any
  ) => {
    const activeForm = ActiveForm(formName)
    if (
      !activeForm.isInteractionsLog &&
      !activeForm.isMemberFeedback &&
      airtableMeta
    ) {
      let payload = omitKeys(data, ['moduleId', 'Case ID', 'isDraft'])

      if (activeForm.isHIFMinor || activeForm.isInterventionDataTracking) {
        payload = omitKeys(payload, ['Member'])
      }

      if (activeForm.isPhysio) {
        payload = renameField(payload, 'Member', 'member')
      }

      if (activeForm.isLogisticsTasks || activeForm.isIncidentReports) {
        payload = renameField(payload, 'Member', 'Members')
      }

      if (activeForm.isHIF) {
        payload = {
          ...payload,
          'HIF Completed': true,
          'Antara ID': member?.antaraId,
        }
      }

      const generatedPayload = generatePayload(payload, formMeta, airtableMeta)

      const hifId = await getHifInfo(member?.airtableRecordId)
      const tableName = TABLE_ROUTES[formName]

      if (activeForm.isHIF && hifId) {
        return createHif(hifId, generatedPayload)
      }
      if (tableName) {
        return createTableEntry(tableName, generatedPayload)
      }
    }

    return null
  }

  return {
    processNewWorkflowData,
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

export const useCreateInteraction = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_INTERACTION)
  const user = useUser()
  const { member } = useMember()

  const createInteraction = async (data: any) => {
    if (member && user) {
      const interactionsData: InteractionsVariables =
        interactionLogPayload(data)
      const outcomeMetadata: any = {
        creator: user.email,
      }
      const outcome = JSON.stringify(interactionsData.outcome)
      if (interactionsData.reasonForConsultation) {
        outcomeMetadata.reasonForConsultation =
          interactionsData.reasonForConsultation
        delete interactionsData.reasonForConsultation
      }

      const variables = {
        input: {
          ...interactionsData,
          outcome,
          outcomeMetadata,
          historyUserIdField: user.email,
          member: member.antaraId,
          // navigator defaults to current logged in user
          healthNavigator: extractUsername(user.email),
        },
      }

      const res = await mutate({
        variables,
      })

      if (res?.data?.createInteraction?.status !== 200) {
        const errorMessage = 'Failed to save interaction log data'
        logError(res)
        throw new Error(errorMessage)
      }

      return res?.data?.createInteraction
    }

    return null
  }

  return {
    createInteraction,
    loading,
    error,
  }
}

export const useCreateFeedback = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_MEMBER_FEEDBACK, {
    context: {
      clientName: 'v2',
    },
  })
  const user = useUser()
  const { member } = useMember()

  const createFeedback = async (data: any) => {
    if (member) {
      const feedbackData: FeedbackVariables = feedbackPayload(data)
      const feedback = feedbackData.feedback && feedbackData.feedback === 'Yes'
      const createdBy = user && user.email
      const variables = {
        input: {
          ...feedbackData,
          feedback,
          createdBy,
          memberAntaraId: member.antaraId,
          source: feedbackData?.source[0],
        },
      }

      const res = await mutate({
        variables,
      })

      if (res?.data?.memberFeedback?.status !== 200) {
        const errorMessage = 'Failed to save feedback data'
        logError(res)
        throw new Error(errorMessage)
      }

      return res?.data?.memberFeedback
    }

    return null
  }

  return {
    createFeedback,
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
