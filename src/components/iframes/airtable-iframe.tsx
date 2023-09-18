import React, { CSSProperties } from 'react'
import styles from './iframe.component.css'

type AirtableIframePropType = {
  src: string
  style?: CSSProperties
  className?: string
  width?: string
  height?: string
}

function AirtableIframe({ src, style }: AirtableIframePropType) {
  return (
    <div className={styles.iframeContainer}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={style || { background: 'transparent' }}
        title={`Airtable view from ${src}`}
      />
    </div>
  )
}

export default AirtableIframe
