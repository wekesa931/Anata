import airtableFetch from 'src/services/airtable/fetch'
import { NewTask } from 'src/modules/tasks/types'
import { filterFields } from 'src/utils/airtable/field-utils'
import { useHNOSData } from 'src/modules/workflows/services/workflows.api'
import TABLE_ROUTES from 'src/config/airtable-tables'

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

  return {
    getTaskDefinitionTemplates,
    createTask,
  }
}
