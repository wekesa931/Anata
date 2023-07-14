import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FieldProps } from 'formik'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type DateFieldProps = {
  minDate?: Date
  maxDate?: Date
}

function DateField(props: DateFieldProps & OutlinedFieldProps) {
  const handlValueChange = (d: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(
      fieldProps.field.name,
      dayjs(d).format('YYYY-MM-DD')
    )
    if (props.handleChange) {
      props.handleChange(d)
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
        <DatePicker
          {...fieldProps.field}
          onChange={(d) => {
            handlValueChange(d, fieldProps)
          }}
          maxDate={props.maxDate || new Date()}
          minDate={props.minDate}
          openTo="year"
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
