import React from 'react'
import { render } from '@testing-library/react'
import App from './hn-dashboard'

describe('<App/>', () => {
  test('renders HN Dashboard Component', () => {
    render(<App />)
  })
})
