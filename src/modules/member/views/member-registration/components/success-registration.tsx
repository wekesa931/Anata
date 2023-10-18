import { ChildCareOutlined, Person2Outlined } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { Check, Share, X } from 'react-feather'
import PrimaryButton from 'src/components/buttons/primary'
import { useNotifications } from 'src/context/notifications'
import useAnalytics from 'src/hooks/analytics'
import { useModuleAnalytics } from 'src/modules/analytics'
import { Member } from 'src/modules/member/db/models'
import { useUdmData } from 'src/modules/udm/hooks/udm.data'
import { useDocumentsReadApi } from 'src/modules/udm/services/udm.api'
import logError from 'src/utils/logging/logger'

type SuccessfulProps = {
  title?: string
  member?: Member
  formFilled?: 'primary' | 'dependent' | 'child' | 'pdfGenerate'
  setSelectedForm?: (form: any) => void
  isRosterMember?: boolean
  successMessage: string
  headerMessage: string
  customMessage: string
  handleClose?: () => void
  fileId?: string
  primaryMember?: Member
}

function SuccessPrompt({
  title,
  member,
  formFilled,
  setSelectedForm,
  isRosterMember,
  successMessage,
  headerMessage,
  customMessage,
  handleClose,
  fileId,
  primaryMember,
}: SuccessfulProps) {
  const analytics = useAnalytics('Member registration')

  useEffect(() => {
    if (formFilled !== 'pdfGenerate') {
      analytics.track('Member registered', {
        source: isRosterMember ? 'Roster' : 'Form',
        // eslint-disable-next-line no-underscore-dangle
        member: member?._raw,
        registrationType: formFilled,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { handleShareFile, sharingFile: sharing } = useUdmData()
  const { findFolderByName } = useDocumentsReadApi()
  const { trackNewDocumentShared } = useModuleAnalytics()
  const { notify } = useNotifications()

  const shareFile = () => {
    findFolderByName('Health Reports').then((res) => {
      const folderId = res?.node?.id
      handleShareFile(fileId, folderId)
        .then((response) => {
          const message = response?.message
          notify(message)
          trackNewDocumentShared(response?.sharedFile)
        })
        .catch((err) => {
          logError(err)
          notify('An error occurred while sharing the file')
          trackNewDocumentShared(fileId, false)
        })
        .finally(() => {
          handleClose && handleClose()
        })
    })
  }

  return (
    <div className="p-2 flex flex-col gap-4 font-rubik text-left">
      <h1 className="w-full text-left text-dark-blue-100 font-rubik text-xl font-medium mb-2">
        {title}{' '}
      </h1>
      <div className="bg-green-10 rounded-lg p-2 flex justify-start items-center gap-4">
        <Check size={24} className="text-green-100" />
        <div className="font-rubik text-dark-blue-100 text-base">
          <h2 className="font-medium">Success!</h2>
          <p>{successMessage}</p>
        </div>
      </div>
      <div className="text-grey-main">
        <h2 className="text-lg">{headerMessage}</h2>
        <p className="text-base">{customMessage}</p>
        <div className="flex justify-between items-center gap-2 mt-4">
          {formFilled === 'primary' && setSelectedForm && (
            <PrimaryButton
              variant="outlined"
              startIcon={<Person2Outlined />}
              onClick={() =>
                setSelectedForm({
                  name: 'dependent',
                  member: primaryMember || member,
                  completed: false,
                  title: 'Adult dependent registration',
                })
              }
            >
              Add a dependent
            </PrimaryButton>
          )}
          {setSelectedForm && (
            <PrimaryButton
              variant="outlined"
              startIcon={<ChildCareOutlined />}
              onClick={() =>
                setSelectedForm({
                  name: 'child',
                  member: primaryMember || member,
                  completed: false,
                  title: 'Child registration',
                })
              }
            >
              {formFilled === 'child' ? 'Add another child' : 'Add a child'}
            </PrimaryButton>
          )}
          {formFilled === 'pdfGenerate' && (
            <>
              <PrimaryButton
                fullWidth
                variant="outlined"
                onClick={handleClose}
                startIcon={
                  <X className="w-6 h-6 rounded-full bg-blue-btn text-white hover:bg-blue-btn" />
                }
              >
                Not now
              </PrimaryButton>
              <PrimaryButton
                fullWidth
                variant="contained"
                startIcon={<Share />}
                onClick={shareFile}
                loading={sharing}
              >
                Share
              </PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SuccessPrompt
