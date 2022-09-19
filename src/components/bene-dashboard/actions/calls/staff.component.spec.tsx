import { MockedProvider } from '@apollo/client/testing'
import { act, cleanup, fireEvent, screen } from '@testing-library/react'
import React from 'react'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import { GET_ANTARA_STAFF } from '../../../../gql/staff'
import HNAndCSList from './staff.component'

jest.mock('../../../../helpers/analytics', () => {
  return jest.fn(() => null)
})

jest.mock('../communication/communication.component.tsx', () => {
  return jest.fn().mockImplementation(() => {
    return <></>
  })
})

jest.mock('react-toast-notifications', () => ({
  // @ts-ignore
  ...jest.requireActual('react-toast-notifications'),
  useToasts: () => ({
    addToast: {},
  }),
}))

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn(),
    messaging: jest.fn(),
    initializeApp: jest.fn(),
  }
})
const mockFn = jest.fn(() => null)
const antaraStaff = {
  request: {
    query: GET_ANTARA_STAFF,
  },
  result: () => {
    return {
      data: {
        antaraStaff: {
          edges: [
            {
              node: {
                emailUsername: 'Bill',
                fullName: 'Bill Wekesa',
                historyUserIdField: 'bill@gmail.com',
                id: 'my id',
                phone: '+254788332938',
                slackId: 'slackid',
              },
            },
          ],
        },
      },
    }
  },
}

describe('Call Functionality ', () => {
  afterEach(cleanup)
  test('<HNAndCSList /> should render', async () => {
    await act(async () => {
      renderWithRouter(
        <MockedProvider mocks={[antaraStaff]} addTypename={false}>
          <HNAndCSList displayList={mockFn} />
        </MockedProvider>
      )
    })
    expect(await screen.findByText('Transfer call')).toBeInTheDocument()
    expect(await screen.getByTestId('check-mark')).toBeEmptyDOMElement()
    const staffButton = await screen.getByTestId('staff-to-transfer')
    await fireEvent.click(staffButton)
    const icon = await screen.getByTestId('check-mark-icon')
    expect(await screen.getByTestId('check-mark')).toContainElement(icon)
  })
})
