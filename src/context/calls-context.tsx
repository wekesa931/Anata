import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useUser } from './user-context'
import { GET_CALL_LOG, MAKE_CALL, TRANSFER_CALL } from '../gql/comms'
import { useFcm } from './fcm/fcm.context'
import logError from '../components/utils/Bugsnag/Bugsnag'
import airtableFetch from '../resources/airtable-fetch'

export type ILogs = {
  startedAt: string
  callDirection: string
  agentEmail: string
  sessionEnded: boolean
  sessionStarted: boolean
  memberPhone: string
  memberAirtableId: string
  roomName: string
  inCallDuration: number
  createdAt: string
  callbackTaskId: string
}

type CallContact = {
  [key: string]: string
}

type Call = {
  title: string
  type: 'INBOUND' | 'OUTBOUND' | 'CALLBACK'
  state:
    | 'ONGOING'
    | 'RINGING'
    | 'FULFILLED'
    | 'STAFFMISSED'
    | 'MEMBERMISSED'
    | 'MEMBERLEFT'
    | 'TRANSFERED'
  assigned: string
  date?: Date
  duration?: string
  initialCallTime: number
  member: string
  memberName: string
  forwardTo?: string
  session?: string
  callbackHistoryId?: string
}

type ContextType = {
  activeCall?: Call | null
  activeCallContact?: CallContact | null
  callError?: string | null
  completeCall: () => void
  setCallerName: (name: string) => void
  initiateCall: (
    callContact: CallContact,
    onCallInitiated: () => void,
    memberAntaraId: string,
    type?: string
  ) => void
  initiateTransfer: (staff: {
    phone: string
    email: string
    fullName: string
    transferAction: string
  }) => void
  setCounterValue: () => void
  setHistoryRecordId: (id: string) => void
}

export const participantCallAction = {
  HOLD: 'HOLD',
  MUTE: 'MUTE',
  NONE: 'NONE',
}
const CallContext = React.createContext<ContextType>({
  initiateCall: () => null,
  initiateTransfer: () => null,
  setCallerName: () => null,
  completeCall: () => null,
  setCounterValue: () => null,
  setHistoryRecordId: () => null,
})

