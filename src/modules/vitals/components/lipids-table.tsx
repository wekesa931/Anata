import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

interface Column {
  id: string
  label: string
  format?: (value: number) => string
  minWidth?: number
  units?: string
  [key: string]: any
}

type PaginatedTableProps<T extends Column> = {
  handlePageRowsChange?: ({
    page,
    rows,
  }: {
    page: number
    rows: number
  }) => void
  columns: readonly Column[]
  data: T[]
  background?: string
}

function PaginatedTable<T extends Column>({
  handlePageRowsChange,
  columns,
  data,
}: PaginatedTableProps<T>) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    handlePageRowsChange && handlePageRowsChange({ page, rows: rowsPerPage })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div className="w-full overflow-hidden font-rubik">
      <TableContainer>
        <Table
          stickyHeader
          aria-label="paginated table"
          className="border-spacing-y-2"
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth || 100 }}
                  className={`font-bold text-white p-0 py-2 bg-dark-blue-70 ${
                    index === 0
                      ? 'rounded-tl-lg'
                      : index === columns.length - 1
                      ? 'rounded-tr-lg'
                      : ''
                  }`}
                >
                  <p>{column.label}</p>

                  <p className="text-xs">
                    {column.units && ` (${column.units})`}
                  </p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Column) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]?.value || row[column.id]
                      const textColor = row[column.id]?.textColor

                      return (
                        <TableCell
                          key={column.id}
                          align="center"
                          className="p-2 bg-table-col-grey border-none"
                          sx={{
                            color: textColor || 'var(--dark-blue-100)',
                          }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
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

export default PaginatedTable
