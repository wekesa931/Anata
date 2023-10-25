import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React, { useMemo, useState } from 'react'
import { Order, getComparator, stableSort } from 'src/utils/sort/stable'
import EmptyDataIcon from 'src/assets/img/icons/empty-data.svg'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import _ from 'lodash'
import {
  useDateRangeFilter,
  makeFilterDataByDate,
} from 'src/context/date-range-filter'
import { useModuleAnalytics } from 'src/modules/analytics'
import { ArrowRight } from '@mui/icons-material'

export type Column = {
  label: string
  units?: string
  sortable?: boolean
  id: string
  format?: (value: any) => string
  type?: 'date' | 'number' | 'string'
  valueComponent?: React.ComponentType<{ value: any }>
  width?: string
  helperText?: string | React.ReactNode
  cellHeperText?: React.ComponentType<{ value: any }>
}

type SortableTableHeadProps = {
  columns: readonly Column[]
  order: Order
  orderBy: string
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
}
function SortableTableHead(props: SortableTableHeadProps) {
  const { columns, orderBy, order, onRequestSort } = props
  const [helperTextCoumnId, setHelperTextCoumnId] = useState<string | null>(
    null
  )
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMouseEnter = (event: any, columnId: string) => {
    setHelperTextCoumnId(columnId)
    setAnchorEl(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setHelperTextCoumnId(null)
    setAnchorEl(null)
  }

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            align="left"
            sortDirection={orderBy === column.id ? order : false}
            className={`font-bold text-white p-0 text-left py-2 bg-dark-blue-70 hover:text-white align-top ${
              index === columns.length - 1
                ? 'rounded-tr-lg'
                : index === 0
                ? 'rounded-tl-lg pl-2'
                : ''
            }`}
            sx={{
              width: column.width || `${100 / columns.length}%`,
            }}
            onMouseEnter={(e) => handleMouseEnter(e, column.id)}
            onMouseLeave={handleMouseLeave}
          >
            {column.sortable ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'desc'}
                onClick={createSortHandler(column.id)}
                className="text-white"
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    color: 'white !important',
                  },
                }}
              >
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
                <div className="text-xs">
                  {column.label}
                  {column.units && ` (${column.units})`}
                </div>
              </TableSortLabel>
            ) : (
              <>
                <p className="text-xs">
                  {column.label}
                  {column.units && ` (${column.units})`}
                </p>
              </>
            )}
          </TableCell>
        ))}
      </TableRow>
      <Popper open={!!helperTextCoumnId} anchorEl={anchorEl} className="z-20">
        {columns.find((column) => column.id === helperTextCoumnId)?.helperText}
      </Popper>
    </TableHead>
  )
}

function RowDetails({ data }: { data: any }) {
  const pascalToTitle = (str: string) => {
    return _.startCase(_.toLower(str))
  }

  const isObject = (value: any): value is Record<string, any> =>
    typeof value === 'object' && value !== null

  const extractValueFromObject = (obj: Record<string, any>): any => {
    if ('value' in obj) {
      return obj.value
    }
    return JSON.stringify(obj)
  }

  const getValueFromKey = (key: string) => {
    const entry = data[key]
    let value = entry ?? '-'
    let textColor = 'var(--dark-blue-100)'

    if (entry === null) return { value, textColor }

    if (isObject(entry)) {
      value = extractValueFromObject(entry)
      textColor = entry?.textColor
    }

    return {
      value,
      textColor,
    }
  }

  return (
    <Box sx={{ margin: 1 }} className="ww-full">
      <p className="text-dark-blue-100 font-bold text-base">More details</p>
      <Divider className="my-2" />
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(data).map((key, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-dark-blue-100 font-bold text-sm">
              {pascalToTitle(key)}
            </p>
            <p
              className="text-sm break-words"
              style={{ color: getValueFromKey(key)?.textColor }}
            >
              {getValueFromKey(key)?.value}
            </p>
          </div>
        ))}
      </div>
    </Box>
  )
}

type DetailedRowProps = {
  columns: readonly Column[]
  row: any
  tableName: string
}

