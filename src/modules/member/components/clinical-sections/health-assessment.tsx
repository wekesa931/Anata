import React from 'react'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/modules/member/components/display-items.component'
import useClinicalSummary from 'src/modules/member/hooks/clinical-summary'

function HealthAssessmentSection() {
  const { healthStatus, riskScore, healthGoals } = useClinicalSummary()
  return (
    <SectionItem>
      <GridItems>
        <Item title="Health Status" child={healthStatus} />
        <Item title="Risk Score" child={riskScore} />
      </GridItems>
      <GridItems single>
        <Item
          title="Health Goals"
          child={
            <div className="flex flex-wrap gap-2">
              {(healthGoals || []).map((goals, index) => (
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
