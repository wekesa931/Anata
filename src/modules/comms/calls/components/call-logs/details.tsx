import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { capitalize } from 'lodash'
import { humanize } from 'src/utils/date-time/date-formatters'

type CallViewProps = {
  callData: any
}

function CallDetailsItem({ title, subtitle }: any) {
  return (
    <ListItem
      sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
      key={title}
    >
      <ListItemText secondary={title} />
      <ListItemText primary={subtitle} sx={{ marginTop: -1 }} />
    </ListItem>
  )
}

function CallView({ callData }: CallViewProps) {
  const data = [
    {
      title: 'Phone number',
      subtitle: callData?.memberPhone,
    },
    {
      title: 'Duration',
      subtitle: humanize(callData?.inCallDuration),
    },
    {
      title: 'Type',
      subtitle: capitalize(callData?.callDirection),
    },
    {
      title: 'Staff',
      subtitle: callData?.agentEmail,
    },
  ]

  return (
    <div style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
      <List sx={{ width: '100%', maxWidth: 360, bgColor: 'background.paper' }}>
        {data.map(({ title, subtitle }, index) => (
          <CallDetailsItem title={title} subtitle={subtitle} key={index} />
        ))}
      </List>
    </div>
  )
}

export default CallView
