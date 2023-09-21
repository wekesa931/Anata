import React from 'react'
import { FormControlLabel, RadioGroup, Radio } from '@mui/material'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type RadioFieldProps = {
  options: { label: string; value: string }[]
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end'
} & OutlinedFieldProps

function RadioField(props: RadioFieldProps) {
  return (
    <OutlinedField {...props}>
      {(fieldProps) => (
        <RadioGroup
          row
          name={fieldProps.field.name}
          value={fieldProps.field.value}
        >
          {props.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              disabled={props.disabled}
              control={
                <Radio
                  name={fieldProps.field.name}
                  onChange={() => {
                    fieldProps.form.setFieldValue(
                      fieldProps.field.name,
                      option.value
                    )
                    if (props.saveInput) {
                      props.saveInput(fieldProps.field.name, option.value)
                    }
                  }}
                />
              }
              labelPlacement={props.labelPlacement || 'end'}
              label={
                <span className="text-grey-main uppercase text-base">
                  {option.label}
                </span>
              }
            />
          ))}
        </RadioGroup>
      )}
    </OutlinedField>
  )
}

export default RadioField
