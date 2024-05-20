import { GetFieldOptionsFn } from 'src/context/airtable-meta'
import AirtableField from 'src/types/airtable-field'

const getTaskFields = (
  allAntaraStaffs: any[],
  getFieldOptions: GetFieldOptionsFn,
  taskDefinition: any[]
) => {
  const TASK_FIELDS: AirtableField[] = [
    {
      name: 'Task definition',
      type: 'single-select',
      options: taskDefinition
        .map((taskDef) => ({
          label: taskDef.clinicalPrefferedName,
          value: taskDef.recordId,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      disabled: true,
    },
    {
      name: 'Due Date',
      type: 'date',
    },
    {
      name: 'Task Priority',
      type: 'single-select',
      options: getFieldOptions('HN Tasks', 'Task Priority'),
    },
    {
      name: 'Task Notes',
      type: 'long-text',
    },
    {
      name: 'Assignee',
      type: 'single-select',
      options: allAntaraStaffs.map((staff) => ({
        label: staff.label,
        value: staff.recordId,
      })),
    },
    {
      name: 'Status',
      type: 'single-select',
      options: getFieldOptions('HN Tasks', 'Status'),
    },
    {
      name: 'Last Status changed at',
      type: 'date',
      calculated: true,
    },
    {
      name: 'Assignee Name',
      type: 'lookup',
      calculated: true,
    },
    {
      name: 'Reason for cancellation',
      type: 'single-select',
      options: getFieldOptions('HN Tasks', 'Reason for cancellation'),
      condition: (task: any = {}) => {
        const { Status } = task
        return Status === 'Cancelled'
      },
      required: true,
    },
  ]

  return TASK_FIELDS
}

export default getTaskFields
