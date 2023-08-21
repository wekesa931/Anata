import { useEffect, useState } from 'react'
import logError from 'src/utils/logging/logger'
import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'

const useMemberTaskData = () => {
  const [memberTaskData, setmemberTaskData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMemberTasks = async (recId: string) => {
      setLoading(true)
      try {
        const memberTask = await airtableFetch(
          `memberTask/list?filterByFormula=FIND("${recId}", {Member Record ID})`
        )

        const mappedResponses = memberTask?.map((task: any) => {
          Object.keys(task).forEach((value) => {
            if (Array.isArray(value)) task[value] = task[value].join(',')
          })
          return task
        })
        setmemberTaskData(mappedResponses)
      } catch (e) {
        logError(e)
      } finally {
        setLoading(false)
      }
    }

    if (member?.airtableRecordId) {
      getMemberTasks(member?.airtableRecordId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.airtableRecordId])
  return { memberTaskData, loading }
}

export default useMemberTaskData
