import React from 'react'

import {
  Grid,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
} from '@mui/material'
import styles from './reusables.component.css'

export const TitleWithBody = ({
  title,
  body,
}: {
  title: string
  body: string
}) => {
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

const SideBySideComponents = ({
  first,
  second,
}: {
  first: string
  second: string
}) => (
  <div className={styles.sideBySide}>
    <div>{first} </div>
    <div>{second}</div>
  </div>
)

export const SideBySideList = ({ utilization }: { utilization: any[] }) => {
  return (
    <Grid container className={styles.sideBySideListWrapper}>
      <Grid item xs={8}>
        <List dense disablePadding className={styles.list}>
          <ListSubheader disableGutters className={styles.listSubheader}>
            <SideBySideComponents first="Benefits" second="Balance" />
          </ListSubheader>
          {utilization.map((el) => (
            <ListItem disablePadding key={el?.id}>
              <ListItemText disableTypography>
                <SideBySideComponents
                  first={el?.benefit?.name || ''}
                  second={
                    el?.utilizedPortion || el?.benefit?.limit > 0 || 0
                      ? 'Available'
                      : 'Used Up'
                  }
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}
