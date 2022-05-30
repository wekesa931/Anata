import React, {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import parse from 'html-react-parser'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { CheckSquare, Square } from 'react-feather'
import FormHelperText from '@mui/material/FormHelperText'
import { InputLabel } from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useLazyQuery } from '@apollo/client'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import styles from '../guided-workflows.component.css'
import { Form } from '../workflow-types'
import { GET_LINKED_RECORD } from '../../../../../gql/workflows'

const icon = <Square width={18} height={18} />
const checkedIcon = <CheckSquare width={18} height={18} />

const Pointer = () => (
  <span style={{ color: 'var(--dark-blue-70)' }}>&nbsp;*</span>
)

const WorkflowFormsInput = ({
  value,
  field,
  fieldName,
  disabled,
  control,
  helperText,
  error,
  template,
  airtableMeta,
  saveInput,
}: Form) => {
  const isWorkflowForm =
    field.name !== 'Case ID' && field.name !== 'Member' && template?.workflowId
  const isNormalForm = field.name !== 'Member' && !template?.workflowId
  switch (field.type) {
    case 'foreignKey':
      if (isWorkflowForm || isNormalForm) {
        return (
          <LinkRecordInput
            value={value}
            template={template}
            fieldName={fieldName}
            disabled={disabled}
            helperText={helperText}
            field={field}
            airtableMeta={airtableMeta}
            saveInput={saveInput}
            control={control}
            error={error}
          />
        )
      }
      return <></>

    case 'select':
    case 'singleSelect':
      return (
        <SingleSelectOption
          value={value}
          fieldName={fieldName}
          disabled={disabled}
          helperText={helperText}
          field={field}
          airtableMeta={airtableMeta}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'multiSelect':
    case 'multipleSelects':
      return (
        <MultiSelectMultipleInput
          value={value}
          disabled={disabled}
          fieldName={fieldName}
          field={field}
          airtableMeta={airtableMeta}
          helperText={helperText}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'number':
      return (
        <TextInputField
          type="number"
          value={value}
          disabled={disabled}
          field={field}
          fieldName={fieldName}
          helperText={helperText}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'url':
    case 'text':
    case 'multilineText':
    case 'singleLineText':
    case 'richText':
      return (
        <TextInputField
          type="text"
          value={value}
          disabled={disabled}
          field={field}
          fieldName={fieldName}
          helperText={helperText}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'date':
      return (
        <DateInputField
          value={value}
          disabled={disabled}
          field={field}
          fieldName={fieldName}
          helperText={helperText}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    default:
      return <></>
  }
}

const SingleSelectOption = ({
  value,
  field,
  disabled,
  fieldName,
  helperText,
  airtableMeta,
  saveInput,
  control,
  error,
}: Form) => {
  if (
    airtableMeta &&
    airtableMeta[field.parentTableId].fields[field.id].options?.choices.length >
      2
  ) {
    return (
      <SingleSelectInput
        value={value}
        disabled={disabled}
        field={field}
        airtableMeta={airtableMeta}
        fieldName={fieldName}
        helperText={helperText}
        saveInput={saveInput}
        control={control}
        error={error}
      />
    )
  }
  return (
    <SingleSelectView
      value={value}
      fieldName={fieldName}
      disabled={disabled}
      airtableMeta={airtableMeta}
      field={field}
      helperText={helperText}
      saveInput={saveInput}
      control={control}
      error={error}
    />
  )
}

const SingleSelectInput = ({
  value,
  disabled,
  field,
  helperText,
  fieldName,
  airtableMeta,
  saveInput,
  control,
  error,
}: Form) => {
  const [option, setOption] = useState<any>(null)
  useEffect(() => {
    if (value) {
      setOption(value)
    } else {
      setOption(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const handleChange = (newValue: any) => {
    setOption(newValue)
    saveInput(field.name, newValue)
  }
  const optionsData = airtableMeta
    ? airtableMeta[field.parentTableId].fields[field.id].options?.choices
    : []

  return (
    <Controller
      name={fieldName}
      defaultValue={value}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Autocomplete
          className={styles.autoComplete}
          disabled={disabled}
          disablePortal
          value={option}
          id="combo-box-demo"
          options={optionsData.map((opt) => opt.name)}
          onChange={(event: any, newValue: string) => {
            handleChange(newValue)
            onChange(newValue)
          }}
          renderInput={(params) => (
            <>
              {helperText && (
                <div>
                  <p
                    className={
                      error?.message
                        ? `${styles.fieldNameError}`
                        : `${styles.fieldLabel}`
                    }
                  >
                    {field.name}
                    {field.required && <Pointer />}
                  </p>
                  <p className={styles.helperText}>{parse(helperText)}</p>
                </div>
              )}
              <TextField
                {...params}
                label={
                  <p
                    className={
                      error?.message
                        ? `${styles.fieldNameError}`
                        : `${
                            helperText
                              ? styles.fieldLabelBlurred
                              : styles.fieldLabel
                          }`
                    }
                  >
                    {field.name}
                    {field.required && <Pointer />}
                  </p>
                }
              />
              {error && (
                <FormHelperText className={styles.fieldLabelError}>
                  Select at least one item
                </FormHelperText>
              )}
            </>
          )}
        />
      )}
    />
  )
}

const SingleSelectView = ({
  value,
  field,
  disabled,
  fieldName,
  helperText,
  airtableMeta,
  saveInput,
  control,
  error,
}: Form) => {
  const [option, setOption] = useState<string | null>(null)
  useEffect(() => {
    if (value) {
      setOption(value)
    } else {
      setOption(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const optionsData = airtableMeta
    ? airtableMeta[field.parentTableId].fields[field.id].options?.choices
    : []
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setOption(event.target.value)
    saveInput(field.name, event.target.value)
  }

  return (
    <Controller
      name={fieldName}
      defaultValue={value}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => {
        return (
          <>
            {helperText && (
              <div>
                <p
                  className={
                    error?.message
                      ? `${styles.fieldNameError}`
                      : `${styles.fieldLabel}`
                  }
                >
                  {field.name}
                  {field.required && <Pointer />}
                </p>
                <p>
                  <p className={styles.helperText}>{parse(helperText)}</p>
                </p>
              </div>
            )}
            <FormControl
              className={`${styles.singleSelectView}`}
              component="fieldset"
            >
              {!helperText && (
                <FormLabel component="legend">
                  <p
                    className={
                      error?.message
                        ? `${styles.fieldNameError}`
                        : `${
                            helperText
                              ? styles.fieldLabelBlurred
                              : styles.fieldLabel
                          }`
                    }
                  >
                    {field.name}
                    {field.required && <Pointer />}
                  </p>
                </FormLabel>
              )}
              <RadioGroup
                className={styles.radioGroup}
                aria-label={field.name}
                value={option}
                onChange={(event) => {
                  handleChange(event)
                  onChange(event)
                }}
                name="radio-buttons-group"
              >
                {optionsData.map((choice) => (
                  <Fragment key={choice.name}>
                    <FormControlLabel
                      value={choice.name}
                      disabled={disabled}
                      control={<Radio />}
                      label={choice.name}
                    />
                  </Fragment>
                ))}
              </RadioGroup>
            </FormControl>
            {error && (
              <FormHelperText
                className={`${styles.fieldLabelError} ${styles.autoCompleteError}`}
              >
                Select at least one item from the list
              </FormHelperText>
            )}
          </>
        )
      }}
    />
  )
}

const MultiSelectMultipleInput = ({
  value: checkedValues,
  field,
  fieldName,
  helperText,
  saveInput,
  airtableMeta,
  disabled,
  control,
  error,
}: Form) => {
  const [selectedChoices, setSelectedChoices] = useState<any[]>([])

  useEffect(() => {
    if (checkedValues) {
      setSelectedChoices(checkedValues)
    } else {
      setSelectedChoices([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedValues])
  const optionsData = airtableMeta
    ? airtableMeta[field.parentTableId].fields[field.id].options?.choices
    : []
  const handleChange = (newValue: any) => {
    setSelectedChoices(newValue)
    saveInput(field.name, newValue)
  }
  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={checkedValues}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <>
          {helperText && (
            <InputLabel>
              <div>
                <p
                  className={
                    error?.message
                      ? `${styles.fieldNameError}`
                      : `${styles.fieldLabel}`
                  }
                >
                  {field.name}
                  {field.required && <Pointer />}
                </p>
                <p className={styles.helperText}>{parse(helperText)}</p>
              </div>
            </InputLabel>
          )}
          <Autocomplete
            multiple
            className={`${styles.radioBtn} ${styles.autoComplete}`}
            id="checkboxes-tags-demo"
            value={selectedChoices}
            defaultValue={checkedValues}
            options={optionsData.map((opt) => opt.name)}
            disabled={disabled}
            disableCloseOnSelect
            onChange={(event: SyntheticEvent<Element, Event>, value: any[]) => {
              onChange(value)
              handleChange(value)
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <p
                    className={
                      error?.message
                        ? `${styles.fieldNameError}`
                        : `${
                            helperText
                              ? styles.fieldLabelBlurred
                              : styles.fieldLabel
                          }`
                    }
                  >
                    {field.name}
                    {field.required && <Pointer />}
                  </p>
                }
              />
            )}
          />
          {error && (
            <FormHelperText className={styles.fieldLabelError}>
              Select at least one item
            </FormHelperText>
          )}
        </>
      )}
    />
  )
}

const TextInputField = ({
  value,
  field,
  disabled,
  type,
  helperText,
  fieldName,
  saveInput,
  control,
  error,
}: Form) => {
  const [inputValue, setinputValue] = useState<number | string | null>(null)
  const [shouldShrink, setShouldShrink] = useState(false)
  const [numError, setNumError] = useState(false)
  useEffect(() => {
    if (value) {
      setinputValue(value)
    } else {
      setinputValue(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    saveInput(field.name, event.target.value)
    setinputValue(event.target.value)
  }

  return (
    <Box
      className={styles.fieldMargin}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Controller
        name={fieldName}
        control={control}
        defaultValue={value}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <>
            {helperText && (
              <InputLabel>
                <div>
                  <p
                    style={{ whiteSpace: 'initial' }}
                    className={
                      error?.message
                        ? `${styles.fieldNameError}`
                        : `${styles.fieldLabel}`
                    }
                  >
                    {field.name} {field.required && <Pointer />}
                  </p>
                  <p className={styles.helperText}>{parse(helperText)}</p>
                </div>
              </InputLabel>
            )}
            <TextField
              className={`${styles.textField} ${
                error?.message ? `${styles.textfieldError}` : ''
              } `}
              id="outlined-basic"
              defaultValue={value}
              disabled={disabled}
              value={inputValue}
              onBlur={() => setShouldShrink(false)}
              onFocus={() => setShouldShrink(true)}
              InputLabelProps={{
                shrink: inputValue || shouldShrink,
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (type === 'number') {
                  // const num = parseFloat(e.target.value)
                  if (isNaN(Number(e.target.value))) {
                    setNumError(true)
                  } else {
                    setNumError(false)
                    handleChange(e)
                    onChange(e)
                  }
                } else {
                  handleChange(e)
                  onChange(e)
                }
              }}
              label={
                <p
                  className={
                    error?.message
                      ? `${styles.fieldNameError}`
                      : `${
                          helperText
                            ? styles.fieldLabelBlurred
                            : styles.fieldLabel
                        }`
                  }
                >
                  {field.name} {field.required && <Pointer />}
                </p>
              }
              variant="outlined"
            />
            {numError && (
              <FormHelperText className={styles.fieldLabelError}>
                The value should be a number
              </FormHelperText>
            )}
            {error && (
              <FormHelperText className={styles.fieldLabelError}>
                This field is required
              </FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  )
}

const LinkRecordInput = ({
  value: linkedValue,
  field,
  helperText,
  saveInput,
  template,
  airtableMeta,
  fieldName,
  disabled,
  control,
  error,
}: Form) => {
  const [selectedChoices, setSelectedChoices] = useState<any>(() => {
    if (field.relationship === 'many') {
      return []
    }
    return null
  })
  const [linkedRecords, setLinkedRecords] = useState<any[]>([])
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 50,
  })
  const [getLinkedRecords, { data, loading: gettingLinkedRecords }] =
    useLazyQuery(GET_LINKED_RECORD)
  const settingLinkedData = gettingLinkedRecords || !airtableMeta
  useEffect(() => {
    if (data) {
      const response = data.globalSearch.data
      const displayFields: any[] = []
      response.forEach((fl) => {
        const loadedMeta =
          fl.fields[airtableMeta[field.foreignTableId].fields.primaryFieldName]
        const loadedValue = loadedMeta && typeof loadedMeta === 'string'
        if (loadedValue) {
          displayFields.push({
            id: fl.id,
            name: loadedMeta?.toLocaleString(),
          })
        }
      })
      setLinkedRecords(displayFields)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  const checkAntaraIdKey = () => {
    const validKeys = [
      'Antara ID (from member)',
      'Antara ID (from Members)',
      'antara_id',
      'Antara ID',
      'antara_member_id',
      'Antara Member ID',
    ]
    let presentKey = ''
    const metaFields = airtableMeta[field.foreignTableId].fields
    Object.keys(metaFields).forEach((ky) => {
      validKeys.forEach((vl) => {
        if (metaFields[ky].name === vl) {
          presentKey = vl
        }
      })
    })
    return presentKey
  }
  useEffect(() => {
    if (airtableMeta) {
      getLinkedRecords({
        variables: {
          table: field.foreignTableId,
          field: airtableMeta[field.foreignTableId].fields.primaryFieldName,
          searchParam: '',
          antaraIdKey: checkAntaraIdKey(),
          antaraIdValue: checkAntaraIdKey() ? template?.antaraId || '' : '',
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta])

  useEffect(() => {
    if (linkedValue && linkedRecords.length > 0) {
      const recordValue = linkedRecords.filter((rec: any) =>
        linkedValue.some((val) => rec.id === val)
      )
      if (field.relationship === 'many') {
        setSelectedChoices(recordValue)
      } else {
        setSelectedChoices(recordValue[0])
      }
    } else if (field.relationship === 'many') {
      setSelectedChoices([])
    } else {
      setSelectedChoices(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedValue, linkedRecords])

  const handleChange = (onChange: (val: any) => any, value: any) => {
    if (Array.isArray(value)) {
      const recordValue = value.map((rec) => rec.id)
      onChange(recordValue)
      setSelectedChoices(value)
      saveInput(field.name, recordValue)
    } else {
      onChange([value.id])
      setSelectedChoices(value)
      saveInput(field.name, [value.id])
    }
  }

  return (
    <Controller
      name={fieldName}
      defaultValue={linkedValue}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <>
          {helperText && (
            <InputLabel>
              <div>
                <p
                  className={
                    error?.message
                      ? `${styles.fieldNameError}`
                      : `${styles.fieldLabel}`
                  }
                >
                  {field.name}
                  {field.required && <Pointer />}
                </p>
                <p className={styles.helperText}>{parse(helperText)}</p>
              </div>
            </InputLabel>
          )}
          <Autocomplete
            multiple={field.relationship === 'many'}
            disablePortal
            filterOptions={filterOptions}
            disabled={disabled}
            loading={settingLinkedData}
            loadingText={
              <div className={styles.recordLoader}>
                <LoadingIcon /> Loading {field.name} records
              </div>
            }
            id="combo-box-demo"
            options={linkedRecords}
            value={selectedChoices}
            disableCloseOnSelect={field.relationship === 'many'}
            sx={{ marginBottom: 2 }}
            onChange={(event: SyntheticEvent<Element, Event>, value: any) =>
              handleChange(onChange, value)
            }
            getOptionLabel={(option) => option?.name || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <p
                    className={
                      error?.message
                        ? `${styles.fieldNameError}`
                        : `${
                            helperText
                              ? styles.fieldLabelBlurred
                              : styles.fieldLabel
                          }`
                    }
                  >
                    {field.name}
                    {field.required && <Pointer />}
                  </p>
                }
              />
            )}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox
                    key={option.id}
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )
            }}
          />
          {error && (
            <FormHelperText className={styles.fieldLabelError}>
              This field is required
            </FormHelperText>
          )}
        </>
      )}
    />
  )
}

const DateInputField = ({
  value: dateValue,
  field,
  helperText,
  saveInput,
  fieldName,
  disabled,
  control,
  error,
}: Form) => {
  const [value, setValue] = useState<Date | null>(null)
  useEffect(() => {
    if (dateValue) {
      setValue(dateValue)
    } else {
      setValue(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue])

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
    if (field.isDateTime) {
      saveInput(field.name, dayjs(newValue).format('YYYY-MM-DDTHH:mm'))
    } else {
      saveInput(field.name, dayjs(newValue).format('YYYY-MM-DD'))
    }
  }

  return (
    <Box
      component="form"
      className={
        error?.message ? `${styles.datefieldError}` : `${styles.fieldMargin}`
      }
      noValidate
      autoComplete="off"
    >
      <Controller
        name={fieldName}
        control={control}
        defaultValue={dateValue}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <>
            {helperText && (
              <div>
                <p
                  className={
                    error?.message
                      ? `${styles.fieldNameError}`
                      : `${styles.fieldLabel}`
                  }
                >
                  {field.name} {field.required && <Pointer />}
                </p>
                <p className={styles.helperText}>{parse(helperText)}</p>
              </div>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {field.isDateTime ? (
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label={
                    <p
                      className={
                        error?.message
                          ? `${styles.fieldNameError}`
                          : `${
                              helperText
                                ? styles.fieldLabelBlurred
                                : styles.fieldLabel
                            }`
                      }
                    >
                      {field.name} {field.required && <Pointer />}
                    </p>
                  }
                  disabled={disabled}
                  value={value}
                  onChange={(newValue: Date | null) => {
                    handleChange(newValue)
                    onChange(newValue)
                  }}
                />
              ) : (
                <MobileDatePicker
                  label={
                    <p
                      className={
                        error?.message
                          ? `${styles.fieldNameError}`
                          : `${
                              helperText
                                ? styles.fieldLabelBlurred
                                : styles.fieldLabel
                            }`
                      }
                    >
                      {field.name} {field.required && <Pointer />}
                    </p>
                  }
                  inputFormat="dd/MM/yyyy"
                  disabled={disabled}
                  value={value}
                  onChange={(newValue: Date | null) => {
                    handleChange(newValue)
                    onChange(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
              {error && (
                <FormHelperText className={styles.fieldLabelError}>
                  This date field cannot be left blank
                </FormHelperText>
              )}
            </LocalizationProvider>
          </>
        )}
      />
    </Box>
  )
}

export default WorkflowFormsInput
