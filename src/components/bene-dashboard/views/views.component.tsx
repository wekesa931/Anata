import React from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '../../utils/tabs/mui-tabs.component'
import { SortFilterProvider } from '../../../context/sort-filter-views.context'
import styles from './views.component.css'
import Clinical from './clinical/clinical.component'
import InteractionLogs from './interaction-logs/interaction-logs.component'
import Nutrition from './nutrition/nutrition.component'
import Files from './files/files.component'
import ErrorBoundary from '../../error-boundary/error-boundary.component'
import Conditions from './conditions/conditions.component'
import MemberTask from './member_tasks/member-task.component'
import CallLog from '../actions/calls/call-log/call-log.component'
import EngagementDashboard from './engagement/engagement-dashboard.component'
import Longitudinal from './longitudinal/longitudinal.components'
import { withTabRouter } from '../../lib/routing'

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
          <TabPanel value="clinical">
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
              <Longitudinal />
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
          <TabPanel value="member-task">
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
