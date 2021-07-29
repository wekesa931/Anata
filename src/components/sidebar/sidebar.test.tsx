import React from 'react'
import Sidebar from './sidebar.component'
import renderWithRouter from '../../../__mocks__/custom-render.mock'
import {
  screen,
  fireEvent,
  act,
  cleanup,
  waitFor,
} from '@testing-library/react'

jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})

describe('<Sidebar />', () => {
  beforeEach(() => {
    renderWithRouter(<Sidebar />)
  })
  afterEach(cleanup)
  it('renders sidebar', () => {
    renderWithRouter(<Sidebar />)
  })

  it('displays sidebar links', async () => {
    const sidebarLinksContainer = await screen.getByTestId('sidebar-links')
    expect(sidebarLinksContainer.children.length).toBe(8)
    screen.getByText(/Members/)
  })

  it('should change colour to be grey and subchildren to be 0 ', async () => {
    const li = await waitFor(() => screen.getByText('Meetings'))
    expect(li.className).toBe('text-grey')
    expect(li.children.length).toEqual(0)
  })
  it('should add subitems on click ', () => {
    const li = screen.getByTestId('item-Tasks')
    fireEvent.click(li)
    expect(li.children.length).toEqual(3)
  })
})
