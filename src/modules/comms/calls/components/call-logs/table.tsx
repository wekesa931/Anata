import React from 'react'
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
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { capitalize } from 'lodash'
import { CallIcon } from 'src/components/icon/calls'
import { humanize } from 'src/utils/date-time/date-formatters'
import { useModuleAnalytics } from 'src/modules/analytics'
import CallView from './details'
import styles from './styles.component.css'

dayjs.extend(customParseFormat)

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
}

type CallDetailsDrawerProps = {
  close: () => void
  callData: any
  isOpen: boolean
}

function CallDetailsDrawer({
  close,
  callData,
  isOpen,
}: CallDetailsDrawerProps) {
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
            {`${capitalize(callData?.callDirection)} call`}
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

type CallsTableBodyProps = {
  data: any[]
  setCallData: (value: any) => void
}

function CallsTableBody({ data, setCallData }: CallsTableBodyProps) {
  const { trackCallLogDetailsAccessed } = useModuleAnalytics()
  return (
    <>
      {data.length > 0 ? (
        data.map((row: CleanedDataItem) => (
          <>
            <TableRow
              key={row?.dataDate}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              data-testid="logs-title"
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
              .sort(
                (a: any, b: any) =>
                  new Date(b.createdAt) - new Date(a.createdAt)
              )
              .map((item: any, i: number) => (
                <StyledTableRow key={i} data-testid="logs-item">
                  <StyledTableCell component="th" scope="row">
                    <CallIcon item={item} />
                    <span style={{ paddingLeft: 5 }}>{item.memberPhone}</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    {humanize(item.inCallDuration)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(item.createdAt).format('MMMM, D h:mm')}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        setCallData(item)
                        trackCallLogDetailsAccessed(item)
                      }}
                    >
                      Show
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </>
        ))
      ) : (
        <StyledTableCell colSpan={4}>
          <span className={`${styles.ongoingContainer}`}>No Call Logs</span>
        </StyledTableCell>
      )}
    </>
  )
}

function DataTable({ data }: DataTableProps) {
  const [callData, setCallData] = React.useState(null)

  return (
    <>
      <Table sx={{ minWidth: 650, outline: 'none' }} aria-label="simple table">
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
        <TableBody data-testid="logs-table">
          <CallsTableBody data={data} setCallData={setCallData} />
        </TableBody>
      </Table>
      <CallDetailsDrawer
        isOpen={!!callData}
        close={() => setCallData(null)}
        callData={callData}
      />
    </>
  )
}

export default DataTable
