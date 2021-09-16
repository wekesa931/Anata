import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useUser } from './user-context'
import { MAKE_CALL, TRANSFER_CALL, GET_ACTIVE_CALL } from '../gql/comms'
import { useFcm } from './fcm/fcm.context'
import logError from '../components/utils/Bugsnag/Bugsnag'

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

export type IParticipantSession = {
  isOnHold: boolean
  participantId: string
  participantName: string
  session: string
  conferenceRoom: string
  isMember?: boolean
}

type CallContact = {
  [key: string]: string
}

type MemberDetails = {
  name: string
  number: string
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
  conferenceParticipants?: IParticipantSession[]
  completeCall: () => void
  setCallerName: (name: string) => void
  initiateCall: (
    callContact: CallContact,
    onCallInitiated: () => void,
    memberDetails: any,
    type?: string
  ) => void
  initiateTransfer: (staff: {
    phone: string
    email: string
    fullName: string
    transferAction: string
  }) => void
  updateParticipantHoldState: (part: IParticipantSession[]) => void
  setCounterValue: () => void
  setHistoryRecordId: (id: string) => void
}

export const participantCallAction = {
  HOLD: 'HOLD',
  MUTE: 'MUTE',
  NONE: 'NONE',
}
const CallContext = React.createContext<ContextType>({
  updateParticipantHoldState: () => null,
  initiateCall: () => null,
  initiateTransfer: () => null,
  setCallerName: () => null,
  completeCall: () => null,
  setCounterValue: () => null,
  setHistoryRecordId: () => null,
})

function CallProvider({ children }: any) {
  const [conferenceParticipants, setConferenceParticipants] = useState<
    IParticipantSession[]
  >([])
  const [activeCallContact, setActiveCallContact] =
    useState<CallContact | null>()
  const [counter, setcounter] = useState(0)
  const [memberNameAndNo, setmemberNameAndNo] = useState<MemberDetails>({
    name: '',
    number: '',
  })
  const [activeCall, setActiveCall] = useState<Call | null>()
  const [callError, setcallError] = useState<string | null>(null)
  const { pushNotification } = useFcm()
  const [initiateConferenceCall] = useMutation(MAKE_CALL)
  const [initiateCallTransfer] = useMutation(TRANSFER_CALL)
  const user = useUser()
  const { data } = useQuery(GET_ACTIVE_CALL)
  const participantBusy =
    pushNotification?.data?.event === 'Participant Busy' ||
    pushNotification?.data?.event === 'Participant No Answer'

  const callTitle = (value: string) => {
    let titleName = 'Outbound Call'
    if (value === 'inbound') {
      titleName = 'Inbound Call'
    }
    return titleName
  }

  /*
   *
   * This is the logic to check an active call
   *
   * */
  useEffect(() => {
    if (data) {
      const rawLogs = data.activeCall.edges
      const logs = rawLogs.map((log) => log.node)
      const { participants: allParticipants, session: activeSession } = logs[0]
      if (allParticipants.length > 0 && activeSession) {
        const participantsDetails: IParticipantSession[] = allParticipants.map(
          (log: IParticipantSession) => {
            return {
              isOnHold: log.isOnHold,
              participantId: log.participantId,
              participantName: log.participantName,
              session: log.conferenceRoom,
              isMember: log.isMember,
            }
          }
        )
        const memberParticipant = allParticipants.find(
          (participant) => !participant.isStaff && participant.isMember
        )
        const correctRoomName = activeSession.roomName.replace(/-/g, '')
        const call = {
          title: callTitle(activeSession.callDirection.toLocaleLowerCase()),
          type: activeSession.callDirection,
          state: 'ONGOING',
          assigned: activeSession.callDirection,
          member: activeSession.memberPhone,
          memberName: memberParticipant.participantName,
          initialCallTime:
            (new Date().getMinutes() -
              new Date(activeSession.startedAt).getMinutes()) *
              60 +
            (new Date().getSeconds() -
              new Date(activeSession.startedAt).getSeconds()),
          session: correctRoomName,
        }
        setConferenceParticipants(participantsDetails)
        setActiveCall(call)
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
      if (pushNotification?.data?.event === 'Participant Joined') {
        const parsedParticipant = JSON.parse(
          pushNotification?.data?.participant
        )
        const parsedSession = JSON.parse(pushNotification?.data?.session)
        setConferenceParticipants([
          ...conferenceParticipants,
          {
            participantName: parsedParticipant?.participant_name,
            isOnHold: parsedParticipant?.is_on_hold,
            participantId: parsedParticipant?.participant_id,
            session: parsedSession?.room_name,
            conferenceRoom: parsedParticipant?.conference_room,
            isMember: parsedParticipant?.is_member,
          },
        ])
        if (activeCall?.forwardTo) {
          setActiveCall({ ...activeCall, forwardTo: undefined })
        }
      }
      let conferenceName = ''
      let callerNum = memberNameAndNo.number
      let callerName = memberNameAndNo.name
      const callUpdates: Call = {} as Call
      const isStaff = pushNotification?.data?.is_staff === 'true'
      if (
        (pushNotification?.data?.event === 'Participant Joined' &&
          pushNotification?.data?.is_member === 'true') ||
        pushNotification?.data?.event === 'Incoming Call'
      ) {
        if (!activeCall) {
          callUpdates.title = 'Inbound Call'
          callUpdates.type = 'INBOUND'
          callUpdates.assigned = user ? user.email : ''
          callUpdates.initialCallTime = 0
        }
        callUpdates.state = 'ONGOING'
      } else if (pushNotification?.data?.event === 'Call Ended') {
        setConferenceParticipants([])
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
      } else if (pushNotification?.data?.event === 'Participant Left') {
        if (!isStaff) {
          callUpdates.state = 'MEMBERLEFT'
        } else {
          callUpdates.state = 'FULFILLED'
        }
      }
      if (pushNotification?.data?.conference) {
        conferenceName = pushNotification?.data?.conference
      }
      if (
        pushNotification?.data?.caller_phone &&
        pushNotification?.data?.caller_name
      ) {
        callerNum = pushNotification?.data?.caller_phone
        callerName = pushNotification?.data?.caller_name
      }

      if (Object.keys(callUpdates).length !== 0) {
        setActiveCall({
          ...activeCall,
          ...callUpdates,
          member: callerNum,
          session: conferenceName,
          forwardTo: undefined,
          memberName: callerName,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushNotification?.data?.event])

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
          if (transferAction === participantCallAction.HOLD) {
            const updatedHoldState = conferenceParticipants.map((pat) => {
              if (pat.isMember) {
                pat.isOnHold = true // eslint-disable-line no-param-reassign
              }
              return pat
            })
            setConferenceParticipants(updatedHoldState)
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
    memberDetails: any,
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
          antaraId: memberDetails['Antara ID'],
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
              memberName: memberDetails['Full Name'],
            }
            setActiveCall({ ...activeCall, ...call })
            setActiveCallContact(callContact)
            onCallInitiated(response?.data)
            setmemberNameAndNo({
              name: memberDetails['Full Name'],
              number: phoneNum,
            })
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
    setConferenceParticipants([])
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
  const updateParticipantHoldState = (part: IParticipantSession[]) => {
    setConferenceParticipants(part)
  }

  return (
    <CallContext.Provider
      value={{
        activeCallContact,
        activeCall,
        callError,
        conferenceParticipants,
        updateParticipantHoldState,
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
