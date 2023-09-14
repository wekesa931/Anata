import styles from 'src/modules/udm/files.component.css'
import React from 'react'
import { FileText, Image } from 'react-feather'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import dayjs from 'dayjs'
import { TFile } from 'src/modules/udm/types'

export const isFileShared = (sharedfileSet: any) => {
  return !!sharedfileSet?.edges.length
}

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

const isValidURL = (url: string) => {
  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g //eslint-disable-line
  )
  return res !== null
}

export const getSharedAt = (row?: any) => {
  const sharedAt = row?.sharedfileSet.edges[0]?.node?.updatedAt

  if (sharedAt) {
    return dayjs(sharedAt).format("DD MMM' YY")
  }

  return ''
}
export const uploadDisabled = (docLink?: string) => {
  if (!docLink) {
    return true
  }
  if (!isValidURL(docLink)) {
    return true
  }
  return false
}

export const getMimeIcon = (name: string) => {
  if (name.includes('pdf')) {
    return <PictureAsPdfOutlinedIcon className={styles.red} />
  }
  if (name.includes('jpg') || name.includes('jpeg') || name.includes('png')) {
    return <Image className={styles.blue} />
  }
  return <FileText className={styles.green} />
}

export const stableSortFiles = (array: TFile[], comparator: any) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const val = comparator(a[0], b[0])
    if (val !== 0) {
      return val
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
