import React, { useEffect, useState } from 'react'

import analytics from '../../../../helpers/segment'
import Table from '../../../utils/table/table.component'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useMember } from '../../../../context/member.context'
import logError from '../../../utils/Bugsnag/Bugsnag'

const Consultation = () => {
  const [consultationData, setconsultationData] = useState<any[]>([])
  const { member } = useMember()
  const antaraId = member['Antara ID']
  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Date of appointment',
    },
    { name: 'Primary Diagnosis', format: '', key: 'Primary Diagnosis' },
  ]

  useEffect(() => {
    analytics.track('Clinical Consultation Opened')
    const getConsultation = async () => {
      try {
        const memberConsultation = await airtableFetch(
          `clinicalconsultation/list?&filterByFormula=FIND("${antaraId}", {Antara ID (from Member)})`
        )
        const mappedResponses = Object.keys(memberConsultation).map((key) => {
          const parent = memberConsultation[key]
          Object.keys(parent).forEach((pointer) => {
            if (
              Object.prototype.toString.call(parent[pointer]) ===
              '[object Array]'
            )
              parent[pointer] = parent[pointer].join(',')
          })
          return parent
        })
        setconsultationData(mappedResponses)
      } catch (e) {
        logError(e)
      }
    }
    getConsultation()
  }, [antaraId])

  return (
    <div className="mb-ten">
      <h4>Clinical Consultation</h4>
      <Table
        title="Consultation Details"
        columns={columns}
        data={consultationData}
        dateColumnKey="Date of appointment"
      />
    </div>
  )
}

export default Consultation
