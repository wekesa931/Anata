import React from 'react'
import MissingInsurance from 'src/modules/member/views/missing-info/components/insurance-forms'
import type { Member } from 'src/modules/member/db/models'
import MissingPhoneForm from 'src/modules/member/views/missing-info/components/phones-form'
import MissingBirthdateForm from 'src/modules/member/views/missing-info/components/birthday-form'
import MissingAddessForms from 'src/modules/member/views/missing-info/components/address-forms'
import BillingMessage from 'src/modules/member/views/missing-info/components/billing-message'

type MissingInfoBlockProps = {
  member: Member | null
  showForm?: boolean
}

export default function MissingInfoBlock({
  member,
  showForm = true,
}: MissingInfoBlockProps) {
  const displayBillingMessage =
    (member?.membercohortSet?.some(
      (cohort) => cohort.subscriptionStatus !== 'ACTIVE'
    ) ??
      false) ||
    !member?.membercohortSet?.length
  return (
    <div className="flex flex-col gap-1 mt-2">
      {displayBillingMessage && showForm && (
        <div className="w-full">
          <BillingMessage />
        </div>
      )}
      {member?.hasAnyRejectedInsurance && (
        <div className="w-full">
          <MissingInsurance member={member} />
        </div>
      )}

      {member?.hasMissingPhone && !member?.isMinor && showForm && (
        <div className="w-full">
          <MissingPhoneForm member={member} />
        </div>
      )}

      {!member?.birthDate && (
        <div className="w-full">
          <MissingBirthdateForm member={member} />
        </div>
      )}

      {!member?.hasAddress && showForm && (
        <div className="w-full">
          <MissingAddessForms member={member} />
        </div>
      )}
      {!member?.hasPrimary && (
        <div className="w-full">
          <MissingInsurance member={member} />
        </div>
      )}
    </div>
  )
}
