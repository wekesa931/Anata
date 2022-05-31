import React from 'react'

import { Box, Link } from '@mui/material'
import styles from './dependent-card.component.css'

/* eslint-disable no-nested-ternary */

interface DependentProps {
  airtableRecordId: string
  fullName: string
  status: string
  contactPhone1: string
  contactPhone2: string
  relationshipToPrimary: string
  birthDate: string
  sex: string
}

const DependentCard = ({
  dependent,
  trackAccess,
}: {
  dependent: DependentProps
  trackAccess: () => void
}) => {
  const {
    airtableRecordId,
    fullName: name,
    status,
    birthDate,
    sex: gender,
    relationshipToPrimary: relationship,
  } = dependent

  const age = new Date().getFullYear() - new Date(birthDate).getFullYear()

  const isActive: boolean = status === 'ONBOARDED' || status === 'ACTIVE'
  const isScheduled: boolean = status === 'SCHEDULED'
  return (
    <Link
      underline="none"
      href={`/member/${airtableRecordId}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackAccess()
      }}
    >
      <Box className={styles.container}>
        <Box className={styles.biodataBox}>
          <span
            className={styles.biodataSpan}
          >{`${name}, ${age} ${gender.substring(0, 1)}`}</span>
          <span className={styles.relationshipSpan}>
            {' '}
            {relationship || 'Relationship Unknown'}{' '}
          </span>
        </Box>
        <Box
          className={
            isActive
              ? styles.active
              : isScheduled
              ? styles.scheduled
              : styles.unscheduled
          }
        >
          {status}
        </Box>
      </Box>
    </Link>
  )
}

export default DependentCard
