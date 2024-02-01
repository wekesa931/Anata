import airtableFetch from 'src/services/airtable/fetch'
import { TaskDefinitionTypes, NewTask } from 'src/modules/tasks/types'
import { filterFields } from 'src/utils/airtable/field-utils'
import { useHNOSData } from 'src/modules/workflows/services/workflows.api'
import TABLE_ROUTES from 'src/config/airtable-tables'

const TasksTable = TABLE_ROUTES['HN Tasks']

export const useTasksAPI = () => {
  const { createTableEntry } = useHNOSData()

  const templateFields = [
    'Record ID',
    'Clinical-Preferred-Name',
    'Scribe-tags',
    'Default priority settings',
    'Default period for completion',
    'Due date calculation for automation',
    'Subject (for who)',
    'Sources',
    'Sources details',
    'Notes',
    'Verb (do something)',
    'Default team assigned',
  ]
  const getTaskDefinitionTemplates = async () => {
    const filterArgs = `filterByFormula=OR(FIND("${TaskDefinitionTypes.LabManagement}",{Scribe-tags}),FIND("${TaskDefinitionTypes.NewDocument}",{Scribe-tags}))`

    return airtableFetch(
      `tasksDefinition/list?${filterArgs}&${filterFields(templateFields)}`
    )
  }

  const createTask = async (task: NewTask) => {
    return createTableEntry(TasksTable, {
      fields: task,
    })
  }

  return {
    getTaskDefinitionTemplates,
    createTask,
  }
}
