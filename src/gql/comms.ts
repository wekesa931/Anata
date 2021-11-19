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
          }
          dependents {
            airtableRecordId
            fullName
            status
            contactPhone1
            contactPhone2
            relationshipToPrimary
          }
          kenyaNationalId
          employerName
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
          callbackTaskId
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
}
