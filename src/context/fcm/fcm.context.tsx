import React, { useState, useEffect } from 'react'
import FCM, { fetchAllAndClear } from 'src/context/fcm/utils'
import { XCircle } from 'react-feather'
import { useLocation, useNavigate } from 'react-router-dom'
import CallIcon from 'src/assets/img/icons/phone-call.svg?react'
import MessageIcon from 'src/assets/img/icons/message-circle.svg?react'
import styles from './fcm.module.css'

type PushNotification = {
  notification:
    | {
        title: string
        body: string
      }
    | undefined
  data: {
    [key: string]: any
  }
}

type ContextType = {
  recID: any
  pushNotification?: PushNotification | null
  setPushNotification: (notification: PushNotification) => any
}

const FcmContext = React.createContext<ContextType>({
  recID: null,
  setPushNotification: (notification: PushNotification) => notification,
})

function FcmProvider({ children }: any) {
  const [incomingPushNotification, setIncomingPushNotification] =
    useState<PushNotification | null>(null)
  const [localPushNotification, setLocalPushNotification] =
    useState<PushNotification | null>(null)
  const [externalPushNotification, setExternalPushNotification] =
    useState<PushNotification | null>(null)
  const [recID, setRecID] = useState(null)
  const [memberId, setMemberId] = useState<string | undefined>('')
  const [localPushCategory, setLocalPushCategory] = useState<
    'CALL' | 'MESSAGE'
  >('CALL')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const notificationData = incomingPushNotification?.data
    const memberPushAtId =
      notificationData?.member_airtable_id || notificationData?.airtable_id
    const isEligible =
      memberPushAtId &&
      !location.pathname.includes(memberPushAtId) &&
      notificationData
    if (isEligible) {
      if (notificationData?.category?.toLowerCase().includes('call')) {
        setLocalPushCategory('CALL')
      }

      if (notificationData?.category?.toLowerCase().includes('message')) {
        setLocalPushCategory('MESSAGE')
      }

      setMemberId(memberPushAtId)
      setLocalPushNotification(incomingPushNotification)
      setExternalPushNotification(incomingPushNotification)
    } else {
      setExternalPushNotification(incomingPushNotification)
    }
    if (memberPushAtId) {
      setRecID(memberPushAtId)
    }
  }, [
    incomingPushNotification,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    incomingPushNotification?.data.event,
    location.pathname,
  ])

  const setPushNotificationFromOutside = (noti: PushNotification) => {
    setLocalPushNotification(null)
    setExternalPushNotification(noti)
    setMemberId('')
    setIncomingPushNotification(null)
  }

  const handleNotification = () => {
    if (memberId) {
      navigate(`/member/${memberId}`)
      setLocalPushNotification(null)
      setIncomingPushNotification(null)
      setMemberId('')
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        fetchAllAndClear().then((re) => {
          if (re.length > 0) {
            const notify = re.pop()
            setIncomingPushNotification({
              data: notify?.data,
              notification: notify?.notification,
            })
          }
        })
      }
    })

    FCM.onMessage((payload) => {
      setIncomingPushNotification({
        data: payload.data,
        notification: payload.notification,
      })
    })
  })

  const providerValue = React.useMemo(
    () => ({
      recID,
      pushNotification: externalPushNotification,
      setPushNotification: setPushNotificationFromOutside,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recID, externalPushNotification]
  )

  return (
    <FcmContext.Provider value={providerValue}>
      {localPushNotification && localPushNotification?.data?.event && (
        <div className={styles.inboundNotification}>
          <div className="d-flex align-center">
            {memberId ? (
              <>
                {localPushCategory === 'CALL' ? <CallIcon /> : <MessageIcon />}
                <div className="d-flex flex-column ml-10">
                  <button
                    className={styles.goToDashboard}
                    onKeyDown={handleNotification}
                    onClick={handleNotification}
                  >
                    {localPushNotification?.data?.event}
                  </button>
                </div>
              </>
            ) : (
              <>
                <XCircle className={styles.error} width="36px" height="36px" />
                <p className={styles.error}>
                  {localPushNotification?.data?.event}
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {children}
    </FcmContext.Provider>
  )
}

const useFcm = () => React.useContext(FcmContext)

export { FcmProvider, useFcm }
