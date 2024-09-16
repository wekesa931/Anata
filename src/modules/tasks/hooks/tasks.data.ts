import { useTasksAPI } from 'src/modules/tasks/services/tasks.service'
import {
  transformRawTaskDefinitionsToTaskDefinitions,
  mapTaskDefinitionToNewask,
} from 'src/modules/tasks/utils/transform'
import { useMember } from 'src/context/member'
import { logError } from 'src/utils/logging/logger'
import {
  LabManagementRecordId,
  NewDocumentRecordId,
  TaskDefinitionTypes,
} from 'src/modules/tasks/types'

export const useTasksData = () => {
  const { getTaskDefinitionTemplates, createTask } = useTasksAPI()
  const { member } = useMember()

  const loadTaskTemplates = async () => {
    const response = await getTaskDefinitionTemplates()
    const definitions = transformRawTaskDefinitionsToTaskDefinitions(response)
    return definitions
  }

  const createTaskFromTemplate = async (type: TaskDefinitionTypes) => {
    try {
      const templates = await loadTaskTemplates()
      const templateId =
        type === TaskDefinitionTypes.LabManagement
          ? LabManagementRecordId
          : NewDocumentRecordId
      const taskDefinition = templates.find((t) => t.recordId === templateId)

      if (!taskDefinition) {
        throw new Error('Task definition not found')
      }

      if (member && member?.airtableRecordId) {
        const newTask = mapTaskDefinitionToNewask(taskDefinition, member)

        return createTask(newTask)
      }
      throw new Error('Member is not defined, or not synced to HNOS')
    } catch (error) {
      logError(error)
      throw error
    }
  }

  return {
    loadTaskTemplates,
    createTaskFromTemplate,
  }
}
