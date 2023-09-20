import React, { useEffect, useState, useRef } from 'react'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { every, isEmpty } from 'lodash'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TableCell from '@mui/material/TableCell'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import { useFilePicker } from 'use-file-picker'
import {
  AlertCircle,
  CheckCircle,
  File,
  Upload,
  X,
  XCircle,
  Share,
} from 'react-feather'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Accordion from '@mui/material/Accordion'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import PdfViewer from 'src/modules/udm/components/pdf-viewer.component'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import RefinedFileMetaForm from 'src/modules/udm/components/form'
import logError from 'src/utils/logging/logger'
import { useParams } from 'react-router-dom'
import { useNotifications } from 'src/context/notifications'
import { FilterView } from 'src/modules/udm/views/filter-files'
import { UploadOptions } from 'src/modules/udm/components/upload-options'
import { ShareFileView } from 'src/modules/udm/views/share-file'
import { GRoupedFiles, TFile } from 'src/modules/udm/types'
import {
  getComparator,
  uploadDisabled,
  getMimeIcon,
  getSharedAt,
  stableSortFiles,
} from 'src/modules/udm/utils'
import { FileDetails } from 'src/modules/udm/views/file-details'
import { EnhancedTableHead } from 'src/modules/udm/components/file-table-header'
import { useUdmData } from './hooks/udm.data'
import styles from './files.component.css'

type DocMeta = {
  docType: string
  description: string
  title: string
  shareWith?: string[]
  folder?: string
}

