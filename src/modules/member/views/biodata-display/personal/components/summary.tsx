import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'
import { formatDOB } from 'src/utils/date-time/date-formatters'
import { SummarySkeleton } from 'src/modules/member/components/skeleton-loaders'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { BioDataForm } from 'src/modules/member/components/forms/biodata-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

type SummarySectionProps = {
  member: Member | null
}

function SummarySection({ member }: SummarySectionProps) {
  const [showUpdateForm, setShowUpdateForm] = React.useState<boolean>(false)
  const [isEdited, setIsEdited] = React.useState<boolean>(false)
  const { notify } = useNotifications()
  const analytics = useMemberAnalytics()

  const toggleEditForm = (open: boolean) => {
    setShowUpdateForm(open)

    analytics.trackEditProfile(`Edit bio data ${open ? 'opened' : 'closed'}`)
  }
  const refusedServices =
    member?.refusedServices?.filter((el) => el !== 'Other') || []

  const otherRefusedService = member?.otherRefusedService || ''

  const mergeRefusedServices = [...refusedServices, otherRefusedService]

  return true ? (
    <div>
      {showUpdateForm && (
        <PortalForm
          handleClose={() => toggleEditForm(false)}
          isEdited={isEdited}
          handleOpen={() => toggleEditForm(true)}
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
              isEditing
            />
          )}
        </PortalForm>
      )}
      <SectionItem
        title="Bio data"
        handleEdit={() => toggleEditForm(true)}
        editable
      >
        <GridItems single>
          <Item
            title="Tags"
            child={
              <div className="flex flex-wrap gap-2">
                {([1,2]).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm"
                  >
                    {index === 0 ? 'Chronic' : 'VIP'}
                  </span>
                ))}
              </div>
            }
          />
        </GridItems>
        <GridItems single>
          <Item
            title="Refused Services"
            child={
              <div className="flex flex-wrap gap-2">
                {(mergeRefusedServices || []).map((refusedService, index) => (
                  <span
                    key={index}
                    className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm"
                  >
                    {refusedService}
                  </span>
                ))}
              </div>
            }
          />
        </GridItems>
        <GridItems fullCols>
          <Item title="First name" child={'Bill'} />
          <Item title="Middle name" child={'Adams'} />
          <Item title="Last name" child={'Wekesa'} />
        </GridItems>
        <GridItems fullCols>
          <Item
            title="DOB"
            child={'08/08/1990'}
          />
          <Item title="Gender" child={'M'} />
          <Item title="Marital status" child={'Single'} />
        </GridItems>
        <GridItems>
          <Item title="National ID" child={'29509222'} />
          <Item title="NHIF Number" child={'1234567890'} />
        </GridItems>
        <GridItems>
          <Item title="Referral source" child={'Referral'} />
          <Item
            title="Registration channel"
            child={'WhatsApp'}
          />
        </GridItems>
      </SectionItem>
    </div>
  ) : (
    <SummarySkeleton />
  )
}

export default SummarySection
