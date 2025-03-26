import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ToastProvider } from 'react-toast-notifications'
import client from 'src/services/api/client'
import { UserProvider } from 'src/context/user'
import { AuthProvider } from 'src/context/auth'
import { AirtableMetaProvider } from 'src/context/airtable-meta'
import { SidebarProvider } from 'src/context/sidebar'
import { CommsProvider } from 'src/context/comms'
import { NotificationsProvider } from 'src/context/notifications'
import { RegistrationFormProvider } from 'src/context/member-registration'
import { RefreshProvider } from 'src/context/refresh-trigger'

function AppContexts({ children }: any) {
  return (
    <NotificationsProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <UserProvider>
            <AirtableMetaProvider>
              <SidebarProvider>
                <ToastProvider>
                  <RefreshProvider>
                    <CommsProvider>
                      <RegistrationFormProvider>
                        {children}
                      </RegistrationFormProvider>
                    </CommsProvider>
                  </RefreshProvider>
                </ToastProvider>
              </SidebarProvider>
            </AirtableMetaProvider>
          </UserProvider>
        </AuthProvider>
      </ApolloProvider>
    </NotificationsProvider>
  )
}

export default AppContexts
