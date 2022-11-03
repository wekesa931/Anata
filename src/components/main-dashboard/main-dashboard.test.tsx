import React from 'react'
import { screen } from '@testing-library/react'
import renderWithRouter from '../../../__mocks__/custom-render.mock'
import HNDashboard from './main-dashboard'

jest.mock('@airtable/blocks/ui', () => {
  return {
    Label: <></>,
    Text: <></>,
  }
})
jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})

// describe('<mainDashboard>', () => {
//   it('should render correctly', () => {
//     const tree = renderer.create(<HNDashboard/>).toJSON()
//     expect (tree).toMatchSnapshot()
//     // expect(true).toBeTruthy()
//   })
// })

describe('<mainDashboard>', () => {
  it('should render correctly', () => {
    renderWithRouter(<HNDashboard />)
    const dash = screen.getByTestId('main-dash')
    expect(dash).toBeTruthy()
  })
})
