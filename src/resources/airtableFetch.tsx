import history from '../constants/history'
import constants from '../constants/session-storage'

const baseUrl = process.env.NODE_PROXY_URL

const getTokenFromLocalStorage = () => {
  const user = localStorage.getItem(constants.USER)
  if (user) {
    return JSON.parse(user).tokenId
  }
  return ''
}

const airtableFetch = (table: string, token = getTokenFromLocalStorage()) => {
  return fetch(`${baseUrl}/${table}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 403) {
      history.push('/login', { from: history.location })
    }
    return response.json()
  })
}

export default airtableFetch
