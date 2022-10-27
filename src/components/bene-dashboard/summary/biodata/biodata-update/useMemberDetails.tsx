import { useState, useEffect } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import {
  MEMBER_DETAILS_QUERY,
  GET_INSURANCE_COMPANIES,
  LOOKUP_ENTRIES_QUERY,
  UPDATE_MEMBER_DETAILS,
} from '../../../../../gql/comms'
import { GET_ANTARA_STAFF } from '../../../../../gql/staff'
import createApolloClient from '../../../../../resources/apollo-client'
import logError from '../../../../utils/Bugsnag/Bugsnag'

// v2 schema apollo client
const apolloClient = createApolloClient(true)

/**
 * Parse the details into a selectable elements
 * @param data - graphql response for fetch company details
 */

const parseDataToOptions = (data: any, key: string) => {
  const raw: any[] = data?.edges

  return raw?.map((e) => ({ label: e?.node[key], value: e?.node[key] }))
}

/**
 * Extract member details from graphql response structure
 */
const parseV2MemberData = (memberData: any) => {
  if (!memberData) {
    return null
  }

  let member: any = {}
  member.antaraId = memberData?.antaraId
  member.birthDate = memberData?.birthDate

  // details information
  const { details = {} } = memberData
  member = { ...member, ...details }

  member.sex = details?.sex?.sex
  member.maritalStatus = details?.maritalStatus?.maritalStatus

  // phones
  const { phones = [] } = memberData
  const primaryPhoneDetails = phones.length
    ? { phone: phones[0].phone, phoneType: phones[0].phoneType?.phoneType }
    : {}
  const { phone, phoneType } = primaryPhoneDetails

  member.phone = phone
  member.phoneType = phoneType
  member.phones = phones.map((e: any) => ({
    phone: e.phone,
    phoneType: e.phoneType?.phoneType,
    priority: e.priority,
  }))

  // status
  const { status = {} } = memberData
  member = { ...member, ...status }

  member.employer = status?.employer?.name
  member.onboardStage = status?.onboardStage?.onboardStage
  member.status = status?.status?.status

  // contacts
  const { contact = {} } = memberData
  member = { ...member, ...contact }

  // insurance details
  const { insuranceDetails = {} } = memberData
  member = { ...member, insuranceDetails }

  return member
}

type LookupOption = {
  label: string
  value: string
}

type SnackBarData = {
  level: 'error' | 'success'
  message: string
  errors?: any
}

const createInitialFormState = (member: any = {}) => {
  const getInsurances = () => {
    const { insuranceDetails = [] } = member

    return insuranceDetails.map((e: any) => ({
      insuranceCompany: e?.insuranceCompany?.name,
      insuranceId: e?.insuranceId,
      benefits: e?.benefitUtilizations?.map((b: any) => b?.benefit?.name),
      priority: e?.priority,
      healthPolicy: e?.memberPolicy?.healthPolicy?.name,
    }))
  }

  // // get the memberAddress information
  const getMemberAddress = () => {
    const { memberAddresses = [] } = member
    let constituency = ''

    const addresses = memberAddresses.map((e: any) => {
      if (e?.constituency) {
        constituency = e?.constituency
      }

      return {
        residentialAddress: {
          description: e?.residentialAddress,
          place_id: e?.geolocation,
        },
        label: e?.label,
        deliveryInstructions: e?.deliveryInstructions,
      }
    })

    // filter out addresses with null geolocation
    const filteredAddresses = addresses.filter(
      (e: any) => e?.residentialAddress?.place_id
    )

    return filteredAddresses.map((a: any, i: number) => ({
      ...a,
      constituency,
      priority: i,
    }))
  }

  return {
    memberDetails: {
      birthDate: member?.birthDate,
      firstName: member?.firstName,
      lastName: member?.lastName,
      middleName: member?.middleName,
      sex: member?.sex,
    },
    memberPhones: member?.phones,
    memberContact: {
      email: member?.email,
      constituency: member?.constituency,
      emergencyContactName: member?.emergencyContactName,
      emergencyContactPhone: member?.emergencyContactPhone,
      emergencyContactRelationship: member?.emergencyContactRelationship,
    },
    memberInsurance: [...getInsurances()],
    memberAddress: [...getMemberAddress()],
    memberStatus: {
      maritalStatus: member?.maritalStatus,
      onboardStage: member?.onboardStage,
      status: member?.status,
      employer: member?.employer,
      tags: member?.tags,
    },
    memberStaff: {
      assignedHn: member?.assignedHn,
      assignedMe: member?.assignedMe,
    },
  }
}

