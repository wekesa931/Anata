import { Children } from 'react'

type Props<T> = {
  of: T[]
  options: {
    filter: (item: T, index: number) => boolean
  }
  render: (item: T, index: number) => React.ReactNode
}
export default function Each<T>({ of, options, render }: Props<T>) {
  if (options.filter) {
    return Children.toArray(of.filter(options.filter).map(render))
  }

  return Children.toArray(of.map(render))
}
