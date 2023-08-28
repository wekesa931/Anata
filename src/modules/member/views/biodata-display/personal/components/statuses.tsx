import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'
import { StatusSkeleon } from 'src/modules/member/components/skeleton-loaders'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { StatusForm } from 'src/modules/member/components/forms/statuses-form'
import type { Member } from 'src/modules/member/db/models'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

type StatusesSectionProps = {
  member: Member | null
}

function StatusesSection({ member }: StatusesSectionProps) {
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false)
  const [isEdited, setIsEdited] = React.useState<boolean>(false)
  const analytics = useMemberAnalytics()

  const toggleEditForm = (open: boolean) => {
    setShowEditForm(open)

    analytics.trackEditProfile(
      `Edit statuses and assignees ${open ? 'opened' : 'closed'}`
    )
  }

  return member ? (
    <div>
      {showEditForm && (
        <PortalForm
          modalTitle="Edit statuses and assignees"
          handleClose={() => toggleEditForm(false)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleOpen={() => toggleEditForm(true)}
        >
          {({ handleClose }) => (
            <StatusForm
              member={member}
              setIsEdited={setIsEdited}
              onNext={handleClose}
            />
          )}
        </PortalForm>
      )}
      <SectionItem
        title="Statuses & Assignees"
        editable
        handleEdit={() => toggleEditForm(true)}
      >
        <GridItems>
          <Item title="Assigned HN" child={member?.assignedHn?.fullName} />
          <Item title="Assigned ME" child={member?.assignedMe?.fullName} />
        </GridItems>
        <GridItems>
          <Item
            title="Assigned Nutritionist"
            child={member?.assignedNutritionist?.fullName}
          />
        </GridItems>
        <GridItems>
          <Item title="Onboarding stage" child={member?.onboardStage} />
          <Item title="Member status" child={member?.status} />
        </GridItems>
        <GridItems>
          <Item
            title="Verification Status"
            child={member?.verificationStatus}
          />
        </GridItems>
      </SectionItem>
    </div>
  ) : (
    <StatusSkeleon />
  )
}

export default StatusesSection
