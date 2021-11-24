import React, { useState } from 'react'
import { Search } from 'react-feather'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import { useUser } from '../../../../context/user-context'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

type DocMeta = {
  docType: string
  description: string
  title: string
}

type IProps = {
  uploadStart: boolean
  uploadDocument: (docMeta: DocMeta) => void
}

const RefinedFileMetaForm = ({ uploadStart, uploadDocument }: IProps) => {
  const user = useUser()
  const [docType, setDocType] = useState<string>(null)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const options = [
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

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  return (
    <>
      <Box className="relative">
        <label
          htmlFor="combo-box-demo"
          className="form-label search-input-label"
        >
          Search Document Type...
        </label>
        <Search className="input-search" width={15} height={15} />
        <Autocomplete
          className="auto-complete-input"
          disablePortal
          id="combo-box-demo"
          options={options}
          onChange={(_e, newValue) => setDocType(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
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
      <Box className="doc-upload-button">
        <Button
          variant={uploadStart ? 'outlined' : 'contained'}
          disabled={!docType || !title || uploadStart}
          onClick={() =>
            uploadDocument({
              docType,
              description: description || title,
              title,
            })
          }
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
