import React, { useEffect, useState } from 'react'

import { Box, Link } from '@mui/material'
import styles from './dependent-card.component.css'
import airtableFetch from '../../../../resources/airtable-fetch'
import logError from '../../../utils/Bugsnag/Bugsnag'

/* eslint-disable no-nested-ternary */

interface DependentProps {
  antaraId: string
  details: {
    fullName: string
    relationshipToPrimary: string
    sex: { sex: string }
  }
  status: { status: { status: string } }
  birthDate: string
}

const DependentCard = ({
  dependent,
  trackAccess,
}: {
  dependent: DependentProps
  trackAccess: () => void
}) => {
  const {
    details: {
      fullName: name,
      relationshipToPrimary: relationship,
      sex: { sex: gender },
    },
    status: {
      status: { status },
    },
    birthDate,
    antaraId,
  } = dependent

  const [airtableRecordId, setAirtableRecordId] = useState<string>('')

  useEffect(() => {
    airtableFetch(
      `members/list?filterByFormula=FIND("${antaraId}", {Antara ID})`
    )
      .then((response) => {
        Object.keys(response).some((key) => {
          if (/^rec\w+/.test(key)) {
            setAirtableRecordId(key)
          }
          return ''
        })
      })
      .catch((err) => {
        logError(err)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const age = new Date().getFullYear() - new Date(birthDate).getFullYear()

  const isStatusActive: boolean = status.toUpperCase() === 'ACTIVE'
  const isStatusTerminated: boolean =
    status.toUpperCase() === 'TERMINATED' || status.toUpperCase() === 'DECEASED'
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
            isStatusActive
              ? styles.active
              : isStatusTerminated
              ? styles.terminated
              : styles.unknown
          }
        >
          {status.toUpperCase()}
        </Box>
      </Box>
    </Link>
  )
}

export default DependentCard
