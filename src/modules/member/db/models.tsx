import { Model } from '@nozbe/watermelondb'
import { text, json, field, writer, date } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import {
  PhoneType,
  V2MemberType,
  DbValueTypes as DbTypes,
  EmployerType,
} from 'src/modules/member/types'
import dayjs from 'dayjs'
import {
  transformAddressData,
  transformInsuranceData,
} from 'src/modules/member/utils/data-transforms'

type AddressValues = DbTypes.AddressValues
type InsuranceDetailsValues = DbTypes.InsuranceDetailsValues

const identityJson = (data: any) => data
const sanitizeTags = (data: any) =>
  Array.isArray(data) ? data.map(String) : []

type EmergencyContact = {
  name?: string
  phoneNumber?: string
  relationship?: string
}

type AssignedStaff = {
  recordId?: string
  name?: string
}

export const createOrUpdateMember = (
  member: Member,
  memberData: V2MemberType
) => {
  member.antaraId = memberData?.antaraId
  member.firstName = memberData?.firstName
  member.lastName = memberData?.lastName
  member.middleName = memberData?.middleName
  member.email = memberData?.email
  member.phone = memberData?.phone
  member.phones = memberData.phones
  member.birthDate = dayjs(memberData.birthDate).format('YYYY-MM-DD')
  member.tags = memberData.tags
  member.maritalStatus = memberData.maritalStatus
  member.emergencyContact = {
    name: memberData.emergencyContactName,
    phoneNumber: memberData.phone,
    relationship: memberData.emergencyContactRelationship,
  }
  member.addresses = transformAddressData(
    memberData.memberAddresses || [],
    memberData?.antaraId || ''
  )
  member.insurances = transformInsuranceData(memberData)
  member.employer = memberData.employer
  member.isSynced = true
  member.primary = memberData?.primary
  member.dependents = memberData?.dependents
  member.otherDependents = memberData?.dependents
  member.sex = memberData?.sex
  member.displayName = memberData?.displayName
  member.airtableRecordId = memberData?.airtableRecordId
  member.intercomUrl = memberData?.intercomUrl
  member.assignedHn = {
    recordId: memberData?.assignedHn,
    name: memberData?.assignedHnFullName,
  }
  member.assignedMe = {
    recordId: memberData?.assignedMe,
    name: memberData?.assignedMe,
  }

  member.onboardStage = memberData?.onboardStage
  member.status = memberData?.status
  member.lastSyncedAt = new Date().getTime()

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

  @text('display_name') displayName?: string

  @text('intercom_url') intercomUrl?: string

  @json('assigned_hn', identityJson) assignedHn?: AssignedStaff

  @json('assigned_me', identityJson) assignedMe?: AssignedStaff

  @text('onboard_stage') onboardStage?: string

  @text('status') status?: string

  @date('last_synced_at') lastSyncedAt?: number

  @writer async destroy() {
    await super.destroyPermanently()
  }

  get fullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`
  }

  get allPhones() {
    const currentMemberPhones = this.phones || []
    const primaryMemberPhones = this.primary?.phones || []
    const otherDependentsPhones =
      this.otherDependents?.map((d) => d.phones) || []

    return {
      phones: primaryMemberPhones,
      primary: currentMemberPhones,
      otherDependents: otherDependentsPhones,
      emergencyContactPhone: this.emergencyContact?.phoneNumber,
    }
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

  get principalInsuranceId() {
    return this.insuranceDetails?.find((insurance) => insurance?.priority === 0)
      ?.insuranceId
  }

  get needsSync() {
    return (
      !this.isSynced ||
      dayjs().diff(dayjs(this.lastSyncedAt), 'minutes') >= 30 ||
      !this.lastSyncedAt
    )
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
}

export default [Member]
