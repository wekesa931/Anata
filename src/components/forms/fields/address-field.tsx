import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material'
import { throttle } from 'lodash'
import React from 'react'
import { geocodeByPlaceId } from 'react-google-places-autocomplete'
import parse from 'autosuggest-highlight/parse'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { FormikHelpers } from 'formik'
import OutlinedField from './outlined-field'

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
  handleChange?: (v: any) => any
  required?: boolean
}

function FormPlacesField({
  label,
  id,
  handleChange,
  initialValue,
  name,
  required = false,
}: FormPlacesFieldType) {
  const [value, setValue] = React.useState<PlaceType | null>(initialValue)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  const loaded = React.useRef(false)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocompleteService`,
        document.querySelector('head'),
        'google-maps'
      )
    }

    loaded.current = true
  }

  ;(window as any).initAutocompleteService = () => {
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }
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
    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    if (autocompleteService.current) {
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
    }

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  const handlePlaceDetailsChange = (
    event: any,
    newValue: PlaceType | null,
    form: FormikHelpers<any>
  ) => {
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
    geocodeByPlaceId(place_id).then((results) => {
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

      const residentialTown =
        addressComponents.find((addressComponent: any) => {
          return addressComponent?.types?.includes('locality')
        })?.long_name || ''

      // get the lat, lng values
      const lat = results[0]?.geometry?.location?.lat()
      const lng = results[0]?.geometry?.location?.lng()

      fullAddress = {
        ...fullAddress,
        residentialCountry,
        residentialCounty,
        residentialTown,
        latitude: lat,
        longitude: lng,
      }

      form.setFieldValue(name, fullAddress)
      if (handleChange) {
        handleChange(fullAddress)
      }
    })
  }

  return (
    <OutlinedField label={label} name={name} required={required}>
      {({ field, meta, form }) => (
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
          noOptionsText="Type for suggestions"
          size="small"
          value={value}
          fullWidth
          onChange={(e: any, v: any) => handlePlaceDetailsChange(e, v, form)}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                {...field}
                error={!!meta.touched && !!meta.error}
                size="small"
                fullWidth
                helperText={meta.touched && meta.error ? meta.error : ' '}
                placeholder="Search for a location"
                label=""
              />
            </>
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
      )}
    </OutlinedField>
  )
}

export default FormPlacesField