const useMemberDetails = (
  member: any = {},
  closeForm?: (feedback: SnackBarData) => void
) => {
  const [companies, setCompanies] = useState<any[]>([])
  const [v2Member, setV2Member] = useState<any | null>(null)
  const [healthPolicies, setHealthPolicies] = useState<LookupOption[]>([])
  const [phoneTypes, setPhoneTypes] = useState<LookupOption[]>([])
  const [memberStatus, setMemberStatus] = useState<LookupOption[]>([])
  const [insuranceCompanies, setInsuranceCompanies] = useState<LookupOption[]>(
    []
  )
  const [onboardingStages, setOnboardingStages] = useState<LookupOption[]>([])
  const [sexOptions, setSexOptions] = useState<LookupOption[]>([])
  const [maritalStatus, setMaritalStatus] = useState<LookupOption[]>([])
  const [submitting, setIsSubmitting] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<Array<string>>([])
  const [benefits, setBenefits] = useState<LookupOption[]>([])
  const [antaraStaff, setAntaraStaff] = useState<LookupOption[]>([])
  const [initialValues, setInitialValues] = useState<any>({})
  const [tags, setTags] = useState<LookupOption[]>([])

  const [getMember, { data: memberDetails, loading: memberLoading, refetch }] =
    useLazyQuery(MEMBER_DETAILS_QUERY, { client: apolloClient })
  const { data: lookupData, loading: lookupDataLoading } = useQuery(
    LOOKUP_ENTRIES_QUERY,
    { client: apolloClient }
  )
  const { data: insuranceData, loading: isInsuranceLoading } = useQuery(
    GET_INSURANCE_COMPANIES
  )

  const { data: antaraStaffData, loading: isAntaraStaffLoading } =
    useQuery(GET_ANTARA_STAFF)

  const parseLookupEntries = (rawLookupData: any) => {
    setCompanies(parseDataToOptions(rawLookupData?.getCompanies, 'name'))
    setHealthPolicies(parseDataToOptions(rawLookupData?.healthPolicies, 'name'))
    setMemberStatus(parseDataToOptions(rawLookupData?.memberStatus, 'status'))
    setOnboardingStages(
      parseDataToOptions(rawLookupData?.onboardStage, 'onboardStage')
    )
    setSexOptions(parseDataToOptions(rawLookupData?.sex, 'sex'))
    setMaritalStatus(
      parseDataToOptions(rawLookupData?.maritalStatus, 'maritalStatus')
    )
    setPhoneTypes(parseDataToOptions(rawLookupData?.phoneTypes, 'phoneType'))
    setBenefits(parseDataToOptions(rawLookupData?.benefits, 'name'))
    setTags(parseDataToOptions(rawLookupData?.tags, 'name'))
  }

  useEffect(() => {
    if (member) {
      getMember({ variables: { antaraId: member['Antara ID'] } })
    }

    if (memberDetails) {
      const memberRaw = memberDetails?.members.edges[0]?.node
      setV2Member(parseV2MemberData(memberRaw))
    }

    if (lookupData) {
      parseLookupEntries(lookupData)
    }

    if (insuranceData) {
      setInsuranceCompanies(
        parseDataToOptions(insuranceData?.insuranceCompanies, 'name')
      )
    }

    if (antaraStaffData) {
      const rawData = antaraStaffData?.antaraStaff?.edges
      setAntaraStaff(
        rawData.map((e: any) => ({
          label: e?.node?.fullName,
          value: e?.node?.emailUsername,
        }))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, memberDetails, lookupData, insuranceData, antaraStaffData])

  const [updateMember, { loading: updatingMemberDetails }] = useMutation(
    UPDATE_MEMBER_DETAILS,
    {
      client: apolloClient,
    }
  )

  useEffect(() => {
    if (v2Member) {
      setInitialValues(createInitialFormState(v2Member))
    }

    setIsSubmitting(updatingMemberDetails)
  }, [v2Member, updatingMemberDetails])

  const isDataLoading = [
    memberLoading,
    isInsuranceLoading,
    lookupDataLoading,
    isAntaraStaffLoading,
  ].some((l) => !!l)

  const cleanObject = (obj: any) => {
    const cleanedObj = { ...obj }
    Object.keys(cleanedObj).forEach((key) => {
      if (cleanedObj[key] === undefined || cleanedObj[key] === null) {
        cleanedObj[key] = ''
      } else if (typeof cleanedObj[key] === 'object') {
        if (Array.isArray(cleanedObj[key])) {
          cleanedObj[key] = cleanedObj[key].map((e: any) => {
            if (typeof e === 'object') {
              return cleanObject(e)
            }
            return e
          })
        } else {
          cleanedObj[key] = cleanObject(cleanedObj[key])
        }
      }
    })
    return cleanedObj
  }

  const prepareData = (vars: any) => {
    const inputVariables = { ...vars }

    if (inputVariables.memberPhones) {
      inputVariables.memberPhones = {
        phones: inputVariables.memberPhones,
        antaraId: member['Antara ID'],
      }
    }

    if (inputVariables.memberInsurance) {
      inputVariables.memberInsurance = {
        insuranceDetails: inputVariables.memberInsurance,
        antaraId: member['Antara ID'],
      }
    }

    if (inputVariables.memberAddress) {
      inputVariables.memberAddress = {
        addresses: inputVariables.memberAddress.map((e: any) => ({
          ...e,
          geolocation: e?.residentialAddress?.place_id,
          residentialAddress: e?.residentialAddress?.description,
        })),
        antaraId: member['Antara ID'],
      }

      // omit the key priority from addresses in memberAddress
      inputVariables.memberAddress.addresses.forEach((e: any) => {
        delete e.priority
      })
    }

    Object.keys(inputVariables).forEach((key) => {
      if (key !== 'antaraId') {
        inputVariables[key] = {
          ...inputVariables[key],
          antaraId: member['Antara ID'],
        }
      }
    })

    return inputVariables
  }

  const handleFormSubmissionErrors = (data: any) => {
    const errors = Object.keys(data).filter((key) => data[key].errors)
    const errorMessages = errors.map(
      (e) =>
        `There was an error updating ${e
          .replace('update', '')
          .replace('Member', '')}`
    )

    return errorMessages
  }

  const handleSubmit = (values: any) => {
    setIsSubmitting(true)
    const inputVariables = prepareData(cleanObject(values))

    updateMember({
      variables: {
        ...inputVariables,
      },
    })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((res) => {
        refetch({ antaraId: member['Antara ID'] })
        const errors = handleFormSubmissionErrors(res?.data)
        if (errors.length > 0) {
          setFormErrors(errors)
          setIsSubmitting(false)

          closeForm &&
            closeForm({
              level: 'error',
              message: 'An error occured while updating the member details',
              errors,
            })

          Object.keys(res?.data).forEach((key) => {
            if (res?.data[key].errors) {
              logError({
                name: 'MemberDetailsForm',
                error: res?.data[key].errors,
              })
            }
          })

          return
        }

        setFormErrors([])
        setIsSubmitting(false)
        closeForm &&
          closeForm({
            level: 'success',
            message: 'Member details updated successfully',
          })
      })
      .catch((err) => {
        logError(err)
        setFormErrors(err.graphQLErrors.map((e: any) => e.message))
        setIsSubmitting(false)
        closeForm &&
          closeForm({
            level: 'error',
            message: 'Error updating member details',
            errors: err.graphQLErrors.map((e: any) => e.message),
          })
      })
  }

  return {
    setV2Member,
    companies,
    formErrors,
    isDataLoading,
    handleSubmit,
    submitting,
    member,
    v2Member,
    healthPolicies,
    phoneTypes,
    memberStatus,
    insuranceCompanies,
    onboardingStages,
    sexOptions,
    maritalStatus,
    benefits,
    antaraStaff,
    initialValues,
    tags,
  }
}

export default useMemberDetails
