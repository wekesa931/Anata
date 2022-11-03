import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { MEMBER_DETAILS_QUERY } from '../gql/comms'
import createApolloClient from '../resources/apollo-client'

const apolloClient = createApolloClient(true)

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
}

type MemberContextType = {
  member: Member | any
  memberContact: IContacts
  setCurrentMember: (member: any) => void
}

const MemberContext = React.createContext<MemberContextType>({
  member: null,
  memberContact: initialContacts,
  setCurrentMember: (member: any) => {
    return member || null
  },
})

function MemberProvider({ member, children }: any) {
  const { data: memberData } = useQuery(MEMBER_DETAILS_QUERY, {
    variables: { antaraId: member['Antara ID'] },
    client: apolloClient,
  })

  const [currentMember, setCurrentMember] = useState(member)
  const [memberContactDetails, setmemberContactDetails] =
    useState<IContacts>(initialContacts)

  React.useEffect(() => {
    const memberDetails = memberData?.members?.edges?.[0]?.node

    const fetchedMemberDetails = memberDetails?.details
    const fetchedMemberContact = memberDetails?.contact
    const fetchedMemberStatus = memberDetails?.status
    const fetchedMemberPhones = memberDetails?.phones
    const fetchedDependents = memberDetails?.dependents
    const fetchedPrimary = memberDetails?.primary

    const newMemberDetails: IContacts = {
      status: fetchedMemberStatus?.onboardStage?.onboardStage || '',
      fullName: fetchedMemberDetails?.fullName || '',
      contactPhone1: fetchedMemberPhones?.[0]?.phone || '',
      contactPhone2: fetchedMemberPhones?.[1]?.phone || '',
      emergencyContactName: fetchedMemberContact?.emergencyContactName || '',
      emergencyContactPhone1: fetchedMemberContact?.emergencyContactPhone || '',
      emergencyContactPhone2: fetchedMemberContact?.emergencyContactPhone || '',
      emergencyContactRelationship:
        fetchedMemberContact?.emergencyContactRelationship || '',
      memberType: fetchedPrimary?.length > 0 ? 'DEPENDENT' : 'PRIMARY',
      dependents: fetchedDependents || [],
      primary: fetchedPrimary || [],
    }

    if (memberDetails) {
      setmemberContactDetails(newMemberDetails)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData])

  const providerValue = React.useMemo(
    () => ({
      member: currentMember,
      memberContact: memberContactDetails,
      setCurrentMember,
    }),
    [currentMember, memberContactDetails]
  )

  return (
    <MemberContext.Provider value={providerValue}>
      {children}
    </MemberContext.Provider>
  )
}
const useMember = () => React.useContext(MemberContext)

export { MemberProvider, useMember }
