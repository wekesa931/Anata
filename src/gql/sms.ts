import { gql } from '@apollo/client'

const GET_MEMBER_CHATS = gql`
  query memberMessages($antaraId: String!) {
    memberMessages(antaraId: $antaraId) {
      edges {
        node {
          message
          direction
          status
        }
      }
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export { GET_MEMBER_CHATS }
