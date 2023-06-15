import React from 'react'

export default function FlexRow({ children }: any) {
  return (
    <div className="flex justify-between items-center gap-6">{children}</div>
  )
}
