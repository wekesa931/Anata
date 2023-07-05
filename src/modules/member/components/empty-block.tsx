import React from 'react'

type EmptyBlockProps = {
  text?: string
  children: React.ReactNode
}

function EmptyBlock({ children, text }: EmptyBlockProps) {
  return (
    <div className="justify-between h-16 bg-red-20 mx-3 rounded-lg flex items-center font-rubik text-dark-blue-100 w-full">
      <h3 className="ml-2 text-md text-left ">{text}</h3>
      <div className="flex text-right">{children}</div>
    </div>
  )
}

export default EmptyBlock
