import React from 'react'
import { PhoneType } from 'src/modules/member/types'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'

import { take } from 'lodash'
import { useMember } from 'src/context/member'
import { ContactsSkeleton } from 'src/modules/member/components/skeleton-loaders'

function ContactsSection() {
  const { member } = useMember()
  const phones: PhoneType[] = take(member?.phones || [], 2)

  return member ? (
    <SectionItem>
      {phones.map((phone, index) => (
        <GridItems key={index}>
          <Item title={`Phone ${index + 1}`} child={phone?.phone} />
          <Item title="Phone type" child={phone?.phoneType} />
        </GridItems>
      ))}
      <GridItems single>
        <Item title="Email" child={member?.email} />
      </GridItems>
      <GridItems single>
        <Item
          title="Emergency contact"
          child={member?.emergencyContactDisplay}
        />
      </GridItems>
    </SectionItem>
  ) : (
    <ContactsSkeleton />
  )
}

export default ContactsSection
