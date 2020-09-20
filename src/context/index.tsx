import React from 'react'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'
import { CommsProvider } from './comms-context'

const AppContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        <CommsProvider>{children}</CommsProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default AppContexts
