import { Model } from '@nozbe/watermelondb'
import { text } from '@nozbe/watermelondb/decorators'
import { CollectionType } from 'src/storage/types'

export class HMP extends Model {
  static table = CollectionType.HMPS

  @text('hmp_send_date') hmpSendDate?: string

  @text('hmp_number') hmpNumber?: string

  @text('hmp_day') hmpDay?: string | number | null

  @text('hmp_link') hmpLink?: string

  @text('hmp_state') hmpState?: string

  @text('hmp_last_review_date') hmpLastReviewDate?: string

  @text('antaraId') antaraId?: string
}

export default [HMP]
