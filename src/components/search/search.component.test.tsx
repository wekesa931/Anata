import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import airtableFetch from '../../resources/airtableFetch'
import '@testing-library/jest-dom/extend-expect'
import SearchComponent from './search.component'

jest.mock('../../resources/airtableFetch', () => {
    return jest.fn().mockImplementation(() => {
        return Promise.resolve(null)
    });
})

describe('<SearchComponent/>', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('Should render search component and display the search input', () => {
        const { getByRole }  = render(<SearchComponent />);
        expect(getByRole('searchbox')).toBeVisible()
    })

    test('Should not render clear button', () => {
        const { queryByTestId}  = render(<SearchComponent />);
        expect(queryByTestId('search-input-clear')).toBeNull();
    })

    test('Should perform search and allow users to clear input', async () => {
        const { queryByTestId, getByRole, getByText}  = render(<SearchComponent />);
        const searchInput = getByRole('searchbox');

        fireEvent.change(searchInput, { target: { value: 'Julius' } });
        await act (airtableFetch)
        expect(airtableFetch).toHaveBeenCalled();
        expect(queryByTestId('search-input-clear')).toBeTruthy();
        expect(getByText('Make sure the word is spelled correctly.')).toBeVisible();
    })


})
