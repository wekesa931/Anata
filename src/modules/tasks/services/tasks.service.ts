import airtableFetch from 'src/services/airtable/fetch'
import { NewTask } from 'src/modules/tasks/types'
import { filterFields } from 'src/utils/airtable/field-utils'
import { useHNOSData } from 'src/modules/workflows/services/workflows.api'
import TABLE_ROUTES from 'src/config/airtable-tables'
import { mapRawTaskDefinitionToTaskDefinition } from 'src/modules/tasks/utils/transform'

const TasksTable = TABLE_ROUTES['HN Tasks']
const LabManagementRecordId =
  process.env.PROD === 'true' ? 'recR0Rni1WNDiQpj3' : 'rec5i6q30NJAcXOsA'
const NewDocumentRecordId =
  process.env.PROD === 'true' ? 'rec0bpNSpRx6huygq' : 'recbDbP099lD9mKw7'

export const useTasksAPI = () => {
  const { createTableEntry } = useHNOSData()

  const templateFields = [
    'Record ID',
    'Clinical-Preferred-Name',
    'Scribe-tags',
    'Default priority settings',
    'Default period for completion',
    'Due date calculation for automation',
    'Sources',
    'Sources details',
    'Notes',
    'Default team assigned',
    'Status',
    'Notification content from template for missed tasks',
    'Interaction log form content',
    'Default rescheduling number of days',
    'Member facing name for Task type',
  ]

  const getTaskDefinitionTemplates = async () => {
    const filterArgs = `filterByFormula=OR(FIND("${LabManagementRecordId}",{Record ID}),FIND("${NewDocumentRecordId}",{Record ID}))`

    return airtableFetch(
      `tasksDefinition/list?${filterArgs}&${filterFields(templateFields)}`
    )
  }

  const createTask = async (task: NewTask) => {
    return createTableEntry(TasksTable, {
      fields: task,
    })
  }
  const getAllDefinitionTemplates = async () => {
    const definitions = await airtableFetch(
      `tasksDefinition/list?${filterFields(templateFields)}`
    )
    if (Array.isArray(definitions)) {
      return definitions
        .filter((t: any) => t?.Status === 'Live')
        .map(mapRawTaskDefinitionToTaskDefinition)
    }
    return []
  }

  return {
    getTaskDefinitionTemplates,
    createTask,
    getAllDefinitionTemplates,
  }
}
