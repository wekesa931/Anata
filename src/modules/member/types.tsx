export type PhoneType = {
  phone: string
  phoneType: string
  priority: number
  toDelete?: boolean
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

export type V2MemberType = {
  antaraId: string
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
  phones?: PhoneType[]
  employer?: string
  department?: string
  onboardStage?: string
  status?: string
  assignedHn?: string
  assignedHnFullName?: string
  assignedMe?: string
  assignedMeFullName?: string
  startDate?: string
  tags?: string[]
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
}

type RawPhoneType = {
  phone?: string
  phoneType?: {
    phoneType?: string
  }
  priority: number
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

export type V2MemberQueryType = {
  antaraId: string
  birthDate?: string
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
    assignedHn?: string
    assignedHnFullName?: string
    assignedMeEmailUsername?: string
    assignedHnEmailUsername?: string
    assignedMe?: string
    assignedMeFullName?: string
    tags?: string[]
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
  }
  insuranceDetails?: RawInsuranceType[]
  primary: V2MemberQueryType
  otherDependents: V2MemberQueryType[]
}

export type HMPType = {
  hmpSendDate: string | null
  hmpNumber: string | null
  hmpDay: number | string | null
  hmpLink: string | null
  hmpState: string | null
  hmpLastReviewDate: string | null
}

export type ConditionType = {
  condition: string | null
  startingClinicalStatus: string | null
  healthStatus: string | null
}
export type InterventionType = {
  intervention: string | null
  milestoneAttainments: string | null
}

export type BiodataValues = {
  firstName: string
  middleName: string
  lastName: string
  phone: string
  birthDate: Date | null
  sex: string
  maritalStatus: string
  tags: string[]
  antaraId: string
}

export type ContactValues = {
  email: string
  phones: PhoneType[]
  emergencyContact: {
    name?: string
    phoneNumber?: string
    relationship?: string
  }
  antaraId: string
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

export type VerificationStatus = 'verified' | 'unverified' | 'pending'

export type RegistrationFormsNames = 'primary' | 'spouse' | 'child'

export type LookupOption = {
  label: string
  value: string
  [key: string]: string
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
    employer?: string
    antaraId: string
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
