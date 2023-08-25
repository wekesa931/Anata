import { V2MemberQueryType, V2MemberType } from 'src/modules/member/types'
import { getAgeFull } from 'src/utils/date-time/helpers'

const getSexAccronym = (sex: string) => {
  if (sex?.toLowerCase() === 'male') return 'M'
  if (sex?.toLowerCase() === 'female') return 'F'
  return ''
}

/**
 * Extract member details from graphql response structure
 */
export const parseV2MemberData = (
  memberData: V2MemberQueryType
): V2MemberType | null => {
  if (!memberData) {
    return null
  }

  let member: any = {}
  const birthDate = memberData?.birthDate || ''
  member.antaraId = memberData?.antaraId
  member.birthDate = birthDate

  // details information
  const { details = {} } = memberData
  member = { ...member, ...details }

  const sex = details?.sex?.sex || ''
  member.sex = sex
  member.maritalStatus = details?.maritalStatus?.maritalStatus

  // phones
  const { phones = [] } = memberData
  const primaryPhoneDetails = phones.length
    ? { phone: phones[0].phone, phoneType: phones[0].phoneType?.phoneType }
    : {}
  const { phone, phoneType } = primaryPhoneDetails

  member.phone = phone
  member.phoneType = phoneType
  member.phones = phones.map((e: any) => ({
    phone: e.phone,
    phoneType: e.phoneType?.phoneType,
    priority: e.priority,
  }))

  // status
  const { status = {} } = memberData
  member = { ...member, ...status }

  member.employer = {
    name: status?.employer?.name,
    department: status?.department,
    businessLocation: status?.businessLocation,
  }
  member.onboardStage = status?.onboardStage?.onboardStage
  member.status = status?.status?.status
  member.assignedMe = status?.assignedMeEmailUsername
  member.assignedHn = status?.assignedHnEmailUsername
  member.refusedServices = status?.refusedServices

  // contacts
  const { contact = {} } = memberData
  member = { ...member, ...contact }

  // insurance details
  const { insuranceDetails = {} } = memberData
  member = { ...member, insuranceDetails }

  // dependents and primary
  const { otherDependents = [], primary = null, dependents = [] } = memberData
  if (primary) {
    member = {
      ...member,
      primary: parseV2MemberData(primary),
    }
  }

  if (otherDependents.length) {
    member = {
      ...member,
      otherDependents: otherDependents.map((e: any) => parseV2MemberData(e)),
    }
  }

  if (dependents.length) {
    member = {
      ...member,
      dependents: dependents.map((e: any) => parseV2MemberData(e)),
    }
  }
  const rosterMember = memberData?.rosterMember

  const fullName = details?.fullName
  const age = getAgeFull(birthDate)

  const employerName = status?.employer?.name || ''

  const displayName = `${fullName} (${
    memberData?.antaraId
  }) - ${age} [${getSexAccronym(sex || '')}] - ${employerName}`

  return {
    ...member,
    displayName,
    fullName,
    age,
    employerName,
    airtableRecordId: details?.airtableRecordId,
    rosterMember,
  }
}
