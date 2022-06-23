import React, { createContext, useContext, useState } from 'react'
import airtableFetch from '../resources/airtable-fetch'
import FormPortal from '../components/bene-dashboard/actions/forms/forms-portal.component'
import logError from '../components/utils/Bugsnag/Bugsnag'

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

type FormContextType = {
  shouldRefetch: boolean
  airtableMeta: any
  openedForms: Form[]
  onRefetch: (refetch: boolean) => void
  addOpenForm: (openForm: Form[], healthNavigator: HN) => void
}

const FormContext = createContext<FormContextType>({
  shouldRefetch: false,
  openedForms: [],
  airtableMeta: null,
  addOpenForm: () => null,
  onRefetch: () => null,
})

const FormProvider = ({ children }: any) => {
  const [airtableMeta, setAirtableMeta] = useState<any>(null)
  const [shouldRefetch, setshouldRefetch] = useState(false)
  const [openedForms, setOpenedForms] = useState<Form[]>([])
  const [hNavigator, setHNavigator] = useState<HN | null>(null)
  const onRefetch = (refetch: boolean) => {
    setshouldRefetch(refetch)
  }
  const addOpenForm = (openForm: Form[], healthNavigator: HN) => {
    setOpenedForms(openForm)
    setHNavigator(healthNavigator)
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

  React.useEffect(() => {
    if (airtableMeta === null) {
      airtableFetch('tables')
        .then((res) => {
          let tableMap: any = {}
          res.tables.forEach((tb) => {
            let fields: any = {}
            tb.fields.forEach((fl) => {
              fields = {
                ...fields,
                primaryFieldName: tb.fields[0].name,
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
          setAirtableMeta(tableMap)
        })
        .catch((e) => logError(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormContext.Provider
      value={{
        airtableMeta,
        openedForms,
        shouldRefetch,
        onRefetch,
        addOpenForm,
      }}
    >
      {openedForms.map((fm: Form, idx: number) => (
        <React.Fragment key={idx}>
          <FormPortal
            form={fm}
            formNum={idx}
            hn={hNavigator}
            airtableMeta={airtableMeta}
            openedForms={openedForms}
            closeForm={addOpenForm}
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
