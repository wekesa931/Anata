import React, { useState, useEffect } from 'react'
import { toggle } from 'kremling'
import { Label, Text } from '@airtable/blocks/ui'
import dayjs from 'dayjs'
import styles from './list.component.css'
import ExpandIcon from '../../../assets/img/icons/arrows-diagonals-bltr.svg'
import Modal from '../modals/modal.component'
import Tooltip from '../tooltip/tooltip.component'
import { useDateSort } from '../../../context/sort.context'

type ListProps = {
  list: { name: string; data: any }[]
  getTopLeftText?: (data: any) => string | JSX.Element | null
  getTopRightText?: (data: any) => string | JSX.Element | null
  paginate?: boolean
  modalTitle?: string
  emptyListText?: string
  dateColumnKey?: string
}

const List = ({
  list,
  getTopLeftText,
  getTopRightText,
  modalTitle,
  dateColumnKey,
  paginate = false,
  emptyListText = 'No data available',
}: ListProps) => {
  const [isHovering, setIsHovering] = useState<number>()
  const [openItem, setOpenItem] = useState<{ name: string; data: any }>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [displayedData, setDisplayedData] = useState<
    { name: string; data: any }[]
  >([])
  const [sortedList, setSortedList] = useState(list)
  const { sort: globalDateSort } = useDateSort()

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
    if (paginate && sortedList.length > 3) {
      return setDisplayedData(sortedList.slice(0, 3))
    }
    return setDisplayedData(sortedList)
  }, [sortedList, paginate])

  useEffect(() => {
    if (paginate && sortedList.length > 3) {
      return setDisplayedData(sortedList.slice(0, 3))
    }
    return setDisplayedData(sortedList)
  }, [paginate, sortedList])

  const displayObject = (obj: any) => {
    if (Array.isArray(obj)) {
      return obj.join(',')
    }
    return Object.keys(obj).map((key) => `${key}: ${obj[key]}`)
  }

  const displayMore = () => {
    const itemDisplayed = displayedData.length
    const itemsNotDisplayed = sortedList.length - itemDisplayed
    if (itemDisplayed < sortedList.length) {
      if (itemsNotDisplayed > 3) {
        setDisplayedData(sortedList.slice(0, itemDisplayed + 3))
      } else {
        setDisplayedData(sortedList)
      }
    }
  }

  const displayLess = () => {
    const itemDisplayed = displayedData.length
    if (displayedData.length > 3) {
      setDisplayedData(displayedData.slice(0, itemDisplayed - 3))
    }
  }

  return (
    <div style={{ margin: '8px' }}>
      {displayedData.length > 0 ? (
        <>
          <div data-testid="data-list">
            {displayedData.map((item, i) => {
              return (
                item &&
                item.data && (
                  <button
                    style={{
                      margin: '8px 0',
                      width: '100%',
                      textAlign: 'start',
                    }}
                    className="btn-unstyled"
                    onClick={() => {
                      setOpenItem(item)
                      setModalOpen(true)
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
                        <div className="text-normal">{item.name}</div>
                      </div>
                    </div>
                  </button>
                )
              )
            })}
          </div>
          <div className={styles.pagination}>
            {paginate &&
              sortedList.length > 3 &&
              sortedList.length !== displayedData.length && (
                <button
                  className={`btn-unstyled ${styles.tableBtn}`}
                  onClick={displayMore}
                >
                  More
                </button>
              )}
            {paginate && displayedData.length > 3 && (
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
        <Modal
          open={modalOpen}
          setModalOpen={setModalOpen}
          heading={modalTitle || openItem.name}
        >
          {openItem.data &&
            Object.keys(openItem.data).map((info, i) => {
              return (
                <div key={info} style={{ margin: '16px 0' }}>
                  <Label htmlFor={`input${i}`}>{info}</Label>
                  <Text
                    variant="paragraph"
                    id={`input${i}`}
                    border="1px solid whitesmoke"
                    backgroundColor="whitesmoke"
                    padding="8px"
                    borderRadius="4px"
                  >
                    {typeof openItem.data[info] === 'object'
                      ? displayObject(openItem.data[info])
                      : openItem.data[info]}
                  </Text>
                </div>
              )
            })}
        </Modal>
      )}
    </div>
  )
}

export default List
