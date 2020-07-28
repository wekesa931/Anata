import React from 'react'
import { render, screen } from '@testing-library/react'
import HNDashboard from './dashboard'

describe('<HNDashboard/>', () => {
  it('should render', () => {
    render(<HNDashboard />)
  })

  it('displays various links to views', () => {
    render(<HNDashboard />)
    expect(screen.getAllByText('Members')).toBeTruthy()
    expect(screen.getAllByText('Vitals')).toBeTruthy()
    expect(screen.getAllByText('HN Tasks')).toBeTruthy()
  })
})
