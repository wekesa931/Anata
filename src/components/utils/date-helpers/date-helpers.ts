import dayjs from 'dayjs'

const isSameDay = (a: Date, b: Date) => {
  return dayjs(new Date(a)).isSame(dayjs(b), 'day')
}

const checkDate = (date: string | Date) => {
  const today = new Date()
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

  if (isSameDay(today, new Date(date))) {
    return dayjs(new Date(date)).format('hh:mma')
  }
  if (isSameDay(yesterday, new Date(date))) {
    return `Yesterday ${dayjs(new Date(date)).format('hh:mma')}`
  }
  return dayjs(new Date(date)).format('DD-MMM-YY')
}

const onCurrentWeek = (date: Date) => {
  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() - 1))
  lastMonday.setHours(0, 0, 0, 0)
  const res =
    lastMonday.getTime() <= date.getTime() &&
    date.getTime() < lastMonday.getTime() + 604800000
  return res
}

const numDaysBetween = (d1: Date, d2: Date) => {
  const diff = Math.abs(d1.getTime() - d2.getTime())
  return diff / (1000 * 60 * 60 * 24)
}

export { isSameDay, checkDate, onCurrentWeek, numDaysBetween }
