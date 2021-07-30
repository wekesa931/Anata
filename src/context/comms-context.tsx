import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { SAVE_FCM_TOKEN } from '../gql/comms'
import { getRegToken } from './fcm/utils'
import { useUser } from './user-context'
import logError from '../components/utils/Bugsnag/Bugsnag'

type CommsStatus = {
  callInProgress: boolean | null
}

type CommsContextType = {
  commsStatus: CommsStatus
  setCommsStatus: (status: CommsStatus) => any
}

const CommsContext = React.createContext<CommsContextType>({
  commsStatus: { callInProgress: false },
  setCommsStatus: (status: CommsStatus) => status,
})

function CommsProvider({ children }: any) {
  const user = useUser()
  const [saveFCMToken] = useMutation(SAVE_FCM_TOKEN)
  const [currentCommsStatus, setCurrentCommsStatus] = useState<CommsStatus>({
    callInProgress: false,
  })
  const [registered, setregistered] = useState<boolean>(false)

  useEffect(() => {
    if (!registered && user) {
      const getToken = async () => {
        try {
          const token = await getRegToken()
          const response = await saveFCMToken({
            variables: {
              identifier: user.email,
              token,
            },
          })
          if (response.data.registerToken.status === 200) {
            setregistered(true)
          }
        } catch (e) {
          logError(e)
        }
      }
      getToken()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <CommsContext.Provider
      value={{
        commsStatus: currentCommsStatus,
        setCommsStatus: setCurrentCommsStatus,
      }}
    >
      {children}
    </CommsContext.Provider>
  )
}
const useComms = () => React.useContext(CommsContext)

export { CommsProvider, useComms }
