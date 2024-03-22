import { Model } from '@nozbe/watermelondb'
import { text, json, field, writer, date } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import {
  PhoneType,
  V2MemberType,
  DbValueTypes as DbTypes,
  InsuranceVerificationStatus,
  EmployerType,
  RosterMemberType,
  PayorType,
} from 'src/modules/member/types'
import dayjs from 'dayjs'
import {
  transformAddressData,
  transformInsuranceData,
} from 'src/modules/member/utils/data-transforms'
import { calcAge } from 'src/utils/date-time/date-formatters'

type AddressValues = DbTypes.AddressValues
type InsuranceDetailsValues = DbTypes.InsuranceDetailsValues

const identityJson = (data: any) => data
const sanitizeTags = (data: any) =>
  Array.isArray(data) ? data.map(String) : []
const sanitizeRefusedServices = (data: any) =>
  Array.isArray(data) ? data.map(String) : []

type EmergencyContact = {
  name?: string
  phoneNumber?: string
  relationship?: string
}

type AssignedStaff = {
  fullName?: string
  emailUsername?: string
  atRecordId?: string
}

type CaregiverContact = {
  name?: string
  phoneNumber?: string
  relationship?: string
}

const getStaff = (data: any): AssignedStaff => {
  return {
    fullName: data?.fullName,
    emailUsername: data?.emailUsername,
    atRecordId: data?.atRecordId,
  }
}

const mergeEmergencyContact = (member: Member, memberData: V2MemberType) => {
  return {
    name: memberData.emergencyContactName || member.emergencyContact?.name,
    phoneNumber:
      memberData.emergencyContactPhone || member.emergencyContact?.phoneNumber,
    relationship:
      memberData.emergencyContactRelationship ||
      member.emergencyContact?.relationship,
  }
}

const mergeInsuranceDetails = (member: Member, memberData: V2MemberType) => {
  if (memberData?.insuranceDetails?.length) {
    return transformInsuranceData(memberData)
  }

  return member.insurances
}

const mergeCaregiverContact = (member: Member, memberData: V2MemberType) => {
  return {
    name: memberData.caregiverName || member.caregiverContact?.name,
    phoneNumber:
      memberData.caregiverNumber || member.caregiverContact?.phoneNumber,
  }
}

type MemberInfo = Partial<Record<keyof Member, any>>

export const createOrUpdateMember = (
  member: Member,
  memberData: V2MemberType
) => {
  member.antaraId = memberData?.antaraId
  member.firstName = memberData?.firstName
  member.lastName = memberData?.lastName
  member.middleName = memberData?.middleName
  member.email = memberData?.email || member.email
  member.phone = memberData?.phone || member.phone
  member.phones = memberData?.phones?.length ? memberData.phones : member.phones
  member.birthDate = memberData?.birthDate
  member.tags = memberData.tags || member.tags
  member.refusedServices = memberData.refusedServices || member.refusedServices
  member.otherRefusedService =
    memberData.otherRefusedService || member.otherRefusedService
  member.maritalStatus = memberData.maritalStatus
  member.emergencyContact = mergeEmergencyContact(member, memberData)
  member.addresses = transformAddressData(
    memberData.memberAddresses || [],
    memberData?.antaraId || ''
  )
  member.insurances = mergeInsuranceDetails(member, memberData)
  member.employer = memberData.employer || member.employer
  member.isSynced = true
  member.primary = memberData?.primary
  member.dependents = memberData?.dependents
  member.otherDependents = memberData?.otherDependents
  member.sex = memberData?.sex
  member.displayName = memberData?.displayName
  member.airtableRecordId = memberData?.airtableRecordId
  member.intercomUrl = memberData?.intercomUrl
  member.assignedHn = getStaff(memberData?.assignedHnObject)
  member.assignedMe = getStaff(memberData?.assignedMeObject)
  member.assignedNutritionist = getStaff(memberData?.assignedNutritionistObject)

  member.onboardStage = memberData?.onboardStage
  member.status = memberData?.status
  member.lastSyncedAt = new Date().getTime()

  member.verificationStatus = memberData?.verificationStatus
  member.rosterMember = memberData?.rosterMember
  member.referralSource = memberData?.referralSource
  member.payor = memberData?.payor
  member.kenyaNationalId = memberData?.kenyaNationalId
  member.caregiverContact = mergeCaregiverContact(member, memberData)
  member.nhifNumber = memberData?.nhifNumber

  return member
}

export class Member extends Model {
  static table = CollectionType.MEMBERS

  @text('antaraId') antaraId!: string

  @text('first_name') firstName?: string

  @text('last_name') lastName?: string

  @text('middle_name') middleName?: string

  @text('email') email?: string

  @text('sex') sex?: string

  @text('phone') phone?: string

  @json('phones', identityJson) phones?: PhoneType[]

  @text('birth_date') birthDate?: string

  @json('tags', sanitizeTags) tags?: string[]

  @json('refused_services', sanitizeRefusedServices) refusedServices?: string[]

  @text('marital_status') maritalStatus?: string

  @json('emergency_contact', identityJson) emergencyContact?: EmergencyContact

  @json('addresses', identityJson) addresses?: AddressValues

  @json('insurances', identityJson) insurances?: InsuranceDetailsValues

