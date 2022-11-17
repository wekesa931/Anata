import React from 'react'

import {
  Grid,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
} from '@mui/material'
import styles from './reusables.component.css'

/* eslint-disable no-nested-ternary */

export function TitleWithBody({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <Grid container direction="column" className={styles.container}>
      <Grid item xs={12} className={styles.title}>
        {title}
      </Grid>
      <Grid item xs={12} className={styles.body}>
        {body}
      </Grid>
    </Grid>
  )
}

export function SideBySideComponents({
  first,
  second,
}: {
  first: string
  second: string
}) {
  return (
    <div className={styles.sideBySide}>
      <div style={{ maxWidth: '70%' }}>{first} </div>
      <div>{second}</div>
    </div>
  )
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'KES',
})

export function SideBySideList({ utilization }: { utilization: any[] }) {
  return (
    <Grid container className={styles.sideBySideListWrapper}>
      {utilization.length === 0 ? (
        <Grid item className={styles.noBenefits}>
          We do NOT know the benefits for this member yet. Edit member to add
          benefits
        </Grid>
      ) : (
        <Grid item>
          <List disablePadding className={styles.list}>
            <ListSubheader className={styles.listSubheader}>
              <SideBySideComponents first="Benefits" second="Balance" />
            </ListSubheader>
            {utilization.map((el) => (
              <ListItem disablePadding key={el?.id}>
                <ListItemText disableTypography>
                  <SideBySideComponents
                    first={el?.benefit?.name || ''}
                    second={
                      el?.benefit !== null && el?.utilizedPortion !== null
                        ? el?.benefit?.limit
                          ? formatter.format(
                              (el?.benefit?.limit || 0) -
                                (el?.utilizedPortion || 0)
                            )
                          : 'N/A'
                        : 'N/A'
                    }
                  />
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  )
}
