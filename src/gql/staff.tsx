import { gql } from '@apollo/client'

const GET_ANTARA_STAFF = gql`
  query getAntaraStaff($email: String) {
    antaraStaff(email: $email) {
      edges {
        node {
          id
          fullName
          emailUsername
          team
          staffTeam {
            name
          }
          atRecordId
          phone
          signature
          email
        }
      }
    }
  }
`
// eslint-disable-next-line import/prefer-default-export
export { GET_ANTARA_STAFF }
