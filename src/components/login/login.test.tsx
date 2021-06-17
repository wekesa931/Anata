import React from 'react'
import Login from './login.component'
import { render, screen, fireEvent } from '@testing-library/react'

jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})

describe('<Login/>', () => {
  it('renders <Login/> successfully', () => {
    render(<Login />)
  })

  it('login button is active', () => {
    render(<Login />)
    const button = screen.getByText('Login with your Antara Email')
    expect(button).not.toBeNull()
  })

  //ToDo figure out how to test google oauth 2 login and redirect
})
