import React, { useState, createContext, useContext, useEffect } from 'react'
import { Member } from 'src/modules/member/db/models'
import { useMembersData } from 'src/modules/member/hooks/member-data'
import { logError } from 'src/utils/logging/logger'

type MemberContextType = {
  member: Member | null
  isLoading: boolean
}

const MemberContext = createContext<MemberContextType>({
  member: null,
  isLoading: false,
})

type Props = {
  children: React.ReactNode
  antaraId?: string
}

export function MemberProvider({ antaraId, children }: Props) {
  const [member, setMember] = useState<Member | null>(null)
  const {
    loading: isLoading,
    findMemberByAntaraId,
    hydrateMember,
  } = useMembersData()

  useEffect(() => {
    if (antaraId) {
      findMemberByAntaraId(antaraId)
        .then((newMember) => {
          if (newMember) {
            setMember(newMember)
            if (newMember.needsSync) {
              hydrateMember(newMember, antaraId)
                .then((hydratedMember) => {
                  setMember(hydratedMember)
                })
                .catch((err) => {
                  logError(err)
                  throw new Error(`Failed to hydrate member ${antaraId}`)
                })
            }
          } else {
            throw new Error(`Member with antaraId ${antaraId} not found`)
          }
        })
        .catch(logError)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])

  const providerValue = React.useMemo(
    () => ({ member, isLoading }),
    [member, isLoading]
  )

  return (
    <MemberContext.Provider value={providerValue}>
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
