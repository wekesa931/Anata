import airtableFetch from 'src/services/airtable/fetch'
import { extractUsername } from 'src/modules/interactions/utils'
import { CREATE_INTERACTION } from 'src/modules/interactions/services/gql'
import { SEND_SMS } from 'src/modules/comms/services/gql'
import { useModuleAnalytics } from 'src/modules/analytics'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/client'
import { logError } from 'src/utils/logging/logger'

export type TaskModuleData = ReturnType<typeof useTaskModuleData>

type Update = {
  id: string
  fields: { [key: string]: any }
}

const useTaskModuleData = () => {
  const [mutate] = useMutation(CREATE_INTERACTION)
  const [sendSms] = useMutation(SEND_SMS)
  const {
    trackAutomaticActionsInteractionLog,
    trackAutomaticActionsSms,
    trackReshedulingDueDate,
    trackUpdateAppointment,
  } = useModuleAnalytics()

  const handleDataUpdate = async (values: Update[]) => {
    try {
      await Promise.allSettled(
        values.map((v) => handleAirtableUpdate('hntasks', v))
      )
      trackReshedulingDueDate(values.map((v) => v.id))
    } catch (error) {
      logError(error)
    }
  }

  const handleUpdateAppointmnet = async (appointments: Update[]) => {
    try {
      await Promise.allSettled(
        appointments.map((v) => handleAirtableUpdate('appointments', v))
      )
      trackUpdateAppointment(appointments.map((v) => v.id))
    } catch (error) {
      logError(error)
    }
  }

  const handleAirtableUpdate = async (table: string, value: any) => {
    const response = await airtableFetch(table, 'post', value)
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
  }
  const submitSmsRequest = async (sms: any, member: any) => {
    const data = { message: sms, antaraId: member?.antaraId }
    const response = await sendSms({
      variables: data,
    })

    if (response?.data?.sendSms?.status === 200) {
      trackAutomaticActionsSms(data)
    }
  }

  return {
    handleAirtableUpdate,
    handleDataUpdate,
    submitInteractionLogRequest,
    submitSmsRequest,
    handleUpdateAppointmnet,
  }
}

export default useTaskModuleData
