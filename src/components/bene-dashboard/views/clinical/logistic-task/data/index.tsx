import { useEffect, useState } from 'react'
import airtableFetch from '../../../../../../resources/airtable-fetch'
import logError from '../../../../../utils/error_handling/sentry'
import useAnalytics from '../../../../../../hooks/analytics.hook'
import { useMember } from '../../../../../../context/member.context'

const useLogisticTasksEvents = () => {
  const { track } = useAnalytics('Logistic Tasks')
  const trackLogisticsPageOpen = () => {
    track('Logistic Tasks Opened')
  }
  return { trackLogisticsPageOpen }
}

const useLogisticData = () => {
  const [logisticData, setLogisticData] = useState<any[]>([])
  const { v2Member } = useMember()

  const [loading, setLoading] = useState(true)
  const { trackLogisticsPageOpen } = useLogisticTasksEvents()

  useEffect(() => {
    trackLogisticsPageOpen()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getLogisticTasks = async (antaraId: string) => {
      try {
        const logisticTask = await airtableFetch(
          `logisticsTasks/list?&filterByFormula=FIND("${antaraId}", {Antara ID (from Members)})`
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
        setLoading(false)
      } catch (e) {
        logError(e)
      }
    }

    if (v2Member) {
      getLogisticTasks(v2Member?.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v2Member])
  return { logisticData, loading }
}

export default useLogisticData
