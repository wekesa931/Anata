import React from 'react'
import { FormControl, FormLabel } from '@mui/material'
import { Field, FieldProps } from 'formik'

export type OutlinedFieldProps = {
  helperText?: React.ReactNode
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
  id?: string
  displayMode?: boolean
  labelPlacement?: 'top' | 'left'
  xs?: boolean
  darkLabel?: boolean
  autoWidth?: boolean
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
  id,
  labelPlacement = 'top',
  darkLabel,
  autoWidth = false,
}: OutlinedFieldProps & OutlinedFieldPropType) {
  const isLeftLabel = labelPlacement === 'left'
  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      id={id}
      className={`flex ${
        isLeftLabel
          ? 'flex-row items-center min-w-fit'
          : 'flex-col justify-center'
      } ${autoWidth ? 'w-auto' : ''}`}
    >
      <FormLabel
        disabled={disabled}
        className={`font-rubik font-medium whitespace-nowrap ${
          isLeftLabel ? 'text-xs mr-3' : 'text-base mb-2'
        } text-left ${darkLabel ? 'text-black' : 'text-grey-main'} `}
      >
        {isLeftLabel ? `${label}:` : label}
      </FormLabel>
      {helperText && !isLeftLabel && (
        <p className="mb-2.5 whitespace-pre-line font-rubik text-xs text-dark-blue-100">
          {helperText}
        </p>
      )}

      <Field name={name} validate={validate}>
        {(fieldProps: FieldProps) => <>{children(fieldProps)}</>}
      </Field>
    </FormControl>
  )
}

export default OutlinedField
