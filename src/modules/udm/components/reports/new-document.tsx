import { Box, Popper } from '@mui/material'
import React from 'react'

type Props = {
  children: React.ReactNode
  anchorEl: any
  open: boolean
}

export function NewDocumentPopper({ children, anchorEl, open }: Props) {
  const id = open ? 'doc-popper' : undefined

  return (
    <Popper open={open} anchorEl={anchorEl} id={id}>
      <Box className="bg-white p-1">{children}</Box>
    </Popper>
  )
}
