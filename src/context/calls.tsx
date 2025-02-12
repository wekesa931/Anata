import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Call } from '@mui/icons-material'
import { useUser } from 'src/context/user'
import {
  MAKE_CALL,
  TRANSFER_CALL,
  GET_ACTIVE_CALL,
  END_CALL,
} from 'src/modules/comms/services/gql'
import { useFcm } from 'src/context/fcm/fcm.context'
import { logError } from 'src/utils/logging/logger'
import type { Member } from 'src/modules/member/db/models'
import { useModuleAnalytics } from 'src/modules/analytics'

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
  dialPadInitiated?: boolean
  memberContacts?: any[]
}

type ContextType = {
  activeCall?: Call | null
  activeCallContact?: CallContact | null
  callError?: string | null
  conferenceParticipants?: IParticipantSession[]
  memberData: any
  completeCall: () => void
  setCallerName: (name: string) => void
  initiateCall: (details: any) => void
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
  handleEndCall: () => null,
  memberData: {},
})

type InitiateCallInput = {
  callContact: any
  onCallInitiated: (data?: any) => void
  memberDetails: Member
  type?: 'INBOUND' | 'OUTBOUND' | 'CALLBACK'
  dialPadInitiated?: boolean
  memberContacts: any[]
}

function CallProvider({ children }: any) {
  const [conferenceParticipants, setConferenceParticipants] = useState<
    IParticipantSession[]
  >([])
  const [activeCallContact, setActiveCallContact] =
    useState<CallContact | null>()
  const [counter, setcounter] = useState(0)
  const [memberData, setMemberData] = useState<Member>()
  const [activeCall, setActiveCall] = useState<Call | null>()
  const [callError, setcallError] = useState<string | null>(null)
  const { pushNotification } = useFcm()
  const [initiateConferenceCall] = useMutation(MAKE_CALL)
  const [initiateCallTransfer] = useMutation(TRANSFER_CALL)
  const [endCall] = useMutation(END_CALL)
  const user = useUser()
  const [getActiveCalls, { data, refetch: getCallSessions }] =
    useLazyQuery(GET_ACTIVE_CALL)
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

  useEffect(() => {
    if (user) {
      getActiveCalls()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /*
   *
   * This is the logic to check an active call
   *
   * */
  useEffect(() => {
    if (data) {
      const rawLogs = data.activeCall.edges
      const logs = rawLogs.map((log: { node: any }) => log.node)
      if (logs.length > 0) {
        if (logs[0].session === null) {
          setConferenceParticipants([])
          setActiveCall(null)
        } else {
          const { participants: allParticipants, session: activeSession } =
            logs[0]
          if (allParticipants?.length > 0 && activeSession) {
            const participantsDetails: IParticipantSession[] =
              allParticipants?.map((log: IParticipantSession) => {
                return {
                  isOnHold: log?.isOnHold,
                  participantId: log?.participantId,
                  participantName: log?.participantName,
                  session: activeSession?.roomName,
                  sessionId: log?.sessionId,
                  biodataValidated: log?.biodataValidated,
                  isMember: log?.isMember,
                  isStaff: log?.isStaff,
                }
              })
            const memberParticipant = allParticipants.find(
              (participant: any) =>
                !participant?.isStaff && participant?.isMember
            )
            const correctRoomName = activeSession?.roomName.replace(/-/g, '')
            const call: Call = {
              title: callTitle(
                activeSession?.callDirection?.toLocaleLowerCase()
              ),
              type: activeSession?.callDirection,
              state: 'ONGOING',
              assigned: activeSession?.callDirection,
              member: activeSession?.memberPhone,
              memberName: memberParticipant?.participantName,
              memberAntaraId: memberParticipant?.antaraId,
              initialCallTime:
                (new Date().getMinutes() -
                  new Date(activeSession?.startedAt).getMinutes()) *
                  60 +
                (new Date().getSeconds() -
                  new Date(activeSession?.startedAt).getSeconds()),
              session: correctRoomName,
            }
            setConferenceParticipants(participantsDetails)
            setActiveCall(call)
          }
        }
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
    if (activeCall?.state && activeCall?.state !== 'FULFILLED') {
      if (pushNotification?.data?.event === 'Participant Joined') {
        if (!pushNotification?.data) return

        const parsedParticipant = pushNotification?.data

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
              session: parsedParticipant?.room_name,
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
      let callerNum = memberData?.phone || ''
      let callerName = memberData?.fullName || ''
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

  const {
    trackCallEnded,
    trackTransferRequested,
    trackTransferValidated,
    trackCalInitiated,
  } = useModuleAnalytics()

  const handleEndCall = async () => {
    try {
      const res = await endCall({
        variables: {
          session: activeCall?.session,
        },
      })
      if (res.data.endCall.status === 200) {
        getCallSessions()
        setcallError(null)
        trackCallEnded(activeCall)
      } else {
        setcallError(res.data.endCall.message)
      }
    } catch (e: any) {
      logError(e.message)
    }
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
    const transfer = {
      phoneNumber: phone,
      staffEmail: email,
      session: activeCall?.session,
      onTransferAction: transferAction,
    }
    trackTransferRequested(transfer)

    if (activeCall) {
      setActiveCall({ ...activeCall, forwardTo: fullName })
    }
    initiateCallTransfer({
      variables: transfer,
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
            trackTransferValidated(transfer)
          }
        }
      })
      .catch((e) => {
        setcallError(e.message)
        logError(e.message)
      })
  }

  const initiateCall = ({
    callContact,
    onCallInitiated,
    memberDetails,
    type = 'OUTBOUND',
    dialPadInitiated = false,
    memberContacts = [],
  }: InitiateCallInput) => {
    if (
      activeCall &&
      Object.prototype.hasOwnProperty.call(activeCall, 'title')
    ) {
      throw new Error('Call in progress')
    }
    const phoneNum = callContact
    if (phoneNum) {
      initiateConferenceCall({
        variables: {
          antaraId: memberDetails?.antaraId,
          recipient: phoneNum,
          dialPadUsed: dialPadInitiated,
        },
      })
        .then((response) => {
          if (response?.data?.placeCall.status === 200) {
            const call: Call = {
              title: 'Outbound Call',
              type,
              state: 'RINGING',
              assigned: user ? user.email : '',
              member: phoneNum,
              initialCallTime: 0,
              memberName: memberDetails?.fullName,
              session: response?.data?.placeCall.session,
              dialPadInitiated,
              memberContacts,
              memberAntaraId: memberDetails?.antaraId,
            }
            console.log(call)
            setActiveCall({ ...activeCall, ...call })
            setActiveCallContact(callContact)
            onCallInitiated(response?.data)
            setMemberData(memberDetails)
            trackCalInitiated(call)
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
    setActiveCall({ ...activeCall, callbackHistoryId: id } as Call)
  }
  const setCallerName = (name: string) => {
    setActiveCall({ ...activeCall, memberName: name } as Call)
  }
  const updateParticipantHoldState = (part: IParticipantSession[]) => {
    setConferenceParticipants(part)
  }

  const providerValue = React.useMemo(
    () => ({
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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      activeCallContact,
      activeCall,
      callError,
      conferenceParticipants,
      memberData,
      counter,
    ]
  )

  return (
    <CallContext.Provider value={providerValue}>
      {children}
    </CallContext.Provider>
  )
}

const useCall = () => React.useContext(CallContext)

export { CallProvider, useCall }
