import React from 'react'
import HMPListItem from 'src/modules/hmp/views/hmp-details'
import ConditionsSection from 'src/modules/conditions/views/conditions-summary'
import InterventionsSection from 'src/modules/interventions/views/intervention-summary'
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
