import { useEffect, useState } from 'react'
import airtableFetch from '../../../../../../resources/airtable-fetch'
import logError from '../../../../../utils/error_handling/sentry'
import useAnalytics from '../../../../../../hooks/analytics.hook'

const useLabRequestEvents = () => {
  const { track } = useAnalytics('Lab Request')
  const LabReqOpen = () => {
    track('Lab Request Opened')
  }
  return { LabReqOpen }
}

const useLabData = (antaraId: string | undefined) => {
  const [labData, setLabData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const { LabReqOpen } = useLabRequestEvents()

  useEffect(() => {
    LabReqOpen()
    const getLab = async () => {
      try {
        const memberLab = await airtableFetch(
          `labs/list?&filterByFormula=FIND("${antaraId}", {Antara ID (from Members)})`
        )

        const mappedResponses = Object.keys(memberLab).map((key) => {
          const parent = memberLab[key]
          Object.keys(parent).forEach((pointer) => {
            if (
              Object.prototype.toString.call(parent[pointer]) ===
              '[object Array]'
            )
              parent[pointer] = parent[pointer].join(',')
          })
          return parent
        })
        setLabData(mappedResponses)
        setLoading(false)
      } catch (e) {
        logError(e)
      }
    }
    getLab()
  }, [antaraId, LabReqOpen])
  return { labData, loading }
}

export default useLabData
