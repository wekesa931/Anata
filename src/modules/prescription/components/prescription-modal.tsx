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
import useMedicationListingData from '../hooks/medication-listing'

type ModalProps = {
  setModalOpen: (value: boolean) => void
  modalOpen: boolean
  closePrescriptionModal: (values: any) => void
  handlePrescriptionDetails: (values: any) => void
}
function ModalHeader() {
  return (
    <div className="full-width">
      <h3 className="font-medium text-[#000000] text-xl mb-2">
        Prescription Generation
      </h3>
    </div>
  )
}
function PrescriptionModalView({
  modalOpen,
  setModalOpen,
  closePrescriptionModal,
  handlePrescriptionDetails,
}: ModalProps) {
  const { getConsultationData } = useMedicationListingData()
  const { notify } = useNotifications()

  const [consultationData, setConsultationData] = useState<any[]>([])
  const [userError, setUserError] = useState<string | null>(null)

  const { member } = useMember()

  const fetchConsoltationData = async () => {
    try {
      const data = await getConsultationData()
      setUserError(null)
      setConsultationData(data)
    } catch (error) {
      setUserError(`Error loading consultation data : ${error}`)
      logError(error)
      notify('Error loading consultation data')
    }
  }
  useEffect(() => {
    if (member?.antaraId) {
      fetchConsoltationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return modalOpen ? (
    <Modal
      open={modalOpen}
      setModalOpen={setModalOpen}
      heading={<ModalHeader />}
      height="auto"
      width="auto"
      closeOption={false}
    >
      <PrimaryForm initialValues={{}} handleSubmit={handlePrescriptionDetails}>
        {(formik) => (
          <Form key="list-edit-form">
            <div>
              <SelectField
                name="vcConsultation"
                label=" VC Consultation"
                helperText="Please link the prescription to the Clinical Consultation"
                options={consultationData}
                placeholder="--Select--"
                required={false}
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
                    onClick={closePrescriptionModal}
                  >
                    Cancel
                  </Button>
                  <PrimaryButton
                    disabled={!formik.values.vcConsultation}
                    type="submit"
                  >
                    Next
                  </PrimaryButton>
                </div>
              )}
            </div>
          </Form>
        )}
      </PrimaryForm>
    </Modal>
  ) : null
}

export default PrescriptionModalView
