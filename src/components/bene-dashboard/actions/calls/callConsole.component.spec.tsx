import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { act } from 'react-dom/test-utils'
import { screen, cleanup, fireEvent } from '@testing-library/react'
import {
  GET_CALL_LOG,
  MAKE_CALL,
  MEMBER_CONTACT_DETAILS,
} from '../../../../gql/comms'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import CallsCallout from './calls.component'
import ContactList from './contacts.component'
import CallFloatingBox from './callConsole.component'
import mockHnTasks from '../../../../../__mocks__/hn-tasks-mock'
import { GET_MEMBER_TASKS } from '../../../../gql/hn_tasks'
import mockCallSession from '../../../../../__mocks__/call-session-mocks'

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

jest.mock('../../../../comms/fcm/fcm.hook', () => {
  return jest.fn().mockImplementation(() => {
    return {
      fcmState: {
        notification: {
          title: 'Call Ongoing',
          body: '',
        },
      },
    }
  })
})

const callSession = {
  request: {
    query: GET_CALL_LOG,
  },
  result: () => {
    return mockCallSession
  },
}

const HNTasks = {
  request: {
    query: GET_MEMBER_TASKS,
    variables: {
      antaraId: 'TRIAL-ID16',
    },
  },
  result: () => {
    return mockHnTasks
  },
}

const makeCall = {
  request: {
    query: MAKE_CALL,
    variables: {
      antaraId: 'WLJ-7GXP',
      recipient: '+254708201772',
    },
  },
  result: {
    data: {
      placeCall: {
        message: 'Call was successfully placed',
        status: 200,
      },
    },
  },
}

const memberContactDetails = {
  request: {
    query: MEMBER_CONTACT_DETAILS,
    variables: {
      antaraId: 'TRIAL-ID16',
    },
  },
  result: {
    data: {
      beneficiary: {
        edges: [
          {
            node: {
              status: 'ACTIVE',
              fullName: 'Julius Kuangrules Muithi',
              contactPhone1: '+254723731241',
              contactPhone2: '+254717579610',
              emergencyContactName: null,
              emergencyContactPhone1: null,
              emergencyContactPhone2: null,
              emergencyContactRelationship: null,
              dependents: [],
            },
          },
        ],
      },
    },
  },
}

describe('Call Functionality ', () => {
  afterEach(cleanup)
  test('<CallsCallout /> should render', async () => {
    await act(async () => {
      renderWithRouter(
        <MockedProvider
          mocks={[HNTasks, memberContactDetails, makeCall, callSession]}
          addTypename={false}
        >
          <>
            <CallsCallout />
          </>
        </MockedProvider>
      )
    })
    // fireEvent.click(screen.getByTestId('initiate-call-button'))
    // expect(screen.getAllByTestId('phone-list')).not.toBeNull()
  })
  test('<ContactList /> should render', async () => {
    await act(async () => {
      renderWithRouter(
        <MockedProvider mocks={[makeCall]} addTypename={false}>
          <>
            <ContactList
              relevantContact={{ phone1: '+254723731241' }}
              onCallInitiated={jest.fn(() => null)}
            />
            <CallFloatingBox />
          </>
        </MockedProvider>
      )
    })
    const button = screen.getByText('+254 723 731 241')
    fireEvent.click(button)
    expect(screen.getByText('phone1')).toBeTruthy()
    const button2 = screen.getByTestId('call-initiator')
    fireEvent.click(button2)
  })
})
