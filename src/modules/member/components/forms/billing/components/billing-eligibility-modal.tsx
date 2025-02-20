import React, { useState, useEffect } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import { Button } from '@mui/material'
import { useMember } from 'src/context/member'
import InsuranceForm from 'src/modules/member/components/forms/billing/index'
import MembershipForm from 'src/modules/member/components/forms/billing/components/membership-form'
import Modal from 'src/components/modals'

import { useRegistrationForm } from 'src/context/member-registration'
import useAnalytics from 'src/hooks/analytics'

function ModalHeader({
  updateState,
}: {
  updateState: boolean
}): React.ReactElement {
  return (
    <>
      <div className="full-width flex text-center justify-between">
        <h3 className="font-medium text-[#000000] text-xl">
          {!updateState ? 'Restricted Service' : 'Unlock Scribe'}
        </h3>
      </div>
    </>
  )
}

function BillingEligibilityModal() {
  const { track } = useAnalytics('Billing Package Enrollment')
  const [modalOpen, setModalOpen] = useState(true)
  const { setIsFormOpen } = useRegistrationForm()

  const [updateState, setUpdateState] = useState(false)
  const [billingMethodView, setBillingMethodView] = useState(false)

  const { member } = useMember()
  const onUpdateLater = () => {
    setModalOpen(false)
    track('Snoozed')
  }

  const setCompleted = async () => {
    window.location.reload()
    setModalOpen(false)
  }

  useEffect(() => {
    if (member?.antaraId) {
      setIsFormOpen(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  /** holds reasons for service ineligibility  */
  const reasonsForIneligibility = member?.reasonsForServiceIneligibility || []

  return (
    <>
      <Modal
        open={modalOpen}
        setModalOpen={setModalOpen}
        heading={<ModalHeader updateState={updateState} />}
        height="auto"
        width="30%"
        closeOption={false}
      >
        {!updateState ? (
          <div>
            <p className="mt-5">This Member is not Billable.</p>

            {/* reason for ineligibility */}
            {reasonsForIneligibility?.length > 0 && (
              <div className=" h-auto bg-red-20 mx-1 py-2 rounded-md font-rubik text-dark-blue-100 ineligibility-reason">
                <h3 className="text-sm text-center pb-1 pl-2">
                  {reasonsForIneligibility.length === 1
                    ? 'Reason '
                    : 'Reasons '}
                  for ineligibility
                </h3>
                <ul className="text-xs text-start pl-6">
                  {reasonsForIneligibility?.map(
                    (reason: string, index: number) => (
                      <li key={index}>{reason}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            <p className="mt-4">
              Please update insurance details and billing package to unlock
              antara services
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <PrimaryButton
                onClick={() => {
                  setUpdateState(true)
                }}
              >
                Update
              </PrimaryButton>
              <Button
                className="border "
                sx={{
                  backgroundColor: '#ffff',
                  border: '1px #205284 solid',
                  color: '#205284',
                }}
                onClick={onUpdateLater}
              >
                Update later
              </Button>
            </div>
          </div>
        ) : (
          <section>
            {!billingMethodView ? (
              <InsuranceForm
                member={member}
                primaryMember={undefined}
                showWizardControls
                isRestrictedUser
                setNextResctrictedPhase={setBillingMethodView}
              />
            ) : (
              <MembershipForm
                member={member}
                primaryMember={undefined}
                setCompleted={setCompleted}
              />
            )}
          </section>
        )}
      </Modal>
    </>
  )
}

export default BillingEligibilityModal
