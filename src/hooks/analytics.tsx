import analytics from 'src/config/analytics'
import { useUser } from 'src/context/user'
import { Member } from 'src/modules/member/db/models'
import { User } from 'src/types/user'
import { useEffect } from 'react'

type EventProperties = {
  staff: any
  eventName?: string
} & { [key: string]: unknown }

export const useAnalytics = (object?: string) => {
  const user = useUser()

  const requiredProps: EventProperties | null = user
    ? {
        staff: user,
      }
    : null

  useEffect(() => {
    return () => {
      // reset to avoid detatched nodes
      analytics.reset()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return {
    track: (action: string, properties?: Record<string, unknown>) => {
      if (requiredProps) {
        const allProperties: EventProperties = {
          ...requiredProps,
          ...properties,
        }

        analytics.track(`${object} ${action}`, allProperties)
      }
    },
    page: (pageData?: Record<string, unknown>) => analytics.page(pageData),

    // eslint-disable-next-line no-underscore-dangle
    identifyMember: (member: Member) => {
      // eslint-disable-next-line no-underscore-dangle
      analytics.identify(member?.antaraId, member?._raw)
    },
    identifyUser: (staff: User) => analytics.identify(staff?.email, staff),
  }
}

export default useAnalytics
