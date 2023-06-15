import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import { HMPType } from 'src/modules/member/types'
import { useEffect, useState } from 'react'

const useHmpData = () => {
  const { member } = useMember()
  const [hmpInfo, setHmpInfo] = useState<any[]>([])
  const [loading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (member) {
      const recId = member?.airtableRecordId

      const hmpURL = `hmp/list?filterByFormula=FIND("${recId}", {Member Record ID})`
      airtableFetch(hmpURL)
        .then((response) => {
          if (response) {
            const hmps: HMPType[] = []
            Object.keys(response).forEach((data: any) => {
              const hmpDay = response[data]['HMP Day']
              hmps.push({
                hmpSendDate: response[data]['HMP Send Date']?.toString(),
                hmpNumber: response[data]['HMP #']?.toString(),
                hmpDay: typeof hmpDay === 'string' ? hmpDay.toString() : null,
                hmpLink: response[data]['HMP Link']?.toString(),
                hmpState: response[data]['HMP State']?.toString(),
                hmpLastReviewDate:
                  response[data]['HMP last review date']?.toString(),
              })
            })
            setHmpInfo(hmps)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [member])

  return {
    hmpInfo,
    loading,
  }
}

export default useHmpData
