import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import {
  MUTATE_MEMBER_DETAILS,
  GET_COMPANIES,
  MEMBER_DETAILS_QUERY,
} from '../../../../../gql/comms'
import createApolloClient from '../../../../../resources/apollo-client'

// v2 schema apollo client
const apolloClient = createApolloClient(true)

/**
 * Parse the company details into a selectable elements
 * @param data - graphql response for fetch company details
 */
const parseCompanyDetails = (data: any) => {
  const companies: Array<any> = data?.getCompanies.edges

  return companies?.map((edge) => {
    const name = edge?.node.name

    return { label: name, value: name }
  })
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
  const { phones } = memberData
  const primaryPhoneDetails = phones.length
    ? { phone: phones[0].phone, phoneType: phones[0].phoneType?.phoneType }
    : {}
  const { phone, phoneType } = primaryPhoneDetails

  member.phone = phone
  member.phoneType = phoneType

  // status
  const { status = {} } = memberData
  member = { ...member, ...status }

  member.employer = status?.employer?.name
  member.onboardStage = status?.onboardStage?.onboardStage

  // contacts
  const { contact = {} } = memberData
  member = { ...member, ...contact }

  // insurance details
  const { insuranceDetails = {} } = memberData
  member = { ...member, ...insuranceDetails }

  return member
}

const useMemberDetails = (
  member: any = {},
  closeForm?: (err?: string) => void
) => {
  const [companies, setCompanies] = useState<Array<any>>([])
  const [v2Member, setV2Member] = useState<any | null>(null)

  // v2 member details using a v2 client
  const { data: memberDetails, loading } = useQuery(MEMBER_DETAILS_QUERY, {
    variables: { antaraId: member['Antara ID'] },
    client: apolloClient,
  })

  const { data: companiesData, loading: isCompaniesLoading } = useQuery(
    GET_COMPANIES,
    { client: apolloClient }
  )
  const [updateMember] = useMutation(MUTATE_MEMBER_DETAILS, {
    client: apolloClient,
  })
  const [submitting, setIsSubmitting] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<Array<string>>([])

  useEffect(() => {
    if (companiesData) {
      setCompanies(parseCompanyDetails(companiesData))
    }

    if (memberDetails) {
      const memberRaw = memberDetails?.members.edges[0]?.node

      setV2Member(parseV2MemberData(memberRaw))
    }
  }, [companiesData, memberDetails])

  const isDataLoading = [loading, isCompaniesLoading].some((l) => !!l)

  // handle member details update
  const handleSubmit = (values: any) => {
    setIsSubmitting(true)
    // clear form errors
    setFormErrors([])
    const formValues = { ...values }

    // only update new values + required items
    // parse the phone number if any
    if ('phone' in formValues) {
      formValues.phoneNumberToUpdate = v2Member.phone || formValues.phone
    }

    if ('poBoxNumber' in formValues) {
      const parsed = parseInt(formValues.poBoxNumber)
      formValues.poBoxNumber = isNaN(parsed) ? null : parsed
    }

    if ('birthDate' in formValues) {
      formValues.birthDate = dayjs(formValues.birthDate).format('YYYY-MM-DD')
    }

    updateMember({
      variables: { input: formValues },
    })
      .then((res) => {
        const error = res.data?.profileData.error
        setIsSubmitting(false)

        if (error) {
          closeForm && closeForm(error)
        } else {
          setV2Member(formValues)
          closeForm && closeForm()
        }
      })
      .catch(() => {
        setIsSubmitting(false)
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
  }
}

export default useMemberDetails
