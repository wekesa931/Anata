import { Box } from '@mui/material'
import React from 'react'
import styles from 'src/modules/udm/files.module.css'

type Props = {
  title: string
  value: string
}

export function FileDetailsSection({ title, value }: Props) {
  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <p className={styles.docInfoSubtext}>{title}</p>
      <p className={styles.docInfoText}>{value}</p>
    </Box>
  )
}
