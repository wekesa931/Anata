import { useEffect, useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import logError from 'src/utils/logging/logger'
import useAnalytics from 'src/hooks/analytics'
import { useMember } from 'src/context/member'
import filterFields from 'src/utils/airtable/field-utils'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { trackLogisticsPageOpen } = useLogisticTasksEvents()

  useEffect(() => {
    trackLogisticsPageOpen()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getLogisticTasks = async (memberAntaraId: string) => {
    try {
      const allowedFields = [
        'Best location',
        'Contact',
        'Created',
        'Data Source',
        'Days between creation and due time',
        'Due date',
        'Full Address (from Members)',
        'Geolocation (from Members)',
        'Google map route',
        'Last Modified',
        'Last status modified',
        'Missed',
        'Missed by',
        'Name (from Creator)',
        'Notes',
        'Priority',
        'Status',
        'Supervisor Map',
        'Time',
        'Type',
        'updated_by',
        'Field notes',
      ]

      const response = await airtableFetch(
        `logisticsTasks/list?filterByFormula=FIND("${memberAntaraId}", {Antara ID (from Members)})&${filterFields(
          allowedFields
        )}`
      )
      setLoading(true)
      setError(null)
      const mappedResponses = Object.keys(response).map((key) => {
        const parent = response[key]
        Object.keys(parent).forEach((pointer) => {
          if (
            Object.prototype.toString.call(parent[pointer]) === '[object Array]'
          )
            parent[pointer] = parent[pointer].join(',')
        })
        return parent
      })
      setLogisticData(mappedResponses)
    } catch (e: any) {
      logError(e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const refreshLogisticData = async () => {
    if (member?.antaraId) {
      getLogisticTasks(member?.antaraId)
    }
  }

  useEffect(() => {
    if (member?.antaraId) {
      setLoading(true)
      getLogisticTasks(member?.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])
  return { logisticData, loading, setLoading, refreshLogisticData, error }
}

export default useLogisticData
