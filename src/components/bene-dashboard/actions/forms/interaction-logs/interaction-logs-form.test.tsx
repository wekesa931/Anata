import React from 'react'
import renderWithRouter from '../../../../../../__mocks__/custom-render.mock'
import InteractionLogsForm from './interaction-logs-form.component'
import { MockedProvider } from '@apollo/client/testing'
import dayjs from 'dayjs'
import airtableFetch from '../../../../../resources/airtable-fetch'
import { act } from 'react-dom/test-utils'
import team from '../../../../../../__mocks__/team.mock'
import { fireEvent, waitFor } from '@testing-library/react'
import { CREATE_INTERACTION } from '../../../../../gql/interactions'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search:
      'data=%7B"member"%3A%7B"Full%20Name"%3A"Test%20Fatma%20Ali"%2C"Antara%20ID"%3A"TRIAL-ID16"%7D%2C"user"%3A%7B"email"%3A"fatma%40antarahealth.com"%7D%7D',
  }),
}))

jest.mock('../../../../../resources/airtable-fetch', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({})
  })
})

const mutation_variables = {
  input: {
    member: 'TRIAL-ID16',
    interactionStartedAt: '2020-11-30T13:46:00.000Z',
    healthNavigator: 'fatma',
    interactorType: 'Beneficiary',
    interactorName: undefined,
    relationshipType: undefined,
    modeOfCommunication: 'SMS',
    interactionDirection: 'Outbound interaction',
    inboundInteractionCategory: undefined,
    otherCategoryInbound: undefined,
    outboundInteractionCategory: ['Education'],
    otherCategoryOutbound: undefined,
    interactionSummaryNotes: 'Test Summary Notes',
    flagForReview: 'Yes',
    historyUserIdField: 'fatma@antarahealth.com',
  },
}

