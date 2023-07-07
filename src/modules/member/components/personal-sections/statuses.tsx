import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'
import { useMember } from 'src/context/member'
import {
  BlockSekeleton,
  StatusSkeleon,
} from 'src/modules/member/components/skeleton-loaders'
import useMemberAirtableHook from 'src/modules/member/services/airtable'
import logError from 'src/utils/logging/logger'
import useClinicalSummary from 'src/modules/member/hooks/clinical-summary'
import { Checkbox } from '@mui/material'

function StatusesSection() {
  const { member } = useMember()
  const { optToChronicCare } = useMemberAirtableHook()
  const [consentDisabled, setConsentDisabled] = React.useState<boolean>(false)
  const { careConsent } = useClinicalSummary()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isOptedIn = e.target.checked
    optToChronicCare(isOptedIn)
      .then(() => {
        // disable the checkbox if a member opts out
        setConsentDisabled(!isOptedIn)
      })
      .catch(logError)
  }

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
        <div className="flex justify-start gap-8 mb-3">
          <h3 className="text-dark-blue-50 font-rubik text-base font-normal">
            Chronic care consent
          </h3>
          <Checkbox
            disabled={careConsent === 'Opted Out' || consentDisabled}
            color="primary"
            defaultChecked={careConsent === 'Opted In'}
            onChange={handleChange}
            className="p-0"
          />
        </div>
      ) : (
        <BlockSekeleton height={30} />
      )}
      <GridItems single>
        <Item title="Employer" child={member?.employer} />
      </GridItems>
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
