import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const formatDateLong = (value: string) => {
  const date = new Date(value)
  const day = date.toLocaleString('default', { day: '2-digit' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const year = date.toLocaleString('default', { year: 'numeric' })
  return `${day}-${month}-${year}, ${date.toLocaleTimeString('en-US')}`
}

// calculate year difference between birthDate and today
export const calcAge = (birthDate?: string) => {
  const today = dayjs()
  const birth = dayjs(birthDate)
  return today.diff(birth, 'year')
}

export const humanize = (d: number) => {
  const dur = dayjs.duration(d, 'seconds')
  return dur.format(d >= 3600 ? 'H [hrs] m [mins] s [sec]' : 'm [mins] s [sec]')
}

export const formatDOB = (dob: string) => {
  return dayjs(dob).format('DD/MM/YYYY')
}
