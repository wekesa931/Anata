import React, { useEffect, useState } from 'react'

import { Box, Link } from '@mui/material'
import styles from './dependent-card.component.css'
import airtableFetch from '../../../../resources/airtable-fetch'
import logError from '../../../utils/error_handling/sentry'
import calcAge from '../biodata/utils'

/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */

interface DependentProps {
  antaraId: string
  details?: {
    fullName?: string
    relationshipToPrimary?: string
    sex?: { sex?: string }
  }
  status?: { status?: { status?: string } }
  birthDate: string
}

function DependentCard({
  dependent,
  trackAccess,
}: {
  dependent: DependentProps
  trackAccess: () => void
}) {
  const [airtableRecordId, setAirtableRecordId] = useState<string>('')

  useEffect(() => {
    airtableFetch(
      `members/list?filterByFormula=FIND("${dependent?.antaraId}", {Antara ID})`
    )
      .then((response) => {
        Object.keys(response).some((key) => {
          if (/^rec\w+/.test(key)) {
            setAirtableRecordId(key)
          }
        })
      })
      .catch((err) => {
        logError(err)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isStatusActive: boolean =
    dependent?.status?.status?.status?.toUpperCase() === 'ACTIVE'
  const isStatusTerminated: boolean =
    dependent?.status?.status?.status?.toUpperCase() === 'TERMINATED' ||
    dependent?.status?.status?.status?.toUpperCase() === 'DECEASED'
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
          <span className={styles.biodataSpan}>{`${
            dependent?.details?.fullName || 'Name Unknown'
          }, ${calcAge(dependent?.birthDate) || ''} ${
            dependent?.details?.sex?.sex?.substring(0, 1) || ''
          }`}</span>
          <span className={styles.relationshipSpan}>
            {' '}
            {dependent?.details?.relationshipToPrimary ||
              'Relationship Unknown'}{' '}
          </span>
        </Box>
        <Box
          className={
            isStatusActive
              ? styles.active
              : isStatusTerminated
              ? styles.terminated
              : styles.unknown
          }
        >
          {dependent?.status?.status?.status?.toUpperCase() || 'UNKNOWN'}
        </Box>
      </Box>
    </Link>
  )
}

export default DependentCard
