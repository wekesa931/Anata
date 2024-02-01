import React from 'react'
import { FieldProps } from 'formik'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormHelperText,
  IconButton,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

export type Options = {
  label: string
  value: string
  [key: string]: any
}

export type SelectFieldProps = {
  options: Options[]
  multiple?: boolean
  onClick?: (e: any) => void
  loading?: boolean
  bottomPadding?: boolean
}

export function ValueRenderer({ selected, props }: any) {
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

function SelectField({
  bottomPadding = true,
  ...props
}: OutlinedFieldProps & SelectFieldProps) {
  const handleValueChange = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.handleChange(fieldProps.field.name)(e)
    if (props.handleChange) {
      props.handleChange(e.target.value)
    }

    if (props.saveInput) {
      props.saveInput(fieldProps.field.name, e.target.value)
    }
  }

  const handleBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.handleBlur(fieldProps.field.name)(e)
    if (props.handleBlur) {
      props.handleBlur(e)
    }
  }
  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => {
        return (
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
              disabled={props.disabled}
              autoFocus={props.autoFocus}
              onClick={props.onClick}
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
            {!!fieldProps.meta.error && bottomPadding && (
              <FormHelperText error={!!fieldProps.meta.error}>
                {!!fieldProps.meta.error && !!fieldProps.meta.error
                  ? fieldProps.meta.error
                  : ' '}
              </FormHelperText>
            )}
          </>
        )
      }}
    </OutlinedField>
  )
}

export function MultiselectField(props: SelectFieldProps & OutlinedFieldProps) {
  const handleValueChange = (values: any, fieldProps: FieldProps) => {
    fieldProps.form.setFieldValue(fieldProps.field.name, values)

    if (props.saveInput) {
      props.saveInput(fieldProps.field.name, values)
    }
  }

  const handleBlur = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.handleBlur(fieldProps.field.name)(e)
    if (props.handleBlur) {
      props.handleBlur(e)
    }
  }

  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => {
        return (
          <>
            <Autocomplete
              multiple
              options={props.options}
              getOptionLabel={(option: any) => option.label}
              freeSolo
              onChange={(e, newValue) => {
                handleValueChange(newValue, fieldProps)
              }}
              onBlur={(e: any) => {
                handleBlur(e, fieldProps)
              }}
              renderTags={(value: readonly Options[], getTagProps) => {
                return value.map((option: Options, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option.label}
                    {...getTagProps({ index })}
                  />
                ))
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    {...fieldProps.field}
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder={props.placeholder || 'Search...'}
                    // eslint-disable-next-line
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <IconButton size="small">
                            <SearchOutlined />
                          </IconButton>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                    size="small"
                  />
                )
              }}
            />
            <FormHelperText error={!!fieldProps.meta.error}>
              {!!fieldProps.meta.error && !!fieldProps.meta.error
                ? fieldProps.meta.error
                : ' '}
            </FormHelperText>
          </>
        )
      }}
    </OutlinedField>
  )
}

export default SelectField
