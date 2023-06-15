import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import { InterventionType } from 'src/modules/member/types'
import { useEffect, useState } from 'react'

const useInterventionData = () => {
  const { member } = useMember()
  const [intervention, setIntervention] = useState<any[]>([])
  const [loading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (member?.airtableRecordId) {
      setIsLoading(true)
      const recId = member.airtableRecordId

      const interventionUrl = `interventions/list?filterByFormula=FIND("${recId}", {Member Record ID})`
      airtableFetch(interventionUrl)
        .then((response) => {
          if (response) {
            const interventionData: InterventionType[] = []
            Object.keys(response).forEach((data: any) => {
              interventionData.push({
                intervention: response[data].Intervention?.toString(),
                milestoneAttainments:
                  response[data][
                    'last recorded milestone attainment'
                  ]?.toString(),
              })
            })
            setIntervention(interventionData)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [member])

  return {
    intervention,
    loading,
  }
}

export default useInterventionData
