import React, { useEffect, useState } from 'react'

import analytics from '../../../../helpers/segment'
import Table from '../../../utils/table/table.component'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useMember } from '../../../../context/member.context'
import logError from '../../../utils/Bugsnag/Bugsnag'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

function Consultation() {
  const [consultationData, setconsultationData] = useState<any[]>([])
  const { member } = useMember()
  const antaraId = member['Antara ID']
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
      } catch (e) {
        logError(e)
      }
    }
    getConsultation()
  }, [antaraId])
  const isReadyToShow = consultationData?.length >= 0 && !loading

  return (
    <div className="mb-ten">
      <h4>Clinical Consultation</h4>
      {isReadyToShow && (
        <Table
          title="Consultation Details"
          columns={columns}
          data={consultationData}
          dateColumnKey="Date of appointment"
        />
      )}

      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small"> Loading Clinical Consultation </p>
        </div>
      )}
    </div>
  )
}

export default Consultation
