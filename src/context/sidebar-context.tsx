import React, { useContext, useCallback, useEffect, useState } from 'react'
import menu from '../components/navbar/menu.items'

type sidebar = {
  handleOnClick: (index: number) => void
  activeView: any
  activeSubView: any
  activeIndex: number
  handleSublistClick: (item: any) => void
  prev: any
}

const SidebarContext = React.createContext<sidebar>({
  handleOnClick: () => {
    return null
  },
  activeSubView: '',
  activeIndex: 0,
  activeView: '',
  handleSublistClick: () => {
    return null
  },
  prev: '',
})

function SidebarProvider({ children }: any) {
  const [prev, setPrev] = useState<any>('')
  const [activeIndex, setActive] = useState(0)
  const [activeView, setActiveView] = useState(menu[0])
  const [activeSubView, setActiveSubViewItem] = useState<any>('')

  const handleOnClick = useCallback(
    (index: number) => {
      if (activeView.name !== 'Tasks') {
        setPrev(activeView)
      }
      setActive(index)
    },
    [activeView]
  )

  useEffect(() => {
    setActiveView(menu[activeIndex])
  }, [activeIndex])

  const handleSublistClick = useCallback((item: any) => {
    setActiveSubViewItem(item)
  }, [])

  const providerValue = React.useMemo(
    () => ({
      handleOnClick,
      activeView,
      activeIndex,
      activeSubView,
      handleSublistClick,
      prev,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, activeSubView, activeView, prev]
  )

  return (
    <SidebarContext.Provider value={providerValue}>
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export { SidebarProvider, useSidebar }
