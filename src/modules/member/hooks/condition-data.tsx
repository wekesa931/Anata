import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import { ConditionType } from 'src/modules/member/types'
import { useEffect, useState } from 'react'

const useConditionData = () => {
  const { member } = useMember()
  const [condition, setCondition] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (member?.airtableRecordId) {
      setLoading(true)
      const recId = member.airtableRecordId

      const conditionUrl = `conditions/list?filterByFormula=FIND("${recId}", {Member Record ID})`
      airtableFetch(conditionUrl)
        .then((response) => {
          if (response) {
            const conditionData: ConditionType[] = []
            Object.keys(response).forEach((data: any) => {
              conditionData.push({
                condition: response[data].Condition?.toString(),
                startingClinicalStatus:
                  response[data]['Starting clinical status']?.toString(),
                healthStatus:
                  response[data]['Health Status (from Member)']?.toString(),
              })
            })
            setCondition(conditionData)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [member])

  return {
    condition,
    loading,
  }
}

export default useConditionData
