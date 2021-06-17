import React, { CSSProperties } from 'react'
import styles from './airtableIframe.component.css'

type AirtableIframePropType = {
  src: string
  style?: CSSProperties
  className?: string
  width?: string
  height?: string
}

const AirtableIframe = ({ src, style }: AirtableIframePropType) => {
  return (
    <div className={styles.iframeContainer}>
      <iframe
        src={src}
        frameBorder="0"
        width="100%"
        height="100%"
        style={style || { background: 'transparent' }}
        title={`Airtable view from ${src}`}
        scrolling="yes"
      />
    </div>
  )
}

export default AirtableIframe
