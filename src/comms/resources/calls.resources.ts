import { CommsFetch } from './utils'

const BASE_PATH = 'calls'

const getCapabilityToken = (email: string) => {
  const data = { antara_email: email.replace(/[^a-z0-9]+/gi, '') }

  const body = JSON.stringify(data)
  return CommsFetch(`${BASE_PATH}/calltoken/`, 'POST', body)
}
// eslint-disable-next-line import/prefer-default-export
export { getCapabilityToken }
