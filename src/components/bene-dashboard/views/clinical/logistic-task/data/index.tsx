import { useEffect, useState } from 'react'
import airtableFetch from '../../../../../../resources/airtable-fetch'
import logError from '../../../../../utils/error_handling/sentry'
import useAnalytics from '../../../../../../hooks/analytics.hook'

const useLogisticTasksEvents = () => {
  const { track } = useAnalytics('Logistic Tasks')
  const LogisticTasksOpen = () => {
    track('Logistic Tasks Opened')
  }
  return { LogisticTasksOpen }
}

const useLogisticData = (antaraId: string | undefined) => {
  const [logisticData, setLogisticData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const { LogisticTasksOpen } = useLogisticTasksEvents()

  useEffect(() => {
    LogisticTasksOpen()
    const getLogisticTasks = async () => {
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
    getLogisticTasks()
  }, [antaraId, LogisticTasksOpen])
  return { logisticData, loading }
}

export default useLogisticData
