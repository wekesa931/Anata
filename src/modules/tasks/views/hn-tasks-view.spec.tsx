import '@testing-library/jest-dom'
import React from 'react'
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import type { User } from 'src/types/user'
import userEvent from '@testing-library/user-event'
import HnTasksView from './hn-tasks-view'
import { Filters, UserTask, Priority } from '../types'

jest.mock('src/modules/analytics', () => ({
  useModuleAnalytics: () => ({
    trackTasksFiltered: jest.fn(),
    trackTableGrouped: jest.fn(),
    trackTableGroupAllExpandToggled: jest.fn(),
    trackTableRowExpandToggled: jest.fn(),
  }),
}))

// mock the src/modules/tasks/hooks/user-tasks.data module to return a mock
const mockAllTasks = jest.fn(() => [] as UserTask[])
const mockFilterTasks = jest.fn(() => [] as UserTask[])
jest.mock('src/modules/tasks/hooks/user-tasks.data', () => ({
  useUserTasksData: () => ({
    getAllTasks: mockAllTasks,
    filterTasks: mockFilterTasks,
  }),
}))

const mockUser = { name: 'Test user', fullName: 'Test user', email: '' } as User
const setupMocksWithTasks = async () => {
  userEvent.setup()

  mockAllTasks.mockImplementationOnce(() => [
    {
      due_date: '2021-10-10',
      priority: Priority.P0,
      status: 'In Progress',
      notes: 'Test task 1 notes',
      member: 'Test user',
      recordid: '1',
      status_last_modified_at: '2021-10-10',
      type: 'Overdue1',
      antaraId: '123',
    },
    {
      due_date: '2021-10-10',
      priority: Priority.P1,
      status: 'Complete',
      notes: 'Test task 2',
      member: 'Test user',
      recordid: '2',
      status_last_modified_at: '2021-10-10',
      type: 'Overdue2',
      antaraId: '123',
    },
  ])

  mockFilterTasks.mockImplementationOnce(() => [
    {
      due_date: '2021-10-10',
      priority: Priority.P0,
      status: 'In Progress',
      notes: 'Test task 3',
      member: 'Test user',
      recordid: '3',
      status_last_modified_at: '2021-10-10',
      type: 'TypeA',
      antaraId: '123',
    },
    {
      due_date: '2021-10-10',
      priority: Priority.P0,
      status: 'In Progress',
      notes: 'Test task 1 notes',
      member: 'Test user',
      recordid: '1',
      status_last_modified_at: '2021-10-10',
      type: 'Overdue1',
      antaraId: '123',
    },
    {
      due_date: '2021-10-10',
      priority: Priority.P1,
      status: 'Complete',
      notes: 'Test task 2',
      member: 'Test user',
      recordid: '2',
      status_last_modified_at: '2021-10-10',
      type: 'Overdue2',
      antaraId: '123',
    },
  ])

  const screen = render(<HnTasksView user={mockUser} />)

  await waitForElementToBeRemoved(() => screen.getByText(/loading tasks/i))

  return screen
}

const setupMockWithDueTasks = async () => {
  userEvent.setup()

  mockFilterTasks.mockImplementationOnce(() => [
    {
      due_date: '2021-10-10',
      priority: Priority.P0,
      status: 'In Progress',
      notes: 'Test task 3',
      member: 'Test user',
      recordid: '3',
      status_last_modified_at: '2021-10-10',
      type: 'TypeA',
      antaraId: '123',
    },
  ])
  const screen = render(<HnTasksView user={mockUser} />)
  await waitForElementToBeRemoved(() => screen.getByText(/loading tasks/i))

  return screen
}

describe('Home page tasks view suite', () => {
  it('renders the tasks page', async () => {
    const { findByText, getByText } = render(<HnTasksView user={mockUser} />)
    await waitFor(() => {
      expect(mockAllTasks).toBeCalled()
      expect(getByText(/loading tasks/i)).toBeInTheDocument()
    })
    expect(await findByText(/test user/i)).toBeInTheDocument()
  })

  it('Can display total number of due tasks today and high priority tasks today', async () => {
    const { getByText, getByTestId } = await setupMocksWithTasks()
    expect(getByTestId(/dueTasks/i)).toHaveTextContent('2')
    expect(getByTestId(/^highPriorityTasks/i)).toHaveTextContent('1')
    // expect 50% our of 2 to be completed for overdue tasks
    expect(getByText(/1 out of 2 completed/i)).toBeInTheDocument()
  })

  it('should render both due and todays tasks', async () => {
    const { getByTestId } = await setupMocksWithTasks()
    expect(getByTestId(/overdue tasks table/i)).toBeInTheDocument()
    expect(getByTestId(/today's tasks table/i)).toBeInTheDocument()
  })

  it('should expand all rows by default ', async () => {
    const { getAllByTestId, getAllByText } = await setupMocksWithTasks()
    expect(getAllByTestId(/grouped-row/i)).toHaveLength(3)
    expect(getAllByText(/collapse all/i)).toHaveLength(2)
  })

  it('should collapse all rows when collapse all is clicked', async () => {
    // hide the overdue tasks for this
    const screen = await setupMockWithDueTasks()
    expect(screen.getAllByTestId(/grouped-row/i)).toHaveLength(1)
    // click collapse all
    act(() => {
      screen.getByText(/collapse all/i).click()
    })
    expect(screen.queryByTestId(/grouped-row/i)).not.toBeInTheDocument()
  })

  it('should expand all rows when expand all is clicked', async () => {
    const { getAllByTestId, getByText } = await setupMockWithDueTasks()
    act(() => {
      getByText(/collapse all/i).click()
    })

    // click collapse all
    act(() => {
      getByText(/expand all/i).click()
    })

    expect(getAllByTestId(/grouped-row/i)).toHaveLength(1)
  })

  it('should group tasks by type by default', async () => {
    const { getByTestId } = await setupMocksWithTasks()
    expect(getByTestId(/group-row-title-overdue1/i)).toBeInTheDocument()
    expect(getByTestId(/group-row-title-overdue2/i)).toBeInTheDocument()
    expect(getByTestId(/group-row-title-typea/i)).toBeInTheDocument()
  })

  it('can fire the filter tasks function', async () => {
    const { getByLabelText } = await setupMockWithDueTasks()
    // default filtered for today, so we expect this to be called with todays first
    const filterInput = getByLabelText(/filter/i)
    userEvent.selectOptions(filterInput, Filters.THIS_WEEK)

    expect(mockFilterTasks).toBeCalledWith(Filters.THIS_WEEK)
  })
})
