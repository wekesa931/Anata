import { gql } from '@apollo/client'

const SEND_SMS = gql`
  mutation sendSms($message: String!, $antaraId: String!) {
    sendSms(message: $message, antaraId: $antaraId) {
      status
      message
    }
  }
`
const GET_MEMBER_CHATS = gql`
  query memberMessages($antaraId: String!) {
    memberMessages(antaraId: $antaraId) {
      edges {
        node {
          id
          message
          direction
          status
          createdAt
          updatedAt
        }
      }
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export { GET_MEMBER_CHATS, SEND_SMS }
