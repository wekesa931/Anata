import React from 'react'
import { FieldProps } from 'formik'
import {
  FormHelperText,
  TextField,
  IconButton,
  lighten,
  darken,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
// eslint-disable-next-line
import PropTypes from 'prop-types'
import SearchOutlined from '@mui/icons-material/Search'
import OutlinedField, { OutlinedFieldProps } from './outlined-field'

type SelectFieldProps = {
  options: { label: string; value: string }[]
  multiple?: boolean
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}))

function PopperComponent(props: any) {
  // eslint-disable-next-line
  const { disablePortal, anchorEl, open, ...other } = props
  return <StyledAutocompletePopper {...other} />
}

PopperComponent.propTypes = {
  // eslint-disable-next-line
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
}

const GroupItems = styled('ul')({
  padding: 0,
})

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}))

function GroupedSearchField(props: OutlinedFieldProps & SelectFieldProps) {
  const handleInputChange = (val: string) => {
    if (props.handleInputChange) {
      props.handleInputChange(val)
    }
  }

  const handleValueChange = (e: any, fieldProps: FieldProps) => {
    fieldProps.form.handleChange(fieldProps.field.name)(e.value)
    if (props.handleChange) {
      props.handleChange(e.value)
    }
  }

  const [open, setOpen] = React.useState(false)

  return (
    <OutlinedField {...props}>
      {(fieldProps: FieldProps) => {
        return (
          <>
            <Autocomplete
              classes={{
                noOptions: !open ? 'hidden' : '',
              }}
              popupIcon={null}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              groupBy={(option) => option.value[0].toUpperCase()}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
              inputValue={fieldProps?.field?.value}
              // eslint-disable-next-line
              onChange={(event, newValue) => {
                handleValueChange(newValue, fieldProps)
              }}
              onInputChange={(event, newInputValue) => {
                handleInputChange(newInputValue)
              }}
              disableClearable
              PopperComponent={PopperComponent}
              noOptionsText={open ? props.EmptyOptionBtn : null}
              options={props.options}
              getOptionLabel={(option) => option?.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    {...fieldProps.field}
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder="Search employer name"
                    // eslint-disable-next-line
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <IconButton size="small">
                          <SearchOutlined />
                        </IconButton>
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

export default GroupedSearchField
