import React, { useEffect, useState } from 'react'
import { throttle } from 'throttle-debounce'
import Button from '@mui/material/Button'
import { Search, Upload, Grid as FeatherGrid, List } from 'react-feather'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { useModuleAnalytics } from 'src/modules/analytics'
import styles from 'src/modules/udm/files.component.css'
import { useUdmData } from 'src/modules/udm/hooks/udm.data'
import Tooltip from 'src/components/tooltip'
import { UploadOptions } from 'src/modules/udm/components/upload-options'

export function FilterView({
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
  fileTypes,
}: any) {
  const [fileCategory, setFileCategory] = useState<string | undefined>(
    undefined
  )
  const [fileMime, setfileMime] = useState<string | undefined>(undefined)
  const [filterDate, setFilterDate] = useState<Date | null>(null)
  const [docTitle, setDocTitle] = useState<string | undefined>(undefined)

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
  const { getFiles, loading } = useUdmData()

  const { trackDocumentSearched } = useModuleAnalytics()

  const removeFilters = () => {
    setFileCategory(undefined)
    setfileMime(undefined)
    setFilterDate(null)
    setDocTitle(undefined)
  }
  useEffect(() => {
    const throttleFunc = throttle(
      1000,
      () => {
        const filters = {
          search: docTitle,
          mimeType: fileMime,
          fileCategory_Name: fileCategory,
          updatedAt_Gte: filterDate || undefined,
        }

        getFiles(filters).then((files) => {
          filtered(files)
          trackDocumentSearched(filters)
        })
      },
      { debounceMode: true, noTrailing: true }
    )

    return throttleFunc()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileCategory, fileMime, filterDate, docTitle])

  useEffect(() => {
    setfiltering(loading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

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
            onChange={(e) => setFileCategory(e.target.value as string)}
          >
            {fileTypes.map((file: any) => (
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
              inputFormat="dd/MM/yyyy"
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