function Files() {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [detailsAnchorEl, setDetailsAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const [fileDetails, setFileDetails] = useState<null | any>(null)
  const [filtering, setfiltering] = useState(false)
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('updatedAt')
  const [page, setPage] = React.useState(0)
  const [activeOpenFile, seActiveOpenFile] = useState(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { antaraId } = useParams()

  const [filteredFiles, setFilteredFiles] = useState<GRoupedFiles>(
    {} as GRoupedFiles
  )
  const [listView, setListView] = useState(true)
  const [
    openFileSelector,
    { filesContent, plainFiles, loading: gettingFile, clear },
  ] = useFilePicker({
    accept: '*',
    readAs: 'BinaryString',
  })

  const [folders, setFolders] = useState([])
  const [fileTypes, setFileTypes] = useState<string[]>([])

  const {
    getFiles,
    loading,
    getFolders,
    getCategories,
    error,
    refetch,
    fileError,
    loading: gettingUploadLink,
    setShouldReplaceFile,
    handleUploadDocument,
    uploadDone,
    uploadStart,
    uploadFailed,
    uploadSuccessful,
    docLink,
    setdocLink,
    setUploadFailed,
    progress,
    setProgress,
    confirmationDrawerHelper,
    setConfirmationDrawerHelper,
    setNetworkError,
    networkError,
  } = useUdmData()

  const displayForm = !uploadSuccessful && !uploadFailed

  const uploadDocument = (docMeta: DocMeta) => {
    const fileName = filesContent[0]?.name
    const shouldUploadByLink = filesContent.length === 0 || !fileName
    const options = {
      document: docMeta,
      fileName,
      shouldUploadByLink,
      fileSize: plainFiles[0]?.size || 0,
      file: plainFiles[0],
    }
    filesRef.current = docMeta
    handleUploadDocument(options)
  }

  const uploadErrored = fileError && fileError.length > 0
  const noFilesForMember = !loading && every(filteredFiles, isEmpty)
  const displayDrawer = confirmationDrawerHelper && !gettingFile
  const isFileUploading = gettingFile || gettingUploadLink
  const isFormVisible = displayForm && !gettingFile && !gettingUploadLink
  const filesRef = useRef()
  const [shouldShareFile, setShouldShareFile] = useState(false)
  const [fileIdToShare, setFileIdToShare] = useState<string | undefined>(
    undefined
  )

  const { notify } = useNotifications()

  useEffect(() => {
    if (antaraId) {
      getFiles()
        .then(setFilteredFiles)
        .catch((err) => {
          logError(err)
          notify('An error occured getting files')
        })
    }

    getFolders()
      .then(setFolders)
      .catch((err) => {
        logError(err)
        notify('An error occured getting folders')
      })
    getCategories()
      .then(setFileTypes)
      .catch((err) => {
        logError(err)
        notify('An error occured getting file categories')
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])

  useEffect(() => {
    if (gettingFile) {
      setConfirmationDrawerHelper(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gettingFile])

  const headCells = [
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: <p className={styles.titleName}>Name</p>,
    },
    {
      id: 'updatedAt',
      numeric: true,
      disablePadding: true,
      label: <p className={styles.titleName}>Uploaded</p>,
    },
    {
      id: 'shared',
      numeric: true,
      disablePadding: true,
      label: <p className={styles.titleName}>Sharing</p>,
    },
    {
      id: 'lastSent',
      numeric: true,
      disablePadding: true,
      label: <p className={styles.titleName}>Last time sent</p>,
    },
    {
      id: 'details',
      numeric: true,
      disablePadding: true,
      label: <p className={styles.titleName}>Details</p>,
    },
  ]
  const handleUploadClick = () => {
    setOpen(true)
  }

  React.useEffect(() => {
    if (uploadStart) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 100) {
            const diff = Math.random() * 10
            return Math.min(oldProgress + diff, 90)
          }
          return oldProgress
        })
      }, 150)

      return () => {
        clearInterval(timer)
      }
    }
    return undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadStart])

  const handleRequestSort = (_event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  const onFileClosed = () => {
    seActiveOpenFile(null)
  }

  const closeFileSharing = () => {
    setAnchorEl(null)
    refetch()
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
            <p className={styles.fileName}>
              {filesContent.length > 0
                ? filesContent[0].name
                : 'Upload document link'}
            </p>
          </span>
        </Grid>
        <Grid item xs={4} className="d-flex flex-end">
          {!uploadSuccessful && (
            <Button className={styles.uploadCancelBtn} onClick={uploadDone}>
              cancel
            </Button>
          )}
        </Grid>
      </Grid>
      {(uploadStart || uploadSuccessful) && (
        <Box className={styles.upload}>
          <LinearProgress
            color={progressColor()}
            variant="determinate"
            value={progress}
          />
        </Box>
      )}
    </>
  )

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
      {!uploadErrored && (
        <FilterView
          open={open}
          docLink={docLink}
          setdocLink={setdocLink}
          uploadDisabled={uploadDisabled}
          openFileSelector={openFileSelector}
          listView={listView}
          setfiltering={setfiltering}
          filtered={setFilteredFiles}
          setListView={setListView}
          handleUploadClick={handleUploadClick}
          setisOPen={setOpen}
          noFilesForMember={noFilesForMember}
          setConfirmationDrawerHelper={setConfirmationDrawerHelper}
          clear={clear}
          fileTypes={fileTypes}
        />
      )}
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
              onClick={handleUploadClick}
            >
              Upload
            </Button>
            {open && (
              <div className={styles.emptyFileUploadOptions}>
                <UploadOptions
                  open={open}
                  setOpen={setOpen}
                  docLink={docLink}
                  setdocLink={setdocLink}
                  uploadDisabled={uploadDisabled}
                  openFileSelector={openFileSelector}
                  setConfirmationDrawerHelper={setConfirmationDrawerHelper}
                  clear={clear}
                />
              </div>
            )}
          </div>
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
          open
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
                Unfortunately, upload was not successful{' '}
                {networkError &&
                  `due to poor internet
                connection`}
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
                    uploadDocument(filesRef.current as unknown as DocMeta)
                    setUploadFailed()
                    setNetworkError(false)
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
                options={fileTypes}
              />
            </Box>
          )}
        </Drawer>
      )}
      {activeOpenFile && (
        <PdfViewer file={activeOpenFile} onFileClosed={onFileClosed} />
      )}
      {filtering && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Filters</p>
        </div>
      )}

      {shouldShareFile && fileIdToShare && (
        <ShareFileView
          anchorEl={anchorEl}
          open={!!anchorEl}
          id={anchorEl ? 'folder-popup' : undefined}
          close={closeFileSharing}
          folders={folders}
          fileId={fileIdToShare}
        />
      )}

      {filteredFiles && !loading && !filtering && (
        <div className="interactions">
          <div className={styles.notes}>
            <div className={styles.container}>
              {Object.keys(filteredFiles).map((key) => {
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
                      <Typography className={styles.title}>{key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                          {listView ? (
                            <>
                              <TableContainer>
                                <Table
                                  sx={{ minWidth: 150 }}
                                  aria-labelledby="tableTitle"
                                  size="medium"
                                >
                                  <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={filteredFiles[key].length}
                                    headCells={headCells}
                                  />
                                  <TableBody>
                                    {stableSortFiles(
                                      filteredFiles[key],
                                      getComparator(order, orderBy)
                                    )
                                      .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                      )
                                      .map((items, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`
                                        const row = items as TFile

                                        return (
                                          <TableRow
                                            hover
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
                                              {dayjs(row.createdAt).format(
                                                "DD MMM' YY"
                                              )}
                                            </TableCell>
                                            <TableCell
                                              sx={{ padding: '5px' }}
                                              align="right"
                                            >
                                              {row.shared ? (
                                                <p style={{ fontSize: 14 }}>
                                                  <CheckCircle
                                                    color="green"
                                                    style={{
                                                      width: 24,
                                                      height: 14,
                                                    }}
                                                  />
                                                  <span>Shared</span>
                                                </p>
                                              ) : (
                                                <div>
                                                  <button
                                                    className={styles.shareBtn}
                                                    onClick={(
                                                      e: React.MouseEvent<HTMLElement>
                                                    ) => {
                                                      setAnchorEl(
                                                        anchorEl
                                                          ? null
                                                          : e.currentTarget
                                                      )
                                                      setFileIdToShare(row?.id)
                                                      setShouldShareFile(true)
                                                    }}
                                                  >
                                                    <Share
                                                      style={{
                                                        width: 34,
                                                        height: 14,
                                                      }}
                                                    />
                                                    <span>Share</span>
                                                  </button>
                                                </div>
                                              )}
                                            </TableCell>
                                            <TableCell
                                              sx={{ padding: '5px' }}
                                              align="right"
                                            >
                                              {getSharedAt(row)}
                                            </TableCell>
                                            <TableCell
                                              sx={{ padding: '5px' }}
                                              align="right"
                                            >
                                              <button
                                                className={styles.shareBtn}
                                                onClick={(
                                                  e: React.MouseEvent<HTMLElement>
                                                ) => {
                                                  setDetailsAnchorEl(
                                                    detailsAnchorEl
                                                      ? null
                                                      : e.currentTarget
                                                  )
                                                  setFileDetails(row)
                                                }}
                                              >
                                                Show
                                              </button>
                                            </TableCell>
                                          </TableRow>
                                        )
                                      })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              {filteredFiles[key].length > 5 && (
                                <TablePagination
                                  rowsPerPageOptions={[5, 10, 25]}
                                  component="div"
                                  count={filteredFiles[key].length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                              )}
                            </>
                          ) : (
                            <div className={styles.grid}>
                              {filteredFiles[key].map((val) => (
                                <div
                                  key={val.id}
                                  role="button"
                                  tabIndex={0}
                                  className={styles.gridComponent}
                                  onKeyDown={(event) => handleClick(event, val)}
                                  onClick={(event) => handleClick(event, val)}
                                >
                                  <div className={styles.fileMime}>
                                    <File
                                      className={styles.fileRenderIcon}
                                      width={120}
                                      height={120}
                                    />
                                  </div>
                                  <div
                                    className={`d-flex align-center ${styles.docPad}`}
                                  >
                                    {getMimeIcon(val.mimeType.toLowerCase())}
                                    <div className={styles.docTitle}>
                                      {val.title}
                                    </div>
                                  </div>
                                  <div className={styles.docDate}>
                                    {dayjs(val.updatedAt).format(
                                      'DD MMMM YYYY'
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
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
      {fileDetails && (
        <FileDetails
          anchorEl={detailsAnchorEl}
          file={fileDetails}
          id={detailsAnchorEl ? fileDetails?.id : undefined}
          showFile={handleClick}
          close={() => {
            setDetailsAnchorEl(null)
            setFileDetails(null)
          }}
          open={!!detailsAnchorEl}
        />
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
