import React, { useState, useEffect } from 'react'
import { always } from 'kremling'
import dayjs from 'dayjs'
import { Label, Text } from '@airtable/blocks/ui'
import ExpandIcon from 'src/assets/img/icons/arrows-diagonals-bltr.svg'
import Modal from 'src/components/modals'
import Tooltip from 'src/components/tooltip'
import { useSortFilter } from 'src/context/sort-filter'
import analytics from 'src/config/analytics'
import {
  useDateRangeFilter,
  makeFilterDataByDate,
} from 'src/context/date-range-filter'
import styles from './table.component.css'

type TableProps = {
  title: string
  columns: {
    name: string
    key: string
    format: string
    info?: string
    type?: string
    component?: any
  }[]
  data: any[]
  dateColumnKey: string
  modalFields?: string[]
  filterByDate?: boolean
}

function Table({
  title,
  columns,
  data,
  dateColumnKey,
  modalFields,
  filterByDate = false,
}: TableProps) {
  const {
    ops: { sort: globalDateSort },
  } = useSortFilter()
  const [displayedData, setDisplayedData] = useState<any[]>([])
  const [highlightedRow, setHighlightedRow] = useState<number>()
  const [clickedRow, setClickedRow] = useState<any>()
  const [modalOpen, setModalOpen] = useState(false)
  const [sortedData, setSortedData] = useState(data)
  const { currentRange } = useDateRangeFilter()

  const filterDataByDate = makeFilterDataByDate(filterByDate, currentRange)

  useEffect(() => {
    const sortAsc = (arr: any[]) => {
      return arr
        .slice()
        .sort((a, b) =>
          dayjs(b[dateColumnKey]).isBefore(a[dateColumnKey]) ? 1 : -1
        )
    }

    const sortDesc = (arr: any[]) => {
      return arr
        .slice()
        .sort((a, b) =>
          dayjs(b[dateColumnKey]).isAfter(a[dateColumnKey]) ? 1 : -1
        )
    }

    return globalDateSort === 'asc'
      ? setSortedData(filterDataByDate(sortAsc(data), dateColumnKey))
      : setSortedData(filterDataByDate(sortDesc(data), dateColumnKey))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dateColumnKey, globalDateSort, filterByDate, currentRange])

  useEffect(() => {
    setDisplayedData(
      sortedData.length > 3 ? sortedData.slice(0, 3) : sortedData
    )
  }, [sortedData])

  const displayMore = () => {
    const itemDisplayed = displayedData.length
    const itemsNotDisplayed = sortedData.length - itemDisplayed
    if (itemDisplayed < sortedData.length) {
      if (itemsNotDisplayed > 3) {
        setDisplayedData(sortedData.slice(0, itemDisplayed + 3))
      } else {
        setDisplayedData(sortedData)
      }
    }
  }

  const displayLess = () => {
    const itemDisplayed = displayedData.length
    if (displayedData.length > 3) {
      setDisplayedData(displayedData.slice(0, itemDisplayed - 3))
    }
  }

  const dateFormat = (dt: string) => {
    return isNaN(Date.parse(dt)) ? dt : dayjs(dt).format("DD MMM 'YY")
  }

  const format = (_dt: any) => {
    const dataType = typeof _dt
    switch (dataType) {
      case 'number':
        return _dt % 1 === 0 ? _dt : _dt.toFixed(2)
      case 'string':
        //
        return isNaN(parseInt(_dt)) ? _dt : dateFormat(_dt)
      default:
        return _dt
    }
  }

  const rowOnClick = (event: any, row: any) => {
    event.stopPropagation()
    setClickedRow(row)
    setModalOpen(true)
    analytics.track(`${title} Opened`)
  }

  return (
    <>
      <div className={`${styles.tableContainer} margin-top-8`}>
        {title && (
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>{title}</h5>
          </div>
        )}
        <table
          className={`${styles.table} margin-bottom-8`}
          data-testid="data-table"
        >
          <thead>
            <tr>
              <th style={{ opacity: 0 }}>icon</th>
              {columns.map((column) => (
                <th
                  key={column.name}
                  className={
                    column.info ? `${styles.th} ${styles.info}` : styles.th
                  }
                >
                  {column.info ? (
                    <Tooltip title={column.info}>
                      <div>
                        <p className="text-small text-bold">{column.name}</p>
                        <p className="text-tiny text-bold">{column.format}</p>
                      </div>
                    </Tooltip>
                  ) : (
                    <>
                      <p className="text-small text-bold">{column.name}</p>
                      <p className="text-tiny text-bold">{column.format}</p>
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.length ? (
              displayedData.map((row, i) => (
                <tr
                  key={`${row[dateColumnKey]}${i}`}
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
                    <Tooltip title="Expand Record">
                      <div>
                        <ExpandIcon />
                      </div>
                    </Tooltip>
                  </td>
                  {columns.map((column, idx) => {
                    return column.type === 'UI' && column.component ? (
                      <td
                        className={`text-normal ${styles.td}`}
                        key={`${column.key}${idx}`}
                      >
                        {row[column.key] ? (
                          <column.component data={row[column.key]} />
                        ) : null}
                      </td>
                    ) : (
                      <td
                        className={`text-normal ${styles.td}`}
                        key={`${column.key}${idx}`}
                      >
                        {format(row[column.key])?.toString() || '-'}
                      </td>
                    )
                  })}
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
          {sortedData.length > 3 &&
            sortedData.length !== displayedData.length && (
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
          fields={modalFields}
          heading={<h3>{title}</h3>}
        >
          {(modalFields || Object.keys(clickedRow))
            .filter(
              (key) =>
                key !== 'created_by' && key !== 'Member' && key in clickedRow
            )
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
                    style={{ wordWrap: 'break-word' }}
                  >
                    {typeof clickedRow[info] === 'object'
                      ? /* eslint-disable no-useless-escape */
                        JSON.stringify(clickedRow[info]).replace(
                          /[\[\]'{} "]+/g,
                          ''
                        )
                      : clickedRow[info]}
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
