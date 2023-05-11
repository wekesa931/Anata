import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ToastProvider } from 'react-toast-notifications'
import client from 'src/services/api/client'
import { UserProvider } from 'src/context/user'
import { AuthProvider } from 'src/context/auth'
import { AirtableMetaProvider } from 'src/context/airtable-meta'
import { SidebarProvider } from 'src/context/sidebar'
import { CommsProvider } from 'src/context/comms'
import { DataProvider } from 'src/storage/indexeddb/watermelon/db'
import { NotificationsProvider } from 'src/context/notifications'

function AppContexts({ children }: any) {
  return (
    <DataProvider>
      <NotificationsProvider>
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
      </NotificationsProvider>
    </DataProvider>
  )
}

export default AppContexts
