import { gql } from '@apollo/client'

export const GET_ALL_FLAGGED_INTERACTIONS = gql`
  query ($startDate: DateTime!, $endDate: DateTime!) {
    allInteractions(
      flagForReview: "Yes"
      interactionStartedAt_Date_Gte: $startDate
      interactionStartedAt_Date_Lte: $endDate
    ) {
      edges {
        node {
          member {
            antaraId
            fullName
          }
          healthNavigator {
            fullName
          }
          interactorType
          relationshipType
          modeOfCommunication
          inboundInteractionCategory
          outboundInteractionCategory
          flagForReview
          interactionStartedAt
          interactionDirection
          interactionSummaryNotes
          otherCategoryOutbound
          otherCategoryInbound
          outcome
          relationshipType
          interactorName
          feedback
          typeOfFeedback
          reasonForFeedback
          feedbackFromMember
        }
      }
    }
  }
`

export const GET_ALL_INTERACTIONS = gql`
  query ($startDate: DateTime!, $endDate: DateTime!) {
    allInteractions(
      interactionStartedAt_Date_Gte: $startDate
      interactionStartedAt_Date_Lte: $endDate
    ) {
      edges {
        node {
          member {
            antaraId
            fullName
          }
          healthNavigator {
            fullName
          }
          interactorType
          relationshipType
          modeOfCommunication
          inboundInteractionCategory
          outboundInteractionCategory
          flagForReview
          interactionStartedAt
          interactionDirection
          interactionSummaryNotes
          otherCategoryOutbound
          otherCategoryInbound
          outcome
          relationshipType
          interactorName
        }
      }
    }
  }
`

export const GET_MEMBER_INTERACTIONS = gql`
  query ($antaraId: String!) {
    memberInteractions(antaraId: $antaraId) {
      edges {
        node {
          id
          interactionStartedAt
          interactionSummaryNotes
          interactorType
          interactionDirection
          modeOfCommunication
          inboundInteractionCategory
          outboundInteractionCategory
          otherCategoryOutbound
          otherCategoryInbound
          outcome
          flagForReview
          feedback
          typeOfFeedback
          reasonForFeedback
          feedbackFromMember
          healthNavigator {
            fullName
          }
        }
      }
    }
  }
`
export const CREATE_INTERACTION = gql`
  mutation createInteraction($input: InteractionsInput!) {
    createInteraction(input: $input) {
      status
      message
    }
  }
`
