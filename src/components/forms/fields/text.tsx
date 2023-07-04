import { FormHelperText, OutlinedInput } from '@mui/material'
import React from 'react'
import { FieldProps } from 'formik'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type TextFieldProps = {
  textarea?: boolean
} & OutlinedFieldProps

function TextField(props: TextFieldProps) {
  const handleValueBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldTouched(fieldProps.field.name, e.target.value)
    if (props.handleBlur) {
      props.handleBlur(e)
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
            rows={props.textarea ? 4 : undefined}
            onBlur={(e: any) => {
              handleValueBlur(e, fieldProps)
            }}
          />
          <FormHelperText error={!!fieldProps.meta.error}>
            {!!fieldProps.meta.error && !!fieldProps.meta.error
              ? fieldProps.meta.error
              : ' '}
          </FormHelperText>
        </>
      )}
    </OutlinedField>
  )
}

export default TextField
