import React, { useState } from 'react'
import { toggle } from 'kremling'
import styles from './tabs.component.css'

const Tab = ({ activeTab, label, onClick }: any) => {
  return (
    <button
      className={toggle(
        'btn btn-secondary',
        'btn btn-unstyled',
        activeTab === label
      )}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  )
}

const Tabs = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label)

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div style={{ marginTop: '28px' }}>
      <div className={styles.tabs}>
        {children.map((child: any) => {
          const { label } = child.props

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          )
        })}
      </div>
      <div className={styles.tabContent}>
        {children.map((child: any) => {
          if (child.props.label !== activeTab) {
            return null
          }
          return child.props.children
        })}
      </div>
    </div>
  )
}

export default Tabs
