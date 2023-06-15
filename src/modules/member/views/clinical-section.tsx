import React from 'react'
import HMPListItem from 'src/modules/member/components/clinical-sections/hmp'
import ConditionsSection from 'src/modules/member/components/clinical-sections/conditions'
import InterventionsSection from 'src/modules/member/components/clinical-sections/intervention'
import HealthAssessmentSection from 'src/modules/member/components/clinical-sections/health-assessment'

function ClinicalSection() {
  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      <HealthAssessmentSection />
      <HMPListItem />
      <ConditionsSection />
      <InterventionsSection />
    </div>
  )
}

export default ClinicalSection
