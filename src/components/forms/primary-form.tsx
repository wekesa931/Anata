import { Formik, FormikProps } from 'formik'
import React from 'react'

type PrimaryFormProps = {
  handleSubmit: (values: any, formikBag: any) => void
  initialValues: any
  validationSchema?: any
  children: (formikProps: FormikProps<any>) => React.ReactNode
  expanded?: boolean
}

function PrimaryForm(props: PrimaryFormProps) {
  const expanded = props.expanded || true
  return (
    <div className={expanded ? 'mt-6' : 'mt-1'}>
      <Formik
        onSubmit={props.handleSubmit}
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        enableReinitialize
      >
        {(formikProps: FormikProps<any>) => <>{props.children(formikProps)}</>}
      </Formik>
    </div>
  )
}

export default PrimaryForm
