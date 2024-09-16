import React from 'react'
import type { Member } from 'src/modules/member/db/models'
import LabsAndVitalsTemplate from 'src/modules/udm/views/reports/templates/labs-and-vitals'
import Document from 'src/modules/udm/components/pdf-components/document'
import ClinicalSummaryTemplate from 'src/modules/udm/views/reports/templates/clinical-summary'
import { View } from '@react-pdf/renderer'
import { Divider } from 'src/modules/udm/components/pdf-components/divider'
import ConditionsTemplate from 'src/modules/udm/views/reports/templates/conditions-section'
import { SummaryInfo } from 'src/modules/udm/components/pdf-components/summary-info'
import InterventionsTemplate from 'src/modules/udm/views/reports/templates/interventions-section'
import type { Intervention } from 'src/modules/interventions/db/models'

type ConditionData = {
  condition: string
  currentStage?: string
  dateOfDiagnosis: string | null
}

type Props = {
  member: Member | null
  labsAndVitalsData: {
    labs: any[]
    vitals: any[]
  }
  formData: any
  clinicalData: any
  conditions: ConditionData[]
  interventions: Intervention[]
  isInPatient?: boolean
}

function OPGeneralTemplate({
  member,
  formData,
  labsAndVitalsData,
  clinicalData,
  conditions,
  interventions,
  isInPatient = false,
}: Props) {
  const vitalsColumns = [
    { name: 'Name', dataIndex: 'key', width: '30%' },
    {
      name: 'Starting Measurement',
      dataIndex: 'startingMeasurement',
      width: '35%',
    },
    {
      name: 'Recent Measurement',
      dataIndex: 'recentMeasurement',
      width: '35%',
    },
  ]

  return (
    <Document extendedHeader title="Patient Information" member={member}>
      <View>
        <Divider />
        <ClinicalSummaryTemplate clinicalData={clinicalData} />
        <SummaryInfo {...formData} />
        <Divider />
        <ConditionsTemplate conditions={conditions} />
        {!isInPatient && (
          <View>
            <Divider />
            <InterventionsTemplate interventions={interventions} />
            <Divider />
            <LabsAndVitalsTemplate
              labsAndVitalsData={labsAndVitalsData}
              columns={vitalsColumns}
            />
          </View>
        )}
      </View>
    </Document>
  )
}

export default OPGeneralTemplate
