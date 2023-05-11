import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import analytics from 'src/config/analytics'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'

type EventProperties = {
  user: string
  member: {
    antaraId: string
    fullName: string
  }
  eventName?: string
  timestamp: string
} & { [key: string]: unknown }

const useAnalytics = (eventCategory: string) => {
  const user = useUser()
  const { v2Member } = useMember()

  const [requiredProps, setRequiredProps] = useState<EventProperties | null>(
    null
  )

  useEffect(() => {
    if (user && v2Member) {
      setRequiredProps({
        user: user.email,
        member: {
          antaraId: v2Member?.antaraId,
          fullName: v2Member?.fullName,
        },
        timestamp: dayjs().format(),
      })
    }
  }, [user, v2Member])

  return {
    track: (eventName: string, properties?: Record<string, unknown>) => {
      const allProperties = { ...requiredProps, ...properties, eventName }
      analytics.track(eventCategory, allProperties)
    },
    page: (pageData?: Record<string, unknown>) => analytics.page(pageData),
  }
}

export default useAnalytics
