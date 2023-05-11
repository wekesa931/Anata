import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import logError from 'src/utils/logging/logger'
import {
  MEMBER_DETAILS_QUERY,
  UPDATE_MEMBER_DETAILS,
} from 'src/modules/member/services/gql'
import Toasts from 'src/components/toasts/alert-toast'
import { GLOBAL_SEARCH } from 'src/gql/search'
import { V2MemberQueryType, V2MemberType } from 'src/modules/member/types'
/**
 * Extract member details from graphql response structure
 */
const parseV2MemberData = (
  memberData: V2MemberQueryType
): V2MemberType | null => {
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
  member.assignedMe = status?.assignedMeEmailUsername
  member.assignedHn = status?.assignedHnEmailUsername

  // contacts
  const { contact = {} } = memberData
  member = { ...member, ...contact }

  // insurance details
  const { insuranceDetails = {} } = memberData
  member = { ...member, insuranceDetails }

  // dependents and primary
  const { otherDependents = [], primary = null } = memberData
  member = { ...member, otherDependents, primary }

  return member
}

interface IBeneData {
  id: string
  details: {
    fullName: string
    relationshipToPrimary: string
    sex: { sex: string }
  }
  status: { status: { status: string } }
  birthDate: string
}
interface IContacts {
  status: string
  fullName: string
  contactPhone1: string
  contactPhone2: string
  emergencyContactName: string
  emergencyContactPhone1: string
  emergencyContactPhone2: string
  emergencyContactRelationship: string
  memberType: 'DEPENDENT' | 'Dependent' | 'PRIMARY' | 'Primary'
  dependents: IBeneData[]
  primary: IBeneData[]
  lastConsentReminder?: string
  otherDependents: IBeneData[]
  antaraId: string
  airtableRecordId: string
}

export interface Member {
  fullName: string
  phoneNumber: string
  antara_id: string
  airtable_rec_id: string
  messageTemplate?: string
}

const initialContacts: IContacts = {
  status: '',
  fullName: '',
  contactPhone1: '',
  contactPhone2: '',
  emergencyContactName: '',
  emergencyContactPhone1: '',
  emergencyContactPhone2: '',
  emergencyContactRelationship: '',
  memberType: 'DEPENDENT',
  dependents: [],
  primary: [],
  otherDependents: [],
  antaraId: '',
  airtableRecordId: '',
}

type MemberContextType = {
  member: Member | any
  memberContact: IContacts
  setCurrentMember: (member: any) => void
  v2Member: any
  isLoading: boolean
  isSubmitting: boolean
  handleMemberUpdate: (variables: any) => any
  errorLoadingMember: any
  primaryMemberHif: any
  refetchMember: () => void
}

const MemberContext = React.createContext<MemberContextType>({
  member: null,
  memberContact: initialContacts,
  setCurrentMember: (member: any) => {
    return member || null
  },
  v2Member: null,
  primaryMemberHif: null,
  isLoading: false,
  isSubmitting: false,
  handleMemberUpdate: () => null,
  errorLoadingMember: null,
  refetchMember: () => null,
})

function MemberProvider({ member, children }: any) {
  const [currentMember, setCurrentMember] = useState(member)
  const [primaryMemberHif, setPrimaryMemberHif] = useState<any>(null)
  const [memberContactDetails, setmemberContactDetails] =
    useState<IContacts>(initialContacts)
  const [v2Member, setV2Member] = useState<V2MemberType | null>(null)

  const [getMember, { loading, error: errorLoadingMember, refetch }] =
    useLazyQuery(MEMBER_DETAILS_QUERY, {
      context: {
        clientName: 'v2',
      },
      onCompleted: (data) => {
        const memberDetails = data?.members.edges[0]?.node

        if (!memberDetails) {
          Toasts.showErrorNotification('Member not found in v2 schema.')
          return
        }
        const parsedMember = parseV2MemberData(memberDetails)
        setV2Member(parsedMember)

        const fetchedMemberDetails = memberDetails?.details
        const fetchedMemberContact = memberDetails?.contact
        const fetchedMemberStatus = memberDetails?.status
        const fetchedMemberPhones = memberDetails?.phones
        const fetchedDependents = memberDetails?.dependents
        const fetchedPrimary = memberDetails?.primary
        const fetchedOtherDependents = memberDetails?.otherDependents

        const newMemberDetails: IContacts = {
          status: fetchedMemberStatus?.onboardStage?.onboardStage || '',
          fullName: fetchedMemberDetails?.fullName || '',
          contactPhone1: fetchedMemberPhones?.[0]?.phone || '',
          contactPhone2: fetchedMemberPhones?.[1]?.phone || '',
          emergencyContactName:
            fetchedMemberContact?.emergencyContactName || '',
          emergencyContactPhone1:
            fetchedMemberContact?.emergencyContactPhone || '',
          emergencyContactPhone2:
            fetchedMemberContact?.emergencyContactPhone || '',
          emergencyContactRelationship:
            fetchedMemberContact?.emergencyContactRelationship || '',
          memberType: fetchedPrimary?.length > 0 ? 'DEPENDENT' : 'PRIMARY',
          dependents: fetchedDependents || [],
          primary: fetchedPrimary || null,
          otherDependents: fetchedOtherDependents || [],
          antaraId: memberDetails?.antaraId || '',
          airtableRecordId: fetchedMemberDetails?.airtableRecordId || '',
        }

        if (memberDetails) {
          setmemberContactDetails(newMemberDetails)
        }
      },
      onError: (error) => {
        logError(error)
      },
    })

  const [updateMember, { loading: isSubmitting }] = useMutation(
    UPDATE_MEMBER_DETAILS,
    {
      context: {
        clientName: 'v2',
      },
    }
  )

  const [globalSearch] = useLazyQuery(GLOBAL_SEARCH, {
    onCompleted: (data) => {
      const res = data.globalSearch.data[0].fields
      setPrimaryMemberHif({ ...res })
    },
  })

  React.useEffect(() => {
    if (member) {
      getMember({
        variables: { antaraId: member['Antara ID'] },
      })
      if (member['Minor?'] === 'Minor') {
        globalSearch({
          variables: {
            table: 'HIF',
            field: 'Antara ID (from Member)',
            searchParam: member['Antara ID'] || '',
            antaraIdKey: '',
            antaraIdValue: '',
          },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const handleMemberUpdate = async (inputVariables: any) => {
    try {
      return await updateMember({
        variables: {
          ...inputVariables,
        },
      })
    } catch (error) {
      logError(error)
      throw error
    }
  }

  const providerValue = React.useMemo(
    () => ({
      member: currentMember,
      memberContact: memberContactDetails,
      setCurrentMember,
      primaryMemberHif,
      v2Member,
      isLoading: loading,
      isSubmitting,
      handleMemberUpdate,
      errorLoadingMember,
      refetchMember: refetch,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMember, memberContactDetails, v2Member, primaryMemberHif]
  )

  return (
    <MemberContext.Provider value={providerValue}>
      {children}
    </MemberContext.Provider>
  )
}
const useMember = () => React.useContext(MemberContext)

export { MemberProvider, useMember }
