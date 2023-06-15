import { useEffect, useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import logError from 'src/utils/logging/logger'
import useAnalytics from 'src/hooks/analytics'
import { useParams } from 'react-router-dom'

const useLabRequestEvents = () => {
  const { track } = useAnalytics('Lab Request')
  const trackLabRequestsOpen = () => {
    track('Lab Request Opened')
  }
  return { trackLabRequestsOpen }
}

const useLabData = () => {
  const [labData, setLabData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)
  const { antaraId } = useParams()

  const { trackLabRequestsOpen } = useLabRequestEvents()

  useEffect(() => {
    trackLabRequestsOpen()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getLab = async (memberAntaraId: string) => {
      setLoading(true)
      try {
        const memberLab = await airtableFetch(
          `labs/list?&filterByFormula=FIND("${memberAntaraId}", {Antara ID (from Members)})`
        )

        const mappedResponses = Object.keys(memberLab).map((key) => {
          const parent = memberLab[key]
          Object.keys(parent).forEach((pointer) => {
            if (Array.isArray(parent[pointer])) {
              parent[pointer] = parent[pointer].join(',')
            }
          })
          return parent
        })
        setLabData(mappedResponses)
      } catch (e) {
        logError(e)
      } finally {
        setLoading(false)
      }
    }
    if (antaraId) {
      getLab(antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])
  return { labData, loading }
}

export default useLabData
