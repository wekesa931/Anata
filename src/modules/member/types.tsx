export type PhoneType = {
  phone: string
  phoneType: string
  priority: number
  toDelete?: boolean
  lastUsedToAccessApp?: string
}

type BenefitType = {
  api?: string
  description?: string
  limit?: number
  name?: string
}

type BenefitUtilizationType = {
  benefit: BenefitType
  utilizedPortion: number
  id: string
}

export type EmployerType = {
  name?: string
  businessLocation?: {
    businessLocationId?: string
    name?: string
  }
  department?: {
    departmentId?: string
    name?: string
  }
}
export type InsuranceCompanyType = {
  code?: string
  name?: string
  logo?: string
}
export type IndividualBillableEventType = {
  amount: string
  billingPeriodStartDate: string
  billingPeriodEndDate: string
  createdAt?: string
}
export type RemarkType = {
  remark: string
}
export type BillingMethodType = {
  name: string
}
export type MemberCohortType = {
  id?: string
  name?: string
  billingStartedAt?: string
  optedInAt?: string
  optedOutAt?: string
  isOptInRequired?: string
  subscriptionStatus?: string
  skuRate?: string
  nextBilledAt?: string
  billingFrequency?: string
  billingMethod?: BillingMethodType
  activatedAt?: string
  activatedBy?: string
  pausedAt?: string
  pausedBy?: string
  cancelledAt?: string
  cancelledBy?: string
  remarks?: RemarkType[]
  billingEvents?: IndividualBillableEventType[]
  revenueModelName?: string
}

export type RosterMemberType = {
  rosterMemberId: number
  antaraStatus?: string
  birthDate?: string
  corporateId?: string
  dependents?: RosterMemberType[]
  email?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  emergencyContactRelationship?: string
  fullName: string
  insuranceId: string
  memberBilling: string
  onboardingStage: string
  phoneNumber: string
  principalMember: RosterMemberType
  principalMemberBranch: string
  principalMemberDepartment: string
  insuranceCompany?: InsuranceCompanyType
  relationshipToPrinciple?: string
  sex?: string
  v2Member: V2MemberType
  employer: {
    name: string
  }
  tags: string
  memberCohort: MemberCohortType[]
}

export type PayorType = {
  name?: string
  key?: string
  phone?: string
  type?: string
  status?: string
}

export type V2MemberType = {
  antaraId: string
  healthStatus: string
  birthDate: string
  firstName?: string
  middleName?: string
  lastName?: string
  intercomRecordId?: string
  intercomUrl?: string
  sex?: string
  maritalStatus?: string
  phone?: string
  phoneType?: string
  lastUsedToAccessApp?: string
  phones?: PhoneType[]
  employer?: EmployerType
  department?: string
  onboardStage?: string
  verificationStatus?: string
  status?: string
  assignedHn?: string
  assignedHnFullName?: string
  assignedMe?: string
  assignedMeFullName?: string
  assignedMeObject?: {
    fullName?: string
    emailUsername?: string
    atRecordId?: string
  }
  assignedHnObject?: {
    fullName?: string
    emailUsername?: string
    atRecordId?: string
  }
  assignedNutritionistObject?: {
    fullName?: string
    emailUsername?: string
    atRecordId?: string
  }
  startDate?: string
  tags?: string[]
  refusedServices?: string[]
  otherRefusedService?: string
  email?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  emergencyContactRelationship?: string
  memberAddresses?: Address[]
  insuranceDetails?: InsuranceDetailsType[]
  dependents?: V2MemberType[]
  primary: V2MemberType
  otherDependents: V2MemberType[]
  primaryMemberAntaraId?: string
  age?: number
  displayName?: string
  fullName?: string
  employerName?: string
  airtableRecordId?: string
  relationshipToPrimary?: string
  rosterMember: RosterMemberType
  referralSource?: string
  payor?: PayorType
  kenyaNationalId?: string
  caregiverName?: string
  caregiverNumber?: string
  nhifNumber?: string
  memberCohort?: MemberCohortType[]
}

