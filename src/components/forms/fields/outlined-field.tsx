import React from 'react'
import { FormControl, FormLabel } from '@mui/material'
import { Field, FieldProps } from 'formik'
import parse from 'html-react-parser'

export type OutlinedFieldProps = {
  helperText?: string
  label?: string
  required?: boolean
  name: string
  placeholder?: string
  handleBlur?: (e: any) => void
  handleChange?: (e: any) => void
  handleInputChange?: (e: any) => void
  fullWidth?: boolean
  validate?: (value: any) => string | undefined
  options?: { label: string; value: string }[] | string[]
  multiple?: boolean
  type?: string
  disabled?: boolean
  autoFocus?: boolean
  saveInput?: (name: string, value: any) => void // enable save input to a different source on change
  EmptyOptionBtn?: React.ReactNode
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
  helperText,
}: OutlinedFieldProps & OutlinedFieldPropType) {
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <FormLabel
        disabled={disabled}
        className="font-rubik font-medium text-grey-main text-base text-left mb-2"
      >
        {label}
      </FormLabel>
      {helperText && (
        <p className="mb-2.5 whitespace-pre-line font-rubik text-xs text-dark-blue-100">
          {parse(helperText)}
        </p>
      )}

      <Field name={name} validate={validate}>
        {(fieldProps: FieldProps) => <>{children(fieldProps)}</>}
      </Field>
    </FormControl>
  )
}

export default OutlinedField
