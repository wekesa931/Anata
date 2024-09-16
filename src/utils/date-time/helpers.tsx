import dayjs from 'dayjs'
import isYesterday from 'dayjs/plugin/isYesterday'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'
import { calcAge } from 'src/utils/date-time/date-formatters'

dayjs.extend(isBetween)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

const dateIsToday = (date: string | Date) => {
  if (dayjs(date).isToday()) {
    return dayjs(date).format('hh:mma')
  }
  return false
}

const dateIsYesterday = (date: string | Date) => {
  if (dayjs(date).isYesterday()) {
    return `Yesterday ${dayjs(date).format('hh:mma')}`
  }
  return false
}

const dateInPastWeek = (date: string | Date) => {
  const firstDay = dayjs().subtract(7, 'day')
  return dayjs(date).isBetween(firstDay, dayjs())
}

const dateInPastMonth = (date: string | Date) => {
  const firstDay = dayjs().subtract(30, 'day')
  return dayjs(date).isBetween(firstDay, dayjs())
}

const formattedDate = (date: string | Date) => {
  return dayjs(date).format('DD/MM/YY HH:mm')
}

const todayFormattedDate = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
const isMinor = (birthDate: string) => calcAge(birthDate) < 18

const getAgeFull = (birthDate?: string | null) => {
  if (!birthDate) {
    return ''
  }
  const age = calcAge(birthDate)
  if (age > 1) {
    return `(${age} y)`
  }

  const months = dayjs().diff(birthDate, 'month')
  return `(${months} m)`
}

const adjustExclusiveDates = (range: [Date | null, Date | null]) => {
  const start = dayjs(range[0]).subtract(1, 'day').toDate()
  const end = dayjs(range[1]).add(1, 'day').toDate()
  return [start, end]
}

export {
  dateIsToday,
  dateIsYesterday,
  dateInPastWeek,
  dateInPastMonth,
  formattedDate,
  isMinor,
  getAgeFull,
  todayFormattedDate,
  adjustExclusiveDates,
}
