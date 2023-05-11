import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, RenderResult } from '@testing-library/react'
import { AuthProvider } from 'scribe/context/auth'
import { UserProvider } from 'scribe/context/user'
import mockUser from './user.mock'
import { MemberProvider } from 'scribe/context/member'
import mockMember from './member.mock'
import { ApolloProvider } from '@apollo/client'
import mockClient from './contact-mocks'
import { AirtableMetaProvider } from 'scribe/context/airtable-meta'

type CustomRenderResult = RenderResult & {
  history: any
}

const renderWithRouter = (ui, { route = '/' } = {}) => {
  const Wrapper = ({ children }: any) => (
    <ApolloProvider client={mockClient}>
      <AuthProvider user={mockUser}>
        <UserProvider>
          <AirtableMetaProvider>
            <MemberProvider member={mockMember}>
              <Router>{children}</Router>
            </MemberProvider>
          </AirtableMetaProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
  }
}

export default renderWithRouter
