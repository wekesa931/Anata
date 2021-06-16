import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'
import { CommsProvider } from './comms-context'
import apolloClient from '../resources/apollo-client'
import { SidebarProvider } from './sidebar-context'

const AppContexts = ({ children }: any) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <UserProvider>
          <SidebarProvider>
            <CommsProvider>{children}</CommsProvider>
          </SidebarProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default AppContexts
