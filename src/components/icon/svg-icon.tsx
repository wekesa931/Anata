import React, { useState, useEffect, useRef } from 'react'

type IconProps = {
  name: string
  width?: number
  height?: number
  fill?: string
}

function SVGIcon({ name, width = 24, height = 24, fill = '#000' }: IconProps) {
  const iconRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(
          `../../assets/img/icons/${name}.svg?react`
        )
        iconRef.current = namedImport
      } catch (err) {
        // eslint-disable-next-line no-console
        // console.error(`An error occured while loading the svg from ${name}`)
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }
    if (!isCancelled) {
      importIcon()
    }
    // Cleanup
    return () => {
      isCancelled = true
    }
  }, [name])

  if (!loading && iconRef.current) {
    const { current: ImportedIcon } = iconRef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <ImportedIcon width={width} height={height} fill={fill} />
  }

  return null
}

export default SVGIcon
