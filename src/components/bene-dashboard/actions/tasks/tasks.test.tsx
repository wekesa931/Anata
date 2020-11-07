import React from 'react'
import Tasks from './tasks.component'
import renderWithRouter from '../../../../../__mocks__/custom-render'
import {
  screen,
  cleanup,
  findByText,
  fireEvent,
  getByTestId,
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
  })

  test('enables task edit inside modal', async () => {
    airtableFetch.mockReturnValue(Promise.resolve(tasks_mock_response))
    const { container } = renderWithRouter(<Tasks />)
    const list = await screen.findByTestId('data-list')
    const thirdItem = list.children[2]
    await act(async () => {
      fireEvent.click(thirdItem)
    })
    const modal = await getByTestId(container, 'modal')
    const editButton = screen.getByTestId('modal-edit-btn')
    expect(editButton).not.toBeNull()
    expect(screen.getByLabelText('Type')).toBeDisabled()
    expect(screen.getByLabelText('Due Date')).toBeDisabled()
    expect(screen.getByLabelText('Status')).toBeDisabled()
    expect(screen.getByLabelText('Task Notes')).toBeDisabled()
    await act(async () => {
      fireEvent.click(editButton)
    })
    expect(screen.getByLabelText('Type')).not.toBeDisabled()
    expect(screen.getByLabelText('Due Date')).not.toBeDisabled()
    expect(screen.getByLabelText('Status')).not.toBeDisabled()
    expect(screen.getByLabelText('Task Notes')).not.toBeDisabled()
    expect(screen.getByText('Save')).toBeVisible()
    expect(screen.getByText('Cancel')).toBeVisible()
    act(() => {
      fireEvent.click(screen.getByText('Save'))
    })
    expect(screen.getByText(/Saving/)).toBeVisible()
    await act(airtableFetch)
    expect(screen.queryByText('Save')).toBeNull()
    expect(screen.queryByTestId('list-modal-form-cancel-btn')).toBeNull()
    expect(screen.getByText(/saved/)).not.toBeNull()
  })

  test('the first task has button to open external url', async () => {
    airtableFetch.mockReturnValue(Promise.resolve(tasks_mock_response))
    window.open = jest.fn()
    renderWithRouter(<Tasks />)
    const openTaskUrlBtns = await screen.findAllByTestId('task-url-link')
    expect(openTaskUrlBtns[0]).toHaveAttribute(
      'href',
      'https://airtable.com/shrKQ5efAEh9z3618?prefill_Member=member_record_id&prefill_Health Navigator=assigned_hn'
    )
  })
})
