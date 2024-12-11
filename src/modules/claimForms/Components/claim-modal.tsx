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
import { useModuleAnalytics } from 'src/modules/analytics'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import PortalWindow from 'src/components/portal'
import SuccessPrompt from 'src/modules/member/views/member-registration/components/success-registration'
import useClaimListingData from 'src/modules/claimForms/hooks/claim.data'

type ModalProps = {
  setModalOpen: (value: boolean) => void
  modalOpen: boolean
  closeClaimModal: (values: any) => void
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

function ClaimModalView({
  modalOpen,
  setModalOpen,
  closeClaimModal,
}: ModalProps) {
  const { getConsultationData, handleRegenerateClaim } = useClaimListingData()
  const { notify } = useNotifications()

  const [consultationData, setConsultationData] = useState<any[]>([])
  const [payorData, setPayorData] = useState<any[]>([])
  const [userError, setUserError] = useState<string | null>(null)
  const [loadingConsultations, setLoadingConsultations] = useState(false)
  const [loadingPayors, setLoadingPayors] = useState(false)
  const [editMode, setEditMode] = useState<boolean>(true)
  const { trackClaimFormRegenerated } = useModuleAnalytics()
  const isLoading = loadingConsultations || loadingPayors
  const [showSuccess, setShowSuccess] = useState(false)
  const [loadingRegeneration, setLoadingRegeneration] = useState(false)

  const { member } = useMember()

  const getModalTitle = () => {
    if (editMode) {
      return 'Claim Form Regeneration'
    }
    return 'Cancel Claim Form Regeneration?'
  }

  const getModalDescription = () => {
    let text = ''
    if (!editMode) {
      text =
        'Are you sure you want to cancel the claim form regeneration process? Any unsaved changes will be lost.'
    }
    return text
  }

  const fetchConsultationData = async () => {
    setLoadingConsultations(true)
    try {
      const data = await getConsultationData()
      setConsultationData(data)
      setUserError(null)
    } catch (error) {
      setUserError(`Error loading consultation data: ${error.message}`)
      logError(error)
    } finally {
      setLoadingConsultations(false)
    }
  }

  const fetchPayorData = async () => {
    setLoadingPayors(true)
    try {
      if (member?.insuranceDetails) {
        const insuranceData = member.insuranceDetails.map((detail) => ({
          label: `${detail.insuranceCompany} - ${detail.insuranceId} (${detail.verificationStatus})`,
          value: {
            insuranceId: detail.insuranceId,
            insuranceCompany: detail.insuranceCompany,
          },
        }))
        setPayorData(insuranceData)
      } else {
        notify('No insurance details found for this member.')
      }
    } catch (error) {
      setUserError(`Error loading payor data: ${error.message}`)
      logError(error)
    } finally {
      setLoadingPayors(false)
    }
  }
  const handleClosePortalWindow = () => {
    setShowSuccess(false)
    closeClaimModal(null)
  }

  useEffect(() => {
    if (member?.antaraId) {
      fetchConsultationData()
      fetchPayorData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const handleRegenerate = (values: any) => {
    const selectedConsultation = values.vcConsultation
    const selectedPayorDetails = values.payorDetails

    if (!selectedConsultation) {
      notify('Please select a consultation to regenerate')
      return
    }

    if (!selectedPayorDetails) {
      notify('Please select insurance details to regenerate the claim form')
      return
    }

    const recId = selectedConsultation['Record ID']
    const { insuranceId } = selectedPayorDetails
    const insurer = selectedPayorDetails.insuranceCompany

    setLoadingRegeneration(true)
    handleRegenerateClaim(recId, insuranceId, insurer)
      .then(() => {
        setShowSuccess(true)
        trackClaimFormRegenerated(values)
      })
      .catch((error) => {
        console.error('Error during regeneration:', error)
        notify(
          'Something went wrong with the generation of the document, please try again or contact RET team'
        )
      })
      .finally(() => {
        setLoadingRegeneration(false)
      })
  }

  return (
    <>
      {!showSuccess ? (
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
          {isLoading ? (
            <div className="d-flex flex-direction-column flex-align-center margin-top-32">
              <LoadingIcon className="w-6 h-6" />
              <p className="text-small">Loading VC and Insurance details</p>
            </div>
          ) : userError ? (
            <div className="d-flex flex-direction-column flex-align-center margin-top-8">
              <p className="text-center text-grey-main mb-2 font-medium font-rubik text-base">
                Error loading VC and Insurance details
              </p>
              <Button
                fullWidth
                className="border mt-2"
                sx={{
                  backgroundColor: '#205284',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#1a436a',
                  },
                }}
                onClick={() => {
                  fetchConsultationData()
                  fetchPayorData()
                }}
              >
                Retry
              </Button>
            </div>
          ) : consultationData.length > 0 && payorData.length > 0 ? (
            <PrimaryForm initialValues={{}} handleSubmit={handleRegenerate}>
              {() => (
                <Form key="list-edit-form">
                  {editMode ? (
                    <div>
                      <SelectField
                        name="vcConsultation"
                        label="VC Consultation"
                        helperText="Select the VC linked to the claim form to regenerate"
                        options={consultationData}
                        placeholder="--Select--"
                        required
                      />
                      <SelectField
                        name="payorDetails"
                        label="Confirm Payor details"
                        helperText="Insurance Provider, Insurance ID & Verification Status"
                        options={payorData}
                        placeholder="--Select--"
                        required
                      />
                      {userError && (
                        <ErrorComponent handleClose={() => setUserError(null)}>
                          {userError}
                        </ErrorComponent>
                      )}
                      <div className="mt-2 flex flex-col gap-2">
                        <PrimaryButton
                          type="submit"
                          disabled={loadingRegeneration}
                        >
                          {loadingRegeneration ? (
                            <>
                              <LoadingIcon className="w-6 h-6" />
                              Regenerating...
                            </>
                          ) : (
                            'Regenerate Claim Form'
                          )}
                        </PrimaryButton>
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
                      </div>
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
                        onClick={closeClaimModal}
                      >
                        Exit and Discard Changes
                      </Button>
                    </div>
                  )}
                </Form>
              )}
            </PrimaryForm>
          ) : (
            <div className="d-flex flex-col items-start 'h-8 w-full">
              <p className="text-center text-grey-main mb-2 font-medium font-rubik text-base">
                Missing VC or Insurance details
              </p>
              <div className="mb-2.5 whitespace-pre-line font-rubik text-xs text-dark-blue-100 gap-2">
                {consultationData.length === 0 && (
                  <p className="mb-1">
                    Please create a VC to enable regeneration of a claim
                  </p>
                )}
                {payorData.length === 0 && (
                  <p>
                    Please update insurance details to enable regeneration of a
                    claim
                  </p>
                )}
              </div>
              <Button
                fullWidth
                className="border mt-2"
                sx={{
                  backgroundColor: '#205284',
                  border: '1px #205284 solid',
                  color: '#ffff',
                  '&:hover': {
                    backgroundColor: '#205284',
                    borderColor: '#205284',
                    color: '#ffff',
                  },
                }}
                onClick={() => {
                  closeClaimModal(null)
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </Modal>
      ) : (
        <PortalWindow
          closeWindow={handleClosePortalWindow}
          title="Claim Form Regeneration"
          height={30}
          width={40}
        >
          <div className="px-4">
            <SuccessPrompt
              successMessage="The claim form has been successfully regenerated!"
              headerMessage="Your document has been initialized and will be ready in a few minutes"
              customMessage="You will need to refresh scribe to find it in the UDM/Docs section."
              handleClose={handleClosePortalWindow}
            />
          </div>
        </PortalWindow>
      )}
    </>
  )
}

export default ClaimModalView
