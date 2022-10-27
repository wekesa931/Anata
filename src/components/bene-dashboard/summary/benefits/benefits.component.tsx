import React from 'react'

import { Box, Grid } from '@mui/material'
import { SideBySideList, TitleWithBody } from './reusables/reusables.component'
import styles from './benefits.component.css'

interface Utilization {
  id: string
  utilizedPortion: number
  benefit: {
    name: string
    description: string
    api: string
    limit: number
  }
}

interface InsuranceCompany {
  logo: string
  name: string
  code: string
}

interface InsuranceDetails {
  id: string
  insuranceId: string
  insuranceCompany?: InsuranceCompany
  benefitUtilizations?: Utilization[]
  memberPolicy?: { healthPolicy?: { id: string; name?: string } }
}

const Benefits = ({
  insuranceBenefits,
}: {
  insuranceBenefits?: InsuranceDetails[]
}) => {
  if (
    typeof insuranceBenefits === 'undefined' ||
    !insuranceBenefits ||
    insuranceBenefits === null
  ) {
    return null
  }

  return (
    <>
      {insuranceBenefits.map(
        ({
          id,
          benefitUtilizations,
          memberPolicy,
          insuranceCompany,
          insuranceId,
        }: InsuranceDetails) => {
          return (
            <Box className={styles.container} key={id}>
              {insuranceCompany?.logo && (
                <Box
                  sx={{ height: '32px', width: '100px' }}
                  component="img"
                  src={insuranceCompany?.logo}
                  alt={insuranceCompany?.name || ''}
                />
              )}

              <Grid container spacing={1} direction="column">
                <Grid item xs="auto">
                  <TitleWithBody
                    title="Provider"
                    body={insuranceCompany?.name ?? 'Data NOT Available'}
                  />
                </Grid>

                <Grid item xs="auto">
                  <TitleWithBody
                    title="Policy"
                    body={
                      memberPolicy?.healthPolicy?.name ?? 'Data NOT Available'
                    }
                  />
                </Grid>

                <Grid item xs="auto">
                  <TitleWithBody
                    title="Insurance ID"
                    body={insuranceId ?? 'Data NOT Available'}
                  />
                </Grid>
                <Grid item xs="auto">
                  <SideBySideList utilization={benefitUtilizations ?? []} />
                </Grid>
              </Grid>
            </Box>
          )
        }
      )}
    </>
  )
}

export default Benefits
