import {
  useDocumentsReadApi,
  useDocumentsWriteApi,
} from 'src/modules/udm/services/udm.api'
import { transformFileData } from 'src/modules/udm/utils/data-transforms/query'
import {
  FileFilters,
  DocMeta,
  SaveFileInput,
  UploadStatus,
  UploadDocumentOptions,
  PersistDataOptions,
} from 'src/modules/udm/types'
import { useMember } from 'src/context/member'
import { useState } from 'react'
import { useUser } from 'src/context/user'
import { useModuleAnalytics } from 'src/modules/analytics'
import { logError } from 'src/utils/logging/logger'
import mime from 'mime-types'

export const useUdmData = () => {
  const {
    getAllFiles,
    refetch,
    loading,
    getAllFolders,
    getAllFileCategories,
    error,
  } = useDocumentsReadApi()
  const {
    shareFile,
    sharingFile,
    generateUploadLink,
    loading: writting,
    saveFile,
    uploadFileFormData,
  } = useDocumentsWriteApi()
  const { member } = useMember()
  const [fileError, setFileError] = useState('')
  const [shouldReplaceFile, setShouldReplaceFile] = useState(false)
  const user = useUser()
  const [progress, setProgress] = useState(0)
  const [uploadStart, setUploadStart] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.IDLE
  )
  const { trackDocumentShared, trackDocumentUploaded } = useModuleAnalytics()
  const [docLink, setdocLink] = useState<string | undefined>(undefined)
  const [confirmationDrawerHelper, setConfirmationDrawerHelper] =
    useState(false)
  const [networkError, setNetworkError] = useState(false)

  const getFiles = async (filters: FileFilters = {}) => {
    if (member) {
      const data = await getAllFiles({
        ...filters,
        antaraId: member.antaraId,
      })
      return transformFileData(data?.files?.edges || [])
    }
    return {}
  }

  const getFolders = async () => {
    const data = await getAllFolders()
    return data?.folders?.edges?.map((item: any) => item?.node) || []
  }

  const getCategories = async () => {
    const data = await getAllFileCategories()
    return (
      data?.fileCategories?.edges?.map((item: any) => item?.node?.name) || []
    )
  }

  const handleShareFile = async (fileId: string, folderId: string) => {
    if (member) {
      return shareFile({
        fileId,
        folderId,
        antaraId: member.antaraId,
      })
    }
    throw new Error('Member not found')
  }

  const getUploadLink = async (storageKey?: string) => {
    try {
      const uploadLink = await generateUploadLink(storageKey, shouldReplaceFile)
      setShouldReplaceFile(false)
      return uploadLink
    } catch (err: any) {
      setFileError(err.message)
      setShouldReplaceFile(false)
      throw err
    }
  }

  const uploadDone = () => {
    setProgress(0)
    setFileError('')
    setUploadStatus(UploadStatus.IDLE)
    setdocLink(undefined)
    setConfirmationDrawerHelper(false)
  }

  const handleUploadError = (response: any) => {
    setUploadStart(false)
    setProgress(0)
    setUploadStatus(UploadStatus.FAILED)
    logError(response.message)
  }

  const handlePersistFile = async ({
    docMeta,
    storeKey,
    mimeVal,
    fileSize,
    driveLink,
    fileName,
  }: PersistDataOptions) => {
    if (member) {
      let input: SaveFileInput = {
        description: docMeta.description,
        antaraId: member.antaraId,
        storageKey: storeKey,
        addedBy: user?.email,
        mimeType: mimeVal,
        fileSize,
        fileCategory: docMeta.docType,
        driveUrl: driveLink,
        title: docMeta.title,
        recordId: member?.airtableRecordId,
        fileName,
      }

      if (docMeta.shareWith) {
        input = {
          ...input,
          shareWith: docMeta.shareWith,
          folder: docMeta.folder,
        }
      }

      const data = await saveFile(input)
      setUploadStart(false)
      setProgress(100)
      if (data?.status !== 200) {
        setUploadStatus(UploadStatus.FAILED)
      } else {
        setUploadStatus(UploadStatus.SUCCESS)
        refetch({
          variables: {
            antaraId: '69V-Z3Q5',
          },
        })

        if (docMeta.shareWith) {
          trackDocumentShared(input)
        }
      }
      trackDocumentUploaded(data?.status === 200, input)

      return data
    }

    throw new Error('Member not found')
  }

  const uploadByLink = async (docMeta: DocMeta, storeKey?: string) => {
    try {
      await handlePersistFile({
        docMeta,
        storeKey,
        driveLink: storeKey,
        mimeVal: 'doc',
        fileSize: 0,
        fileName: docLink,
      })
    } catch (err: any) {
      if (err.name === 'Network Error') {
        setNetworkError(true)
      }
      handleUploadError(err)
    }
  }

  const handleUploadDocument = async (options: UploadDocumentOptions) => {
    if (member) {
      const { document, fileName, fileSize, shouldUploadByLink, file } = options
      setUploadStart(true)
      const storeKey = !shouldUploadByLink
        ? `${member?.antaraId}/${document.docType}/${fileName}`
        : docLink
      const driveLink: any = null

      const formData = new FormData()
      if (shouldUploadByLink) {
        return uploadByLink(document, storeKey)
      }
      return getUploadLink(storeKey)
        .then((uploadLink: any) => {
          Object.keys(uploadLink.link.fields).forEach((key) => {
            formData.append(key, uploadLink.link.fields[key])
          })
          formData.append('file', file)
          try {
            if (!shouldUploadByLink && !docLink) {
              // remove the extension from the file name
              const fileNameParts = fileName?.split('.')
              fileNameParts.pop()
              const fName = fileNameParts.join('.')

              const mimeVal = mime.lookup(fileName)
              const config = {
                onUploadProgress: (progressEvent: any) => {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  )
                  setProgress(percentCompleted - 10)
                },
              }

              return uploadFileFormData(
                uploadLink?.link?.url,
                formData,
                config
              ).then(() => {
                return handlePersistFile({
                  docMeta: document,
                  storeKey: `${member?.antaraId}/${document.docType}/${fileName}`,
                  mimeVal,
                  fileSize,
                  driveLink,
                  fileName: fName,
                })
              })
            }
          } catch (err: any) {
            if (err.name === 'Network Error') {
              setNetworkError(true)
            }
            handleUploadError(err)
          }
        })
        .catch(logError)
    }
  }

  return {
    getFiles,
    refetch,
    loading,
    getFolders,
    getCategories,
    error,
    handleShareFile,
    sharingFile,
    getUploadLink,
    writting,
    fileError,
    setFileError,
    setShouldReplaceFile,
    handlePersistFile,
    uploadStart,
    setUploadStart,
    handleUploadDocument,
    setUploadSuccessful: () => setUploadStatus(UploadStatus.SUCCESS),
    setUploadFailed: () => setUploadStatus(UploadStatus.FAILED),
    uploadDone,
    uploadSuccessful: uploadStatus === UploadStatus.SUCCESS,
    uploadFailed: uploadStatus === UploadStatus.FAILED,
    docLink,
    setdocLink: (link?: string) => setdocLink(link),
    progress,
    setProgress,
    confirmationDrawerHelper,
    setConfirmationDrawerHelper,
    networkError,
    setNetworkError,
  }
}
