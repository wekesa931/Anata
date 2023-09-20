import { gql } from '@apollo/client'

export const CREATE_MEMBER_FEEDBACK = gql`
  mutation createMemberFeedback($input: MemberFeedbackInput!) {
    memberFeedback(input: $input) {
      message
      status
      data {
        feedback
      }
    }
  }
`
