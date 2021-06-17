import * as React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import CallConsoleForms from './forms'

jest.mock('../../../../helpers/analytics', () => {
  return jest.fn(() => null)
})

describe('<CallConsoleForms />', () => {
  afterEach(cleanup)
  test('renders correctly', async () => {
    renderWithRouter(
      <MockedProvider mocks={[]}>
        <CallConsoleForms />
      </MockedProvider>
    )
  })
  test('<CallConsoleForms />', async () => {
    const wrapper = renderWithRouter(
      <MockedProvider mocks={[]}>
        <CallConsoleForms />
      </MockedProvider>
    )
    const interactorTypeField = wrapper.getByPlaceholderText('Search form...')
    fireEvent.change(interactorTypeField, { target: { value: 'PAFU' } })
    expect(wrapper.getAllByText('PAFU')).not.toBeNull()
  })
})
