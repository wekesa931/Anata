import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, RenderResult } from '@testing-library/react'
import { AuthProvider } from '../src/context/auth-context'
import { UserProvider } from '../src/context/user-context'
import mockUser from './user.mock'
import { MemberProvider } from '../src/context/member.context'
import mockMember from './member.mock'
import { ApolloProvider } from '@apollo/client'
import mockClient from './contact-mocks'

type CustomRenderResult = RenderResult & {
  history: any
}

const renderWithRouter = (ui, { route = '/' } = {}) => {
  const Wrapper = ({ children }: any) => (
    <ApolloProvider client={mockClient}>
      <AuthProvider user={mockUser}>
        <UserProvider>
          <MemberProvider member={mockMember}>
            <Router>{children}</Router>
          </MemberProvider>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
  }
}

export default renderWithRouter
