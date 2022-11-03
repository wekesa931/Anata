import React from 'react'
import Login from './login.component'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})

const LoginWithRouter = () => (
  <Router>
    <Login />
  </Router>
)

describe('<Login/>', () => {
  it('renders <Login/> successfully', () => {
    render(<LoginWithRouter />)
  })

  it('login button is active', () => {
    render(<LoginWithRouter />)
    const button = screen.getByText('Login with your Antara Email')
    expect(button).not.toBeNull()
  })

  //ToDo figure out how to test google oauth 2 login and redirect
})
