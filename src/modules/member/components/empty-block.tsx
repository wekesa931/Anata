import React from 'react'

function EmptyBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-16 bg-red-20 rounded-lg flex justify-center items-center font-rubik text-dark-blue-100">
      <div>{children}</div>
    </div>
  )
}

export default EmptyBlock
