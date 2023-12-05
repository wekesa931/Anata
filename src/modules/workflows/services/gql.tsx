import { gql } from '@apollo/client'

export const GET_ALL_TEMPLATES = gql`
  query workflowTemplates($name: String!, $status: String) {
    workflowTemplates(name: $name, status: $status) {
      edges {
        node {
          id
          name
          moduleNames
          modules {
            id
            name
          }
          updatedAt
        }
      }
    }
  }
`

export const CREATE_WORKFLOW = gql`
  mutation createWorkflow($templateName: String!, $memberId: String!) {
    createWorkflow(templateName: $templateName, memberId: $memberId) {
      status
      message
      errors
      workflow {
        id
        workflowId
        airtableId
        completed
        template {
          id
          name
        }
        modules {
          name
        }
        currentModules
        moduleData
        createdAt
        updatedAt
      }
    }
  }
`

export const SAVE_WORKFLOW = gql`
  mutation updateWorkflow(
    $workflowId: String!
    $completed: Boolean!
    $airtableId: String
  ) {
    updateWorkflow(
      workflowId: $workflowId
      completed: $completed
      airtableId: $airtableId
    ) {
      status
      message
      errors
      workflow {
        id
        workflowId
        airtableId
        completed
        template {
          id
          name
        }
        modules {
          name
        }
        currentModules
        moduleData
        createdAt
        updatedAt
      }
    }
  }
`

export const GET_WORKFLOWS = gql`
  query workflows($workflowId: String, $memberId: String, $addedBy: String) {
    workflows(workflowId: $workflowId, memberId: $memberId, addedBy: $addedBy) {
      edges {
        node {
          id
          workflowId
          airtableId
          completed
          template {
            id
            name
          }
          modules {
            id
            name
          }
          member {
            details {
              firstName
              middleName
              lastName
            }
          }
          currentModules
          moduleData
          createdAt
          updatedAt
          memberId
        }
      }
    }
  }
`

export const ADD_MODULE_TO_WORKFLOW = gql`
  mutation addWorkflowModule($workflowId: String!, $moduleName: String!) {
    addWorkflowModule(workflowId: $workflowId, moduleName: $moduleName) {
      status
      message
      errors
      workflow {
        id
        workflowId
        airtableId
        completed
        template {
          id
          name
        }
        modules {
          name
        }
        currentModules
        moduleData
        createdAt
        updatedAt
      }
    }
  }
`

export const SAVE_MODULE_DATA = gql`
  mutation saveModuleData(
    $workflowId: String!
    $moduleName: String!
    $data: GenericScalar!
    $draft: Boolean!
  ) {
    saveModuleData(
      workflowId: $workflowId
      moduleName: $moduleName
      data: $data
      draft: $draft
    ) {
      status
      message
      errors
      workflow {
        id
        workflowId
        airtableId
        completed
        template {
          id
          name
        }
        modules {
          name
        }
        currentModules
        moduleData
        createdAt
        updatedAt
      }
    }
  }
`

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

export const REMOVE_MODULE = gql`
  mutation removeWorkflowModule($workflowId: String!, $moduleName: String!) {
    removeWorkflowModule(workflowId: $workflowId, moduleName: $moduleName) {
      status
      message
      errors
      workflow {
        id
        workflowId
        airtableId
        completed
        template {
          id
          name
        }
        modules {
          name
        }
        currentModules
        moduleData
        createdAt
        updatedAt
      }
    }
  }
`

export const CANCEL_WORKFLOW = gql`
  mutation cancelWorkflow($workflowId: String!) {
    cancelWorkflow(workflowId: $workflowId) {
      status
      message
      errors
      workflow {
        id
        workflowId
        airtableId
        completed
        cancelled
        template {
          id
          name
        }
        modules {
          name
        }
        currentModules
        moduleData
        createdAt
        updatedAt
      }
    }
  }
`
