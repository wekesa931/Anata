import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'
import { AuthProvider } from '../src/context/auth-context'
import { UserProvider } from '../src/context/user-context'
import mockUser from './user-mock'

type CustomRenderResult = RenderResult & {
  history: any
}

function renderWithRouter(
  ui: any,
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    route = '/',
    history = createBrowserHistory(),
  } = {}
): CustomRenderResult {
  const Wrapper = ({ children }: any) => (
    <AuthProvider user={mockUser}>
      <UserProvider>
        <Router history={history}>{children}</Router>
      </UserProvider>
    </AuthProvider>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  }
}

export default renderWithRouter
