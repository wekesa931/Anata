import React, { useState } from 'react'
import { useMember } from 'src/context/member'
import {
  Download,
  Edit,
  Refresh,
  CheckCircle,
  Error,
} from '@mui/icons-material'
import { Loader, X, AlertTriangle } from 'react-feather'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  LinearProgress,
} from '@mui/material'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import PortalWindow from 'src/components/portal'
import SuccessPrompt from 'src/modules/member/views/member-registration/components/success-registration'
import { v4 as uuidV4 } from 'uuid'
import { DocMeta } from 'src/modules/udm/types'
import { useUdmData } from 'src/modules/udm/hooks/udm.data'
import {
  useDocumentsWriteApi,
  useDocumentsReadApi,
} from 'src/modules/udm/services/udm.api'
import { useTasksData } from 'src/modules/tasks/hooks/tasks.data'
import { TaskDefinitionTypes } from 'src/modules/tasks/types'
import { useModuleAnalytics } from 'src/modules/analytics'
import dayjs from 'dayjs'
import * as yup from 'yup'
import PrimaryButton from 'src/components/buttons/primary'
import { Form } from 'formik'
import PrimaryForm from 'src/components/forms/primary-form'
import GroupedSearchField from 'src/components/forms/fields/grouped-search-field'
import { useRegistrationForm } from 'src/context/member-registration'
import logError from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'

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
  generatePDFCustomBtn?: React.ReactNode
  modalLabel?: string
  startTime?: any
  createReviewTask?: boolean
}

type Progress = {
  title: string
  isSuccesful: boolean
  pid: number
  inProgress: boolean
  show: boolean
  errored?: boolean
}

