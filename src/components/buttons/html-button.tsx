import React from 'react'

function Button({ children, className, id, onClick }: any) {
  return (
    <button className={className} id={id} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
