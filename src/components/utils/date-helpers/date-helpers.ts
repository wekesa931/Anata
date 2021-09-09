import dayjs from 'dayjs'
import isYesterday from 'dayjs/plugin/isYesterday'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'

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
  return dayjs(date).format('DD-MMM-YY')
}

export {
  dateIsToday,
  dateIsYesterday,
  dateInPastWeek,
  dateInPastMonth,
  formattedDate,
}
