import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'
import { useMember } from 'src/context/member'
import { formatDOB } from 'src/utils/date-time/date-formatters'
import { SummarySkeleton } from 'src/modules/member/components/skeleton-loaders'

function SummarySection() {
  const { member } = useMember()

  return member ? (
    <SectionItem>
      <GridItems fullCols>
        <Item title="First name" child={member?.firstName || '-'} />
        <Item title="Middle name" child={member?.middleName || '-'} />
        <Item title="Last name" child={member?.lastName || '-'} />
      </GridItems>
      <GridItems fullCols>
        <Item title="DOB" child={formatDOB(member?.birthDate || '')} />
        <Item title="Gender" child={member?.sex} />
        <Item title="Marital status" child={member?.maritalStatus} />
      </GridItems>
    </SectionItem>
  ) : (
    <SummarySkeleton />
  )
}

export default SummarySection
