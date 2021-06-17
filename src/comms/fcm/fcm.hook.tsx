import { useEffect, useState } from 'react'
import FCM from './index' // getAndPostRegToken, // fetchAllAndClear as fetchAllFCMAndClear,

type FCMState = {
  data: any
  notification: {
    title: string
    body: string
  }
}

const useFCMState = () => {
  const [fcmState, setFcmState] = useState<FCMState>({
    data: {},
    notification: {
      title: '',
      body: '',
    },
  })

  useEffect(() => {
    FCM.onMessage((payload) => {
      setFcmState(payload)
    })
  })

  return { fcmState }
}

export default useFCMState
