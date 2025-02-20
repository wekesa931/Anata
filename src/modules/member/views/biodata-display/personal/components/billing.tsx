import React, { useState } from 'react'
import { MemberCohortType } from 'src/modules/member/types'
import {
  SectionItem,
  GridItems,
  ItemTitle,
  ItemChild,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from '@mui/material'
import type { Member } from 'src/modules/member/db/models'
import { ExpandMoreOutlined } from '@mui/icons-material'
import DoneIcon from '@mui/icons-material/Done'
import Tooltip from 'src/components/tooltip'
import { GridCloseIcon } from '@mui/x-data-grid'
import EmptyDataIcon from 'src/assets/img/icons/empty-data.svg'

import { toTitleCase } from 'src/utils/text-utils'
import { PortalForm } from 'src/modules/member/components/update-forms'
import InsuranceForm from 'src/modules/member/components/forms/billing/index'
import { useNotifications } from 'src/context/notifications'
import InElligibilityReasonsComponent from 'src/modules/member/components/billing-reasons'
import { Form } from 'formik'
import PrimaryForm from 'src/components/forms/primary-form'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import BillingCohortModal from 'src/modules/member/components/forms/billing/components/billing-cohort-modal'
import MembershipForm from 'src/modules/member/components/forms/billing/components/membership-form'
import { formatCurrency } from 'src/modules/member/utils'

function BillingSectionItem({
  memberCohortItem,
  expanded,
  handleChange,
  member,
}: {
  memberCohortItem: MemberCohortType
  expanded: boolean
  member: Member | null
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
  editCohort: boolean
  availableCohorts: any
  setAvailableCohorts: (values: any) => void
  setInitialValues: (values: any) => void
  setDisplayReasons: (values: any) => void
  setActiveBillingPackageId: (values: number) => void
  setEditCohort: (values: boolean) => void
}) {
  const memberCohortDetails =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.billingScheme
  const status =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.subscriptionStatus
  const isActive = status === 'ACTIVE'

  const memberBillingScheme =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.billingScheme
  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-2 shadow-none"
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <div className="mb-1 w-full">
            <div className="flex items-center justify-between">
              <section>
                <h4 className="text-dark-blue-100 mt-2">
                  {member?.isUnlimitedMembershipMember
                    ? 'Unlimited Membership'
                    : 'Fee For Service'}
                </h4>
                <p className="text-dark-blue-50 text-sm mt-2 mb-2">
                  {memberCohortDetails?.payor?.payorName}
                </p>
              </section>
            </div>
            <span
              className={`inline-block px-4 py-1 mt-2 gap-4 text-xs font-medium rounded-full ${
                isActive
                  ? 'bg-[#ebfbed] text-[#34c759]'
                  : 'text-red-100 bg-red-10'
              }`}
            >
              {toTitleCase(status)}
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <Divider />

            <>
              <GridItems single className="mt-2">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Billing method </p>
                  <ItemChild
                    child={memberBillingScheme?.billingMethod?.name}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100">Amount </p>
                  <ItemChild
                    child={`${formatCurrency(memberBillingScheme?.skuRate)}`}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Frequency</p>
                  <ItemChild
                    child={memberBillingScheme?.billingFrequency}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Status</p>
                  <ItemChild
                    child={toTitleCase(memberBillingScheme?.status)}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              {(memberCohortItem?.remarks ?? []).length > 0 && (
                <div>
                  <InElligibilityReasonsComponent
                    member={member}
                    remarks={memberCohortItem?.remarks ?? []}
                  />
                </div>
              )}
            </>
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

type BillingSectionProps = {
  member: Member | null
}

function BillingSection({ member }: BillingSectionProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  )
  const [billingForm, setBillingForm] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [processLoader, setProcessLoader] = useState(false)
  const [editCohort, setEditCohort] = useState(false)
  const [validation, setValidation] = useState(false)
  const [updateBillingForm, setUpdateBillingForm] = useState(false)
  const [billingMethodView, setBillingMethodView] = useState(false)

  const { notify } = useNotifications()

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false)
    }
  const isActiveBillingScheme =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.subscriptionStatus
  const memberCohortDetails: MemberCohortType[] = member?.membercohortSet || []
  const [initialValues, setInitialValues] = useState({
    cohortName: '',
    reason: [],
  })
  const [availableCohorts, setAvailableCohorts] = useState([])
  const [displayReasons, setDisplayReasons] = useState(false)
  const [activeBillingPackageId, setActiveBillingPackageId] =
    useState<number>(0)

  const billingEligibility = () => {
    if (isActiveBillingScheme === 'ACTIVE') {
      return 'Eligible'
    }

    return 'Not eligible'
  }

  const checkAllDeactivatedCohorts = memberCohortDetails.every(
    (item) => item.subscriptionStatus === 'CANCELLED'
  )

  const toggleEditForm = (open: boolean) => {
    setBillingForm(open)
  }

  const toggleUpdateBillingForm = (open: boolean) => {
    setUpdateBillingForm(open)
  }

  const setCompleted = async () => {
    setUpdateBillingForm(false)
  }

  const requestComplete = () => {
    setEditCohort(false)
  }

  const handleSubmit = () => {}

  /** is member eligible for Antara Services  */
  const isEligibleForAntaraServices = member?.eligibleForServices?.toLowerCase()

  /** holds reasons for service ineligibility  */
  const reasonsForIneligibility = member?.reasonsForServiceIneligibility || []

  return member ? (
    <PrimaryForm initialValues={initialValues} handleSubmit={handleSubmit}>
      {(values) => (
        <Form>
          <>
            {billingForm && (
              <PortalForm
                handleClose={() => toggleEditForm(false)}
                handleOpen={() => toggleEditForm(true)}
                isEdited={isEdited}
                setIsEdited={setIsEdited}
                modalTitle="Assign Billing Package"
                height={processLoader ? 40 : 66}
                width={processLoader ? 40 : 50}
              >
                {({ handleClose }) => (
                  <InsuranceForm
                    member={member}
                    setCompleted={() => {
                      notify('Billing info updated')
                      handleClose()
                    }}
                    primaryMember={undefined}
                    setProcessLoader={setProcessLoader}
                    type="assign-billing"
                  />
                )}
              </PortalForm>
            )}
            {validation && (
              <BillingCohortModal
                initialData={initialValues}
                updatedData={values}
                setValidation={setValidation}
                modalOpen={validation}
                availableCohorts={availableCohorts}
                member={member}
                requestComplete={requestComplete}
                activeBillingPackageId={activeBillingPackageId}
              />
            )}
            <div id="billing-section">
              {updateBillingForm && (
                <PortalForm
                  modalTitle="Edit Billing Scheme"
                  handleClose={() => toggleUpdateBillingForm(false)}
                  isEdited={isEdited}
                  setIsEdited={setIsEdited}
                  handleOpen={() => toggleEditForm(true)}
                >
                  {() => (
                    <>
                      {!billingMethodView ? (
                        <InsuranceForm
                          member={member}
                          primaryMember={undefined}
                          showWizardControls
                          hasOnPrev={false}
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
                    </>
                  )}
                </PortalForm>
              )}
              <SectionItem
                title="Billing scheme"
                editable
                handleEdit={() => toggleUpdateBillingForm(true)}
              >
                <GridItems single>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-dark-blue-100">
                      Antara service eligibility:
                    </p>
                    <div className="flex items-center gap-2">
                      <ItemChild
                        child={isEligibleForAntaraServices}
                        className="ml-2 text-dark-blue-50 capitalize"
                      />
                      <Tooltip
                        title={
                          isEligibleForAntaraServices === 'unknown'
                            ? 'Not enough information is available to determine eligibility'
                            : isEligibleForAntaraServices === 'no'
                            ? 'Member is NOT eligible to receive antara services'
                            : 'Member is eligibile to receive antara services'
                        }
                      >
                        {isEligibleForAntaraServices === 'yes' ? (
                          <DoneIcon className="text-[#ebfbed] bg-[#34c759] w-4 h-4 rounded-2xl" />
                        ) : (
                          <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-4 h-4 rounded-2xl" />
                        )}
                      </Tooltip>
                    </div>
                  </div>
                </GridItems>
                <GridItems single>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <p className="text-dark-blue-100">Billing Eligibility:</p>
                    <div className="flex items-center gap-2">
                      <ItemChild
                        child={billingEligibility()}
                        className="ml-2 text-dark-blue-50"
                      />
                      <Tooltip>
                        {billingEligibility() === 'Eligible' ? (
                          <DoneIcon className="text-[#ebfbed] bg-[#34c759] w-4 h-4 rounded-2xl" />
                        ) : (
                          <GridCloseIcon className="text-[#ebfbed] bg-rose-500 w-4 h-4 rounded-2xl" />
                        )}
                      </Tooltip>
                    </div>
                  </div>
                </GridItems>

                {/* reason for ineligibility */}
                {reasonsForIneligibility.length > 0 && (
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

                <div className="mb-4 mt-5 flex items-center justify-between">
                  <ItemTitle title="Billing Scheme" />
                  {memberCohortDetails.length > 0 && (
                    <div>
                      {editCohort && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditCohort(false)
                            }}
                            className="mt-3 mr-3 items-center bg-[#E4E4E4] text-[#5D6B82] h-9 p-[5px] rounded capitalize"
                            type="button"
                          >
                            <CloseIcon />
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setValidation(true)
                            }}
                            className={`mt-3 items-center h-9 p-[5px] rounded capitalize ${
                              !displayReasons
                                ? 'bg-[#E0E0E0] text-[#A0A0A0]'
                                : 'bg-[#007AFF] text-[#FFFFFF]'
                            }`}
                            disabled={!displayReasons}
                          >
                            <SaveIcon />
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {memberCohortDetails.length === 0 ||
                checkAllDeactivatedCohorts ? (
                  <>
                    {member.pendingBillingPackageEnrollment ? (
                      <div className="bg-red-20 rounded-md p-4 ">
                        <h1 className="text-[#34C759] font-medium text-sm">
                          Consent sent to member
                        </h1>
                        <p className="text-sm">
                          Pending consent acceptance by member to activate
                          billing scheme
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center font-rubik my-2">
                        <EmptyDataIcon />
                        <p className="text-base font-medium text-center">
                          Missing billing scheme
                        </p>
                        <div className="text-sm text-dark-blue-100 text-center mt-2 mb-4">
                          <p>
                            It seems like this member does not belong to a
                            billing scheme
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {[memberCohortDetails[0]].map((cohort, index) => (
                      <BillingSectionItem
                        memberCohortItem={cohort}
                        member={member}
                        key={index}
                        expanded={expandedAccordion === `panel${index}`}
                        handleChange={handleAccordionChange(`panel${index}`)}
                        editCohort={editCohort}
                        availableCohorts={availableCohorts}
                        setAvailableCohorts={setAvailableCohorts}
                        setInitialValues={setInitialValues}
                        setDisplayReasons={setDisplayReasons}
                        setActiveBillingPackageId={setActiveBillingPackageId}
                        setEditCohort={setEditCohort}
                      />
                    ))}
                  </>
                )}
              </SectionItem>
            </div>
          </>
        </Form>
      )}
    </PrimaryForm>
  ) : (
    <BlockSekeleton />
  )
}

export default BillingSection
