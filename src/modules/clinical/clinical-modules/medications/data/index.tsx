import { useEffect, useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import logError from 'src/utils/logging/logger'
import { useMember } from 'src/context/member'

const useMedicationData = () => {
  const [medicationsData, setMedicationsData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMedications = async (recId: string) => {
      setLoading(true)
      try {
        const medications = await airtableFetch(
          `medications/list?filterByFormula=FIND("${recId}", {Member Record ID})`
        )

        const mappedResponses = medications?.map((med: any) => {
          Object.entries(med).forEach(([k, v]) => {
            if (Array.isArray(v)) {
              med[k] = v.join(',')
            }
          })

          return med
        })
        setMedicationsData(mappedResponses)
      } catch (e) {
        logError(e)
      } finally {
        setLoading(false)
      }
    }

    if (member?.airtableRecordId) {
      getMedications(member?.airtableRecordId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.airtableRecordId])
  return { medicationsData, loading }
}

export default useMedicationData
