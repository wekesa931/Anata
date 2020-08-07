import React, { useState, useEffect } from 'react'
import { always } from 'kremling'
import dayjs from 'dayjs'
import { Label, Text } from '@airtable/blocks/ui'
import ExpandIcon from '../../../assets/img/icons/arrows-diagonals-bltr.svg'
import styles from './table.component.css'
import Modal from '../modals/modal.component'

type TableProps = {
  title: string
  columns: {
    name: string
    key: string
    format: string
  }[]
  data: any[]
}

const Table = ({ title, columns, data }: TableProps) => {
  const [displayedData, setDisplayedData] = useState<any[]>([])
  const [highlightedRow, setHighlightedRow] = useState<number>()
  const [clickedRow, setClickedRow] = useState<any>()
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setDisplayedData(data.length > 3 ? data.slice(0, 3) : data)
  }, [data])

  const displayMore = () => {
    const itemDisplayed = displayedData.length
    const itemsNotDisplayed = data.length - itemDisplayed
    if (itemDisplayed < data.length) {
      if (itemsNotDisplayed > 3) {
        setDisplayedData(data.slice(0, itemDisplayed + 3))
      } else {
        setDisplayedData(data)
      }
    }
  }

  const displayLess = () => {
    const itemDisplayed = displayedData.length
    if (displayedData.length > 3) {
      setDisplayedData(displayedData.slice(0, itemDisplayed - 3))
    }
  }

  const dateFormat = (unixms: number) => {
    return dayjs(unixms).format("DD MMM 'YY")
  }

  const format = (_data: any) => {
    const dataType = typeof _data
    switch (dataType) {
      case 'number':
        return _data.toFixed(1)
      case 'string':
        return isNaN(Date.parse(_data)) ? _data : dateFormat(Date.parse(_data))
      default:
        return _data
    }
  }

  const rowOnClick = (event: any, row: any) => {
    event.stopPropagation()
    setClickedRow(row)
    setModalOpen(true)
  }

  return (
    <>
      <div className={`${styles.tableContainer} margin-top-8`}>
        {title && (
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>{title}</h5>
          </div>
        )}
        <table className={`${styles.table} margin-bottom-8`}>
          <thead>
            <tr>
              <>
                <th style={{ opacity: 0 }}>icon</th>
                {columns.map((column) => (
                  <th key={column.name} className={styles.th}>
                    <p className="text-small text-bold">{column.name}</p>
                    <p className="text-tiny text-bold">{column.format}</p>
                  </th>
                ))}
              </>
            </tr>
          </thead>
          <tbody>
            {displayedData.length ? (
              displayedData.map((row, i) => (
                <tr
                  key={row}
                  onMouseEnter={() => setHighlightedRow(i)}
                  onMouseLeave={() => setHighlightedRow(undefined)}
                  onClick={(e) => rowOnClick(e, row)}
                  className={styles.dataRow}
                >
                  <td
                    className={always(styles.td).toggle(
                      styles.visible,
                      styles.hidden,
                      highlightedRow === i
                    )}
                  >
                    <ExpandIcon />
                  </td>
                  {columns
                    .map((column) => column.key)
                    .map((key) => (
                      <td className={`text-normal ${styles.td}`} key={key}>
                        {format(row[key]) || '-'}
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr className={`${styles.emptyRow} text-normal`}>
                <td className={styles.td} colSpan={columns.length + 1}>
                  No values available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.pagination}>
          {data.length > 3 && data.length !== displayedData.length && (
            <button
              className={`btn-unstyled ${styles.tableBtn}`}
              onClick={displayMore}
            >
              More
            </button>
          )}
          {displayedData.length > 3 && (
            <button
              className={`btn-unstyled ${styles.tableBtn}`}
              onClick={displayLess}
            >
              Less
            </button>
          )}
        </div>
      </div>
      {clickedRow && (
        <Modal
          open={modalOpen}
          setModalOpen={setModalOpen}
          heading={`${title}`}
        >
          {Object.keys(clickedRow)
            .filter((key) => key !== 'created_by' && key !== 'Member')
            .map((info, i) => {
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
                    {clickedRow[info]}
                  </Text>
                </div>
              )
            })}
        </Modal>
      )}
    </>
  )
}

export default Table
