import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/modules/member/components/display-items.component'
import { useMember } from 'src/context/member'
import {
  BlockSekeleton,
  StatusSkeleon,
} from 'src/modules/member/components/skeleton-loaders'
import useClinicalSummary from 'src/modules/member/hooks/clinical-summary'

function StatusesSection() {
  const { member } = useMember()
  const { careConsent } = useClinicalSummary()

  return member ? (
    <SectionItem>
      <GridItems>
        <Item title="Assigned HN" child={member?.assignedHn?.name} />
        <Item title="Assigned ME" child={member?.assignedMe?.name} />
      </GridItems>
      <GridItems>
        <Item title="Onboarding stage" child={member?.onboardStage} />
        <Item title="Member status" child={member?.status} />
      </GridItems>
      {careConsent ? (
        <GridItems single>
          <Item title="Chronic care consent" child={careConsent} />
        </GridItems>
      ) : (
        <BlockSekeleton height={40} />
      )}

      <GridItems single>
        <Item
          title="Tags"
          child={
            <div className="flex flex-wrap gap-2">
              {(member?.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          }
        />
      </GridItems>
    </SectionItem>
  ) : (
    <StatusSkeleon />
  )
}

export default StatusesSection
