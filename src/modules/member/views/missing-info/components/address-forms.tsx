import React from 'react'
import { AddressesForm } from 'src/modules/member/components/forms/addresses-form'
import type { Member } from 'src/modules/member/db/models'
import UpdateForms from 'src/modules/member/components/update-forms'
import { useNotifications } from 'src/context/notifications'

type MissingInfoBlockProps = {
  member: Member | null
}

function MissingAddress({ member }: MissingInfoBlockProps) {
  const { notify } = useNotifications()

  return (
    <UpdateForms title="Missing address">
      {({ handleClose }) => (
        <AddressesForm
          member={member}
          onNext={() => {
            notify('Address info updated')
            handleClose()
          }}
          showWizardControls={false}
        />
      )}
    </UpdateForms>
  )
}

export default MissingAddress
