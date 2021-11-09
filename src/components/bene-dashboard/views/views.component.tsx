import React, { useState } from 'react'
import Tabs from '../../utils/tabs/tabs.component'
import Clinical from './clinical/clinical.component'
import Icon from '../../utils/icon/icon.component'
import styles from './views.component.css'
import {
  SortFilterProvider,
  useSortFilter,
} from '../../../context/sort-filter-views.context'
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
  return (
    <SortFilterProvider>
      <div className="full-height">
        <Tabs FilterComponent={FilterComponent}>
          <div label="Clinical Summary">
            <ErrorBoundary>
              <Clinical />
            </ErrorBoundary>
          </div>
          <div label="Conditions">
            <ErrorBoundary>
              <Conditions />
            </ErrorBoundary>
          </div>
          <div label="Interactions">
            <ErrorBoundary>
              <InteractionLogs />
            </ErrorBoundary>
          </div>
          <div label="Nutrition">
            <ErrorBoundary>
              <Nutrition />
            </ErrorBoundary>
          </div>

          <div label="Files">
            <ErrorBoundary>
              <Files />
            </ErrorBoundary>
          </div>
        </Tabs>
      </div>
    </SortFilterProvider>
  )
}

export default Views
