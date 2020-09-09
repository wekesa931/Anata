import React from 'react'
import Sidebar from './sidebar.component'
import renderWithRouter from '../../../__mocks__/custom-render'
import { screen, fireEvent } from '@testing-library/react'

describe('<Sidebar />', () => {
  it('renders sidebar', () => {
    renderWithRouter(<Sidebar />)
  })

  it('displays sidebar links', () => {
    renderWithRouter(<Sidebar />)
    const sidebarLinksContainer = screen.getByTestId('sidebar-links')
    expect(sidebarLinksContainer.children.length).toBe(1)
    screen.getByText(/Beneficiary Dashboard/)
  })
})
