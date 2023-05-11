import { useEffect, useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import logError from 'src/utils/logging/logger'
import useAnalytics from 'src/hooks/analytics'
import { useMember } from 'src/context/member'

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
  const { v2Member } = useMember()

  const { trackLabRequestsOpen } = useLabRequestEvents()

  useEffect(() => {
    trackLabRequestsOpen()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getLab = async (antaraId: string) => {
      setLoading(true)
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
      } catch (e) {
        logError(e)
      } finally {
        setLoading(false)
      }
    }
    if (v2Member) {
      getLab(v2Member?.antaraId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v2Member])
  return { labData, loading }
}

export default useLabData
