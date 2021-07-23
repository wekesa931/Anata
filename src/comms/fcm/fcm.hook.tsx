import { useEffect, useState } from 'react'
import FCM, { fetchAllAndClear, FCMState } from './index'

const useFCMState = () => {
  const [fcmState, setFcmState] = useState<FCMState>({
    data: {},
    notification: {
      title: '',
      body: '',
    },
  })

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        fetchAllAndClear().then((re) => {
          if (re.length > 0) {
            setFcmState(re[0])
          }
        })
      }
    })
    FCM.onMessage((payload) => {
      setFcmState(payload)
    })
  })

  return { fcmState }
}

export default useFCMState