  @json('employer', identityJson) employer?: EmployerType

  @field('is_synced') isSynced!: boolean

  @text('airtableRecordId') airtableRecordId?: string

  @json('dependents', identityJson) dependents?: V2MemberType[]

  @json('primary', identityJson) primary?: V2MemberType

  @json('other_dependents', identityJson) otherDependents?: V2MemberType[]

  @json('roster_member', identityJson) rosterMember?: RosterMemberType

  @text('display_name') displayName?: string

  @text('intercom_url') intercomUrl?: string

  @json('assigned_hn', identityJson) assignedHn?: AssignedStaff

  @json('assigned_me', identityJson) assignedMe?: AssignedStaff

  @json('assigned_nutritionist', identityJson)
  assignedNutritionist?: AssignedStaff

  @text('onboard_stage') onboardStage?: string

  @text('status') status?: string

  @text('verification_status') verificationStatus?: string

  @date('last_synced_at') lastSyncedAt?: number

  @text('referral_source') referralSource?: string

  @text('other_refused_service') otherRefusedService?: string

  @json('payor', identityJson) payor?: PayorType

  @text('kenya_national_id') kenyaNationalId?: string

  @json('caregiver_contact', identityJson) caregiverContact?: CaregiverContact

  @text('nhif_number') nhifNumber?: string

  @writer async destroy() {
    await super.destroyPermanently()
  }

  @writer async updateMember(memberInfo: MemberInfo) {
    return this.update(() => {
      Object.keys(memberInfo).forEach((key) => {
        ;(this as any)[key] = (memberInfo as any)[key]
        this.isSynced = true
      })
    })
  }

  get fullName() {
    return `${this.firstName} ${this.middleName || ''} ${this.lastName}`
  }

  get allPhones() {
    const currentMemberPhones =
      this.phones?.map((p, index) => ({
        name: this.fullName,
        phone: p.phone,
        label: `Phone ${index + 1}`,
      })) || []
    const primaryMemberPhones =
      this.primary?.phones?.map((p, index) => ({
        name: this.primary?.fullName,
        phone: p.phone,
        label: `Primary phone ${index + 1}`,
      })) || []
    const otherDependentsPhones =
      this.otherDependents?.map((d) =>
        d?.phones?.map((p) => ({
          name: d?.fullName,
          phone: p.phone,
          label: 'Dependent',
        }))
      ) || []

    return [
      ...currentMemberPhones,
      ...primaryMemberPhones,
      ...otherDependentsPhones.flat(),
      {
        name: this.emergencyContact?.name,
        phone: this.emergencyContact?.phoneNumber,
        label: 'Emergency contact',
      },
      {
        name: this.caregiverContact?.name,
        phone: this.caregiverContact?.phoneNumber,
        label: 'Caregiver contact',
      },
    ]
  }

  get isMinor() {
    return dayjs().diff(this.birthDate, 'year') < 18
  }

  get insuranceDetails() {
    return this.insurances?.insurances || []
  }

  get homeAddress() {
    return this.addresses?.addresses?.find(
      (address: any) => address?.addressLabel?.toLowerCase() === 'home'
    )
  }

  get hasPrimary() {
    return !!this.primary
  }

  get otherAddresses() {
    return this.addresses?.addresses?.filter(
      (address: any) => address?.addressLabel?.toLowerCase() !== 'home'
    )
  }

  get hasAddress() {
    return !!this.homeAddress || !!this.otherAddresses?.length
  }

  get emergencyContactDisplay() {
    return `${this.emergencyContact?.name || '-'}, ${
      this.emergencyContact?.phoneNumber || '-'
    }, ${this.emergencyContact?.relationship || '-'}`
  }

  get primaryInsuranceId() {
    return this.insuranceDetails?.find((insurance) => insurance?.priority === 0)
      ?.insuranceId
  }

  get primaryInsuranceCompany() {
    return this.insuranceDetails?.find((insurance) => insurance?.priority === 0)
      ?.insuranceCompany
  }

  get needsInsurancePreffil() {
    return !this.primaryInsuranceCompany
  }

  get needsSync() {
    return (
      !this.isSynced ||
      dayjs().diff(dayjs(this.lastSyncedAt), 'minutes') >= 30 ||
      !this.lastSyncedAt
    )
  }

  get ageFull() {
    return calcAge(this.birthDate) || []
  }

  get caregiverContactDisplay() {
    return `${this.caregiverContact?.name || '-'}, ${
      this.caregiverContact?.phoneNumber || '-'
    }`
  }

  @writer async reset() {
    // reset all the properties to their default values
    await this.update((member) => {
      createOrUpdateMember(member, {} as V2MemberType)
    })
  }

  @writer async setInitialPhone(phone: string) {
    await this.update((member) => {
      member.phone = phone
      member.phones = [{ phone, phoneType: 'Unknown', priority: 0 }]
    })
  }

  get hasAnyRejectedInsurance() {
    return (
      this.insuranceDetails?.length === 0 ||
      this.insuranceDetails?.some(
        (insurance) =>
          insurance?.verificationStatus === InsuranceVerificationStatus.REJECTED
      )
    )
  }

  get hasMissingPhone() {
    return !this.phone && !this.phones?.length
  }
}

export default [Member]
