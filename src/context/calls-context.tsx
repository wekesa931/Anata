import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Call } from '@mui/icons-material'
import { useUser } from './user-context'
import {
  MAKE_CALL,
  TRANSFER_CALL,
  GET_ACTIVE_CALL,
  END_CALL,
} from '../gql/comms'
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
  sessionId: string
  isOnHold: boolean
  participantId: string
  participantName: string
  session: string
  conferenceRoom: string
  biodataValidated: boolean
  isMember: boolean
  isStaff: boolean
}

type CallContact = {
  [key: string]: string
}

type MemberDetails = {
  name: string
  number: string
  antaraId: string
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
  memberAntaraId: string
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
  memberData: any
  completeCall: () => void
  setCallerName: (name: string) => void
  initiateCall: (
    callContact: CallContact,
    onCallInitiated: () => void,
    memberDetails: any,
    type?: string,
    dialPadUsed?: boolean
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
  setcallError: (error: string | null) => void
  handleEndCall: () => void
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
  setcallError: () => null,
  completeCall: () => null,
  setCounterValue: () => null,
  setHistoryRecordId: () => null,
  endCalls: () => null,
})

function CallProvider({ children }: any) {
  const [conferenceParticipants, setConferenceParticipants] = useState<
    IParticipantSession[]
  >([])
  const [activeCallContact, setActiveCallContact] =
    useState<CallContact | null>()
  const [counter, setcounter] = useState(0)
  const [memberData, setMemberData] = useState<any>({})
  const [activeCall, setActiveCall] = useState<Call | null>()
  const [callError, setcallError] = useState<string | null>(null)
  const { pushNotification } = useFcm()
  const [initiateConferenceCall] = useMutation(MAKE_CALL)
  const [initiateCallTransfer] = useMutation(TRANSFER_CALL)
  const [endCall] = useMutation(END_CALL)
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
              session: activeSession.roomName,
              sessionId: log.sessionId,
              biodataValidated: log.biodataValidated,
              isMember: log.isMember,
              isStaff: log.isStaff,
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
          memberAntaraId: memberParticipant.antaraId,
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
        const participantExists = conferenceParticipants.find(
          (participant) =>
            participant.participantId === parsedParticipant?.participant_id
        )
        !participantExists &&
          setConferenceParticipants([
            ...conferenceParticipants,
            {
              sessionId: parsedParticipant?.session_id,
              participantName: parsedParticipant?.participant_name,
              isOnHold: parsedParticipant?.is_on_hold,
              participantId: parsedParticipant?.participant_id,
              biodataValidated: parsedParticipant?.biodata_validated,
              session: parsedSession?.room_name,
              isMember: parsedParticipant?.is_member,
              conferenceRoom: parsedParticipant?.conference_room,
              isStaff: parsedParticipant?.is_staff,
            },
          ])
        if (activeCall?.forwardTo) {
          setActiveCall({ ...activeCall, forwardTo: undefined })
        }
      }
      let conferenceName = ''
      let callerNum = memberData.number || ''
      let callerName = memberData['Full Name'] || ''
      const callUpdates: Call = {} as Call
      const isStaff = pushNotification?.data?.is_staff === 'true'
      if (
        (pushNotification?.data?.event === 'Participant Joined' &&
          pushNotification?.data?.member_id) ||
        pushNotification?.data?.event === 'Incoming Call'
      ) {
        if (!activeCall) {
          callUpdates.title = 'Inbound Call'
          callUpdates.type = 'INBOUND'
          callUpdates.memberAntaraId = pushNotification?.data?.member_id
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
          setConferenceParticipants([])
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
      if (pushNotification?.data?.member_id) {
        callUpdates.memberAntaraId = pushNotification?.data?.member_id
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

  const handleEndCall = () => {
    endCall({
      variables: {
        session: activeCall?.session,
      },
    })
      .then((res) => {
        if (res.data.endCall.status === 200) {
          setcallError(null)
        } else {
          setcallError(res.data.endCall.message)
        }
      })
      .catch((e) => {
        logError(e.message)
      })
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
    type = 'OUTBOUND',
    dialPadUsed = false
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
          dialPadUsed,
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
              session: response?.data?.placeCall.session,
            }
            setActiveCall({ ...activeCall, ...call })
            setActiveCallContact(callContact)
            onCallInitiated(response?.data)
            setMemberData({ ...memberDetails, number: phoneNum })
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
        memberData,
        updateParticipantHoldState,
        setCallerName,
        setcallError,
        completeCall,
        initiateCall,
        initiateTransfer,
        setCounterValue,
        setHistoryRecordId,
        handleEndCall,
      }}
    >
      {children}
    </CallContext.Provider>
  )
}

const useCall = () => React.useContext(CallContext)

export { CallProvider, useCall }
