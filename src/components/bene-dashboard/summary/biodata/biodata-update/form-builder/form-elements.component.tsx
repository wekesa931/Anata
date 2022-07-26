import React from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

/**
 * Date Picker element
 */

type DatePickerProps = {
  date: Date | null
  label: string
  onChange: (date: any) => void
  readOnly: boolean
}

export const FormDatePicker = (props: DatePickerProps) => {
  const { date, label, onChange, readOnly } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} css={{ marginTop: 5 }}>
      <DatePicker
        label={label}
        value={date}
        onChange={(d) => onChange(dayjs(d).format('YYYY-MM-DD'))}
        renderInput={(params) => <TextField {...params} fullWidth />}
        disabled={readOnly}
      />
    </LocalizationProvider>
  )
}

/** Text input field */
type TextFieldProps = {
  value: string
  label: string
  id: string
  handleChange: (value: string) => void
  readOnly?: boolean
  required?: boolean
  errors?: string
  handleBlur: (dataIndex: string, value: string, required: boolean) => void
  dataIndex: string
  textarea?: boolean
  number?: boolean
}

/** Text input */
export const FormTextField = (props: TextFieldProps) => {
  const {
    value,
    label,
    handleChange,
    readOnly,
    required,
    errors,
    handleBlur,
    dataIndex,
    textarea,
    number,
  } = props

  const texareaProps = textarea
    ? {
        multiline: true,
        rows: 4,
      }
    : {}

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      disabled={readOnly}
      required={required}
      error={!!errors}
      helperText={errors}
      onBlur={() => handleBlur(dataIndex, value, required || false)}
      {...texareaProps}
      inputProps={{
        inputMode: number ? 'numeric' : 'text',
        pattern: number ? '[0-9]*' : '',
      }}
      fullWidth
    />
  )
}

type Option = {
  label: string
  value: string
}
/** Select input field */
type SelectInputProps = {
  id: string
  label: string
  value: string | number
  handleChange: (value: string) => void
  options?: Array<Option>
}

export const FormSelectField = ({
  id,
  label,
  value,
  handleChange,
  options,
}: SelectInputProps) => {
  return (
    <FormControl fullWidth sx={{ minWidth: 200 }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        label={label}
        value={value || ''}
        defaultValue=""
        onChange={(e) => handleChange(e.target.value as string)}
      >
        {options &&
          options.map((option, i) => (
            <MenuItem value={option.value} key={`option-${i}`}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

type FormSwitchProps = {
  id: string
  label: string
  value: boolean
  handleClick: (value: boolean) => void
}

export const FormSwitchField = ({
  id,
  label,
  value,
  handleClick,
}: FormSwitchProps) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <FormControlLabel
        labelPlacement="start"
        label={label}
        control={
          <Switch
            color="primary"
            value={value}
            onClick={() => handleClick(!value)}
            id={id}
          />
        }
      />
    </FormControl>
  )
}
