import {
  V2MemberQueryType,
  V2MemberType,
  PayorQueryType,
  PayorType,
  MemberCohortType,
  MemberCohortQueryType,
} from 'src/modules/member/types'
import { getAgeFull } from 'src/utils/date-time/helpers'

const getSexAccronym = (sex: string) => {
  if (sex?.toLowerCase() === 'male') return 'M'
  if (sex?.toLowerCase() === 'female') return 'F'
  return ''
}

const parsePayor = (payor: PayorQueryType): PayorType => {
  return {
    name: payor?.payorName,
    key: payor?.payorKey,
    phone: payor?.payorPhone,
    type: payor?.payorType?.payorType,
    status: payor?.payorStatus?.payorStatus,
  }
}

export const parseMemberCohort = (
  cohort: MemberCohortQueryType[]
): MemberCohortType[] => {
  return cohort?.map((c) => ({
    name: c?.name,
    billingStartedAt: c?.billingStartedAt,
    skuRate: c?.skuRate,
    billingFrequency: c?.billingFrequency,
    subscriptionStatus: c?.subscriptionStatus,
    isOptInRequired: c?.isOptInRequired,
    optedInAt: c?.optedInAt,
    optedOutAt: c?.optedOutAt,
    nextBilledAt: c?.nextBilledAt,
    billingMethod: c?.billingMethod,
    activatedAt: c?.activatedAt,
    activatedBy: c?.activatedBy,
    pausedAt: c?.pausedAt,
    pausedBy: c?.pausedBy,
    cancelledAt: c?.cancelledAt,
    cancelledBy: c?.cancelledBy,
    remarks: c?.remarks,
    billingEvents: c?.billingEvents,
    revenueModelName: c?.revenueModelName,
  }))
}

export const parseSearchData = (memberData: V2MemberQueryType) => {
  const details = memberData.details || {}
  const status = memberData.status || { employer: { name: '' } }
  const birthDate = memberData?.birthDate || ''
  const sex = details?.sex?.sex || ''

  const fullName = details?.fullName
  const age = getAgeFull(birthDate)

  const employerName = status?.employer?.name || ''
  const displayName = `${fullName} (${
    memberData?.antaraId
  }) - ${age} [${getSexAccronym(sex || '')}] - ${employerName}`

  return {
    displayName: displayName,
    antaraId: memberData?.antaraId,
  }
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
  member.healthStatus = memberData?.healthStatus

  // details information
  const { details = {} } = memberData
  member = { ...member, ...details }

  const sex = details?.sex?.sex || ''
  member.sex = sex
  member.maritalStatus = details?.maritalStatus?.maritalStatus
  member.kenyaNationalId = details?.kenyaNationalId

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
    lastUsedToAccessApp: e.lastUsedToAccessApp,
  }))

  // status
  const status: any = memberData?.status || {}
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

  const payor: PayorQueryType = memberData?.payor || {}

  return {
    ...member,
    displayName,
    fullName,
    age,
    employerName,
    airtableRecordId: details?.airtableRecordId,
    rosterMember,
    payor: parsePayor(payor),
  }
}

export const removeEmptyValues = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmptyValues(obj[key])
    else if (obj[key] === undefined || obj[key] === null || obj[key] === '')
      delete obj[key]
  })
  return obj
}
