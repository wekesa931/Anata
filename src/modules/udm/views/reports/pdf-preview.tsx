import React, { useState } from 'react'
import { useMember } from 'src/context/member'
import { Download, Edit, Refresh } from '@mui/icons-material'
import { Loader, X, AlertTriangle } from 'react-feather'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import PortalWindow from 'src/components/portal'
import SuccessPrompt from 'src/modules/member/views/member-registration/components/success-registration'
import { v4 as uuidV4 } from 'uuid'
import { DocMeta } from 'src/modules/udm/types'
import { useUdmData } from 'src/modules/udm/hooks/udm.data'
import { useTasksData } from 'src/modules/tasks/hooks/tasks.data'
import { TaskDefinitionTypes } from 'src/modules/tasks/types'
import { useModuleAnalytics } from 'src/modules/analytics'

type Props = {
  loadingData?: boolean
  setShowPdfPreview: (value: boolean) => void
  docMeta: DocMeta
  isEmpty?: boolean
  children: React.ReactElement<any>
  isInPatient?: boolean
  closeWindow: () => void
  allowEdit?: boolean
  modalHeader?: string
}

function PdfPreview({
  loadingData,
  setShowPdfPreview,
  docMeta,
  isEmpty = false,
  children,
  isInPatient = false,
  closeWindow,
  allowEdit = true,
  modalHeader,
}: Props) {
  const { member } = useMember()

  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [showSuccess, setShowSuccess] = useState(false)
  const [fileId, setFileId] = useState<string>('')
  const { trackNewDocumentGenerated } = useModuleAnalytics()
  const { createTaskFromTemplate } = useTasksData()

  const handleClosePortalWindow = () => {
    setOpen(false)
    closeWindow()
  }

  const { handleUploadDocument } = useUdmData()

  const uploadDocument = (file: any) => {
    const options = {
      document: docMeta,
      file,
      fileSize: file.size,
      shouldUploadByLink: false,
      fileName: `${uuidV4()}.pdf`,
    }
    return handleUploadDocument(options)
  }

  const handleSaveReport = () => {
    setLoading(true)

    pdf(children)
      .toBlob()
      .then((blob) => {
        uploadDocument(blob).then((res) => {
          const documentId = res?.data?.id?.toString()
          setFileId(documentId)
          trackNewDocumentGenerated(docMeta, true)
          createTaskFromTemplate(TaskDefinitionTypes.NewDocument)
        })
        setTimeout(() => {
          setLoading(false)
          setShowSuccess(true)
        }, 2000)
      })
      .catch((err) => {
        setLoading(false)
        setError(err)
        trackNewDocumentGenerated(docMeta, false)
      })
  }

  const { trackNewDocumentPreviewEdited } = useModuleAnalytics()

  return (
    <>
      {!showSuccess && (
        <Dialog
          open={open}
          onClose={handleClosePortalWindow}
          scroll="paper"
          className="pdf-dialog w-1/2"
          fullWidth
          maxWidth="lg"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle
            id="scroll-dialog-title"
            className="d-flex align-center flex-between text-left border border-solid font-bold text-dark-blue-100"
          >
            {member?.fullName}
            <DialogActions>
              {allowEdit && (
                <Button
                  autoFocus
                  onClick={() => {
                    setShowPdfPreview(false)
                    trackNewDocumentPreviewEdited(docMeta)
                  }}
                >
                  <Edit className="file-action-btn" />
                  <Typography className="file-action-button-text text-blue-100 font-medium">
                    Edit Details
                  </Typography>
                </Button>
              )}
              {error ? (
                <Button
                  autoFocus
                  onClick={handleSaveReport}
                  className="hover:bg-red-10"
                >
                  <Refresh className="file-action-btn text-red-100" />
                  <Typography className="file-action-button-text text-red-100 font-medium">
                    Retry
                  </Typography>
                </Button>
              ) : (
                <Button autoFocus onClick={handleSaveReport}>
                  {loading || loadingData ? (
                    <>
                      <Loader className="file-action-btn" />
                      <Typography className="file-action-button-text text-blue-100 font-medium">
                        Generating Report
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Download className="file-action-btn" />
                      <Typography className="file-action-button-text text-blue-100 font-medium">
                        Generate Report
                      </Typography>
                    </>
                  )}
                </Button>
              )}
              <Button autoFocus onClick={handleClosePortalWindow}>
                <X className="file-close-btn" />
              </Button>
            </DialogActions>
          </DialogTitle>
          <DialogContent dividers>
            <div className="h-full w-full">
              {error && (
                <div className="bg-red-10 p-2 flex items-center mb-4">
                  <X className="w-16 h-16 text-red-100 mr-2 font-bold" />
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Report Generation Failed
                    </h2>
                    <p className="text-sm break-words">
                      Please double-check your entered data and try again. If
                      the issue continues, contact the support team for help.
                    </p>
                  </div>
                </div>
              )}
              {isEmpty && !isInPatient && (
                <div className="bg-orange-10 p-2 flex items-center gap-2">
                  <AlertTriangle className="w-8 h-8 text-orange-100 mr-4 font-bold" />
                  <div>
                    <h2 className="text-lg font-semibold mb-1">
                      Not sufficient data to generate report
                    </h2>
                    <p className="text-sm break-words">
                      Please add data to generate the report
                    </p>
                  </div>
                </div>
              )}
              <PDFViewer
                width="100%"
                height="100%"
                showToolbar={false}
                style={{ border: 'none', padding: 12 }}
              >
                {children}
              </PDFViewer>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {showSuccess && open && (
        <PortalWindow
          closeWindow={handleClosePortalWindow}
          title={!modalHeader ? 'Health report generation' : modalHeader}
          height={40}
        >
          <div className="px-4">
            <SuccessPrompt
              formFilled="pdfGenerate"
              successMessage="The document has been generated"
              headerMessage="Would you like to share this document with the member?"
              customMessage="Sharing will make the document available in the app for the member"
              handleClose={handleClosePortalWindow}
              fileId={fileId}
            />
          </div>
        </PortalWindow>
      )}
    </>
  )
}

export default PdfPreview
