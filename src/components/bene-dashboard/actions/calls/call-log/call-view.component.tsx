import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { formatDuration, callIcons } from './utils'
/* eslint-disable */
const _ = require('lodash')

type CallViewProps = {
  callData: any
}

const CallView = ({ callData }: CallViewProps) => {
  const { memberPhone, inCallDuration, callDirection } = callData

  const iconCall = <ListItemIcon>{callIcons(callData)}</ListItemIcon>

  const data = [
    {
      title: 'Phone number',
      subtitle: memberPhone,
    },
    {
      title: 'Duration',
      subtitle: formatDuration(inCallDuration),
    },
    {
      title: 'Type',
      subtitle: _.capitalize(callDirection),
    },
  ]

  const list = () => {
    return (
      <>
        {data.map(({ title, subtitle }, index) => (
          <List
            sx={{ width: '100%', maxWidth: 360, bgColor: 'background.paper' }}
          >
            <ListItem
              key={index}
              sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <ListItemText secondary={title} />

              {title === 'Type' ? (
                <>
                  {iconCall}{' '}
                  <ListItemText sx={{ marginTop: 0.5 }}>
                    {' '}
                    {subtitle}{' '}
                  </ListItemText>{' '}
                </>
              ) : (
                <ListItemText primary={subtitle} sx={{ marginTop: -1 }} />
              )}
            </ListItem>
          </List>
        ))}
      </>
    )
  }
  return (
    <div style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
      {list()}
    </div>
  )
}

export default CallView
