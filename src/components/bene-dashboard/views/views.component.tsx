import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '../../utils/tabs/mui-tabs.component'
import {
  SortFilterProvider,
  useSortFilter,
} from '../../../context/sort-filter-views.context'
import styles from './views.component.css'
import Icon from '../../utils/icon/icon.component'
import Clinical from './clinical/clinical.component'
import InteractionLogs from './interaction-logs/interaction-logs.component'
import Nutrition from './nutrition/nutrition.component'
import Files from './files/files.component'
import ErrorBoundary from '../../error-boundary/error-boundary.component'
import SortDialog from './sort-and-filter.component/sort-and-filter.component'
import Conditions from './conditions/conditions.component'
import MemberTask from './member_tasks/member-task.component'
import Tooltip from '../../utils/tooltip/tooltip.component'
import CallLog from '../actions/calls/call-log/call-log.component'
import EngagementDashboard from './engagement/engagement-dashboard.component'
import Longitudinal from './longitudinal/longitudinal.components'

function SortButton({ openSortDialog, setOpenSortDialog }: any) {
  const {
    ops: { sort },
  } = useSortFilter()
  return (
    <button
      className={sort === 'asc' ? 'btn-icon active' : 'btn-icon'}
      onClick={() => {
        setOpenSortDialog(!openSortDialog)
      }}
      style={{ margin: 0, padding: 0 }}
    >
      <Icon name="options" width={40} height={24} fill="var(--blue-base)" />
    </button>
  )
}

function FilterComponent() {
  const [openSortDialog, setOpenSortDialog] = useState(false)
  const absolute = openSortDialog ? 'p-absolute' : ''
  return (
    <div
      className="d-flex p-relative"
      style={!openSortDialog ? { alignItems: 'center' } : {}}
    >
      <div
        className={`d-flex  flex-align-center ${absolute}`}
        key={openSortDialog ? 1 : 0}
      >
        {!openSortDialog ? (
          <div className={styles.animatedDiv}>
            <Tooltip title="Sort And Filter">
              <SortButton
                setOpenSortDialog={setOpenSortDialog}
                openSortDialog={openSortDialog}
              />
            </Tooltip>
          </div>
        ) : (
          <div className={styles.animatedDiv}>
            <SortDialog onClose={() => setOpenSortDialog(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

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
          <FilterComponent />
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
