import React, {
  ChangeEvent,
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import parse from 'html-react-parser'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { CheckSquare, Square } from 'react-feather'
import FormHelperText from '@mui/material/FormHelperText'
import { InputLabel } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { useLazyQuery } from '@apollo/client'
import { Editor } from 'react-draft-wysiwyg'
import { markdownToDraft, draftToMarkdown } from 'markdown-draft-js'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { debounce } from 'lodash'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import { Form } from 'src/modules/workflows/types'
import { OPTIMIZED_SEARCH, GET_DOCUMENT_OPENSEARCH } from 'src/gql/search'
import { INDEXES } from 'src/modules/workflows/utils'
import { useMember } from 'src/context/member'
import useConditionsData from 'src/modules/conditions/hooks/conditions.data'
import logError from 'src/utils/logging/logger'
import airtableFetch from 'src/services/airtable/fetch'
import styles from './styles.module.css'
import { useForeignKeyDataHandler } from '../../hooks/foreign-key-data-handler'

const icon = <Square width={18} height={18} />
const checkedIcon = <CheckSquare width={18} height={18} />

function Pointer() {
  return <span className="text-dark-blue-70">&nbsp;*</span>
}

function HelperText({ error, field }: any) {
  return (
    <div>
      <p
        className={`grow-0 text-left font-rubik text-xs font-medium ${
          error?.message ? 'mb-6 text-red-100' : 'text-dark-blue-100'
        }`}
      >
        {field.alias || field.name}
        {field.required && <Pointer />}
      </p>
      <p
        className={`mb-2.5 whitespace-pre-line font-rubik text-xs text-dark-blue-100 ${
          field.formId ? 'mb-60[px]' : ''
        }`}
      >
        {parse(field.helper)}
      </p>
    </div>
  )
}
function Label({ error, field }: any) {
  const getClassName = () => {
    if (error?.message) {
      return 'text-red-100'
    }
    if (field?.helper) {
      return 'text-dark-blue-50'
    }
    return 'text-dark-blue-100'
  }
  return (
    <p className={`text-left font-rubik text-sm font-medium ${getClassName()}`}>
      {field.alias || field.name}
      {field.required && <Pointer />}
    </p>
  )
}
function WorkflowFormsFields({
  value,
  field,
  disabled,
  control,
  error,
  airtableMeta,
  saveInput,
}: Form) {
  const notIn = (arr: string[]) => !arr.includes(field.foreignTableId)
  const notCaseIdField = () => notIn(['tbl7Kh4tVrQp9JdUc', 'tblpQpVJrFonBQuBg'])
  const notMemberField = () => notIn(['tblAjKAJOCIDk5Nco', 'tblidCJtioaFSYwvk'])

  switch (field.type) {
    case 'foreignKey':
      if (notMemberField() && notCaseIdField()) {
        return (
          <LinkRecordInput
            value={value}
            disabled={disabled}
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
    case 'checkbox':
    case 'singleSelect':
      return (
        <SingleSelectOption
          value={value}
          disabled={disabled}
          field={field}
          airtableMeta={airtableMeta}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )

    case 'multiSelect':
    case 'multipleSelects':
      if (airtableMeta) {
        return (
          <MultiSelectMultipleInput
            value={value}
            disabled={disabled}
            field={field}
            airtableMeta={airtableMeta}
            saveInput={saveInput}
            control={control}
            error={error}
          />
        )
      }
      return <LoaderOption field={field} airtableMeta={airtableMeta} />

    case 'number':
      return (
        <TextInputField
          type="number"
          value={value}
          disabled={disabled}
          field={field}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'url':
    case 'text':
    case 'multilineText':
    case 'singleLineText':
      return (
        <TextInputField
          type="text"
          value={value}
          disabled={disabled}
          field={field}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'richText':
      return (
        <RichTextInputField
          type="text"
          value={value}
          disabled={disabled}
          field={field}
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
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    case 'conditions':
      return (
        <ConditionSelectOption
          disabled={disabled}
          field={field}
          saveInput={saveInput}
          control={control}
          error={error}
          relationship={field.relationship}
        />
      )
    default:
      return <></>
  }
}

function ConditionSelectOption({
  field,
  disabled,
  saveInput,
  control,
  error,
  relationship,
  value,
}: Form) {
  const isMultiple = relationship === 'many'
  const [option, setOption] = useState<any>(isMultiple ? [] : null)

  const { allConditions, loading } = useConditionsData()

  const handleChange = (value: any) => {
    if (value) {
      const valueToWrite = isMultiple ? value?.join(',') : value
      saveInput(field.name, valueToWrite)
      setOption(value)
    }
  }

  return (
    <Controller
      name={field.name}
      defaultValue={value}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Autocomplete
          className="mb-4"
          disabled={disabled}
          disablePortal
          value={option}
          id="combo-box-demo"
          options={allConditions.map((opt) => opt.name)}
          onChange={(event: any, newValue: string) => {
            handleChange(newValue)
            onChange(newValue)
          }}
          loading={loading}
          loadingText={
            <div className="flex text-xs">
              <LoadingIcon /> Loading member conditions...
            </div>
          }
          multiple={isMultiple}
          renderInput={(params) => (
            <>
              {field.helper && <HelperText field={field} error={error} />}
              <TextField
                {...params}
                label={<Label field={field} error={error} />}
              />
              {error && (
                <FormHelperText className="mb-6 text-left font-rubik text-xs font-medium text-red-100">
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

function SingleSelectOption({
  value,
  field,
  disabled,
  airtableMeta,
  saveInput,
  control,
  error,
}: Form) {
  if (airtableMeta) {
    const isCheckBoxField =
      airtableMeta[field.parentTableId]?.fields[field.id]?.type === 'checkbox'
    if (isCheckBoxField) {
      return (
        <SingleSelectView
          value={value}
          disabled={disabled}
          airtableMeta={airtableMeta}
          field={field}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )
    }

    return (
      <SingleSelectInput
        value={value}
        disabled={disabled}
        field={field}
        airtableMeta={airtableMeta}
        saveInput={saveInput}
        control={control}
        error={error}
      />
    )
  }

  return <LoaderOption field={field} airtableMeta={airtableMeta} />
}

function SingleSelectInput({
  value,
  disabled,
  field,
  airtableMeta,
  saveInput,
  control,
  error,
}: Form) {
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
    if (field.conditionalOptions) {
      const option = field?.options?.find((f: any) => f.name === newValue)
      if (option) {
        saveInput(field.name, option)
      }
    } else {
      saveInput(field.name, newValue)
    }
  }

  const getFieldOptions = () => {
    if (field.conditionalOptions) {
      return field.options
    }

    const options = (
      airtableMeta?.[field.parentTableId]?.fields[field.id] || ({} as any)
    )?.options?.choices

    return options || []
  }

  return (
    <Controller
      name={field.name}
      defaultValue={value}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Autocomplete
          className="mb-4"
          disabled={disabled}
          disablePortal
          value={option}
          id="combo-box-demo"
          options={getFieldOptions().map((opt: any) => opt.name)}
          onChange={(event: any, newValue: string) => {
            handleChange(newValue)
            onChange(newValue)
          }}
          renderInput={(params) => (
            <>
              {field.helper && <HelperText field={field} error={error} />}
              <TextField
                {...params}
                label={<Label field={field} error={error} />}
              />
              {error && (
                <FormHelperText className="mb-6 text-left font-rubik text-xs font-medium text-red-100">
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

function SingleSelectView({
  value,
  field,
  disabled,
  airtableMeta,
  saveInput,
  control,
  error,
}: Form) {
  const [option, setOption] = useState<string | null>(null)
  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    if (value) {
      setOption(value)
    } else {
      setOption(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const optionsData = airtableMeta
    ? airtableMeta[field.parentTableId]?.fields[field.id]?.options?.choices
    : []

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (field.type === 'checkbox') {
      setChecked(event.target.checked)
      saveInput(field.name, event.target.checked)
    } else {
      setOption(event.target.value)
      saveInput(field.name, event.target.value)
    }
  }

  return (
    <Controller
      name={field.name}
      defaultValue={value}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => {
        return (
          <>
            {field.helper && <HelperText field={field} error={error} />}
            {field.type === 'checkbox' ? (
              <FormControlLabel
                sx={{
                  marginLeft: 0,
                }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={field.name}
                    inputProps={{ 'aria-label': field.name }}
                  />
                }
                label={field.name}
                labelPlacement="start"
              />
            ) : (
              <FormControl
                className="m-0 mt-2 min-w-[90%]"
                component="fieldset"
              >
                {!field.helper && (
                  <FormLabel component="legend">
                    <Label field={field} error={error} />
                  </FormLabel>
                )}
                <RadioGroup
                  className="flex w-full flex-row"
                  aria-label={field.name}
                  value={option}
                  onChange={(event) => {
                    handleChange(event)
                    onChange(event)
                  }}
                  name="radio-buttons-group"
                >
                  {(optionsData || []).map((choice: any) => (
                    <Fragment key={choice.name}>
                      <FormControlLabel
                        value={choice.name}
                        disabled={disabled}
                        control={<Radio />}
                        label={choice.name.toString()}
                      />
                    </Fragment>
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {error && (
              <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
                Select at least one item from the list
              </FormHelperText>
            )}
          </>
        )
      }}
    />
  )
}

function MultiSelectMultipleInput({
  value: checkedValues,
  field,
  saveInput,
  airtableMeta,
  disabled,
  control,
  error,
}: Form) {
  const optionsData = airtableMeta
    ? airtableMeta[field.parentTableId]?.fields[field.id]?.options?.choices
    : []
  const handleChange = (newValue: any) => {
    saveInput(field.name, newValue)
  }
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={checkedValues}
      rules={{ required: true }}
      render={({ field: { onChange, value: val } }) => (
        <>
          {field.helper && (
            <InputLabel>
              <HelperText field={field} error={error} />
            </InputLabel>
          )}
          <Autocomplete
            multiple
            className="mb-4 w-fill-available"
            id="checkboxes-tags-demo"
            value={val || []}
            defaultValue={checkedValues}
            options={(optionsData || []).map((opt) => opt.name)}
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
                label={<Label field={field} error={error} />}
              />
            )}
          />
          {error && (
            <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
              Select at least one item
            </FormHelperText>
          )}
        </>
      )}
    />
  )
}

function TextInputField({
  value,
  field,
  disabled,
  type,
  saveInput,
  control,
  error,
}: Form) {
  const [shouldShrink, setShouldShrink] = useState(false)
  const [numError, setNumError] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? undefined)

  // update inputValue when the value prop changes
  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  const handleBlur = () => {
    // we save input on blur to optimize for saves
    setShouldShrink(false)
    let parsedValue = inputValue === '' ? undefined : inputValue // default to undefined for empty strings
    if (field.type === 'number' && parsedValue)
      parsedValue = Number(parsedValue) // convert the value to number for number fields

    saveInput(field.name, parsedValue)
  }

  return (
    <Box
      className="mx-0 mt-2 mb-4"
      component="form"
      noValidate
      autoComplete="off"
    >
      <Controller
        name={field.name}
        control={control}
        defaultValue={inputValue}
        rules={{ required: true }}
        render={() => (
          <>
            {field.helper && (
              <InputLabel>
                <HelperText field={field} error={error} />
              </InputLabel>
            )}
            <TextField
              className={`${styles.textField} ${
                error?.message ? `${styles.textfieldError}` : ''
              } `}
              id="outlined-basic"
              defaultValue={inputValue}
              disabled={disabled}
              value={inputValue ?? ''}
              onBlur={handleBlur}
              onFocus={() => setShouldShrink(true)}
              InputLabelProps={{
                shrink: inputValue || shouldShrink,
              }}
              inputProps={
                type === 'number'
                  ? {
                      inputMode: 'numeric',
                      pattern: '^d*.?d*$',
                    }
                  : {}
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (type === 'number') {
                  // allow . for floating points
                  const targetValue = e.target.value
                  const regex = /^\d*\.?\d*$/
                  if (!regex.test(targetValue)) {
                    return setNumError(true)
                  }
                }
                setNumError(false)
                setInputValue(e.target.value)
              }}
              label={<Label field={field} error={error} />}
              variant="outlined"
            />
            {numError && (
              <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
                The value should be a number
              </FormHelperText>
            )}
            {error && (
              <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
                {error?.message ?? 'This field is required'}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  )
}

function RichTextInputField({
  value,
  field,
  disabled,
  saveInput,
  control,
  error,
}: Form) {
  const [open, setOpen] = useState(false)
  const [markdownState, setMarkdownState] = useState<string>(null)
  const [editorState, setEditorState] = useState<EditorState>(null)

  useEffect(() => {
    let initialValue = EditorState.createEmpty()
    if (value) {
      const rawData = markdownToDraft(value)
      const contentState = convertFromRaw(rawData)
      initialValue = EditorState.createWithContent(contentState)
    }
    setEditorState(initialValue)
  }, [value])

  const onEditorStateChange = (currentState: EditorState) => {
    setEditorState(currentState)
    const changeValue = draftToMarkdown(
      convertToRaw(currentState.getCurrentContent())
    )
    setMarkdownState(changeValue)
  }

  const displayToolbar = () => setOpen(true)
  const hideToolbar = (onChange: (val: Element) => void) => {
    setOpen(false)
    onChange(markdownState)
    saveInput(field.name, markdownState)
  }
  return (
    <Box
      className="mx-0 mt-2 mb-4"
      component="form"
      noValidate
      autoComplete="off"
    >
      <Controller
        name={field.name}
        control={control}
        defaultValue={value}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <>
            {!field.helper && <Label field={field} error={error} />}
            {field.helper && (
              <InputLabel>
                <HelperText field={field} error={error} />
              </InputLabel>
            )}
            {!disabled && (
              <Editor
                editorState={editorState}
                toolbarHidden={!open}
                onFocus={displayToolbar}
                onBlur={() => hideToolbar(onChange)}
                onEditorStateChange={(inputValue: EditorState) =>
                  onEditorStateChange(inputValue)
                }
                wrapperClassName={` border border-solid border-greyscale-3 rounded-[4px] ${
                  styles.textField
                } ${
                  error?.message
                    ? `${styles.textfieldError}`
                    : `${styles.wrapperClassName}`
                } `}
                editorClassName={styles.editorClassName}
              />
            )}
            {disabled && (
              <div className="min-h-1/2 rounded-[4px] border border-solid border-greyscale-3 p-2.5">
                {value && parse(`${value}`)}
              </div>
            )}
          </>
        )}
      />
    </Box>
  )
}

function LinkRecordInput({
  value: linkedValue,
  field,
  saveInput,
  airtableMeta,
  disabled,
  control,
  error,
}: Form) {
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

  // map table id to the indexed table id
  const IndexTable: Record<string, string> = {
    // prod
    tblYzI0t7WX9LGW4h: 'tblYzI0t7WX9LGW4h', // medication
    tblOnZn7Vo8N9wznR: 'tbltmQuqyuKPc4Ffo', // proviers
    tbltmQuqyuKPc4Ffo: 'tbltmQuqyuKPc4Ffo', // Facilities from Provider base
    tblsixUe3jfbOUMQP: 'tblsixUe3jfbOUMQP', // Specialists from Provider Base
    // staging
    tblgFQRJDav7dNdLl: 'tblgFQRJDav7dNdLl', // medications
    tblLsYlG4IiNEbWWs: 'tblLsYlG4IiNEbWWs', // facilities from provider base
    tblKoFLuzxN9g13xT: 'tblKoFLuzxN9g13xT', // specialist
    tbl6t7enrCGLBDQ4V: 'tblLsYlG4IiNEbWWs', // providers
  }

  const isInSearchSchema = Object.keys(IndexTable).includes(
    field?.foreignTableId
  )

  const dataSave = (onChange: (val: any) => any, nameId: any, value: any) => {
    onChange(nameId)
    setSelectedChoices(value)

    if (field?.valueType === 'collaborator') {
      // save the value as an email
      saveInput(field.name, {
        email: value?.email || '',
        id: nameId,
      })
    } else {
      saveInput(field.name, nameId)
    }
    // saveInput(field.name, nameId)
  }
  const handleChange = (onChange: (val: any) => any, value: any) => {
    const saveValue = (v: any) => {
      dataSave(onChange, v, value)
    }

    if (value) {
      if (Array.isArray(value)) {
        const recordId = value.map((rec) => rec.id)
        saveValue(recordId)
      } else {
        saveValue([value.id])
      }
    } else {
      saveValue(value)
    }
  }

  useEffect(() => {
    if (linkedValue && linkedRecords.length > 0) {
      const parsedLinkedValue = linkedValue?.id ?? linkedValue
      const recordValue = linkedRecords.filter(
        (rec: any) =>
          Array.isArray(parsedLinkedValue) &&
          parsedLinkedValue.some((val: any) => rec.id === val)
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

  return isInSearchSchema ? (
    <LinkRecordInputOptimizedSearch
      value={linkedValue}
      field={field}
      airtableMeta={airtableMeta}
      disabled={disabled}
      control={control}
      error={error}
      handleChange={handleChange}
      filterOptions={filterOptions}
      linkedRecords={linkedRecords}
      setLinkedRecords={setLinkedRecords}
      selectedChoices={selectedChoices}
      indexId={IndexTable[field?.foreignTableId]}
    />
  ) : (
    <LinkRecordInputDefault
      value={linkedValue}
      field={field}
      airtableMeta={airtableMeta}
      disabled={disabled}
      control={control}
      error={error}
      handleChange={handleChange}
      filterOptions={filterOptions}
      linkedRecords={linkedRecords}
      setLinkedRecords={setLinkedRecords}
      selectedChoices={selectedChoices}
    />
  )
}

function LinkRecordInputOptimizedSearch({
  value: linkedValue,
  field,
  airtableMeta,
  disabled,
  control,
  error,
  handleChange,
  selectedChoices,
  filterOptions,
  linkedRecords,
  setLinkedRecords,
  indexId,
}: any) {
  const [searchKey, setSearchKey] = useState<string>('')

  const indexName = INDEXES[field?.name]

  const [getDocument] = useLazyQuery(GET_DOCUMENT_OPENSEARCH, {
    context: {
      clientName: 'search',
    },
    onCompleted: (data) => {
      if (data?.docDetails?.data) {
        const { data: docData } = data.docDetails
        const { id, name } = docData
        setLinkedRecords((prev: any[]) =>
          getUniqueRecords([...prev, { id, name }])
        )
      }
    },
  })

  const getUniqueRecords = (records: any[]) => {
    return records.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  }

  useEffect(() => {
    if (linkedValue && linkedValue.length > 0) {
      const docId = linkedValue[0]

      // fetch the URL using basic auth
      getDocument({
        variables: {
          index: indexName,
          docId,
        },
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [search, { loading: searching }] = useLazyQuery(OPTIMIZED_SEARCH)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [loadingError, setLoadingError] = useState<string | undefined>()

  const debouncedSearch = useMemo(
    () =>
      debounce(async (keyword: string) => {
        if (keyword.length < 4) return

        // cancel any pending requests
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        abortControllerRef.current = new AbortController()
        const signal = abortControllerRef.current?.signal

        try {
          setLoadingError(undefined)
          const { data } = await search({
            variables: { keyword, table: indexId },
            context: {
              clientName: 'search',
              fetchOptions: {
                signal,
              },
            },
          })

          const response = data?.optimizedSearch?.data || {}
          const displayKey = response?.displayName || 'name'

          const searchResults = response?.results || []
          setLinkedRecords((prev: any[]) =>
            getUniqueRecords([
              ...prev,
              ...searchResults.map((rec: any) => ({
                id: rec.id,
                name: rec[displayKey],
              })),
            ])
          )
        } catch (error: any) {
          if (error?.name !== 'AbortError') {
            logError(error)
            setLoadingError(error?.message ?? 'Error loading records')
          }
        }
      }, 500),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  )

  const settingLinkedData = searching || !airtableMeta

  const handleSearch = useCallback(
    (event: SyntheticEvent<Element, Event>, value: string) => {
      setSearchKey(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  return (
    <Controller
      name={field.name}
      defaultValue={linkedValue}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <>
          {field.helper && (
            <InputLabel>
              <HelperText field={field} error={error || loadingError} />
            </InputLabel>
          )}
          <Autocomplete
            noOptionsText="Type to search"
            multiple={field.relationship === 'many'}
            disablePortal
            filterOptions={filterOptions}
            disabled={disabled}
            loading={settingLinkedData}
            loadingText={
              <div className="flex text-xs">
                <LoadingIcon /> Loading {field.alias || field.name} records
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
            inputValue={searchKey}
            onInputChange={handleSearch}
            getOptionLabel={(option) => option?.name || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                value={searchKey}
                placeholder={`Search ${field?.alias || field?.name}`}
                label={<Label field={field} error={error} />}
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
            <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
              This field is required
            </FormHelperText>
          )}
        </>
      )}
    />
  )
}

function LinkRecordInputDefault({
  value: linkedValue,
  field,
  airtableMeta,
  disabled,
  control,
  error,
  selectedChoices,
  filterOptions,
  linkedRecords,
  handleChange,
  setLinkedRecords,
}: any) {
  const [gettingLinkedRecords, setLoading] = useState(false)
  const [loadingError, setLoadingError] = useState(null)

  const settingLinkedData = gettingLinkedRecords || !airtableMeta
  const { member } = useMember()

  const getTableFromName = () => {
    const tableId = field.foreignTableId
    const table = airtableMeta?.[tableId]

    return table
  }

  const { getLinkedData } = useForeignKeyDataHandler()

  useEffect(() => {
    if (airtableMeta && member) {
      const table = getTableFromName()
      setLoading(true)
      if (table) {
        setLoadingError(null)
        getLinkedData({ ...table, fieldId: field.id })
          .then((options) => {
            setLinkedRecords(options)
          })
          .catch(setLoadingError)
          .finally(() => {
            setLoading(false)
          })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta, member])

  const defaultValue = linkedValue?.id ?? linkedValue

  return (
    <Controller
      name={field.name}
      defaultValue={defaultValue}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <>
          {field.helper && (
            <InputLabel>
              <HelperText field={field} error={error || loadingError} />
            </InputLabel>
          )}
          <Autocomplete
            multiple={field.relationship === 'many'}
            disablePortal
            filterOptions={filterOptions}
            disabled={disabled}
            loading={settingLinkedData}
            loadingText={
              <div className="flex text-xs">
                <LoadingIcon /> Loading {field.alias || field.name} records
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
                label={<Label field={field} error={error} />}
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
            <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
              This field is required
            </FormHelperText>
          )}
        </>
      )}
    />
  )
}

function DateInputField({
  value: dateValue,
  field,
  saveInput,
  disabled,
  control,
  error,
}: Form) {
  const [value, setValue] = useState<Date | null>(null)
  const [blockedDates, setBlockedDates] = useState<string[]>([])

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

  const checkLogisticsDateLimit = async () => {
    const currentDate = dayjs().format('YYYY-MM-DD')
    const today = dayjs().startOf('day')
    const startOfYear = dayjs().startOf('year')

    const log_tasks = await airtableFetch(
      `logisticsTasks/list?filterByFormula=AND(OR(IS_SAME({Due date}, "${currentDate}"), IS_AFTER({Due date}, "${currentDate}")), OR({Status}="Scheduled", {Status}="Assigned"))&fields[]=Status&fields[]=Due date`
    )

    const pastDatesToBlock = []
    let currentDateIterator = dayjs(startOfYear)

    while (currentDateIterator.isBefore(today)) {
      pastDatesToBlock.push(currentDateIterator.format('YYYY-MM-DD'))
      currentDateIterator = currentDateIterator.add(1, 'day')
    }

    const taskCountByDate = log_tasks.reduce((acc: any[], task: any) => {
      const dueDate = task['Due date']
      const existingEntry = acc.find((item) => item.date === dueDate)

      if (existingEntry) {
        existingEntry.task_count += 1
      } else {
        acc.push({ date: dueDate, task_count: 1 })
      }

      return acc
    }, [])

    const logisticsDatesToBlock = taskCountByDate
      .filter((item: any) => item.task_count > 20)
      .map((item: any) => item.date)

    const datesToBlock = [
      ...new Set([...pastDatesToBlock, ...logisticsDatesToBlock]),
    ]

    setBlockedDates(datesToBlock)
  }

  const shouldDisableDate = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD')

    return blockedDates.includes(formattedDate)
  }

  useEffect(() => {
    if (field) {
      const validParentTableIds = ['tbl1swHWo6AtNfLQk', 'tblJmoQGSS2vl8u9g']

      const checkLogisticsDueDate =
        validParentTableIds.includes(field.parentTableId) &&
        field.name.toLowerCase() === 'due date'

      if (checkLogisticsDueDate) {
        checkLogisticsDateLimit()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  return (
    <Box
      component="form"
      className={error?.message ? `${styles.datefieldError}` : `mx-0 mt-2 mb-4`}
      noValidate
      autoComplete="off"
    >
      <Controller
        name={field.name}
        control={control}
        defaultValue={dateValue}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <>
            {field.helper && <HelperText field={field} error={error} />}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {field.isDateTime ? (
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label={<Label field={field} error={error} />}
                  inputFormat="dd/MM/yyyy HH:mm"
                  disabled={disabled}
                  value={value}
                  onChange={(newValue: Date | null) => {
                    if (newValue) {
                      handleChange(newValue)
                      onChange(newValue)
                    }
                  }}
                  shouldDisableDate={shouldDisableDate}
                />
              ) : (
                <MobileDatePicker
                  label={<Label field={field} error={error} />}
                  inputFormat="dd/MM/yyyy"
                  disabled={disabled}
                  value={value}
                  onChange={(newValue: Date | null) => {
                    if (newValue) {
                      handleChange(newValue)
                      onChange(newValue)
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  shouldDisableDate={shouldDisableDate}
                />
              )}
              {error && (
                <FormHelperText className="mb-4 text-left font-rubik font-medium text-red-100">
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

function LoaderOption({ field, airtableMeta }: any) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={[]}
      sx={{ marginBottom: 2 }}
      renderInput={(params) => (
        <TextField {...params} label={<Label field={field} />} />
      )}
      loading={!airtableMeta}
      loadingText={
        <div className="flex text-xs">
          <LoadingIcon /> Loading options
        </div>
      }
    />
  )
}

export default WorkflowFormsFields
