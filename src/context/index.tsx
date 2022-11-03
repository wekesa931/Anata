import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ToastProvider } from 'react-toast-notifications'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'
import { CommsProvider } from './comms-context'
import createApoloClient from '../resources/apollo-client'
import { SidebarProvider } from './sidebar-context'
import { LoadingProvider } from './loading-context'

const apolloClient = createApoloClient(false)

function AppContexts({ children }: any) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <UserProvider>
          <SidebarProvider>
            <ToastProvider>
              <CommsProvider>
                <LoadingProvider>{children}</LoadingProvider>
              </CommsProvider>
            </ToastProvider>
          </SidebarProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default AppContexts
