import React from 'react'
import type { Member } from 'src/modules/member/db/models'
import LabsAndVitalsTemplate from 'src/modules/udm/views/reports/templates/labs-and-vitals'
import Document from 'src/modules/udm/components/pdf-components/document'
import { Divider } from 'src/modules/udm/components/pdf-components/divider'
import { View } from '@react-pdf/renderer'
import { SummaryInfo } from 'src/modules/udm/components/pdf-components/summary-info'

type Props = {
  member: Member | null
  labsAndVitalsData: {
    labs: any[]
    vitals: any[]
  }
  formData: any
}

function MedicalCampTemplate({ member, formData, labsAndVitalsData }: Props) {
  const columns = [
    { name: 'Name', dataIndex: 'name', width: '30%' },
    { name: 'Actual Reading', dataIndex: 'Actual Reading', width: '30%' },
    { name: 'Normal Range', dataIndex: 'Normal Range', width: '40%' },
  ]

  return (
    <Document
      member={member}
      title="Health Check Report"
      extendedHeader={false}
    >
      <View>
        <Divider />
        <LabsAndVitalsTemplate
          labsAndVitalsData={labsAndVitalsData}
          columns={columns}
        />
        <SummaryInfo {...formData} />
      </View>
    </Document>
  )
}

export default MedicalCampTemplate
