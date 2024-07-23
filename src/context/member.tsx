import React, { useState, createContext, useContext, useEffect } from 'react'
import { Member } from 'src/modules/member/db/models'
import { useMembersData } from 'src/modules/member/hooks/member-data'
import { logError } from 'src/utils/logging/logger'
import useForceUpdate from 'src/hooks/force-update'
import MemberNotSyncedToHNOS from 'src/components/feedbacks/member-not-synced'

type MemberContextType = {
  member: Member | null
  memberNotFound: boolean
  isLoading: boolean
}

const MemberContext = createContext<MemberContextType>({
  member: null,
  memberNotFound: false,
  isLoading: false,
})

type Props = {
  children: React.ReactNode
  antaraId?: string
}

export function MemberProvider({ antaraId, children }: Props) {
  const [member, setMember] = useState<Member | null>(null)
  const [memberNotFound, setMemberNotFound] = useState<boolean>(false)
  const {
    loading: isLoading,
    findMemberByAntaraIdFromLocalCache,
    hydrateMember,
  } = useMembersData()
  const memberNotSyncedToHNOS =
    !!member?.antaraId && !member?.airtableRecordId && !isLoading
  const forceUpdate = useForceUpdate()

  const refreshMember = () => {
    setMemberNotFound(false)
    // Load member from server and hydrate local cache
    if (antaraId) {
      hydrateMember(null, antaraId)
        .then((hydratedMember) => {
          setMember(hydratedMember)
        })
        .catch((err) => {
          logError(err)
          setMemberNotFound(true)
        })
    }
  }

  useEffect(() => {
    if (antaraId) {
      findMemberByAntaraIdFromLocalCache(antaraId)
        .then((newMember) => {
          if (newMember) {
            setMember(newMember)
          }

          if (newMember?.needsSync) {
            hydrateMember(newMember, antaraId)
              .then((hydratedMember) => {
                setMember(hydratedMember)
              })
              .catch((err) => {
                logError(err)
                throw new Error(`Failed to hydrate member ${antaraId}`)
              })
          } else {
            refreshMember()
          }
        })
        .catch(logError)
        .finally(() => {
          forceUpdate()
        })
    } else {
      setMember(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])

  useEffect(() => {
    const memberObserver$ = member?.observe().subscribe((updatedMember) => {
      setMember(updatedMember)
      /**
       * Force the component to re-render when the member is updated
       * Because we update member properties and react shallow comparison doesn't detect the change
       */
      forceUpdate()
    })

    return () => memberObserver$ && memberObserver$.unsubscribe()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const providerValue = {
    member,
    memberNotFound,
    isLoading: !member,
  }

  const showMemberNotSyncedToHNOSAlert = !!memberNotSyncedToHNOS && !!antaraId

  return (
    <MemberContext.Provider value={providerValue}>
      {showMemberNotSyncedToHNOSAlert && <MemberNotSyncedToHNOS />}
      {children}
    </MemberContext.Provider>
  )
}

export const useMember = () => {
  const context = useContext(MemberContext)
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider')
  }
  return context
}

export default MemberProvider
