import { gql } from '@apollo/client'

const MAKE_CALL = gql`
  mutation placeCall(
    $recipient: String!
    $antaraId: String
    $dialPadUsed: Boolean
  ) {
    placeCall(
      recipient: $recipient
      antaraId: $antaraId
      dialPadUsed: $dialPadUsed
    ) {
      status
      message
      session
    }
  }
`

const SAVE_FCM_TOKEN = gql`
  mutation registerToken($identifier: String!, $token: String!) {
    registerToken(identifier: $identifier, token: $token) {
      status
    }
  }
`

const TRANSFER_CALL = gql`
  mutation transferCall(
    $phoneNumber: String!
    $session: String!
    $staffEmail: String!
    $onTransferAction: String!
  ) {
    transferCall(
      phoneNumber: $phoneNumber
      session: $session
      staffEmail: $staffEmail
      onTransferAction: $onTransferAction
    ) {
      status
      message
    }
  }
`

const MEMBER_CONTACT_DETAILS = gql`
  query beneficiary($antaraId: String!) {
    beneficiary(antaraId: $antaraId) {
      edges {
        node {
          status
          fullName
          contactPhone1
          contactPhone2
          emergencyContactName
          emergencyContactPhone1
          emergencyContactPhone2
          emergencyContactRelationship
          memberType
          primary {
            fullName
            airtableRecordId
            status
            contactPhone1
            contactPhone2
            relationshipToPrimary
            birthDate
            sex
          }
          dependents {
            airtableRecordId
            fullName
            status
            contactPhone1
            contactPhone2
            relationshipToPrimary
            birthDate
            sex
          }
          kenyaNationalId
          employerName
          intercomUrl
          lastConsentReminder
        }
      }
    }
  }
`

const MEMBER_DETAILS_QUERY = gql`
  query members($antaraId: String) {
    members(antaraId: $antaraId) {
      edges {
        node {
          antaraId
          birthDate
          details {
            fullName
            firstName
            middleName
            lastName
            sex {
              sex
            }
            maritalStatus {
              maritalStatus
            }
            relationshipToPrimary
          }
          phones {
            phone
            phoneType {
              phoneType
            }
            priority
          }
          status {
            startDate
            onboardStage {
              onboardStage
            }
            employer {
              name
            }
            assignedHn
            assignedHnFullName
            readyForCompanyOnboarding
            readyForIndividualOnboarding
            assignedMe
            tags
            status {
              status
            }
          }
          dependents {
            id
            antaraId
            birthDate
            status {
              status {
                status
              }
            }
            details {
              fullName
              sex {
                sex
              }
              relationshipToPrimary
            }
          }
          contact {
            memberAddresses {
              constituency
              residentialAddress
              residentialCountry
              residentialCounty
              residentialTown
              deliveryInstructions
              poBoxNumber
              postCode
              geolocation
              label
            }
            email
            emergencyContactName
            emergencyContactPhone
            emergencyContactRelationship
          }
          insuranceDetails {
            id
            insuranceId
            priority
            insuranceCompany {
              id
              name
              logo
            }
            memberPolicy {
              healthPolicy {
                name
              }
            }
            benefitUtilizations {
              id
              utilizedPortion
              benefit {
                name
                description
                api
                limit
              }
            }
          }
        }
      }
    }
  }
`

const MUTATE_MEMBER_DETAILS = gql`
  mutation updateMemberProfile($input: UpdateMemberProfileInput!) {
    profileData(input: $input) {
      error
      status
      profile {
        antaraId
        firstName
        middleName
        lastName
        sex
        birthDate
        birthDateEstimated
        email
        contactPhone1
        phoneType1
        contactPhone2
        phoneType2
        residentialAddress
        deliveryInstructions
        residentialTown
        residentialCounty
        residentialCountry
        emergencyContactName
        emergencyContactPhone
        emergencyContactRelationship
        poBoxNumber
        postCode
        insuranceId
        corporateId
        onboardStage
        memberStatus
        employer {
          name
        }
        maritalStatus
        verificationStatus
        hasConsentedToTermsAndOurPrivacy
        appInstalled
      }
    }
  }
`

const GET_CALL_LOG = gql`
  query conferenceSessions {
    conferenceSessions {
      edges {
        node {
          origin
          callDirection
          createdAt
          endedAt
          startedAt
          deadline
          activeParticipants
          totalParticipants
          roomName
          agentPhone
          agentEmail
          memberPhone
          sessionStarted
          sessionEnded
          allPresent
          inCallDuration
          memberAntaraId
          memberAirtableId
          callbackTaskId
        }
      }
    }
  }
`

const GET_CALL_LOGS = gql`
  query conferenceSessions($antaraId: String) {
    conferenceSessions(antaraId: $antaraId) {
      edges {
        node {
          origin
          callDirection
          createdAt
          endedAt
          startedAt
          deadline
          activeParticipants
          totalParticipants
          roomName
          agentPhone
          agentEmail
          memberPhone
          sessionStarted
          sessionEnded
          allPresent
          inCallDuration
          memberAntaraId
          memberAirtableId
          callbackTaskId
          memberAnswered
          agentAnswered
        }
      }
    }
  }
`

const GET_SESSION_PARTICIPANTS = gql`
  query callSessions($conferenceRoom: String!) {
    callSessions(conferenceRoom: $conferenceRoom) {
      edges {
        node {
          isOnHold
          participantId
          isStaff
          isMember
          phoneNumber
          callerEmail
          conferenceRoom
          participantName
        }
      }
    }
  }
`

const VALIDATE_BIODATA = gql`
  mutation validateBiodata(
    $sessionName: String!
    $participantSessionId: String!
  ) {
    validateBiodata(
      sessionName: $sessionName
      participantSessionId: $participantSessionId
    ) {
      status
      message
    }
  }
`

