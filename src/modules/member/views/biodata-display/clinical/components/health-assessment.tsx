import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'
import { useMember } from 'src/context/member'
import useClinicalSummary from 'src/modules/member/hooks/clinical-summary'

function HealthAssessmentSection() {
  const { riskScore, healthGoals } = useClinicalSummary()
  const { member } = useMember()
  return (
    <SectionItem>
      <GridItems>
        <Item title="Health Status" child={member?.healthStatus} />
        <Item title="Risk Score" child={riskScore} />
      </GridItems>
      <GridItems single>
        <Item
          title="Health Goals"
          child={
            <div className="flex flex-wrap gap-2">
              {(healthGoals || []).map((goals: any, index: number) => (
                <span
                  key={index}
                  className="bg-blue-10 text-center rounded-md text-dark-blue-100 py-1 px-1.5 font-rubik text-sm"
                >
                  {goals}
                </span>
              ))}
            </div>
          }
        />
      </GridItems>
    </SectionItem>
  )
}

export default HealthAssessmentSection
