import { useEffect, useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import logError from 'src/utils/logging/logger'
import useAnalytics from 'src/hooks/analytics'
import { useParams } from 'react-router-dom'
import { useMember } from 'src/context/member'

const useLogisticTasksEvents = () => {
  const { track } = useAnalytics('Logistic Tasks')
  const trackLogisticsPageOpen = () => {
    track('Logistic Tasks Opened')
  }
  return { trackLogisticsPageOpen }
}

const useLogisticData = () => {
  const [logisticData, setLogisticData] = useState<any[]>([])
  const { member } = useMember()
  const [loading, setLoading] = useState(true)
  const { trackLogisticsPageOpen } = useLogisticTasksEvents()

  useEffect(() => {
    trackLogisticsPageOpen()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getLogisticTasks = async (memberAntaraId: string) => {
      setLoading(true)
      try {
        const logisticTask = await airtableFetch(
          `logisticsTasks/list?&filterByFormula=FIND("${memberAntaraId}", {Antara ID (from Members)})`
        )

        const mappedResponses = Object.keys(logisticTask).map((key) => {
          const parent = logisticTask[key]
          Object.keys(parent).forEach((pointer) => {
            if (
              Object.prototype.toString.call(parent[pointer]) ===
              '[object Array]'
            )
              parent[pointer] = parent[pointer].join(',')
          })
          return parent
        })
        setLogisticData(mappedResponses)
      } catch (e) {
        logError(e)
      } finally {
        setLoading(false)
      }
    }

    if (member?.antaraId) {
      getLogisticTasks(member?.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])
  return { logisticData, loading }
}

export default useLogisticData
