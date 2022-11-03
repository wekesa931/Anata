import React, { useState } from 'react'
import { always } from 'kremling'
import styles from './tabs.component.css'

function Tab({ activeTab, label, onClick, orientation }: any) {
  const isActive = activeTab === label
  const isVertical = orientation === 'vertical'
  return isVertical ? (
    <button
      className={always(`btn-unstyled ${styles.tab} ${styles.vertical}`).maybe(
        styles.active,
        isActive
      )}
      onClick={(e) => {
        e.preventDefault()
        onClick(label)
      }}
    >
      {label}
    </button>
  ) : (
    <button
      className={always(`${styles.tab} ${styles.horizontal}`)
        .toggle('btn btn-secondary', 'btn btn-unstyled', activeTab === label)
        .maybe('text-bold', activeTab === label)}
      onClick={(e) => {
        e.preventDefault()
        onClick(label)
      }}
    >
      {label}
    </button>
  )
}

function Tabs({
  children,
  currentTab = 0,
  orientation,
  FilterComponent = null,
}: any) {
  const [activeTab, setActiveTab] = useState(children[currentTab].props.label)
  const isVertical = orientation === 'vertical'
  const onClickTabItem = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div
      className={
        isVertical
          ? `${styles.tabWrapper}`
          : `${styles.tabWrapper} ${styles.horizontal}`
      }
    >
      <div
        className={
          isVertical ? `${styles.tabs} ${styles.vertical}` : styles.tabs
        }
      >
        {children.map((child: any) => {
          const { label } = child.props

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
              orientation={orientation}
            />
          )
        })}
        {FilterComponent && <FilterComponent />}
      </div>
      <div
        className={
          isVertical
            ? `${styles.tabContent} ${styles.vertical}`
            : `${styles.tabContent} ${styles.horizontal}`
        }
      >
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
