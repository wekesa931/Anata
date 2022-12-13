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

describe('<MemberDetailsFrom />', () => {
  jest.setTimeout(30000)

  it('renders correctly e2e', async () => {
    const { console } = global
    global.console = { ...global.console, error: jest.fn() }
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

    global.console = console
  })
})
