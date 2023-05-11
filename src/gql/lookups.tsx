import { gql } from '@apollo/client'

export const GET_INSURANCE_COMPANIES = gql`
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

export const LOOKUP_ENTRIES_QUERY = gql`
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
