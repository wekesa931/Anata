export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis?.map((el) => el[0])
}

export type Order = 'asc' | 'desc'

const extractValueFromItem = (item: any) => {
  return item?.value || item
}

export function descendingComparator<T>(
  a: T,
  b: T,
  orderBy: keyof T,
  type?: string
) {
  let aValue = extractValueFromItem(a[orderBy])
  let bValue = extractValueFromItem(b[orderBy])

  if (type === 'date') {
    aValue = new Date(aValue).getTime()
    bValue = new Date(bValue).getTime()
  }

  if (bValue < aValue) {
    return -1
  }

  if (bValue > aValue) {
    return 1
  }

  return 0
}

type ComparatorReturnType<Key extends keyof any> = (
  a: { [key in Key]: any },
  b: { [key in Key]: any }
) => number

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
  type?: string
): ComparatorReturnType<Key> {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, type)
    : (a, b) => -descendingComparator(a, b, orderBy, type)
}
