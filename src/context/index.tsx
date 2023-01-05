import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ToastProvider } from 'react-toast-notifications'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'
import { CommsProvider } from './comms-context'
import client from '../resources/apollo-client'
import { SidebarProvider } from './sidebar-context'
import { AirtableMetaProvider } from './airtable-context'

function AppContexts({ children }: any) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>
          <AirtableMetaProvider>
            <SidebarProvider>
              <ToastProvider>
                <CommsProvider>{children}</CommsProvider>
              </ToastProvider>
            </SidebarProvider>
          </AirtableMetaProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default AppContexts
