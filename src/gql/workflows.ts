import { gql } from '@apollo/client'

const CREATE_WORKFLOW = gql`
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

const SAVE_MODULE_DATA = gql`
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

const ADD_MODULE_TO_WORKFLOW = gql`
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

const GET_ALL_TEMPLATES = gql`
  query workflowTemplates($name: String!) {
    workflowTemplates(name: $name) {
      edges {
        node {
          id
          name
          moduleNames
          modules {
            id
            name
          }
        }
      }
    }
  }
`

const GET_WORKFLOWS = gql`
  query workflows($workflowId: String!, $memberId: String!) {
    workflows(workflowId: $workflowId, memberId: $memberId) {
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
          currentModules
          moduleData
          createdAt
          updatedAt
        }
      }
    }
  }
`

const REMOVE_MODULE = gql`
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

const GET_LINKED_RECORD = gql`
  query globalSearch(
    $table: String!
    $field: String!
    $searchParam: String!
    $antaraIdKey: String!
    $antaraIdValue: String!
  ) {
    globalSearch(
      table: $table
      field: $field
      searchParam: $searchParam
      antaraIdKey: $antaraIdKey
      antaraIdValue: $antaraIdValue
    )
  }
`

const SAVE_WORKFLOW = gql`
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
// eslint-disable-next-line import/prefer-default-export
export {
  CREATE_WORKFLOW,
  SAVE_MODULE_DATA,
  ADD_MODULE_TO_WORKFLOW,
  GET_ALL_TEMPLATES,
  GET_WORKFLOWS,
  REMOVE_MODULE,
  SAVE_WORKFLOW,
  GET_LINKED_RECORD,
}
