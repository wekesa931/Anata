import React, { useState, useEffect } from 'react'
import { always } from 'kremling'
import ExpandIcon from '../../../assets/img/icons/arrows-diagonals-bltr.svg'
import styles from './table.component.css'

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

  return (
    <div className={styles.tableContainer}>
      <div className={`${styles.titleContainer} margin-top-8`}>
        <h5 className={styles.title}>{title}</h5>
      </div>
      <table className={`${styles.table} margin-bottom-8`}>
        <thead>
          <tr>
            <>
              <th style={{ opacity: 0 }}>expand_icon</th>
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
                      {row[key] || '-'}
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
  )
}

export default Table
