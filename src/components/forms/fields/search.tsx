import {
  Autocomplete,
  Grid,
  TextField,
  CircularProgress,
  FormControl,
  FormLabel,
} from '@mui/material'
import React, { useState } from 'react'
import { throttle } from 'lodash'

type Searchable = {
  displayName?: string
  [key: string]: any
}

type SearchFieldProps<T extends Searchable> = {
  search: (query: string) => Promise<T[]>
  handleChange: (v: T) => void
  label: string
  initialValue?: T
  disabled?: boolean
}

export default function SearchField<T extends Searchable>({
  search,
  handleChange,
  label,
  initialValue,
  disabled,
}: SearchFieldProps<T>) {
  const [options, setOptions] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<T | null>(initialValue || null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = throttle((e: any, v: any, reason: any) => {
    const query = v || ''
    if (query.length > 2 && reason === 'input') {
      setLoading(true)
      setError(null)
      search(query)
        .then((res) => {
          setOptions(res)
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, 500)

  const onChange = (e: any, v: T | null) => {
    setValue(v)
    if (v) {
      handleChange(v)
    }
  }

  return (
    <FormControl fullWidth>
      <FormLabel className="font-rubik font-medium text-grey-main text-base text-left mb-2">
        {label}
      </FormLabel>
      <Autocomplete
        options={options}
        loading={loading}
        autoComplete
        filterSelectedOptions
        disablePortal
        includeInputInList
        getOptionLabel={(option) => option?.displayName || ''}
        size="small"
        value={value}
        disabled={disabled}
        fullWidth
        onChange={onChange}
        onInputChange={handleSearch}
        noOptionsText="Type to search"
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <p className="text-grey-main text-base font-rubik ">
                    {option?.displayName}
                  </p>
                </Grid>
              </Grid>
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            fullWidth
            error={!!error}
            placeholder="Type to search"
            helperText={error}
            disabled={disabled}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </FormControl>
  )
}
