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
  maxTime?: Date
  displayMode?: boolean
  displayHelper?: boolean
}

DateField.defaultProps = {
  openToYear: true,
  displayHelper: true,
}

export function DateField(props: DateFieldProps & OutlinedFieldProps) {
  const handleValueChange = (d: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(
      fieldProps.field.name,
      d ? dayjs(d).format('YYYY-MM-DD') : null
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
          <>
            {props.displayMode ? (
              <span>
                {fieldProps.field.value
                  ? dayjs(
                      fieldProps.field.value.replace(/(\d+)(st|nd|rd|th)/, '$1')
                    ).format('Do MMMM  YYYY')
                  : 'Not available'}
              </span>
            ) : (
              <DatePicker
                {...fieldProps.field}
                onChange={(d) => {
                  handleValueChange(d, fieldProps)
                }}
                maxDate={props.maxDate}
                minDate={props.minDate}
                openTo={props.openToYear ? 'year' : 'day'}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    className={props.xs ? 'w-6' : ''}
                    name={props.name}
                    error={!!fieldProps.meta.error}
                    helperText={
                      props.displayHelper
                        ? fieldProps.meta.error || ' '
                        : undefined
                    }
                    onBlur={(e: any) => handleValueBlur(e, fieldProps)}
                  />
                )}
              />
            )}
          </>
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
          maxDateTime={
            props.maxDate
              ? dayjs(props.maxDate).format('YYYY-MM-DD HH:mm')
              : null
          }
          maxTime={props.maxDate ? dayjs(props.maxDate).format('HH:mm') : null}
          inputFormat="DD/MM/YYYY HH:mm"
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
