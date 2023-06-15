import { useDatabase } from '@nozbe/watermelondb/hooks'
import { PhoneType } from 'src/modules/member/types'
import type { Member } from 'src/modules/member/db/models'
import {
  useCreateMember,
  useUpdateBiodata,
  useUpdateContactsData,
  useUpdateAddressesData,
  useVerifyInsuranceDetails,
  useUpdateInsuranceDetails,
} from 'src/modules/member/services/member.api'
import { logError } from 'src/utils/logging/logger'
import dayjs from 'dayjs'
import type {
  BiodataValues,
  ContactValues,
  DbValueTypes,
} from 'src/modules/member/types'
import {
  preparePhonesForUpdate,
  prepareAddressesForUpdate,
  prepareInsurancesForUpdate,
  transformInsurances,
} from 'src/modules/member/utils/data-transforms'
import { useMembersData } from 'src/modules/member/hooks/member-data'

export const useRegistrationData = () => {
  const database = useDatabase()
  const { createMember, loading: creatingMember } = useCreateMember()
  const { updateBiodata, loading: updatingMember } = useUpdateBiodata()
  const { updateContactsData, loading: updatingContactsData } =
    useUpdateContactsData()
  const { updateAddressesData, loading: updatingAddresses } =
    useUpdateAddressesData()
  const { verifyInsuranceDetails, loading: verifyingInsuranceDetails } =
    useVerifyInsuranceDetails()
  const { updateInsuranceDetails, loading: updatingInsuranceDetails } =
    useUpdateInsuranceDetails()
  const { createDefaultMemberInstance, createMemberInstance } = useMembersData()

  const handleUpdateBioData = async (
    member: Member,
    biodata: BiodataValues
  ) => {
    try {
      if (!biodata.antaraId) {
        const antaraId = await createMember()
        biodata.antaraId = antaraId
      }

      await updateBiodata(biodata)
      return database.write(async () => {
        return member.update((m) => {
          m.isSynced = true
          m.antaraId = biodata.antaraId
          m.firstName = biodata.firstName
          m.lastName = biodata.lastName
          m.middleName = biodata.middleName
          m.phone = biodata.phone
          m.sex = biodata.sex
          m.birthDate = dayjs(biodata.birthDate).format('YYYY-MM-DD')
          m.maritalStatus = biodata.maritalStatus
        })
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
    try {
      if (!contactsData.antaraId) {
        const antaraId = await createMember()
        contactsData.antaraId = antaraId
      }

      const phonesToUpdate = preparePhonesForUpdate(
        member.phones || [],
        contactsData.phones
      )
      contactsData.phones = phonesToUpdate

      await updateContactsData(contactsData)
      const remainingPhones = (contactsData.phones || []).map(
        (phone: PhoneType, index: number) => ({ ...phone, priority: index + 1 })
      )
      return database.write(async () => {
        return member.update((m) => {
          m.phones = remainingPhones
          m.email = contactsData.email
          m.emergencyContact = contactsData.emergencyContact
        })
      })
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
      if (!addressData.antaraId) {
        const antaraId = await createMember()
        addressData.antaraId = antaraId
      }

      const addresses = prepareAddressesForUpdate(
        member.addresses || ({} as DbValueTypes.AddressValues),
        addressData
      )
      await updateAddressesData(addresses)

      return database.write(async () => {
        return member.update((m) => {
          m.addresses = addressData
        })
      })
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const handleVerifyInsuranceDetails = async (
    member: Member,
    insuranceDetails: any,
    insuranceId: number
  ) => {
    try {
      if (!insuranceDetails.antaraId) {
        const antaraId = await createMember()
        insuranceDetails.antaraId = antaraId
      }

      const insurances = prepareInsurancesForUpdate(
        member.insurances || ({} as DbValueTypes.InsuranceDetailsValues),
        insuranceDetails
      )
      const res = await verifyInsuranceDetails(insurances, member.antaraId)
      const newInsurances = transformInsurances(res)

      // find the insurance with the id and check verificationStatus
      const insurance = newInsurances.find((i: any) => i.id === insuranceId)
      let verified = false
      if (insurance) {
        verified = insurance.verificationStatus === 'VERIFIED'
      }

      const update = {
        insurances: newInsurances,
        antaraId: insuranceDetails.antaraId,
        employer: insuranceDetails.employer,
      }

      await database.write(async () => {
        await member.update((m) => {
          m.insurances = update
        })
      })

      return {
        verified,
        update,
      }
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
      if (!insuranceDetails.antaraId) {
        const antaraId = await createMember()
        insuranceDetails.antaraId = antaraId
      }

      const insurances = prepareInsurancesForUpdate(
        member.insurances || ({} as DbValueTypes.InsuranceDetailsValues),
        insuranceDetails
      )
      const variables = {
        insurances,
        antaraId: insuranceDetails.antaraId,
        employer: insuranceDetails.employer,
      }
      await updateInsuranceDetails(variables)
      return database.write(async () => {
        return member.update((m) => {
          m.insurances = insuranceDetails
        })
      })
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
    handleVerifyInsuranceDetails,
    handleUpdateInsuranceDetails,
    loading:
      creatingMember ||
      updatingMember ||
      updatingContactsData ||
      updatingAddresses ||
      verifyingInsuranceDetails ||
      updatingInsuranceDetails,
    isVerifyingInsurance: verifyingInsuranceDetails,
  }
}
