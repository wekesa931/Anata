import React from 'react'
import { screen, cleanup, act } from '@testing-library/react'
import InteractionLogs from './interaction-logs.component'
import renderWithRouter from '../../../../../__mocks__/custom-render'
import mockInteractions from '../../../../../__mocks__/interactions-mock'
import airtableFetch from '../../../../resources/airtableFetch'

jest.mock('../../../../resources/airtableFetch')

describe('<InteractionLogs />', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders', async () => {
    airtableFetch.mockResolvedValue({})
    renderWithRouter(<InteractionLogs />)
    expect(screen.getByText(/Loading/)).not.toBeNull()
    await act(airtableFetch)
  })

  it('displays list of interaction logs', async () => {
    airtableFetch.mockReturnValue(Promise.resolve(mockInteractions))
    renderWithRouter(<InteractionLogs />)
    await act(airtableFetch)
    const list = screen.getByTestId('data-list')
    expect(list.children.length).toBe(2)
    expect(screen.getByText(/Julius is faring well/)).not.toBeNull()
    expect(screen.getByText("17 Sep '20, 16:13 PM")).not.toBeNull()
    expect(screen.getByText('Super Man'))
  })
})
