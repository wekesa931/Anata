import React, { useEffect, useState, useRef } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { groupBy, every, isEmpty } from 'lodash'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import { throttle } from 'throttle-debounce'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import { useFilePicker } from 'use-file-picker'
import {
  Search,
  AlertCircle,
  CheckCircle,
  File,
  FileText,
  Image,
  Link2,
  Monitor,
  Upload,
  X,
  XCircle,
  Grid as FeatherGrid,
  List,
  Share,
} from 'react-feather'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { visuallyHidden } from '@mui/utils'
import Accordion from '@mui/material/Accordion'
import Drawer from '@mui/material/Drawer'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import LinearProgress from '@mui/material/LinearProgress'
import { Divider, IconButton, Popper, Stack, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Tooltip from '../../../utils/tooltip/tooltip.component'
import styles from './files.component.css'
import PdfViewer from './pdf-viewer.component'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import {
  GET_FILES,
  UPLOAD_LINK,
  SAVE_FILE,
  GET_FOLDERS,
  SHARE_FILE,
} from './files.gql'
import { useMember } from '../../../../context/member.context'
import { useUser } from '../../../../context/user-context'
import RefinedFileMetaForm from './form'
import logError from '../../../utils/Bugsnag/Bugsnag'
import DropDownComponent from '../../../../helpers/dropdown-helper'
import analytics from '../../../../helpers/analytics'
import ToastNotification, {
  defaultToastMessage,
  ToastMessage,
} from '../../../utils/toast/toast-notification'

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
  shareWith?: string[]
  folder?: string
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

type IUploadOptions = {
  open: boolean
  setOpen: (isOpen: boolean) => void
  docLink: string
  setdocLink: (docLink: string | undefined) => void
  uploadDisabled: () => boolean
  openFileSelector: () => void
  setConfirmationDrawerHelper: (confirmationDrawerHelper: boolean) => void
  clear: () => void
}

type IFolder = {
  id: string
  name: string
}

type IShareOptions = {
  open: boolean
  anchorEl: HTMLElement | null
  id: string | undefined
  close: () => void
  folders: IFolder[]
  fileId: string
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

const ShareFileOptions = React.forwardRef(
  ({ open, anchorEl, id, close, folders, fileId }: IShareOptions) => {
    const { member } = useMember()
    const [folder, setFolder] = useState<string>('')
    const [shareFileMutation, { loading: sharing }] = useMutation(SHARE_FILE)
    const [toastMessage, setToastMessage] =
      useState<ToastMessage>(defaultToastMessage)

    const shareFile = () => {
      shareFileMutation({
        variables: {
          fileId,
          folderId: folder,
          antaraId: member['Antara ID'],
        },
      })
        .then((res) => {
          const message = res?.data?.shareFile?.message

          setToastMessage({
            ...toastMessage,
            message,
          })
        })
        .catch((err) => {
          logError(err)
          setToastMessage({
            ...toastMessage,
            message: 'An error occured sharing file',
          })
        })
        .finally(() => {
          setFolder('')
          close()
        })
    }

    return (
      <>
        <ToastNotification
          message={toastMessage}
          isOpen={!!toastMessage.message}
          handleToastClose={() => setToastMessage(defaultToastMessage)}
        />
        <Popper open={open} anchorEl={anchorEl} id={id}>
          <Box
            className={styles.shareDocModal}
            sx={{ bgcolor: 'background.paper', p: 3 }}
          >
            <h3 className={styles.shareDocTitle}>Send doc to the app</h3>

            <p className={styles.appFolder}>App Folder</p>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <Select
                value={folder}
                onChange={(e: SelectChangeEvent) =>
                  setFolder(e.target.value as string)
                }
              >
                {folders.map((f) => (
                  <MenuItem key={f.id} value={f.id}>
                    {f.name}{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack spacing={2} direction="row">
              <button
                className={`btn ${styles.cancelBtn} ${styles.styledBtn}`}
                onClick={close}
              >
                Cancel
              </button>

              <LoadingButton
                className={`${styles.styledBtn} ${styles.shareFileBtn} btn`}
                onClick={shareFile}
                loading={sharing}
                disabled={!folder}
              >
                {sharing ? 'Sharing...' : 'Share'}
              </LoadingButton>
            </Stack>
          </Box>
        </Popper>
      </>
    )
  }
)

const UploadOptions = ({
  open,
  setOpen,
  docLink,
  setdocLink,
  uploadDisabled,
  openFileSelector,
  setConfirmationDrawerHelper,
  clear,
}: IUploadOptions) => {
  const [openLinkInput, setOpenLinkInput] = useState(false)

  return (
    <DropDownComponent isVisible={open} setvisibility={setOpen}>
      <div className={styles.fileUploadOptions}>
        <Box
          sx={{
            borderBottom: '1px solid #e8eaed',
            bgcolor: 'background.paper',
          }}
        >
          {openLinkInput ? (
            <p className={`${styles.upText} ${styles.paste}`}>Paste Link URL</p>
          ) : (
            <Button
              onClick={() => {
                setOpenLinkInput(true)
              }}
            >
              <Link2 />
              <div className={`d-flex ${styles.uploadText}`}>
                <p className={styles.upText}>Upload via Link</p>
                <p className={styles.upTextSummary}>Google Drive, Dropbox</p>
              </div>
            </Button>
          )}
        </Box>
        <Box
          sx={{
            borderBottom: '1px solid #e8eaed',
            bgcolor: 'background.paper',
          }}
        >
          {openLinkInput ? (
            <>
              <input
                className={styles.input}
                type="text"
                placeholder="https://drive.google.com/file/d/"
                value={docLink}
                onChange={(e) => setdocLink(e.target.value)}
              />
              {docLink && uploadDisabled() && (
                <p className={styles.urlError}>Not a valid url</p>
              )}
            </>
          ) : (
            <Button
              onClick={() => {
                openFileSelector()
                setOpen(false)
                setdocLink(undefined)
              }}
            >
              <Monitor />
              <div className={`d-flex ${styles.uploadText}`}>
                <p className={styles.upText}>Upload from your computer</p>
                <p className={styles.upTextSummary}>PDF, DOC, XLS</p>
              </div>
            </Button>
          )}
        </Box>
        {openLinkInput && (
          <Box className="d-flex flex-end" sx={{ bgcolor: 'background.paper' }}>
            <Button
              disabled={uploadDisabled()}
              className={styles.upBtn}
              onClick={() => {
                // this is important since the file is not cleared by default after choosing a file, even if they did not upload it
                clear()
                setConfirmationDrawerHelper(true)
                setOpen(false)
                setOpenLinkInput(false)
              }}
            >
              Upload
            </Button>
            <Button
              className={styles.upBtn}
              color="error"
              onClick={() => {
                setOpen(false)
                setdocLink(undefined)
                setOpenLinkInput(false)
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </div>
    </DropDownComponent>
  )
}

const FilterComponent = ({
  open,
  setisOPen,
  docLink,
  setdocLink,
  uploadDisabled,
  handleUploadClick,
  openFileSelector,
  listView,
  setfiltering,
  filtered,
  noFilesForMember,
  setListView,
  setConfirmationDrawerHelper,
  clear,
}: any) => {
  const [fileCategory, setFileCategory] = useState(undefined)
  const [fileMime, setfileMime] = useState<string | undefined>(undefined)
  const [filterDate, setFilterDate] = useState<Date | null>(null)
  const [docTitle, setDocTitle] = useState<string | undefined>(undefined)
  const { member } = useMember()
  const fileTypes = [
    'HMP',
    'Prescription',
    'X-ray',
    'Others',
    'Radiology Reports',
    'Symptom Assessment Images',
    'Avenue Progress Reports',
    'Penda Progress Reports',
    'Data Collection Results',
    'Data Collection Images',
    'Data Collection Summary Reports',
    'Asthma Assessment Score Results',
    'Meal Plans',
    'Food Diaries',
    'Receipt of Passport Photo',
    'Identification Card Copy',
    'NHIF Copy',
    'Life Cover Documentation',
    'Medical Card Copy',
    'Medical Card Registration',
  ]
  const mimeTypes = [
    'jpg',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
    'image/png',
    'text/csv',
    'gif',
    'png',
    'doc',
    'docx',
    'txt',
    'csv',
    'pdf',
  ]

  const [applyFilters, { data, loading }] = useLazyQuery(GET_FILES, {
    variables: {
      antaraId: member['Antara ID'],
      search: docTitle || '',
      mimeType: fileMime || '',
      category: fileCategory || '',
      updatedAt: filterDate,
    },
  })

  const removeFilters = () => {
    setFileCategory(undefined)
    setfileMime(undefined)
    setFilterDate(null)
    setDocTitle(undefined)
  }
  useEffect(() => {
    if (fileCategory || fileMime || filterDate || docTitle) {
      const throttleFunc = throttle(
        1000,
        true,
        () => {
          applyFilters()
        },
        true
      )

      return throttleFunc()
    }
    return undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileCategory, fileMime, filterDate, docTitle])

  useEffect(() => {
    setfiltering(loading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (data) {
      const rawFiles = data.files.edges.map((ed: { node: IFiles }) => ed.node)
      const categorizedFiles = groupBy(rawFiles, 'category')
      filtered(categorizedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <div className="filters">
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <TextField
            sx={{ fontSize: '13px' }}
            className={styles.searchInput}
            id="input-with-icon-textfield"
            placeholder="Search files"
            value={docTitle || ''}
            onChange={(e) => setDocTitle(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search width={18} height={18} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        <div className={styles.viewIcons}>
          {!noFilesForMember && (
            <>
              <Button
                sx={{ textTransform: 'none', border: '1px solid #0000ff' }}
                className={styles.scopedUpload}
                variant="outlined"
                startIcon={<Upload width={15} height={15} />}
                onClick={handleUploadClick}
              >
                Upload
              </Button>
              {open && (
                <div className={styles.loadedFileUploadOptions}>
                  <UploadOptions
                    open={open}
                    setOpen={setisOPen}
                    docLink={docLink}
                    setdocLink={setdocLink}
                    uploadDisabled={uploadDisabled}
                    openFileSelector={openFileSelector}
                    setConfirmationDrawerHelper={setConfirmationDrawerHelper}
                    clear={clear}
                  />
                </div>
              )}{' '}
            </>
          )}

          <Tooltip title="List View">
            <List
              color={listView ? '#1084ee' : '#5d6b82'}
              className={styles.listIcon}
              onClick={() => {
                setListView(true)
              }}
            />
          </Tooltip>

          <Tooltip title="Grid View">
            <FeatherGrid
              color={listView ? '#5d6b82' : '#1084ee'}
              className={styles.gridIcon}
              onClick={() => {
                setListView(false)
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.typeSelection}>
        <div>
          <TextField
            id={styles.outlinedSelectType}
            className={styles.outlinedTypeSelect}
            select
            label="Category"
            value={fileCategory || ''}
            onChange={(e) => setFileCategory(e.target.value)}
          >
            {fileTypes.map((file) => (
              <MenuItem key={file} value={file}>
                {file}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={styles.dateSelection}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date Uploaded"
              inputFormat="DD/MM/YYYY"
              toolbarPlaceholder="DD/MM/YYYY"
              value={filterDate}
              onChange={(date: Date | null) => setFilterDate(date)}
              renderInput={(params) => (
                <TextField id={styles.outlinedSelectDate} {...params} />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className={`${styles.mimeSelection} ${styles.dateSelection}`}>
          <TextField
            id={styles.outlinedSelectType}
            select
            label="File type"
            value={fileMime || ''}
            onChange={(e) => setfileMime(e.target.value)}
          >
            {mimeTypes.map((mimeType) => (
              <MenuItem key={mimeType} value={mimeType}>
                {mimeType}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button
          className={styles.upBtn}
          sx={{ marginLeft: '5px' }}
          color="error"
          variant="contained"
          value={fileMime}
          onClick={() => removeFilters()}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

const DrawerHeader = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingLeft: 2,
}))

const FileDetails = ({ file, close, showFile }: any) => {
  const sharingInfo = file?.sharedfileSet?.edges[0]?.node

  const renderSection = (title: string, value: string) => (
    <Box sx={{ mt: 1, mb: 2 }}>
      <p className={styles.docInfoSubtext}>{title}</p>
      <p className={styles.docInfoText}>{value}</p>
    </Box>
  )

  return (
    <Drawer
      anchor="left"
      className="upload-form-drawer"
      open={!!file}
      onClose={close}
    >
      <DrawerHeader>
        <p className={styles.docInfoHeader}>Doc info</p>
        <IconButton onClick={close}>
          <X />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ mt: 1, mb: 2 }}>
          <p className={styles.docInfoText}>{file.title}</p>
        </Box>

        {renderSection(
          'Uploaded at',
          dayjs(file.createdAt).format("DD MMM' YYYY, HH:mm")
        )}
        {renderSection(
          'Shared status',
          file.shared ? 'Shared with member' : 'Not shared with member'
        )}
        {file.shared && renderSection('Shared by', sharingInfo?.sharedBy)}
        {renderSection('Member shared folder', sharingInfo?.folder?.name)}

        <Button onClick={(e) => showFile(e, file)}>View file</Button>
      </Box>
    </Drawer>
  )
}

const Files = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filtering, setfiltering] = useState(false)
  const [docLink, setdocLink] = useState(undefined)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('updatedAt')
  const [page, setPage] = React.useState(0)
  const [fileError, setFileError] = useState('')
  const [activeOpenFile, seActiveOpenFile] = useState(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [shouldReplaceFile, setShouldReplaceFile] = useState(false)
  const [progress, setProgress] = React.useState(0)
  const [uploadStart, setUploadStart] = useState(false)
  const [uploadSuccessful, setUploadSuccessful] = useState(false)
  const [uploadFailed, setUploadFailed] = useState(false)
  const { member } = useMember()
  const displayForm = !uploadSuccessful && !uploadFailed
  const user = useUser()
  const [filteredFiles, setFilteredFiles] = useState<IGRoupedFiles>(
    {} as IGRoupedFiles
  )
  const [listView, setListView] = useState(true)
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
  const [folders, setFolders] = useState([])
  const [fileDetails, showFileDetails] = useState<any>(null)

  const { data: foldersData } = useQuery(GET_FOLDERS)

  const [getUploadLink, { loading: gettingUploadLink }] =
    useMutation(UPLOAD_LINK)
  const [saveFile] = useMutation(SAVE_FILE)
  const uploadErrored = fileError && fileError.length > 0
  const noFilesForMember = !loading && every(filteredFiles, isEmpty)
  const [confirmationDrawerHelper, setConfirmationDrawerHelper] =
    useState(false)
  const displayDrawer = confirmationDrawerHelper && !gettingFile
  const isFileUploading = gettingFile || gettingUploadLink
  const isFormVisible = displayForm && !gettingFile && !gettingUploadLink
  const filesRef = useRef()
  const [networkError, setNetworkError] = useState(false)
  const isValidURL = (url: string) => {
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g //eslint-disable-line
    )
    return res !== null
  }
  const uploadDisabled = () => {
    if (!docLink) {
      return true
    }
    if (!isValidURL(docLink)) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (foldersData) {
      const rawFolders = foldersData?.folders?.edges
      setFolders(rawFolders.map(({ node }) => node))
    }
  }, [foldersData])

  useEffect(() => {
    if (gettingFile) {
      setConfirmationDrawerHelper(true)
    }
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

  const handleUploadError = (response: any) => {
    setUploadStart(false)
    setProgress(0)
    setUploadFailed(true)
    logError(response.message)
  }

  const getMimeIcon = (name: string) => {
    if (name.includes('pdf')) {
      return <PictureAsPdfOutlinedIcon className={styles.red} />
    }
    if (name.includes('jpg') || name.includes('jpeg') || name.includes('png')) {
      return <Image className={styles.blue} />
    }
    return <FileText className={styles.green} />
  }

  const isFileShared = (sharedfileSet: any) => {
    return !!sharedfileSet?.edges.length
  }

  const getSharedAt = (row: any) => {
    const sharedAt = row?.sharedfileSet.edges[0]?.node?.updatedAt

    if (sharedAt) {
      return dayjs(sharedAt).format("DD MMM' YY")
    }

    return ''
  }

  useEffect(() => {
    if (data) {
      const rawFiles = data.files.edges
        .map((ed: { node: IFiles }) => ed.node)
        .map((ed: any) => ({
          ...ed,
          shared: isFileShared(ed.sharedfileSet),
        }))

      // parse shared file set
      const categorizedFiles = groupBy(rawFiles, 'category')
      setFilteredFiles(categorizedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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

  const closeFileSharing = () => {
    setAnchorEl(null)
    refetch()
  }
  const persistData = (
    docMeta: DocMeta,
    storeKey: string,
    mimeVal: any,
    fileSize: number,
    driveLink: any,
    fileName: any
  ) => {
    let input: any = {
      description: docMeta.description,
      antaraId: member['Antara ID'],
      storageKey: storeKey,
      addedBy: user?.email,
      mimeType: mimeVal,
      fileSize,
      category: docMeta.docType,
      driveUrl: driveLink,
      title: docMeta.title,
      recordId: member.recID,
      fileName,
    }

    if (docMeta.shareWith) {
      input = {
        ...input,
        shareWith: docMeta.shareWith,
        folder: docMeta.folder,
      }
    }

    saveFile({
      variables: {
        input,
      },
    }).then((res) => {
      setUploadStart(false)
      setProgress(100)
      if (res.data.saveFile.status !== 200) {
        setUploadFailed(true)
      } else {
        setUploadSuccessful(true)
        refetch()

        // track upload and share events
        if (docMeta.shareWith) {
          analytics.track('File shared with member', {
            ...input,
          })
        }
      }
    })
  }
  const uploadDocument = (docMeta: DocMeta) => {
    filesRef.current = docMeta
    setUploadStart(true)
    let fileName: any = null
    let storeKey =
      filesContent.length > 0
        ? `${member['Antara ID']}/${docMeta.docType}/${filesContent[0].name}`
        : docLink
    let fileSize = 0
    let driveLink: any = null
    let mimeVal: any = null
    const formData = new FormData()

    if (filesContent.length === 0) {
      try {
        driveLink = docLink
        fileSize = 0
        mimeVal = 'doc'
        fileName = docLink
        persistData(docMeta, storeKey, mimeVal, fileSize, driveLink, fileName)
      } catch (err: any) {
        if (err.name === 'Network Error') {
          setNetworkError(true)
        }
        handleUploadError(err)
      } finally {
        // no need to proceed if the doc was uploaded via link
        // eslint-disable-next-line no-unsafe-finally
        return
      }
    }
    getUploadLink({
      variables: {
        duration: 50000,
        storageKey: storeKey,
        forceReplace: shouldReplaceFile,
      },
    })
      .then((res) => {
        if (res.data.generateUploadLink.errors) {
          setFileError(res.data.generateUploadLink.message)
          setShouldReplaceFile(false)
          throw new Error(res.data.generateUploadLink.message)
        } else {
          setShouldReplaceFile(false)
          return res.data.generateUploadLink
        }
      })
      .then((res) => {
        Object.keys(res.link.fields).forEach((key) => {
          formData.append(key, res.link.fields[key])
        })
        try {
          if (filesContent.length > 0 && !docLink) {
            fileName = filesContent[0].name.split('.')
            fileName.pop()
            fileName = fileName.join('.')
            formData.append('file', plainFiles[0])
            storeKey = `${member['Antara ID']}/${docMeta.docType}/${filesContent[0].name}`
            mimeVal = mime.lookup(filesContent[0].name)
            fileSize = plainFiles[0].size
            const config = {
              onUploadProgress: (progressEvent: any) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                )
                setProgress(percentCompleted - 10)
              },
            }
            axios
              .post(`${res.link.url}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Accept: 'application/json',
                },
                ...config,
              })
              .then(() => {
                persistData(
                  docMeta,
                  storeKey,
                  mimeVal,
                  fileSize,
                  driveLink,
                  fileName
                )
              })
          }
        } catch (err: any) {
          if (err.name === 'Network Error') {
            setNetworkError(true)
          }
          handleUploadError(err)
        }
      })
      .catch((e) => logError(e))
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
    setProgress(0)
    setFileError('')
    setUploadSuccessful(false)
    setUploadFailed(false)
    setdocLink(undefined)
    setConfirmationDrawerHelper(false)
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
      {!uploadErrored && (
        <FilterComponent
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
                    uploadDocument(filesRef.current)
                    setUploadFailed(false)
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
                                  />
                                  <TableBody>
                                    {stableSort(
                                      filteredFiles[key],
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
                                                  <ShareFileOptions
                                                    anchorEl={anchorEl}
                                                    open={!!anchorEl}
                                                    id={
                                                      anchorEl
                                                        ? 'folder-popup'
                                                        : undefined
                                                    }
                                                    close={closeFileSharing}
                                                    folders={folders}
                                                    fileId={row?.id}
                                                  />
                                                  <button
                                                    className={styles.shareBtn}
                                                    onClick={(
                                                      e: React.MouseEvent<HTMLElement>
                                                    ) =>
                                                      setAnchorEl(
                                                        anchorEl
                                                          ? null
                                                          : e.currentTarget
                                                      )
                                                    }
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
                                                onClick={() =>
                                                  showFileDetails(row)
                                                }
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
          file={fileDetails}
          close={() => showFileDetails(null)}
          showFile={handleClick}
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
