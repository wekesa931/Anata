import React from 'react'
import InteractionLogs from './interaction-logs.component'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import { cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { GET_MEMBER_INTERACTIONS } from '../../../../gql/interactions'
import mockInteractions from '../../../../../__mocks__/interactions-mock'

jest.mock('../../../../helpers/analytics', () => {
  return jest.fn(() => {})
})

const mocks = [
  {
    request: {
      query: GET_MEMBER_INTERACTIONS,
      variables: {
        antaraId: 'TRIAL-ID16',
      },
    },
    result: () => {
      return mockInteractions
    },
  },
]

const render = (mocks: any[] = []) => {
  return renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <InteractionLogs />
    </MockedProvider>
  )
}

describe('<InteractionLogsView/>', () => {
  afterEach(cleanup)
  test('should render', () => {
    render(mocks)
  })
  test('should display loading', () => {
    const wrapper = render(mocks)
    expect(wrapper.findByText('Loading Interaction Logs')).not.toBeNull()
  })
  test('should display list interaction logs correctly', async () => {
    const { queryByText } = render(mocks)
    await new Promise((resolve) => setTimeout(resolve, 200))
    expect(queryByText('Test Sumamary Notes')).not.toBeNull()
    expect(queryByText('Shes doing very well')).not.toBeNull()
    expect(queryByText(/20 Feb '20, 12:27 PM/)).not.toBeNull()
    expect(queryByText(/Test HN 1/)).not.toBeNull()
  })
  test('it displays error message on failure', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_MEMBER_INTERACTIONS,
          variables: {
            antaraId: 'TRIAL-ID16',
          },
        },
        error: new Error('aw shucks!'),
      },
    ]
    const { getByText } = render(errorMocks)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(
      getByText(
        /An error occurred while displaying interaction logs, please refresh the page, if it persists contact help desk./
      )
    ).not.toBeNull()
  })
})
