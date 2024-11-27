import { gql } from '@apollo/client'

export const GET_ACTIVE_CALL = gql`
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

export const MAKE_CALL = gql`
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

export const TRANSFER_CALL = gql`
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

export const END_CALL = gql`
  mutation endCall($session: String!) {
    endCall(session: $session) {
      status
      message
    }
  }
`

export const GET_CALL_LOG = gql`
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

export const UPDATE_CONTACT = gql`
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

export const HOLD_PARTICIPANT = gql`
  mutation holdParticipant($session: String!, $participantId: String!) {
    holdParticipant(session: $session, participantId: $participantId) {
      status
      message
    }
  }
`

export const UNHOLD_PARTICIPANT = gql`
  mutation unholdParticipant($session: String!, $participantId: String!) {
    unholdParticipant(session: $session, participantId: $participantId) {
      status
      message
    }
  }
`

export const VALIDATE_BIODATA = gql`
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

export const UPDATE_PHONES = gql`
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

export const SEND_SMS = gql`
  mutation sendSms($message: String!, $antaraId: String!, $type: String) {
    sendSms(message: $message, antaraId: $antaraId, type: $type) {
      status
      message
    }
  }
`

export const GET_CALL_LOGS = gql`
  query conferenceSessions($antaraId: String!, $last: Int, $first: Int) {
    conferenceSessions(antaraId: $antaraId, last: $last, first: $first) {
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

export const GET_MEMBER_CHATS = gql`
  query memberMessages($antaraId: String!) {
    memberMessages(antaraId: $antaraId) {
      edges {
        node {
          id
          message
          direction
          attachments
          status
          channel
          staffName
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const SEND_WHATSAPP_MESSAGE = gql`
  mutation sendWhatsAppMessageMutation($input: SendWhatsappMessageInput!) {
    sendWhatsappMessage(input: $input) {
      message
    }
  }
`
