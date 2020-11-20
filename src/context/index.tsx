import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'
import { CommsProvider } from './comms-context'
import apolloClient from '../resources/apollo-client'

const AppContexts = ({ children }: any) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <UserProvider>
          <CommsProvider>{children}</CommsProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default AppContexts
