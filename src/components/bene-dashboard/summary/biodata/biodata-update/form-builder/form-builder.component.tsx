import React, { useState } from 'react'
import { Paper, Button, Stack, IconButton } from '@mui/material'
import { Trash2 } from 'react-feather'
import {
  FormTextField,
  FormDatePicker,
  FormSelectField,
  FormMultipleSelect,
  FormPlacesField,
  FormAutoCompleteField,
  FormFieldType,
  FormMemberSearchField,
} from './form-elements.component'
import styles from './form-builder.component.css'

type FormBuilderProps = {
  formFields: Array<FormFieldType>
  errors: any
  setFieldValue: (name: string, v: any) => any
  values: any
  setIsEdited: (value: boolean) => void
}

type TextFieldType = 'text' | 'textarea' | 'number'

function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean
): number {
  let l = array.length
  // eslint-disable-next-line no-plusplus
  while (l--) {
    if (predicate(array[l], l, array)) return l
  }
  return -1
}

/**
 * For a given form elements configuration and a reference initial values object containing values
 * compose and render a form.
 */
function FormBuilder(props: FormBuilderProps) {
  const { formFields, errors, values, setFieldValue, setIsEdited } = props

  const [fields, setFields] = useState<FormFieldType[]>(formFields)

  // safely get nested values
  const get = (p: any[], o: any, d: any = null) =>
    p.reduce((xs: any, x: any) => (xs && xs[x] ? xs[x] : d), o)

  const readFromFormState = (field: FormFieldType) => {
    const { stateKey, dynamic, index, dataIndex } = field
    if (dynamic) {
      const newItem = (values[stateKey] || []).find(
        (item: any) => item.priority === index && !item.deleted
      )
      return newItem ? newItem[dataIndex] : ''
    }
    return values[stateKey][dataIndex]
  }

  const markAsDeleted = (field: FormFieldType) => {
    const { stateKey, editable, index } = field
    setIsEdited(true)
    if (editable) {
      const newItems = values[stateKey].map((item: any) => {
        if (item.priority === index) {
          return { ...item, toDelete: true }
        }
        return item
      })
      setFieldValue(stateKey, newItems) // update form state
    }
  }

  const writeToFormState = (field: FormFieldType) => (value: any) => {
    const { stateKey, dynamic, index, dataIndex } = field
    if (dynamic) {
      const item = values[stateKey].find((i: any) => i.priority === index)
      if (item) {
        item[dataIndex] = value
      } else {
        values[stateKey].push({ [dataIndex]: value, priority: index })
      }
      values[stateKey].sort((a: any, b: any) => a.priority - b.priority)
    } else {
      values[stateKey][dataIndex] = value
    }
    setFieldValue(stateKey, values[stateKey])
    setIsEdited(true)
  }

  const readErrors = (field: FormFieldType) => {
    const { stateKey, dataIndex, dynamic, index } = field

    if (dynamic) {
      // read the error associated with the index of the field
      const elemIndex = get([stateKey], values, []).findIndex(
        (v: any) => v.priority === index
      )

      if (elemIndex !== -1) {
        const dynErrors = get([stateKey, elemIndex], errors)
          ? get([stateKey, elemIndex], errors)
          : null

        return dynErrors ? dynErrors[dataIndex] : null
      }
    }

    const stateErrors = errors[stateKey] || {}

    return stateErrors[dataIndex]
  }

  // create a members search field
  const createSearchField = (field: FormFieldType) => {
    const { label, id, dataIndex, required = false } = field

    return (
      <FormMemberSearchField
        label={label || dataIndex}
        id={id}
        initialValue={readFromFormState(field)}
        handleChange={writeToFormState(field)}
        required={required}
        name={dataIndex}
        errors={readErrors(field)}
      />
    )
  }

  // create a text field
  const createTextField = (
    field: FormFieldType,
    type: TextFieldType = 'text'
  ) => {
    const { label, id, dataIndex, required = false, helperText } = field

    return (
      <FormTextField
        label={label || dataIndex}
        id={id}
        value={readFromFormState(field)}
        handleChange={writeToFormState(field)}
        required={required}
        name={dataIndex}
        errors={readErrors(field)}
        textarea={type === 'textarea'}
        number={type === 'number'}
        helperText={helperText}
      />
    )
  }

  // create a date field
  const createDateField = ({
    label,
    dataIndex,
    readOnly = false,
    stateKey,
    id,
  }: FormFieldType) => {
    return (
      <FormDatePicker
        date={readFromFormState({ dataIndex, stateKey } as FormFieldType)}
        label={label || dataIndex}
        handleChange={writeToFormState({
          dataIndex,
          stateKey,
        } as FormFieldType)}
        readOnly={readOnly}
        name={dataIndex}
        id={id}
      />
    )
  }

  // a select field
  const createSelectField = (field: FormFieldType) => {
    const {
      label,
      dataIndex,
      options,
      id,
      multiple = false,
      fullWidth = true,
    } = field
    const initialValue = readFromFormState(field)

    return multiple ? (
      <FormMultipleSelect
        value={initialValue || []}
        label={label || dataIndex}
        options={options}
        id={id}
        name={dataIndex}
        handleChange={writeToFormState(field)}
        errors={readErrors(field)}
      />
    ) : (
      <FormSelectField
        value={initialValue}
        label={label || dataIndex}
        options={options}
        handleChange={writeToFormState(field)}
        id={id}
        name={dataIndex}
        fullWidth={fullWidth}
        errors={readErrors(field)}
      />
    )
  }

  const createAutoCompleteField = (field: FormFieldType) => {
    const { dataIndex, label, options, id } = field
    const initialValue = readFromFormState(field)

    return (
      <FormAutoCompleteField
        name={dataIndex}
        label={label}
        value={initialValue}
        handleChange={writeToFormState(field)}
        options={options}
        id={id}
        errors={readErrors(field)}
      />
    )
  }

  const findPath = (id: string, list: any[]) => {
    const path: any[] = []
    const find = (elemId: string, elemList: any[]) => {
      for (let i = 0; i < elemList.length; i += 1) {
        const item = elemList[i]
        if (item.id === elemId) {
          path.push(i)
          return true
        }
        if (item.items) {
          path.push(i)
          if (find(elemId, item.items)) {
            return true
          }
          path.pop()
        }
      }
      return false
    }
    find(id, list)
    return path
  }

  const insertAfter = (path: any[], item: any, list: any[]) => {
    if (path.length === 0) {
      return list
    }
    const [index, ...rest] = path
    const itemAtIndex = list[index]
    if (rest.length === 0) {
      const newList = [...list]
      newList.splice(index + 1, 0, item)
      return newList
    }

    const { items } = itemAtIndex
    if (items) {
      const newItems: any = insertAfter(rest, item, items)

      return [
        ...list.slice(0, index),
        {
          ...itemAtIndex,
          items: newItems,
        },
        ...list.slice(index + 1),
      ]
    }
    return [...list.slice(0, index + 1), item, ...list.slice(index + 1)]
  }

  const getItemAtPath = (path: any[], list: any[]): any => {
    if (path.length === 0) {
      return list
    }
    const [index, ...rest] = path
    const itemAtIndex = list[index]
    if (rest.length === 0) {
      return itemAtIndex
    }
    const { items } = itemAtIndex
    if (items) {
      return getItemAtPath(rest, items)
    }
    return itemAtIndex
  }

  const incrementIndex = (item: any) => {
    const { items, stateKey } = item
    const nextIndexValues = values[stateKey]
    let index = 0

    if (Array.isArray(nextIndexValues)) {
      index = nextIndexValues.length
    }

    const newIndex = index + 1
    const newId = `id-${newIndex}`

    return {
      ...item,
      id: newId,
      index: newIndex,
      ...(items && { items: items.map((i: any) => incrementIndex(i)) }),
    }
  }

  const hideShowButton = (path: any[], list: any[]) => {
    const item = getItemAtPath(path, list)
    item.showAddButton = false
  }

  /* eslint-disable no-param-reassign */
  const removeItemAtPath = (path: any[], list: any[]): any => {
    if (path.length === 0) {
      return list
    }

    const [index, ...rest] = path
    const itemAtIndex: any = list[index]
    if (rest.length === 0) {
      list.splice(index, 1)

      if (path.length > 1) {
        list.forEach((l) => {
          l.showAddButton = false
        })
        list[list.length - 1].showAddButton = true
      } else {
        const lastIndex = findLastIndex(
          list,
          (item) => item.stateKey === itemAtIndex.stateKey
        )
        list.map((l) =>
          l.stateKey === itemAtIndex.stateKey
            ? { ...l, showAddButton: false }
            : l
        )
        if (lastIndex !== -1) {
          list[lastIndex].showAddButton = true
        }
      }
      return list
    }
    const { items } = itemAtIndex
    if (items) {
      return removeItemAtPath(rest, items)
    }
    return itemAtIndex
  }
  /* eslint-enable no-param-reassign */

  const countFields = (field: FormFieldType) => {
    const { stateKey } = field
    const items = fields.filter(
      (item: any) =>
        item.stateKey === stateKey &&
        (item.type === 'group' || item.type === 'row')
    )

    if (items.length === 0) {
      const groupFields = fields.filter((item: any) => item.type === 'group')
      const groupItems = groupFields.map((item: any) => item.items).flat()
      const groupItemsWithStateKey = groupItems.filter(
        (item: any) =>
          item.stateKey === stateKey &&
          (item.type === 'group' || item.type === 'row')
      )
      return groupItemsWithStateKey.length
    }
    return items.length
  }

  const createPlacesField = (field: FormFieldType) => {
    const { id, label, dataIndex } = field
    return (
      <FormPlacesField
        id={id}
        label={label || dataIndex}
        handleChange={writeToFormState(field)}
        name={dataIndex}
        initialValue={readFromFormState(field) || null}
      />
    )
  }

  const removeElement = (field: FormFieldType) => {
    const { id } = field

    const newFields = [...fields]
    const path = findPath(id, newFields)
    const item = getItemAtPath(path, newFields)
    markAsDeleted(item)
    removeItemAtPath(path, newFields)
    setFields(newFields)
  }

  const showRemoveButton = (field: FormFieldType) =>
    field?.editable && countFields(field) > 1

  const createGroupedField = (field: FormFieldType) => {
    const { label, items } = field

    return (
      <div className={styles.groupContainer}>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <p className={styles.groupLabel}>{label}</p>
          {showRemoveButton(field) && (
            <IconButton
              onClick={() => removeElement(field)}
              aria-label={`Remove ${label}`}
              color="error"
            >
              <Trash2 />
            </IconButton>
          )}
        </Stack>

        {
          // eslint-disable-next-line no-use-before-define
          items?.map(createFormField)
        }
      </div>
    )
  }

  const createRowField = (field: FormFieldType) => {
    const { items } = field

    return (
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div className={styles.formInputsRow}>
          {
            // eslint-disable-next-line no-use-before-define
            items?.map(createFormField)
          }
        </div>
        {showRemoveButton(field) && (
          <IconButton
            onClick={() => removeElement(field)}
            aria-label={`Remove ${field.stateKey}`}
            color="error"
          >
            <Trash2 />
          </IconButton>
        )}
      </Stack>
    )
  }

  /** Create any field */
  const createFormField = (field: FormFieldType) => {
    const { type, id } = field

    let composedField

    const addElement = () => {
      const newFields = [...fields]
      const path = findPath(id, newFields)
      const itemAtPath = getItemAtPath(path, newFields)
      const newField = incrementIndex(itemAtPath)
      const newList = insertAfter(path, newField, newFields)
      hideShowButton(path, newList)

      if (newField.stateKey && newField.items) {
        newField.items.forEach((item: any) => {
          writeToFormState(item)('')
        })
      }

      setFields(newList)
    }

    // parse the type and render the build the appropriate form type and the state update callback
    switch (type) {
      case 'date':
        composedField = createDateField(field)
        break
      case 'select':
        composedField = createSelectField(field)
        break
      case 'group':
        composedField = createGroupedField(field)
        break
      case 'row':
        composedField = createRowField(field)
        break
      case 'places':
        composedField = createPlacesField(field)
        break
      case 'autocomplete':
        composedField = createAutoCompleteField(field)
        break
      case 'search':
        composedField = createSearchField(field)
        break
      default:
        // assume a text field
        composedField = createTextField(field, type as TextFieldType)
        break
    }

    // check for editable fields
    if (field?.editable) {
      composedField = (
        <>
          {composedField}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent={field?.showAddButton ? 'space-between' : 'flex-end'}
          >
            {field?.showAddButton && (
              <Button
                variant="text"
                sx={{ textTransform: 'none' }}
                onClick={addElement}
              >
                + {field?.addButtonText || 'Add another'}
              </Button>
            )}
          </Stack>
        </>
      )
    }

    return composedField
  }

  /**
   * Read through the form field, for each config entry, render the type of form field items with it's initial
   * value from initial values
   */
  const collectFormFields = () => {
    const collectedFields: Array<any> = []

    for (const field of fields) {
      collectedFields.push(createFormField(field))
    }

    return collectedFields
  }

  return (
    <Paper
      component="form"
      noValidate
      autoComplete="false"
      elevation={2}
      sx={{ boxShadow: 'none', p: 2, pt: 0, position: 'relative' }}
    >
      <div className={styles.form}>
        {collectFormFields().map((field, id) => (
          <div
            key={id}
            className={styles.formInputSpaced}
            data-testid="form-field"
          >
            {field}
          </div>
        ))}
      </div>
    </Paper>
  )
}

export default FormBuilder
