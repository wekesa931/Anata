import React from 'react'
import { FieldProps } from 'formik'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Checkbox, Chip, FormHelperText, OutlinedInput } from '@mui/material'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type SelectFieldProps = {
  options: { label: string; value: string }[]
  multiple?: boolean
}

function ValueRenderer({ selected, props }: any) {
  if (!selected || selected?.length === 0) {
    return <span className="text-grey-main">{props.placeholder} </span>
  }

  if (props.multiple) {
    return (
      <div className="flex flex-wrap gap-2">
        {selected.map((s: any) => {
          const opt = props.options.find((o: any) => o.value === s)
          return <Chip key={s} label={opt?.label || s} />
        })}
      </div>
    )
  }

  const selectedOption = props.options.find((o: any) => o.value === selected)
  return selectedOption?.label || selected
}

function SelectField(props: OutlinedFieldProps & SelectFieldProps) {
  const handleValueChange = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(fieldProps.field.name, e.target.value)
    if (props.handleChange) {
      props.handleChange(e.target.value)
    }
  }

  const handleBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldTouched(fieldProps.field.name, true)
    if (props.handleBlur) {
      props.handleBlur(e)
    }
  }
  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => (
        <>
          <Select
            {...fieldProps.field}
            size="small"
            multiple={props.multiple}
            onChange={(e) => {
              handleValueChange(e, fieldProps)
            }}
            error={!!fieldProps.meta.error}
            input={
              <OutlinedInput
                placeholder={props.placeholder}
                error={!!fieldProps.meta.error}
                size="small"
              />
            }
            onBlur={(e: any) => {
              handleBlur(e, fieldProps)
            }}
            displayEmpty
            renderValue={(selected: any) => (
              <ValueRenderer selected={selected} props={props} />
            )}
          >
            {props.options.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {props?.multiple && (
                  <Checkbox
                    checked={
                      fieldProps.field?.value?.indexOf(option.value) > -1
                    }
                  />
                )}
                {option.label}
              </MenuItem>
            ))}
          </Select>
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

export default SelectField
