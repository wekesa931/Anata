import React, { useEffect, useState } from 'react'

import analytics from 'src/config/analytics'
import airtableFetch from 'src/services/airtable/fetch'
import { useMember } from 'src/context/member'
import logError from 'src/utils/logging/logger'
import DataTable, { Column } from 'src/components/table/data-table'
import filterFields from 'src/utils/airtable/field-utils'
import { useRefreshTrigger } from 'src/context/refresh-trigger'
import ErrorRetry from 'src/components/feedbacks/error-retry'

const COLUMNS: Column[] = [
  { id: 'Date of Consultation', label: 'Date', sortable: true, type: 'date' },
  { id: 'Primary Diagnosis', label: 'Primary Diagnosis' },
  { id: 'Plan', label: 'Plan' },
]

function Consultation() {
  const [consultationData, setconsultationData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { refreshKey, setRefreshKey } = useRefreshTrigger()

  const getConsultation = async () => {
    const allowedFields = [
      'Temperature (C)',
      'Any Medication Allergies',
      'Plan',
      'Date of Consultation',
      'Please select the system(s) with a relevant finding',
      'Chief Complaint',
      'Assessment',
      'Secondary Diagnosis',
      'Interaction type',
      'Next appointment',
      'Were you able to conduct a Physical Examination?',
      'Primary Diagnosis',
      'Please write in any additional comments or observation you think are important',
      'PE GASTROINTESTINAL findings',
      'LMP',
      'Consultation Type',
      'Consultation type - billing',
      'Sick days required',
      'Appointments',
      'Minor',
      'Initial vs FU',
      'Summary',
      'Created',
      'Record ID (from Appointments)',
      'Status (from Appointments)',
      "Doctor's Name",
      'Kenya National ID Number (from Member)',
      'created_by',
      'PMH',
    ]
    try {
      setLoading(true)
      const memberConsultation = await airtableFetch(
        `clinicalconsultation/list?&filterByFormula=FIND("${
          member?.antaraId
        }", {Antara ID (from Member)})&${filterFields(allowedFields)}`
      )
      const mappedResponses = Object.keys(memberConsultation).map((key) => {
        const parent = memberConsultation[key]
        Object.keys(parent).forEach((pointer) => {
          if (
            Object.prototype.toString.call(parent[pointer]) === '[object Array]'
          )
            parent[pointer] = parent[pointer].join(',')
        })
        return parent
      })
      setconsultationData(mappedResponses)
    } catch (e: any) {
      logError(e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    analytics.track('Clinical Consultation Opened')

    if (member?.antaraId) {
      getConsultation()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  useEffect(() => {
    if (refreshKey.includes('Consultation')) {
      getConsultation()
    }

    // clean up, reset refreshKey
    return () => {
      if (setRefreshKey) {
        setRefreshKey('')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return error ? (
    <ErrorRetry retry={getConsultation} />
  ) : (
    <DataTable
      columns={COLUMNS}
      data={consultationData}
      defaultSortColumn="Date of Consultation"
      title="Consultation Details"
      loading={loading}
      loadingContext={
        refreshKey.includes('Consultation') ? refreshKey : undefined
      }
      filterByDate
      dateColumnKey="Date of Consultation"
      defaultFilterColumn="Date of Consultation"
    />
  )
}

export default Consultation
