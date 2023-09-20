export type TFile = {
  addedBy?: string
  antaraId: string
  category?: string
  description: string
  driveUrl: string
  title: string
  fileSize: number
  id?: string
  mimeType: string
  otherMetadata?: any
  storageKey?: string
  updatedAt?: Date
  sharedfileSet?: any
  fileCategory?: any
  createdAt?: string
  shared?: boolean
}

export type SaveFileInput = TFile & {
  recordId?: string
  fileName: string
  shareWith?: any
  folder?: string
}

export type DocMeta = {
  docType: string
  description: string
  title: string
  shareWith?: string[]
  folder?: string
}

export type UploadDocumentOptions = {
  document: DocMeta
  fileName: string
  fileSize: number
  shouldUploadByLink: boolean
  file: any
}

export type FileFilters = {
  antaraId?: string
  search?: string
  mimeType?: string
  fileCategory_Name?: string
  updatedAt_Gte?: Date | null
}

export type GRoupedFiles = {
  [key: string]: TFile[]
}

export type Folder = {
  id: string
  name: string
}

export type ShareFileOptions = {
  fileId: string
  folderId: string
  antaraId: string
}

export enum UploadStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  IDLE = 'IDLE',
}

export type PersistDataOptions = {
  docMeta: DocMeta
  storeKey: string | undefined
  mimeVal: any
  fileSize: number
  driveLink: any
  fileName: any
}

export type TableColumn = {
  name: string
  key: string
}

export type TableProps = {
  title: string
  columns: TableColumn[]
  data: any[]
}
