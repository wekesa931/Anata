import React, { useEffect } from 'react'
import useComponentVisible from '../hooks/dropdown.hook'

const DropDownComponent = ({
  isVisible,
  setvisibility,
  children,
}: {
  isVisible: boolean
  setvisibility: (visible: boolean) => void
  children: any
}) => {
  const { ref, isComponentVisible } = useComponentVisible(isVisible)
  useEffect(() => {
    if (!isComponentVisible && ref) {
      setvisibility(false)
    }
  }, [ref, setvisibility, isComponentVisible])
  return <>{isComponentVisible && <div ref={ref}>{children}</div>}</>
}

export default DropDownComponent
