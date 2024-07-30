import { useLazyQuery, useMutation } from '@apollo/client'
import {
  CREATE_MEMBER,
  UPDATE_MEMBER_ADDRESSES,
  UPDATE_MEMBER_CONTACT,
  UPDATE_MEMBER_DETAILS,
  UPDATE_MEMBER_INSURANCE,
  UPDATE_MEMBER_PHONES,
  UPDATE_MEMBER_STATUS,
  GET_MEMBER_BY_PHONE,
  MEMBER_DETAILS_QUERY,
  UPDATE_MEMBER_STAFF,
  CREATE_COMPANY,
  MEMBER_COHORT,
} from 'src/modules/member/services/gql'
import type {
  BiodataValues,
  ContactValues,
  UpdatePhoneValues,
  BirthdateUpdateValues,
  UpdateStatusValues,
} from 'src/modules/member/types'
import { composeMutations } from 'src/modules/member/utils/apollo-compose'
import dayjs from 'dayjs'
import { parseV2MemberData } from 'src/utils/data-transform'
import { useLazyDataSource, NormalizeDataFn } from 'src/services/api/utils'
import {
  V2MemberType,
  MemberDetailsQueryVariables,
} from 'src/modules/member/types'

export const normalizeMemberDetails: NormalizeDataFn<any> = (data: any) => {
  if (data?.members?.edges?.length > 0) {
    return parseV2MemberData(data?.members?.edges[0]?.node)
  }

  return null
}

export const useGetMemberByAntaraId = () =>
  useLazyDataSource<V2MemberType, MemberDetailsQueryVariables>(
    MEMBER_DETAILS_QUERY,
    normalizeMemberDetails
  )

export const useGetMemberByPhone = () => {
  const [getMemberByPhone, { loading, error }] = useLazyQuery(
    GET_MEMBER_BY_PHONE,
    {
      context: {
        clientName: 'v2',
      },
      fetchPolicy: 'network-only',
    }
  )

  return {
    getMemberByPhone: async (phoneNumber: string) => {
      const res = await getMemberByPhone({
        variables: {
          phoneNumber,
        },
      })

      if (res?.data?.membersWithPhone?.edges?.length > 0) {
        return parseV2MemberData(res?.data?.membersWithPhone?.edges[0]?.node)
      }

      return null
    },
    loading,
    error,
  }
}

export const useCreateMember = () => {
  const [createMember, { loading, error }] = useMutation(CREATE_MEMBER, {
    context: {
      clientName: 'v2',
    },
  })

  return {
    createMember: async (memberRosterId: any) => {
      const res = await createMember({
        variables: {
          memberRosterId,
        },
      })
      if (res?.data?.createMember?.status !== 200) {
        const errorMessage = 'Failed to create member'
        throw new Error(errorMessage)
      }

      return res?.data?.createMember?.data?.antaraId
    },
    loading,
    error,
  }
}

export const useCreateCompany = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_COMPANY, {
    context: {
      clientName: 'v2',
    },
  })

  const createCompany = async (name: any) => {
    const res = await mutate({
      variables: {
        input: {
          name,
        },
      },
    })
    if (res?.data?.createCompany?.status !== 200) {
      const errorMessage = 'Failed to create company'
      throw new Error(errorMessage)
    }

    return res
  }

  return {
    createCompany,
    loading,
    error,
  }
}

export const useUpdateBiodata = () => {
  const BIODATA_MUTATION = composeMutations(
    UPDATE_MEMBER_DETAILS,
    UPDATE_MEMBER_STATUS
  )

  const [update, { loading, error }] = useMutation(BIODATA_MUTATION, {
    context: { clientName: 'v2' },
  })

  const updateBiodata = async (values: BiodataValues) => {
    const { antaraId } = values

    const variables = {
      memberDetails: {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        birthDate: values.birthDate
          ? dayjs(values.birthDate).format('YYYY-MM-DD')
          : null,
        sex: values.sex,
        maritalStatus: values.maritalStatus,
        antaraId,
        primaryMemberAntaraId: values.primaryMemberAntaraId,
        relationshipToPrimary: values.relationshipToPrimary,
        referralSource: values.referralSource,
        nhifNumber: values.nhifNumber,
        kenyaNationalId: values.kenyaNationalId,
      },
      memberStatus: {
        tags: values.tags,
        refusedServices: values.refusedServices,
        otherRefusedService: values.otherRefusedService,
        antaraId,
      },
    }

    return update({
      variables,
    })
  }

  return {
    updateBiodata,
    loading,
    error,
  }
}

