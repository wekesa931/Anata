import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import { groupBy, every, isEmpty } from 'lodash'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import { File, FileText, Image, Upload } from 'react-feather'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { visuallyHidden } from '@mui/utils'
import Accordion from '@mui/material/Accordion'
import styles from './files.component.css'
import PdfViewer from './pdf-viewer.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { GET_FILES } from './files.gql'
import { useMember } from '../../../../context/member.context'

type IFiles = {
  addedBy: string
  antaraId: string
  category: string
  description: string
  driveUrl: string
  title: string
  fileSize: number
  id: string
  mimeType: string
  otherMetadata: any
  storageKey: string
  updatedAt: Date
}

type IGRoupedFiles = {
  [key: string]: IFiles[]
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const Files = () => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('updatedAt')
  const [page, setPage] = React.useState(0)
  const [activeOpenFile, seActiveOpenFile] = useState<IFiles>(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { member } = useMember()
  const [serverFiles, setServerFiles] = useState<IGRoupedFiles>(
    {} as IGRoupedFiles
  )
  const { loading, error, data } = useQuery(GET_FILES, {
    variables: { antaraId: member['Antara ID'] },
  })
  const noFilesForMember = !loading && every(serverFiles, isEmpty)
  const headCells = [
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'updatedAt',
      numeric: true,
      disablePadding: false,
      label: 'Date Created',
    },
  ]
  const getMimeIcon = (mime: string) => {
    if (mime.includes('pdf')) {
      return <PictureAsPdfOutlinedIcon className={styles.red} />
    }
    if (mime.includes('jpg') || mime.includes('jpeg') || mime.includes('png')) {
      return <Image className={styles.blue} />
    }
    return <FileText className={styles.green} />
  }
  useEffect(() => {
    if (data) {
      const rawFiles = data.files.edges.map((ed: { node: IFiles }) => ed.node)
      const categorizedFiles = groupBy(rawFiles, 'category')
      setServerFiles(categorizedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const onFileClosed = () => {
    seActiveOpenFile(null)
  }
  const stableSort = (array: IFiles[], comparator: any) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const val = comparator(a[0], b[0])
      if (val !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  const handleClick = (event, file) => {
    seActiveOpenFile(file)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const EnhancedTableHead = (props) => {
    const { order: orderVal, orderBy: orderByVal, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {headCells.map((headCell) => (
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
  if (loading) {
    return (
      <div className="d-flex flex-direction-column flex-align-center margin-top-32">
        <LoadingIcon />
        <p className="text-small">Loading Files</p>
      </div>
    )
  }
  return (
    <div
      className="d-flex flex-direction-column"
      style={{ paddingLeft: '16px' }}
    >
      {noFilesForMember && (
        <div className={styles.empty}>
          <div className={styles.noContent}>
            <File color="#d1d5db" size={80} />
            <p className={styles.noDocs}>No docs</p>
            <p className={styles.uploadDoc}>Upload the first doc</p>
            <Button
              className={styles.uploadBtn}
              variant="contained"
              startIcon={<Upload />}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
      {activeOpenFile && (
        <PdfViewer file={activeOpenFile} onFileClosed={onFileClosed} />
      )}

      {serverFiles && !loading && (
        <div className="interactions">
          <div className={styles.notes}>
            <div className={styles.container}>
              {Object.keys(serverFiles).map((key) => {
                return (
                  <Accordion
                    defaultExpanded
                    key={key}
                    className={styles.accordionView}
                  >
                    <AccordionSummary
                      className={styles.accTitle}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={styles.title}>{key}S</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size="medium"
                            >
                              <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={serverFiles[key].length}
                              />
                              <TableBody>
                                {stableSort(
                                  serverFiles[key],
                                  getComparator(order, orderBy)
                                )
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                      <TableRow
                                        hover
                                        onClick={(event) =>
                                          handleClick(event, row)
                                        }
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <TableCell padding="checkbox">
                                          {getMimeIcon(
                                            row.mimeType.toLowerCase()
                                          )}
                                        </TableCell>
                                        <TableCell
                                          component="th"
                                          id={labelId}
                                          scope="row"
                                          padding="none"
                                        >
                                          {row.title}
                                        </TableCell>
                                        <TableCell
                                          sx={{ padding: '5px' }}
                                          align="right"
                                        >
                                          {dayjs(row.updatedAt).format(
                                            'DD MMMM YYYY'
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          {serverFiles[key].length > 10 && (
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={serverFiles[key].length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                          )}
                        </Paper>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-danger">
          An error occurred while loading files, please refresh the page, if it
          persists contact help desk.
        </p>
      )}
    </div>
  )
}

export default Files
