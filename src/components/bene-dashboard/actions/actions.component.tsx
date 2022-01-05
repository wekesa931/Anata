import React, { useEffect } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '../../utils/tabs/mui-tabs.component'
import Communication from './communication/communication.component'
import Forms from './forms/forms.component'
import Meetings from './meetings/meetings.component'
import Tasks from './tasks/tasks.component'
import Icon from '../../utils/icon/icon.component'
import CallsCallout from './calls/calls.component'
import { useCall } from '../../../context/calls-context'
import ErrorBoundary from '../../error-boundary/error-boundary.component'

const Actions = () => {
  const [activeTab, setActiveTab] = React.useState<string>('tasks')
  const { setCounterValue } = useCall()

  useEffect(() => {
    setCounterValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    setActiveTab(newValue)
  }

  return (
    <TabContext value={activeTab}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          background: 'var(--white-bg)',
        }}
      >
        <TabList onChange={handleChange} value={activeTab}>
          <Tab label="Tasks" value="tasks" />
          <Tab label="Forms" value="forms" />
          <Tab label="Meetings" value="meetings" />
        </TabList>
        <div className="d-flex flex-between communication-icons">
          <button
            className="btn"
            style={{
              color: activeTab === 'messages' ? '#58a9f3' : '#af9090',
              backgroundColor: activeTab === 'messages' ? '#e7f3fd' : '#e8eaed',
            }}
            onClick={() => setActiveTab('messages')}
          >
            <Icon name="message-circle" fill="#efefef" width={16} height={16} />
          </button>
          <CallsCallout />
        </div>
      </Box>
      <div
        className="full-height d-flex flex-column flex-1"
        style={{ overflowY: 'auto' }}
      >
        <TabPanel value="tasks">
          <ErrorBoundary>
            <Tasks />
          </ErrorBoundary>
        </TabPanel>
        <TabPanel value="forms">
          <ErrorBoundary>
            <Forms />
          </ErrorBoundary>
        </TabPanel>
        <TabPanel value="meetings">
          <ErrorBoundary>
            <Meetings />
          </ErrorBoundary>
        </TabPanel>
        <TabPanel value="messages" className="full-height">
          <ErrorBoundary>
            <Communication />
          </ErrorBoundary>
        </TabPanel>
      </div>
    </TabContext>
  )
}

export default Actions
