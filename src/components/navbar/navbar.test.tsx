import React from 'react'
import NavBar from './navbar.component'
import { render, screen, fireEvent } from '@testing-library/react'

describe('<Navbar', () => {
  it('should render', () => {
    render(<NavBar />)
  })
})
