const keys = {
  USER: '@antarahealth/hn-dashboard:user',
  EXPIRY: '@antarahealth/hn-dashboard:jwtexpiry',
  REFRESH_TOKEN: '@antarahealth/hn-dashboard:refresh-token',
}

export const options = [
  'Self',
  'Aunt',
  'Brother',
  'Child',
  'Cousin',
  'Employer',
  'Father',
  'Friend',
  'Guardian',
  'Husband',
  'Mother',
  'Parent',
  'Sibling',
  'Sister',
  'Son',
  'Spouse',
  'Uncle',
  'Wife',
  'Other',
]

export const relationshipOptions = options.map((option) => ({
  value: option,
  label: option,
}))

export default keys
