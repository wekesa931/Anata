import React from 'react'
import { render } from '@testing-library/react'
import App from './hn-dashboard'
jest.mock('@antarahealth/comms-ui', () => () => (<div>Test</div>));

describe('<App/>', () => {
  test('renders HN Dashboard Component', () => {
    render(<App />)
  })
})
