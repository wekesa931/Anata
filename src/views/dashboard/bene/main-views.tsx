import React from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from 'src/components/tabs/mui-tabs.component'
import { SortFilterProvider } from 'src/context/sort-filter'
import Clinical from 'src/modules/clinical'
import InteractionLogs from 'src/modules/interactions/components/interaction-logs.component'
import Nutrition from 'src/modules/nutrition'
import Files from 'src/modules/udm'
import ErrorBoundary from 'src/components/error-boundary'
import Conditions from 'src/modules/conditions'
import MemberTask from 'src/modules/tasks/views/member-tasks'
import CallLog from 'src/modules/comms/calls/views/call-logs'
import EngagementDashboard from 'src/modules/engagement'
import LongitudinalV1 from 'src/modules/longitudinal'
import { withTabRouter } from 'src/utils/routing/tab-router'
import styles from './views.component.css'

function Views({ view, handleChange }: any) {
  return (
    <SortFilterProvider>
      <TabContext value={view}>
        <Box
          sx={{
            background: 'var(--white-bg)',
            borderBottom: 1,
            borderColor: 'divider',
            paddingLeft: '8px',
            display: 'flex',
          }}
        >
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Clinical Tabs"
          >
            <Tab
              label="Clinical Summary"
              value="clinical"
              classes={{ root: styles.MuiTabRoot }}
            />
            <Tab label="Conditions" value="conditions" />
            <Tab label="Longitudinal" value="longitudinal" />
            <Tab label="Interactions" value="interactions" />
            <Tab label="Call Log" value="call-logs" />
            <Tab label="Nutrition" value="nutrition" />
            <Tab label="Docs" value="udm" />
            <Tab label="Member Tasks" value="member-tasks" />
            <Tab label="Member Engagement" value="engagement" />
          </TabList>
        </Box>
        <div
          style={{ overflowY: 'auto', height: '100%', paddingBottom: '36px' }}
        >
          <TabPanel value="clinical" sx={{ pt: 0 }}>
            <ErrorBoundary>
              <Clinical />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="conditions">
            <ErrorBoundary>
              <Conditions />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="longitudinal" className={styles.longitud}>
            <ErrorBoundary>
              <LongitudinalV1 />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="interactions">
            <ErrorBoundary>
              <InteractionLogs />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="call-logs">
            <ErrorBoundary>
              <CallLog />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="nutrition">
            <ErrorBoundary>
              <Nutrition />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="udm">
            <ErrorBoundary>
              <Files />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="member-tasks">
            <ErrorBoundary>
              <MemberTask />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="engagement">
            <ErrorBoundary>
              <EngagementDashboard />
            </ErrorBoundary>
          </TabPanel>
        </div>
      </TabContext>
    </SortFilterProvider>
  )
}

export default withTabRouter(Views, 'view', 'clinical')
