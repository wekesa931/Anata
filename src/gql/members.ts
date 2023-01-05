import { gql } from '@apollo/client'

const GET_MEMBER_DETAILS = gql`
  query members($antaraId: String) {
    members(antaraId: $antaraId) {
      edges {
        node {
          antaraId
          insuranceDetails {
            id
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

const SEARCH_MEMBERS = gql`
  query memberSearch($query: String!) {
    membersSearch(query: $query) {
      edges {
        node {
          antaraId
          birthDate
          details {
            fullName
            airtableRecordId
            sex {
              sex
            }
          }
        }
      }
    }
  }
`
// eslint-disable-next-line import/prefer-default-export
export { GET_MEMBER_DETAILS, SEARCH_MEMBERS }
