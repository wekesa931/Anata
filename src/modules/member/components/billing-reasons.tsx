import React, { useState } from 'react'
import type { Member } from 'src/modules/member/db/models'
import { PortalForm } from 'src/modules/member/components/update-forms'
import InsuranceForm from 'src/modules/member/components/forms/billing/index'

type InElligibilityReasonsProps = {
  member: Member | null
  showForm?: boolean
  remarks: Array<{ remark: string }>
}

const tagReasons = [
  {
    keywords: ['insurance ID is invalid'],
    message: 'Member has invalidated insurance IDs',
    tag: 'insurance',
  },
  {
    keywords: ['payor in unknown'],
    message: 'Member has a missing Payor',
    tag: 'insurance',
  },
  {
    keywords: ['linked to wrong payor'],
    message: 'Member tagged to incorrect payor',
    tag: 'insurance',
  },
]

const filterReasons = (
  member: Member | null,
  remarks: Array<{ remark: string }>
) => {
  const matchedReasons = tagReasons
    .filter((tag) =>
      remarks.some((remarkObj: any) =>
        tag.keywords.some((keyword) =>
          (remarkObj.remark || '').includes(keyword)
        )
      )
    )
    .map((reason) => ({
      condition: true,
      message: reason.message,
      tag: reason.tag,
    }))

  const baseReasons = [
    {
      condition: member?.status !== 'Active',
      message: 'Member account not active',
      tag: 'status',
    },
    {
      condition: member?.hasAnyRejectedInsurance && !member?.hasPrimary,
      message: 'Missing insurance details',
      tag: 'insurance',
    },
    {
      condition: !member?.birthDate,
      message: 'Missing date of birth',
      tag: 'age',
    },
    {
      condition: !member?.payor?.name,
      message: 'Missing payor information',
      tag: 'insurance',
    },
    {
      condition: member?.payor?.status !== 'Active',
      message: 'Payor status is inactive',
      tag: 'insurance',
    },
  ]

  return [...baseReasons, ...matchedReasons].filter(
    (reason) => reason.condition
  )
}

function BillingMessageSection({
  initialReasons,
  handleAssignBillingMethod,
}: {
  initialReasons: { message: string; tag: string }[]
  handleAssignBillingMethod: (val: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-1 mt-6">
      <div className="w-full text-[#5D6B82] font-medium">Reason(s)</div>
      {initialReasons.map((reason, index) => (
        <div key={index} className="w-full">
          <section className="flex justify-between items-center h-16 rounded-lg font-rubik text-dark-blue-100 w-full border-2 border-rose-500 pl-2">
            <h1>{reason.message}</h1>
            <button
              className="text-blue-100 mr-2 font-rubik normal-case"
              onClick={() => handleAssignBillingMethod(true)}
            >
              + <span>Add</span>
            </button>
          </section>
        </div>
      ))}
    </div>
  )
}

function InElligibilityReasonsComponent({
  member,
  showForm = true,
  remarks,
}: InElligibilityReasonsProps) {
  const [billingForm, setBillingForm] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [processLoader, setProcessLoader] = useState(false)
  const [showAllReasons, setShowAllReasons] = useState(false)

  const reasons = filterReasons(member, remarks)
  const initialReasons = reasons.slice(0, 2)
  const remainingReasons = reasons.slice(2)

  return (
    <>
      {billingForm && (
        <PortalForm
          handleClose={() => setBillingForm(false)}
          handleOpen={() => setBillingForm(true)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          modalTitle="Resolve billing issues"
          height={processLoader ? 40 : 66}
          width={processLoader ? 40 : 50}
        >
          {({ handleClose }) => (
            <InsuranceForm
              member={member}
              setCompleted={handleClose}
              primaryMember={undefined}
              showWizardControls={false}
              type="edit-billing-details"
              setProcessLoader={setProcessLoader}
              inEligibilityReasons={initialReasons}
            />
          )}
        </PortalForm>
      )}
      {!member?.isEligible && showForm && initialReasons.length > 0 && (
        <BillingMessageSection
          initialReasons={initialReasons}
          handleAssignBillingMethod={setBillingForm}
        />
      )}
      {showAllReasons && (
        <div className="flex flex-col gap-1 mt-6">
          {remainingReasons.map((reason, index) => (
            <div key={index} className="w-full">
              <section className="flex justify-between items-center h-16 rounded-lg font-rubik text-dark-blue-100 w-full border-2 border-rose-500 pl-2">
                <h1>{reason.message}</h1>
                <button className="text-blue-100 mr-2 font-rubik normal-case">
                  + <span>Add</span>
                </button>
              </section>
            </div>
          ))}
        </div>
      )}
      {!showAllReasons && remainingReasons.length > 0 && (
        <button
          onClick={() => setShowAllReasons(true)}
          className="text-blue-100 mr-2 font-rubik normal-case text-right mt-2"
        >
          + {remainingReasons.length} more
          {remainingReasons.length > 1 ? 'reasons' : 'reason'}
        </button>
      )}
    </>
  )
}

export default InElligibilityReasonsComponent
