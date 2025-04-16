/* eslint-disable radix */
import { Text } from '@airtable/blocks/ui'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Form } from 'formik'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Button, FormLabel, Tooltip } from '@mui/material'
import Modal from 'src/components/modals'
import EditIcon from 'src/assets/img/icons/edit.svg'
import AirtableField from 'src/types/airtable-field'
import FormField from 'src/components/forms/formik-fields'
import parse from 'html-react-parser'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'
import { diff } from 'deep-object-diff'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './list.module.css'
import PrimaryForm from '../forms/primary-form'
import PrimaryButton from '../buttons/primary'
import { processMarkdown } from './utils'

export type TOpenItem = {
  name: string
  id: string
  data: AirtableField[] | any
}

type ListModalProps = {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  modalTitle?: string
  openItem?: TOpenItem
  editable?: boolean
  onEdit?: (values: { id: string; fields: any }) => Promise<any>
  actions?: (callback: any) => JSX.Element | null
  editableFields?: AirtableField[]
  multiple?: boolean
  items?: any[]
  itemCallback?: (item: TOpenItem) => void
  showEditIcon?: boolean
}

function ModalHeader({
  modalTitle,
  formDisabled,
  actions,
  setFormDisabled,
  editable,
  multiple,
  selectPreviousItem,
  selectNextItem,
  showEditIcon = true,
}: any) {
  return (
    <div className="full-width d-flex flex-align-center flex-justify-space-between">
      <h3>{modalTitle}</h3>
      {formDisabled && (
        <div className="d-flex">
          {actions && actions(() => setFormDisabled(false))}
          {editable && showEditIcon && (
            <button
              className="btn-icon"
              onClick={() => setFormDisabled(false)}
              data-testid="modal-edit-btn"
            >
              <Tooltip title="Update">
                <EditIcon />
              </Tooltip>
            </button>
          )}
        </div>
      )}
      {multiple && (
        <div className="d-flex">
          <button
            className="btn-icon"
            onClick={() => selectPreviousItem()}
            data-testid="modal-prev-btn"
          >
            <Tooltip title="Previous">
              <ChevronLeft />
            </Tooltip>
          </button>
          <button
            className="btn-icon"
            onClick={() => selectNextItem()}
            data-testid="modal-next-btn"
          >
            <Tooltip title="Next">
              <ChevronRight />
            </Tooltip>
          </button>
        </div>
      )}
    </div>
  )
}

