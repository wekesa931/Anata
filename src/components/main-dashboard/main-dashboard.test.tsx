import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import HNDashboard from './main-dashboard'

describe('<MainDashboard />', () => {
  afterEach(cleanup)
  it('should render', () => {
    render(<HNDashboard />)
  })

  it('displays various links to views', () => {
    render(<HNDashboard />)
    expect(screen.getAllByText('Members')).toBeTruthy()
    expect(screen.getAllByText('HN Tasks')).toBeTruthy()
    expect(screen.getAllByText('HN Meetings')).toBeTruthy()
  })
  it('displays correct menu items on click', () => {
    const { queryByTestId, getByTestId } = render(<HNDashboard />)
    const btn = getByTestId('HN Meetings')
    const txtHeading = queryByTestId('hn-text-heading')
    expect(btn).toBeTruthy()
    expect(txtHeading).toBeTruthy()
  })
})
