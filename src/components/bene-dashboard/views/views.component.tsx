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

const SortButton = ({ openSortDialog, setOpenSortDialog }: any) => {
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

const FilterComponent = () => {
  const [openSortDialog, setOpenSortDialog] = useState(false)
  return (
    <div
      className="d-flex p-relative"
      style={!openSortDialog ? { alignItems: 'center' } : {}}
    >
      <div
        className="d-flex p-absolute flex-align-center"
        style={{ left: '30px' }}
        key={openSortDialog ? 1 : 0}
      >
        <div>
          {!openSortDialog && (
            <button
              className="btn-icon active"
              style={{ margin: '0 8px 0px 0', padding: 0 }}
            >
              <Icon
                name="table"
                width={40}
                height={24}
                fill="var(--blue-base)"
              />
            </button>
          )}
        </div>
        {!openSortDialog ? (
          <div className={styles.animatedDiv}>
            <SortButton
              setOpenSortDialog={setOpenSortDialog}
              openSortDialog={openSortDialog}
            />
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

const Views = () => {
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
          <TabList onChange={handleChange} aria-label="Clinical Tabs">
            <Tab
              label="Clinical Summary"
              value="1"
              classes={{ root: styles.MuiTabRoot }}
            />
            <Tab label="Conditions" value="2" />
            <Tab label="Interactions" value="3" />
            <Tab label="Nutrition" value="4" />
            <Tab label="Files" value="5" />
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
          <TabPanel value="3">
            <ErrorBoundary>
              <InteractionLogs />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="4">
            <ErrorBoundary>
              <Nutrition />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel value="5">
            <ErrorBoundary>
              <Files />
            </ErrorBoundary>
          </TabPanel>
        </div>
      </TabContext>
    </SortFilterProvider>
  )
}

export default Views
