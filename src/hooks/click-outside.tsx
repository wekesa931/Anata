import React, { useEffect } from 'react'

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref?.current && !ref?.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, handler])
}

export default useClickOutside
