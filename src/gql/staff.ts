import { gql } from '@apollo/client'

const GET_ANTARA_STAFF = gql`
  query {
    antaraStaff {
      edges {
        node {
          id
          fullName
          emailUsername
          historyUserIdField
          slackId
          phone
          team
        }
      }
    }
  }
`
// eslint-disable-next-line import/prefer-default-export
export { GET_ANTARA_STAFF }
