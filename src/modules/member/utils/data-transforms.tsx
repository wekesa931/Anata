import {
  PhoneType,
  Address,
  V2MemberType,
  InsuranceDetailsType,
  DbValueTypes as DbTypes,
  RosterMemberType,
} from '../types'

export const preparePhonesForUpdate = (
  currentPhones: PhoneType[],
  newPhones: PhoneType[]
) => {
  const phonesToDelete = currentPhones
    .filter((phone) => !newPhones.find((p) => p.phone === phone.phone))
    .map((phone) => ({ ...phone, toDelete: true }))

  const phonesToAdd = newPhones.filter(
    (phone) => !currentPhones.find((p) => p.phone === phone.phone)
  )

  const phonesToUpdate = newPhones.filter((phone) =>
    currentPhones.find((p) => p.phone === phone.phone)
  )

  let highestPriority = currentPhones.reduce((acc, phone) => {
    return phone.priority > acc ? phone.priority : acc
  }, 0)

  phonesToUpdate.forEach((phone) => {
    const currentPhone = currentPhones.find((p) => p.phone === phone.phone)
    if (currentPhone) {
      phone.priority = currentPhone.priority
    }
  })

  phonesToAdd.forEach((phone) => {
    highestPriority += 1
    phone.priority = highestPriority
  })

  return [...phonesToDelete, ...phonesToAdd, ...phonesToUpdate]
}

export const transformAddressData = (
  addresses: Address[],
  antaraId: string
): DbTypes.AddressValues => {
  const returnAddresses = addresses.map((address: Address) => ({
    address: {
      description: address.residentialAddress,
      place_id: address.geolocation,
      residentialCountry: address.residentialCountry,
      residentialCounty: address.residentialCounty,
      residentialTown: address.residentialTown,
      latitude: address.latitude,
      longitude: address.longitude,
    },
    addressLabel: address.label,
    deliveryInstructions: address.deliveryInstructions,
  }))

  return {
    addresses: returnAddresses,
    antaraId,
  }
}

export const prepareAddressesForUpdate = (
  currentAddresses: DbTypes.AddressValues,
  newAddresses: DbTypes.AddressValues
) => {
  const floatOrNull = (val: any) => {
    const parsed = parseFloat(val)
    return isNaN(parsed) ? null : parsed
  }

  const addressesToDelete =
    currentAddresses.addresses
      ?.filter(
        (address) =>
          !newAddresses.addresses.find(
            (a) => a.address.place_id === address.address.place_id
          )
      )
      .map((address) => ({ ...address, toDelete: true })) || []

  const addressesToAdd =
    newAddresses.addresses?.filter(
      (address) =>
        !currentAddresses.addresses?.find(
          (a) => a.address.place_id === address.address.place_id
        )
    ) || []

  const allAddresses = [...addressesToDelete, ...addressesToAdd]
  const returnAddresses = allAddresses.map((address) => ({
    label: address.addressLabel,
    deliveryInstructions: address.deliveryInstructions,
    geolocation: address.address.place_id,
    residentialAddress: address.address.description,
    residentialCountry: address.address.residentialCountry,
    residentialCounty: address.address.residentialCounty,
    residentialTown: address.address.residentialTown,
    latitude: floatOrNull(address.address.latitude),
    longitude: floatOrNull(address.address.longitude),
    toDelete: address.toDelete || false,
  }))

  return {
    addresses: returnAddresses,
    antaraId: newAddresses.antaraId,
  }
}

export const transformInsurances = (
  insuranceDetails: InsuranceDetailsType[]
): DbTypes.InsuranceType[] => {
  return insuranceDetails.map((d) => ({
    insuranceCompany: d?.insuranceCompany?.name || '',
    insuranceCompanyLogo: d?.insuranceCompany?.logo || '',
    insuranceId: d?.insuranceId || '',
    principalMemberInsuranceId: d?.principalMemberInsuranceId || '',
    relationshipToPrincipalMember: d?.relationshipToPrincipalMember || '',
    isPrincipalMember: d?.principalMemberInsuranceId ? 'no' : 'yes',
    priority: d?.priority || 0,
    verificationStatus: d?.verificationStatus || 'PENDING',
    benefits: d?.benefitUtilizations || [],
    id: d?.id || '',
    healthPolicy: d?.memberPolicy?.healthPolicy?.name || '',
  }))
}

