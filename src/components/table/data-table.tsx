import {
  Box,
  Button,
  Chip,
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
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React, { useEffect, useMemo, useState } from 'react'
import { Order, getComparator, stableSort } from 'src/utils/sort/stable'
import EmptyDataIcon from 'src/assets/img/icons/empty-data.svg?react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import _, { isEmpty } from 'lodash'
import {
  useDateRangeFilter,
  makeFilterDataByDate,
} from 'src/context/date-range-filter'
import { useModuleAnalytics } from 'src/modules/analytics'
import { ArrowDropDown, ArrowRight } from '@mui/icons-material'
import { toTitleCase } from 'src/utils/text-utils'
import Loading from 'src/components/loaders/centered'

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
                className="text-white flex items-center"
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    color: 'white !important',
                  },
                  paddingLeft: index === 0 ? '1.5rem !important' : 0,
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
  canExpandRow?: boolean
}

function DataTableDetailedRow({
  columns,
  row,
  tableName,
  canExpandRow = true,
}: DetailedRowProps) {
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
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {columns.map((column, index) => {
          const { value, textColor } = getValueAndColor(column.id)
          return (
            <TableCell
              key={column.id}
              align="left"
              className="p-2 pl-0 bg-table-col-grey border-none text-left text-xs cursor-pointer"
              sx={{
                color: textColor || 'var(--dark-blue-100)',
                width: column?.width || `${100 / columns.length}%}`,
                paddingLeft:
                  index === 0 && !canExpandRow ? '2rem !important' : 0,
                borderBottom: 'none !important',
              }}
            >
              <div
                onMouseEnter={(e: any) => handleMouseEnter(e, column.id)}
                onMouseLeave={handleMouseLeave}
              >
                {index === 0 && canExpandRow && (
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

type GroupedRowProps = {
  columns: readonly Column[]
  data: any[]
  defaultExpanded?: boolean
  groupTitle: string
  title: string
}

function GroupedRow({
  columns,
  data,
  defaultExpanded = true,
  groupTitle,
  title,
}: GroupedRowProps) {
  const [expanded, setExpanded] = useState<boolean>(true)
  const { trackTableRowExpandToggled } = useModuleAnalytics()

  useEffect(() => {
    setExpanded(defaultExpanded)
  }, [defaultExpanded])

  const getValue = (columnId: string, row: any) => {
    let value = row[columnId]?.value ?? row[columnId]
    if (typeof value === 'object' && !row[columnId]?.value) {
      value = '-'
    }
    return value
  }

  return (
    <TableBody>
      <TableRow
        onClick={() => {
          trackTableRowExpandToggled(title, groupTitle, !expanded)
          setExpanded(!expanded)
        }}
        data-testid={`group-row-title-${groupTitle}`}
      >
        <TableCell colSpan={columns.length + 1} className="py-0">
          <div className="flex gap-2 items-center pl-0">
            <IconButton
              aria-label="group-expand"
              size="small"
              className="text-blue-btn"
            >
              {expanded ? <ArrowDropDown /> : <ArrowRight />}
            </IconButton>
            <p className="text-base font-medium text-blue-btn">
              {toTitleCase(groupTitle)}
            </p>
            <Chip
              className="text-sm text-white font-medium rounded-md bg-blue-btn h-4"
              label={data.length}
              size="small"
            />
          </div>
        </TableCell>
      </TableRow>
      {expanded && (
        <>
          {data.map((row: any, index) => (
            <TableRow
              key={`grouped-row-item-${index}`}
              className="pl-2"
              data-testid="grouped-row"
            >
              {columns.map((column, colIndex) => {
                return (
                  <TableCell
                    key={`column-${column?.id}-${colIndex}`}
                    align="left"
                    className={`p-2 bg-table-col-grey border-none text-left text-xs ${
                      colIndex === 0 ? 'pl-6' : 'pl-0'
                    }'}`}
                    sx={{
                      width: column?.width || `${100 / columns.length}%}`,
                    }}
                  >
                    {column.valueComponent ? (
                      <column.valueComponent value={row} />
                    ) : column.format ? (
                      column.format(getValue(column.id, row))
                    ) : (
                      <>{getValue(column.id, row)}</>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </>
      )}
    </TableBody>
  )
}

type DataTableProps = {
  data: any[]
  columns: readonly Column[]
  title: string
  titleComponent?: React.ReactNode
  defaultSortColumn?: string
  defaultFilterColumn?: string
  filterByDate?: boolean
  dateColumnKey?: string
  groupColumns?: string[]
  defaultGroupColumn?: string
  loading?: boolean
  filterControl?: React.ReactNode
  groupSortFunction?: (data: any, groupingColumn?: string) => any
  dataSortFunction?(data: any, comparator: (a: any, b: any) => number): any
  canExpandRow?: boolean
}

function DataTable({
  data,
  columns,
  title,
  defaultSortColumn,
  filterByDate = false,
  dateColumnKey,
  groupColumns,
  defaultGroupColumn,
  titleComponent,
  loading = false,
  filterControl,
  groupSortFunction,
  dataSortFunction,
  canExpandRow = true,
}: DataTableProps) {
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<string>(defaultSortColumn || '')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { currentRange } = useDateRangeFilter()

  const filterDataByDate = makeFilterDataByDate(filterByDate, currentRange)
  const {
    trackFieldNameSorted,
    trackRowsPerPageSelected,
    trackPageSelected,
    trackTableGrouped,
    trackTableGroupAllExpandToggled,
  } = useModuleAnalytics()

  const sortData = (unsorted: any) => {
    const orderingColumn = columns.find((column) => column.id === orderBy)
    if (dataSortFunction)
      return dataSortFunction(
        unsorted,
        getComparator(order, orderBy, orderingColumn?.type)
      )

    return stableSort(
      unsorted,
      getComparator(order, orderBy, orderingColumn?.type)
    )
  }

  const visibleRows = useMemo(() => {
    // filter data by range if specified
    const rangeFilteredData = filterByDate
      ? filterDataByDate(data, dateColumnKey || 'created_at')
      : data

    return sortData(rangeFilteredData)?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )

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

  const [groupByColumn, setGroupByColumn] = useState<string | undefined>(
    defaultGroupColumn
  )
  const [defaultExpanded, setDefaultExpanded] = useState<boolean>(true)

  const sortGroupedDataAlphabetically = (data: any) => {
    const sortedKeys = Object.keys(data).sort()
    return sortedKeys.reduce((acc: any, key) => {
      acc[key] = data[key]
      return acc
    }, {})
  }

  const sortGroupedData = (groupedData: any) => {
    if (groupSortFunction) return groupSortFunction(groupedData, groupByColumn)

    return sortGroupedDataAlphabetically(groupedData)
  }

  const getGroupedData = () => {
    const groupedData = _.groupBy(data, groupByColumn)
    if (groupByColumn) {
      trackTableGrouped(title, groupByColumn)
    }

    if (isEmpty(groupedData))
      return [
        {
          title: '',
          data: [],
        },
      ]

    return Object.keys(sortGroupedData(groupedData)).map((key) => ({
      title: key,
      data: sortData(groupedData[key]),
    }))
  }

  return (
    <div
      className="w-full overflow-hidden font-rubik"
      data-testid={`${title} table`}
    >
      <div className="flex justify-between items-center mb-4">
        {titleComponent || (
          <h4 className="text-2xl text-[#444] font-rubik font-medium">
            {title}
          </h4>
        )}
        <div className="flex justify-between gap-2 font-rubik">
          {filterControl}
          {groupColumns && groupColumns.length > 0 && (
            <>
              <div className="min-w-[150px]">
                <span className="text-sm text-gray-400">Group by</span>
                <FormControl fullWidth>
                  <Select
                    labelId="group-by-select-label"
                    id="group-by-select"
                    className="h-8"
                    value={groupByColumn}
                    onChange={(e) => setGroupByColumn(e.target.value)}
                    renderValue={(value) => {
                      return (
                        <div className="flex gap-3 items-center text-[#989898]">
                          {toTitleCase(value)}
                        </div>
                      )
                    }}
                  >
                    {groupColumns.map((column) => (
                      <MenuItem value={column} key={column}>
                        {toTitleCase(column)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {groupByColumn && (
                <Button
                  className="normal-case underline pb-0 text-blue-100 text-sm font-bold self-end"
                  onClick={() => {
                    trackTableGroupAllExpandToggled(title, !defaultExpanded)
                    setDefaultExpanded(!defaultExpanded)
                  }}
                >
                  {defaultExpanded ? 'Collapse All' : 'Expand All'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
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
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="p-0">
                  <div className="flex items-center justify-center">
                    <Loading message={`Loading ${title}`} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <>
              {groupByColumn ? (
                <>
                  {getGroupedData().map((group, index) => {
                    return (
                      <React.Fragment key={`grouped-row-${index}`}>
                        {group?.data?.length ? (
                          <GroupedRow
                            columns={columns}
                            data={group.data}
                            defaultExpanded={defaultExpanded}
                            key={`grouped-row-${index}`}
                            groupTitle={group.title}
                            title={title}
                          />
                        ) : (
                          <TableBody>
                            <TableRow>
                              <TableCell
                                colSpan={columns.length + 1}
                                className="p-0"
                              >
                                <EmptyData title={title} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )}
                      </React.Fragment>
                    )
                  })}
                </>
              ) : (
                <TableBody>
                  {visibleRows?.length ? (
                    <>
                      {visibleRows.map((row: any, index: number) => (
                        <DataTableDetailedRow
                          key={index}
                          columns={columns}
                          row={row}
                          tableName={title}
                          canExpandRow={canExpandRow}
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
              )}
            </>
          )}
        </Table>
      </TableContainer>
      {!groupByColumn && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="text-dark-blue-100 font-rubik mt-2 bg-white flex justify-center"
          showFirstButton
          showLastButton
        />
      )}
    </div>
  )
}

export default DataTable
