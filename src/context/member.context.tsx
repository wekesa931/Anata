import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { MEMBER_CONTACT_DETAILS } from '../gql/comms'

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

interface IBeneData {
  airtableRecordId: string
  fullName: string
  status: string
  contactPhone1: string
  contactPhone2: string
  relationshipToPrimary: string
  birthDate: string
  sex: string
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
  const { data: rawApiRecords } = useQuery(MEMBER_CONTACT_DETAILS, {
    variables: { antaraId: member['Antara ID'] },
  })
  const [currentMember, setCurrentMember] = useState(member)
  const [memberContactDetails, setmemberContactDetails] =
    useState<IContacts>(initialContacts)

  React.useEffect(() => {
    if (rawApiRecords) {
      setmemberContactDetails(rawApiRecords?.beneficiary.edges[0]?.node)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawApiRecords])

  return (
    <MemberContext.Provider
      value={{
        member: currentMember,
        memberContact: memberContactDetails,
        setCurrentMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}
const useMember = () => React.useContext(MemberContext)

export { MemberProvider, useMember }
