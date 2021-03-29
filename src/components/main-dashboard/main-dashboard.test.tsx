import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import HNDashboard from './main-dashboard'

describe('<HNDashboard/>', () => {
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
  it('button is clicked', () => {
    const { queryByTestId } = render(<HNDashboard />)
    const btn = queryByTestId('HN Meetings')
    const txtHeading = queryByTestId('hn-text-heading')

    if (btn && txtHeading) {
      expect(btn).toBeTruthy()
      expect(txtHeading).toBeTruthy()

      expect(txtHeading.innerHTML).toBe('Members')

      fireEvent.click(btn)
      expect(txtHeading.innerHTML).toBe('HN Meetings')
    }
  })
})
