import React, { createContext, useContext, useState } from 'react'
import FormPortal from '../components/bene-dashboard/actions/forms/forms-portal.component'

type HN = {
  'Record ID': string
}
type Form = {
  name: string
  url?: string
  url_sandbox?: string
  airtableUrl?: boolean
  hnField?: string
}

type FormContextType = {
  openedForms: Form[]
  addOpenForm: (openForm: Form, healthNavigator: HN) => void
}

const FormContext = createContext<FormContextType>({
  openedForms: [],
  addOpenForm: () => null,
})

const FormProvider = ({ children }: any) => {
  const [openedForms, setOpenedForms] = useState<Form[]>([])
  const [hNavigator, setHNavigator] = useState<HN | null>(null)

  const addOpenForm = (openForm: Form, healthNavigator: HN) => {
    setOpenedForms([...openedForms, openForm])
    setHNavigator(healthNavigator)
  }
  const onFormClose = (name: string) => {
    const validForms = openedForms.filter((fm: Form) => fm.name !== name)
    setOpenedForms(validForms)
  }

  return (
    <FormContext.Provider
      value={{
        openedForms,
        addOpenForm,
      }}
    >
      {openedForms.map((fm: Form, idx: number) => (
        <React.Fragment key={idx}>
          <FormPortal form={fm} hn={hNavigator} onFormClose={onFormClose} />
        </React.Fragment>
      ))}
      {children}
    </FormContext.Provider>
  )
}

const useForm = () => useContext(FormContext)

export { FormProvider, useForm }