const render = (mocks: any[] = []) => {
  return renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <InteractionLogsForm />
    </MockedProvider>
  )
}
describe('<InteractionLogsForm/>', () => {
  test('should render', () => {
    render()
  })

  test('should display all required fields on load', () => {
    const wrapper = render()
    wrapper.getByLabelText(/Member/)
    wrapper.getByLabelText(/Health Navigator/)
    wrapper.getByLabelText(/Encounter Date/)
    wrapper.getByLabelText(/Interactor Type/)
    wrapper.getByLabelText(/Mode of Communication/)
    wrapper.getByLabelText(/Interaction Direction/)
    wrapper.getByLabelText(/Interactor Summary Notes/)
    wrapper.getByLabelText(/Flag for Review/)
  })

  test('should prefill values where needed', async () => {
    ;(airtableFetch as jest.Mock).mockResolvedValue(team)
    const wrapper = render()
    const memberField = wrapper.getByLabelText(/Member/)
    const dateField = wrapper.getByLabelText(/Encounter Date/)
    const hnField = wrapper.getByLabelText(/Health Navigator/)
    expect(memberField).toBeDisabled()
    expect(memberField).toHaveAttribute('value', 'Test Fatma Ali')
    expect(dateField).toHaveAttribute(
      'value',
      dayjs().format('YYYY-MM-DDTHH:mm')
    )
    expect(hnField).toHaveAttribute('value', 'Loading...')
    await act(airtableFetch)
    expect(hnField).toHaveAttribute('value', 'Super Man')
  })

  test('should display interactor name if interactor type is Employer', () => {
    const wrapper = render()
    const interactorTypeField = wrapper.getByLabelText(/Interactor Type/)
    fireEvent.change(interactorTypeField, { target: { value: 'Employer' } })
    expect(wrapper.findByLabelText(/Interactor Name/)).not.toBeNull()
  })

  test('should display interactor name if interactor type is Payor', () => {
    const wrapper = render()
    const interactorTypeField = wrapper.getByLabelText(/Interactor Type/)
    fireEvent.change(interactorTypeField, { target: { value: 'Payor' } })
    expect(wrapper.findByLabelText(/Interactor Name/)).not.toBeNull()
  })

  test('should display interactor name and relationship type if interactor type is Relative', () => {
    const wrapper = render()
    const interactorTypeField = wrapper.getByLabelText(/Interactor Type/)
    fireEvent.change(interactorTypeField, { target: { value: 'Relative' } })
    expect(wrapper.findByLabelText(/Interactor Name/)).not.toBeNull()
    expect(wrapper.findByLabelText(/Relationship Type/)).not.toBeNull()
  })

  test('should display interactor name if interactor type is Care Giver', () => {
    const wrapper = render()
    const interactorTypeField = wrapper.getByLabelText(/Interactor Type/)
    fireEvent.change(interactorTypeField, { target: { value: 'Caregiver' } })
    expect(wrapper.findByLabelText(/Interactor Name/)).not.toBeNull()
  })

  test('should display interactor name if interactor type is Other', () => {
    const wrapper = render()
    const interactorTypeField = wrapper.getByLabelText(/Interactor Type/)
    fireEvent.change(interactorTypeField, { target: { value: 'Other' } })
    expect(wrapper.findByLabelText(/Interactor Name/)).not.toBeNull()
  })

  test('should display outbound/inbound category depending on interaction direction ', () => {
    const wrapper = render()
    const interactorDiection = wrapper.getByLabelText(/Interaction Direction/)
    expect(wrapper.queryByLabelText(/Inbound Interaction Category/)).toBeNull()
    expect(wrapper.queryByLabelText(/Outbound Interaction Category/)).toBeNull()
    fireEvent.change(interactorDiection, {
      target: { value: 'Inbound interaction' },
    })
    expect(
      wrapper.getByLabelText(/Inbound Interaction Category/)
    ).not.toBeNull()
    fireEvent.change(wrapper.getByLabelText(/Inbound Interaction Category/), {
      target: { value: 'Other' },
    })
    let comboBoxOption = wrapper.container.querySelector('#downshift-1-item-0')
    if (comboBoxOption) {
      fireEvent.click(comboBoxOption)
      expect(wrapper.getByLabelText(/Other Category/)).not.toBeNull()
    }
    fireEvent.change(interactorDiection, {
      target: { value: 'Outbound interaction' },
    })
    expect(
      wrapper.findByLabelText(/Outbound Interaction Category/)
    ).not.toBeNull()
    fireEvent.change(wrapper.getByLabelText(/Outbound Interaction Category/), {
      target: { value: 'Other' },
    })
    comboBoxOption = wrapper.container.querySelector('#downshift-1-item-0')
    if (comboBoxOption) {
      fireEvent.click(comboBoxOption)
      expect(wrapper.getByLabelText(/Other Category (Outbound)/)).not.toBeNull()
    }
  })

  test('should display validation errors', async () => {
    ;(airtableFetch as jest.Mock).mockResolvedValue(team)
    const wrapper = render()
    await act(airtableFetch)
    const submitButton = wrapper.getByText('Submit')
    const interactionStartDate = wrapper.getByLabelText(/Encounter Date/)
    fireEvent.change(interactionStartDate, {
      target: { value: dayjs().add(1, 'd').format('YYYY-MM-DDTHH:mm') },
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      wrapper.getByText('Type is required')
      wrapper.getByText('Mode of communication is required')
      wrapper.getByText('Interaction type is required')
      wrapper.getByText('Summary notes is required')
      wrapper.getByText('Flag for review is required')
      wrapper.getByText('Interaction date should not be a future date')
    })
  })

  test('it should display success message after successful submit', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_INTERACTION,
          variables: mutation_variables,
        },
        result: {
          data: { createInteraction: { status: 200, message: 'Success' } },
        },
      },
    ]
    const wrapper = render(mocks)
    const interactionStartedAt = wrapper.getByLabelText(/Encounter Date/)
    const interactorField = wrapper.getByLabelText(/Interactor Type/)
    const modeOfCommField = wrapper.getByLabelText(/Mode of Communication/)
    const directionField = wrapper.getByLabelText(/Interaction Direction/)
    const notesField = wrapper.getByLabelText(/Interactor Summary Notes/)
    const flagField = wrapper.getByLabelText(/Flag for Review/)
    const fields = [
      { field: interactorField, value: 'Beneficiary' },
      { field: modeOfCommField, value: 'SMS' },
      { field: directionField, value: 'Outbound interaction' },
      { field: notesField, value: 'Test Summary Notes' },
      { field: flagField, value: 'Yes' },
      { field: interactionStartedAt, value: '2020-11-30T13:46' },
    ]
    fields.forEach(({ field, value }) => {
      act(() => {
        fireEvent.change(field, { target: { value } })
      })
    })
    fireEvent.change(wrapper.getByLabelText(/Outbound Interaction Category/), {
      target: { value: ['Education'] },
    })
    const comboBox = wrapper.getByText('Education')
    if (comboBox) {
      fireEvent.click(comboBox)
    }
    const submitButton = wrapper.getByText('Submit')
    fireEvent.click(submitButton)
    wrapper.getByText('Submitting...')
    await waitFor(() => wrapper.getByText('Form saved successfully!'))
  })

  test('it should display error message on error!', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_INTERACTION,
          variables: mutation_variables,
        },
        error: new Error('Aw Shucks!'),
      },
    ]
    const wrapper = render(mocks)
    const interactionStartedAt = wrapper.getByLabelText(/Encounter Date/)
    const interactorField = wrapper.getByLabelText(/Interactor Type/)
    const modeOfCommField = wrapper.getByLabelText(/Mode of Communication/)
    const directionField = wrapper.getByLabelText(/Interaction Direction/)
    const notesField = wrapper.getByLabelText(/Interactor Summary Notes/)
    const flagField = wrapper.getByLabelText(/Flag for Review/)
    const fields = [
      { field: interactorField, value: 'Beneficiary' },
      { field: modeOfCommField, value: 'SMS' },
      { field: directionField, value: 'Outbound interaction' },
      { field: notesField, value: 'Test Summary Notes' },
      { field: flagField, value: 'Yes' },
      { field: interactionStartedAt, value: '2020-11-30T13:46' },
    ]
    fields.forEach(({ field, value }) => {
      act(() => {
        fireEvent.change(field, { target: { value } })
      })
    })
    fireEvent.change(wrapper.getByLabelText(/Outbound Interaction Category/), {
      target: { value: ['Education'] },
    })
    const comboBox = wrapper.getByText('Education')
    if (comboBox) {
      fireEvent.click(comboBox)
    }
    const submitButton = wrapper.getByText('Submit')
    fireEvent.click(submitButton)
    wrapper.getByText('Submitting...')
    await waitFor(() =>
      wrapper.getByText('An error occurred while trying to save, please retry.')
    )
  })
})
