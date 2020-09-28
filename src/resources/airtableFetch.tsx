import history from '../constants/history'
import constants from '../constants/storage'
import storage from '../helpers/secure-storage'

const baseUrl = process.env.NODE_PROXY_URL

const getTokenFromLocalStorage = () => {
  const user = storage.get(constants.USER)
  if (user) {
    return JSON.parse(user).tokenId
  }
  return ''
}

const airtableFetch = (table: string, method = 'GET', data = {}) => {
  return fetch(`${baseUrl}/${table}`, {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      'Content-Type': 'application/json',
    },
    method,
    body: method === 'GET' ? null : JSON.stringify(data),
  }).then((response) => {
    if (response.status === 403) {
      history.push('/login', { from: history.location })
    }
    return response.json()
  })
}

export default airtableFetch
