const baseUrl = process.env.NODE_PROXY_URL

const airtableFetch = (table: string, token: string) => {
  return fetch(`${baseUrl}/${table}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json()
  })
}

export default airtableFetch
