import React from 'react'
import { render, fireEvent, act, screen, waitFor } from '@testing-library/react'
import airtableFetch from '../../resources/airtable-fetch'
import '@testing-library/jest-dom/extend-expect'
import SearchComponent from './search.component'
import mockPatientSearchResponse from '../../../__mocks__/patient-list.mock'
import renderWithRouter from '../../../__mocks__/custom-render.mock'

jest.mock('../../resources/airtable-fetch', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve(null)
  })
})

jest.mock('../../helpers/analytics', () => {
  return jest.fn(() => {})
})
const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  // @ts-ignore
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('<SearchComponent/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should render search component and display the search input', () => {
    const { getByRole } = render(<SearchComponent />)
    expect(getByRole('searchbox')).toBeVisible()
  })
  test('Should not render clear button', () => {
    const { queryByTestId } = render(<SearchComponent />)
    expect(queryByTestId('search-input-clear')).toBeNull()
  })
  test('Should perform search and allow users to clear input', async () => {
    const { queryByTestId, getByRole, getByText, getByTestId } = render(
      <SearchComponent />
    )
    const searchInput = getByRole('searchbox')
    expect(queryByTestId('search-input-clear')).toBeNull()
    fireEvent.change(searchInput, { target: { value: 'Julius' } })
    await act(airtableFetch)
    expect(airtableFetch).toHaveBeenCalled()
    const clearButton = getByTestId('search-input-clear')
    expect(clearButton).not.toBeNull()
    expect(getByText('Make sure the word is spelled correctly.')).toBeVisible()
    fireEvent.click(clearButton)
    expect(searchInput.textContent).toBe('')
  })
  test('Should display results in a list and load new member on click', async () => {
    ;(airtableFetch as jest.Mock).mockResolvedValue(mockPatientSearchResponse)
    await act(async () => {
      renderWithRouter(<SearchComponent />)
    })
    const searchInput = screen.getByRole('searchbox')
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Julius' } })
    })
    await waitFor(() => {
      const searchResults = screen.getByTestId('bene-list')
      expect(searchResults.children.length).toBe(3)
      expect(screen.getByText(/Julius Test Kabangi/)).not.toBeNull()
      expect(screen.getAllByText(/Male/)).not.toBeNull()
      expect(screen.getByText(/20Yrs/)).not.toBeNull()
    })
    const searchResults = screen.getByTestId('bene-list')
    const firstResult = searchResults.children[0]
    act(() => {
      fireEvent.click(firstResult)
    })
    expect(airtableFetch).toBeCalledTimes(3)
    await act(airtableFetch)
    await waitFor(() => {
      expect(screen.queryByTestId('bene-list')).toBeNull()
      expect(mockHistoryPush).toBeCalledTimes(1)
      expect(mockHistoryPush).toBeCalledWith('/member/recg5oaKZwLqPrAvs')
    })
  })
})
