import React from 'react'
import InsuranceSection from 'src/modules/member/components/personal-sections/insurance'
import SummarySection from 'src/modules/member/components/personal-sections/summary'
import ContactsSection from 'src/modules/member/components/personal-sections/contacts'
import StatusesSection from 'src/modules/member/components/personal-sections/statuses'
import AddressesSection from 'src/modules/member/components/personal-sections/addresses'
import DependentsSection from 'src/modules/member/components/personal-sections/dependents'

function PersonalSection() {
  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      <SummarySection />
      <ContactsSection />
      <StatusesSection />
      <InsuranceSection />
      <AddressesSection />
      <DependentsSection />
    </div>
  )
}

export default PersonalSection