type RawPhoneType = {
  phone?: string
  phoneType?: {
    phoneType?: string
  }
  priority: number
  lastUsedToAccessApp?: string
}

type RawInsuranceType = {
  id?: string
  insuranceId?: string
  priority?: number
  principalMemberInsuranceId?: string
  relationshipToPrincipalMember?: string
  insuranceCompany?: {
    id?: string
    name?: string
    logo?: string
  }
  memberPolicy?: {
    healthPolicy?: {
      name?: string
    }
  }
  benefitUtilizations?: {
    id?: string
    utilizedPortion?: number
    benefit?: {
      name?: string
      description?: string
      api?: string
      limit?: string
    }
  }[]
}

export type PayorQueryType = {
  payorName?: string
  payorKey?: string
  payorPhone?: string
  payorType?: {
    payorType?: string
  }
  payorStatus?: {
    payorStatus?: string
  }
}

export type MemberCohortQueryType = {
  id?: string
  billingStartedAt?: string
  name?: string
  optedInAt?: string
  optedOutAt?: string
  isOptInRequired?: string
  subscriptionStatus?: string
  skuRate?: string
  nextBilledAt?: string
  billingFrequency?: string
  billingMethod?: BillingMethodType
  activatedAt?: string
  activatedBy?: string
  pausedAt?: string
  pausedBy?: string
  cancelledAt?: string
  cancelledBy?: string
  remarks?: RemarkType[]
  billingEvents?: IndividualBillableEventType[]
  revenueModelName?: string
}

export type V2MemberQueryType = {
  antaraId: string
  birthDate?: string
  healthStatus?: string
  details: {
    fullName?: string
    firstName?: string
    middleName?: string
    lastName?: string
    intercomUrl?: string
    intercomRecordId?: string
    airtableRecordId?: string
    sex?: {
      sex?: string
    }
    maritalStatus?: {
      maritalStatus?: string
    }
    relationshipToPrimary?: string
    referralSource?: string
    kenyaNationalId?: string
    nhifNumber?: string
  }
  phones?: RawPhoneType[]
  status?: {
    startDate?: string
    onboardStage?: {
      onboardStage?: string
    }
    employer?: {
      name?: string
    }
    department?: {
      departmentId?: string
      name?: string
    }
    businessLocation?: {
      businessLocationId?: string
      name?: string
    }
    assignedHn?: string
    assignedHnFullName?: string
    assignedMeEmailUsername?: string
    assignedHnEmailUsername?: string
    assignedMe?: string
    assignedMeFullName?: string
    assignedMeObject?: {
      fullName?: string
      emailUsername?: string
      atRecordId?: string
    }
    assignedHnObject?: {
      fullName?: string
      emailUsername?: string
      atRecordId?: string
    }
    assignedNutritionistObject?: {
      fullName?: string
      emailUsername?: string
      atRecordId?: string
    }
    tags?: string[]
    refusedServices: string[]
    otherRefusedService?: string
    status?: {
      status?: string
    }
  }
  dependents?: V2MemberQueryType[]
  contact?: {
    memberAddresses?: {
      constituency?: string
      residentialAddress?: string
      residentialCountry?: string
      residentialCounty?: string
      subCounty?: string
      residentialTown?: string
      deliveryInstructions?: string
      geolocation?: string
      label?: string
    }[]
    email?: string
    emergencyContactName?: string
    emergencyContactPhone?: string
    emergencyContactRelationship?: string
    caregiverName?: string
    caregiverNumber?: string
  }
  insuranceDetails?: RawInsuranceType[]
  primary: V2MemberQueryType
  otherDependents: V2MemberQueryType[]
  rosterMember: RosterMemberType[]
  payor: PayorQueryType
  membercohortSet: {
    edges: {
      node: MemberCohortQueryType
    }[]
  }
}

