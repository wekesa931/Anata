import React from 'react'
import { FormControl, FormLabel } from '@mui/material'
import { Field, FieldProps } from 'formik'

export type OutlinedFieldProps = {
  helperText?: string
  label?: string
  required?: boolean
  name: string
  placeholder?: string
  handleBlur?: (e: any) => void
  handleChange?: (e: any) => void
  fullWidth?: boolean
  validate?: (value: any) => string | undefined
  options?: { label: string; value: string }[] | string[]
  multiple?: boolean
  type?: string
  disabled?: boolean
  autoFocus?: boolean
}

type OutlinedFieldPropType = {
  children: (fieldProps: FieldProps) => React.ReactNode
}

function OutlinedField({
  label,
  required = true,
  fullWidth = true,
  children,
  name,
  validate,
  disabled = false,
}: OutlinedFieldProps & OutlinedFieldPropType) {
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <FormLabel
        disabled={disabled}
        className="font-rubik font-medium text-grey-main text-base text-left mb-2"
      >
        {label}
      </FormLabel>

      <Field name={name} validate={validate}>
        {(fieldProps: FieldProps) => <>{children(fieldProps)}</>}
      </Field>
    </FormControl>
  )
}

export default OutlinedField
