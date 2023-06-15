import { Model } from '@nozbe/watermelondb'
import { text, json, field, writer, date } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'
import {
  PhoneType,
  V2MemberType,
  DbValueTypes as DbTypes,
} from 'src/modules/member/types'
import dayjs from 'dayjs'

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

  @text('employer') employer?: string

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
}

export default [Member]
