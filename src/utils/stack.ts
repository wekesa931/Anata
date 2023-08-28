/**
 * A stack data structure that has a maximum length.
 *
 * When the stack is full, the oldest item is removed.
 */
export class Stack<T> {
  private items: T[] = []

  private maxLength: number

  constructor(maxLength: number) {
    this.maxLength = maxLength
  }

  push(item: T) {
    this.items.push(item)
    if (this.items.length > this.maxLength) {
      this.items.shift()
    }
  }

  getItems() {
    return JSON.parse(JSON.stringify(this.items))
  }

  clear() {
    this.items.length = 0
  }

  peek() {
    if (this.items.length === 0) {
      return null
    }
    return this.items[this.items.length - 1]
  }

  get length() {
    return this.items.length
  }
}
