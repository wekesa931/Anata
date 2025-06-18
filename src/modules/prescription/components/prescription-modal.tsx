import React, { useEffect, useState } from 'react'
import Modal from 'src/components/modals'
import { Form } from 'formik'
import PrimaryForm from 'src/components/forms/primary-form'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryButton from 'src/components/buttons/primary'
import { Button } from '@mui/material'
import { useMember } from 'src/context/member'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'
import ErrorComponent from 'src/components/feedbacks/error-component'
import { Loader } from 'react-feather'
import dayjs from 'dayjs'
import useMedicationListingData from '../hooks/medication-listing'

type ModalProps = {
  setModalOpen: (value: boolean) => void
  modalOpen: boolean
  closePrescriptionModal: (values: any) => void
  handlePrescriptionDetails: (values: any) => void
  nextLoad: boolean
}
function ModalHeader({
  modalTitle,
  modalDescription,
  editMode,
}: {
  modalTitle: string
  modalDescription: string
  editMode: boolean
}) {
  return (
    <div className="full-width">
      <h3
        className={`font-medium text-base ${
          editMode ? 'text-[#205284]' : 'text-[#000000] text-xl mb-2'
        }`}
      >
        {modalTitle}
      </h3>
      <p className={`mt-2 ${editMode ? 'text-xs' : 'text-base mt-6 mb-4'}`}>
        {modalDescription}
      </p>
    </div>
  )
}
function PrescriptionModalView({
  modalOpen,
  setModalOpen,
  closePrescriptionModal,
  handlePrescriptionDetails,
  nextLoad,
}: ModalProps) {
  const { getConsultationData } = useMedicationListingData()
  const { notify } = useNotifications()

  const [consultationData, setConsultationData] = useState<any[]>([])
  const [userError, setUserError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(true)

  const { member } = useMember()

  const getModalTitle = () => {
    if (editMode) {
      return 'Prescription Generation'
    }
    return 'Cancel Prescription Generation?'
  }

  const getModalDescription = () => {
    let text = ''
    if (!editMode) {
      text =
        'Are you sure you want to cancel the prescription generation process? Any unsaved changes will be lost.'
    }
    return text
  }

  const fetchConsoltationData = async () => {
    setLoading(true)
    try {
      const data = await getConsultationData()
      setLoading(false)
      setUserError(null)
      const res = sortConsulationData(data)
      setConsultationData(res)
    } catch (error) {
      setUserError(`Error loading consultation data : ${error}`)
      logError(error)
      notify('Error loading consultation data')
      setLoading(false)
    }
  }
  useEffect(() => {
    if (member?.antaraId) {
      fetchConsoltationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const sortConsulationData = (data: any) => {
    return data.sort((a: any, b: any) => {
      const format = 'hh:mma YYYY-MM-DD'
      const dateA = dayjs(a.label.replace(/\s+/, ' '), format)
      const dateB = dayjs(b.label.replace(/\s+/, ' '), format)
      return dateB.valueOf() - dateA.valueOf()
    })
  }

  return modalOpen ? (
    <Modal
      open={modalOpen}
      setModalOpen={setModalOpen}
      heading={
        <ModalHeader
          modalTitle={getModalTitle()}
          modalDescription={getModalDescription()}
          editMode={editMode}
        />
      }
      height="auto"
      width={editMode ? 'auto' : '30%'}
      closeOption={false}
    >
      <PrimaryForm initialValues={{}} handleSubmit={handlePrescriptionDetails}>
        {() => (
          <Form key="list-edit-form">
            {editMode ? (
              <div>
                <SelectField
                  name="vcConsultation"
                  label=" VC Consultation"
                  helperText="Please link the prescription to the Clinical Consultation"
                  options={consultationData || []}
                  placeholder="--Select--"
                  required={false}
                  loadingText="Loading clinical consultations"
                  loading={loading}
                />
                {userError && (
                  <ErrorComponent handleClose={() => setUserError(null)}>
                    {userError}
                  </ErrorComponent>
                )}
                {userError ? (
                  <div>
                    <PrimaryButton fullWidth onClick={fetchConsoltationData}>
                      Retry
                    </PrimaryButton>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col gap-2">
                    <Button
                      className="border "
                      sx={{
                        backgroundColor: '#ffff',
                        border: '1px #205284 solid',
                        color: '#205284',
                      }}
                      onClick={() => {
                        setEditMode(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <PrimaryButton type="submit">
                      {nextLoad && <Loader className="mr-2" />}
                      Next
                    </PrimaryButton>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-10 flex flex-col gap-4">
                <Button
                  fullWidth
                  className="border "
                  sx={{
                    backgroundColor: '#ffff',
                    border: '1px #205284 solid',
                    color: '#205284',
                  }}
                  onClick={() => {
                    setEditMode(true)
                  }}
                >
                  Continue Editing
                </Button>
                <Button
                  fullWidth
                  className="border "
                  sx={{
                    backgroundColor: '#972323 !important',
                    border: '1px #972323 solid',
                    color: '#FFFFFF !important',
                  }}
                  onClick={closePrescriptionModal}
                >
                  Exit and Discard Changes
                </Button>
              </div>
            )}
          </Form>
        )}
      </PrimaryForm>
    </Modal>
  ) : null
}

export default PrescriptionModalView
