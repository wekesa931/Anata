export function sortAlphabetically<T extends Record<K, any>, K extends keyof T>(
  array: T[],
  property: K = 'name' as K
) {
  return array.sort((a, b) => {
    if (a[property] > b[property]) {
      return 1
    }
    if (b[property] > a[property]) {
      return -1
    }
    return 0
  })
}
