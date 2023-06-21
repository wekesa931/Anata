import { useDatabase } from '@nozbe/watermelondb/hooks'
import { V2MemberType } from 'src/modules/member/types'
import { CollectionType } from 'src/storage/types'
import { Collection, Q } from '@nozbe/watermelondb'
import { Member, createOrUpdateMember } from 'src/modules/member/db/models'
import {
  useGetMemberByAntaraId,
  normalizeMemberDetails,
} from 'src/modules/member/services/member.api'

export const useMembersData = () => {
  const database = useDatabase()
  const membersCollection: Collection<Member> = database.collections.get(
    CollectionType.MEMBERS
  )
  const { getData, loading } = useGetMemberByAntaraId()

  const createDefaultMemberInstance = async () => {
    return database.write(async () => {
      return membersCollection.create((member) => {
        member.firstName = ''
        member.lastName = ''
        member.isSynced = false
      })
    })
  }

  const createMemberInstance = async (
    member: Member | null,
    memberData: V2MemberType
  ) => {
    if (!member) {
      return database.write(async () => {
        return membersCollection.create((m) => {
          return createOrUpdateMember(m, memberData)
        })
      })
    }
    // update the member
    return database.write(async () => {
      return member.update((m) => {
        return createOrUpdateMember(m, memberData)
      })
    })
  }

  const hydrateMember = async (member: Member | null, antaraId: string) => {
    // load from API and hydrate
    const { data } = await getData({
      variables: {
        antaraId,
      },
      context: {
        clientName: 'v2',
      },
    })
    const memberData = normalizeMemberDetails(data)
    if (memberData) {
      return createMemberInstance(member, memberData)
    }

    return null
  }

  const findMemberByAntaraId = async (antaraId: string) => {
    const currentMember = await membersCollection
      .query(Q.where('antaraId', antaraId), Q.take(1))
      .fetch()

    if (currentMember.length) {
      return currentMember[0]
    }

    const member = await hydrateMember(null, antaraId)
    if (member) {
      return member
    }

    return null
  }

  return {
    createMemberInstance,
    createDefaultMemberInstance,
    findMemberByAntaraId,
    hydrateMember,
    loading,
  }
}
