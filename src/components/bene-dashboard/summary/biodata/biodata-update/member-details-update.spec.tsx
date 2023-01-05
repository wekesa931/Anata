/**
 * Use cases
 * 1. When the form is opened, it shows a loader when the member details and lookup options are being fetched
 * and then display the form with all the control fields prefilled with member details
 *
 */
import React from 'react'
import {
  waitForElementToBeRemoved,
  waitFor,
  fireEvent,
} from '@testing-library/react'
import MemberDetailsFrom from './member-details-update.component'
import renderWithRouter from '../../../../../../__mocks__/custom-render.mock'
import * as formFields from './member-details.fields'

const mockSuccessCb = jest.fn()
const mockErrorCb = jest.fn()
const closeWindow = jest.fn()

function MockBiodataForm() {
  const [open, setOpen] = React.useState(true)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <MemberDetailsFrom
          closeWindow={closeWindow}
          successCb={mockSuccessCb}
          errorCb={mockErrorCb}
        />
      )}
    </>
  )
}

// mock out the error console
const { console } = global

beforeAll(() => {
  global.console = { ...global.console, error: jest.fn() }
})

afterAll(() => {
  global.console = console
})

describe('<MemberDetailsFrom />', () => {
  jest.setTimeout(30000)

  it('renders correctly e2e', async () => {
    const component = renderWithRouter(<MockBiodataForm />)
    fireEvent.click(component.getByText('Open'))
    await waitForElementToBeRemoved(
      () => component.getByText('Loading Member Data...'),
      { timeout: 30000 }
    )
    await waitFor(() =>
      expect(component.getAllByTestId('form-field').length).toBeGreaterThan(0)
    )
    const firstName = component.getByRole('textbox', { name: 'First Name' })
    expect(firstName).toHaveValue('Shad')

    // introduce validation errors
    fireEvent.change(firstName, { target: { value: '' } })
    fireEvent.click(component.getByText('Save'))

    // expect errorDb to be called the first time
    await waitFor(() => {
      expect(mockErrorCb).toBeCalled()
      expect(mockErrorCb).toBeCalledWith(
        'Please correct the errors before saving'
      )
    })

    // fix validation errors
    fireEvent.change(firstName, { target: { value: 'Test' } })
    expect(firstName).toHaveValue('Test')
    fireEvent.click(component.getByText('Save'))
    // simulate backend errors
    await waitFor(() => {
      expect(mockErrorCb).toBeCalled()
      expect(mockErrorCb).toBeCalledWith('Error saving member details.')
    })
    // simulate success
    // expect successDb to be called the second time
    fireEvent.click(component.getByText('Save'))
    await waitFor(() => {
      expect(mockSuccessCb).toBeCalledTimes(1)
      expect(mockSuccessCb).toBeCalledWith('Member details saved successfully')
      expect(closeWindow).toBeCalledTimes(1)
    })
  })
})

const insuranceFieldsMock = [
  {
    id: 'ins-group',
    type: 'group',
    label: 'Insurance',
    dataIndex: '',
    editable: true,
    stateKey: 'memberInsurance',
    addButtonText: 'Add Insurance',
    items: [
      {
        id: 'insurance',
        type: 'select',
        dataIndex: 'insuranceCompany',
        label: 'Insurance Company',
        options: [{ label: 'A', value: 'a' }],
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'ins-id',
        type: 'text',
        dataIndex: 'insuranceId',
        label: 'Insurance Id',
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'princ',
        type: 'text',
        dataIndex: 'principalMemberInsuranceId',
        label: 'Principal Member Insurance Id',
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'rel',
        type: 'autocomplete',
        dataIndex: 'relationshipToPrincipalMember',
        label: 'Relationship to Principal Member',
        options: ['R', 'S'],
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'cover',
        type: 'select',
        dataIndex: 'healthPolicy',
        label: 'Health Policy',
        options: [{ label: 'H', value: 'h' }],
        dynamic: true,
        stateKey: 'memberInsurance',
      },
      {
        id: 'ben',
        type: 'select',
        dataIndex: 'benefits',
        label: 'Benefits, riders e.t.c',
        options: [{ label: 'B', value: 'b' }],
        multiple: true,
        dynamic: true,
        stateKey: 'memberInsurance',
      },
    ],
  },
]

describe('<MemberDetailsForm /> insurance details update', () => {
  it('renders correctly e2e', async () => {
    jest.spyOn(formFields, 'getFormFields').mockImplementation(() => {
      return insuranceFieldsMock
    })
    const component = renderWithRouter(<MockBiodataForm />)
    fireEvent.click(component.getByText('Open'))
    await waitForElementToBeRemoved(
      () => component.getByText('Loading Member Data...'),
      { timeout: 30000 }
    )
    await waitFor(() =>
      expect(component.getAllByTestId('form-field').length).toBeGreaterThan(0)
    )

    fireEvent.change(component.getByRole('textbox', { name: 'Insurance Id' }), {
      target: { value: '' },
    })
    fireEvent.click(component.getByText('Save'))

    // expect errorCb to be called the first time
    await waitFor(() => {
      expect(mockErrorCb).toBeCalled()
      expect(mockErrorCb).toBeCalledWith(
        'Please correct the errors before saving'
      )
    })

    const companyInput = component.getByLabelText('Insurance Company')
    fireEvent.mouseDown(companyInput)
    fireEvent.click(component.getByText('A'))
    fireEvent.change(component.getByRole('textbox', { name: 'Insurance Id' }), {
      target: { value: '123' },
    })

    fireEvent.change(
      component.getByRole('textbox', { name: 'Principal Member Insurance Id' }),
      { target: { value: '123' } }
    )

    const relationshipInput = component.getByLabelText(
      'Relationship to Principal Member'
    )
    fireEvent.mouseDown(relationshipInput)
    fireEvent.click(component.getByText('R'))

    const policyInput = component.getByLabelText('Health Policy')
    fireEvent.mouseDown(policyInput)
    fireEvent.click(component.getByText('H'))

    const benefitInput = component.getByLabelText('Benefits, riders e.t.c')
    fireEvent.mouseDown(benefitInput)
    fireEvent.click(component.getByText('B'))

    fireEvent.click(component.getByText('Save'))
    // simulate backend errors
    await waitFor(() => {
      expect(mockSuccessCb).toBeCalledTimes(1)
      expect(mockSuccessCb).toBeCalledWith('Member details saved successfully')
      expect(closeWindow).toBeCalledTimes(1)
    })
  })
})
