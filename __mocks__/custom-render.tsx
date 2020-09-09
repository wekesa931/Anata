import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render } from '@testing-library/react'
import AppContext from '../src/context'

function renderWithRouter(
  ui: any,
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    route = '/',
    history = createBrowserHistory(),
  } = {}
): any {
  const Wrapper = ({ children }: any) => (
    <AppContext>
      <Router history={history}>{children}</Router>
    </AppContext>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  }
}

export default renderWithRouter
