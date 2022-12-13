import React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import PortalWindow from './portal.component'
import renderWithRouter from '../../../../__mocks__/custom-render.mock'

function MockFormPortalWindow(props: any) {
  const [isEdited, setIsEdited] = React.useState(false)

  return (
    <PortalWindow
      title="Test Portal"
      isEdited={isEdited}
      setIsEdited={setIsEdited}
      {...props}
    >
      <button onClick={() => setIsEdited(true)}>Edit</button>
    </PortalWindow>
  )
}

describe('<PortalWindow />', () => {
  afterEach(cleanup)
  it('should render the portal window', () => {
    const closeWindow = jest.fn()
    const setIsEdited = jest.fn()

    const component = renderWithRouter(
      <PortalWindow
        title="Test Portal"
        width={50}
        index={1}
        closeWindow={closeWindow}
        isEdited={false}
        setIsEdited={setIsEdited}
      >
        <div>Portal children</div>
      </PortalWindow>
    )
    expect(component.getByText('Test Portal')).toBeInTheDocument()
    expect(component.getByText('Portal children')).toBeInTheDocument()
  })

  it('should render the portal window with proper control buttons', () => {
    const closeWindow = jest.fn()
    const setIsEdited = jest.fn()
    const component = renderWithRouter(
      <PortalWindow
        title="Test Portal"
        width={50}
        index={1}
        closeWindow={closeWindow}
        isEdited={false}
        setIsEdited={setIsEdited}
      >
        <div>Portal children</div>
      </PortalWindow>
    )
    const maximizeButton = component.getByLabelText('Maximize')
    expect(maximizeButton).toBeInTheDocument()
    fireEvent.click(maximizeButton)
    expect(component.getByLabelText('Minimize')).toBeInTheDocument()
    expect(component.queryByLabelText('Maximize')).not.toBeInTheDocument()

    const minimizeButton = component.getByLabelText('Minimize')
    fireEvent.click(minimizeButton)
    expect(component.getByLabelText('Maximize')).toBeInTheDocument()
    expect(component.queryByLabelText('Minimize')).not.toBeInTheDocument()

    const collapseButton = component.getByLabelText('Collapse')
    fireEvent.click(collapseButton)
    expect(component.getByLabelText('Expand')).toBeInTheDocument()
    expect(component.queryByLabelText('Collapse')).not.toBeInTheDocument()
    expect(component.queryByLabelText('Maximize')).not.toBeInTheDocument()
    expect(component.queryByLabelText('Minimize')).not.toBeInTheDocument()

    const closeButton = component.getByLabelText('Close')
    fireEvent.click(closeButton)
    expect(
      component.queryByText('Are you sure you want to leave Test Portal?')
    ).not.toBeInTheDocument()
  })

  it('should render the dialog isEdited is true', () => {
    const closeWindow = jest.fn()
    const component = renderWithRouter(
      <MockFormPortalWindow
        title="Test Portal"
        width={50}
        index={1}
        closeWindow={closeWindow}
      />
    )

    const editButton = component.getByText('Edit')
    fireEvent.click(editButton)

    const closeButton = component.getByLabelText('Close')
    fireEvent.click(closeButton)
    expect(
      component.getByText('Are you sure you want to leave Test Portal?')
    ).toBeInTheDocument()
    expect(component.getByText('Stay')).toBeInTheDocument()
    expect(component.getByText('Leave')).toBeInTheDocument()

    fireEvent.click(component.getByText('Stay'))
    expect(closeWindow).not.toHaveBeenCalled()
    expect(component.queryByText('Edit')).toBeInTheDocument()

    fireEvent.click(closeButton)
    fireEvent.click(component.getByText('Leave'))
    expect(closeWindow).toHaveBeenCalledTimes(1)
  })

  it('should render the dialog with windowActions', () => {
    const closeWindow = jest.fn()
    const setIsEdited = jest.fn()
    const component = renderWithRouter(
      <PortalWindow
        title="Test Portal"
        width={50}
        index={1}
        closeWindow={closeWindow}
        isEdited
        setIsEdited={setIsEdited}
        windowActions={[
          <button key="1">Action 1</button>,
          <button key="2">Action 2</button>,
        ]}
      >
        <div>Portal children</div>
      </PortalWindow>
    )

    expect(component.getByText('Action 1')).toBeInTheDocument()
    expect(component.getByText('Action 2')).toBeInTheDocument()
  })
})
