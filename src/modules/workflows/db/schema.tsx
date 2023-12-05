import { tableSchema } from '@nozbe/watermelondb'

/**
 * Workflow template is used to create a new workflow by specifying the form names that will be used
 */
export const WorkflowTemplateSchema = tableSchema({
  name: 'workflow_templates',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'modules', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'updatedAt', type: 'number' },
  ],
})

/**
 * Forms are used to track the data entered by the user for each workflow form/module
 * They can be used independently or as part of a workflow hence the optional workflow_id
 */
export const FormSchema = tableSchema({
  name: 'forms',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'workflow_id', type: 'string', isOptional: true },
    { name: 'member', type: 'string' },
    { name: 'data', type: 'string' },
    { name: 'is_draft', type: 'boolean' },
    { name: 'is_edited', type: 'boolean' },
    { name: 'createdBy', type: 'string' },
    { name: 'updatedBy', type: 'string' },
    { name: 'is_synced', type: 'boolean' },
    { name: 'airtableId', type: 'string', isOptional: true },
    { name: 'created_at', type: 'number' },
  ],
})

/**
 * A workflow is created from a workflow template and is used to track the status of the workflow
 * - It can have multiple forms associated with it or none
 * - It is associated with a single member through the member field
 */

export const WorkflowSchema = tableSchema({
  name: 'workflows',
  columns: [
    { name: 'workflowId', type: 'string' },
    { name: 'template', type: 'string' },
    { name: 'member', type: 'string' },
    { name: 'is_completed', type: 'boolean' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'createdBy', type: 'string' },
    { name: 'updatedBy', type: 'string' },
    { name: 'airtableId', type: 'string' }, // duplicate of case_id
    { name: 'is_synced', type: 'boolean' },
    { name: 'is_draft_saved', type: 'boolean' },
    { name: 'member_data', type: 'string' }, // duplicate of case_id
  ],
})

export default [FormSchema, WorkflowTemplateSchema, WorkflowSchema]
