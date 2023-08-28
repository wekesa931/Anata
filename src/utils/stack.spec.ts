import { Stack } from 'src/utils/stack'

describe('Stack', () => {
  it('should push items to the stack', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.length).toBe(3)
  })

  it('should remove the oldest item when the stack is full', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    expect(stack.length).toBe(3)
    expect(stack.peek()).toBe(4)
    expect(stack.getItems()).toEqual([2, 3, 4])
  })

  it('should return null when peeking an empty stack', () => {
    const stack = new Stack(3)
    expect(stack.peek()).toBe(null)
  })

  it('should clear the stack', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.clear()
    expect(stack.length).toBe(0)
  })

  it('should return the correct length', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.length).toBe(3)
  })

  it('should return the correct items', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.getItems()).toEqual([1, 2, 3])
  })

  it('should return the correct items when the stack is full', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    expect(stack.getItems()).toEqual([2, 3, 4])
  })

  it('should return the correct items when the stack is empty', () => {
    const stack = new Stack(3)
    expect(stack.getItems()).toEqual([])
  })

  it('should return the correct items when the stack is cleared', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.clear()
    expect(stack.getItems()).toEqual([])
  })

  it('should return the correct items when the stack is cleared and then pushed', () => {
    const stack = new Stack(3)
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.clear()
    stack.push(4)
    expect(stack.getItems()).toEqual([4])
  })
})