export const useUpdateBirthdate = () => {
  const [update, { loading, error }] = useMutation(UPDATE_MEMBER_DETAILS, {
    context: { clientName: 'v2' },
  })

  const updateBirthdate = async (values: BirthdateUpdateValues) => {
    const { antaraId } = values

    const variables = {
      memberDetails: {
        birthDate: values.birthDate
          ? dayjs(values.birthDate).format('YYYY-MM-DD')
          : null,
        antaraId,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        sex: values.sex,
      },
    }

    return update({
      variables,
    })
  }

  return {
    updateBirthdate,
    loading,
    error,
  }
}

export const useUpdateContactsData = () => {
  const CONTACTS_MUTATION = composeMutations(
    UPDATE_MEMBER_PHONES,
    UPDATE_MEMBER_CONTACT
  )
  const [update, { loading, error }] = useMutation(CONTACTS_MUTATION, {
    context: { clientName: 'v2' },
  })

  const updateContactsData = async (values: ContactValues) => {
    const { antaraId, emergencyContact, caregiverContact } = values

    const variables = {
      memberPhones: {
        phones: values.phones,
        antaraId,
      },
      memberContact: {
        email: values.email,
        antaraId,
        emergencyContactName: emergencyContact?.name || '',
        emergencyContactPhone: emergencyContact?.phoneNumber || '',
        emergencyContactRelationship: emergencyContact?.relationship || '',
        caregiverName: caregiverContact?.name || '',
        caregiverNumber: caregiverContact?.phoneNumber || '',
      },
    }

    return update({
      variables,
    })
  }

  return {
    updateContactsData,
    loading,
    error,
  }
}

export const useUpdatePhones = () => {
  const [update, { loading, error }] = useMutation(UPDATE_MEMBER_PHONES, {
    context: { clientName: 'v2' },
  })

  const updatePhones = async (values: UpdatePhoneValues) => {
    const { antaraId, phones } = values

    const variables = {
      memberPhones: {
        phones,
        antaraId,
      },
    }

    return update({
      variables,
    })
  }

  return {
    updatePhones,
    loading,
    error,
  }
}

export const useUpdateAddressesData = () => {
  const [update, { loading, error }] = useMutation(UPDATE_MEMBER_ADDRESSES, {
    context: { clientName: 'v2' },
  })

  const updateAddressesData = async (values: any) => {
    return update({
      variables: {
        memberAddress: values,
      },
    })
  }

  return {
    updateAddressesData,
    loading,
    error,
  }
}

export const useUpdateInsuranceDetails = () => {
  const INSURANCE_UPDATE_MUTATION = composeMutations(
    UPDATE_MEMBER_INSURANCE,
    UPDATE_MEMBER_STATUS
  )

  const [update, { loading, error }] = useMutation(INSURANCE_UPDATE_MUTATION, {
    context: { clientName: 'v2' },
  })

  const updateInsuranceDetails = (values: any) => {
    const { antaraId, employer, insurances } = values

    const variables = {
      memberStatus: {
        antaraId,
        employer: employer?.name,
        ...(!!employer?.department?.departmentId && {
          departmentId: employer?.department?.departmentId,
        }),
        ...(!!employer?.businessLocation?.businessLocationId && {
          businessLocationId: employer?.businessLocation?.businessLocationId,
        }),
      },
      memberInsurance: {
        antaraId,
        insuranceDetails: insurances,
      },
    }

    return update({
      variables,
    })
  }

  return {
    updateInsuranceDetails,
    loading,
    error,
  }
}

export const useUpdateStatus = () => {
  const CONTACTS_MUTATION = composeMutations(
    UPDATE_MEMBER_STATUS,
    UPDATE_MEMBER_STAFF
  )

  const [update, { loading, error }] = useMutation(CONTACTS_MUTATION, {
    context: { clientName: 'v2' },
  })

  const updateStatus = async (values: UpdateStatusValues) => {
    const { antaraId } = values

    const variables = {
      memberStatus: {
        antaraId,
        onboardStage: values.onboardStage,
        status: values.status,
        verificationStatus: values.verificationStatus,
      },
      memberStaff: {
        antaraId,
        assignedHn: values.assignedHn,
        assignedMe: values.assignedMe,
        assignedNutritionist: values.assignedNutritionist,
      },
    }

    return update({
      variables,
    })
  }

  return {
    loading,
    error,
    updateStatus,
  }
}

export const useMemberCohorts = () => {
  const [getData, { loading, error }] = useLazyQuery(MEMBER_COHORT)

  const fetchMemberCohorts = async (antaraId: string) => {
    const response = await getData({
      variables: { antaraId },
      context: {
        clientName: 'v2',
      },
    })
    return response
  }

  return {
    fetchMemberCohorts,
    loading,
    error,
  }
}
