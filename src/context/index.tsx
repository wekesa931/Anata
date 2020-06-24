import React from 'react'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'

const AppContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}

export default AppContexts
