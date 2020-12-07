import React from 'react'
import { render } from '@testing-library/react'
import App from './hn-dashboard'
jest.mock('@antarahealth/comms-ui', () => () => <div>Test</div>)

jest.mock('@bugsnag/js', () => ({
  getPlugin: (str: string) => ({
    createErrorBoundary: (react: any) => () => <div>Error Boundary</div>,
  }),
  start: (options: any) => null,
}))

describe('<App/>', () => {
  test('renders HN Dashboard Component', () => {
    render(<App />)
  })
})
