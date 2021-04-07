import React from 'react'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import Meetings from './meetings.component'

describe('<Meetings />', () => {
  it('renders component', () => {
    renderWithRouter(<Meetings />)
  })
})
