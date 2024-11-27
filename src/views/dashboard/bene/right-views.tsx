import React, { useEffect } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from 'src/components/tabs/mui-tabs.component'
import Communication from 'src/modules/comms/chat/views/messages'
import Forms from 'src/modules/workflows/views/forms-page'
import Appointments from 'src/modules/appointments'
import Tasks from 'src/modules/tasks/views/hn-tasks'
import CallsCallout from 'src/modules/comms/calls/views'
import { useCall } from 'src/context/calls'
import ErrorBoundary from 'src/components/error-boundary'
import GuidedWorkflows from 'src/modules/workflows/views/workflows-page'
import { withTabRouter } from 'src/utils/routing/tab-router'
import { useModuleAnalytics } from 'src/modules/analytics'
import _ from 'lodash'
import MessageCircleIcon from 'src/assets/img/icons/message-circle.svg'
import { useLocation } from 'react-router-dom'
import { useMember } from 'src/context/member'

function Actions({ handleChange, view }: any) {
  const { setCounterValue } = useCall()
  const { member } = useMember()
  const location = useLocation()

  useEffect(() => {
    setCounterValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { trackRightSectionOpened: rightSectionOpened } = useModuleAnalytics()

  const rightSectionHandleChange = (event: any, newValue: string) => {
    handleChange(event, newValue)
    rightSectionOpened(`${_.startCase(_.toLower(newValue))} section opened`)
  }

  const blockedMember = () => {
    return (
      member?.eligibleForServices !== 'YES' &&
      location.search !== '?register=true'
    )
  }

  return (
    <TabContext value={view}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          background: 'var(--white-bg)',
        }}
      >
        <TabList
          onChange={rightSectionHandleChange}
          value={view}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab className="tab-view" label="Tasks" value="tasks" />
          <Tab className="tab-view" label="Forms" value="forms" />
          <Tab className="tab-view" label="Workflows" value="workflows" />
          <Tab label="Appointments" value="appointments" />
        </TabList>
        <div
          className={`d-flex flex-between communication-icons ${
            blockedMember() ? 'z-[999999]' : ''
          }`}
        >
          <button
            className="btn"
            style={{
              color: view === 'messages' ? '#58a9f3' : '#af9090',
              backgroundColor: view === 'messages' ? '#e7f3fd' : '#e8eaed',
            }}
            onClick={(e) => rightSectionHandleChange(e, 'messages')}
          >
            <MessageCircleIcon className="w-4 h-4" fill="#efefef" />
          </button>
          <CallsCallout />
        </div>
      </Box>
      <div
        className="full-height d-flex flex-column flex-1 "
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
        <TabPanel value="workflows">
          <ErrorBoundary>
            <GuidedWorkflows />
          </ErrorBoundary>
        </TabPanel>
        <TabPanel value="appointments">
          <ErrorBoundary>
            <Appointments />
          </ErrorBoundary>
        </TabPanel>
        <TabPanel
          value="messages"
          className={`full-height ${blockedMember() ? 'z-[999999]' : ''}`}
        >
          <ErrorBoundary>
            <Communication />
          </ErrorBoundary>
        </TabPanel>
      </div>
    </TabContext>
  )
}

export default withTabRouter(Actions, 'action', 'tasks')
