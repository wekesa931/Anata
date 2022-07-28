import React, { useEffect, Fragment } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import { Button } from '@mui/material'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import CallView from './call-view.component'
import styles from './call-view.component.css'

import { formatDuration, loadingIcon, callIcons } from './utils'
/* eslint-disable */
const _ = require('lodash')

const headers = ['Phone no', 'Call duration', 'Date', ' Details']

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: 'none',
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'var(--dark-blue-10)',
    outline: 'none',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

type CleanedDataItem = {
  dataDate: string
  data: Array<any>
}

type DataTableProps = {
  data: Array<any>
  loading: boolean
}

type CallDetailsDrawerProps = {
  close: () => void
  callData: any
  isOpen: boolean
}

const CallDetailsDrawer = ({
  close,
  callData,
  isOpen,
}: CallDetailsDrawerProps) => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    flexDirection: 'row',
  }))

  return (
    <div>
      <Drawer
        className="upload-form-drawer"
        sx={{ width: '320px' }}
        anchor="left"
        open={isOpen}
        onClose={close}
      >
        <DrawerHeader>
          <p className={styles.header}>
            {`${_.capitalize(callData?.callDirection)} call`}
          </p>
          <small className={styles.smallHeader}>
            {dayjs(callData?.createdAt).format("DD MMM 'YY")}
          </small>
          <IconButton onClick={close} className={styles.icon}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <CallView callData={callData} />
      </Drawer>
    </div>
  )
}

const DataTable = ({ data, loading }: DataTableProps) => {
  const [cleanedData, setCleanedData] = React.useState<Array<CleanedDataItem>>(
    []
  )
  const [open, setOpen] = React.useState(false)
  const [callData, setCallData] = React.useState({})

  useEffect(() => {
    if (data) {
      setCleanedData(data)
    }
  }, [data])

  const tableBody = () => {
    return cleanedData.length ? (
      cleanedData.map((row) => (
        <>
          <TableRow
            key={row?.dataDate}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <Typography
              style={{
                marginLeft: 15,
                color: 'black',
                fontSize: 10,
                fontWeight: 600,
              }}
              variant="button"
              display="block"
              gutterBottom
            >
              {dayjs(row.dataDate, 'MM/YY').format('MMMM, YYYY')}
            </Typography>
          </TableRow>
          {row.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item, i) => (
              <React.Fragment key={i}>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {callIcons(item)}
                    <span style={{ paddingLeft: 5 }}>{item.memberPhone}</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDuration(item.inCallDuration)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(item.createdAt).format('MMMM, D h:mm')}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        setOpen(true)
                        setCallData(item)
                      }}
                    >
                      Show
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              </React.Fragment>
            ))}
        </>
      ))
    ) : (
      <StyledTableCell colSpan={4}>
        <span className={`${styles.ongoingContainer}`}>No Call Logs</span>
      </StyledTableCell>
    )
  }

  return (
    <>
      {loading ? (
        loadingIcon('Loading Call Log table')
      ) : (
        <Table
          sx={{ minWidth: 650, outline: 'none' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {headers.map((el, i) => (
                <TableCell
                  style={{
                    color: 'var(--dark-blue-50)',
                    borderBottom: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                  key={i}
                >
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      )}
      <CallDetailsDrawer
        isOpen={open}
        close={() => setOpen(false)}
        callData={callData}
      />
    </>
  )
}

export default DataTable
