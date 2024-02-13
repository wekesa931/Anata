import { FormHelperText, OutlinedInput } from '@mui/material'
import React from 'react'
import { FieldProps } from 'formik'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type TextFieldProps = {
  textarea?: boolean
  rows?: number
  bottomPadding?: boolean
} & OutlinedFieldProps

function TextField({ bottomPadding = true, ...props }: TextFieldProps) {
  const handleValueBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.handleBlur(fieldProps.field.name)(e)
    if (props.handleBlur) {
      props.handleBlur(e)
    }
  }

  const handleValueChange = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.handleChange(fieldProps.field.name)(e)
    if (props.handleChange) {
      props.handleChange(e)
    }

    if (props.saveInput) {
      props.saveInput(fieldProps.field.name, e.target.value)
    }
  }
  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => (
        <>
          <OutlinedInput
            {...fieldProps.field}
            placeholder={props.placeholder}
            className="placeholder:text-grey-main placeholder:font-rubik placeholder:text-base placeholder:font-normal"
            size="small"
            error={!!fieldProps.meta.error && !!fieldProps.meta.touched}
            type={props.type || 'text'}
            multiline={props.textarea}
            rows={props.textarea ? props.rows || 4 : undefined}
            onBlur={(e: any) => {
              handleValueBlur(e, fieldProps)
            }}
            onChange={(e: any) => {
              handleValueChange(e, fieldProps)
            }}
            disabled={props.disabled}
          />
          {bottomPadding && (
            <FormHelperText error={!!fieldProps.meta.error}>
              {fieldProps?.meta?.error}
            </FormHelperText>
          )}
        </>
      )}
    </OutlinedField>
  )
}

export default TextField
