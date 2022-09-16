import * as React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import CallConsoleForms from './forms'

jest.mock('../../../../helpers/analytics', () => {
  return jest.fn(() => null)
})

jest.mock('../../../../context/forms-context', () => ({
  useFormPortal: () => ({
    addOpenForm: jest.fn(),
    openedForms: [],
  }),
}))

jest.mock('../../../../context/fcm/fcm.context', () => ({
  useFcm: () => ({
    recID: 'xyz',
  }),
}))

describe('<CallConsoleForms />', () => {
  afterEach(cleanup)
  test('renders correctly', async () => {
    renderWithRouter(
      <MockedProvider mocks={[]}>
        <CallConsoleForms height="100" />
      </MockedProvider>
    )
  })
  test('<CallConsoleForms />', async () => {
    const wrapper = renderWithRouter(
      <MockedProvider mocks={[]}>
        <CallConsoleForms height="100" />
      </MockedProvider>
    )
    const interactorTypeField = wrapper.getByPlaceholderText('Search form...')
    fireEvent.change(interactorTypeField, { target: { value: 'Appointment' } })
    expect(wrapper.getAllByText('Appointment')).not.toBeNull()
  })
})