export const transformInsuranceData = (
  member: V2MemberType
): DbTypes.InsuranceDetailsValues => {
  const antaraId = member?.antaraId || ''
  const insuranceDetails = member?.insuranceDetails || []

  return {
    antaraId,
    employer: member?.employer,
    insurances: transformInsurances(insuranceDetails),
  }
}
export const transformRosterInsuranceData = (
  member?: RosterMemberType,
  primaryInsuranceId?: string
): DbTypes.InsuranceDetailsValues => {
  return {
    antaraId: '',
    employer: {
      name: member?.employer?.name,
    },
    insurances: [
      {
        priority: 0,
        insuranceId: member?.insuranceId,
        insuranceCompany: member?.insuranceCompany?.name,
        insuranceCompanyLogo: member?.insuranceCompany?.logo,
        isPrincipalMember: 'no',
        principalMemberInsuranceId: primaryInsuranceId,
        benefits: [],
        relationshipToPrincipalMember: member?.relationshipToPrinciple,
      },
    ],
  }
}
export const prepareInsurancesForUpdate = (
  currentInsurances: DbTypes.InsuranceDetailsValues,
  newInsurances: DbTypes.InsuranceDetailsValues
) => {
  const insurancesToDelete =
    currentInsurances.insurances
      ?.filter(
        (insurance) =>
          !newInsurances.insurances?.find(
            (i) => i.priority === insurance.priority
          )
      )
      .map((insurance) => ({ ...insurance, toDelete: true })) || []

  // find insurances to update - all insurances in the new that are not to be deleted
  const insurancesToAdd =
    newInsurances.insurances?.filter(
      (insurance) =>
        !insurancesToDelete?.find((i) => i.priority === insurance.priority)
    ) || []

  const allInsurances = [...insurancesToDelete, ...insurancesToAdd]
  const returnInsurances = allInsurances.map((insurance) => ({
    insuranceCompany: insurance.insuranceCompany,
    insuranceId: insurance.insuranceId,
    principalMemberInsuranceId: insurance.principalMemberInsuranceId,
    relationshipToPrincipalMember: insurance.relationshipToPrincipalMember,
    priority: insurance.priority,
    toDelete: insurance.toDelete || false,
  }))

  return returnInsurances
}

/**
 * Parse the details into a selectable elements
 * @param data - graphql response for fetch company details or lookups
 */

export const parseDataToOptions = (data: any, key: string) => {
  const raw: any[] = data?.edges

  return raw?.map((e) => ({
    label: e?.node[key],
    value: e?.node[key],
    ...e?.node,
  }))
}

export const parseLookupEntries = (rawLookupData: any) => {
  const employers = rawLookupData?.getCompanies?.edges?.map((e: any) => ({
    label: e?.node?.name,
    value: e?.node?.name,
    departments:
      e?.node?.departments?.map((d: any) => ({
        label: d?.name,
        value: d?.departmentId,
      })) || [],
    businessLocations:
      e?.node?.businessLocations?.map((l: any) => ({
        label: l?.name,
        value: l?.businessLocationId,
      })) || [],
  }))

  const healthPolicies = parseDataToOptions(
    rawLookupData?.healthPolicies,
    'name'
  )
  const memberStatuses = parseDataToOptions(
    rawLookupData?.memberStatus,
    'status'
  )
  const onboardingStages = parseDataToOptions(
    rawLookupData?.onboardStage,
    'onboardStage'
  )
  const sexes = parseDataToOptions(rawLookupData?.sex, 'sex')
  const maritalStatuses = parseDataToOptions(
    rawLookupData?.maritalStatus,
    'maritalStatus'
  )
  const phoneTypes = parseDataToOptions(rawLookupData?.phoneTypes, 'phoneType')
  const benefits = parseDataToOptions(rawLookupData?.benefits, 'name')
  const tags = parseDataToOptions(rawLookupData?.tags, 'name')
  const antaraServices = parseDataToOptions(
    rawLookupData?.antaraServices,
    'name'
  )

  return {
    employers,
    healthPolicies,
    memberStatuses,
    onboardingStages,
    sexes,
    maritalStatuses,
    phoneTypes,
    benefits,
    tags,
    antaraServices,
  }
}

export const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key])
    else if (obj[key] === undefined || obj[key] === null || obj[key] === '')
      delete obj[key]
  })
  return obj
}
