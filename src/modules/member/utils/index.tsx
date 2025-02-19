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

// format currency, with an option to customize currency symbol
export const formatCurrency = (value: number, currency = 'Kes') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export const parseUpdateContactError = (error: any) => {
  let errorMessage = ''
  Object.keys(error).forEach((key) => {
    errorMessage = `${errorMessage} ${toTitleCase(key)}: ${error[key].join(
      ', '
    )}`
  })

  return errorMessage || 'Could not update contact details. Please try again.'
}
