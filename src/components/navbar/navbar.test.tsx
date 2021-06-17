import React from 'react'
import NavBar from './navbar.component'
import { render } from '@testing-library/react'

jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})

describe('<Navbar', () => {
  it('should render', () => {
    render(<NavBar />)
  })
})
