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
import {
  GLOBAL_SEARCH,
  OPTIMIZED_SEARCH,
  GET_DOCUMENT_OPENSEARCH,
} from 'src/gql/search'
import { INDEXES } from 'src/modules/workflows/utils'
import { useMember } from 'src/context/member'
import styles from './styles.component.css'

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
  template,
  airtableMeta,
  saveInput,
}: Form) {
  const isMemberField =
    field.name === 'Member' ||
    field.name === 'member' ||
    field.name === 'Members'
  const isWorkflowForm =
    field.name !== 'Case ID' && !isMemberField && template?.workflowId
  const isNormalForm = !isMemberField && !template?.workflowId
  switch (field.type) {
    case 'foreignKey':
      if (isWorkflowForm || isNormalForm) {
        return (
          <LinkRecordInput
            value={value}
            template={template}
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
    case 'collaborator':
      return (
        <CollaboratorInput
          value={value}
          template={template}
          disabled={disabled}
          field={field}
          airtableMeta={airtableMeta}
          saveInput={saveInput}
          control={control}
          error={error}
        />
      )

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
    default:
      return <></>
  }
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
    if (
      airtableMeta[field.parentTableId]?.fields[field.id].type !== 'checkbox' &&
      airtableMeta[field.parentTableId]?.fields[field.id].options?.choices
        .length > 2
    ) {
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
    saveInput(field.name, newValue)
  }
  const optionsData = airtableMeta
    ? airtableMeta[field.parentTableId]?.fields[field.id].options?.choices
    : []

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
          options={optionsData.map((opt) => opt.name)}
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
  useEffect(() => {
    if (value) {
      setOption(value)
    } else {
      setOption(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const optionsData = () => {
    let fieldOptions = []
    if (field.type === 'checkbox') {
      fieldOptions = [
        {
          name: true,
        },
        {
          name: false,
        },
      ]
    } else {
      fieldOptions = airtableMeta
        ? airtableMeta[field.parentTableId]?.fields[field.id].options?.choices
        : []
    }

    return fieldOptions
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setOption(event.target.value)

    if (field.type === 'checkbox') {
      saveInput(field.name, event.target.value === 'true')
    } else {
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
            <FormControl className="m-0 mt-2 min-w-[90%]" component="fieldset">
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
                {(optionsData() || []).map((choice: any) => (
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    saveInput(field.name, event.target.value)
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
        render={({ field: { onChange, value: val } }) => (
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
              defaultValue={value}
              disabled={disabled}
              value={val ?? ''}
              onBlur={() => setShouldShrink(false)}
              onFocus={() => setShouldShrink(true)}
              InputLabelProps={{
                shrink: value || shouldShrink,
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
                This field is required
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
  template,
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
    tblglBRVOue24usUH: 'tblglBRVOue24usUH', // medication
    tblm1g2udT6J8TOzt: 'tblU94ZnFmMT7S0o0', // Providers
    tblU94ZnFmMT7S0o0: 'tblU94ZnFmMT7S0o0', // Facilities from Provider base
    tblPpf5F81JypdC9k: 'tblPpf5F81JypdC9k', // Specialists from Provider Base
  }

  const isInSearchSchema = Object.keys(IndexTable).includes(
    field?.foreignTableId
  )

  const dataSave = (onChange: (val: any) => any, nameId: any, name: any) => {
    onChange(nameId)
    setSelectedChoices(name)
    saveInput(field.name, nameId)
  }
  const handleChange = (onChange: (val: any) => any, value: any) => {
    if (value) {
      if (Array.isArray(value)) {
        const recordId = value.map((rec) => rec.id)
        dataSave(onChange, recordId, value)
      } else {
        dataSave(onChange, [value.id], value)
      }
    } else {
      dataSave(onChange, value, value)
    }
  }

  useEffect(() => {
    if (linkedValue && linkedRecords.length > 0) {
      const recordValue = linkedRecords.filter(
        (rec: any) =>
          Array.isArray(linkedValue) &&
          linkedValue.some((val: any) => rec.id === val)
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
      template={template}
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
      template={template}
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

  const [search, { loading: searching }] = useLazyQuery(OPTIMIZED_SEARCH, {
    context: {
      clientName: 'search',
    },
    onCompleted: (data) => {
      const response = data.optimizedSearch.data || {}
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
    },
  })

  const settingLinkedData = searching || !airtableMeta

  const debouncedSearch = debounce((keyword: string) => {
    if (keyword.length < 3) return
    search({ variables: { keyword, table: indexId } })
  }, 500)

  const handleSearch = (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setSearchKey(value)
    debouncedSearch(value)
  }

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
              <HelperText field={field} error={error} />
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
  const [getLinkedRecords, { data, loading: gettingLinkedRecords }] =
    useLazyQuery(GLOBAL_SEARCH)
  const settingLinkedData = gettingLinkedRecords || !airtableMeta
  const { member } = useMember()

  useEffect(() => {
    if (data) {
      const response = data.globalSearch.data || []
      const displayFields: any[] = []
      response.forEach((fl: any) => {
        const loadedMeta =
          fl.fields[airtableMeta[field.foreignTableId].primaryFieldName]
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
      'Antara ID (from Member)',
    ]
    let presentKey = ''
    const metaFields = airtableMeta[field.foreignTableId]?.fields
    if (metaFields) {
      Object.keys(metaFields).forEach((ky) => {
        validKeys.forEach((vl) => {
          if (metaFields[ky].name === vl) {
            presentKey = vl
          }
        })
      })
    }

    return presentKey
  }

  useEffect(() => {
    if (airtableMeta) {
      let airtableField = airtableMeta[field.foreignTableId]?.primaryFieldName
      let searchParam = ''
      if (
        field.foreignTableId === 'tblHs6JxFnMGAjNNC' &&
        field.name === 'Consulting Clinician'
      ) {
        airtableField = 'Team'
        searchParam = 'Doctor'
      }
      getLinkedRecords({
        variables: {
          table: field.foreignTableId,
          field: airtableField,
          searchParam,
          antaraIdKey: checkAntaraIdKey(),
          antaraIdValue: checkAntaraIdKey() ? member?.antaraId || '' : '',
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta])

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
              <HelperText field={field} error={error} />
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

function CollaboratorInput({
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
  const [getLinkedRecords, { data, loading: gettingLinkedRecords }] =
    useLazyQuery(GLOBAL_SEARCH)
  const settingLinkedData = gettingLinkedRecords || !airtableMeta
  useEffect(() => {
    if (data) {
      const response = data.globalSearch.data
      const loadedMeta = response.map((res) => {
        return {
          email: res.fields.Email,
          name: res.fields.Name,
        }
      })

      setLinkedRecords(loadedMeta)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (airtableMeta) {
      const airtableField =
        airtableMeta[field.foreignTableId]?.fields?.primaryFieldName

      getLinkedRecords({
        variables: {
          table: field.foreignTableId,
          field: airtableField,
          searchParam: '',
          antaraIdKey: '',
          antaraIdValue: '',
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta])

  useEffect(() => {
    if (linkedValue && linkedRecords.length > 0) {
      const recordValue = linkedRecords.filter(
        (rec: any) => rec.name === linkedValue.name
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
    if (value) {
      onChange(value)
      saveInput(field.name, value)
    }
  }

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
              <HelperText field={field} error={error} />
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
