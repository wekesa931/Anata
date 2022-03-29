import React, { useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import AirtableField from '../../../types/airtable-field'
import RemoteSelect from '../remote-select/remote-select.component'
import MultiSelect from '../multiselect/multiselect.component'

type CustomFieldProps = AirtableField & {
  disabled: boolean
}

const FormField = (customField: CustomFieldProps) => {
  const {
    name,
    type,
    value,
    disabled,
    options = [],
    lookupUrl,
    lookupFieldNames,
  } = customField

  const { setFieldValue, errors, touched } = useFormikContext<any>()
  const [textAreaValue, setTextAreaValue] = useState(value)
  useEffect(() => {
    // if field is unmounted, delete its value (comes in handy in dynamic forms)
    return () => {
      setFieldValue(name, undefined, false)
    }
  }, [name, setFieldValue])

  const fieldClassName = `form-control ${
    touched[name] && errors[name] && 'error'
  }`

  switch (type) {
    case 'single-select':
      return (
        <Field
          as="select"
          name={name}
          id={name}
          className={fieldClassName}
          disabled={disabled}
        >
          <option value="">Select</option>
          {options &&
            options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
        </Field>
      )
    case 'multi-select':
      return (
        <Field name={name} className={fieldClassName} disabled={disabled}>
          {({ field, form }: any) => (
            <MultiSelect options={options} field={field} form={form} />
          )}
        </Field>
      )
    case 'number':
      return (
        <Field
          name={name}
          id={name}
          type="number"
          className={fieldClassName}
          disabled={disabled}
        />
      )
    case 'text':
      return (
        <Field
          name={name}
          id={name}
          type="text"
          className={fieldClassName}
          disabled={disabled}
        />
      )
    case 'date':
      return (
        <Field
          name={name}
          id={name}
          type="date"
          className={fieldClassName}
          disabled={disabled}
        />
      )
    case 'datetime':
      return (
        <Field
          name={name}
          id={name}
          type="datetime-local"
          className={fieldClassName}
          disabled={disabled}
        />
      )
    case 'long-text':
      return (
        <TextareaAutosize
          name={name}
          id={name}
          className={fieldClassName}
          disabled={disabled}
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value)
            setFieldValue(name, e.target.value, false)
          }}
        />
      )
    case 'lookup':
      return (
        <Field name={name} className={fieldClassName} disabled={disabled}>
          {({ field, form }) => (
            <RemoteSelect
              lookupUrl={lookupUrl || ''}
              lookupFieldNames={lookupFieldNames || []}
              field={field}
              form={form}
              prefetch
              disabled={disabled}
            />
          )}
        </Field>
      )
    default:
      return null
  }
}

export default FormField
