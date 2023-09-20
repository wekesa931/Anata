import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { Popper, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import logError from 'src/utils/logging/logger'
import ToastNotification, {
  defaultToastMessage,
  ToastMessage,
} from 'src/components/toasts/toast-notification'
import { useModuleAnalytics } from 'src/modules/analytics'
import styles from 'src/modules/udm/files.component.css'
import { Folder } from 'src/modules/udm/types'
import { useUdmData } from 'src/modules/udm/hooks/udm.data'

type Props = {
  open: boolean
  anchorEl: HTMLElement | null
  id: string | undefined
  close: () => void
  folders: Folder[]
  fileId: number
}
export function ShareFileView({
  open,
  anchorEl,
  id,
  close,
  folders,
  fileId,
}: Props) {
  const [folder, setFolder] = useState<string>('')
  const [toastMessage, setToastMessage] =
    useState<ToastMessage>(defaultToastMessage)
  const { trackDocumentShared } = useModuleAnalytics()
  const { handleShareFile, sharingFile: sharing } = useUdmData()

  const shareFile = () => {
    handleShareFile(fileId, folder)
      .then((res) => {
        const message = res?.message

        setToastMessage({
          ...toastMessage,
          message,
        })

        trackDocumentShared(res?.sharedFile)
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
