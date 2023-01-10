import React, { useState } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Chip,
  Box,
  Autocomplete,
  Grid,
  Typography,
  FormHelperText,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Theme, useTheme } from '@mui/material/styles'
import { throttle } from 'lodash'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import parse from 'autosuggest-highlight/parse'
import { geocodeByPlaceId } from 'react-google-places-autocomplete'

/** Form field configurations */
export type FormFieldType = {
  id: string
  label?: string
  type: string
  dataIndex: string
  readOnly?: boolean
  options?: Array<any>
  required?: boolean
  items?: FormFieldType[]
  conditionalField?: string
  showAddButton?: boolean
  index?: number
  editable?: boolean
  multiple?: boolean
  category?: string
  fullWidth?: boolean
  helperText?: string
  stateKey: string
  dynamic?: boolean
  addButtonText?: string
}

/**
 * Date Picker element
 */

type DatePickerProps = {
  date: Date | null
  label: string
  readOnly: boolean
  name: string
  setFieldValue?: (name: string, v: any) => any
  handleChange: (v: any) => any
  id: string
}

export function FormDatePicker(props: DatePickerProps) {
  const { date, label, readOnly, name, handleChange, id } = props

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      css={{ marginTop: 5 }}
      key={id}
    >
      <DatePicker
        label={label}
        value={date}
        onChange={(d) => handleChange(dayjs(d).format('YYYY-MM-DD'))}
        renderInput={(params) => (
          <TextField {...params} fullWidth size="small" name={name} />
        )}
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
  handleChange: (value: any) => any
  required?: boolean
  errors?: any
  textarea?: boolean
  number?: boolean
  name: string
  fullWidth?: boolean
  helperText?: string
}

/** Text input */
export function FormTextField(props: TextFieldProps) {
  const {
    value,
    label,
    handleChange,
    required,
    errors,
    textarea,
    number,
    name,
    fullWidth = true,
    helperText,
    id,
  } = props

  const texareaProps = textarea
    ? {
        multiline: true,
        rows: 3,
      }
    : {}

  return (
    <TextField
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      required={required}
      error={!!errors}
      helperText={errors || helperText}
      {...texareaProps}
      inputProps={{
        inputMode: number ? 'numeric' : 'text',
        pattern: number ? '[0-9]*' : '',
      }}
      fullWidth={fullWidth}
      sx={{ mt: 1, mb: 1.5 }}
      size="small"
      key={id}
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
  value: any
  handleChange: (value: any) => void
  options?: Array<Option>
  multiple?: boolean
  name: string
  setFieldValue?: (name: string, v: any) => any
  fullWidth?: boolean
  errors?: any
}

export function FormAutoCompleteField({
  id,
  label,
  value,
  options,
  handleChange,
  errors,
}: any) {
  return (
    <FormControl
      fullWidth
      sx={{ mb: 1.5, mt: 1, minWidth: 200 }}
      size="small"
      key={id}
    >
      <Autocomplete
        id={id}
        value={value}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        size="small"
        fullWidth
        key={id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            error={!!errors}
            helperText={errors}
          />
        )}
        onChange={(event: any, newValue: any) => {
          handleChange(newValue)
        }}
      />
    </FormControl>
  )
}

export function FormSelectField({
  id,
  label,
  value,
  handleChange,
  options,
  name,
  fullWidth = true,
  errors,
}: SelectInputProps) {
  const changeHandler = (event: SelectChangeEvent) => {
    handleChange(event.target.value as string)
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      sx={{ minWidth: 200, mb: 1.5, mt: 1 }}
      size="small"
      key={id}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        label={label}
        value={value || ''}
        defaultValue=""
        onChange={changeHandler}
        name={name}
        error={!!errors}
        data-testid={name}
      >
        {options &&
          options.map((option, i) => (
            <MenuItem value={option.value} key={`option-${i}`}>
              {option.label}
            </MenuItem>
          ))}
      </Select>
      {!!errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  )
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(value: string, values: readonly string[], theme: Theme) {
  return {
    fontWeight:
      values.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export function FormMultipleSelect({
  id,
  options,
  label,
  name,
  handleChange,
  value,
  errors,
}: SelectInputProps) {
  const theme = useTheme()
  const [selectedValue, setValue] = useState<string[]>(value)

  const changeHandler = (event: SelectChangeEvent<typeof selectedValue>) => {
    const { target } = event
    const targetValue =
      typeof target.value === 'string' ? target.value.split(',') : target.value
    setValue(targetValue)
    handleChange(targetValue)
  }

  return (
    <FormControl
      fullWidth
      sx={{ minWidth: 200, mb: 1.5, mt: 1 }}
      size="small"
      key={id}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        label={label}
        value={selectedValue || []}
        onChange={changeHandler}
        name={name}
        error={!!errors}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((v) => (
                <Chip key={v} label={v} />
              ))}
            </Box>
          )
        }}
        MenuProps={MenuProps}
      >
        {options &&
          options.map((option, i) => (
            <MenuItem
              value={option.value}
              key={`option-${i}`}
              style={getStyles(option.label, value, theme)}
            >
              {option.label}
            </MenuItem>
          ))}
      </Select>
      {!!errors && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  )
}

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[]
}
interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
  place_id: string
  latitiude: number
  longitude: number
  residentialCountry: string
  residentialCounty: string
}

type FormPlacesFieldType = {
  id: string
  label?: string
  name: string
  initialValue: PlaceType | null
  handleChange: (v: any) => any
}

export function FormPlacesField({
  label,
  id,
  handleChange,
  initialValue,
}: FormPlacesFieldType) {
  const [value, setValue] = React.useState<PlaceType | null>(initialValue)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  const loaded = React.useRef(false)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: {
            input: string
            componentRestrictions: { country: string }
          },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          ;(autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          )
        },
        1000
      ),
    []
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch(
      {
        input: inputValue,
        componentRestrictions: { country: 'ke' },
      },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = []

          if (value) {
            newOptions = [value]
          }

          if (results) {
            newOptions = [...newOptions, ...results]
          }

          setOptions(newOptions)
        }
      }
    )

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  const handlePlaceDetailsChange = (event: any, newValue: PlaceType | null) => {
    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue)

    // extract description and place id
    const description = newValue?.description || ''
    const place_id = newValue?.place_id || ''

    let fullAddress: any = {
      description,
      place_id,
    }

    // geocode the place_id
    geocodeByPlaceId(place_id)
      .then((results) => {
        const addressComponents = results[0]?.address_components

        const residentialCountry =
          addressComponents.find((addressComponent: any) => {
            return addressComponent?.types?.includes('country')
          })?.long_name || ''

        const residentialCounty =
          addressComponents.find((addressComponent: any) => {
            return addressComponent?.types?.includes(
              'administrative_area_level_1'
            )
          })?.long_name || ''

        // get the lat, lng values
        const lat = results[0]?.geometry?.location?.lat()
        const lng = results[0]?.geometry?.location?.lng()

        fullAddress = {
          ...fullAddress,
          residentialCountry,
          residentialCounty,
          latitude: lat,
          longitude: lng,
        }
      })
      .finally(() => {
        handleChange(fullAddress)
      })
  }

  return (
    <Autocomplete
      id={id}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option?.description
      }
      key={id}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      size="small"
      value={value}
      fullWidth
      onChange={handlePlaceDetailsChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option?.structured_formatting?.main_text_matched_substrings || []
        const parts = parse(
          option?.structured_formatting?.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option?.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
