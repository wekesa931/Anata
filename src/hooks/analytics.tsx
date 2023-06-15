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
  const { member } = useMember()

  const [requiredProps, setRequiredProps] = useState<EventProperties | null>(
    null
  )

  useEffect(() => {
    if (user && member) {
      setRequiredProps({
        user: user.email,
        member: {
          antaraId: member?.antaraId,
          fullName: member?.fullName,
        },
        timestamp: dayjs().format(),
      })
    }
  }, [user, member])

  return {
    track: (eventName: string, properties?: Record<string, unknown>) => {
      const allProperties = { ...requiredProps, ...properties, eventName }
      analytics.track(eventCategory, allProperties)
    },
    page: (pageData?: Record<string, unknown>) => analytics.page(pageData),
  }
}

export default useAnalytics
