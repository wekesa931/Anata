import { Label, Text } from '@airtable/blocks/ui'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { Tooltip } from 'react-tippy'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Modal from '../modals/modal.component'
import EditIcon from '../../../assets/img/icons/edit.svg'
import AirtableField from '../../../types/airtable-field'
import RemoteSelect from '../remote-select/remote-select.component'

type ListModalProps = {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  modalTitle?: string
  openItem: { name: string; id: string; data: AirtableField[] }
  editable?: boolean
  onEdit?: (values: { id: string; fields: any }) => Promise<any>
}

type CustomFieldProps = AirtableField & {
  disabled: boolean
}

const CustomField = (customField: CustomFieldProps) => {
  const {
    name,
    type,
    disabled,
    options = [],
    lookupUrl,
    lookupFieldNames,
  } = customField
  switch (type) {
    case 'single-select':
      return (
        <Field
          as="select"
          name={name}
          id={name}
          className="form-control"
          disabled={disabled}
        >
          {options &&
            options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
        </Field>
      )
    case 'number':
      return (
        <Field
          name={name}
          id={name}
          type="number"
          className="form-control"
          disabled={disabled}
        />
      )
    case 'text':
      return (
        <Field
          name={name}
          id={name}
          type="text"
          className="form-control"
          disabled={disabled}
        />
      )
    case 'date':
      return (
        <Field
          name={name}
          id={name}
          type="date"
          className="form-control"
          disabled={disabled}
        />
      )
    case 'long-text':
      return (
        <Field
          as="textarea"
          name={name}
          id={name}
          className="form-control"
          disabled={disabled}
        />
      )
    case 'lookup':
      return (
        <Field name={name} className="form-control" disabled={disabled}>
          {({ field, form }) => (
            <RemoteSelect
              lookupUrl={lookupUrl || ''}
              lookupFieldNames={lookupFieldNames}
              field={field}
              form={form}
              prefetch
              disabled={disabled}
            />
          )}
        </Field>
      )
    default:
      return null
  }
}

const ListModal = (props: ListModalProps) => {
  const MySwal = withReactContent(Swal)
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
    if (Array.isArray(obj)) {
      return obj.join(',')
    }
    return Object.keys(obj).map((key) => `${key}: ${obj[key]}`)
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
      MySwal.fire({
        position: 'top-right',
        icon: 'success',
        title: 'Your changes have been saved.',
        showConfirmButton: false,
        timer: 5000,
        toast: true,
      })
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
                  {openItem.data.map((field) => {
                    return !field.calculated ? (
                      <div
                        key={field.name}
                        className="d-flex flex-direction-column"
                      >
                        <Label htmlFor={field.name}>{field.name}</Label>
                        <CustomField {...field} disabled={formDisabled} />
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
                <div key={info} style={{ margin: '16px 0' }}>
                  <Label htmlFor={`input${i}`}>{info}</Label>
                  <Text
                    variant="paragraph"
                    id={`input${i}`}
                    border="1px solid whitesmoke"
                    backgroundColor="whitesmoke"
                    padding="8px"
                    borderRadius="4px"
                  >
                    {typeof openItem.data[info] === 'object'
                      ? displayObject(openItem.data[info])
                      : openItem.data[info]}
                  </Text>
                </div>
              )
            })
          ))}
      </Modal>
    )
  )
}

export default ListModal
