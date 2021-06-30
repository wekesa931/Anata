import { gql } from '@apollo/client'

const MAKE_CALL = gql`
  mutation placeCall($recipient: String!, $antaraId: String!) {
    placeCall(recipient: $recipient, antaraId: $antaraId) {
      status
      message
    }
  }
`

const SAVE_FCM_TOKEN = gql`
  mutation registerToken($identifier: String!, $token: String!) {
    registerToken(identifier: $identifier, token: $token) {
      status
      details
    }
  }
`

const TRANSFER_CALL = gql`
  mutation transferCall(
    $phoneNumber: String!
    $session: String!
    $staffEmail: String!
  ) {
    transferCall(
      phoneNumber: $phoneNumber
      session: $session
      staffEmail: $staffEmail
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
          dependents {
            fullName
            status
            contactPhone1
            contactPhone2
            relationshipToPrimary
          }
        }
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
        }
      }
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export {
  MAKE_CALL,
  SAVE_FCM_TOKEN,
  MEMBER_CONTACT_DETAILS,
  GET_CALL_LOG,
  TRANSFER_CALL,
}
