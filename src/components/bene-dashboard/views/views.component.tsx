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

function Views() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <SortFilterProvider>
      <TabContext value={value}>
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
              value="1"
              classes={{ root: styles.MuiTabRoot }}
            />
            <Tab label="Conditions" value="2" />
            <Tab label="Longitudinal" value="3" />
            <Tab label="Interactions" value="4" />
            <Tab label="Call Log" value="5" />
            <Tab label="Nutrition" value="6" />
            <Tab label="Docs" value="7" />
            <Tab label="Member Tasks" value="8" />
            <Tab label="Member Engagement" value="9" />
          </TabList>
        </Box>
        <div
          style={{ overflowY: 'auto', height: '100%', paddingBottom: '36px' }}
        >
          <TabPanel value="1">
            <ErrorBoundary>
              <Clinical />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="2">
            <ErrorBoundary>
              <Conditions />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="3" className={styles.longitud}>
            <ErrorBoundary>
              <Longitudinal />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="4">
            <ErrorBoundary>
              <InteractionLogs />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="5">
            <ErrorBoundary>
              <CallLog />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="6">
            <ErrorBoundary>
              <Nutrition />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="7">
            <ErrorBoundary>
              <Files />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="8">
            <ErrorBoundary>
              <MemberTask />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="9">
            <ErrorBoundary>
              <EngagementDashboard />
            </ErrorBoundary>
          </TabPanel>
        </div>
      </TabContext>
    </SortFilterProvider>
  )
}

export default Views
