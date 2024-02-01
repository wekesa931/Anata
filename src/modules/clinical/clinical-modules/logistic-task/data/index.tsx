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
  const [loading, setLoading] = useState(true)
  const { trackLogisticsPageOpen } = useLogisticTasksEvents()

  useEffect(() => {
    trackLogisticsPageOpen()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getLogisticTasks = (memberAntaraId: string) => {
      setLoading(true)
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
        airtableFetch(
          `logisticsTasks/list?filterByFormula=FIND("${memberAntaraId}", {Antara ID (from Members)})&${filterFields(
            allowedFields
          )}`
        ).then((response) => {
          const mappedResponses = Object.keys(response).map((key) => {
            const parent = response[key]
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
        })
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
