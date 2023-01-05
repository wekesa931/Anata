import React, { createContext, useContext, useState } from 'react'
import dayjs from 'dayjs'
import { WorkflowMeta } from '../components/bene-dashboard/actions/workflows/workflow-types'
import FormPortal from '../components/bene-dashboard/actions/forms/forms-portal.component'
import { useAirtableMeta } from './airtable-context'

type Form = {
  name: string
  url?: string
  url_sandbox?: string
  airtableUrl?: boolean
  hnField?: string
}

export type HN = {
  'Record ID': string
}

export type MemberDetails = {
  v2Member: any
  isDataLoading: boolean
  companies: Array<any>
  submitting: boolean
  formErrors: any
  handleSubmit: (values: any) => void
}

type FormContextType = {
  shouldRefetch: boolean
  airtableMeta: any
  openedForms: Form[]
  onRefetch: (refetch: boolean) => void
  addOpenForm: (openForm: WorkflowMeta) => void
  onFormClose: (pointer: any, isWorkflow: boolean) => void
}

const FormContext = createContext<FormContextType>({
  shouldRefetch: false,
  openedForms: [],
  airtableMeta: null,
  addOpenForm: () => null,
  onRefetch: () => null,
  onFormClose: () => null,
})

function FormProvider({ children }: any) {
  const [shouldRefetch, setshouldRefetch] = useState(false)
  const [openedForms, setOpenedForms] = useState<Form[]>([])
  const { airtableMeta } = useAirtableMeta()

  const onRefetch = (refetch: boolean) => {
    setshouldRefetch(refetch)
  }

  const addOpenForm = (openForm: WorkflowMeta) => {
    if (openForm.workflowId) {
      setOpenedForms([...openedForms, openForm])
    } else {
      const isFormOpen = openedForms.find(
        (fm: any) => fm.name === openForm.name
      )
      if (isFormOpen) return
      const form = {
        name: openForm?.name,
        airtableId: null,
        completed: false,
        createdAt: dayjs().format(),
        currentModules: [openForm?.name],
        id: dayjs().toISOString(),
        member: openForm.member,
        moduleData: {},
        modules: [{ id: '1', name: openForm?.name }],
        template: { id: '2', name: openForm?.name },
        updatedAt: dayjs().format(),
        workflowId: null,
        prefills: openForm?.prefills,
      }
      setOpenedForms([...openedForms, form])
    }
  }
  const onFormClose = (pointer: any, isWorkflow: boolean) => {
    let validForms: any[] = []
    if (isWorkflow) {
      validForms = openedForms.filter((fm: any) => fm.workflowId !== pointer)
    } else {
      validForms = openedForms.filter((fm: Form) => fm.name !== pointer)
    }
    setOpenedForms(validForms)
  }

  const providerValue = React.useMemo(
    () => ({
      airtableMeta,
      openedForms,
      shouldRefetch,
      onRefetch,
      addOpenForm,
      onFormClose,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [airtableMeta, openedForms, shouldRefetch]
  )
  return (
    <FormContext.Provider value={providerValue}>
      {openedForms.map((fm: Form, idx: number) => (
        <React.Fragment key={idx}>
          <FormPortal
            form={fm}
            formNum={idx}
            airtableMeta={airtableMeta}
            openedForms={openedForms}
            addOpenForm={addOpenForm}
            onFormClose={onFormClose}
            onRefetch={onRefetch}
          />
        </React.Fragment>
      ))}
      {children}
    </FormContext.Provider>
  )
}

const useFormPortal = () => useContext(FormContext)

export { FormProvider, useFormPortal }
