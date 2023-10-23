import React, { useEffect, useState } from 'react'

import analytics from 'src/config/analytics'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import logError from 'src/utils/logging/logger'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import DataTable, { Column } from 'src/components/table/data-table'

const COLUMNS: Column[] = [
  { id: 'Date of appointment', label: 'Date', sortable: true, type: 'date' },
  { id: 'Primary Diagnosis', label: 'Primary Diagnosis' },
  { id: 'Plan', label: 'Plan' },
]

function Consultation() {
  const [consultationData, setconsultationData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(true)

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

    if (member?.antaraId) {
      getConsultation()
    }
  }, [member])

  const isReadyToShow = consultationData?.length >= 0 && !loading

  return (
    <div className="mb-ten">
      <p className="text-lg text-left mb-1">Clinical Consultation</p>
      {isReadyToShow && (
        <DataTable
          columns={COLUMNS}
          data={consultationData}
          defaultSortColumn="Date of appointment"
          title="Consultation Details"
          filterByDate
          dateColumnKey="Date of appointment"
          defaultFilterColumn="Date of appointment"
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
