import { gql } from '@apollo/client'

const GET_TERMS_CONDITIONS = gql`
  query termsAndConditions($antaraId: String!) {
    termsAndConditions(antaraId: $antaraId) {
      edges {
        node {
          id
          summary
          version
          policyLink
          websiteLink
          accepted
          type
        }
      }
    }
  }
`
// eslint-disable-next-line import/prefer-default-export
export { GET_TERMS_CONDITIONS }
