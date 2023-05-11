import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material'
import React from 'react'

type ConfirmDialogProps = {
  open: boolean
  handleStay: () => void
  handleLeave: () => void
}
function ConfirmDialog({ open, handleStay, handleLeave }: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleLeave}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Data saved successfully.
        <Typography sx={{ padding: '0 50px 0 20px' }}>
          Would you like to submit another response?
        </Typography>
      </DialogTitle>

      <DialogActions>
        <Button color="inherit" variant="contained" onClick={handleStay}>
          {' '}
          Yes{' '}
        </Button>
        <Button
          color="info"
          variant="contained"
          onClick={handleLeave}
          autoFocus
        >
          {' '}
          No{' '}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
