import React, { useContext, useCallback, useEffect, useState } from 'react'
import menu from '../components/sidebar/sidebar.menu'

type sidebar = {
  handleOnClick: (index: number) => void
  activeView: any
  activeSubView: any
  activeIndex: number
  handleSublistClick: (index: number) => void
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
})

const SidebarProvider = ({ children }: any) => {
  const [activeIndex, setActive] = useState(0)
  const [activeView, setActiveView] = useState(menu[0])
  const [activeSubViewIndex, setActiveSubView] = useState(0)
  const [activeSubView, setActiveSubViewItem] = useState('')

  const handleOnClick = useCallback((index: number) => {
    setActiveSubViewItem('')
    setActive(index)
  }, [])

  useEffect(() => {
    setActiveView(menu[activeIndex])
  }, [activeIndex])

  const handleSublistClick = useCallback((index: number) => {
    setActiveSubView(index)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    activeView.subItems && setActiveSubViewItem(activeView.subItems[activeSubViewIndex])
  }, [activeSubViewIndex, activeView])

  return (
    <SidebarContext.Provider
      value={{
        handleOnClick,
        activeView,
        activeIndex,
        activeSubView,
        handleSublistClick,
      }}
    >
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
