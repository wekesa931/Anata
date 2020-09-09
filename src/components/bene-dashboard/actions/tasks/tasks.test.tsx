import React from 'react'
import Tasks from './tasks.component'
import renderWithRouter from '../../../../../__mocks__/custom-render'
import {
  screen,
  findByTestId,
  cleanup,
  findByText,
  fireEvent,
  getByTestId,
  findByLabelText,
  waitFor,
} from '@testing-library/react'
import tasks_mock_response from '../../../../../__mocks__/tasks.mock'
import airtableFetch from '../../../../resources/airtableFetch'
import { act } from 'react-dom/test-utils'

jest.mock('../../../../resources/airtableFetch')

airtableFetch.mockResolvedValue({})

describe('<Tasks />', () => {
  afterEach(cleanup)

  it('is rendered', async () => {
    await act(async () => {
      renderWithRouter(<Tasks />)
    })
    expect(screen.getByText('Tasks')).not.toBeNull()
  })

  test('displays empty message if there are no tasks', async () => {
    await act(async () => {
      renderWithRouter(<Tasks />)
    })
    expect(screen.getByText('No tasks found.')).not.toBeNull()
  })

  test('displays new tasks button and renders form on click', async () => {
    await act(async () => {
      renderWithRouter(<Tasks />)
    })
    const newTaskButton = await screen.getByRole('button')
    fireEvent.click(newTaskButton)
    const sampleForm = screen.getByLabelText('Nutritional Consultation Form')
    expect(sampleForm).not.toBeNull()
    expect(screen.getByLabelText('Appointment Form')).not.toBeNull()
    expect(screen.getByLabelText('Medication Prescription Form')).not.toBeNull()
    expect(screen.getByLabelText('Health Navigator Task Form')).not.toBeNull()
    expect(screen.getByLabelText('Interaction Log Form')).not.toBeNull()
    fireEvent.click(sampleForm)
    const modal = await screen.getByTestId('modal')
  })

  test('the first task is complete and displayed with all details', async () => {
    airtableFetch.mockReturnValue(Promise.resolve(tasks_mock_response))
    const { findByTestId } = renderWithRouter(<Tasks />)
    const list = await findByTestId('data-list')
    const firstItem = list.children[0]
    expect(await findByText(firstItem, /Complete/i)).not.toBeNull()
    expect(await findByText(firstItem, /Medium Priority/i)).not.toBeNull()
    expect(await findByText(firstItem, /21 Aug 2020/i)).not.toBeNull()
  })

  test('displays tasks properly in a list', async () => {
    airtableFetch.mockReturnValue(Promise.resolve(tasks_mock_response))
    const { findByTestId } = renderWithRouter(<Tasks />)
    const list = await findByTestId('data-list')
    const secondItem = list.children[1]
    expect(list.children.length).toBe(3)
    expect(await findByText(secondItem, /Not Started/i)).not.toBeNull()
    expect(await findByText(secondItem, /High Priority/i)).not.toBeNull()
    expect(await findByText(secondItem, /19 Aug 2020/i)).not.toBeNull()
    expect(
      await (await findByText(secondItem, /High Priority/i)).parentElement
        ?.className
    ).toBe('text-danger')
    expect(await findByText(secondItem, /Rx: Refill/i)).not.toBeNull()
  })

  test('displays task in detail inside a modal', async () => {
    airtableFetch.mockReturnValue(Promise.resolve(tasks_mock_response))
    const { container } = renderWithRouter(<Tasks />)
    const list = await screen.findByTestId('data-list')
    const thirdItem = list.children[2]
    await act(async () => {
      fireEvent.click(thirdItem)
    })
    const modal = await getByTestId(container, 'modal')
    expect(await waitFor(() => screen.getByText('Type'))).not.toBeNull()
    expect(await waitFor(() => screen.getByText('Due Date'))).not.toBeNull()
    expect(await waitFor(() => screen.getByText('Status'))).not.toBeNull()
    expect(await waitFor(() => screen.getByText('Task Notes'))).not.toBeNull()
    expect(
      await waitFor(() => screen.getByText('Assigned HN Name'))
    ).not.toBeNull()
  })
})
