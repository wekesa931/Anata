import React, { useState, useEffect } from 'react'
import { toggle } from 'kremling'
import { Label, Text } from '@airtable/blocks/ui'
import styles from './list.component.css'
import ExpandIcon from '../../../assets/img/icons/arrows-diagonals-bltr.svg'
import Modal from '../modals/modal.component'

type ListProps = {
  list: { name: string; data: any }[]
  getTopLeftText?: (data: any) => string
  getTopRightText?: (data: any) => string
  paginate?: boolean
  modalTitle?: string
  emptyListText?: string
}

const List = ({
  list,
  getTopLeftText,
  getTopRightText,
  modalTitle,
  paginate = false,
  emptyListText = 'No data available',
}: ListProps) => {
  const [isHovering, setIsHovering] = useState<number>()
  const [openItem, setOpenItem] = useState<{ name: string; data: any }>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [displayedData, setDisplayedData] = useState<
    { name: string; data: any }[]
  >([])

  useEffect(() => {
    if (paginate && list.length > 3) {
      return setDisplayedData(list.slice(0, 3))
    }
    return setDisplayedData(list)
  }, [list, paginate])

  const displayObject = (obj: any) => {
    if (Array.isArray(obj)) {
      return obj.join(',')
    }
    return Object.keys(obj).map((key) => `${key}: ${obj[key]}`)
  }

  const displayMore = () => {
    const itemDisplayed = displayedData.length
    const itemsNotDisplayed = list.length - itemDisplayed
    if (itemDisplayed < list.length) {
      if (itemsNotDisplayed > 3) {
        setDisplayedData(list.slice(0, itemDisplayed + 3))
      } else {
        setDisplayedData(list)
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
    <div>
      {displayedData ? (
        <>
          {displayedData.map((item, i) => {
            return (
              item.data && (
                <button
                  style={{ margin: '8px 0', width: '100%', textAlign: 'start' }}
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
                    <p className="text-tiny">
                      {getTopLeftText && getTopLeftText(item.data)}
                    </p>
                    <p className="text-tiny">
                      {getTopRightText && getTopRightText(item.data)}
                    </p>
                  </div>
                  <div className={styles.notes}>
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
                    <div>
                      <p className="text-normal">{item.name}</p>
                    </div>
                  </div>
                </button>
              )
            )
          })}
          <div className={styles.pagination}>
            {paginate &&
              list.length > 3 &&
              list.length !== displayedData.length && (
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
