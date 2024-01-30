import { calcAge } from 'src/utils/date-time/date-formatters'
import { V2MemberType } from 'src/modules/member/types'
import { toTitleCase } from 'src/utils/text-utils'

export const getBioDataTitle = (v2Member: V2MemberType, isLoading: boolean) => {
  if (v2Member && !isLoading) {
    return v2Member?.fullName
      ? `${toTitleCase(v2Member?.fullName?.trim())}, ${
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

export const parseUpdateContactError = (error: any) => {
  let errorMessage = ''
  Object.keys(error).forEach((key) => {
    errorMessage = `${errorMessage} ${toTitleCase(key)}: ${error[key].join(
      ', '
    )}`
  })

  return errorMessage || 'Could not update contact details. Please try again.'
}
