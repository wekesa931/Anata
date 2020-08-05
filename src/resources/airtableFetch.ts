import { createBrowserHistory } from 'history'
import constants from '../constants/session-storage'

const baseUrl = process.env.NODE_PROXY_URL

const getTokenFromSessionStorage = () => {
  const user = sessionStorage.getItem(constants.USER)
  if (user) {
    return JSON.parse(user).tokenId
  }
  return ''
}

const airtableFetch = (table: string, token = getTokenFromSessionStorage()) => {
  const history = createBrowserHistory()
  return fetch(`${baseUrl}/${table}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 403) {
      history.push('/login')
    }
    return response.json()
  })
}

export default airtableFetch
