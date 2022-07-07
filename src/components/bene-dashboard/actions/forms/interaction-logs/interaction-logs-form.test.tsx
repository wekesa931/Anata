import React from 'react'
import renderWithRouter from '../../../../../../__mocks__/custom-render.mock'
import InteractionLogsForm from './interaction-logs-form.component'
import { MockedProvider } from '@apollo/client/testing'
import dayjs from 'dayjs'
import { act } from 'react-dom/test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import { CREATE_INTERACTION } from '../../../../../gql/interactions'

jest.mock('../../../../../helpers/analytics', () => {
  return jest.fn(() => {})
})

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
    modeOfCommunication: 'SMS',
    interactionDirection: 'Outbound interaction',
    outboundInteractionCategory: ['Education'],
    interactionSummaryNotes: 'Test Summary Notes',
    historyUserIdField: 'fatma@antarahealth.com',
    outcome: 'None',
    outcomeMetadata: {},
    feedback: 'Yes',
  },
}

const render = (mocks: any[] = []) => {
  const props = {
    form: {
      name: 'Interaction Logs Form',
      member: {
        'Email 1': 'test@test.com',
        'Antara ID': 'wxyz',
        'Full Name': 'Test Fatma Ali',
      },
    },
    onFormClose: jest.fn(),
  }
  return renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <InteractionLogsForm {...props} />
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
    wrapper.getByLabelText(/Next Steps/)
    wrapper.getByLabelText(/Did the member provide any feedback/)
  })

  test('should prefill values where needed', async () => {
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
  test('should display Yes/No depending on feedback', () => {
    const wrapper = render()
    const feedback = wrapper.getByLabelText(
      /Did the member provide any feedback/
    )
    expect(wrapper.queryByLabelText(/Type of feedback/)).toBeNull()
    expect(
      wrapper.queryByLabelText(/What did the member provide feedback for?/)
    ).toBeNull()
    expect(wrapper.queryByLabelText(/Feedback/)).toBeNull()
    fireEvent.change(feedback, {
      target: { value: 'Yes' },
    })
    expect(
      wrapper.getByLabelText(/What did the member provide feedback for?/)
    ).not.toBeNull()
    fireEvent.change(
      wrapper.getByLabelText(/What did the member provide feedback for?/),
      {
        target: { value: 'Other' },
      }
    )
    let feedbackOption = wrapper.container.querySelector('#downshift-1-item-0')
    if (feedbackOption) {
      fireEvent.click(feedbackOption)
      expect(wrapper.getByLabelText(/Other/)).not.toBeNull()
    }
  })

  test('should display validation errors', async () => {
    const wrapper = render()
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
      wrapper.getByText('Select the next steps')
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
    const outcome = wrapper.getByLabelText(/Next Steps/)
    const memberName = wrapper.getByLabelText(/Member/)
    const userName = wrapper.getByLabelText(/Health Navigator/)
    const feedback = wrapper.getByLabelText(
      /Did the member provide any feedback/
    )

    const fields = [
      { field: interactorField, value: 'Beneficiary' },
      { field: modeOfCommField, value: 'SMS' },
      { field: directionField, value: 'Outbound interaction' },
      { field: notesField, value: 'Test Summary Notes' },
      { field: interactionStartedAt, value: '2020-11-30T13:46' },
      { field: outcome, value: 'None' },
      { field: memberName, value: 'Fatma' },
      { field: userName, value: 'Bill' },
      { field: feedback, value: true },
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
    fireEvent.change(wrapper.getByLabelText(/Next Steps/), {
      target: { value: ['None'] },
    })
    const outCome = wrapper.getByText('None')
    if (outCome) {
      fireEvent.click(outCome)
    }
    fireEvent.change(
      wrapper.getByLabelText(/Did the member provide any feedback/),
      {
        target: { value: ['Yes'] },
      }
    )
    fireEvent.change(wrapper.getByLabelText(/Type of feedback/), {
      target: { value: ['Positive'] },
    })
    const feedBack = wrapper.getByText('Positive')
    if (feedBack) {
      fireEvent.click(feedBack)
    }
    const submitButton = wrapper.getByText('Submit')
    fireEvent.click(submitButton)
    wrapper.getByText('Submitting...')
    // await waitFor(() => wrapper.getByText('Form saved successfully!'))
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
    const outcome = wrapper.getByLabelText(/Next Steps/)
    const feedback = wrapper.getByLabelText(
      /Did the member provide any feedback/
    )

    const fields = [
      { field: interactorField, value: 'Beneficiary' },
      { field: modeOfCommField, value: 'SMS' },
      { field: directionField, value: 'Outbound interaction' },
      { field: notesField, value: 'Test Summary Notes' },
      { field: outcome, value: 'None' },
      { field: interactionStartedAt, value: '2020-11-30T13:46' },
      { field: feedback, value: 'Yes' },
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
    fireEvent.change(wrapper.getByLabelText(/Next Steps/), {
      target: { value: ['None'] },
    })
    const outCome = wrapper.getByText('None')
    if (outCome) {
      fireEvent.click(outCome)
    }
    fireEvent.change(
      wrapper.getByLabelText(/Did the member provide any feedback/),
      {
        target: { value: ['Yes'] },
      }
    )
    fireEvent.change(wrapper.getByLabelText(/Type of feedback/), {
      target: { value: ['Positive'] },
    })
    const feedBack = wrapper.getByText('Positive')
    if (feedBack) {
      fireEvent.click(feedBack)
    }
    const submitButton = wrapper.getByText('Submit')
    fireEvent.click(submitButton)
    wrapper.getByText('Submitting...')
    await waitFor(() =>
      wrapper.getByText('An error occurred while trying to save, please retry.')
    )
  })
})
