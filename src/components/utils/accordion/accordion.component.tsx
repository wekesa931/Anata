import React, { useRef, useState } from 'react'
import Chevron from './chevron'
import styles from './accordion.component.css'

function Accordion({ title, children }: { title: string; children: any }) {
  const [active, setActive] = useState('')
  const [rotate, setRotate] = useState(styles.accordion__icon)
  const [height, setHeight] = useState('0px')

  const contentDiv = useRef(null)

  function toggleAccordion() {
    setActive(active === '' ? 'active' : '')
    setRotate(
      active === 'active'
        ? `${styles.accordion__icon}`
        : `${styles.accordion__icon} ${styles.rotate}`
    )
    if (contentDiv && contentDiv.current) {
      setHeight(active === 'active' ? '0px' : `650px`)
    }
  }

  return (
    <div className={styles.accordion__section}>
      <button
        className={`${styles.accordion} ${active}`}
        onClick={toggleAccordion}
      >
        <p className={styles.accordion__title}>{title}</p>
        <Chevron className={`${rotate}`} width={10} fill="#777" />
      </button>
      <div
        className={styles.accordion__content}
        ref={contentDiv}
        style={{ height: `${height}` }}
      >
        <div className={styles.accordion__text}>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
