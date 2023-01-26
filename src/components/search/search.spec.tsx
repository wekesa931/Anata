/**
 * Use cases for search component
 * 1. When the page loads, the search bar should be empty and disabled with a loading message 'Loading...'
 * 2. When the user types in the search bar, the search results should appear below the search bar
 * 3. When the user clicks on a search result, the user should be navigated to the member's page
 */
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import renderWithRouter from '../../../__mocks__/custom-render.mock'
import SearchInput from './search.component'
import * as airtableContext from '../../context/airtable-context'

jest.mock('../../helpers/analytics', () => {
  return jest.fn()
})

jest.mock('../../resources/airtable-fetch', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve(null)
  })
})

const mockNavigate = jest.fn()
const mockAirtableMeta = {
  members: {
    name: 'Members',
  },
}

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}))

beforeEach(() => {
  jest.spyOn(airtableContext, 'useAirtableMeta').mockImplementation(() => {
    return {
      airtableMeta: mockAirtableMeta,
      loading: false,
    }
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('<SearchComponent/>', () => {
  test('Should render search component and display the search input', () => {
    const { getByRole } = renderWithRouter(<SearchInput />)
    expect(getByRole('searchbox')).toBeVisible()
  })

  test('Should search and render list of results', async () => {
    const component = renderWithRouter(<SearchInput />)
    const searchInput = component.getByRole('searchbox')
    fireEvent.change(searchInput, { target: { value: 'John' } })
    await waitFor(() => {
      expect(
        component.getByText('John Doe (AAA-001) - 33 yrs [M] - Employer')
      ).toBeInTheDocument()
      const searchResults = component.getByTestId('bene-list')
      expect(searchResults).toBeInTheDocument()
      expect(searchResults.children.length).toBe(1)
    })

    const searchResult = component.getByTestId('bene-list')
    fireEvent.click(searchResult.children[0])
    expect(mockNavigate).toHaveBeenCalledWith('/member/rec123456789')
  })
})
