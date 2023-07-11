import React, { useEffect, useState } from 'react'

import analytics from 'src/config/analytics'
import Table from 'src/components/table'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import logError from 'src/utils/logging/logger'
import LoadingIcon from 'src/assets/img/icons/loading.svg'

function Consultation() {
  const [consultationData, setconsultationData] = useState<any[]>([])
  const { member } = useMember()
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
          `clinicalconsultation/list?&filterByFormula=FIND("${member?.antaraId}", {Antara ID (from Member)})`
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

    if(member?.antaraId) {
      getConsultation()
    }

  }, [member])

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
          filterByDate
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
