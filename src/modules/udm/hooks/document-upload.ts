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

const totalProcesses = (values: UploadDocumentFormValues) => {
  let total = 1

  if (values.createReviewTask) {
    total += 1
  }

  if (values.linkedLabRequest?.length) {
    total += 1
  }
  return total
}

const calculateProgressDiff = (oldProgress: number, processCount: number) => {
  if (oldProgress < 100) {
    const diff = Math.random() * 10
    const currentProgress = oldProgress + diff / processCount
    return Math.round(Math.min(currentProgress, 90))
  }
  return Math.round(oldProgress)
}

export type DocumentUploadHook = ReturnType<typeof useDocumentUpload>

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
  const [progress, setProgress] = useState<number>(0)
  const [submittingDocument, setSubmittingDocument] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryTask, setRetryTask] = useState<Process | null>(null)
  const [currentProcessTitle, setTitle] = useState<string | null>(null)
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

  const [currentLabRequests, setCurrentLabRequests] = useState<Options[]>(
    mapLabRequestsToOptions(labRequests)
  )

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
    setTitle('Uploading document...')
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
    }

    return uploadDocument(uploadDocumentMeta)
  }

  const updateLabRequestStatus = async (values: UploadDocumentFormValues) => {
    setTitle('Updating lab request status...')
    const linkedLabRequests = values.linkedLabRequest || []

    return markLabRequestAsReceived(linkedLabRequests)
  }

  const createNewReviewTask = async (values: UploadDocumentFormValues) => {
    setTitle('Creating task for assigned HN...')
    const linkedLabRequests = values.linkedLabRequest || []

    return createTaskFromTemplate(
      linkedLabRequests.length
        ? TaskDefinitionTypes.LabManagement
        : TaskDefinitionTypes.NewDocument
    )
  }

  const submitDocument = async (values: UploadDocumentFormValues) => {
    const shouldUpdateLabRequest = !!values.linkedLabRequest?.length
    const shouldCreateNewReviewTask = !!values.createReviewTask
    // review task is created if the assigned HN is not the user
    const createNewReviewTaskPath = () => {
      createNewReviewTask(values)
        .then(() => {
          completeSubmission()
        })
        .catch((err) => {
          logError(err)
          setProcessError()
          setRetryTask(() => createNewReviewTaskPath)
        })
    }
    // update lab request status if there is a linked lab request
    const updateLabRequestPath = () => {
      updateLabRequestStatus(values)
        .then(() => {
          if (shouldCreateNewReviewTask) {
            createNewReviewTaskPath()
          } else {
            completeSubmission()
          }
        })
        .catch((err) => {
          logError(err)
          setProcessError()
          setRetryTask(() => updateLabRequestPath)
        })
    }

    const uploadDocumentPath = () => {
      uploadDocumentToServer(values)
        .then(() => {
          if (shouldUpdateLabRequest) {
            updateLabRequestPath()
          } else if (shouldCreateNewReviewTask) {
            createNewReviewTaskPath()
          } else {
            completeSubmission()
          }
        })
        .catch((err) => {
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

  useEffect(() => {
    // rudimentary way to track the progress of the upload
    let timer: NodeJS.Timeout

    if (submittingDocument) {
      timer = setInterval(() => {
        setProgress((oldProgress) =>
          calculateProgressDiff(oldProgress, totalProcesses(formValues))
        )
      }, 200)
    }

    return () => {
      clearInterval(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittingDocument])

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
      progress,
      error,
      showProgressFeedback: submittingDocument || !!retryTask,
      currentProcessTitle,
      submitDocument,
      labRequests: currentLabRequests,
      retryCurrentProcess,
      formValues,
      submittingDocument,
      labTypes: mapLabTypesToOptions(labTypes),
      createNewLabRequests,
      updateFormValues,
      loadingLabRequests: loading,
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLabRequests, formValues, error, labTypes, labRequests, loading])
}
