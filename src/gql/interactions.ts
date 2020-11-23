import { gql } from '@apollo/client'

const GET_INTERACTIONS = gql`
  query getMemberInteractions($antaraId: String!) {
    interaction(antaraId: $antaraId) {
      interactionStartedAt
      interactionSummaryNotes
      interactorType
      interactionDirection
      inboundInteractionCategory
      outboundInteractionCategory
      otherCategoryOutbound
      otherCategoryInbound
      flagForReview
      healthNavigator {
        fullName
      }
    }
  }
`
const CREATE_INTERACTION = gql`
  mutation createInteraction($input: InteractionsInput!) {
    createInteraction(input: $input) {
      status
    }
  }
`
export { GET_INTERACTIONS, CREATE_INTERACTION }
