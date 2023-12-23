import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useState } from 'react'
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
  useSaveModuleData,
  useLoadWorkflows,
  normalizeWorkflowData,
  useRemoveModule,
  useRemoveWorkflow,
  useAddWorkflowModule,
} from 'src/modules/workflows/services/workflows.api'
import { useUser } from 'src/context/user'
import { TWorkflow, CreateCaseVariables } from 'src/modules/workflows/types'
import logError from 'src/utils/logging/logger'
import useObservable from 'src/hooks/observable'
import { useFormHandlers } from 'src/modules/workflows/hooks/form-handlers'
import type { Member } from 'src/modules/member/db/models'
import dayjs from 'dayjs'
import { useWorkflowAnalytics } from './analytics'
import { getUserModelDetails, initialFormValues } from '../utils'

export type WorkflowDataApi = ReturnType<typeof useWorkflowData>

export const useWorkflowData = () => {
  const database = useDatabase()
  const { member } = useMember()
  const user = useUser()
  const { createCase, updateCase, loading: creatingCase } = useCreateCase()
  const { saveWorkflow, loading: savingWorkflow } = useSaveWorkflow()
  const { getFormHandler, loading: savingData } = useFormHandlers()
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
  const [submittingForm, setSubmittingForm] = useState<boolean>(false)

  const formsCollection: Collection<TWorkflowForm> =
    database.collections.get('forms')
  const workflowsCollection: Collection<Workflows> =
    database.collections.get('workflows')

  const incompleteWorkflowsObservable = workflowsCollection
    .query(
      Q.where('member', member?.antaraId || ''),
      Q.where('is_completed', false),
      Q.sortBy('created_at', Q.desc)
    )
    .observe()
  const incompleteWorkflows = useObservable(
    incompleteWorkflowsObservable,
    [] as TWorkflowModel[],
    [workflowsCollection, member?.antaraId]
  )

  const completedWorkflowsObservable = workflowsCollection
    .query(
      Q.where('member', member?.antaraId || ''),
      Q.where('is_completed', true),
      Q.sortBy('created_at', Q.desc)
    )
    .observe()
  const completedWorkflows = useObservable(
    completedWorkflowsObservable,
    [] as TWorkflowModel[],
    [workflowsCollection, member?.antaraId]
  )

  const getFormsByName = async (workflow: TWorkflowModel, name: string) => {
    const forms = await workflow.forms.fetch()
    return forms.filter((form: TWorkflowForm) => form.name === name)
  }
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
      Members: [member?.airtableRecordId || ''],
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

  const syncWorkflow = async (workflow: TWorkflowModel) => {
    if (member && user) {
      const airtableCase = await createCase({
        ID: workflow?.workflowId,
        Status: 'Ongoing',
        Members: [member.airtableRecordId || ''],
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

  const handleFormSubmission = async (
    form: TWorkflowForm,
    formMeta: any,
    formData: any
  ) => {
    const formHandler = getFormHandler(form)
    return formHandler(form, formData, formMeta)
  }

  const handleWorkflowFormSubmission = async (
    form: TWorkflowForm,
    formMeta: any,
    formData: any,
    workflow: TWorkflowModel
  ) => {
    let caseId
    if (workflow) {
      caseId = workflow?.airtableId
        ? [workflow.airtableId]
        : await getNewCaseId(workflow)

      handleFormSubmission(form, formMeta, {
        ...formData,
        'Case ID': caseId,
        'Data Source': 'Guided Workflow',
        createdBy: getUserModelDetails(user),
        updatedBy: getUserModelDetails(user),
        Member: [member?.airtableRecordId],
      })
        .then(async () => {
          let isModulesDraft = false
          const forms = await workflow.forms.fetch()
          const formsWithSameName = forms.filter(
            (f: Forms) => f.name === form.name
          )
          // if there are forms with the same name, check if any of them isDraft
          if (formsWithSameName.length > 0) {
            isModulesDraft = formsWithSameName.some((f: Forms) => f.isDraft)
          }

          // grab all form data with same nae
          const allFormsData = formsWithSameName.map((f: Forms) => f.data)
          saveModuleData({
            workflowId: workflow?.workflowId,
            moduleName: form.name,
            data: allFormsData,
            draft: isModulesDraft,
          }).then(() => {
            trackAirtableSaveSucceeded(
              workflow?.workflowObject,
              form.name,
              formData
            )
          })
        })
        .catch((err: any) => {
          logError(err)
          if (workflow) {
            trackAirtableSaveFailed(
              workflow?.workflowObject,
              form.name,
              formData
            )
          }
          throw err
        })
    } else {
      throw new Error(`Workflow ${form.workflow?.id} not found in the cache`)
    }
  }

  const handleSubmitForm = async (
    form: TWorkflowForm,
    formMeta: any,
    formData: any,
    workflow?: TWorkflowModel
  ) => {
    if (member && user) {
      if (workflow) {
        return handleWorkflowFormSubmission(form, formMeta, formData, workflow)
      }
      return handleFormSubmission(form, formMeta, {
        ...formData,
        'Data Source': 'Scribe form',
        createdBy: getUserModelDetails(user),
        updatedBy: getUserModelDetails(user),
        Member: [member?.airtableRecordId],
      })
    }
    throw new Error('Member or User not found')
  }

  const submitForm = async (
    form: any,
    formMeta: any,
    formData: any,
    workflow?: TWorkflowModel
  ) => {
    setSubmittingForm(true)
    return handleSubmitForm(form, formMeta, formData, workflow).finally(() => {
      setSubmittingForm(false)
    })
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

  const hydrateWorkflowForms = async (
    workflowFromAPi: TWorkflow,
    workflowFromDb: TWorkflowModel,
    memberInstance: Member,
    userData: any
  ) => {
    const prefills = initialFormValues(
      memberInstance,
      userData,
      workflowFromAPi.template.name
    )
    const cachedForms = await workflowFromDb.forms.fetch()
    const currentWorkflowForms = workflowFromAPi.forms || []

    await Promise.all(
      currentWorkflowForms.map(async (nf: any) => {
        const setupFormData = {
          ...prefills[nf.name],
          Member: [member?.airtableRecordId],
          moduleId: nf.moduleId,
          isDraft: nf.isDraft,
        }

        const hasAnyFormData = Object.keys(nf.data).length !== 0
        const formData = hasAnyFormData ? nf.data : setupFormData

        const existingForm = cachedForms.find(
          (f: Forms) => f.data?.moduleId === formData?.moduleId
        )

        if (existingForm) {
          await database.write(async () => {
            await existingForm.update((f: Forms) => {
              f.data = formData
              f.isDraft = nf.isDraft
              f.isSynced = hasAnyFormData || true
              if (nf.createdAt) {
                f.createdAt = dayjs(nf.createdAt).valueOf()
              }
            })
          })
        } else {
          const shouldCreateForm = !cachedForms.find(
            (f: Forms) => f.name === nf.name
          )

          if (shouldCreateForm) {
            const formsCollection: Collection<Forms> =
              workflowFromDb.collections.get('forms')
            return database.write(async () => {
              await formsCollection.create((f) => {
                f.name = nf.name
                f.workflow.set(workflowFromDb)
                f.member = workflowFromDb.member
                f.data = formData
                f.isDraft = nf.isDraft
                f.isEdited = false
                f.isSynced = hasAnyFormData || true
                f.createdBy = workflowFromDb.createdBy
                f.updatedBy = workflowFromDb.updatedBy
                if (nf.createdAt) {
                  f.createdAt = dayjs(nf.createdAt).valueOf()
                }
                // eslint-disable-next-line no-underscore-dangle
                f._raw.id = nf.moduleId
              })
            })
          }
        }
      })
    )
  }

  const hydrateWorkflows = async () => {
    if (member) {
      const loadedWorkflows = await getData({
        variables: {
          workflowId: '',
          memberId: member.antaraId,
        },
        fetchPolicy: 'network-only',
      })
      const normalizedWorkflows = normalizeWorkflowData(loadedWorkflows?.data)

      const newWorkflowIds = normalizedWorkflows.map(
        (w: TWorkflow) => w.workflowId
      )
      const existingWorkflows = await workflowsCollection
        .query(Q.where('member', member.antaraId))
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
        workflowsToUpdate.map(async (w: TWorkflowModel) => {
          const updatedWorkflow = normalizedWorkflows.find(
            (nw: TWorkflow) => nw.workflowId === w.workflowId
          )
          if (updatedWorkflow) {
            const newUpdatedWorkflow = await w.createFromAPI(
              updatedWorkflow,
              member,
              user
            )
            return hydrateWorkflowForms(
              updatedWorkflow,
              newUpdatedWorkflow,
              member,
              user
            )
          }
          return Promise.resolve()
        })
      )

      // create a new workflow for each workflow in the db
      await Promise.all(
        workflowsToCreate.map(async (w: TWorkflow) => {
          try {
            const existingWorkflow = await workflowsCollection.find(
              w.workflowId
            )
            const newUpdatedWorkflow = await existingWorkflow.createFromAPI(
              w,
              member,
              user
            )
            await hydrateWorkflowForms(w, newUpdatedWorkflow, member, user)
          } catch (err: any) {
            const notFoundRegex = /Record ([^ ]+) not found/
            const notFoundError = err?.message.match(notFoundRegex)
            if (notFoundError) {
              try {
                const createdWorkflow = await database.write(async () => {
                  return workflowsCollection.create((n) => {
                    n.isCompleted = w.completed
                    n.workflowId = w.workflowId
                    n.member = member?.antaraId || ''
                    // eslint-disable-next-line no-underscore-dangle
                    n._raw.id = w.workflowId
                  })
                })
                const duplicateUpdated = await createdWorkflow.createFromAPI(
                  w,
                  member,
                  user
                )
                await hydrateWorkflowForms(w, duplicateUpdated, member, user)
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
  }

  const findWorkflow = async (workflowId: string) => {
    return database.read(async () => {
      return workflowsCollection.find(workflowId)
    })
  }

  const handleSaveDraftWorkflow = async (
    workflow: TWorkflowModel,
    activeForms: TWorkflowForm[],
    formsData: any
  ) => {
    const hasDraft = activeForms.some((f) => f.isDraft)
    // create a an array payload that looks like this
    // {formName: [form.data, form.data...]}
    const formName = activeForms?.[0]?.name || ''
    const payload = {
      [formName]: [...formsData],
    }

    return saveModuleData({
      workflowId: workflow.workflowId,
      moduleName: formName,
      data: payload[formName],
      draft: hasDraft,
    })
      .then(async (res) => {
        if (res) {
          trackModuleDataSaved(workflow.workflowObject, formName, payload)
          if (workflow) {
            await workflow.markSavedDraft()
          }
          // mark all the active forms as synced
          activeForms.forEach((f) => {
            f.markAsSynced()
          })
        }
      })
      .catch((errors) => {
        logError(errors)
        throw errors
      })
  }

  const saveDraftWorkflow = async (
    workflow: TWorkflowModel,
    activeForms: TWorkflowForm[],
    data: any
  ) => {
    if (workflow.isSynced) {
      return handleSaveDraftWorkflow(workflow, activeForms, data)
    }
    return syncWorkflow(workflow).then(async () => {
      trackWorkflowCreated(workflow.workflowObject)
      await handleSaveDraftWorkflow(workflow, activeForms, data)
    })
  }

  const loaderDisplayed =
    creatingCase ||
    savingWorkflow ||
    savingModuleData ||
    removingModule ||
    removingWorkflow ||
    addingWorkflowModule ||
    savingData

  return {
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
    submittingForm,
  }
}

export default useWorkflowData
