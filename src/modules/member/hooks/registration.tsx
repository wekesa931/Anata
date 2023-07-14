import { useDatabase } from '@nozbe/watermelondb/hooks'
import {
  PhoneType,
  InsuranceVerificationStatus,
} from 'src/modules/member/types'
import type { Member } from 'src/modules/member/db/models'
import {
  useCreateMember,
  useUpdateBiodata,
  useUpdateContactsData,
  useUpdateAddressesData,
  useVerifyInsuranceDetails,
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
} from 'src/modules/member/types'
import {
  preparePhonesForUpdate,
  prepareAddressesForUpdate,
  prepareInsurancesForUpdate,
  transformInsurances,
  removeEmpty,
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
        })
      )

      return newPhones
    }

    return []
  }

  const handleUpdateBioData = async (
    member: Member,
    biodata: BiodataValues
  ) => {
    try {
      if (!biodata.antaraId) {
        const antaraId = await createMember()
        biodata.antaraId = antaraId
      }

      await updateBiodata(removeEmpty(biodata))
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
          m.tags = biodata.tags
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
      const phonesToUpdate = preparePhonesForUpdate(
        member.phones || [],
        contactsData.phones
      )
      contactsData.phones = phonesToUpdate

      const { data } = await updateContactsData({
        ...contactsData,
        antaraId: member.antaraId,
      })
      const phones = transformPhones(data)

      return database.write(async () => {
        return member.update((m) => {
          m.phones = phones
          m.email = contactsData.email
          m.emergencyContact = contactsData.emergencyContact
          m.isSynced = true
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
      const addresses = prepareAddressesForUpdate(
        member.addresses || ({} as DbValueTypes.AddressValues),
        addressData
      )
      await updateAddressesData({
        ...addresses,
        antaraId: member.antaraId,
      })

      return database.write(async () => {
        return member.update((m) => {
          m.addresses = addressData
          m.isSynced = true
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
        verified =
          insurance.verificationStatus === InsuranceVerificationStatus.VERIFIED
      }

      const update = {
        insurances: newInsurances,
        antaraId: member.antaraId,
        employer: insuranceDetails.employer,
      }

      await database.write(async () => {
        await member.update((m) => {
          m.insurances = update
          m.isSynced = true
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
      const insurances = prepareInsurancesForUpdate(
        member.insurances || ({} as DbValueTypes.InsuranceDetailsValues),
        insuranceDetails
      )
      const variables = removeEmpty({
        insurances: insurances.length ? insurances : null,
        employer: insuranceDetails.employer || null,
      })
      if (!!variables.insurances && !!variables.employer) {
        await updateInsuranceDetails({
          ...variables,
          antaraId: member.antaraId,
        })
        return database.write(async () => {
          return member.update((m) => {
            m.insurances = insuranceDetails
            m.employer = insuranceDetails.employer
            m.isSynced = true
          })
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
        return database.write(async () => {
          return member.update((m) => {
            m.phones = newPhones
            m.phone = priority0Phone
          })
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
      return database.write(async () => {
        return member.update((m) => {
          m.birthDate = dayjs(birthDate).format('YYYY-MM-DD')
        })
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
          status: values?.status || '',
          assignedMe: values?.assignedMe?.emailUsername || '',
          assignedHn: values?.assignedHn?.emailUsername || '',
          assignedNutritionist:
            values?.assignedNutritionist?.emailUsername || '',
        }

        await updateStatus(payload)
        await database.write(async () => {
          await member.update((m) => {
            m.onboardStage = values?.onboardStage || ''
            m.status = values?.status || ''
            m.assignedMe = values?.assignedMe || {}
            m.assignedHn = values?.assignedHn || {}
            m.assignedNutritionist = values?.assignedNutritionist || {}
          })
        })
      }
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
      updatingInsuranceDetails ||
      updatingPhones ||
      updatingBirthdate ||
      updatingStatus,
    isVerifyingInsurance: verifyingInsuranceDetails,
    handleUpdatePhones,
    isUpdatingPhones: updatingPhones,
    handleUpdateBirthdate,
    handleUpdateStatus,
  }
}
