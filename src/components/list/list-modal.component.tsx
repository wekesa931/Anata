/* eslint-disable radix */
import { Label, Text } from '@airtable/blocks/ui'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Tooltip } from '@mui/material'
import Modal from 'src/components/modals'
import EditIcon from 'src/assets/img/icons/edit.svg'
import AirtableField from 'src/types/airtable-field'
import FormField from 'src/components/forms/formik-fields'
import styles from './list.component.css'

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
}: any) {
  return (
    <div className="full-width d-flex flex-align-center flex-justify-space-between">
      <h3>{modalTitle}</h3>
      {formDisabled && (
        <div className="d-flex">
          {actions && actions(() => setFormDisabled(false))}
          {editable && (
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

  const fieldsToEdit = () => {
    if (editableFields) {
      return editableFields?.map((field, index) => (
        <div key={index} className="d-flex flex-direction-column">
          <Label htmlFor={field.name}>{field.name}</Label>
          <FormField {...field} disabled={formDisabled} />
        </div>
      ))
    }
    return activeItem.data.map((field: any, index: number) => {
      return !field.calculated ? (
        <div key={index} className="d-flex flex-direction-column">
          <Label htmlFor={field.name}>{field.name}</Label>
          <FormField {...field} disabled={formDisabled} />
        </div>
      ) : null
    })
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

  const handleSubmit = async (values: any) => {
    if (onEdit) {
      const task = { id: activeItem.id || activeItem?.data?.id, fields: values }
      await onEdit(task)
      setFormDisabled(true)
      setModalOpen(false)
    }
  }

  const getInitialValues = () => {
    if (editableFields) {
      return editableFields
        .map((f) => f.name)
        .reduce(
          (acc, curV) => ({
            ...acc,
            [curV]: '',
          }),
          {}
        )
    }
    return (
      activeItem?.data?.filter &&
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
        />
      }
    >
      {modalOpen}
      {activeItem.data &&
        (editable ? (
          <Formik initialValues={getInitialValues()} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form key="list-edit-form">
                {fieldsToEdit()}
                {!formDisabled && (
                  <div className="d-flex margin-top-8">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    {!isSubmitting && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setFormDisabled(true)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        ) : (
          Object.keys(activeItem.data).map((info, i) => {
            return (
              !isNotNull(activeItem.data[info]) && (
                <div key={info} style={{ margin: '16px 0' }}>
                  <Label className="text-capitalize" htmlFor={`input${i}`}>
                    {info}
                  </Label>
                  <Text
                    variant="paragraph"
                    id={`input${i}`}
                    border="1px solid whitesmoke"
                    backgroundColor="whitesmoke"
                    padding="8px"
                    borderRadius="4px"
                    className={styles.modalPara}
                  >
                    {format(activeItem.data[info])}
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