export type BirthdateUpdateValues = {
  birthDate: Date | null
  antaraId: string
  firstName: string
  middleName: string
  lastName: string
  sex?: string
}

export type BiodataValues = BirthdateUpdateValues & {
  phone: string
  sex: string
  maritalStatus?: string
  tags: string[]
  primaryMemberAntaraId?: string
  relationshipToPrimary?: string
  referralSource?: string
  otherRefusedService?: string
  refusedServices: string[]
  nhifNumber?: string
  kenyaNationalId?: string
}

export type UpdatePhoneValues = {
  phones: PhoneType[]
  antaraId: string
}

export type ContactValues = UpdatePhoneValues & {
  email: string
  emergencyContact: {
    name?: string
    phoneNumber?: string
    relationship?: string
  }
  caregiverContact: {
    name?: string
    phoneNumber?: string
  }
}

export type UpdateStatusValues = {
  status: string
  onboardStage: string
  assignedMe: string
  assignedHn: string
  antaraId: string
  assignedNutritionist: string
  verificationStatus: string
}

export type Address = {
  constituency?: string
  deliveryInstructions?: string
  geolocation?: string
  label?: string
  residentialAddress?: string
  residentialCountry?: string
  residentialCounty?: string
  subCounty?: string
  residentialTown?: string
  latitude?: number
  longitude?: number
}

export type InsuranceDetailsType = {
  benefitUtilizations?: BenefitUtilizationType[]
  id?: string
  insuranceCompany?: {
    id: string
    logo?: string
    name?: string
  }
  insuranceId?: string
  priority?: number
  memberPolicy?: {
    healthPolicy?: {
      name?: string
    }
  }
  principalMemberInsuranceId?: string
  relationshipToPrincipalMember?: string
  toDelete?: boolean
  verificationStatus?: string
}

export enum RegistrationFormsNames {
  PRIMARY = 'primary',
  DEPENDENT = 'dependent',
  CHILD = 'child',
}

export type LookupOption = {
  label: string
  value: string
  [key: string]: string | LookupOption[]
}

export type LookupOptions = {
  employers: LookupOption[]
  healthPolicies: LookupOption[]
  memberStatuses: LookupOption[]
  onboardingStages: LookupOption[]
  sexes: LookupOption[]
  maritalStatuses: LookupOption[]
  phoneTypes: LookupOption[]
  benefits: LookupOption[]
  tags: LookupOption[]
  antaraServices: LookupOption[]
}

export type MemberDetailsQueryVariables = {
  antaraId: string
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DbValueTypes {
  export type InsuranceType = {
    insuranceCompany?: string
    insuranceId?: string
    isPrincipalMember?: 'yes' | 'no'
    principalMemberInsuranceId?: string
    relationshipToPrincipalMember?: string
    priority?: number
    toDelete?: boolean
    verificationStatus?: string
    benefits: BenefitUtilizationType[]
    healthPolicy?: string
    insuranceCompanyLogo?: string
    id?: string
  }

  export type InsuranceDetailsValues = {
    insurances: InsuranceType[]
    employer?: EmployerType
    antaraId: string
  }

  export type RosterInsuranceValues = {
    insuranceId: string
    insuranceCompany: InsuranceCompanyType
  }

  export type AddressType = {
    description?: string
    place_id?: string
    residentialCountry?: string
    residentialCounty?: string
    residentialTown?: string
    latitude?: number
    longitude?: number
  }

  export type AddressValues = {
    addresses: {
      address: AddressType
      addressLabel?: string
      deliveryInstructions?: string
      toDelete?: boolean
    }[]
    antaraId: string
  }
}

export enum MemberStatuses {
  ACTIVE = 'ACTIVE',
  PROVISIONED = 'PROVISIONED',
  DECEASED = 'DECEASED',
  UNKNOWN = 'UNKNOWN',
}

export enum InsuranceVerificationStatus {
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

export type BooleanStatus = {
  [key: number]: boolean
}
