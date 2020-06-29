import React, { CSSProperties } from 'react'

type AirtableIframePropType = {
  src: string
  style?: CSSProperties
  className?: string
  width?: string
  height?: string
}

const AirtableIframe = ({ src }: AirtableIframePropType) => {
  return (
    <iframe
      src={src}
      frameBorder="0"
      width="100%"
      height="95%"
      style={{ background: 'transparent', border: '1px solid #ccc' }}
      title={`Airtable view from ${src}`}
    />
  )
}

export default AirtableIframe
