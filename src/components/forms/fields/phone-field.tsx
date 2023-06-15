import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number'
import { FieldProps } from 'formik'
import { validatePhone } from 'src/utils/form-validation-methods'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

function PhoneField({
  helperText = ' ',
  label,
  required = true,
  placeholder,
  name,
  handleChange,
  handleBlur,
}: OutlinedFieldProps) {
  const handleValueBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldTouched(fieldProps.field.name, true)
    handleBlur && handleBlur(e)
  }

  const handleValueChange = (value: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(fieldProps.field.name, value)
    if (handleChange) {
      handleChange(value)
    }
  }

  return (
    <OutlinedField
      label={label}
      required={required}
      name={name}
      validate={validatePhone}
    >
      {({ field, meta, form }: FieldProps) => (
        <MuiPhoneNumber
          {...field}
          defaultCountry="ke"
          error={!!meta.error}
          helperText={meta.error ? meta.error : helperText}
          variant="outlined"
          fullWidth
          regions="africa"
          placeholder={placeholder}
          onChange={(value: any) => {
            handleValueChange(value, { field, meta, form })
          }}
          countryCodeEditable
          autoFormat
          onBlur={(e: any) => {
            handleValueBlur(e, { field, meta, form })
          }}
          size="small"
        />
      )}
    </OutlinedField>
  )
}

export default PhoneField
