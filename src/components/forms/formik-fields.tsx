import React, { useState } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import AirtableField from 'src/types/airtable-field'
import RemoteSelect from 'src/components/forms/remote-select.field'
import MultiSelect from 'src/components/forms/multiselect.field'
import { OPTIMIZED_SEARCH } from 'src/gql/search'
import { useLazyQuery } from '@apollo/client'
import SearchField from 'src/components/forms/fields/search'

type CustomFieldProps = AirtableField & {
  disabled: boolean
  required?: boolean
}

function FormField(customField: CustomFieldProps) {
  const {
    name,
    type,
    value,
    disabled,
    options = [],
    lookupUrl,
    lookupFieldNames,
    tableId,
    required = false,
  } = customField

  const { setFieldValue, errors, touched } = useFormikContext<any>()
  const [textAreaValue, setTextAreaValue] = useState(value)
  const [search] = useLazyQuery(OPTIMIZED_SEARCH, {
    context: {
      clientName: 'search',
    },
  })

  const getUniqueRecords = (records: any[]) => {
    return records.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  }

  const searchQuery = (id: string) => async (keyword: string) => {
    const { data } = await search({ variables: { keyword, table: id } })
    const response = data.optimizedSearch.data || {}
    const displayKey = response?.displayName || 'name'
    const searchResults = response?.results || []
    return (
      getUniqueRecords([
        ...searchResults.map((rec: any) => ({
          id: rec.id,
          name: rec[displayKey],
          displayName: rec[displayKey],
        })),
      ]) || []
    )
  }

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
          required={required}
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
        <Field
          name={name}
          className={fieldClassName}
          disabled={disabled}
          required={required}
        >
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
          required={required}
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
          required={required}
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
          required={required}
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
          required={required}
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
          required={required}
        />
      )
    case 'lookup':
      return (
        <Field
          name={name}
          className={fieldClassName}
          disabled={disabled}
          required={required}
        >
          {({ field, form }: FieldProps) => (
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
    case 'search':
      return (
        <Field name={name} disabled={disabled} required={required}>
          {({ field, form }: FieldProps) => (
            <div className="relative">
              <SearchField
                search={searchQuery(tableId || '')}
                handleChange={(v: any) => {
                  form.setFieldValue(field.name, v, false)
                }}
                initialValue={value}
                label=""
                disabled={disabled}
              />
            </div>
          )}
        </Field>
      )
    default:
      return null
  }
}

export default FormField
