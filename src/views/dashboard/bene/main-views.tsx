import React from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from 'src/components/tabs/mui-tabs.component'
import { SortFilterProvider } from 'src/context/sort-filter'
import Clinical from 'src/modules/clinical/views/clinical-summary-tables'
import InteractionLogs from 'src/modules/interactions/components/interaction-logs.component'
import Nutrition from 'src/modules/nutrition'
import Files from 'src/modules/udm'
import ErrorBoundary from 'src/components/error-boundary'
import CallLog from 'src/modules/comms/calls/views/call-logs'
import { withTabRouter } from 'src/utils/routing/tab-router'
import ConditionsSection from 'src/modules/conditions/views/condition-details'
import InterventionSection from 'src/modules/interventions/views/intervention-details'
import MemberTasks from 'src/modules/tasks/components/member-tasks.component'
import { useModuleAnalytics } from 'src/modules/analytics'
import _ from 'lodash'
import styles from './views.module.css'

function Views({ view, handleChange }: any) {
  const { trackMiddleSectionOpened: middleSectionOpened } = useModuleAnalytics()

  const middleSectionHandleChange = (event: any, newValue: string) => {
    handleChange(event, newValue)
    middleSectionOpened(`${_.startCase(_.toLower(newValue))} section opened`)
  }
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
            onChange={middleSectionHandleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Clinical Tabs"
          >
            <Tab
              label="overview"
              value="clinical"
              classes={{ root: styles.MuiTabRoot }}
            />
            <Tab label="Conditions" value="conditions" />
            <Tab label="Interventions" value="interventions" />
            <Tab label="Interactions" value="interactions" />
            <Tab label="Call Log" value="call-logs" />
            <Tab label="Nutrition" value="nutrition" />
            <Tab label="Docs" value="udm" />
            <Tab label="Member Tasks" value="member-tasks" />
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
              <ConditionsSection />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="interventions">
            <ErrorBoundary>
              <InterventionSection />
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
              <MemberTasks />
            </ErrorBoundary>
          </TabPanel>
        </div>
      </TabContext>
    </SortFilterProvider>
  )
}

export default withTabRouter(Views, 'view', 'clinical')
