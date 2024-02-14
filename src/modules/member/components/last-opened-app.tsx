import React from 'react'
import { ItemChild } from 'src/components/layouts/display-items.component'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Props = {
  lastUsedToAccessApp?: string
}

export function LastOpenedApp({ lastUsedToAccessApp }: Props) {
  const getClassName = () => {
    if (!lastUsedToAccessApp) {
      return 'text-red-100'
    }

    const lastUsed = dayjs(lastUsedToAccessApp)
    const now = dayjs()

    const diff = now.diff(lastUsed, 'month')

    if (diff < 3) {
      return 'text-green-100'
    }

    if (diff >= 3 && diff < 6) {
      return 'text-orange-100'
    }

    return 'text-red-100'
  }
  return (
    <ItemChild
      child={
        lastUsedToAccessApp
          ? dayjs(lastUsedToAccessApp).fromNow()
          : 'Not installed'
      }
      className={getClassName()}
    />
  )
}

export default LastOpenedApp
