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
} from 'src/modules/member/services/gql'
import type { BiodataValues, ContactValues } from 'src/modules/member/types'
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
    createMember: async () => {
      const res = await createMember()
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
      },
      memberStatus: {
        tags: values.tags,
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

export const useUpdateContactsData = () => {
  const CONTACTS_MUTATION = composeMutations(
    UPDATE_MEMBER_PHONES,
    UPDATE_MEMBER_CONTACT
  )
  const [update, { loading, error }] = useMutation(CONTACTS_MUTATION, {
    context: { clientName: 'v2' },
  })

  const updateContactsData = async (values: ContactValues) => {
    const { antaraId, emergencyContact } = values

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

export const useVerifyInsuranceDetails = () => {
  const [verify, { loading, error }] = useMutation(UPDATE_MEMBER_INSURANCE, {
    context: { clientName: 'v2' },
  })

  const verifyInsuranceDetails = async (values: any, antaraId: string) => {
    const response = await verify({
      variables: {
        memberInsurance: {
          insuranceDetails: values,
          antaraId,
        },
      },
    })

    if (response?.data?.updateMemberInsurance?.status !== 200) {
      throw new Error('Failed to verify insurance details')
    }

    return response?.data?.updateMemberInsurance?.data?.insuranceDetails
  }

  return {
    verifyInsuranceDetails,
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
        employer,
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
