import React from 'react'
import { InsuranceForm } from 'src/modules/member/components/forms/insurance-form'
import type { Member } from 'src/modules/member/db/models'
import UpdateForms from 'src/modules/member/components/update-forms'
import { useNotifications } from 'src/context/notifications'

type MissingInfoBlockProps = {
  member: Member | null
}

function MissingInsurance({ member }: MissingInfoBlockProps) {
  const { notify } = useNotifications()

  return (
    <UpdateForms title="Missing insurance info">
      {({ handleClose }) => (
        <InsuranceForm
          member={member}
          setCompleted={() => {
            notify('Insurance info updated')
            handleClose()
          }}
          primaryMember={undefined}
          showWizardContols={false}
        />
      )}
    </UpdateForms>
  )
}

export default MissingInsurance
