import dayjs from 'dayjs'

// calculate year difference between birthDate and today
const calcAge = (birthDate: string) => {
  const today = dayjs()
  const birth = dayjs(birthDate)
  return today.diff(birth, 'year')
}

export default calcAge
