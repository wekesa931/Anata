import airtableFetch from 'src/services/airtable/fetch'
import { extractUsername } from 'src/modules/interactions/utils'
import { CREATE_INTERACTION } from 'src/modules/interactions/services/gql'
import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'

export type TaskModuleData = ReturnType<typeof useTaskModuleData>

const useTaskModuleData = () => {
  const [mutate] = useMutation(CREATE_INTERACTION)

  const handleDataUpdate = async (values: any, taskId: any) => {
    const fullPayload = {
      id: taskId,
      fields: values,
    }
    return handleAirtableUpdate(fullPayload)
  }

  const handleAirtableUpdate = async (value: any) => {
    const response = await airtableFetch('hntasks', 'post', value)
    return response
  }

  const submitInteractionLogRequest = async (
    values: any,
    user: any,
    member: any
  ) => {
    const input = {
      outcome: '["None"]',
      outcomeMetadata: {
        creator: user?.email,
      },
      member: member?.antaraId,
      historyUserIdField: user?.email,
      healthNavigator: extractUsername(user.email),
      interactionDirection: 'Outbound interaction',
      interactionStartedAt: dayjs().toISOString(),
      modeOfCommunication: 'SMS',
      interactorType: 'Beneficiary',
      interactionSummaryNotes: values.interactionLog,
      outboundInteractionCategory: ['Other'],
      otherCategoryOutbound: 'Missed Call Automatic Actions',
    }
    const resp = await mutate({
      variables: {
        input,
      },
    })
    return resp
  }

  return { handleAirtableUpdate, handleDataUpdate, submitInteractionLogRequest }
}

export default useTaskModuleData
