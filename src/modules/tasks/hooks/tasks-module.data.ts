import airtableFetch from 'src/services/airtable/fetch'
import { extractUsername } from 'src/modules/interactions/utils'
import { CREATE_INTERACTION } from 'src/modules/interactions/services/gql'
import { SEND_SMS } from 'src/modules/comms/services/gql'
import { useModuleAnalytics } from 'src/modules/analytics'

import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'

export type TaskModuleData = ReturnType<typeof useTaskModuleData>

const useTaskModuleData = () => {
  const [mutate] = useMutation(CREATE_INTERACTION)
  const [sendSms] = useMutation(SEND_SMS)
  const { trackAutomaticActionsInteractionLog, trackAutomaticActionsSms } =
    useModuleAnalytics()

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

    if (resp?.data?.createInteraction?.status === 200) {
      trackAutomaticActionsInteractionLog(input)
    }
    return resp
  }
  const submitSmsRequest = async (sms: any, member: any) => {
    const data = { message: sms, antaraId: member?.antaraId }
    const response = await sendSms({
      variables: data,
    })

    if (response?.data?.sendSms?.status === 200) {
      trackAutomaticActionsSms(data)
    }

    return response
  }

  return {
    handleAirtableUpdate,
    handleDataUpdate,
    submitInteractionLogRequest,
    submitSmsRequest,
  }
}

export default useTaskModuleData
