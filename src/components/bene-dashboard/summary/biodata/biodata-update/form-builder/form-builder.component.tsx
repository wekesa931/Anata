import React, { useState } from 'react'
import { Paper, Button } from '@mui/material'
import {
  FormTextField,
  FormDatePicker,
  FormSelectField,
  FormSwitchField,
} from './form-elements.component'
import styles from './form-builder.component.css'

/** Form field configurations */
type FormField = {
  id: string
  label?: string
  className?: any
  type: string
  dataIndex: string
  subfields?: Array<FormField>
  readOnly?: boolean
  options?: Array<any>
  required?: boolean
  validator?: (dataIndex: string, value: string, required: boolean) => any
}

type FormBuilderProps = {
  formFields: Array<FormField>
  initialValues: Record<string, unknown> | null
  onSubmit: (values: Record<string, unknown>) => void
  isLoading: boolean
  formErrors?: Array<string>
  setIsFormEdited: (edited: boolean) => void
  isEdited: boolean
}

type TextFieldType = 'text' | 'textarea' | 'number'

// safely extract dict values
const safeGet = (obj: any, key: string) => (key in obj ? obj[key] : '')

type ValidatorType = (
  dataIndex: string,
  value: string,
  required: boolean
) => any

/**
 * For a given form elements configuration and a reference initial values object containing values
 * compose and render a form.
 */
const FormBuilder = (props: FormBuilderProps) => {
  const {
    formFields,
    initialValues,
    onSubmit,
    isLoading,
    formErrors: formSubmissionErrors = [],
    setIsFormEdited,
    isEdited,
  } = props
  // initial form values
  const [formValues, setFormValues] = useState<any>(initialValues)

  // field errors
  const [errors, setErrors] = useState<any>({})
  // submission errors
  const [formErrors, setFormError] = useState<Array<string>>([])

  /** Catch errors when input field loses focus */
  const handleValueBlur =
    (validator: ValidatorType | undefined) =>
    (dataIndex: string, value: string, required = false) =>
      validator &&
      setErrors({ ...errors, ...validator(dataIndex, value, required) })

  /** Generic state update function builder for any data index key */
  const updateValue = (dataIndex: string) => (value: any) => {
    setFormValues({ ...formValues, [dataIndex]: value })
    setIsFormEdited(true)
  }

  // create a text field
  const createTextField = (
    {
      label,
      id,
      dataIndex,
      className,
      subfields,
      readOnly = false,
      required = false,
      validator,
    }: FormField,
    type: TextFieldType = 'text'
  ) => {
    if (subfields) {
      // render each in a row
      return (
        <div className={styles.formInputsRow}>
          {subfields.map((field, i) => (
            <div className={className} key={`${id}-${i}`}>
              {' '}
              {createTextField(field, type)}{' '}
            </div>
          ))}
        </div>
      )
    }

    return (
      <FormTextField
        label={label || dataIndex}
        id={id}
        value={safeGet(formValues, dataIndex)}
        handleChange={updateValue(dataIndex)}
        readOnly={readOnly}
        required={required}
        errors={errors[dataIndex]}
        dataIndex={dataIndex}
        handleBlur={handleValueBlur(validator)}
        textarea={type === 'textarea'}
        number={type === 'number'}
      />
    )
  }

  // create a date field
  const createDateField = ({
    label,
    dataIndex,
    readOnly = false,
  }: FormField) => {
    const initialValue = safeGet(formValues, dataIndex)

    return (
      <FormDatePicker
        date={initialValue}
        label={label || dataIndex}
        onChange={updateValue(dataIndex)}
        readOnly={readOnly}
      />
    )
  }

  // a select field
  const createSelectField = ({ label, dataIndex, options, id }: FormField) => {
    const initialValue = safeGet(formValues, dataIndex)

    return (
      <FormSelectField
        value={initialValue}
        label={label || dataIndex}
        options={options}
        handleChange={updateValue(dataIndex)}
        id={id}
      />
    )
  }

  // switch field
  const createSwitchField = ({ label, dataIndex, id }: FormField) => {
    const initialValue = !!safeGet(formValues, dataIndex)

    return (
      <FormSwitchField
        label={label || dataIndex}
        id={id}
        value={initialValue}
        handleClick={updateValue(dataIndex)}
      />
    )
  }

  /** Create any field */
  const createFormField = (field: FormField) => {
    const { type } = field

    // parse the type and render the build the appropriate form type and the state update callback
    switch (type) {
      case 'date':
        return createDateField(field)
      case 'select':
        return createSelectField(field)
      case 'switch':
        return createSwitchField(field)
      default:
        // assume a text field
        return createTextField(field, type as TextFieldType)
    }
  }

  /**
   * Read through the form field, for each config entry, render the type of form field items with it's initial
   * value from initial values
   */
  const collectFormFields = () => {
    const collectedFields: Array<any> = []

    for (const field of formFields) {
      collectedFields.push(createFormField(field))
    }

    return collectedFields
  }

  /** Handle submit, verification et al */
  const handleFormSubmit = () => {
    // ensure no errors available
    const hasErrors = Object.values(errors).filter((e) => !!e).length > 0

    if (hasErrors) {
      return setFormError([
        ...formErrors,
        'Your form has errors, please fix them',
      ])
    }
    // ensure all fields are filled ignoring the antaraId
    const formHasValues =
      Object.values(formValues).filter((v) => !!v).length > 1
    if (formHasValues) {
      return onSubmit(formValues)
    }

    return setFormError([
      ...formErrors,
      'You must fill some properties to submit',
    ])
  }

  const submissionErrors = [...formErrors, ...formSubmissionErrors]

  return (
    <Paper
      component="form"
      noValidate
      autoComplete="false"
      elevation={2}
      sx={{ boxShadow: 'none', p: 4, pt: 2 }}
    >
      <div className={styles.form}>
        {collectFormFields().map((field, id) => (
          <div key={id} className={styles.formInputSpaced}>
            {field}
          </div>
        ))}
      </div>
      <div className={styles.actionBtnSection}>
        {submissionErrors && (
          <ul className={styles.formErrors}>
            {submissionErrors.map((e, i) => (
              <li key={i}>
                <small>{e}</small>
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="outlined"
          className={`${styles.actionBtn} btn btn-primary`}
          onClick={handleFormSubmit}
          disabled={!isEdited}
        >
          {isLoading ? 'Submitting' : 'Submit'}
        </Button>
      </div>
    </Paper>
  )
}

export default FormBuilder
