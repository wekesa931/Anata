import { Tooltip } from '@mui/material'
import React from 'react'

function CustomTooltip({ title, children }: any) {
  return (
    <Tooltip placement="bottom" title={title} arrow>
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
