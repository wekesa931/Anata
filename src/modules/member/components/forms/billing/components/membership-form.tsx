import React, { useState, useEffect } from 'react'
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import PrimaryButton from 'src/components/buttons/primary'
import { useMembersData } from 'src/modules/member/hooks/member-data'
import { useNotifications } from 'src/context/notifications'
import { useWizardContext } from 'src/components/wizard'
import type { Member } from 'src/modules/member/db/models'
import FadeLoader from 'react-spinners/FadeLoader'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import useAnalytics from 'src/hooks/analytics'

const declineReasons = [
  {
    value: 'The member does not understand Antara’s value',
    label: 'The member does not understand Antara’s value',
  },
  {
    value: 'Antara seems to be too expensive',
    label: 'Antara seems to be too expensive',
  },
  {
    value: 'Antara does not meet the member’s specific healthcare needs',
    label: 'Antara does not meet the member’s specific healthcare needs',
  },
  { value: 'other', label: 'Other' },
]

type BillingMethodProps = {
  member: Member | null
  primaryMember: Member | undefined
  setCompleted?: (completed: any, primaryMember?: any) => void
}

function MembershipForm(props: BillingMethodProps) {
  const { onNext } = useWizardContext()
  return <BillingMethodForm {...props} onNext={onNext} />
}

type BillingFormProps = BillingMethodProps & {
  onNext: () => Promise<void> | void
  showPhoneInput?: boolean
  isEditing?: boolean
}

interface BillingMethod {
  label: string
  value: string
  description: string
  billingPackage: any
  billingMethod: any
}

