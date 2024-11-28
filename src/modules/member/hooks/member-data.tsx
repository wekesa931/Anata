import { useDatabase } from '@nozbe/watermelondb/hooks'
import {
  MemberCohortType,
  RosterMemberType,
  V2MemberType,
} from 'src/modules/member/types'
import { CollectionType } from 'src/storage/types'
import { Collection, Q } from '@nozbe/watermelondb'
import { Member, createOrUpdateMember } from 'src/modules/member/db/models'
import {
  useGetMemberByAntaraId,
  normalizeMemberDetails,
  useMemberCohorts,
} from 'src/modules/member/services/member.api'
import { parseMemberCohort } from 'src/utils/data-transform'
import { transformRosterInsuranceData } from '../utils/data-transforms'

export const useMembersData = () => {
  const database = useDatabase()
  const membersCollection: Collection<Member> = database.collections.get(
    CollectionType.MEMBERS
  )
  const { getData, loading } = useGetMemberByAntaraId()

  const {
    fetchMemberCohorts,
    fetchProspectiveMemberCohorts,
    loading: loadingCohorts,
  } = useMemberCohorts()

  const createDefaultMemberInstance = async (
    rosterMember?: RosterMemberType,
    principalInsuranceId?: string
  ) => {
    const [firstName, middleName, lastName] =
      rosterMember?.fullName?.split(' ') || []

    const insuranceData = transformRosterInsuranceData(
      rosterMember,
      principalInsuranceId
    )
    return database.write(async () => {
      return membersCollection.create((member) => {
        member.firstName = firstName || ''
        member.middleName = middleName || ''
        member.lastName = lastName || ''
        member.isSynced = false
        member.birthDate = rosterMember?.birthDate
        member.email = rosterMember?.email
        member.emergencyContact = {
          name: rosterMember?.emergencyContactName,
          phoneNumber: rosterMember?.emergencyContactPhone,
          relationship: rosterMember?.emergencyContactRelationship,
        }
        member.setInitialPhone(rosterMember?.phoneNumber || '')
        member.sex = rosterMember?.sex
        member.insurances = insuranceData
        member.tags = rosterMember?.tags?.split(',')
        member.membercohortSet = rosterMember?.memberCohort
      })
    })
  }

  const createMemberInstance = async (
    member: Member | null,
    memberData: V2MemberType,
    memberCohorts: MemberCohortType[]
  ) => {
    if (!member) {
      return database.write(async () => {
        return membersCollection.create((m) => {
          return createOrUpdateMember(m, memberData, memberCohorts)
        })
      })
    }
    // update the member
    return database.write(async () => {
      return member.update((m) => {
        return createOrUpdateMember(m, memberData, memberCohorts)
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
    const { data: cohortData } = await fetchMemberCohorts(antaraId)
    const memberCohorts = parseMemberCohort(
      cohortData?.memberCohorts?.edges?.map((m: any) => m.node)
    )

    const memberData = normalizeMemberDetails(data)

    if (memberData) {
      return createMemberInstance(member, memberData, memberCohorts)
    }

    throw new Error(`Failed to load member ${antaraId}`)
  }

  const findMemberByAntaraIdFromLocalCache = async (antaraId: string) => {
    const currentMember = await membersCollection
      .query(Q.where('antaraId', antaraId), Q.take(1))
      .fetch()

    if (currentMember.length) {
      return currentMember[0]
    }
    return null
  }
  const prospectiveMemberCohorts = async (antaraId: string) => {
    const { data } = await fetchProspectiveMemberCohorts(antaraId)

    const prospectiveCohorts =
      data?.prospectiveBillingSchemesForMember?.edges.map(
        (edge: any) => edge.node
      ) || []

    return prospectiveCohorts || []
  }

  return {
    createMemberInstance,
    createDefaultMemberInstance,
    findMemberByAntaraIdFromLocalCache,
    hydrateMember,
    loading: loading || loadingCohorts,
    membersCollection,
    prospectiveMemberCohorts,
  }
}
