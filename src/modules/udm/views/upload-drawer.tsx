import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FileContent } from 'use-file-picker'
import type { UDMDataHook } from 'src/modules/udm/hooks/udm.data'
import type { DocMeta } from 'src/modules/udm/types'
import { logError } from 'src/utils/logging/logger'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import {
  DrawerHeader,
  LoadOptionsWrapper,
  ReplaceFile,
  UploadDocumentForm,
  UploadSuccess,
} from 'src/modules/udm/components/upload'

type Props = {
  filesContent: FileContent[]
  open: boolean
  udmDataHook: UDMDataHook
  uploadDocument: (docMeta: DocMeta) => Promise<any>
}

enum LoadingAreas {
  LOADING_TYPES = 'LOADING_TYPES',
  LOADING_FOLDERS = 'LOADING_FOLDERS',
}

type Option = {
  label: string
  value: string
}

function UploadDocumentDrawer({
  filesContent,
  open,
  udmDataHook,
  uploadDocument,
}: Props) {
  const {
    uploadDone,
    getCategories,
    getFolders,
    fileError,
    setShouldReplaceFile,
    setFileError,
  } = udmDataHook

  const { promiseInProgress: loadingTypes } = usePromiseTracker({
    area: LoadingAreas.LOADING_TYPES,
  })
  const { promiseInProgress: loadingFolders } = usePromiseTracker({
    area: LoadingAreas.LOADING_FOLDERS,
  })

  const loadingOptions = loadingTypes || loadingFolders

  const [fileTypes, setFileTypes] = useState<Option[]>([])
  const [folders, setFolders] = useState<Option[]>([])
  const [loadingError, setLoadingError] = useState<any>(null)
  const [doneUploading, setDoneUploading] = useState(false)

  const loadFileUploadOptions = async () => {
    try {
      setLoadingError(null)
      const types = await trackPromise(
        getCategories(),
        LoadingAreas.LOADING_TYPES
      )
      setFileTypes(types?.map((t: string) => ({ label: t, value: t })))
      const folders = await trackPromise(
        getFolders(),
        LoadingAreas.LOADING_FOLDERS
      )
      setFolders(folders?.map((f: any) => ({ label: f.name, value: f.name })))
    } catch (error) {
      logError(error)
      setLoadingError(error)
    }
  }

  useEffect(() => {
    loadFileUploadOptions()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showUploadForm =
    !fileError && !loadingError && !loadingOptions && !doneUploading

  const closeDrawer = () => {
    uploadDone()
    setFileError('')
    setDoneUploading(false)
  }

  return (
    <Drawer open={open} anchor="right">
      <div className="p-4 font-rubik w-xl">
        <div className="flex flex-col gap-8">
          <DrawerHeader
            fileName={filesContent[0]?.name}
            closeDrawer={closeDrawer}
          />
          <LoadOptionsWrapper
            loading={loadingOptions}
            error={loadingError}
            retry={loadFileUploadOptions}
          >
            {fileError && (
              <ReplaceFile
                replaceFile={() => {
                  setShouldReplaceFile(true)
                  setFileError('')
                }}
                closeDrawer={closeDrawer}
              />
            )}
            {showUploadForm && (
              <UploadDocumentForm
                options={fileTypes}
                uploadDocument={uploadDocument}
                folders={folders}
                markAsDone={() => setDoneUploading(true)}
              />
            )}

            {doneUploading && <UploadSuccess closeDrawer={closeDrawer} />}
          </LoadOptionsWrapper>
        </div>
      </div>
    </Drawer>
  )
}

export default UploadDocumentDrawer
