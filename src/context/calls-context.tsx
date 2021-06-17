import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { useMember } from './member.context'
import { useUser } from './user-context'
import { GET_CALL_LOG, MAKE_CALL } from '../gql/comms'
import useFCMState from '../comms/fcm/fcm.hook'

export type ILogs = {
  node: {
    startedAt: string
    callDirection: string
    agentEmail: string
    sessionEnded: boolean
    sessionStarted: boolean
    memberPhone: string
    memberAirtableId: string
  }
}

type CallContact = {
  [key: string]: string
}

type Call = {
  title: string
  type: 'INBOUND' | 'OUTBOUND'
  state:
    | 'ONGOING'
    | 'RINGING'
    | 'FULFILLED'
    | 'STAFFMISSED'
    | 'MEMBERMISSED'
    | 'MEMBERLEFT'
  assigned: string
  date?: Date
  duration?: string
  initialCallTime: number
  member: string
}

type ContextType = {
  activeCall?: Call | null
  activeCallContact?: CallContact | null
  callError?: string | null
  completeCall: () => void
  initiateCall: (callContact: CallContact, onCallInitiated: () => void) => void
  setCounterValue: () => void
}

const CallContext = React.createContext<ContextType>({
  initiateCall: () => null,
  completeCall: () => null,
  setCounterValue: () => null,
})

function CallProvider({ children }: any) {
  const { member } = useMember()
  const [activeCallContact, setActiveCallContact] =
    useState<CallContact | null>()
  const [counter, setcounter] = useState(0)
  const [activeCall, setActiveCall] = useState<Call | null>()
  const [callError, setcallError] = useState<string | null>(null)
  const { fcmState } = useFCMState()
  const [initiateConferenceCall] = useMutation(MAKE_CALL)
  const user = useUser()
  const { data } = useQuery(GET_CALL_LOG)
  const location = useLocation()
  const participantBusy =
    fcmState.notification.title === 'Participant Busy' ||
    fcmState.notification.title === 'Participant No Answer'

  const callTitle = (value: string) => {
    let titleName = 'Outbound Call'
    if (value === 'inbound') {
      titleName = 'Inbound Call'
    }
    return titleName
  }

  /*
   *
   * This is the logic tocheck an active call
   *
   * */
  useEffect(() => {
    if (data) {
      const logs: ILogs[] = data.conferenceSessions.edges
      const activeCallLog = logs.filter(
        (log) =>
          log.node.agentEmail === user?.email &&
          log.node.sessionStarted === true &&
          !log.node.sessionEnded
      )
      if (activeCallLog && activeCallLog.length > 0) {
        const ongoingCall = activeCallLog[0].node
        const call = {
          title: callTitle(ongoingCall.callDirection.toLocaleLowerCase()),
          type: ongoingCall.callDirection,
          state: 'ONGOING',
          assigned: user ? user.email : '',
          member: ongoingCall.memberPhone,
          initialCallTime:
            (new Date().getMinutes() -
              new Date(ongoingCall.startedAt).getMinutes()) *
              60 +
            (new Date().getSeconds() -
              new Date(ongoingCall.startedAt).getSeconds()),
        }
        const isActiveCallingMember = window.location.pathname.includes(
          ongoingCall.memberAirtableId
        )

        if (isActiveCallingMember) {
          setActiveCall(call)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location.pathname, counter])

  /*
   *
   * This is the logic to listen to incoming events following an active call
   *
   * */
  useEffect(() => {
    if (activeCall?.state !== 'FULFILLED') {
      const callUpdates: Call = {} as Call
      const isStaff = fcmState.data.is_staff === 'true'
      if (fcmState.notification.title === 'Call Ongoing') {
        if (!activeCall || Object.keys(activeCall).length === 0) {
          callUpdates.title = 'Inbound Call'
          callUpdates.type = 'INBOUND'
          callUpdates.assigned = user ? user.email : ''
          callUpdates.initialCallTime = 0
        }
        callUpdates.state = 'ONGOING'
      } else if (fcmState.notification.title === 'Call Ended') {
        const duration = parseFloat(fcmState.data.duration)
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
      } else if (fcmState.notification.title === 'Participant Left') {
        if (!isStaff) {
          callUpdates.state = 'MEMBERLEFT'
        }
      }
      setActiveCall({ ...activeCall, ...callUpdates })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcmState.notification.title])

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

  const initiateCall = (
    callContact: CallContact,
    onCallInitiated: (call: Call) => void
  ) => {
    if (activeCall && Object.keys(activeCall).length !== 0) {
      throw new Error('Call in progress')
    }
    const phoneNum = formatPhoneForSubmission(numberType(callContact, false))
    if (phoneNum) {
      initiateConferenceCall({
        variables: {
          antaraId: member['Antara ID'],
          recipient: phoneNum,
        },
      })
        .then((response) => {
          if (response.data.placeCall.status === 200) {
            const call = {
              title: 'Outbound Call',
              type: 'OUTBOUND',
              state: 'RINGING',
              assigned: user ? user.email : '',
              member: phoneNum,
              initialCallTime: 0,
            }
            setActiveCall(call)
            setActiveCallContact(callContact)
            onCallInitiated(response.data)
          } else {
            setcallError(response.data.placeCall.message)
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
  }
  const setCounterValue = () => {
    setcounter((val) => val + 1)
  }

  return (
    <CallContext.Provider
      value={{
        activeCallContact,
        activeCall,
        callError,
        completeCall,
        initiateCall,
        setCounterValue,
      }}
    >
      {children}
    </CallContext.Provider>
  )
}

const useCall = () => React.useContext(CallContext)

export { CallProvider, useCall }
