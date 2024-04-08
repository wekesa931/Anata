import { PhoneType } from 'src/modules/member/types'
import type { Member } from 'src/modules/member/db/models'
import {
  useCreateMember,
  useUpdateBiodata,
  useUpdateContactsData,
  useUpdateAddressesData,
  useUpdateInsuranceDetails,
  useUpdatePhones,
  useUpdateBirthdate,
  useUpdateStatus,
} from 'src/modules/member/services/member.api'
import { logError } from 'src/utils/logging/logger'
import dayjs from 'dayjs'
import type {
  BiodataValues,
  ContactValues,
  DbValueTypes,
  RosterMemberType,
} from 'src/modules/member/types'
import {
  preparePhonesForUpdate,
  prepareAddressesForUpdate,
  prepareInsurancesForUpdate,
  removeEmpty,
} from 'src/modules/member/utils/data-transforms'
import { useMembersData } from 'src/modules/member/hooks/member-data'
import { toTitleCase } from 'src/utils/text-utils'
import { parseUpdateContactError } from '../utils'

export const useRegistrationData = () => {
  const { createMember, loading: creatingMember } = useCreateMember()
  const { updateBiodata, loading: updatingMember } = useUpdateBiodata()
  const { updateContactsData, loading: updatingContactsData } =
    useUpdateContactsData()
  const { updateAddressesData, loading: updatingAddresses } =
    useUpdateAddressesData()
  const { updateInsuranceDetails, loading: updatingInsuranceDetails } =
    useUpdateInsuranceDetails()
  const { createDefaultMemberInstance, createMemberInstance } = useMembersData()
  const { updatePhones, loading: updatingPhones } = useUpdatePhones()
  const { updateBirthdate, loading: updatingBirthdate } = useUpdateBirthdate()
  const { updateStatus, loading: updatingStatus } = useUpdateStatus()

  const transformPhones = (data: any) => {
    if (data) {
      const newPhones = (data?.updateMemberPhones?.data?.phones || []).map(
        (p: any, index: number) => ({
          phone: p?.phone,
          phoneType: p.phoneType?.phoneType,
          priority: p?.priority || index,
          lastUsedToAccessApp: p?.lastUsedToAccessApp,
        })
      )

      return newPhones
    }

    return []
  }

  const handleUpdateBioData = async (
    member: Member,
    data: BiodataValues,
    rosterMember?: RosterMemberType
  ) => {
    try {
      const { firstName, middleName, lastName, ...rest } = data
      const biodata = {
        ...rest,
        firstName: toTitleCase(firstName),
        middleName: toTitleCase(middleName),
        lastName: toTitleCase(lastName),
      }
      if (!biodata.antaraId) {
        const antaraId = await createMember(rosterMember?.rosterMemberId)
        biodata.antaraId = antaraId
      }

      await updateBiodata(removeEmpty(biodata))
      return member.updateMember({
        ...biodata,
        birthDate: dayjs(biodata.birthDate).format('YYYY-MM-DD'),
      })
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const handleUpdateContactsData = async (
    member: Member,
    contactsData: ContactValues
  ) => {
    const ignoreEmptyPhone = (phoneNumber?: string) => {
      return phoneNumber && phoneNumber?.length > 4 ? phoneNumber : ''
    }

    try {
      const phonesToUpdate = preparePhonesForUpdate(
        member.phones || [],
        contactsData.phones
      ).map((p: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lastUsedToAccessApp, ...rest } = p
        return rest
      })
      contactsData.phones = phonesToUpdate

      // remove empty phone numbers
      const { emergencyContact, caregiverContact } = contactsData
      contactsData.emergencyContact.phoneNumber = ignoreEmptyPhone(
        emergencyContact.phoneNumber
      )
      contactsData.caregiverContact.phoneNumber = ignoreEmptyPhone(
        caregiverContact.phoneNumber
      )

      const { data = {} } = await updateContactsData({
        ...contactsData,
        antaraId: member.antaraId,
      })
      const { updateMemberContact, updateMemberPhones } = data

      // parse the errors if any
      if (updateMemberPhones?.status !== 200) {
        throw new Error('Unable to update phone details. Please try again')
      }

      if (updateMemberContact?.status !== 200) {
        throw new Error(
          parseUpdateContactError(updateMemberContact?.errors || {})
        )
      }
      const phones = transformPhones(data)
      const update = await member.updateMember({
        phones,
        email: contactsData.email,
        emergencyContact: contactsData.emergencyContact,
        caregiverContact: contactsData.caregiverContact,
      })
      return update
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const handleUpdateAddresses = async (
    member: Member,
    addressData: DbValueTypes.AddressValues
  ) => {
    try {
      const addresses = prepareAddressesForUpdate(
        member.addresses || ({} as DbValueTypes.AddressValues),
        addressData
      )
      await updateAddressesData({
        ...addresses,
        antaraId: member.antaraId,
      })

      return member.updateMember({
        addresses: addressData,
      })
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const handleUpdateInsuranceDetails = async (
    member: Member,
    insuranceDetails: DbValueTypes.InsuranceDetailsValues
  ) => {
    try {
      const insurances = prepareInsurancesForUpdate(
        member.insurances || ({} as DbValueTypes.InsuranceDetailsValues),
        insuranceDetails
      )
      const variables = removeEmpty({
        insurances: insurances.length ? insurances : null,
        employer: insuranceDetails.employer || null,
      })
      if (!!variables.insurances || !!variables.employer) {
        await updateInsuranceDetails({
          ...variables,
          antaraId: member.antaraId,
        })

        return member.updateMember({
          insurances: insuranceDetails,
          employer: insuranceDetails.employer,
        })
      }
      return null
    } catch (error) {
      logError(error)
      throw error
    }
  }
  const handleUpdatePhones = async (phones: PhoneType[], member: Member) => {
    try {
      const phonesToUpdate = preparePhonesForUpdate(member.phones || [], phones)
      const payload = {
        phones: phonesToUpdate,
        antaraId: member?.antaraId,
      }

      const { data } = await updatePhones(payload)
      if (data) {
        const newPhones = transformPhones(data)

        const priority0Phone =
          newPhones.find((p: any) => p.priority === 0)?.phone || ''

        // write them to db and update member
        return member.updateMember({
          phones: newPhones,
          phone: priority0Phone,
        })
      }
      return null
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const handleUpdateBirthdate = async (
    member: Member,
    birthDate: Date | null
  ) => {
    try {
      const payload = {
        antaraId: member?.antaraId,
        birthDate,
        firstName: member?.firstName || '',
        lastName: member?.lastName || '',
        middleName: member?.middleName || '',
      }

      await updateBirthdate(payload)
      return member.updateMember({
        birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
      })
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const handleUpdateStatus = async (member: Member, values: any) => {
    try {
      if (member?.antaraId) {
        const payload = {
          antaraId: member?.antaraId,
          onboardStage: values?.onboardStage || '',
          verificationStatus: values?.verificationStatus || '',
          status: values?.status || '',
          assignedMe: values?.assignedMe?.emailUsername || '',
          assignedHn: values?.assignedHn?.emailUsername || '',
          assignedNutritionist:
            values?.assignedNutritionist?.emailUsername || '',
        }

        await updateStatus(payload)
        return member.updateMember({
          onboardStage: values?.onboardStage || '',
          verificationStatus: values?.verificationStatus || '',
          status: values?.status || '',
          assignedMe: values?.assignedMe || {},
          assignedHn: values?.assignedHn || {},
          assignedNutritionist: values?.assignedNutritionist || {},
        })
      }
      return member
    } catch (error) {
      logError(error)
      throw error
    }
  }

  return {
    createMemberInstance,
    handleUpdateBioData,
    createDefaultMemberInstance,
    handleUpdateContactsData,
    handleUpdateAddresses,
    handleUpdateInsuranceDetails,
    loading:
      creatingMember ||
      updatingMember ||
      updatingContactsData ||
      updatingAddresses ||
      updatingInsuranceDetails ||
      updatingPhones ||
      updatingBirthdate ||
      updatingStatus,
    handleUpdatePhones,
    isUpdatingPhones: updatingPhones,
    handleUpdateBirthdate,
    handleUpdateStatus,
  }
}
