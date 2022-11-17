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
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import styles from '../guided-workflows.component.css'
import { Form } from '../workflow-types'
import { GLOBAL_SEARCH } from '../../../../../gql/workflows'

const icon = <Square width={18} height={18} />
const checkedIcon = <CheckSquare width={18} height={18} />

function Pointer() {
  return <span style={{ color: 'var(--dark-blue-70)' }}>&nbsp;*</span>
}

function HelperText({ error, field }: any) {
  return (
    <div>
      <p
        style={{ whiteSpace: 'initial' }}
        className={
          error?.message ? `${styles.fieldNameError}` : `${styles.fieldLabel}`
        }
      >
        {field.alias || field.name}
        {field.required && <Pointer />}
      </p>
      <p
        style={{ marginBottom: field.formId ? '60px' : '' }}
        className={styles.helperText}
      >
        {parse(field.helper)}
      </p>
    </div>
  )
}
function Label({ error, field }: any) {
  return (
    <p
      className={
        error?.message
          ? `${styles.fieldNameError}`
          : `${field.helper ? styles.fieldLabelBlurred : styles.fieldLabel}`
      }
    >
      {field.alias || field.name}
      {field.required && <Pointer />}
    </p>
  )
}
function WorkflowFormsInput({
  value,
  field,
  disabled,
  control,
  error,
  template,
  airtableMeta,
  saveInput,
}: Form) {
  const isMemberField = field.name === 'Member' || field.name === 'member' || field.name === 'Members'
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
              {field.helper && <HelperText field={field} error={error} />}
              <TextField
                {...params}
                label={<Label field={field} error={error} />}
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
    saveInput(field.name, event.target.value)
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
            <FormControl
              className={`${styles.singleSelectView}`}
              component="fieldset"
            >
              {!field.helper && (
                <FormLabel component="legend">
                  <Label field={field} error={error} />
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
                {(optionsData() || []).map((choice) => (
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
            className={`${styles.radioBtn} ${styles.autoComplete}`}
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
            <FormHelperText className={styles.fieldLabelError}>
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
      className={styles.fieldMargin}
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
              value={val}
              onBlur={() => setShouldShrink(false)}
              onFocus={() => setShouldShrink(true)}
              InputLabelProps={{
                shrink: value || shouldShrink,
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
              label={<Label field={field} error={error} />}
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
      className={styles.fieldMargin}
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
                wrapperClassName={`${styles.textField} ${
                  error?.message
                    ? `${styles.textfieldError}`
                    : `${styles.wrapperClassName}`
                } `}
                editorClassName={styles.editorClassName}
              />
            )}
            {disabled && (
              <div className={styles.richTextField}>
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
  template,
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
      const displayFields: any[] = []
      response.forEach((fl: any) => {
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
      let airtableField =
        airtableMeta[field.foreignTableId]?.fields?.primaryFieldName
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
          antaraIdValue: checkAntaraIdKey()
            ? template?.member['Antara ID'] || ''
            : '',
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta])

  useEffect(() => {
    if (linkedValue && linkedRecords.length > 0) {
      const recordValue = linkedRecords.filter((rec: any) =>
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
              <div className={styles.recordLoader}>
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
            <FormHelperText className={styles.fieldLabelError}>
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
            <FormHelperText className={styles.fieldLabelError}>
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
      className={
        error?.message ? `${styles.datefieldError}` : `${styles.fieldMargin}`
      }
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
        <div className={styles.recordLoader}>
          <LoadingIcon /> Loading options
        </div>
      }
    />
  )
}

export default WorkflowFormsInput
