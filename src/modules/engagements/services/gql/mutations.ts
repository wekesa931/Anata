import { gql } from '@apollo/client'
import { ENGAGEMENT_FRAGMENT } from './queries'

export const UPDATE_RECOMMENDATION_STATUS = gql`
  mutation UpdateEngagementRecommendation(
    $input: UpdateEngagementRecommendationInput!
  ) {
    updateEngagementRecommendation(input: $input) {
      engagementRecommendation {
        ...EngagementRecommendationFields
      }
    }
  }
  ${ENGAGEMENT_FRAGMENT}
`
