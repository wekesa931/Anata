import React from 'react'
import { render } from '@testing-library/react'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from 'src/context/user'
import { AuthProvider } from 'src/context/auth'
import { AirtableMetaProvider } from 'src/context/airtable-meta'
import { DataProvider } from 'src/storage/indexeddb/watermelon/test/test-db'
import { NotificationsProvider } from 'src/context/notifications'
import { MemoryRouter } from 'react-router-dom'
import mockUser from '../../../__mocks__/user.mock'
import { mockClient } from '../../../__mocks__/apollo.mocks'
import mockMeta from '../../../__mocks__/airtable-meta.mock'

export const renderWithRouter = (
  ui: any,
  { route = '/member/TEST-1234' } = {}
) => {
  function Wrapper({ children }: any) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <DataProvider>
          <NotificationsProvider>
            <ApolloProvider client={mockClient}>
              <AuthProvider user={mockUser}>
                <UserProvider>
                  <AirtableMetaProvider meta={mockMeta}>
                    {children}
                  </AirtableMetaProvider>
                </UserProvider>
              </AuthProvider>
            </ApolloProvider>
          </NotificationsProvider>
        </DataProvider>
      </MemoryRouter>
    )
  }
  return {
    ...render(ui, { wrapper: Wrapper }),
  }
}

export default renderWithRouter