function CallProvider({ children }: any) {
  const [activeCallContact, setActiveCallContact] =
    useState<CallContact | null>()
  const [counter, setcounter] = useState(0)
  const [activeCallingMember, setactiveCallingMember] =
    useState<string>('Unknown Caller')
  const [activeCall, setActiveCall] = useState<Call | null>()
  const [callError, setcallError] = useState<string | null>(null)
  const { pushNotification } = useFcm()
  const [initiateConferenceCall] = useMutation(MAKE_CALL)
  const [initiateCallTransfer] = useMutation(TRANSFER_CALL)
  const user = useUser()
  const { data } = useQuery(GET_CALL_LOG)
  const participantBusy =
    pushNotification?.notification.title === 'Participant Busy' ||
    pushNotification?.notification.title === 'Participant No Answer'

  const callTitle = (value: string) => {
    let titleName = 'Outbound Call'
    if (value === 'inbound') {
      titleName = 'Inbound Call'
    }
    return titleName
  }
  const getMemberOnCallfromAirtable = async (memberId: string) => {
    const result = await airtableFetch(`members/${memberId}`)
    if (result) {
      setactiveCallingMember(result['Full Name'])
    } else {
      setactiveCallingMember('Unknown Caller')
    }
  }

  /*
   *
   * This is the logic to check an active call
   *
   * */
  useEffect(() => {
    if (data) {
      const rawLogs = data.conferenceSessions.edges
      const logs: ILogs[] = rawLogs.map((log: { node: ILogs }) => log.node)
      const activeCallLog = logs.find(
        (log) =>
          log.agentEmail === user?.email &&
          log.sessionStarted === true &&
          !log.sessionEnded
      )
      if (activeCallLog) {
        getMemberOnCallfromAirtable(activeCallLog.memberAirtableId)
        const ongoingCall = activeCallLog
        const call = {
          title: callTitle(ongoingCall.callDirection.toLocaleLowerCase()),
          type: ongoingCall.callDirection,
          state: 'ONGOING',
          assigned: user ? user.email : '',
          memberName: activeCallingMember,
          member: ongoingCall.memberPhone,
          initialCallTime:
            (new Date().getMinutes() -
              new Date(ongoingCall.startedAt).getMinutes()) *
              60 +
            (new Date().getSeconds() -
              new Date(ongoingCall.startedAt).getSeconds()),
        }
        setActiveCall({ ...call, session: ongoingCall.roomName })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, counter])

  /*
   *
   * This is the logic to listen to incoming events following an active call
   *
   * */
  useEffect(() => {
    if (activeCall?.state !== 'FULFILLED') {
      let conferenceName = ''
      let callerNum = null
      const callUpdates: Call = {} as Call
      const isStaff = pushNotification?.data?.is_staff === 'true'
      if (
        pushNotification?.notification?.title === 'Call Ongoing' ||
        pushNotification?.notification?.title === 'Incoming Call'
      ) {
        if (
          !activeCall ||
          Object.prototype.hasOwnProperty.call(activeCall, 'title')
        ) {
          callUpdates.title = 'Inbound Call'
          callUpdates.type = 'INBOUND'
          callUpdates.assigned = user ? user.email : ''
          callUpdates.initialCallTime = 0
        }
        callUpdates.state = 'ONGOING'
      } else if (pushNotification?.notification.title === 'Call Ended') {
        const duration = parseFloat(pushNotification?.data?.duration)
        const formattedDuration = new Date(duration * 1000)
          .toISOString()
          .substr(11, 8)
        callUpdates.state = 'FULFILLED'
        callUpdates.duration = formattedDuration
      } else if (participantBusy) {
        if (isStaff) {
          callUpdates.state = 'STAFFMISSED'
        } else {
          callUpdates.state = 'MEMBERMISSED'
        }
      } else if (pushNotification?.notification.title === 'Participant Left') {
        if (!isStaff) {
          callUpdates.state = 'MEMBERLEFT'
        }
      }
      if (pushNotification?.data?.conference) {
        conferenceName = pushNotification?.data?.conference
      }
      if (pushNotification?.data?.caller_phone) {
        callerNum = pushNotification?.data?.caller_phone
      }

      if (Object.keys(callUpdates).length !== 0) {
        getMemberOnCallfromAirtable(pushNotification?.data?.member_airtable_id)
        setActiveCall({
          ...activeCall,
          ...callUpdates,
          member: callerNum,
          session: conferenceName,
          memberName: activeCallingMember,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushNotification?.notification.title])

  const numberType = (num: any, isKey: boolean): string => {
    let value = ''
    // eslint-disable-next-line
    for (const key in num) {
      if (isKey) {
        value = key
      } else {
        value = num[key]
      }
    }
    return value
  }

  const formatPhoneForSubmission = (num: string): string | null => {
    if (num) {
      let phone = num
      phone = phone.replace(/\s/g, '').replace(/^(0|\+?254)/gi, '')
      return `+254${phone}`
    }
    setcallError('Invalid or No number found for member')
    return null
  }

  const initiateTransfer = ({
    phone,
    email,
    fullName,
    transferAction,
  }: {
    phone: string
    email: string
    fullName: string
    transferAction: string
  }) => {
    if (activeCall) {
      setActiveCall({ ...activeCall, forwardTo: fullName })
    }
    initiateCallTransfer({
      variables: {
        phoneNumber: phone,
        staffEmail: email,
        session: activeCall?.session,
        onTransferAction: transferAction,
      },
    })
      .then((response) => {
        if (response?.data?.transferCall.status === 200) {
          if (activeCall) {
            setActiveCall({
              ...activeCall,
              state: 'TRANSFERED',
              forwardTo: fullName,
            })
          }
        }
      })
      .catch((e) => {
        setcallError(e.message)
        logError(e.message)
      })
  }

  const initiateCall = (
    callContact: CallContact,
    onCallInitiated: (call: Call) => void,
    memberAntaraId: string,
    type = 'OUTBOUND'
  ) => {
    if (
      activeCall &&
      Object.prototype.hasOwnProperty.call(activeCall, 'title')
    ) {
      throw new Error('Call in progress')
    }
    const phoneNum = formatPhoneForSubmission(numberType(callContact, false))
    if (phoneNum) {
      initiateConferenceCall({
        variables: {
          antaraId: memberAntaraId,
          recipient: phoneNum,
        },
      })
        .then((response) => {
          if (response?.data?.placeCall.status === 200) {
            const call = {
              title: 'Outbound Call',
              type,
              state: 'RINGING',
              assigned: user ? user.email : '',
              member: phoneNum,
              initialCallTime: 0,
            }
            setActiveCall({ ...activeCall, ...call })
            setActiveCallContact(callContact)
            onCallInitiated(response?.data)
          } else {
            setcallError(response?.data?.placeCall.message)
          }
        })
        .catch((e) => {
          setcallError(e.message)
        })
    }
  }

  const completeCall = () => {
    setActiveCallContact(null)
    setActiveCall(null)
    setcallError(null)
    setactiveCallingMember('Unknown Caller')
  }
  const setCounterValue = () => {
    setcounter((val) => val + 1)
  }
  const setHistoryRecordId = (id: string) => {
    setActiveCall({ ...activeCall, callbackHistoryId: id })
  }
  const setCallerName = (name: string) => {
    setActiveCall({ ...activeCall, memberName: name })
  }

  return (
    <CallContext.Provider
      value={{
        activeCallContact,
        activeCall,
        callError,
        setCallerName,
        completeCall,
        initiateCall,
        initiateTransfer,
        setCounterValue,
        setHistoryRecordId,
      }}
    >
      {children}
    </CallContext.Provider>
  )
}

const useCall = () => React.useContext(CallContext)

export { CallProvider, useCall }
