import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
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
import { useFilePicker } from 'use-file-picker'
import {
  AlertCircle,
  CheckCircle,
  File,
  FileText,
  Image,
  Upload,
  X,
  XCircle,
} from 'react-feather'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { visuallyHidden } from '@mui/utils'
import Accordion from '@mui/material/Accordion'
import Drawer from '@mui/material/Drawer'
import LinearProgress from '@mui/material/LinearProgress'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import styles from './files.component.css'
import PdfViewer from './pdf-viewer.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { GET_FILES, UPLOAD_LINK, SAVE_FILE } from './files.gql'
import { useMember } from '../../../../context/member.context'
import { useUser } from '../../../../context/user-context'
import RefinedFileMetaForm from './form'
import logError from '../../../utils/Bugsnag/Bugsnag'

// eslint-disable-next-line
const mime = require('mime-types')

type S3UploadMeta = {
  errors: any
  link: {
    url: string
    fields: any
  }
  message: string
  status: number
}

type DocMeta = {
  docType: string
  description: string
  title: string
}

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

function descendingComparator(a: any, b: any, orderBy: any) {
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
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

const Files = () => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('updatedAt')
  const [page, setPage] = React.useState(0)
  const [fileError, setFileError] = useState('')
  const [activeOpenFile, seActiveOpenFile] = useState(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [shouldReplaceFile, setShouldReplaceFile] = useState(false)
  const [s3UploadLink, setS3UploadLink] = useState<S3UploadMeta>(null)
  const [progress, setProgress] = React.useState(10)
  const [uploadStart, setUploadStart] = useState(false)
  const [uploadSuccessful, setUploadSuccessful] = useState(false)
  const [uploadFailed, setUploadFailed] = useState(false)
  const { member } = useMember()
  const displayForm = !uploadSuccessful && !uploadFailed
  const user = useUser()
  const [serverFiles, setServerFiles] = useState<IGRoupedFiles>(
    {} as IGRoupedFiles
  )
  const [
    openFileSelector,
    { filesContent, plainFiles, loading: gettingFile, clear },
  ] = useFilePicker({
    accept: '*',
    readAs: 'BinaryString',
  })
  const { loading, error, data, refetch } = useQuery(GET_FILES, {
    variables: { antaraId: member['Antara ID'] },
  })
  const [getUploadLink, { loading: gettingUploadLink }] =
    useMutation(UPLOAD_LINK)
  const [saveFile] = useMutation(SAVE_FILE)
  const uploadErrored = fileError && fileError.length > 0
  const fileLoaded = !every(s3UploadLink, isEmpty)
  const noFilesForMember = !loading && every(serverFiles, isEmpty)
  const memberHasFiles = !noFilesForMember
  const displayDrawer = s3UploadLink || gettingFile || gettingUploadLink
  const isDrawerOpen = fileLoaded || gettingFile || gettingUploadLink
  const isFileUploading = gettingFile || gettingUploadLink
  const isFormVisible = displayForm && !gettingFile && !gettingUploadLink
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
  const getMimeIcon = (name: string) => {
    if (name.includes('pdf')) {
      return <PictureAsPdfOutlinedIcon className={styles.red} />
    }
    if (name.includes('jpg') || name.includes('jpeg') || name.includes('png')) {
      return <Image className={styles.blue} />
    }
    return <FileText className={styles.green} />
  }
  useEffect(() => {
    if (filesContent.length > 0) {
      getUploadLink({
        variables: {
          duration: 50000,
          storageKey: filesContent[0].name,
          forceReplace: shouldReplaceFile,
        },
      })
        .then((res) => {
          if (res.data.generateUploadLink.errors) {
            setFileError(res.data.generateUploadLink.message)
          } else {
            setS3UploadLink(res.data.generateUploadLink)
          }
        })
        .catch((e) => logError(e))
    }
  }, [filesContent, shouldReplaceFile, getUploadLink])

  useEffect(() => {
    if (data) {
      const rawFiles = data.files.edges.map((ed: { node: IFiles }) => ed.node)
      const categorizedFiles = groupBy(rawFiles, 'category')
      setServerFiles(categorizedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  React.useEffect(() => {
    if (uploadStart) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 100) {
            const diff = Math.random() * 10
            return Math.min(oldProgress + diff, 97)
          }
          return oldProgress
        })
      }, 150)

      return () => {
        clearInterval(timer)
      }
    }
    return undefined
  }, [uploadStart])

  const handleRequestSort = (_event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const onFileClosed = () => {
    seActiveOpenFile(null)
  }
  const stableSort = (array: IFiles[], comparator: any) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a: any, b: any) => {
      const val = comparator(a[0], b[0])
      if (val !== 0) {
        return val
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }
  const uploadDocument = (docMeta: DocMeta) => {
    setUploadStart(true)
    const fileName = filesContent[0].name.split('.')
    fileName.pop()
    const formData = new FormData()
    Object.keys(s3UploadLink.link.fields).forEach((key) => {
      formData.append(key, s3UploadLink.link.fields[key])
    })
    formData.append('file', plainFiles[0])
    axios
      .post(s3UploadLink.link.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
      .then(() => {
        saveFile({
          variables: {
            input: {
              description: docMeta.description,
              antaraId: member['Antara ID'],
              storageKey: filesContent[0].name,
              addedBy: user?.email,
              mimeType: mime.lookup(filesContent[0].name),
              fileSize: plainFiles[0].size,
              category: docMeta.docType,
              driveUrl: null,
              title: docMeta.title,
              recordId: member.recID,
              fileName: fileName.join('.'),
            },
          },
        }).then(() => {
          setUploadStart(false)
          setProgress(100)
          setUploadSuccessful(true)
          refetch()
        })
      })
      .catch((response) => {
        setUploadStart(false)
        setProgress(100)
        setUploadFailed(true)
        logError(response.message)
      })
  }

  const handleClick = (_event: any, file: any) => {
    seActiveOpenFile(file)
  }

  const handleChangePage = (_event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const uploadDone = () => {
    setS3UploadLink(null)
    setProgress(10)
    setFileError('')
    setUploadSuccessful(false)
    setUploadFailed(false)
  }
  const progressColor = (): 'error' | 'primary' | 'success' => {
    let color: 'error' | 'primary' | 'success' = 'primary'
    if (uploadSuccessful) {
      color = 'success'
    }
    if (uploadFailed) {
      color = 'error'
    }
    return color
  }

  const uploadStatusHeader = () => (
    <>
      <X className={styles.uploadCancel} onClick={uploadDone} />
      <Box className={styles.upload}>
        <p className={styles.uploadHeader}>
          {uploadSuccessful ? 'New file uploaded' : 'Upload New File'}
        </p>
      </Box>
      <Grid container className={`${styles.fileDetail} align-center`}>
        <Grid className={`${styles.upload} d-flex align-center`} item xs={8}>
          {filesContent.length > 0 && getMimeIcon(filesContent[0].name)}
          <span className={styles.elippsisText}>
            <p className={styles.fileName}>{filesContent[0].name}</p>
          </span>
        </Grid>
        <Grid item xs={4} className="d-flex flex-end">
          <Button className={styles.uploadCancelBtn} onClick={uploadDone}>
            cancel
          </Button>
        </Grid>
      </Grid>
      <Box className={styles.upload}>
        <LinearProgress
          color={progressColor()}
          variant="determinate"
          value={progress}
        />
      </Box>
    </>
  )

  const EnhancedTableHead = (props: any) => {
    const { order: orderVal, orderBy: orderByVal, onRequestSort } = props
    const createSortHandler = (property: any) => (event: any) => {
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
            <File className={styles.fileIcon} size={80} />
            <p className={styles.noDocs}>No docs</p>
            <p className={styles.uploadDoc}>Upload the first doc</p>
            <Button
              className={styles.uploadBtn}
              variant="contained"
              startIcon={<Upload />}
              onClick={() => openFileSelector()}
            >
              Upload
            </Button>
          </div>
        </div>
      )}
      {memberHasFiles && (
        <div className="d-flex ml-ten">
          <Button
            className={`${styles.uploadBtn} ${styles.commonUpload}`}
            variant="contained"
            startIcon={<Upload />}
            onClick={() => openFileSelector()}
          >
            Upload
          </Button>
        </div>
      )}
      {uploadErrored && (
        <Drawer
          className="upload-form-drawer"
          sx={{ width: '320px' }}
          anchor="right"
          open={uploadErrored}
        >
          {uploadStatusHeader()}
          {uploadErrored && (
            <Box className={styles.successMessage}>
              <AlertCircle className={styles.alert} width={50} height={50} />
              <p className={styles.uploadMessage}>
                Looks like this file already exists
              </p>
              <Box className={styles.replaceButtons}>
                <Button
                  className={`${styles.uploadMessage} mt-twenty`}
                  variant="contained"
                  onClick={() => setShouldReplaceFile(true)}
                >
                  Replace
                </Button>
                <Button
                  className={`${styles.uploadMessage} mt-twenty`}
                  variant="outlined"
                  onClick={uploadDone}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Drawer>
      )}
      {displayDrawer && (
        <Drawer
          className="upload-form-drawer"
          sx={{ width: '320px' }}
          anchor="right"
          open={isDrawerOpen}
        >
          {isFileUploading ? (
            <div className="d-flex flex-direction-column flex-align-center margin-top-32 mb-ten">
              <p className={`${styles.uploadHeader} border-none`}>
                Getting File
              </p>
              <LoadingIcon />
              <p className="text-small">Loading</p>
            </div>
          ) : (
            <>
              {uploadStatusHeader()}
              {uploadSuccessful && (
                <Box className={styles.successMessage}>
                  <CheckCircle
                    className={styles.successUpload}
                    width={50}
                    height={50}
                  />
                  <p className={styles.uploadMessage}>Success</p>
                  <p className={styles.uploadCompleted}>Upload Completed</p>
                  <Button
                    className={`${styles.uploadMessage} mt-twenty`}
                    variant="outlined"
                    onClick={uploadDone}
                  >
                    Done
                  </Button>
                </Box>
              )}
            </>
          )}
          {uploadFailed && (
            <Box className={styles.successMessage}>
              <XCircle className={styles.failIcon} width={50} height={50} />
              <p className={styles.uploadMessage}>Error</p>
              <p className={styles.uploadCompleted}>
                Unfortunately, upload was not successful
              </p>
              <Box className="d-flex mt-twenty">
                <Button
                  className={`${styles.uploadMessage} ${styles.cancel}`}
                  variant="outlined"
                  onClick={uploadDone}
                >
                  cancel
                </Button>
                <Button
                  className={`${styles.uploadMessage} ${styles.tryAgain}`}
                  variant="contained"
                  onClick={() => {
                    clear()
                    uploadDone()
                  }}
                >
                  Try again
                </Button>
              </Box>
            </Box>
          )}
          {isFormVisible && (
            <Box className={styles.formContainer}>
              <RefinedFileMetaForm
                uploadStart={uploadStart}
                uploadDocument={(docMeta: DocMeta) => uploadDocument(docMeta)}
              />
            </Box>
          )}
        </Drawer>
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
