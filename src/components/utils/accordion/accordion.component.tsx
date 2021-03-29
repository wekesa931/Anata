import React, { useEffect, useRef, useState } from 'react'
import Chevron from './chevron'
import styles from './accordion.component.css'

function Accordion({ title, children }: { title: string; children: any }) {
  const [active, setActive] = useState<string>()
  const [rotate, setRotate] = useState(styles.accordion__icon)
  const [display, setDisplay] = useState('none')

  const contentDiv = useRef(null)

  useEffect(() => {
    setRotate(
      active === 'active'
        ? `${styles.accordion__icon}`
        : `${styles.accordion__icon} ${styles.rotate}`
    )
    if (contentDiv && contentDiv.current) {
      setDisplay(active === 'active' ? 'block' : 'none')
    }
  }, [active])

  function toggleAccordion() {
    setActive(active === '' || active === undefined ? 'active' : '')
  }

  return (
    <div className={styles.accordion__section}>
      <button
        className={`${styles.accordion} ${active}`}
        data-testid="toggle"
        onClick={toggleAccordion}
      >
        <p className={styles.accordion__title}>{title}</p>
        <Chevron className={`${rotate}`} width={10} fill="#777" />
      </button>
      <div
        className={styles.accordion__content}
        ref={contentDiv}
        data-testid="content"
        style={{ display, overflowY: 'scroll' }}
      >
        {active !== undefined && (
          <div className={styles.accordion__text}>{children}</div>
        )}
      </div>
    </div>
  )
}

export default Accordion
