import React from 'react'
import HMPListItem from 'src/modules/member/views/biodata-display/clinical/components/hmp'
import ConditionsSection from 'src/modules/member/views/biodata-display/clinical/components/conditions'
import InterventionsSection from 'src/modules/member/views/biodata-display/clinical/components/intervention'
import HealthAssessmentSection from 'src/modules/member/views/biodata-display/clinical/components/health-assessment'

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
