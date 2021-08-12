import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { useMutation } from '@apollo/client'
import { HOLD_PARTICIPANT, UNHOLD_PARTICIPANT } from '../../../../gql/comms'
import { IParticipantSession, useCall } from '../../../../context/calls-context'
import logError from '../../../utils/Bugsnag/Bugsnag'

const ActiveCallParticipants = () => {
  const { conferenceParticipants, updateParticipantHoldState } = useCall()
  const { addToast } = useToasts()
  const [holdParticipant] = useMutation(HOLD_PARTICIPANT)
  const [unholdParticipant] = useMutation(UNHOLD_PARTICIPANT)

  const makeUpdate = (participant: IParticipantSession, type: boolean) => {
    const updatedParticipants = conferenceParticipants?.map(
      (sessionParticipant) => {
        if (sessionParticipant.participantId === participant.participantId) {
          return { ...sessionParticipant, isOnHold: type }
        }
        return sessionParticipant
      }
    )
    updatedParticipants && updateParticipantHoldState(updatedParticipants)
  }

  const updateError = (err: string) => {
    addToast(err, {
      appearance: 'error',
      autoDismiss: true,
    })
    logError(err)
  }

  const shouldHoldParticipant = (part: IParticipantSession) => {
    holdParticipant({
      variables: {
        participantId: part.participantId,
        session: part.session,
      },
    })
      .then((res) => {
        if (res?.data.holdParticipant.status !== 200) {
          updateError(res?.data.holdParticipant.message)
        } else {
          makeUpdate(part, true)
        }
      })
      .catch((e) => {
        updateError(e.message)
      })
  }

  const shouldUnholdParticipant = (part: IParticipantSession) => {
    unholdParticipant({
      variables: {
        participantId: part.participantId,
        session: part.session,
      },
    })
      .then((res) => {
        if (res?.data.unholdParticipant.status !== 200) {
          updateError(res?.data.holdParticipant.message)
        } else {
          makeUpdate(part, false)
        }
      })
      .catch((e) => {
        updateError(e.message)
      })
  }

  const renderParticipants = () => {
    if (conferenceParticipants) {
      return conferenceParticipants.map((part) => (
        <div
          key={part.participantId}
          className="d-flex flex-between hold-container align-center"
        >
          <p>{part.participantName}</p>
          <span className="d-flex call-actions">
            {!part.isOnHold ? (
              <button
                className="hold-btns"
                onClick={() => shouldHoldParticipant(part)}
              >
                Hold
              </button>
            ) : (
              <button
                className="unhold-btns"
                onClick={() => shouldUnholdParticipant(part)}
              >
                Unhold
              </button>
            )}
          </span>
        </div>
      ))
    }
    return <div />
  }
  return <div>{renderParticipants()}</div>
}

export default ActiveCallParticipants
