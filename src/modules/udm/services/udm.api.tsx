import { useLazyQuery, useMutation } from '@apollo/client'
import {
  SAVE_FILE,
  UPLOAD_LINK,
  GET_FILES,
  GET_FOLDERS,
  GET_FILE_CATEGORIES,
  SHARE_FILE,
} from 'src/modules/udm/services/gql'
import axios from 'axios'
import {
  FileFilters,
  SaveFileInput,
  ShareFileOptions,
} from 'src/modules/udm/types'
import { useMember } from 'src/context/member'

export const useDocumentsReadApi = () => {
  const [getFiles, { loading: gettingFiles, refetch, error }] =
    useLazyQuery(GET_FILES)
  const [getFolders, { loading: gettingFolders }] = useLazyQuery(GET_FOLDERS)
  const [getFileCategories, { loading: gettingFileCategories }] =
    useLazyQuery(GET_FILE_CATEGORIES)
  const { member } = useMember()

  const getAllFiles = async (filters: FileFilters) => {
    if (!member) throw new Error('Member not found')

    const { data } = await getFiles({
      variables: filters,
    })

    return data
  }

  const getAllFolders = async () => {
    const { data } = await getFolders()
    return data
  }
  const findFolderByName = async (folderName: string) => {
    const folders = await getFolders()
    const foundFolder = folders?.data?.folders?.edges?.find(
      (folder: any) => folder?.node?.name === folderName
    )
    if (foundFolder) {
      return foundFolder
    }
    return null
  }

  const getAllFileCategories = async () => {
    const { data } = await getFileCategories()
    return data
  }

  return {
    getAllFiles,
    loading: gettingFiles || gettingFolders || gettingFileCategories,
    refetch,
    error,
    getAllFolders,
    getAllFileCategories,
    findFolderByName,
  }
}

export const useDocumentsWriteApi = () => {
  const [getUploadLink, { loading: gettingUploadLink }] =
    useMutation(UPLOAD_LINK)

  const [mutate, { loading: savingFile, error: errorSavingFile }] =
    useMutation(SAVE_FILE)
  const [shareFileMutation, { loading: sharing }] = useMutation(SHARE_FILE)

  const generateUploadLink = async (
    storageKey?: string,
    forceReplace = false,
    duration = 50000
  ) => {
    const { data } = await getUploadLink({
      variables: {
        storageKey,
        forceReplace,
        duration,
      },
    })
    if (data.generateUploadLink.errors) {
      throw new Error(data.generateUploadLink.message)
    }
    return data.generateUploadLink
  }

  const uploadFileFormData = async (
    url: string,
    formData: FormData,
    config: any
  ) => {
    return axios.post(`${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      ...config,
    })
  }

  const saveFile = async (input: SaveFileInput) => {
    const { data } = await mutate({
      variables: {
        input,
      },
    })
    if (data.saveFile.status !== 200) {
      throw new Error(data.saveFile.message)
    }
    return data.saveFile
  }

  const shareFile = async (shareOptions: ShareFileOptions) => {
    const { data } = await shareFileMutation({
      variables: shareOptions,
    })

    return data?.shareFile
  }

  return {
    generateUploadLink,
    loading: gettingUploadLink || savingFile,
    uploadFileFormData,
    saveFile,
    errorSavingFile,
    sharingFile: sharing,
    shareFile,
  }
}

export default useDocumentsWriteApi
