import React from 'react'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import { X } from 'react-feather'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Divider, IconButton, Popper, styled } from '@mui/material'
import { FileDetailsSection } from 'src/modules/udm/components/file-details-section'

const DrawerHeader = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingLeft: 2,
}))

export function FileDetails({
  file,
  anchorEl,
  id,
  showFile,
  close,
  open,
}: any) {
  const sharingInfo = file?.sharedfileSet?.edges[0]?.node
  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Paper
        sx={{
          p: 1,
          width: 300,
          position: 'relative',
          bgcolor: 'background.paper',
        }}
        elevation={3}
      >
        <Box>
          <DrawerHeader>
            <Typography variant="h6" component="div">
              {file?.title}
            </Typography>
            <IconButton onClick={close}>
              <X />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <FileDetailsSection
            title="Uploaded at"
            value={dayjs(file?.createdAt).format("DD MMM' YYYY, HH:mm")}
          />
          <FileDetailsSection
            title="Shared status"
            value={
              file?.shared ? 'Shared with member' : 'Not shared with member'
            }
          />
          {file?.shared && (
            <>
              <FileDetailsSection
                title="Shared by"
                value={sharingInfo?.sharedBy}
              />
              <FileDetailsSection
                title="Member shared folder"
                value={sharingInfo?.folder?.name}
              />
              <FileDetailsSection
                title="Has member read"
                value={sharingInfo?.read ? 'Read' : 'Not read'}
              />
            </>
          )}
          <Button variant="text" onClick={(e) => showFile(e, file)}>
            View file
          </Button>
          {file?.driveUrl?.includes('https://docs.google.com') ? (
            <Button
              variant="text"
              onClick={() => window.open(file?.driveUrl, '_blank')?.focus()}
            >
              Edit File
            </Button>
          ) : null}
        </Box>
      </Paper>
    </Popper>
  )
}
