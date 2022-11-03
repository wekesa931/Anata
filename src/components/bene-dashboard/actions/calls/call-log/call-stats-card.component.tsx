import React from 'react'
import { Paper, Box, Button } from '@mui/material'
import styles from './call-stats-card.component.css'

type CallStats = {
  label: string
  value: number
}

type CallCardProps = {
  size: number
  color: string
  stats: Array<CallStats>
  callback: () => void
  icon: React.ReactElement
  title: string
  subTitle: string
}

const createCardBoxSx = (size: number) => ({
  '& > :not(style)': {
    m: 1,
    width: 145,
    height: size,
  },
})

const createPaperSx = (color: string) => ({
  borderColor: color,
  borderRadius: 6,
  p: 1,
})

function CallStatsCard({
  size,
  color,
  stats,
  callback,
  icon,
  title,
  subTitle,
}: CallCardProps) {
  return (
    <Box sx={createCardBoxSx(size)}>
      <Paper elevation={2} variant="outlined" sx={createPaperSx(color)}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {icon}
        </div>
        <h4 style={{ flexDirection: 'row' }}>{subTitle}</h4>
        <div className={styles.statsSection}>
          {stats &&
            stats.map(({ label, value }) => (
              <div style={{ display: 'block' }}>
                <h3 className={styles.statsTitle}>{value}</h3>
                <small className={styles.statsSubTitle}>{label}</small>
              </div>
            ))}
        </div>
        <div className={styles.statsActionSection}>
          <Button
            variant="text"
            className={styles.statsActionBtn}
            onClick={callback}
          >
            Show
          </Button>
        </div>
      </Paper>
    </Box>
  )
}

export default CallStatsCard
