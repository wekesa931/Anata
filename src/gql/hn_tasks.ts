import { gql } from '@apollo/client'

const GET_MEMBER_TASKS = gql`
  query($antaraId: String!) {
    memberHnTasks(antaraId: $antaraId) {
      edges {
        node {
          recordId
          type
          dueDate
          taskNotes
          status
          taskPriority
          measurementsToTake
          assignee {
            fullName
          }
          lastStatusChangedAt
          formUrl
        }
      }
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export { GET_MEMBER_TASKS }