function ListModal(props: ListModalProps) {
  const {
    modalOpen,
    setModalOpen,
    modalTitle,
    openItem,
    editable,
    onEdit,
    actions,
    editableFields,
    multiple = false,
    items = [],
    itemCallback,
    showEditIcon,
  } = props
  const getActiveItem = () => {
    if (multiple && items.length > 0) {
      return items[0]
    }

    return openItem
  }
  const [activeItem, setActiveItem] = useState<any>(getActiveItem())
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const selectPreviousItem = () => {
    const currentItems = items || []
    const previousIndex = currentIndex - 1
    if (previousIndex >= 0) {
      setActiveItem(currentItems[previousIndex])
      setCurrentIndex(previousIndex)
    }
  }

  const selectNextItem = () => {
    const currentItems = items || []
    const nextIndex = currentIndex + 1
    if (nextIndex < currentItems.length) {
      setActiveItem(currentItems[nextIndex])
      setCurrentIndex(nextIndex)
    }
  }

  useEffect(() => {
    if (itemCallback) {
      itemCallback(activeItem)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem])
  const [formDisabled, setFormDisabled] = useState<boolean>(true)
  const displayObject = (obj: any) => {
    if (obj) {
      if (Array.isArray(obj)) {
        return obj.join(',')
      }
      return Object.keys(obj).map((key) => `${key}: ${obj[key]}`)
    }
    return null
  }

  const displayString = (str: string) => {
    if (Date.parse(str) && Number.isNaN(parseInt(str))) {
      return dayjs(str).format('DD MMM YYYY HH:mm')
    }
    return str
  }

  const format = (data: any) => {
    switch (typeof data) {
      case 'object':
        return displayObject(data)
      case 'string':
        return displayString(data)
      default:
        return data
    }
  }

  const isNotNull = (data: any) => {
    if (data) {
      if (Array.isArray(data) && data.length === 0) {
        return true
      }
      return false
    }
    return true
  }

  const { notify } = useNotifications()

  const initialValues =
    Array.isArray(activeItem?.data) &&
    activeItem?.data
      ?.filter((field: any) => !field.calculated)
      .reduce(
        (obj: any, field: any) => ({
          [field.name]: Array.isArray(field.value)
            ? field.value.join()
            : field.value,
          ...obj,
        }),
        {}
      )

  const handleSubmit = async (values: any) => {
    if (onEdit) {
      try {
        const task = {
          id: activeItem.id || activeItem?.data?.id,
          fields: diff(initialValues, values),
        }
        await onEdit(task)
        setFormDisabled(true)
        setModalOpen(false)
        notify('Updated successfully')
      } catch (error: any) {
        logError(error)
        notify(error?.message || 'Something went wrong')
      }
    }
  }

  function FormElement({ initial }: any) {
    return (
      <PrimaryForm initialValues={initial} handleSubmit={handleSubmit}>
        {({ isSubmitting, values }) => {
          const currentActiveFields = editableFields || activeItem.data
          return (
            <Form key="list-edit-form">
              {currentActiveFields.map(
                (field: AirtableField, index: number) => {
                  let showField = true
                  if (field.condition) {
                    showField = field.condition(values)
                  }
                  return !field.calculated && showField ? (
                    <div key={index} className="d-flex flex-direction-column">
                      <FormLabel>{field.name}</FormLabel>
                      {field.helperText && (
                        <p className="mb-2.5 whitespace-pre-line font-rubik text-xs text-dark-blue-100">
                          {parse(field.helperText)}
                        </p>
                      )}
                      <FormField
                        {...field}
                        disabled={field.disabled || formDisabled}
                      />
                    </div>
                  ) : null
                }
              )}
              {!formDisabled && (
                <div className="mt-2 flex flex-col gap-2">
                  <Button
                    fullWidth
                    className="border border-disabled-grey bg-disabled-grey text-white"
                    onClick={() => setFormDisabled(true)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <PrimaryButton
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </PrimaryButton>
                </div>
              )}
            </Form>
          )
        }}
      </PrimaryForm>
    )
  }

  return modalOpen ? (
    <Modal
      open={modalOpen}
      setModalOpen={setModalOpen}
      heading={
        <ModalHeader
          modalTitle={modalTitle || activeItem?.name}
          formDisabled={formDisabled}
          actions={actions}
          setFormDisabled={setFormDisabled}
          editable={editable}
          multiple={multiple && items?.length >= 1}
          selectNextItem={selectNextItem}
          selectPreviousItem={selectPreviousItem}
          showEditIcon={showEditIcon}
        />
      }
    >
      {activeItem.data &&
        (editable ? (
          <FormElement initial={initialValues} />
        ) : (
          Object.keys(activeItem.data).map((info, i) => {
            return (
              !isNotNull(activeItem.data[info]) && (
                <div key={info} style={{ margin: '16px 0' }}>
                  <FormLabel className="text-capitalize" htmlFor={`input${i}`}>
                    {info}
                  </FormLabel>
                  <Text
                    variant="paragraph"
                    id={`input${i}`}
                    border="1px solid whitesmoke"
                    backgroundColor="whitesmoke"
                    padding="8px"
                    borderRadius="4px"
                    className={styles.modalPara}
                  >
                    {info
                      .toLowerCase()
                      .includes('interaction summary notes') ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {processMarkdown(activeItem.data[info])}
                      </ReactMarkdown>
                    ) : (
                      format(activeItem.data[info])
                    )}
                  </Text>
                </div>
              )
            )
          })
        ))}
    </Modal>
  ) : null
}

export default ListModal
