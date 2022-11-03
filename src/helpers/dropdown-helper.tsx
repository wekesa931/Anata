import React, { useEffect } from 'react'
import useComponentVisible from '../hooks/dropdown.hook'

function DropDownComponent({
  isVisible,
  setvisibility,
  children,
}: {
  isVisible: boolean
  setvisibility: (visible: boolean) => void
  children: any
}) {
  const { ref, isComponentVisible } = useComponentVisible(isVisible)
  useEffect(() => {
    if (!isComponentVisible && ref) {
      setvisibility(false)
    }
  }, [ref, setvisibility, isComponentVisible])
  return <div>{isComponentVisible && <div ref={ref}>{children}</div>}</div>
}

export default DropDownComponent
