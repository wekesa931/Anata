import dayjs from 'dayjs'

export function sortAlphabetically<T extends Record<K, any>, K extends keyof T>(
  array: T[],
  property: K = 'name' as K
) {
  return array?.sort((a, b) => {
    if (a[property] > b[property]) {
      return 1
    }
    if (b[property] > a[property]) {
      return -1
    }
    return 0
  })
}

interface RecordWithTimestamp {
  timestamp?: string
}

export function sortByTimestamp<T extends RecordWithTimestamp>(array: T[]) {
  return array?.sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      if (dayjs(b.timestamp).isBefore(a.timestamp)) {
        return 1
      }
      if (dayjs(b.timestamp).isAfter(a.timestamp)) {
        return -1
      }
    }
    return 0
  })
}