const HOLD_PARTICIPANT = gql`
  mutation holdParticipant($session: String!, $participantId: String!) {
    holdParticipant(session: $session, participantId: $participantId) {
      status
      message
    }
  }
`

const UNHOLD_PARTICIPANT = gql`
  mutation unholdParticipant($session: String!, $participantId: String!) {
    unholdParticipant(session: $session, participantId: $participantId) {
      status
      message
    }
  }
`

const UPDATE_CONTACT = gql`
  mutation updateBeneficiaryContacts($input: BeneficiaryContactInput!) {
    updateBeneficiaryContacts(input: $input) {
      status
      message
      validationErrors
      data {
        contactPhone1
        contactPhone2
      }
    }
  }
`

const UPDATE_PHONES = gql`
  mutation updateMemberPhones($input: UpdateMemberPhonesInput!) {
    updateMemberPhones(input: $input) {
      status
      message
      errors
      data {
        phones {
          phone
          phoneType {
            phoneType
          }
          priority
        }
      }
    }
  }
`

const GET_ACTIVE_CALL = gql`
  query activeCall {
    activeCall {
      edges {
        node {
          session {
            origin
            callDirection
            createdAt
            endedAt
            startedAt
            deadline
            activeParticipants
            totalParticipants
            roomName
            agentPhone
            agentEmail
            memberPhone
            sessionStarted
            sessionEnded
            allPresent
            inCallDuration
          }
          participants {
            sessionId
            antaraId
            callerEmail
            phoneNumber
            status
            biodataValidated
            sessionEnded
            answered
            conferenceRoom
            callDirection
            duration
            endedAt
            calledAt
            receivedAt
            joinedAt
            leftAt
            recordingUrl
            cost
            hangupCause
            participantName
            userId
            isMember
            isStaff
            isOnHold
            participantId
          }
        }
      }
    }
  }
`

const END_CALL = gql`
  mutation endCall($session: String!) {
    endCall(session: $session) {
      status
      message
    }
  }
`

const GET_INSURANCE_COMPANIES = gql`
  query insuranceCompanies($name: String) {
    insuranceCompanies(name: $name) {
      edges {
        node {
          name
          email
          api
          phone
        }
      }
    }
  }
`

const LOOKUP_ENTRIES_QUERY = gql`
  query {
    getCompanies {
      edges {
        node {
          name
        }
      }
    }
    healthPolicies {
      edges {
        node {
          healthPolicyId
          name
        }
      }
    }
    phoneTypes {
      edges {
        node {
          phoneType
          phoneTypeId
        }
      }
    }
    memberStatus {
      edges {
        node {
          status
        }
      }
    }
    maritalStatus {
      edges {
        node {
          maritalStatus
        }
      }
    }
    onboardStage {
      edges {
        node {
          onboardStage
        }
      }
    }
    sex {
      edges {
        node {
          sex
        }
      }
    }
    benefits {
      edges {
        node {
          name
        }
      }
    }
    tags {
      edges {
        node {
          name
        }
      }
    }
  }
`

const UPDATE_MEMBER_DETAILS = gql`
  mutation UpdateMemberDetails(
    $memberDetails: UpdateMemberDetailsInput
    $memberContact: UpdateMemberContactInput
    $memberInsurance: UpdateMemberInsuranceInput
    $memberPhones: UpdateMemberPhonesInput
    $memberStaff: UpdateMemberStaffInput
    $memberStatus: MemberStatusUpdateInput
    $memberAddress: UpdateMemberAddressesInput
  ) {
    updateMemberAddress(input: $memberAddress) {
      data {
        addresses {
          constituency
          geolocation
          residentialAddress
          label
          deliveryInstructions
        }
      }
      message
      errors
      status
    }
    updateMemberStatus(input: $memberStatus) {
      data {
        employer {
          name
        }
        status {
          status
        }
        onboardStage {
          onboardStage
        }
        tags
      }
      errors
      message
      status
    }
    updateMemberStaff(input: $memberStaff) {
      data {
        assignedHn
        assignedMe
      }
      errors
      message
      status
    }
    updateMemberDetails(input: $memberDetails) {
      data {
        member {
          id
        }
        details {
          firstName
          lastName
        }
      }
      errors
      message
      status
    }

    updateMemberContact(input: $memberContact) {
      data {
        email
        emergencyContactName
        emergencyContactPhone
        emergencyContactRelationship
      }
      errors
      status
      message
    }

    updateMemberInsurance(input: $memberInsurance) {
      data {
        insuranceDetails {
          insuranceCompany {
            name
          }
          insuranceId
          priority
          memberPolicy {
            healthPolicy {
              name
            }
          }
        }
      }
      message
      errors
      status
    }

    updateMemberPhones(input: $memberPhones) {
      data {
        phones {
          priority
          phoneType {
            phoneType
          }
          phone
        }
      }
      errors
      message
      status
    }
  }
`
// eslint-disable-next-line import/prefer-default-export
export {
  VALIDATE_BIODATA,
  MAKE_CALL,
  SAVE_FCM_TOKEN,
  MEMBER_CONTACT_DETAILS,
  GET_CALL_LOG,
  TRANSFER_CALL,
  UPDATE_CONTACT,
  GET_SESSION_PARTICIPANTS,
  HOLD_PARTICIPANT,
  UNHOLD_PARTICIPANT,
  GET_ACTIVE_CALL,
  END_CALL,
  GET_CALL_LOGS,
  MEMBER_DETAILS_QUERY,
  MUTATE_MEMBER_DETAILS,
  GET_INSURANCE_COMPANIES,
  LOOKUP_ENTRIES_QUERY,
  UPDATE_MEMBER_DETAILS,
  UPDATE_PHONES,
}
