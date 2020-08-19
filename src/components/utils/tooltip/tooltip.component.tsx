import React from 'react'
import { Tooltip } from 'react-tippy'

const CustomTooltip = ({ title, children }: any) => {
  return (
    <Tooltip
      position="bottom"
      distance={4}
      size="small"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      theme="tooltip"
      title={title}
    >
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
