import { useState, useEffect, useMemo } from 'react'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import type { UploadDocumentFormValues } from 'src/modules/udm/types'
import { DocMeta } from 'src/modules/udm/types'
import { useLabsData } from 'src/modules/labs/hooks/labs.hook'
import { useTasksData } from 'src/modules/tasks/hooks/tasks.data'
import { TaskDefinitionTypes } from 'src/modules/tasks/types'
import { logError } from 'src/utils/logging/logger'
import type { LabRequest, LabTypes } from 'src/modules/labs/types'
import type { Options } from 'src/components/forms/fields/select-field'

type Process = () => void

type DocumentUploadHookProps = {
  markAsDone: () => void
  uploadDocument: (docMeta: DocMeta) => Promise<any>
}

export type DocumentUploadHook = ReturnType<typeof useDocumentUpload>

type Progress = {
  title: string
  isSuccesful: boolean
  pid: number
  inProgress: boolean
  show: boolean
  errored?: boolean
}

type ProgressStack = Progress[]

export const useDocumentUpload = ({
  markAsDone,
  uploadDocument,
}: DocumentUploadHookProps) => {
  const { member } = useMember()
  const user = useUser()

  const [formValues, setFormValues] = useState<UploadDocumentFormValues>({
    docType: '',
    title: '',
    folder: '',
    shareDocument: false,
    linkedLabRequest: [],
    creator: user?.email,
    description: '',
    createReviewTask: member?.assignedHn?.atRecordId !== user?.userAirtableId,
  })
  const [submittingDocument, setSubmittingDocument] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryTask, setRetryTask] = useState<Process | null>(null)
  const {
    labRequests,
    markLabRequestAsReceived,
    labTypes,
    createLabRequests,
    loading,
  } = useLabsData()
  const { createTaskFromTemplate } = useTasksData()

  const mapLabRequestsToOptions = (labs: LabRequest[]) => {
    const LabsFilterStatuses = [
      'Needed',
      'Scheduled',
      'Results received by Member',
      'Schedule needed',
      'Checkin Confirmed',
    ]
    return labs
      .filter(
        (labRequest) => LabsFilterStatuses.indexOf(labRequest.status) > -1
      )
      .map((labRequest) => ({
        label: labRequest.summary,
        value: labRequest.recordId,
        ...labRequest,
      }))
  }

  /** Progress tracking stack */
  const createLabRequestProgress: Progress = {
    title: 'Updating lab request status...',
    inProgress: true,
    isSuccesful: false,
    pid: 2,
    show: false,
  }

  const uploadDocumentProgress: Progress = {
    title: 'Uploading document...',
    inProgress: true,
    isSuccesful: false,
    pid: 1,
    show: false,
  }

  const createHnTaskProgress: Progress = {
    title: 'Creating task for assigned HN...',
    inProgress: true,
    isSuccesful: false,
    pid: 3,
    show: false,
  }
  const [progressStack, setProgressStack] = useState<ProgressStack>([
    uploadDocumentProgress,
    createLabRequestProgress,
    createHnTaskProgress,
  ])

  const [currentLabRequests, setCurrentLabRequests] = useState<Options[]>([])

  useEffect(() => {
    setCurrentLabRequests(mapLabRequestsToOptions(labRequests))
  }, [labRequests])

  const setProcessError = () => {
    setError(
      'We encountered an error while finishing this up. Please retry to resolve it.'
    )
    setSubmittingDocument(false)
  }

  const completeSubmission = () => {
    setSubmittingDocument(false)
    markAsDone()
  }

  const uploadDocumentToServer = async (values: UploadDocumentFormValues) => {
    const uploadDocumentMeta: DocMeta = {
      docType: values.docType,
      description: values.description || values.title,
      title: values.title,
      ...(values.shareDocument &&
        !!values.folder &&
        member?.antaraId && {
          shareWith: [member?.antaraId],
          folder: values.folder,
        }),
      ...(values.linkedLabRequest?.length && {
        otherMetadata: {
          linkedLabRequests: values?.linkedLabRequest?.map((l) => ({
            type: l.type,
            labType: l.labType,
            recordId: l.recordId,
            status: l.status,
          })),
        },
      }),
    }

    return uploadDocument(uploadDocumentMeta)
  }

  const updateLabRequestStatus = async (values: UploadDocumentFormValues) => {
    const linkedLabRequests = values.linkedLabRequest || []

    return markLabRequestAsReceived(linkedLabRequests)
  }

  const createNewReviewTask = async (values: UploadDocumentFormValues) => {
    const linkedLabRequests = values.linkedLabRequest || []

    return createTaskFromTemplate(
      linkedLabRequests.length
        ? TaskDefinitionTypes.LabManagement
        : TaskDefinitionTypes.NewDocument,
      values.docType
    )
  }

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

  const submitDocument = async (values: UploadDocumentFormValues) => {
    const shouldUpdateLabRequest = !!values.linkedLabRequest?.length
    const shouldCreateNewReviewTask = !!values.createReviewTask
    // review task is created if the assigned HN is not the user
    const createNewReviewTaskPath = () => {
      updateProgressStack({
        ...createHnTaskProgress,
        show: true,
      })
      createNewReviewTask(values)
        .then(() => {
          updateProgressStack({
            ...createHnTaskProgress,
            inProgress: false,
            isSuccesful: true,
          })
          completeSubmission()
        })
        .catch((err) => {
          updateProgressStack({
            ...createHnTaskProgress,
            inProgress: false,
            isSuccesful: false,
            errored: true,
          })
          logError(err)
          setProcessError()
          setRetryTask(() => createNewReviewTaskPath)
        })
    }
    // update lab request status if there is a linked lab request
    const updateLabRequestPath = () => {
      updateProgressStack({
        ...createLabRequestProgress,
        show: true,
      })
      updateLabRequestStatus(values)
        .then(() => {
          updateProgressStack({
            ...createLabRequestProgress,
            inProgress: false,
            isSuccesful: true,
          })
          if (shouldCreateNewReviewTask) {
            createNewReviewTaskPath()
          } else {
            completeSubmission()
          }
        })
        .catch((err) => {
          updateProgressStack({
            ...createLabRequestProgress,
            inProgress: false,
            isSuccesful: false,
            errored: true,
          })
          logError(err)
          setProcessError()
          setRetryTask(() => updateLabRequestPath)
        })
    }

    const uploadDocumentPath = () => {
      updateProgressStack({
        ...uploadDocumentProgress,
        show: true,
      })
      uploadDocumentToServer(values)
        .then(() => {
          updateProgressStack({
            ...uploadDocumentProgress,
            inProgress: false,
            isSuccesful: true,
          })
          if (shouldUpdateLabRequest) {
            updateLabRequestPath()
          } else if (shouldCreateNewReviewTask) {
            createNewReviewTaskPath()
          } else {
            completeSubmission()
          }
        })
        .catch((err) => {
          updateProgressStack({
            ...uploadDocumentProgress,
            inProgress: false,
            isSuccesful: false,
            errored: true,
          })
          logError(err)
          setProcessError()
          setRetryTask(() => uploadDocumentPath)
        })
    }

    // start by uploading the document
    setFormValues(values)
    setSubmittingDocument(true)
    uploadDocumentPath()
  }

  const retryCurrentProcess = () => {
    setSubmittingDocument(true)
    setError(null)
    retryTask?.()
  }

  const mapLabTypesToOptions = (rawLabTypes: LabTypes[]) => {
    return rawLabTypes.map((labType) => ({
      label: labType.name,
      value: labType.recordId,
      ...labType,
    }))
  }

  const createNewLabRequests = async (labRequestTypes: LabTypes[]) => {
    const results = await createLabRequests(labRequestTypes)

    const newLabRequests =
      results?.map((l) => ({
        label: l.summary,
        value: l.recordId,
        ...l,
      })) || []

    setCurrentLabRequests((prev) => [...prev, ...newLabRequests])
    return newLabRequests
  }

  const updateFormValues = (values: Partial<UploadDocumentFormValues>) => {
    // enable re-initialization of the form values
    setFormValues((prev) => ({ ...prev, ...values }))
  }

  return useMemo(() => {
    return {
      error,
      showProgressFeedback: submittingDocument || !!retryTask,
      submitDocument,
      labRequests: currentLabRequests,
      retryCurrentProcess,
      formValues,
      submittingDocument,
      labTypes: mapLabTypesToOptions(labTypes),
      createNewLabRequests,
      updateFormValues,
      loadingLabRequests: loading,
      progressStack,
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentLabRequests,
    formValues,
    error,
    labTypes,
    labRequests,
    loading,
    progressStack,
  ])
}
