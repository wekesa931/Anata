import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useEffect, useState } from 'react'
import { Q, Collection } from '@nozbe/watermelondb'
import { useMember } from 'src/context/member'
import {
  Forms,
  Workflows,
  Forms as TWorkflowForm,
  Workflows as TWorkflowModel,
} from 'src/modules/workflows/db/models'
import {
  useCreateCase,
  useSaveWorkflow,
  useCreateInteraction,
  useCreateFeedback,
  useProcessNewWorkflowModule,
  useSaveModuleData,
  useLoadWorkflows,
  normalizeWorkflowData,
  useRemoveModule,
  useRemoveWorkflow,
  useAddWorkflowModule,
} from 'src/modules/workflows/services/workflows.api'
import { useUser } from 'src/context/user'
import { TWorkflow, CreateCaseVariables } from 'src/modules/workflows/types'
import { ActiveForm } from 'src/modules/workflows/utils'
import logError from 'src/utils/logging/logger'
import useObservable from 'src/hooks/observable'
import { useWorkflowAnalytics } from './analytics'

export type WorkflowDataApi = ReturnType<typeof useWorkflowData>

export const useWorkflowData = () => {
  const database = useDatabase()
  const { v2Member } = useMember()
  const user = useUser()
  const { createCase, updateCase, loading: creatingCase } = useCreateCase()
  const { saveWorkflow, loading: savingWorkflow } = useSaveWorkflow()
  const { createInteraction, loading: creatingInteraction } =
    useCreateInteraction()
  const { createFeedback, loading: creatingFeedback } = useCreateFeedback()
  const { processNewWorkflowData } = useProcessNewWorkflowModule()
  const { saveModuleData, loading: savingModuleData } = useSaveModuleData()
  const {
    trackWorkflowCreated,
    trackAirtableSaveSucceeded,
    trackAirtableSaveFailed,
    trackModuleDataSaved,
  } = useWorkflowAnalytics()
  const { getData, loading: gettingWorkflows } = useLoadWorkflows()
  const { removeModule, loading: removingModule } = useRemoveModule()
  const { removeWorkflow, loading: removingWorkflow } = useRemoveWorkflow()
  const { addModule, loading: addingWorkflowModule } = useAddWorkflowModule()

  const formsCollection: Collection<TWorkflowForm> =
    database.collections.get('forms')
  const workflowsCollection: Collection<Workflows> =
    database.collections.get('workflows')

  const incompleteWorkflowsObservable = workflowsCollection
    .query(
      Q.where('member', v2Member?.antaraId || ''),
      Q.where('is_completed', false),
      Q.sortBy('created_at', Q.desc)
    )
    .observe()
  const incompleteWorkflows = useObservable(
    incompleteWorkflowsObservable,
    [] as TWorkflowModel[],
    [workflowsCollection, v2Member?.antaraId]
  )

  const completedWorkflowsObservable = workflowsCollection
    .query(
      Q.where('member', v2Member?.antaraId || ''),
      Q.where('is_completed', true),
      Q.sortBy('created_at', Q.desc)
    )
    .observe()
  const completedWorkflows = useObservable(
    completedWorkflowsObservable,
    [] as TWorkflowModel[],
    [workflowsCollection, v2Member?.antaraId]
  )

  const getFormsByName = async (workflow: TWorkflowModel, name: string) => {
    const forms = await workflow.forms.fetch()
    return forms.filter((form: TWorkflowForm) => form.name === name)
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [submittingForm, setSubmittingForm] = useState<boolean>(false)
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)

  const deleteAllWorkflows = async (memberId: string) => {
    try {
      const workflows = await workflowsCollection
        .query(Q.where('member', memberId))
        .fetch()

      if (workflows.length === 0) return

      // delete all of them including the associated forms
      await database.write(async () => {
        await database.batch(
          ...workflows.map((workflow: TWorkflowModel) =>
            workflow.prepareDestroyPermanently()
          )
        )
      })
    } catch (err) {
      logError(err)
    }
  }

  const addNewWorkflowModule = async (
    workflow: TWorkflowModel,
    moduleName: string
  ) => {
    try {
      return await addModule({
        workflowId: workflow.workflowId,
        moduleName,
      })
    } catch (err) {
      return logError(err)
    }
  }

  const deleteAllForms = async (memberId: string) => {
    try {
      const forms = await formsCollection
        .query(Q.where('member', memberId))
        .fetch()
      if (forms.length === 0) return

      // delete all of them
      await database.write(async () => {
        await database.batch(
          ...forms.map((form) => form.prepareDestroyPermanently())
        )
      })
    } catch (err) {
      logError(err)
    }
  }

  const getNewCaseId = async (workflow: TWorkflowModel) => {
    let caseId = ''
    const caseVariables: CreateCaseVariables = {
      ID: workflow?.workflowId,
      Status: 'Ongoing',
      Members: [v2Member?.airtableRecordId],
      createdBy: workflow.createdBy,
      updatedBy: workflow.updatedBy,
    }

    const res = await createCase(caseVariables)
    caseId = res?.id

    await saveWorkflow({
      workflowId: workflow.workflowId,
      airtableId: caseId,
      completed: false,
    }).then(async (updatedWorkflow: TWorkflow) => {
      // update the db
      await workflow.syncWorkflow(updatedWorkflow)
    })

    return caseId
  }

  const handleSubmitForm = async (
    form: TWorkflowForm,
    formMeta: any,
    formData: any
  ) => {
    const formName = form.name
    const activeForm = ActiveForm(formName)

    if (activeForm.isInteractionsLog) {
      await createInteraction(formData)
      await form.markAsCompleted()
    } else if (activeForm.isMemberFeedback) {
      await createFeedback(formData)
      await form.markAsCompleted()
    }

    // grab the workflow associated with this form
    let workflow: TWorkflowModel | null = null
    let payload = formData

    if (form.workflow.id) {
      workflow = await workflowsCollection.find(form.workflow.id)
      if (workflow) {
        payload = {
          ...payload,
          'Case ID': workflow.airtableId
            ? [workflow.airtableId]
            : [await getNewCaseId(workflow)],
          'Data Source': 'Guided Workflow',
        }
      }
    }

    payload = {
      ...payload,
      'Data Source': form.workflow.id ? 'Guided Workflow' : 'Scribe form',
    }

    return processNewWorkflowData(payload, formName, formMeta)
      .then(async (res: any) => {
        let isModulesDraft = false
        if (workflow) {
          const forms = await workflow.forms.fetch()
          const formsWithSameName = forms.filter(
            (f: Forms) => f.name === formName
          )
          // if there are forms with the same name, check if any of them isDraft
          if (formsWithSameName.length > 0) {
            isModulesDraft = formsWithSameName.some((f: Forms) => f.isDraft)
          }
          const allFormsData = formsWithSameName.map((f: Forms) => ({
            ...f.data,
            isDraft: false,
          }))

          saveModuleData({
            workflowId: workflow?.workflowId,
            moduleName: formName,
            data: allFormsData,
            draft: isModulesDraft,
          }).then(() => {
            form.markAsCompleted(res?.id).then(async () => {
              trackAirtableSaveSucceeded(
                workflow?.workflowObject,
                formName,
                formData
              )
            })
          })
        }
      })
      .catch((err: any) => {
        logError(err)
        if (workflow) {
          trackAirtableSaveFailed(workflow?.workflowObject, formName, formData)
        }
        throw err
      })
      .finally(() => {
        setSubmittingForm(false)
      })
  }

  const syncWorkflow = async (workflow: TWorkflowModel) => {
    if (v2Member && user) {
      const airtableCase = await createCase({
        ID: workflow?.workflowId,
        Status: 'Ongoing',
        Members: [v2Member.airtableRecordId],
        createdBy: workflow.createdBy,
        updatedBy: workflow.updatedBy,
      })

      const updatedWorkflow = await saveWorkflow({
        workflowId: workflow?.workflowId,
        airtableId: airtableCase?.id,
        completed: false,
      })

      await workflow.syncWorkflow(updatedWorkflow)

      return workflow
    }
    throw new Error('Member or user not found')
  }

  const submitForm = async (form: any, formMeta: any, formData: any) => {
    setSubmittingForm(true)
    if (form.workflow.id) {
      const workflow = await workflowsCollection.find(form.workflow.id)
      if (!workflow?.isSynced) {
        return syncWorkflow(workflow)
          .then(() => {
            trackWorkflowCreated(workflow.workflowObject)
            return handleSubmitForm(form, formMeta, formData)
          })
          .finally(() => {
            setSubmittingForm(false)
          })
      }
    }
    return handleSubmitForm(form, formMeta, formData)
  }

  const handleCompleteWorkflow = async (workflow: TWorkflowModel) => {
    const saved = await saveWorkflow({
      workflowId: workflow.workflowId,
      completed: true,
      airtableId: workflow.airtableId || (await getNewCaseId(workflow)),
    })

    await updateCase({
      id: saved.airtableId,
      fields: {
        Status: 'Resolved',
        updatedBy: workflow.updatedBy,
      },
    })

    await workflow.markAsCompleted()
    setShouldRefetch(true)
    return workflow
  }

  const completeWorkflow = async (workflow: TWorkflowModel) => {
    if (workflow.isSynced) {
      return handleCompleteWorkflow(workflow)
    }
    return syncWorkflow(workflow).then(async () => {
      trackWorkflowCreated(workflow.workflowObject)
      await handleCompleteWorkflow(workflow)
    })
  }

  const deleteModuleFromAPI = async (
    workflow: TWorkflowModel,
    moduleName: string
  ) => {
    if (workflow.isSynced) {
      return removeModule({
        workflowId: workflow.workflowId,
        moduleName,
      })
    }

    return Promise.resolve()
  }

  const deleteWorkflowFromAPI = async (workflow: TWorkflowModel) => {
    if (workflow.isSynced) {
      return removeWorkflow({
        workflowId: workflow.workflowId,
      })
    }

    return Promise.resolve()
  }

  const hydrateWorkflows = async () => {
    const loadedWorkflows = await getData({
      variables: {
        workflowId: '',
        memberId: v2Member.antaraId,
      },
      fetchPolicy: 'network-only',
    })
    const normalizedWorkflows = normalizeWorkflowData(loadedWorkflows?.data)

    const newWorkflowIds = normalizedWorkflows.map(
      (w: TWorkflow) => w.workflowId
    )
    const existingWorkflows = await workflowsCollection
      .query(Q.where('member', v2Member.antaraId))
      .fetch()
    const existingWorkflowIds = existingWorkflows.map(
      (w: TWorkflowModel) => w.workflowId
    )

    const workflowsToDelete = existingWorkflows.filter(
      (w: TWorkflowModel) => !newWorkflowIds.includes(w.workflowId)
    )
    const workflowsToUpdate = existingWorkflows.filter((w: TWorkflowModel) =>
      newWorkflowIds.includes(w.workflowId)
    )

    const workflowsToCreate = normalizedWorkflows.filter(
      (w: TWorkflow) => !existingWorkflowIds.includes(w.workflowId)
    )

    // delete workflows that are no longer in the db
    await Promise.all(
      workflowsToDelete.map(async (w: TWorkflowModel) => {
        await w.delete()
      })
    )

    // update workflows that are still in the db
    await Promise.all(
      workflowsToUpdate.map((w: TWorkflowModel) => {
        const updatedWorkflow = normalizedWorkflows.find(
          (nw: TWorkflow) => nw.workflowId === w.workflowId
        )
        if (updatedWorkflow) {
          return w.createFromAPI(updatedWorkflow, v2Member, user)
        }
        return Promise.resolve()
      })
    )

    // create a new workflow for each workflow in the db
    await Promise.all(
      workflowsToCreate.map(async (w: TWorkflow) => {
        try {
          const existingWorkflow = await workflowsCollection.find(w.workflowId)
          await existingWorkflow.createFromAPI(w, v2Member, user)
        } catch (err: any) {
          const notFoundRegex = /Record ([^ ]+) not found/
          const notFoundError = err?.message.match(notFoundRegex)
          if (notFoundError) {
            try {
              const createdWorkflow = await database.write(async () => {
                return workflowsCollection.create((n) => {
                  n.isCompleted = w.completed
                  n.workflowId = w.workflowId
                  n.member = v2Member.antaraId
                  // eslint-disable-next-line no-underscore-dangle
                  n._raw.id = w.workflowId
                })
              })
              createdWorkflow.createFromAPI(w, v2Member, user)
            } catch (e: any) {
              const duplicateRegex =
                /Diagnostic error: Error: Duplicate key for property id: ([A-Z0-9-]+)/
              if (!e?.message.match(duplicateRegex)) {
                logError(e)
              }
            }
          }
        }
      })
    )
  }

  const findWorkflow = async (workflowId: string) => {
    return workflowsCollection.find(workflowId)
  }

  const handleSaveDraftWorkflow = async (
    workflow: TWorkflowModel,
    activeForms: TWorkflowForm[]
  ) => {
    // create a an array payload that looks like this
    // {formName: [form.data, form.data...]}
    let formName = ''
    const payload = activeForms.reduce((acc: any, form: TWorkflowForm) => {
      formName = form.name
      if (acc[form.name]) {
        acc[form.name].push(form.data)
      } else {
        acc[form.name] = [form.data]
      }
      return acc
    }, {})

    // check if any of the formshave isDraft
    const hasDraft = activeForms.some((f) => f.isDraft)

    return saveModuleData({
      workflowId: workflow.workflowId,
      moduleName: formName,
      data: payload[formName],
      draft: hasDraft,
    }).then(async (res) => {
      if (res) {
        trackModuleDataSaved(workflow.workflowObject, formName, payload)
        await workflow.markSavedDraft()
        // mark all the active forms as synced
        activeForms.forEach((f) => {
          f.markAsSynced()
        })
      }
    })
  }

  const saveDraftWorkflow = async (
    workflow: TWorkflowModel,
    activeForms: TWorkflowForm[]
  ) => {
    if (workflow.isSynced) {
      return handleSaveDraftWorkflow(workflow, activeForms)
    }
    return syncWorkflow(workflow).then(async () => {
      trackWorkflowCreated(workflow.workflowObject)
      await handleSaveDraftWorkflow(workflow, activeForms)
    })
  }

  useEffect(() => {
    // hydrate the workflows from the API on first load
    if (v2Member && user) {
      setLoading(true)
      hydrateWorkflows().finally(() => {
        setLoading(false)
      })
      //
      // deleteAllForms(v2Member.antaraId)
      // deleteAllWorkflows(v2Member.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, v2Member])

  const loaderDisplayed =
    loading ||
    creatingCase ||
    savingWorkflow ||
    submittingForm ||
    creatingInteraction ||
    creatingFeedback ||
    savingModuleData ||
    removingModule ||
    removingWorkflow ||
    addingWorkflowModule

  return {
    loading, // pulling workflows from the DB
    deleteAllWorkflows, // delete all workflows from the DB
    submitForm,
    loaderDisplayed,
    completeWorkflow, // complete a workflow
    syncWorkflow, // sync a workflow with the API
    hydrateWorkflows, // pulling workflows from the API
    gettingWorkflows, // pulling workflows from the API
    deleteAllForms, // delete all forms from the DB
    deleteModuleFromAPI, // delete a module from the API
    deleteWorkflowFromAPI,
    findWorkflow,
    saveDraftWorkflow,
    shouldRefetch,
    incompleteWorkflows,
    completedWorkflows,
    getFormsByName,
    addNewWorkflowModule,
  }
}

export default useWorkflowData
