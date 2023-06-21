import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FieldProps } from 'formik'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

function DateField(props: OutlinedFieldProps) {
  const handlValueChange = (d: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(
      fieldProps.field.name,
      dayjs(d).format('YYYY-MM-DD')
    )
    if (props.handleChange) {
      props.handleChange(d)
    }
  }

  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => (
        <DatePicker
          {...fieldProps.field}
          onChange={(d) => {
            handlValueChange(d, fieldProps)
          }}
          maxDate={new Date()}
          openTo="year"
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              name={props.name}
              error={!!fieldProps.meta.error}
              helperText={fieldProps.meta.error || ' '}
            />
          )}
        />
      )}
    </OutlinedField>
  )
}

export default DateField
