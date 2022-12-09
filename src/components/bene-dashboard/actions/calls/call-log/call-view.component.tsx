import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { capitalize } from 'lodash'
import { formatDuration, CallIcon } from './utils'

type CallViewProps = {
  callData: any
}

function CallView({ callData }: CallViewProps) {
  const iconCall = (
    <ListItemIcon>
      <CallIcon item={callData} />{' '}
    </ListItemIcon>
  )

  const data = [
    {
      title: 'Phone number',
      subtitle: callData?.memberPhone,
    },
    {
      title: 'Duration',
      subtitle: formatDuration(callData?.inCallDuration),
    },
    {
      title: 'Type',
      subtitle: capitalize(callData?.callDirection),
    },
  ]

  const list = () => {
    return (
      <>
        {data &&
          data.map(({ title, subtitle }, index) => (
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