function DataTableDetailedRow({ columns, row, tableName }: DetailedRowProps) {
  const getValueAndColor = (columnId: string) => {
    let value = row[columnId]?.value ?? row[columnId]
    if (typeof value === 'object' && !row[columnId]?.value) {
      value = '-'
    }
    const textColor =
      row[columnId]?.textColor || row[columnId]?.reference_range?.text_color

    return {
      value,
      textColor,
    }
  }
  const [open, setOpen] = useState(false)
  const showDetails = Object.keys(row).length > columns.length
  const { trackRowDetailsAccessed } = useModuleAnalytics()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedColum, setSelectedColumn] = useState<any>(null)

  const handleMouseEnter = (event: any, columnId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedColumn(columns.find((column) => column.id === columnId))
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
    setSelectedColumn(null)
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {columns.map((column, index) => {
          const { value, textColor } = getValueAndColor(column.id)
          return (
            <TableCell
              key={column.id}
              align="left"
              className="p-2 bg-table-col-grey border-none text-left"
              sx={{
                color: textColor || 'var(--dark-blue-100)',
                width: column?.width || `${100 / columns.length}%}`,
              }}
            >
              <div
                onMouseEnter={(e: any) => handleMouseEnter(e, column.id)}
                onMouseLeave={handleMouseLeave}
              >
                {index === 0 && (
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setOpen(!open)
                      if (!open) trackRowDetailsAccessed(tableName, row)
                    }}
                  >
                    {open ? <ArrowDropUpIcon /> : <ArrowRight />}
                  </IconButton>
                )}
                {column.valueComponent ? (
                  <column.valueComponent value={row} />
                ) : column.format ? (
                  column.format(value)
                ) : (
                  value
                )}
              </div>
            </TableCell>
          )
        })}
      </TableRow>
      <Popper
        open={!!anchorEl || selectedColum}
        anchorEl={anchorEl}
        className="z-20"
      >
        {selectedColum?.cellHeperText && (
          <selectedColum.cellHeperText value={row} />
        )}
      </Popper>
      {showDetails && (
        <TableRow>
          <TableCell colSpan={columns.length + 1} className="py-0">
            <Collapse in={open} timeout="auto" unmountOnExit>
              <RowDetails data={row} />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

function EmptyData({ title }: { title?: string }) {
  return (
    <div className="flex flex-col justify-start items-center font-rubik my-2">
      <EmptyDataIcon />
      <p className="text-base font-medium">No data</p>
      <p className="text-sm text-dark-blue-100">
        {' '}
        Looks like there are no {title || 'data'} for this member
      </p>
      <p>Please check back again later</p>
    </div>
  )
}

type DataTableProps = {
  data: any[]
  columns: readonly Column[]
  title: string
  defaultSortColumn?: string
  defaultFilterColumn?: string
  filterByDate?: boolean
  dateColumnKey?: string
}

function DataTable({
  data,
  columns,
  title,
  defaultSortColumn,
  filterByDate = false,
  dateColumnKey,
}: DataTableProps) {
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<string>(defaultSortColumn || '')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { currentRange } = useDateRangeFilter()

  const filterDataByDate = makeFilterDataByDate(filterByDate, currentRange)
  const { trackFieldNameSorted, trackRowsPerPageSelected, trackPageSelected } =
    useModuleAnalytics()

  const visibleRows = useMemo(() => {
    const orderingColumn = columns.find((column) => column.id === orderBy)

    // filter data by range if specified
    const rangeFilteredData = filterByDate
      ? filterDataByDate(data, dateColumnKey || 'created_at')
      : data

    return stableSort(
      rangeFilteredData,
      getComparator(order, orderBy, orderingColumn?.type)
    )?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy, data, page, rowsPerPage, currentRange])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    trackPageSelected(title, newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    trackRowsPerPageSelected(title, +event.target.value)
    trackPageSelected(title, 0)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    trackFieldNameSorted(title, property, isAsc ? 'Descending' : 'Ascending')
  }

  return (
    <div className="w-full overflow-hidden font-rubik">
      <TableContainer>
        <Table
          stickyHeader
          aria-label="data-table"
          className="border-spacing-y-2"
        >
          <SortableTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows?.length ? (
              <>
                {visibleRows.map((row: any, index) => (
                  <DataTableDetailedRow
                    key={index}
                    columns={columns}
                    row={row}
                    tableName={title}
                  />
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="p-0">
                  <EmptyData title={title} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="text-dark-blue-100 font-rubik mt-2 bg-table-col-grey"
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default DataTable
