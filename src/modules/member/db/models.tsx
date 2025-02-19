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
  MemberCohortType,
  BillingEnrollmentPackageType,
  BillingPackageType,
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

export enum BillingMethodName {
  INVOICE_TO_INDIVIDUAL = 'INVOICE TO INDIVIDUAL',
  INVOICE_TO_BROKER = 'INVOICE TO BROKER',
  INVOICE_TO_INSURER = 'INVOICE TO INSURER',
  INVOICE_TO_EMPLOYER = 'INVOICE TO EMPLOYER',
  OP_CLAIM_INSURANCE_BENEFITS = 'OP CLAIM INSURANCE BENEFITS',
}

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
  memberData: V2MemberType,
  memberCohorts: MemberCohortType[]
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
  member.registrationChannel = memberData?.registrationChannel
  member.payor = memberData?.payor
  member.kenyaNationalId = memberData?.kenyaNationalId
  member.caregiverContact = mergeCaregiverContact(member, memberData)
  member.nhifNumber = memberData?.nhifNumber
  member.membercohortSet = memberCohorts
  member.healthStatus = memberData.healthStatus
  member.eligibleForServices = memberData.eligibleForServices
  member.reasonsForServiceIneligibility =
    memberData?.reasonsForServiceIneligibility
  member.activeBillingPackageEnrollment =
    memberData.activeBillingPackageEnrollment
  member.pendingBillingPackageEnrollment =
    memberData.pendingBillingPackageEnrollment

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

  @text('registration_channel') registrationChannel?: string

  @text('other_refused_service') otherRefusedService?: string

  @json('payor', identityJson) payor?: PayorType

  @text('kenya_national_id') kenyaNationalId?: string

  @json('caregiver_contact', identityJson) caregiverContact?: CaregiverContact

  @text('nhif_number') nhifNumber?: string

  @json('member_cohorts', identityJson) membercohortSet?: MemberCohortType[]

  @text('health_status') healthStatus?: string

  @text('eligible_for_services') eligibleForServices?: string

  @json('reasons_for_service_ineligibility', identityJson)
  reasonsForServiceIneligibility?: string[]

  @json('active_billing_package_enrollment', identityJson)
  activeBillingPackageEnrollment?: BillingEnrollmentPackageType

  @json('pending_billing_package_enrollment', identityJson)
  pendingBillingPackageEnrollment?: BillingPackageType

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

  get isEligible() {
    return this.membercohortSet?.some(
      (cohort) => cohort.subscriptionStatus === 'ACTIVE'
    )
  }

  get hasGender() {
    return this.sex && this.sex !== 'Unknown'
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

  get isFfsEligible() {
    return (
      !this.activeBillingPackageEnrollment ||
      this.activeBillingPackageEnrollment?.billingPackage?.isFfs
    )
  }

  get acrreditedFFSServices() {
    if (!this.isFfsEligible || !this.membercohortSet) {
      return []
    }
    const services = this.membercohortSet
      .filter((obj) => obj.billingPackage?.isFfs)
      .reduce((acc, obj) => {
        if (obj.servicePricing) {
          const pricingData = obj.servicePricing
          pricingData.forEach((data) => {
            if (data.service) {
              acc.push({
                name: data.service.name,
                price: data.price,
              })
            }
          })
        }
        return acc
      }, [] as { name: string; price: number }[])
    return services
  }

  get activeCohorts() {
    if (!this.membercohortSet) return []

    return this.membercohortSet.filter((item) => {
      const isActive = item.subscriptionStatus === 'ACTIVE'
      const isEligible =
        (this.isFfsEligible && item.billingPackage?.isFfs) ||
        (!this.isFfsEligible && item.billingPackage?.isUnlimitedMembership)

      return isActive && isEligible
    })
  }

  get isMemberBilledThroughSmart() {
    const claimMethod =
      this.activeBillingPackageEnrollment?.billingSchemeSubscription
        ?.billingScheme?.claimMethod?.name
    if (claimMethod?.toLowerCase()?.includes('smart')) {
      return true
    }
    return false
  }

  get isUnlimitedMembershipMember() {
    return this.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.billingScheme?.billingPackage?.isUnlimitedMembership
  }

  get isOnFreeMembership() {
    const billingMethodName =
      this.activeBillingPackageEnrollment?.billingSchemeSubscription
        ?.billingScheme?.billingMethod?.name
    if (
      billingMethodName === BillingMethodName.INVOICE_TO_EMPLOYER ||
      billingMethodName === BillingMethodName.INVOICE_TO_INSURER ||
      billingMethodName === BillingMethodName.INVOICE_TO_BROKER
    ) {
      return true
    }
    return false
  }

  get isPaidForByIndividual() {
    const billingMethodName =
      this.activeBillingPackageEnrollment?.billingSchemeSubscription
        ?.billingScheme?.billingMethod?.name
    if (billingMethodName === BillingMethodName.INVOICE_TO_INDIVIDUAL) {
      return true
    }
    return false
  }

  @writer async reset() {
    // reset all the properties to their default values
    await this.update((member) => {
      createOrUpdateMember(member, {} as V2MemberType, [])
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

  get membershipServicePricingId() {
    if (
      this.activeBillingPackageEnrollment?.billingPackage?.isUnlimitedMembership
    ) {
      return this.activeBillingPackageEnrollment?.billingSchemeSubscription
        ?.billingScheme?.servicePricing?.[0]?.servicePricingId
    }
    return null
  }

  get shouldRenewMembership() {
    if (
      this.activeBillingPackageEnrollment?.billingPackage
        ?.isUnlimitedMembership &&
      !this.isOnFreeMembership &&
      !this.isPaidForByIndividual
    ) {
      const expiryDate =
        this.activeBillingPackageEnrollment?.billingSchemeSubscription
          ?.nextBilledAt
      return !expiryDate || dayjs().isAfter(dayjs(expiryDate))
    }
    return false
  }
}

export default [Member]
