import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { FieldProps } from 'formik'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type DateFieldProps = {
  minDate?: Date
  maxDate?: Date
  openToYear?: boolean
}

DateField.defaultProps = {
  openToYear: true,
}

function DateField(props: DateFieldProps & OutlinedFieldProps) {
  const handleValueChange = (d: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(
      fieldProps.field.name,
      dayjs(d).format('YYYY-MM-DD')
    )
    if (props.handleChange) {
      props.handleChange(d)
    }

    if (props.saveInput) {
      props.saveInput(props.name, d)
    }
  }

  const handleValueBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldTouched(fieldProps.field.name, e.target.value)
    if (props.handleBlur) {
      props.handleBlur(e)
    }
  }

  return (
    <>
      <OutlinedField {...props}>
        {(fieldProps: FieldProps) => (
          <DatePicker
            {...fieldProps.field}
            onChange={(d) => {
              handleValueChange(d, fieldProps)
            }}
            maxDate={props.maxDate || new Date()}
            minDate={props.minDate}
            openTo={props.openToYear ? 'year' : 'day'}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                name={props.name}
                error={!!fieldProps.meta.error}
                helperText={fieldProps.meta.error || ' '}
                onBlur={(e: any) => handleValueBlur(e, fieldProps)}
              />
            )}
          />
        )}
      </OutlinedField>
    </>
  )
}

export function DateTimeField(props: DateFieldProps & OutlinedFieldProps) {
  const handleValueChange = (d: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(fieldProps.field.name, d)
    if (props.handleChange) {
      props.handleChange(d)
    }

    if (props.saveInput) {
      props.saveInput(props.name, d)
    }
  }

  const handleValueBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldTouched(fieldProps.field.name, e.target.value)
    if (props.handleBlur) {
      props.handleBlur(e)
    }
  }

  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => (
        <DateTimePicker
          {...fieldProps.field}
          onChange={(d) => {
            handleValueChange(d, fieldProps)
          }}
          maxDateTime={props.maxDate || new Date()}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              name={props.name}
              error={!!fieldProps.meta.error}
              helperText={fieldProps.meta.error || ' '}
              onBlur={(e: any) => handleValueBlur(e, fieldProps)}
            />
          )}
        />
      )}
    </OutlinedField>
  )
}

export default DateField
