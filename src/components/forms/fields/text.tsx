import { FormHelperText, OutlinedInput } from '@mui/material'
import React from 'react'
import { FieldProps } from 'formik'
import EditIcon from '@mui/icons-material/Edit'
import InputAdornment from '@mui/material/InputAdornment'

import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type TextFieldProps = {
  textarea?: boolean
  rows?: number
  bottomPadding?: boolean
  editMode?: boolean
  onEditClick?: () => void
  editable?: boolean
  maxLength?: number
} & OutlinedFieldProps

function TextField({
  bottomPadding = true,
  editMode = false,
  onEditClick,
  editable,
  maxLength = 0,
  ...props
}: TextFieldProps) {
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
  const calculateCharacterCount = (value: string) => {
    return value ? value.length : 0
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
            disabled={props.disabled || editMode}
            endAdornment={
              editable && (
                <InputAdornment position="start" onClick={onEditClick}>
                  <div className="flex items-center cursor-pointer absolute top-8 right-2 text-blue-500">
                    <EditIcon sx={{}} />
                    <span className="text-sm">Edit</span>
                  </div>
                </InputAdornment>
              )
            }
          />
          {bottomPadding && (
            <div className="flex justify-between">
              <FormHelperText
                error={!!fieldProps.meta.error && !!fieldProps.meta.touched}
                id="standard-error-text"
                className="text-red-500"
              >
                {fieldProps.meta.error}
              </FormHelperText>
              {maxLength > 0 && (
                <span
                  className={
                    fieldProps.field.value?.length <= maxLength
                      ? ''
                      : 'text-red-500'
                  }
                >
                  {`${calculateCharacterCount(
                    fieldProps.field.value || ''
                  )}/${maxLength}`}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </OutlinedField>
  )
}

export default TextField
