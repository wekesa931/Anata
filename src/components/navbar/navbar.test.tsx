import React from 'react'
import NavBar from './navbar.component'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'

jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})

describe.only('<Navbar', () => {
  afterEach(cleanup)
  it('should render', () => {
    render(<NavBar />)
  })
  it('should close all links when clicked outside', async () => {
    render(<NavBar />)
    const calenderIcon = await screen.findByTestId('calender-btn')
    waitFor(async () => await fireEvent.click(calenderIcon))
    const contentByTxt = await screen.findByText('Your Tasks')
    expect(contentByTxt).toBeInTheDocument()
    waitFor(async () => await fireEvent.click(calenderIcon))
    const outside = await screen.findByTestId('user-menu-btn')
    waitFor(async () => {
      await fireEvent.click(outside)
    })
    expect(contentByTxt).not.toBeInTheDocument()
  })
  it('should show tips on hover', async () => {
    render(<NavBar />)
    const profile = screen.getByTestId('user-menu-btn')
    await waitFor(() => {
      fireEvent.mouseEnter(profile, { bubbles: true })
      expect(screen.findByText('Profile')).toBeTruthy()
    })
  })
})
