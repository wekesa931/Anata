import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import useFCMState from '../../../comms/fcm/fcm.hook'
import Icon from '../icon/icon.component'
import styles from './notification.component.css'
import { GET_CALL_LOG } from '../../../gql/comms'
import { ILogs } from '../../../context/calls-context'
import { useUser } from '../../../context/user-context'
import airtableFetch from '../../../resources/airtable-fetch'

const GlobalNotifications = ({ children }: any) => {
  const [display, setdisplay] = useState('none')
  const [memberOnCall, setmemberOnCall] = useState()
  const { fcmState } = useFCMState()
  const { data } = useQuery(GET_CALL_LOG)
  const user = useUser()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    setdisplay('none')
    const displayNotification = async () => {
      if (data) {
        const logs: ILogs[] = data.conferenceSessions.edges
        const activeCallLog = logs.filter(
          (log) =>
            log.node.agentEmail === user?.email &&
            log.node.sessionStarted === true &&
            !log.node.sessionEnded
        )
        if (activeCallLog && activeCallLog.length > 0) {
          const memberId = activeCallLog[0].node.memberAirtableId
          const response = await airtableFetch(`members/${memberId}`)
          setmemberOnCall(response)
          const isActiveCallingMember =
            window.location.pathname.includes(memberId)
          if (!isActiveCallingMember) {
            setdisplay('block')
          }
        }
      }
    }
    displayNotification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location])

  const navigateToMember = () => {
    setdisplay('none')
    history.push(`/member/${memberOnCall.recID}`)
  }

  useEffect(() => {
    const setFcmNotification = async () => {
      if (
        fcmState.notification.title === 'Incoming Call' ||
        fcmState.notification.title === 'Call Ongoing'
      ) {
        const memberId = fcmState.data.member_airtable_id
        const response = await airtableFetch(`members/${memberId}`)
        setmemberOnCall(response)
        const isActiveCallingMember = window.location.pathname.includes(
          response.recID
        )
        if (!isActiveCallingMember) {
          setdisplay('block')
        }
      } else if (fcmState.notification.title === 'Call Ended') {
        setdisplay('none')
      }
    }
    setFcmNotification()
  }, [fcmState.notification.title, fcmState.data.member_airtable_id])

  return (
    <>
      <div style={{ display }} className={styles.inboundNotification}>
        <div className="d-flex align-center">
          <Icon name="phone-call" fill="white" width={24} height={24} />
          <div className="ml-10 d-flex flex-column">
            <p className={styles.memberName}>
              {memberOnCall && memberOnCall['Full Name']}
            </p>
            <button
              className={styles.goToDashboard}
              onKeyDown={navigateToMember}
              onClick={navigateToMember}
            >
              Go to Member Dashboard
            </button>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default GlobalNotifications
