import React, { useState } from 'react'
import Tabs from '../../utils/tabs/tabs.component'
import Clinical from './clinical/clinical.component'
import Icon from '../../utils/icon/icon.component'
import styles from './views.component.css'
import Radio from '../../utils/radio/radio.component'
import { DateSortProvider, useDateSort } from '../../../context/sort.context'
import InteractionLogs from './interaction-logs/interaction-logs.component'
import Nutrition from './nutrition/nutrition.component'
import ErrorBoundary from '../../error-boundary/error-boundary.component'

type SortDialogProps = {
  onClose: () => void
}

const SortDialog = ({ onClose }: SortDialogProps) => {
  const { sort, setSort } = useDateSort()
  const sortOptions = [
    {
      name: 'desc',
      label: 'Sort most recent date first (descending)',
      value: 'desc',
    },
    {
      name: 'asc',
      label: 'Sort oldest date first (ascending)',
      value: 'asc',
    },
  ]
  const onSortChange = ($event: Event, sortDir: any) => {
    $event.preventDefault()
    setSort(sortDir)
  }
  return (
    <div className={styles.sortContainer}>
      <div
        className="d-flex"
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h6 className="text-blue-dark">Sort and Filter Views</h6>
        <button className="btn-icon" onClick={onClose}>
          <Icon
            name="close_16"
            height={16}
            width={16}
            fill="var(--blue-base)"
          />
        </button>
      </div>
      <hr />
      <form>
        {sortOptions.map((option) => (
          <Radio
            {...option}
            onChange={onSortChange}
            checked={sort === option.value}
            key={option.value}
          />
        ))}
      </form>
    </div>
  )
}

const SortButton = ({ openSortDialog, setOpenSortDialog }: any) => {
  const { sort } = useDateSort()
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

const Views = () => {
  const [openSortDialog, setOpenSortDialog] = useState(false)
  return (
    <DateSortProvider>
      <div className="full-height">
        <div
          className="d-flex p-relative"
          style={!openSortDialog ? { alignItems: 'center' } : {}}
        >
          <h2>Views</h2>
          <div
            className="d-flex p-absolute"
            style={{ left: '80px' }}
            key={openSortDialog ? 1 : 0}
          >
            <div>
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
        <Tabs>
          <div label="Clinical Summary">
            <ErrorBoundary>
              <Clinical />
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
        </Tabs>
      </div>
    </DateSortProvider>
  )
}

export default Views
