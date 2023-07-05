import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/modules/member/components/display-items.component'
import { formatDOB } from 'src/utils/date-time/date-formatters'
import { SummarySkeleton } from 'src/modules/member/components/skeleton-loaders'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { BioDataForm } from 'src/modules/member/components/forms/biodata-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'

type SummarySectionProps = {
  member: Member | null
}

function SummarySection({ member }: SummarySectionProps) {
  const [showUpdateForm, setShowUpdateForm] = React.useState<boolean>(false)
  const [isEdited, setIsEdited] = React.useState<boolean>(false)
  const { notify } = useNotifications()

  return member ? (
    <div>
      {showUpdateForm && (
        <PortalForm
          handleClose={() => setShowUpdateForm(false)}
          isEdited={isEdited}
          handleOpen={() => setShowUpdateForm(true)}
          setIsEdited={setIsEdited}
          modalTitle="Edit bio data"
        >
          {({ handleClose }) => (
            <BioDataForm
              member={member}
              setIsEdited={setIsEdited}
              onNext={() => {
                notify('Bio data updated')
                handleClose()
              }}
              onPrev={handleClose}
              showPhoneInput={false}
              showWizardControls={false}
            />
          )}
        </PortalForm>
      )}
      <SectionItem
        title="Bio data"
        handleEdit={() => setShowUpdateForm(true)}
        editable
      >
        <GridItems fullCols>
          <Item title="First name" child={member?.firstName || '-'} />
          <Item title="Middle name" child={member?.middleName || '-'} />
          <Item title="Last name" child={member?.lastName || '-'} />
        </GridItems>
        <GridItems fullCols>
          <Item
            title="DOB"
            child={member?.birthDate ? formatDOB(member?.birthDate) : '-'}
          />
          <Item title="Gender" child={member?.sex} />
          <Item title="Marital status" child={member?.maritalStatus} />
        </GridItems>
      </SectionItem>
    </div>
  ) : (
    <SummarySkeleton />
  )
}

export default SummarySection
