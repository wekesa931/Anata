import { HMPType } from 'src/modules/hmp/types'
import { HMP } from 'src/modules/hmp/db/models'

export const buildHmp = (hmp: HMP, data: HMPType) => {
  hmp.antaraId = data.antaraId
  hmp.hmpDay = data?.hmpDay
  hmp.hmpSendDate = data?.hmpSendDate
  hmp.hmpNumber = data?.hmpNumber
  hmp.hmpLastReviewDate = data?.hmpLastReviewDate
  hmp.hmpLink = data?.hmpLink
  hmp.hmpState = data?.hmpState
  // eslint-disable-next-line no-underscore-dangle
  hmp._raw.id = data.id
}
