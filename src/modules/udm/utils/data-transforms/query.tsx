import { groupBy } from 'lodash'
import type { TFile } from 'src/modules/udm/types'
import { isFileShared } from 'src/modules/udm/utils'

export const transformFileData = (files: { node: TFile }[]) => {
  const rawFiles = files?.map(({ node }) => ({
    ...node,
    category: node?.fileCategory?.name || node?.category,
    shared: isFileShared(node.sharedfileSet),
  }))

  return groupBy(rawFiles, 'category')
}
