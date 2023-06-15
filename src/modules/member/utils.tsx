import { startCase, toLower } from 'lodash'
import { calcAge } from 'src/utils/date-time/date-formatters'
import { V2MemberType } from 'src/modules/member/types'

export const getBioDataTitle = (v2Member: V2MemberType, isLoading: boolean) => {
  if (v2Member && !isLoading) {
    return v2Member?.fullName
      ? `${startCase(toLower(v2Member?.fullName))}, ${
          calcAge(v2Member?.birthDate) || ''
        }`
      : '-'
  }

  return '-'
}

export const formatCurreny = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'KES',
}).format
