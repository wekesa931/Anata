import { createBrowserHistory } from 'history'

const baseUrl = process.env.NODE_PROXY_URL

const airtableFetch = (table: string, token: string) => {
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
