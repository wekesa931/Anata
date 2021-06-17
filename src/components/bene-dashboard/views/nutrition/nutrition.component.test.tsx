import React from 'react'
import { act } from 'react-dom/test-utils'
import renderWithRouter from '../../../../../__mocks__/custom-render.mock'
import nutritionalConsultationsMock from '../../../../../__mocks__/nutritional-consultations.mock'
import airtableFetch from '../../../../resources/airtable-fetch'
import Nutrition from './nutrition.component'

jest.mock('../../../../resources/airtable-fetch', () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve(null)
  })
})

jest.mock('../../../../helpers/analytics', () => {
  return jest.fn(() => {})
})

describe('<InteractionLogsView/>', () => {
  test('should render', () => {
    renderWithRouter(<Nutrition />)
  })
  test('should display loading', () => {
    const wrapper = renderWithRouter(<Nutrition />)
    expect(
      wrapper.getByText('Loading Nutritional Consultations')
    ).not.toBeNull()
  })
  test('should display list nutritional consultations correctly', async () => {
    airtableFetch.mockResolvedValue(nutritionalConsultationsMock)
    const { getByTestId, queryByText } = renderWithRouter(<Nutrition />)
    await act(airtableFetch)
    const table = getByTestId('data-table')
    const tableBody = table.children[1]
    const firstRow = tableBody.children[0]

    expect(queryByText('BMR')).not.toBeNull()
    expect(queryByText('Caloric Intake')).not.toBeNull()
    expect(queryByText('Caloric Needs')).not.toBeNull()
    expect(queryByText('Glycemic load')).not.toBeNull()
    expect(queryByText('Sodium Intake')).not.toBeNull()
    expect(queryByText('Potassium Intake')).not.toBeNull()
    expect(queryByText('Chol. Intake')).not.toBeNull()
    expect(queryByText('Recommendation')).not.toBeNull()

    expect(firstRow.children[1].textContent).toBe('2')
    expect(firstRow.children[2].textContent).toBe("07 Aug '20")
    expect(firstRow.children[3].textContent).toBe('1769')
    expect(firstRow.children[4].textContent).toBe('2200')
    expect(firstRow.children[5].textContent).toBe('2000')
    expect(firstRow.children[6].textContent).toBe('96')
    expect(firstRow.children[7].textContent).toBe('2329.71')
    expect(firstRow.children[8].textContent).toBe('2690.29')
    expect(firstRow.children[9].textContent).toBe('67')
    expect(firstRow.children[10].textContent).toContain(
      'Dietary milestones: <1500 mg sodium/day, maintain a 2000 kcal diet and increase her activity levels.'
    )
  })
})
