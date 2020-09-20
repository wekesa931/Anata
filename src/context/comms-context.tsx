import React, { useState } from 'react'

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
  const [currentCommsStatus, setCurrentCommsStatus] = useState<CommsStatus>({
    callInProgress: false,
  })

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
