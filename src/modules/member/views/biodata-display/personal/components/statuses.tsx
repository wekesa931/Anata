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

function MemberStatus({ status }: { status?: string }) {
  const getBg = () => {
    switch (status) {
      case 'Active':
        return 'bg-status-active'
      case 'Deceased':
        return 'bg-status-terminated'
      case 'Terminated':
        return 'bg-status-terminated'
      case 'Provisioned':
        return 'bg-status-provisioned'
      default:
        return 'bg-dark-blue-50'
    }
  }
  return (
    <div
      className={`font-rubik rounded-2xl flex justify-center items-center ${getBg()} mt-1`}
    >
      <p className="text-sm text-white font-medium">{status}</p>
    </div>
  )
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

  return true ? (
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
          <Item title="Assigned HN" child={'Mercy Minage'} />
          <Item title="Assigned ME" child={'Joseph Karauri'} />
        </GridItems>
        <GridItems>
          <Item
            title="Assigned Nutritionist"
            child={'Lindy Cromwel'}
          />
        </GridItems>
        <GridItems>
          <Item title="Onboarding stage" child={'Onboarded'} />
          <Item
            title="Member status"
            child={<MemberStatus status={'Active'} />}
          />
        </GridItems>
      </SectionItem>
    </div>
  ) : (
    <StatusSkeleon />
  )
}

export default StatusesSection
