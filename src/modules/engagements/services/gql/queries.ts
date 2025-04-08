import { gql } from '@apollo/client'

export const ENGAGEMENT_FRAGMENT = gql`
  fragment EngagementRecommendationFields on EngagmentRecommendationType {
    uuid
    id
    context
    action
    status {
      name
      modifiedAt
      modifiedBy
    }
    member {
      antaraId
      age
      fullName
    }
    remarks
    assignedTo {
      fullName
      team
    }
    modifiedAt
    modifiedBy
  }
`

export const ENGAGEMENT_RECOMMENDATIONS_QUERY = gql`
  query engagementRecommendations {
    engagementRecommendations {
      edges {
        node {
          ...EngagementRecommendationFields
        }
      }
    }
  }
  ${ENGAGEMENT_FRAGMENT}
`

export const ENGAGEMENT_RECOMMENDATIONS_FEEDBACK_QUERY = gql`
  query EngagementRecommendationsFeedback {
    engagementRecommendationsFeedback {
      edges {
        node {
          id
          name
          engagementOutcomeStatus {
            name
          }
        }
      }
    }
  }
`