type ProgressStack = Progress[]

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
  generatePDFCustomBtn,
  modalLabel,
  startTime,
  createReviewTask = true,
}: Props) {
  const { member } = useMember()

  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [showSuccess, setShowSuccess] = useState(false)
  const [fileId, setFileId] = useState<string>('')
  const {
    trackNewDocumentGenerated,
    trackPeriodToDocumentGeneration,
    trackNewDocumentShared,
  } = useModuleAnalytics()

  const { notify } = useNotifications()

  const { createTaskFromTemplate } = useTasksData()

  const { createMedicationDeliveryTask, confirmMedicationDeliveryTask } =
    useDocumentsWriteApi()

  const [showProgress, setShowProgress] = useState(false)
  const [pickOptions, setPickOptions] = useState(false)
  const [completeTasksCreation, setCompleteTasksCreation] = useState(false)

  const handleClosePortalWindow = () => {
    setOpen(false)
    closeWindow()
  }

  const { handleUploadDocument, handleShareFile } = useUdmData()
  const { findFolderByName } = useDocumentsReadApi()

  const { antaraPharmtechs } = useRegistrationForm()

  const [formValues, setFormValues] = useState({
    autoPickPharmtech: true,
    selectedPharmtech: '',
    shareDocument: false,
  })

  const validationSchema = yup.object().shape({
    autoPickPharmtech: yup.boolean().optional(),
    selectedPharmtech: yup.string().nullable(),
    shareDocument: yup.boolean().optional(),
  })

  const pharmtechRef = React.useRef(null)
  const shareDocRef = React.useRef<boolean>(false)
  const createMedicationDelRef = React.useRef<any>(null)
  const confirmMedicationDelRef = React.useRef<any>(null)
  const fileIdRef = React.useRef<any>(null)

  const udmOptionsPicked = async (values: any) => {
    let pharmtech = null
    if (values.autoPickPharmtech && antaraPharmtechs.length > 1) {
      pharmtech = autoPickRandomPharmtech(antaraPharmtechs)
    } else if (values.autoPickPharmtech && antaraPharmtechs.length === 1) {
      pharmtech =
        process.env.PROD === 'true' ? 'recu5uc1XUF8Rp14l' : 'recU1c3FqsXVm0OR4'
    } else {
      pharmtech = values.selectedPharmtech
    }
    pharmtechRef.current = pharmtech
    shareDocRef.current = values.shareDocument
    setPickOptions(true)
    setShowProgress(true)
    const payload = {
      Member: [member?.airtableRecordId],
      'Task definition':
        process.env.PROD === 'true'
          ? ['recCL3eSiTjV0Hfob']
          : ['recutE8UEOsAvU73u'],
      Status: 'Not Started',
      'Task Priority': 'P0',
      'Task Notes': `Prescription Verification: view the latest prescription in the member's Docs and verify the following details: drug dosage, dosage form, duration, previous prescriptions that the member had/refilled.
        Review slack notification thread to check for doctor's notes on delivery preferences.
        Review recent interaction logs, to check on incidents around past deliveries or provider engagement.
        Call member to determine their preferred delivery location, brand preference and/or any allergies therein.
        Determine the best provider pharmacy, contact them and share prescription & claim documents for processing.
        Update interaction logs.`,
      Assignee: [pharmtechRef.current],
    }
    createMedicationDelRef.current = payload
    const confirmMedicationPayload = {
      Member: [member?.airtableRecordId],
      Status: 'Not Started',
      Assignee: [pharmtechRef.current],
      'Task definition':
        process.env.PROD === 'true'
          ? ['recXckw3qBntshGbB']
          : ['rec48Fl5tTYRt3QI8'],
      'Task Priority': 'P0',
      'Task Notes': `Follow up with pharmacy to determine processing progress and appraise member, until member confirms delivery.
        Fill in the "Refill facility from Provider base" in HNOS: Prescription table, for each medication.
        Update interaction logs.`,
    }
    confirmMedicationDelRef.current = confirmMedicationPayload
    await saveReport()
    await submitDocument()
  }

  /** pick random pharmatech */
  const autoPickRandomPharmtech = (pharmtechList: any[]) => {
    if (!pharmtechList.length) return null

    const randomIndex = Math.floor(Math.random() * pharmtechList.length)
    return pharmtechList[randomIndex].id
  }

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
  const prescriptionGenerationEvent = () => {
    const shouldTrackDuration = modalLabel === 'Prescription generation'
    const endTime = dayjs()

    if (shouldTrackDuration) {
      const durationInSeconds = endTime.diff(startTime, 'seconds')
      trackPeriodToDocumentGeneration(docMeta, durationInSeconds)
    }
  }

  const createDocumentReviewTask = () =>
    createReviewTask &&
    createTaskFromTemplate(TaskDefinitionTypes.NewDocument, docMeta.docType)

  const handleSaveReport = () => {
    if (docMeta?.docType === 'Prescription') {
      setShowSuccess(true)
    } else {
      saveReport()
    }
  }

  const saveReport = async () => {
    setLoading(true)
    prescriptionGenerationEvent()
    pdf(children)
      .toBlob()
      .then((blob) => {
        uploadDocument(blob).then((res) => {
          const documentId = res?.data?.id?.toString()
          setFileId(documentId)
          fileIdRef.current = documentId
          trackNewDocumentGenerated(docMeta, true)
          createDocumentReviewTask()
          prescriptionGenerationEvent()
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

  const shareFile = async () => {
    try {
      const res = await findFolderByName('Health Reports')
      const folderId = res?.node?.id
      const response = await handleShareFile(fileIdRef.current, folderId)
      trackNewDocumentShared(response?.sharedFile)
      return response
    } catch (err) {
      logError(err)
      notify('An error occurred while sharing the file')
      trackNewDocumentShared(fileId, false)
      throw err
    }
  }

  const { trackNewDocumentPreviewEdited } = useModuleAnalytics()

  /** Progress tracking stack */
  const createMedicationDeliveryTaskProgress: Progress = {
    title: 'Creating medication coordinate delivery task...',
    inProgress: true,
    isSuccesful: false,
    pid: 1,
    show: false,
  }

  const confirmMedicationDeliveryTaskProgress: Progress = {
    title: 'Medication delivery task confirmation...',
    inProgress: true,
    isSuccesful: false,
    pid: 2,
    show: false,
  }

  const shareFileTaskProgress: Progress = {
    title: 'Sharing file with member...',
    inProgress: true,
    isSuccesful: false,
    pid: 3,
    show: false,
  }

  const [progressStack, setProgressStack] = useState<ProgressStack>([
    createMedicationDeliveryTaskProgress,
    confirmMedicationDeliveryTaskProgress,
    shareFileTaskProgress,
  ])

  const updateProgressStack = (progress: Progress) => {
    setProgressStack((prev) => {
      return prev.map((p) => {
        if (p.pid === progress.pid) {
          return { ...progress, show: true }
        }
        return p
      })
    })
  }

  const [submittingDocument, setSubmittingDocument] = useState(false)
  const [retryTask, setRetryTask] = useState<any>(null)

  const setProcessError = (msg: string) => {
    setError(
      `We encountered an error while finishing ${msg.toLowerCase()}. Please retry to resolve it.`
    )
    setSubmittingDocument(false)
  }

  const submitDocument = async () => {
    updateProgressStack({ ...createMedicationDeliveryTaskProgress, show: true })
    try {
      await createMedicationDeliveryTask(createMedicationDelRef.current)
      updateProgressStack({
        ...createMedicationDeliveryTaskProgress,
        inProgress: false,
        isSuccesful: true,
      })
    } catch (err) {
      updateProgressStack({
        ...createMedicationDeliveryTaskProgress,
        inProgress: false,
        isSuccesful: false,
        errored: true,
      })
      setProcessError(createMedicationDeliveryTaskProgress.title)
      setRetryTask(() => () => resumeFrom(1, createMedicationDelRef.current))
      return
    }

    updateProgressStack({
      ...confirmMedicationDeliveryTaskProgress,
      show: true,
    })
    try {
      await confirmMedicationDeliveryTask(confirmMedicationDelRef.current)
      updateProgressStack({
        ...confirmMedicationDeliveryTaskProgress,
        inProgress: false,
        isSuccesful: true,
      })
      if (!shareDocRef.current) {
        setTimeout(() => setCompleteTasksCreation(true), 1000)
      }
    } catch (err) {
      updateProgressStack({
        ...confirmMedicationDeliveryTaskProgress,
        inProgress: false,
        isSuccesful: false,
        errored: true,
      })
      setProcessError(confirmMedicationDeliveryTaskProgress.title)
      setRetryTask(() => () => resumeFrom(2, confirmMedicationDelRef.current))
      return
    }
    // share Document is true
    if (shareDocRef.current) {
      updateProgressStack({
        ...shareFileTaskProgress,
        show: true,
      })
      try {
        await shareFile()
        updateProgressStack({
          ...shareFileTaskProgress,
          inProgress: false,
          isSuccesful: true,
        })
        setTimeout(() => setCompleteTasksCreation(true), 1000)
      } catch (err) {
        updateProgressStack({
          ...shareFileTaskProgress,
          inProgress: false,
          isSuccesful: false,
          errored: true,
        })
        setProcessError(shareFileTaskProgress.title)
        setRetryTask(() => () => resumeFrom(3))
      }
    }
  }

  const retryCurrentProcess = () => {
    setSubmittingDocument(true)
    setError(null)
    retryTask?.()
  }

  const medicationCordinationSteps: {
    progress: Progress
    fn: (values: any) => Promise<void>
  }[] = [
    {
      progress: createMedicationDeliveryTaskProgress,
      fn: (v) => createMedicationDeliveryTask(v),
    },
    {
      progress: confirmMedicationDeliveryTaskProgress,
      fn: (v) => confirmMedicationDeliveryTask(v),
    },
    {
      progress: shareFileTaskProgress,
      fn: () => shareFile(),
    },
  ]

  /** retry function whenever a step fails */
  const resumeFrom = async (startStep: number, values?: any) => {
    setError(null)
    setSubmittingDocument(true)

    for (let i = startStep - 1; i < medicationCordinationSteps.length; i + 1) {
      const { progress, fn } = medicationCordinationSteps[i]

      updateProgressStack({ ...progress, show: true })
      try {
        // eslint-disable-next-line no-await-in-loop
        await fn(values)
        updateProgressStack({
          ...progress,
          inProgress: false,
          isSuccesful: true,
        })
      } catch (err) {
        updateProgressStack({
          ...progress,
          inProgress: false,
          isSuccesful: false,
          errored: true,
        })
        setProcessError(progress.title)
        setRetryTask(() => () => resumeFrom(i + 1, values))
        return
      }
    }

    setCompleteTasksCreation(true)
    setRetryTask(null)
  }

  function ProgressStackComponent() {
    return (
      <div className="mt-4">
        <Stack direction="column" spacing={2}>
          {progressStack.map((item) => (
            <div key={item.pid}>
              {item.show && (
                <div className="w-full flex flex-col gap-2 font-rubik">
                  <div className="w-full flex justify-between items-center text-base text-dark-blue-100">
                    {item.title}
                    {item.isSuccesful && (
                      <CheckCircle className="text-green-100" />
                    )}
                    {item.errored && <Error className="text-[#972323]" />}
                  </div>
                  <LinearProgress
                    variant={item.inProgress ? 'indeterminate' : 'determinate'}
                    value={item.isSuccesful ? 100 : undefined}
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: item.errored ? '#972323' : '#32d74b',
                      },
                      '&.MuiLinearProgress-root': {
                        height: '8px',
                        borderRadius: '4px',
                      },
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </Stack>
        {error && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-dark-red-100">{error}</p>
            <div className="w-full flex justify-end">
              <PrimaryButton onClick={retryCurrentProcess}>Retry</PrimaryButton>
            </div>
          </div>
        )}
      </div>
    )
  }

  const isPickOptionsInvalid = () => {
    if (formValues.autoPickPharmtech) {
      return formValues.selectedPharmtech !== ''
    }
    if (!formValues.autoPickPharmtech) {
      return formValues.selectedPharmtech === ''
    }
  }

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
            {modalHeader || member?.fullName}
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
                      {generatePDFCustomBtn || (
                        <>
                          <Download className="file-action-btn" />

                          <Typography className="file-action-button-text text-blue-100 font-medium">
                            Generate Report
                          </Typography>
                        </>
                      )}
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
          title={!modalLabel ? 'Health report generation' : modalLabel}
          height={40}
        >
          <div className="px-4 mt-4">
            {!pickOptions && !showProgress && !completeTasksCreation && (
              <PrimaryForm
                initialValues={formValues}
                handleSubmit={udmOptionsPicked}
                className="font-rubik"
                validationSchema={validationSchema}
              >
                {(formik) => {
                  return (
                    <Form>
                      <div className="mb-4">
                        <FormControlLabel
                          disabled={submittingDocument}
                          control={
                            <Checkbox
                              checked={formik.values.autoPickPharmtech}
                              onChange={(e) => {
                                formik.handleChange(e)
                                setFormValues((prev) => ({
                                  ...prev,
                                  autoPickPharmtech: e.target.checked,
                                  selectedPharmtech: '',
                                }))
                              }}
                              sx={{
                                '&.Mui-checked': {
                                  color: 'var(--blue-100)',
                                },
                                color: 'var(--dark-blue-50)',
                              }}
                            />
                          }
                          label={
                            <p className="font-rubik text-base text-dark-blue-70">
                              Automatically pick a Pharmtech to assign this task
                            </p>
                          }
                          name="autoPickPharmtech"
                        />
                      </div>
                      <div>
                        {!formik.values.autoPickPharmtech && (
                          <GroupedSearchField
                            name="pharmtech"
                            options={antaraPharmtechs}
                            label="Choose Pharmtech"
                            placeholder="Search Pharmtechs..."
                            disabled={submittingDocument}
                            handleValueChangeWithId={(id) => {
                              setFormValues((prev) => ({
                                ...prev,
                                autoPickPharmtech: false,
                                selectedPharmtech: id,
                              }))
                            }}
                          />
                        )}
                      </div>

                      <div className="mb-4 mt-4">
                        <FormControlLabel
                          disabled={submittingDocument}
                          control={
                            <Checkbox
                              checked={formik.values.shareDocument}
                              onChange={(e) => {
                                formik.handleChange(e)
                                setFormValues((prev) => ({
                                  ...prev,
                                  shareDocument: e.target.checked,
                                }))
                              }}
                              sx={{
                                '&.Mui-checked': {
                                  color: 'var(--blue-100)',
                                },
                                color: 'var(--dark-blue-50)',
                              }}
                            />
                          }
                          label={
                            <p className="font-rubik text-base text-dark-blue-70">
                              Share the document with the member once it&apos;s
                              uploaded.
                              <br />
                              It will be available in the member’s app.
                            </p>
                          }
                          name="shareDocument"
                        />
                      </div>

                      <div className="w-full flex justify-end">
                        <PrimaryButton
                          type="submit"
                          disabled={isPickOptionsInvalid()}
                        >
                          Continue
                        </PrimaryButton>
                      </div>
                    </Form>
                  )
                }}
              </PrimaryForm>
            )}
            {pickOptions && showProgress && !completeTasksCreation && (
              <ProgressStackComponent />
            )}
            {completeTasksCreation && (
              <SuccessPrompt
                formFilled="pdfGenerate"
                successMessage="The document has been generated"
                handleClose={handleClosePortalWindow}
                fileId={fileId}
                folder={docMeta?.folder}
              />
            )}
          </div>
        </PortalWindow>
      )}
    </>
  )
}

export default PdfPreview
