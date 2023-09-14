import {
  TableHead,
  TableCell,
  TableSortLabel,
  Box,
  TableRow,
} from '@mui/material'
import React from 'react'
import { visuallyHidden } from '@mui/utils'

export function EnhancedTableHead(props: any) {
  const {
    order: orderVal,
    orderBy: orderByVal,
    onRequestSort,
    headCells,
  } = props
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderByVal === headCell.id ? orderVal : false}
          >
            <TableSortLabel
              active={orderByVal === headCell.id}
              direction={orderByVal === headCell.id ? orderVal : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderByVal === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {orderVal === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