export function BillingMethodForm({
  member,
  primaryMember,
  setCompleted,
}: BillingFormProps) {
  const { track } = useAnalytics('Billing Package Enrollment')
  const [showDeclineSection, setShowDeclineSection] = useState(false)
  const [selectedReason, setSelectedReason] = useState('')
  const [subscriptionState, setSubscriptionState] = useState('')

  const [otherReason, setOtherReason] = useState('')

  const [billingMethods, setBillingMethods] = useState<BillingMethod[]>([])
  const { prospectiveMemberCohorts } = useMembersData()
  const [loadingCohorts, setLoadingCohorts] = useState(true)
  const [loadingEnrollment, setLoadingEnrollment] = useState(false)
  const {
    handleAcceptBillingPackageEnrollment,
    handleDeclineBillingPackageEnrollment,
  } = useRegistrationData()

  const { notify } = useNotifications()

  const processBillingPackageEnrollment = async (tag: string) => {
    let payload = {}

    if (tag === 'unlimited' && unlimitedCohorts.length > 0) {
      payload = {
        billingSchemeId: parseInt(unlimitedCohorts[0].value),
        antaraId: member?.antaraId,
      }
    }

    if (tag === 'ffs' && ffsCohorts.length > 0) {
      payload = {
        billingSchemeId: parseInt(ffsCohorts[0].value),
        antaraId: member?.antaraId,
      }
    }

    if (member && Object.keys(payload).length > 0) {
      setLoadingEnrollment(true)
      try {
        await handleAcceptBillingPackageEnrollment(member, payload)
        notify('Member subscription updated successfully', 'success')
        track('Accepted')
        if (setCompleted) {
          await setCompleted(member, primaryMember)
        }
      } catch (error: any) {
        notify(error?.message ?? 'Error updating member subscription', 'error')
      } finally {
        setLoadingEnrollment(false)
      }
    } else {
      notify('Member does not have any prospective cohorts', 'info')
    }
  }
  const processDeclineBillingPackageEnrollment = async () => {
    if (member && billingMethods.length > 0) {
      const billingSchemeId =
        subscriptionState === 'Unlimited'
          ? unlimitedCohorts[0].value
          : ffsCohorts[0].value
      const payload = {
        billingSchemeId: parseInt(billingSchemeId),
        reasonForRefusal:
          selectedReason === 'other' ? otherReason : selectedReason,
        antaraId: member?.antaraId,
      }
      setLoadingEnrollment(true)
      try {
        await handleDeclineBillingPackageEnrollment(member, payload)
        notify('Member subscription declined successfully', 'success')
        track('Declined')
        if (subscriptionState === 'Unlimited' && ffsCohorts.length > 0) {
          setSubscriptionState('Ffs')
          setShowDeclineSection(false)
          setLoadingEnrollment(false)
          return
        }
        if (ffsCohorts.length === 0) {
          setSubscriptionState('Unknown')
          setShowDeclineSection(false)
          setLoadingEnrollment(false)
        }
      } catch (error: any) {
        notify(error?.message ?? 'Error declining member subscription', 'error')
      } finally {
        setLoadingEnrollment(false)
      }
    }
  }

  const fetchMemberCohorts = async (antaraId: any) => {
    const request = await prospectiveMemberCohorts(antaraId)
    const formattedCohorts = request.map((cohort: any) => ({
      label: cohort.name?.toUpperCase().split('KES')[0].trim(),
      value: cohort.billingSchemeId,
      description: cohort.billingMethod.name,
      billingPackage: cohort.billingPackage,
      billingMethod: cohort.billingMethod,
    }))
    setBillingMethods(formattedCohorts)
    setLoadingCohorts(false)

    if (formattedCohorts.length === 0) {
      setSubscriptionState('Unknown')
    }
  }

  const unlimitedCohorts = billingMethods.filter(
    (item: any) => item.billingPackage?.isUnlimitedMembership
  )

  const ffsCohorts = billingMethods.filter(
    (item: any) => item.billingPackage?.isFfs
  )

  useEffect(() => {
    if (member) {
      setLoadingCohorts(true)
      const timer = setTimeout(() => {
        fetchMemberCohorts(member?.antaraId)
      }, 1000)

      return () => clearTimeout(timer)
    }

    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    if (member && billingMethods.length > 0) {
      if (unlimitedCohorts.length > 0) {
        setSubscriptionState('Unlimited')
        return
      }

      if (ffsCohorts.length > 0) {
        setSubscriptionState('Ffs')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, billingMethods])

  const handleReasonChange = (event: any) => {
    setSelectedReason(event.target.value)
    if (event.target.value !== 'other') {
      setOtherReason('')
    }
  }
  const isSubmitDisabled =
    !selectedReason || (selectedReason === 'other' && !otherReason.trim())

  const getMemberFacingText =
    unlimitedCohorts.length > 0
      ? unlimitedCohorts[0].billingMethod.description
      : ''

  return (
    <div>
      {loadingCohorts ? (
        <div className="rounded-md p-4 mb-4 flex flex-col items-center justify-center h-[300px]">
          <FadeLoader color="#222222" loading data-testid="loader" />
          <div className="mt-4 text-center">Fetching subscription options</div>
        </div>
      ) : (
        <section>
          {!showDeclineSection ? (
            <div>
              {subscriptionState === 'Unlimited' && (
                <div>
                  {member?.isOnFreeMembership ? (
                    <h1 className="font-medium mb-6">Free for Member!</h1>
                  ) : (
                    <h1 className="font-medium mb-6">Unlimited Membership</h1>
                  )}
                  {!member?.isOnFreeMembership && (
                    <p className="text-sm text-[#5D6B82] font-medium mb-5">
                      Add the member to unlimited membership to get the best
                      from Antara at the lowest price in the market
                    </p>
                  )}

                  <section className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-4 shadow-none p-5 bg-[#D6F7DB]">
                    {member?.isOnFreeMembership ? (
                      <>
                        <p className="text-sm mb-1">
                          The Member will get all services paid fpr by their
                          insurance provider.
                        </p>
                        <p className="text-sm">No extra charges incurred.</p>
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-between mb-6 text-[#8B95A5]">
                          <p className="font-medium text-base">
                            <span className="text-[#182C4C]">1,500</span> Ksh
                          </p>
                          <p className="text-sm">Billed every 3 months</p>
                        </div>
                        <div className="border-t pt-2 pb-2 border-[#D1D5DB]" />
                        <p className="text-sm">{getMemberFacingText}</p>
                      </div>
                    )}
                  </section>
                  <div className="text-sm mb-4">
                    {member?.isOnFreeMembership ? (
                      <p className="mb-3">
                        We do not touch their insurance benefits
                      </p>
                    ) : (
                      <>
                        <p className="mb-3">
                          Billing starts only after their first consultation is
                          complete.
                        </p>
                        <p>They can also cancel any time.</p>
                      </>
                    )}
                  </div>
                  <PrimaryButton
                    type="button"
                    fullWidth
                    variant="contained"
                    className="mb-4 capitalize"
                    onClick={() => processBillingPackageEnrollment('unlimited')}
                    disabled={loadingEnrollment}
                    loading={loadingEnrollment}
                  >
                    Join membership
                  </PrimaryButton>
                  <Button
                    fullWidth
                    className="border"
                    sx={{
                      backgroundColor: '#ffff',
                      border: '1px #205284 solid',
                      color: '#205284',
                    }}
                    onClick={() => setShowDeclineSection(true)}
                    disabled={loadingEnrollment}
                  >
                    Decline
                  </Button>
                </div>
              )}

              {subscriptionState === 'Ffs' && (
                <div>
                  <h1 className="font-medium mb-6">Pay as you go Membership</h1>

                  <section className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-4 shadow-none p-5 bg-[#FFEACC]">
                    <p className="text-sm">
                      Members are billed only for the services they use. They
                      may choose to upgrade to an unlimited membership anytime
                      to maximize their access to Antara services at a lower
                      cost, subject to availability.
                    </p>
                  </section>
                  <PrimaryButton
                    type="button"
                    fullWidth
                    variant="contained"
                    className="mb-4 capitalize"
                    onClick={() => processBillingPackageEnrollment('ffs')}
                    disabled={loadingEnrollment}
                    loading={loadingEnrollment}
                  >
                    Join Pay As You Go
                  </PrimaryButton>
                </div>
              )}

              {subscriptionState === 'Unknown' && (
                <div>
                  <h1 className="font-medium mb-6">Unknown Package</h1>

                  <section className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-4 shadow-none p-5 bg-[#FFEACC]">
                    <p className="text-sm">
                      Member current service package is not recognized, so we’re
                      unable to display the specific benefits. For comprehensive
                      access and support, Kindly contact the Support Team.
                    </p>
                  </section>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="font-medium mb-4">Decline Membership?</h1>
              <p className="text-sm text-[#5D6B82] font-medium mb-5">
                Please enter the reason for declining
              </p>
              <RadioGroup
                aria-labelledby="decline-reason-radio-group-label"
                className="pb-8"
                name="decline-reasons"
                value={selectedReason}
                onChange={handleReasonChange}
              >
                {declineReasons.map((reason) => (
                  <FormControlLabel
                    key={reason.value}
                    value={reason.value}
                    control={<Radio />}
                    label={reason.label}
                  />
                ))}
              </RadioGroup>
              {selectedReason === 'other' && (
                <TextField
                  fullWidth
                  label="Enter reason"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  variant="outlined"
                  className="mb-4"
                  multiline
                  rows={4}
                />
              )}
              <PrimaryButton
                type="button"
                fullWidth
                variant="contained"
                className="mb-4 capitalize"
                disabled={isSubmitDisabled || loadingEnrollment}
                onClick={() => processDeclineBillingPackageEnrollment()}
                loading={loadingEnrollment}
              >
                Submit
              </PrimaryButton>
              <Button
                fullWidth
                className="border "
                sx={{
                  backgroundColor: '#ffff',
                  border: '1px #205284 solid',
                  color: '#205284',
                }}
                onClick={() => {
                  if (unlimitedCohorts.length > 0) {
                    setSubscriptionState('Unlimited')
                  }
                  setShowDeclineSection(false)
                }}
                disabled={loadingEnrollment}
              >
                {unlimitedCohorts.length > 0
                  ? 'Join Membership instead'
                  : 'Go back'}
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default MembershipForm
