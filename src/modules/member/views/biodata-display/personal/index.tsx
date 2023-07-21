import React from 'react'
import InsuranceSection from 'src/modules/member/views/biodata-display/personal/components/insurance'
import SummarySection from 'src/modules/member/views/biodata-display/personal/components/summary'
import ContactsSection from 'src/modules/member/views/biodata-display/personal/components/contacts'
import StatusesSection from 'src/modules/member/views/biodata-display/personal/components/statuses'
import AddressesSection from 'src/modules/member/views/biodata-display/personal/components/addresses'
import DependentsSection from 'src/modules/member/views/biodata-display/personal/components/dependents'
import type { Member } from 'src/modules/member/db/models'

type PersonalSectionProps = {
  member: Member | null
}

function PersonalSection({ member }: PersonalSectionProps) {
  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      <StatusesSection member={member} />
      <SummarySection member={member} />
      <ContactsSection member={member} />
      <InsuranceSection member={member} />
      <AddressesSection member={member} />
      <DependentsSection member={member} />
    </div>
  )
}

export default PersonalSection
