import React, { useState, useEffect } from 'react'
import { toggle } from 'kremling'
import dayjs from 'dayjs'
import ExpandIcon from 'src/assets/img/icons/arrows-diagonals-bltr.svg'
import Tooltip from 'src/components/tooltip'
import { useSortFilter } from 'src/context/sort-filter'
import analytics from 'src/config/analytics'
import AirtableField from 'src/types/airtable-field'
import {
  useDateRangeFilter,
  makeFilterListDataByDate,
} from 'src/context/date-range-filter'
import ListModal from './list-modal.component'
import styles from './list.module.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
  filterByDate?: boolean
  isItemEditable?: (item?: { name: string; data: any }) => boolean
  selectedTasks?: any[]
}

function List({
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
  filterByDate = false,
  isItemEditable,
  selectedTasks,
}: ListProps) {
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
  const { currentRange } = useDateRangeFilter()

  const filterDataByDate = makeFilterListDataByDate(filterByDate, currentRange)

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
      ? setSortedList(
          filterDataByDate(sortAsc(list), dateColumnKey || 'created_at')
        )
      : setSortedList(
          filterDataByDate(sortDesc(list), dateColumnKey || 'created_at')
        )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, dateColumnKey, globalDateSort, filterByDate, currentRange])

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

  const isListItemEditable = () => {
    return editable && isItemEditable && isItemEditable(openItem)
  }

  /**
   * replace all mistyped line breaks \\n with correct one \n
   * replace all line breaks with markdown line breaks (\n) to (  \n)
   * @param text string
   * @returns markdown
   */
  const processMarkdown = (text: string) =>
    text.replace(/\\n/g, '\n').replace(/\n/g, '  \n')

  return (
    <div style={{ margin: '8px 0px' }}>
      {displayedData.length > 0 ? (
        <>
          {displayedData.map((item: any, i) => {
            return (
              item &&
              item.data && (
                <button
                  style={{
                    width: '100%',
                    textAlign: 'start',
                  }}
                  className="btn-unstyled"
                  onClick={(e) => {
                    e?.stopPropagation()
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
                  <div
                    className={`${styles.notes} overflow-auto bg-${
                      selectedTasks?.some((task) => task.recordid === item.id)
                        ? 'blue-10'
                        : 'white'
                    }`}
                  >
                    {modalTitle !== 'Task' && (
                      <Tooltip title="Expand Record">
                        <div
                          className={`${toggle(
                            styles.showIcon,
                            styles.hideIcon,
                            isHovering === i
                          )} w-3 mr-1`}
                        >
                          <ExpandIcon />
                        </div>
                      </Tooltip>
                    )}
                    <div className="flex-1">
                      {!conditionComponent ? (
                        <div
                          className={`text-normal ${
                            item?.data?.__typename === 'InteractionType' &&
                            'h-40'
                          }`}
                        >
                          {item?.data?.__typename === 'InteractionType' ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {processMarkdown(item.name)}
                            </ReactMarkdown>
                          ) : (
                            item.name
                          )}
                        </div>
                      ) : (
                        <div>
                          {item.data.Condition === 'Other'
                            ? item.data['Other, specify']
                            : `${
                                item.data[
                                  'Name (from Conditions master list)'
                                ] || `${item.data.Condition}`
                              }, `}
                          {item.data['Starting clinical status'] && (
                            <>
                              <b>Starting Clinical Status: </b>
                              {item.data['Starting clinical status']},
                            </>
                          )}
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
        <ListModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          openItem={openItem}
          modalTitle={modalTitle || openItem.name}
          editable={editable}
          onEdit={onEdit}
          actions={listItemActions?.bind(null, openItem)}
          editableFields={editableFields}
          showEditIcon={isListItemEditable()}
        />
      )}
    </div>
  )
}

export default List
