import * as React from 'react'
import styles from './notification.component.css'

export interface IProps {
  title: 'Warning' | 'Error'
  message: string
}

const Notification = ({ message, title }: IProps) => {
  const backgroundColor = {
    Error: '#ffebea',
    Warning: '#fff5e5',
  }
  const textColor = {
    Warning: '#ff9800',
    Error: '#ff3b30',
  }
  return (
    <div
      className={styles.notificationBlock}
      style={{
        background: backgroundColor[title],
      }}
    >
      <div className="d-flex max-width">
        <span
          style={{
            color: textColor[title],
          }}
          className={styles.notificationSpan}
        >
          {title}:
        </span>
        <p className={styles.textContainer}>{message}</p>
      </div>
    </div>
  )
}

export default Notification
