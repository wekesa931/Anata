import {
  priorityComparator,
  sortByPriorityAndKey,
  sortGroupedDataByColumn,
} from 'src/modules/tasks/utils'
import { getComparator, Order } from 'src/utils/sort/stable'
import { Priority } from '../types'

describe('Priority comparator', () => {
  it('should return -1 if a is higher priority than b', () => {
    expect(priorityComparator(Priority.P0, Priority.P1)).toBeLessThan(0)
    expect(priorityComparator(Priority.P1, Priority.P2)).toBeLessThan(0)
    expect(priorityComparator(Priority.P0, Priority.P2)).toBeLessThan(0)
  })

  it('should return 1 if a is lower priority than b', () => {
    expect(priorityComparator(Priority.P2, Priority.P1)).toBeGreaterThan(0)
    expect(priorityComparator(Priority.P1, Priority.P0)).toBeGreaterThan(0)
    expect(priorityComparator(Priority.P2, Priority.P0)).toBeGreaterThan(0)
  })

  it('should return 0 if a and b are the same priority', () => {
    expect(priorityComparator(Priority.P0, Priority.P0)).toEqual(0)
    expect(priorityComparator(Priority.P1, Priority.P1)).toEqual(0)
    expect(priorityComparator(Priority.P2, Priority.P2)).toEqual(0)
  })
})

describe('Sort by priority and key', () => {
  it('should sort by priority first', () => {
    const data = [
      { priority: Priority.P0, key: 1 },
      { priority: Priority.P1, key: 2 },
      { priority: Priority.P2, key: 3 },
      { priority: Priority.P3, key: 4 },
    ]

    const sorted = sortByPriorityAndKey(data, () => 0)

    expect(sorted).toEqual([
      { priority: Priority.P0, key: 1 },
      { priority: Priority.P1, key: 2 },
      { priority: Priority.P2, key: 3 },
      { priority: Priority.P3, key: 4 },
    ])
  })

  it('should sort by secondary comparator if priorities are the same', () => {
    const data = [
      { priority: Priority.P0, key: 1 },
      { priority: Priority.P1, key: 2 },
      { priority: Priority.P2, key: 3 },
      { priority: Priority.P3, key: 4 },
      { priority: Priority.P0, key: 5 },
      { priority: Priority.P1, key: 6 },
      { priority: Priority.P2, key: 7 },
      { priority: Priority.P3, key: 8 },
    ]

    const sorted = sortByPriorityAndKey(data, (a, b) => a.key - b.key)

    expect(sorted).toEqual([
      { priority: Priority.P0, key: 1 },
      { priority: Priority.P0, key: 5 },
      { priority: Priority.P1, key: 2 },
      { priority: Priority.P1, key: 6 },
      { priority: Priority.P2, key: 3 },
      { priority: Priority.P2, key: 7 },
      { priority: Priority.P3, key: 4 },
      { priority: Priority.P3, key: 8 },
    ])
  })

  it('can use getComparator with date types in ascending order', () => {
    const order: Order = 'asc'
    const orderBy = 'date'
    const type = 'date'
    const comparator = getComparator(order, orderBy, type)

    const data = [
      { date: '2021-01-01', priority: Priority.P0, key: 1 },
      { date: '2021-01-02', priority: Priority.P1, key: 2 },
      { date: '2021-01-03', priority: Priority.P2, key: 3 },
      { date: '2021-01-04', priority: Priority.P3, key: 4 },
      { date: '2021-01-05', priority: Priority.P0, key: 5 },
      { date: '2021-01-06', priority: Priority.P1, key: 6 },
      { date: '2021-01-07', priority: Priority.P0, key: 7 },
    ]

    const sorted = sortByPriorityAndKey(data, comparator)

    expect(sorted).toEqual([
      { date: '2021-01-01', priority: Priority.P0, key: 1 },
      { date: '2021-01-05', priority: Priority.P0, key: 5 },
      { date: '2021-01-07', priority: Priority.P0, key: 7 },
      { date: '2021-01-02', priority: Priority.P1, key: 2 },
      { date: '2021-01-06', priority: Priority.P1, key: 6 },
      { date: '2021-01-03', priority: Priority.P2, key: 3 },
      { date: '2021-01-04', priority: Priority.P3, key: 4 },
    ])
  })
})

describe('Sort grouped data by column', () => {
  it('should sort by priority first', () => {
    const data = {
      [Priority.P0]: [
        { priority: Priority.P0, key: 1 },
        { priority: Priority.P0, key: 6 },
        { priority: Priority.P0, key: 7 },
      ],
      [Priority.P3]: [
        { priority: Priority.P3, key: 4 },
        { priority: Priority.P3, key: 8 },
      ],
      [Priority.P1]: [{ priority: Priority.P1, key: 2 }],
      [Priority.P2]: [{ priority: Priority.P2, key: 3 }],
    }

    const sorted = sortGroupedDataByColumn(data, 'priority')

    expect(sorted).toEqual({
      [Priority.P0]: [
        { priority: Priority.P0, key: 1 },
        { priority: Priority.P0, key: 6 },
        { priority: Priority.P0, key: 7 },
      ],
      [Priority.P1]: [{ priority: Priority.P1, key: 2 }],
      [Priority.P2]: [{ priority: Priority.P2, key: 3 }],
      [Priority.P3]: [
        { priority: Priority.P3, key: 4 },
        { priority: Priority.P3, key: 8 },
      ],
    })
  })

  it('should sort by secondary key alphabetically', () => {
    const data = {
      andrew: [
        { priority: Priority.P0, key: 1, member: 'andrew' },
        { priority: Priority.P0, key: 6, member: 'andrew' },
        { priority: Priority.P0, key: 7, member: 'andrew' },
      ],
      zach: [
        { priority: Priority.P3, key: 4, member: 'zach' },
        { priority: Priority.P3, key: 8, member: 'zach' },
      ],
      bob: [{ priority: Priority.P1, key: 2, name: 'bob' }],
      charlie: [{ priority: Priority.P2, key: 3, name: 'charlie' }],
    }

    const sorted = sortGroupedDataByColumn(data, 'member')

    expect(sorted).toEqual({
      andrew: [
        { priority: Priority.P0, key: 1, member: 'andrew' },
        { priority: Priority.P0, key: 6, member: 'andrew' },
        { priority: Priority.P0, key: 7, member: 'andrew' },
      ],
      bob: [{ priority: Priority.P1, key: 2, name: 'bob' }],
      charlie: [{ priority: Priority.P2, key: 3, name: 'charlie' }],
      zach: [
        { priority: Priority.P3, key: 4, member: 'zach' },
        { priority: Priority.P3, key: 8, member: 'zach' },
      ],
    })
  })
})
