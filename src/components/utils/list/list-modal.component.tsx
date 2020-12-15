import { Label, Text } from '@airtable/blocks/ui'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Form, Formik } from 'formik'
import { Tooltip } from 'react-tippy'
import dayjs from 'dayjs'
import Modal from '../modals/modal.component'
import EditIcon from '../../../assets/img/icons/edit.svg'
import AirtableField from '../../../types/airtable-field'
import FormField from '../form-field/form-field.component'
import Toasts from '../../../helpers/toast'

type ListModalProps = {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  modalTitle?: string
  openItem: { name: string; id: string; data: AirtableField[] }
  editable?: boolean
  onEdit?: (values: { id: string; fields: any }) => Promise<any>
}

const ListModal = (props: ListModalProps) => {
  const {
    modalOpen,
    setModalOpen,
    modalTitle,
    openItem,
    editable,
    onEdit,
  } = props
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
    if (Date.parse(str)) {
      return dayjs(str).format('DD MMM YYYY HH:mm')
    }
    return str
  }

  const format = (data) => {
    switch (typeof data) {
      case 'object':
        return displayObject(data)
      case 'string':
        return displayString(data)
      default:
        return data
    }
  }

  const isNotNull = (data) => {
    if (data) {
      if (Array.isArray(data) && data.length === 0) {
        return true
      }
      return false
    }
    return true
  }

  const ModalHeader = () => {
    return (
      <div className="full-width d-flex flex-align-center flex-justify-space-between">
        <h3>{modalTitle}</h3>
        {editable && formDisabled && (
          <div className="d-flex">
            <button
              className="btn-icon"
              onClick={() => setFormDisabled(false)}
              data-testid="modal-edit-btn"
            >
              <Tooltip title="Update">
                <EditIcon />
              </Tooltip>
            </button>
          </div>
        )}
      </div>
    )
  }

  const handleSubmit = async (values: any) => {
    if (onEdit) {
      const task = { id: openItem.id, fields: values }
      await onEdit(task)
      setFormDisabled(true)
      setModalOpen(false)
      Toasts.showSuccessNotification()
    }
  }

  const getInitialValues = () => {
    return openItem.data
      .filter((field) => !field.calculated)
      .reduce(
        (obj, field) => ({
          [field.name]: Array.isArray(field.value)
            ? field.value.join()
            : field.value,
          ...obj,
        }),
        {}
      )
  }

  return (
    open && (
      <Modal
        open={modalOpen}
        setModalOpen={setModalOpen}
        heading={<ModalHeader />}
      >
        {modalOpen}
        {openItem.data &&
          (editable ? (
            <Formik initialValues={getInitialValues()} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form key="list-edit-form">
                  {openItem.data.map((field, index) => {
                    return !field.calculated ? (
                      <div key={index} className="d-flex flex-direction-column">
                        <Label htmlFor={field.name}>{field.name}</Label>
                        <FormField {...field} disabled={formDisabled} />
                      </div>
                    ) : null
                  })}
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
            Object.keys(openItem.data).map((info, i) => {
              return (
                !isNotNull(openItem.data[info]) && (
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
                    >
                      {format(openItem.data[info])}
                    </Text>
                  </div>
                )
              )
            })
          ))}
      </Modal>
    )
  )
}

export default ListModal
