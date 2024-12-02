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
import dayjs from 'dayjs'
import { toTitleCase } from 'src/utils/text-utils'
import { PortalForm } from 'src/modules/member/components/update-forms'
import InsuranceForm from 'src/modules/member/components/forms/billing/index'
import { useNotifications } from 'src/context/notifications'
import InElligibilityReasonsComponent from 'src/modules/member/components/billing-reasons'
import SelectField from 'src/components/forms/fields/select-field'
import { Form } from 'formik'
import PrimaryForm from 'src/components/forms/primary-form'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import BillingCohortModal from 'src/modules/member/components/forms/billing/components/billing-cohort-modal'
import EditIcon from '@mui/icons-material/Edit'

function BillingSectionItem({
  memberCohortItem,
  expanded,
  handleChange,
  member,
  editCohort,
  availableCohorts,
  setInitialValues,
  setDisplayReasons,
  setActiveBillingPackageId,
  setEditCohort,
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
  const memberConsent =
    memberCohortItem?.isOptInRequired === 'Yes' ? 'Agree' : 'Not required'
  const activeStatus = memberCohortItem?.subscriptionStatus === 'ACTIVE'
  const [editableCohortId, setEditableCohortId] = useState('')

  const handleSaveInput = (value: any) => {
    if (memberCohortItem) {
      if (value !== memberCohortItem?.cohortId) {
        setDisplayReasons(true)
      } else {
        setDisplayReasons(false)
      }
      const selected = availableCohorts.find(
        (cohort: any) => cohort.value === value
      )
      setActiveBillingPackageId(selected?.billingPackage?.billingPackageId || 0)
    }
  }
  const handleAccordionClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const isEditable =
    editCohort && editableCohortId === memberCohortItem.cohortId

  const handleEditCohortData = (values: any) => {
    setEditableCohortId(isEditable ? '' : values.cohortId)
    setEditCohort(true)
    setInitialValues({
      cohortName: values?.cohortId || '',
      reason: [],
    })
  }

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
              {isEditable ? (
                <SelectField
                  name="cohortName"
                  label=""
                  options={availableCohorts}
                  required={false}
                  handleChange={(e) => {
                    handleSaveInput(e)
                  }}
                  onClick={handleAccordionClick}
                />
              ) : (
                <section>
                  <h4 className="text-dark-blue-100 mt-2">
                    {memberCohortItem?.name
                      ?.toUpperCase()
                      .split('KES')[0]
                      .trim()}
                  </h4>
                  <p className="text-dark-blue-50 text-sm mt-2 mb-2">
                    {memberCohortItem?.payor?.payorName}
                  </p>
                </section>
              )}
              {memberCohortItem.subscriptionStatus === 'DISABLED' &&
                availableCohorts.length > 1 && (
                  <div className="mr-4">
                    <Tooltip title="Edit">
                      <EditIcon
                        className={`text-[#ff9500] w-4 h-5 rounded-sm mr-2 ${
                          editCohort ? 'ml-1 pb-1 text-gray-300' : ''
                        }`}
                        onClick={(e) => {
                          e?.stopPropagation()
                          handleEditCohortData(memberCohortItem)
                        }}
                        sx={{
                          color: editCohort ? 'gray' : 'inherit',
                          cursor: editCohort ? 'not-allowed' : 'pointer',
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
            </div>
            <span
              className={`inline-block px-4 py-1 mt-2 gap-4 text-xs font-medium rounded-full ${
                activeStatus
                  ? 'bg-[#ebfbed] text-[#34c759]'
                  : 'text-red-100 bg-red-10'
              }`}
            >
              {toTitleCase(memberCohortItem?.subscriptionStatus)}
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
                    child={memberCohortItem?.billingMethod?.name}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100">Amount </p>
                  <ItemChild
                    child={`KES ${memberCohortItem?.skuRate}`}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Frequency</p>
                  <ItemChild
                    child={memberCohortItem?.billingFrequency}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Member Consent</p>
                  <ItemChild
                    child={memberConsent}
                    className="text-dark-blue-50"
                  />
                </div>
              </GridItems>
              {memberConsent === 'Agree' && (
                <GridItems single>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-dark-blue-100"> Opted in at </p>
                    <ItemChild
                      child={dayjs(memberCohortItem?.optedInAt).format(
                        'DD MMMM YYYY'
                      )}
                      className="text-dark-blue-50"
                    />
                  </div>
                </GridItems>
              )}
              <GridItems single>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-dark-blue-100"> Status</p>
                  <ItemChild
                    child={toTitleCase(memberCohortItem?.subscriptionStatus)}
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

  const { notify } = useNotifications()

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false)
    }
  const verification =
    member?.verificationStatus === 'VERIFIED' ? 'Eligible' : 'Not eligible'
  const memberStatus = member?.status
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
    const activeCohorts = memberCohortDetails.filter(
      (cohort) => cohort.subscriptionStatus === 'ACTIVE'
    )
    if (activeCohorts.length > 0 && memberStatus === 'Active') {
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

  const requestComplete = () => {
    setEditCohort(false)
  }

  const handleSubmit = () => {}

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
              <SectionItem>
                <div className="mb-4">
                  <ItemTitle title="Billing Scheme" />
                </div>
                <GridItems single>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-dark-blue-100">
                      Antara service eligibility:
                    </p>
                    <div className="flex items-center gap-2">
                      <ItemChild
                        child={verification}
                        className="ml-2 text-dark-blue-50"
                      />
                      <Tooltip>
                        {verification === 'Eligible' ? (
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
                    {memberCohortDetails.map((cohort, index) => (
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
