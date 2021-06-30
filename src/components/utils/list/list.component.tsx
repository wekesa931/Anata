import React, { useState, useEffect } from 'react'
import { toggle } from 'kremling'
import dayjs from 'dayjs'
import styles from './list.component.css'
import ExpandIcon from '../../../assets/img/icons/arrows-diagonals-bltr.svg'
import Tooltip from '../tooltip/tooltip.component'
import { useSortFilter } from '../../../context/sort-filter-views.context'
import ListModal from './list-modal.component'
import analytics from '../../../helpers/segment'
import AirtableField from '../../../types/airtable-field'

type ListProps = {
  list: { name: string; data: any }[]
  getTopLeftText?: (data: any) => string | JSX.Element | null
  getTopRightText?: (data: any) => string | JSX.Element | null
  paginate?: boolean
  modalTitle?: string
  defaultNoElements?: number
  elementIncrement?: number
  emptyListText?: string
  dateColumnKey?: string
  editable?: boolean
  onEdit?: (values: { id: string; fields: any }) => Promise<any>
  listItemActions?: (openItem: any, callback: () => null) => JSX.Element | null
  editableFields?: AirtableField[]
  dueDate?: (data: any) => string | JSX.Element | null
  conditionComponent?: boolean
}

const List = ({
  list,
  getTopLeftText,
  getTopRightText,
  modalTitle,
  dateColumnKey,
  defaultNoElements = 3,
  elementIncrement = 3,
  paginate = false,
  emptyListText = 'No data available',
  editable = false,
  onEdit,
  listItemActions,
  editableFields,
  conditionComponent,
}: ListProps) => {
  const [isHovering, setIsHovering] = useState<number>()
  const [openItem, setOpenItem] = useState<{
    name: string
    id: string
    data: any
  }>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [displayedData, setDisplayedData] = useState<
    { name: string; data: any }[]
  >([])
  const [sortedList, setSortedList] = useState(list)
  const {
    ops: { sort: globalDateSort },
  } = useSortFilter()

  useEffect(() => {
    const sortAsc = (arr: any[]) => {
      const sortedArr = dateColumnKey
        ? arr
            .slice()
            .sort((a, b) =>
              dayjs(b.data[dateColumnKey]).isBefore(a.data[dateColumnKey])
                ? 1
                : -1
            )
        : arr.slice()
      return sortedArr
    }

    const sortDesc = (arr: any[]) => {
      const sortedArr = dateColumnKey
        ? arr
            .slice()
            .sort((a, b) =>
              dayjs(b.data[dateColumnKey]).isAfter(a.data[dateColumnKey])
                ? 1
                : -1
            )
        : arr.slice()
      return sortedArr
    }
    return globalDateSort === 'asc'
      ? setSortedList(sortAsc(list))
      : setSortedList(sortDesc(list))
  }, [list, dateColumnKey, globalDateSort])

  useEffect(() => {
    if (paginate && sortedList.length > defaultNoElements) {
      return setDisplayedData(sortedList.slice(0, defaultNoElements))
    }
    return setDisplayedData(sortedList)
  }, [sortedList, paginate, defaultNoElements])

  const displayMore = () => {
    const itemDisplayed = displayedData.length
    const itemsNotDisplayed = sortedList.length - itemDisplayed
    if (itemDisplayed < sortedList.length) {
      if (itemsNotDisplayed > elementIncrement) {
        setDisplayedData(sortedList.slice(0, itemDisplayed + elementIncrement))
      } else {
        setDisplayedData(sortedList)
      }
    }
  }

  const displayLess = () => {
    const itemDisplayed = displayedData.length
    if (displayedData.length > elementIncrement) {
      setDisplayedData(displayedData.slice(0, itemDisplayed - elementIncrement))
    }
  }

  return (
    <div style={{ margin: '8px 0px' }}>
      {displayedData.length > 0 ? (
        <>
          {displayedData.map((item, i) => {
            return (
              item &&
              item.data && (
                <button
                  style={{
                    width: '100%',
                    textAlign: 'start',
                  }}
                  className="btn-unstyled"
                  onClick={() => {
                    setOpenItem(item)
                    setModalOpen(true)
                    analytics.track(`${modalTitle} Opened`)
                  }}
                  key={i}
                  onMouseEnter={() => setIsHovering(i)}
                  onMouseLeave={() => setIsHovering(undefined)}
                >
                  <div className={styles.meta}>
                    <div className="text-tiny">
                      {getTopLeftText && getTopLeftText(item.data)}
                    </div>
                    <div className="text-tiny">
                      {getTopRightText && getTopRightText(item.data)}
                    </div>
                  </div>
                  <div className={styles.notes}>
                    <Tooltip title="Expand Record">
                      <div
                        style={{ width: '12px', marginRight: '6px' }}
                        className={toggle(
                          styles.showIcon,
                          styles.hideIcon,
                          isHovering === i
                        )}
                      >
                        <ExpandIcon />
                      </div>
                    </Tooltip>
                    <div style={{ flex: 1 }}>
                      {!conditionComponent ? (
                        <div className="text-normal">{item.name}</div>
                      ) : (
                        <div>
                          {item.data.Condition === 'Other'
                            ? item.data['Other, specify']
                            : `${item.data.Condition}, `}
                          {item.data['Starting clinical status'] && (
                            <>
                              <b>Starting Clinical Status: </b>
                              {item.data['Starting clinical status']},
                            </>
                          )}
                          {item.data['Current clinical status'] && (
                            <>
                              <b>Current Clinical Status: </b>
                              {item.data['Current clinical status']},
                            </>
                          )}
                          <b>Condition Status:</b>{' '}
                          {item.data['Condition Status']}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            )
          })}
          <div className={styles.pagination}>
            {paginate &&
              sortedList.length > defaultNoElements &&
              sortedList.length !== displayedData.length && (
                <button
                  className={`btn-unstyled ${styles.tableBtn}`}
                  onClick={displayMore}
                >
                  More
                </button>
              )}
            {paginate && displayedData.length > defaultNoElements && (
              <button
                className={`btn-unstyled ${styles.tableBtn}`}
                onClick={displayLess}
              >
                Less
              </button>
            )}
          </div>
        </>
      ) : (
        <div className={styles.notes}>
          <p className="text-normal">{emptyListText}</p>
        </div>
      )}
      {modalOpen && openItem && (
        <>
          <ListModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            openItem={openItem}
            modalTitle={modalTitle || openItem.name}
            editable={editable}
            onEdit={onEdit}
            actions={listItemActions?.bind(null, openItem)}
            editableFields={editableFields}
          />
        </>
      )}
    </div>
  )
}

export default List
