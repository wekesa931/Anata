import { gql } from '@apollo/client'

const GET_MEMBER_INTERACTIONS = gql`
  query ($antaraId: String!) {
    memberInteractions(antaraId: $antaraId) {
      edges {
        node {
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
const CREATE_INTERACTION = gql`
  mutation createInteraction($input: InteractionsInput!) {
    createInteraction(input: $input) {
      status
      message
    }
  }
`

const GET_ALL_FLAGGED_INTERACTIONS = gql`
  query ($startDate: DateTime!, $endDate: DateTime!) {
    allInteractions(
      flagForReview: "Yes"
      interactionStartedAt_Date_Gte: $startDate
      interactionStartedAt_Date_Lte: $endDate
    ) {
      edges {
        node {
          member {
            antaraMemberId
            firstName
            surname
            middleName
            atRecordId
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

const GET_ALL_INTERACTIONS = gql`
  query ($startDate: DateTime!, $endDate: DateTime!) {
    allInteractions(
      interactionStartedAt_Date_Gte: $startDate
      interactionStartedAt_Date_Lte: $endDate
    ) {
      edges {
        node {
          member {
            antaraMemberId
            firstName
            surname
            middleName
            atRecordId
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

export {
  GET_MEMBER_INTERACTIONS,
  CREATE_INTERACTION,
  GET_ALL_FLAGGED_INTERACTIONS,
  GET_ALL_INTERACTIONS,
}
