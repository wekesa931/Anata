type PhoneType = {
  phone: string
  phoneType: string
  priorirty: number
}

type AddressType = {
  constituency?: string
  deliveryInstructions?: string
  geolocation?: string
  label?: string
  poBoxNumber?: string
  postCode?: string
  residentialAddress?: string
  residentialCountry?: string
  residentialCounty?: string
  subCounty?: string
  residentialTown?: string
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

type InsuranceDetailsType = {
  benefitUtilizations?: BenefitUtilizationType[]
  id: string
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
}

export type V2MemberType = {
  antaraId: string
  birthDate: string
  firstName?: string
  middleName?: string
  lastName?: string
  intercomRecordId?: string
  intercomUrl?: string
  intercomUserId?: string
  sex?: string
  maritalStatus?: string
  phone?: string
  phoneType?: string
  phones?: PhoneType[]
  employer?: string
  onboardStage?: string
  status?: string
  assignedHn?: string
  assignedHnFullName?: string
  assignedMe?: string
  readyForCompanyOnboarding?: boolean
  readyForIndividualOnboarding?: boolean
  startDate?: string
  tags?: string[]
  email?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  emergencyContactRelationship?: string
  memberAddresses?: AddressType[]
  insuranceDetails?: InsuranceDetailsType[]
  dependents?: InsuranceDetailsType[]
  primary: InsuranceDetailsType
  otherDependents: InsuranceDetailsType[]
  primaryMemberAntaraId?: string
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
    intercomUserId?: string
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
    readyForCompanyOnboarding?: boolean
    readyForIndividualOnboarding?: boolean
    assignedMe?: string
    tags?: string[]
    status?: {
      status?: string
    }
  }
  dependents?: RawInsuranceType[]
  contact?: {
    memberAddresses?: {
      constituency?: string
      residentialAddress?: string
      residentialCountry?: string
      residentialCounty?: string
      subCounty?: string
      residentialTown?: string
      deliveryInstructions?: string
      poBoxNumber?: string
      postCode?: string
      geolocation?: string
      label?: string
    }[]
    email?: string
    emergencyContactName?: string
    emergencyContactPhone?: string
    emergencyContactRelationship?: string
  }
  insuranceDetails?: RawInsuranceType[]
  primary: RawInsuranceType
  otherDependents: RawInsuranceType[]
}

export type HMPType = {
  hmpSendDate: string | null
  hmpNumber: string | null
  hmpDay: number | null
  hmpLink: string | null
  hmpPhase: string | null
}
