import React, { useState, useEffect, useRef } from 'react'

type IconProps = {
  name: string
  size?: number
  fill?: string
}

const Icon = ({ name, size = 24, fill = '#000' }: IconProps) => {
  const iconRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(
          `../../../assets/img/icons/${name}.svg`
        )
        iconRef.current = namedImport
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`An error occured while loading the svg from ${name}`)
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name])

  if (!loading && iconRef.current) {
    const { current: ImportedIcon } = iconRef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <ImportedIcon width={size} height={size} fill={fill} />
  }

  return null
}

export default Icon
