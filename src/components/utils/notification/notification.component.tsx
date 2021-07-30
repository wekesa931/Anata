import * as React from 'react'
import parse from 'html-react-parser'
import styles from './notification.component.css'

export interface IProps {
  title: 'Warning' | 'Error' | 'Info'
  message: string
}

const Notification = ({ message, title }: IProps) => {
  const backgroundColor = {
    Error: '#ffebea',
    Warning: '#fff5e5',
    Info: '#ffcb80',
  }
  const textColor = {
    Warning: '#ff9800',
    Error: '#ff3b30',
    Info: '#ff9800',
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
        <p className={styles.textContainer}>{parse(message)}</p>
      </div>
    </div>
  )
}

export default Notification
