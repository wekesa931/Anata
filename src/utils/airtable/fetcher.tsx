import React, { useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import CenteredLoader from 'src/components/loaders/centered'

function Fetcher({ url, contextKey, children, getDocumentTitle }: any) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // test for pre-push
  React.useEffect(() => {
    if (getDocumentTitle && data) {
      document.title = getDocumentTitle(data)
    }
  }, [getDocumentTitle, data])

  React.useEffect(() => {
    if (url) {
      setIsLoading(true)
      airtableFetch(url)
        .then((res: any) => {
          setData(res)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err)
          setIsLoading(false)
        })
    }
  }, [url])

  return (
    <>
      {isLoading && <CenteredLoader message="Loading member" />}
      {data && children(data)}
      {error && `An error occurred while fetching ${contextKey}`}
    </>
  )
}
export default Fetcher
