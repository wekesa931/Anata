import React, { useEffect, useState } from 'react'
import { Search } from 'react-feather'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import { Checkbox, FormControlLabel, InputLabel } from '@mui/material'
import { useQuery } from '@apollo/client'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useUser } from '../../../../context/user-context'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { GET_FOLDERS } from './files.gql'
import { useMember } from '../../../../context/member.context'

type DocMeta = {
  docType: string
  description: string
  title: string
  shareWith?: string[]
  folder?: string
}

type IProps = {
  uploadStart: boolean
  uploadDocument: (docMeta: DocMeta) => void
  options: string[]
}

type AppFolders = {
  id: string
  name: string
}

function RefinedFileMetaForm({ uploadStart, uploadDocument, options }: IProps) {
  const user = useUser()
  const { member } = useMember()
  const [docType, setDocType] = useState<string>('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [shareChecked, setShareChecked] = useState(false)
  const [shareFolder, setShareFolder] = useState<string>('')
  const [folders, setFolders] = useState<AppFolders[]>([])

  const { data } = useQuery(GET_FOLDERS)

  useEffect(() => {
    if (data) {
      const rawFolders = data?.folders?.edges

      setFolders(rawFolders.map(({ node }) => node))
    }
  }, [data])

  const handleUploadDoc = () => {
    let meta: DocMeta = {
      docType,
      description: description || title,
      title,
    }

    if (shareChecked && !!shareFolder) {
      meta = {
        ...meta,
        shareWith: [member['Antara ID']],
        folder: shareFolder,
      }
    }

    uploadDocument(meta)
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const renderSearchBox = (
    label: string,
    searchOptions: Array<string>,
    handleChange: (v: string) => void,
    defaultValue = ''
  ) => (
    <Box className="relative">
      <label htmlFor="combo-box-demo" className="form-label search-input-label">
        {label}
      </label>
      <Search className="input-search" width={15} height={15} />
      <Autocomplete
        className="auto-complete-input"
        disablePortal
        id="combo-box-demo"
        options={searchOptions}
        defaultValue={defaultValue}
        onChange={(_e, newValue) => handleChange(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  )

  return (
    <>
      {renderSearchBox('Search Document Type...', options, setDocType)}
      <label htmlFor="standard-basic" className="form-label">
        Title*
      </label>
      <Box className="upload-fields">
        <TextField
          sx={{ width: '100%' }}
          id="standard-basic"
          variant="standard"
          onChange={onTitleChange}
          value={title}
        />
      </Box>
      <label htmlFor="standard-basic" className="form-label">
        Description
      </label>
      <Box className="upload-fields">
        <TextField
          sx={{ width: '100%' }}
          id="standard-basic"
          variant="standard"
          onChange={onDescriptionChange}
          value={description}
        />
      </Box>
      <label htmlFor="standard-basic" className="form-label">
        Creator
      </label>
      <Box className="upload-fields">
        <TextField
          sx={{ width: '100%' }}
          disabled
          id="standard-basic"
          variant="standard"
          value={user?.email}
        />
      </Box>
      <label htmlFor="standard-basic" className="form-label">
        Sharing
      </label>
      <Box className="upload-fields">
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => setShareChecked(event.target.checked)}
            />
          }
          label="Share doc with member once it's uploaded"
          sx={{ mt: 1, color: 'var(--dark-blue-50)', fontSize: '16px' }}
          checked={shareChecked}
        />
      </Box>
      {shareChecked && (
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="folder">Choose folder</InputLabel>
          <Select
            labelId="folder"
            label="Choose folder"
            id="select-folder"
            value={shareFolder}
            onChange={(e: SelectChangeEvent) =>
              setShareFolder(e.target.value as string)
            }
          >
            {folders.map((f) => (
              <MenuItem key={f.id} value={f.name}>
                {f.name}{' '}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Box className="doc-upload-button">
        <Button
          variant={uploadStart ? 'outlined' : 'contained'}
          disabled={!docType || !title || uploadStart}
          onClick={handleUploadDoc}
        >
          {uploadStart ? (
            <div className="d-flex flex-direction-column flex-align-center">
              <LoadingIcon />
              <p className="text-small">Uploading File</p>
            </div>
          ) : (
            'Upload'
          )}
        </Button>
      </Box>
    </>
  )
}

export default RefinedFileMetaForm
