import React from 'react'

import { Box, Divider, Grid } from '@mui/material'
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
        }: InsuranceDetails) => {
          return (
            <Box className={styles.container} key={id}>
              <Box
                sx={{ height: '32px', width: '100px' }}
                component="img"
                src={insuranceCompany?.logo}
                alt={insuranceCompany?.name || 'Unknown Insurer'}
              />

              <Grid container spacing={1} direction="column">
                <Grid item xs="auto">
                  <TitleWithBody
                    title="Provider"
                    body={insuranceCompany?.name || 'Unknown'}
                  />
                </Grid>
                <Grid item xs="auto">
                  <TitleWithBody
                    title="Policy"
                    body={memberPolicy?.healthPolicy?.name || 'Unknown'}
                  />
                </Grid>
                <Grid item xs="auto">
                  <SideBySideList utilization={benefitUtilizations || []} />
                </Grid>
              </Grid>
              <Divider variant="fullWidth" />
            </Box>
          )
        }
      )}
    </>
  )
}

export default Benefits
