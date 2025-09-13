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
import { LastOpenedApp } from 'src/modules/member/components/last-opened-app'

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

  return true ? (
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
              showWizardControls={false}
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
        {[1].map((phone, index) => (
          <GridItems key={index}>
            <Item title={`Phone ${index + 1}`} child={'+254715338188'} />
            <Item
              title="Last app opened date"
              child={
                <LastOpenedApp
                  lastUsedToAccessApp={'+254715338188'}
                />
              }
            />
          </GridItems>
        ))}

        {[1].length === 0 && (
          <GridItems>
            <Item title="Phone 1" child="-" />
            <Item title="Last app opened date" child="-" />
          </GridItems>
        )}

        <GridItems single>
          <Item title="Email" child={'bill.wekesa@gmail.com'} />
        </GridItems>
        <GridItems single>
          <Item
            title="Emergency contact"
            child={'Betty Cheptoo'}
          />
        </GridItems>
        <GridItems single>
          <Item
            title="Caregiver contact info"
            child={'+254777883647'}
          />
        </GridItems>
      </SectionItem>
    </div>
  ) : (
    <ContactsSkeleton />
  )
}

export default ContactsSection
