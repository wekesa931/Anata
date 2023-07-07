import React from 'react'
import MissingInsurance from 'src/modules/member/views/missing-info/components/insurance-forms'
import type { Member } from 'src/modules/member/db/models'
import MissingPhoneForm from 'src/modules/member/views/missing-info/components/phones-form'
import MissingBirthdateForm from 'src/modules/member/views/missing-info/components/birthday-form'
import MissingAddessForms from 'src/modules/member/views/missing-info/components/address-forms'

type MissingInfoBlockProps = {
  member: Member | null
}

export default function MissingInfoBlock({ member }: MissingInfoBlockProps) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      {member?.hasAnyRejectedInsurance && (
        <div className="w-full">
          <MissingInsurance member={member} />
        </div>
      )}

      {member?.hasMissingPhone && !member?.isMinor && (
        <div className="w-full">
          <MissingPhoneForm member={member} />
        </div>
      )}

      {!member?.birthDate && (
        <div className="w-full">
          <MissingBirthdateForm member={member} />
        </div>
      )}

      {!member?.hasAddress && (
        <div className="w-full">
          <MissingAddessForms member={member} />
        </div>
      )}
    </div>
  )
}
