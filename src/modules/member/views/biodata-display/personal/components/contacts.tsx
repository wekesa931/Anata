import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'

import { ContactsSkeleton } from 'src/modules/member/components/skeleton-loaders'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { ContactsForm } from 'src/modules/member/components/forms/contacts-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

type ContactsSectionProps = {
  member: Member | null
}
function ContactsSection({ member }: ContactsSectionProps) {
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false)
  const [isEdited, setIsEdited] = React.useState<boolean>(false)
  const { notify } = useNotifications()
  const analytics = useMemberAnalytics()

  const toggleEditForm = (open: boolean) => {
    setShowEditForm(open)

    analytics.trackEditProfile(`Edit contacts ${open ? 'opened' : 'closed'}`)
  }

  return member ? (
    <div>
      {showEditForm && (
        <PortalForm
          handleClose={() => toggleEditForm(false)}
          modalTitle="Edit contacts"
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleOpen={() => toggleEditForm(true)}
        >
          {({ handleClose }) => (
            <ContactsForm
              member={member}
              setIsEdited={setIsEdited}
              showWizardContols={false}
              onNext={() => {
                notify('Contacts updated')
                handleClose()
              }}
              onPrev={handleClose}
              isChildRegistration={member?.isMinor || false}
            />
          )}
        </PortalForm>
      )}
      <SectionItem
        title="Contacts"
        editable
        handleEdit={() => toggleEditForm(true)}
      >
        {member?.phones?.map((phone, index) => (
          <GridItems key={index}>
            <Item title={`Phone ${index + 1}`} child={phone?.phone} />
            <Item title="Phone type" child={phone?.phoneType} />
          </GridItems>
        ))}

        {member?.phones?.length === 0 && (
          <GridItems>
            <Item title="Phone 1" child="-" />
            <Item title="Phone type" child="-" />
          </GridItems>
        )}

        <GridItems single>
          <Item title="Email" child={member?.email} />
        </GridItems>
        <GridItems single>
          <Item
            title="Emergency contact"
            child={member?.emergencyContactDisplay}
          />
        </GridItems>
        <GridItems single>
          <Item
            title="Caregiver contact info"
            child={member?.caregiverContactDisplay}
          />
        </GridItems>
      </SectionItem>
    </div>
  ) : (
    <ContactsSkeleton />
  )
}

export default ContactsSection
