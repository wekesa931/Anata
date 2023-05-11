import React, { useState } from 'react'
import airtableFetch from 'src/services/airtable/fetch'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import ListSkeletonLoader from 'src/components/loaders/skeleton'

function Fetcher({
  url,
  contextKey,
  children,
  skeleton = true,
  getDocumentTitle,
}: any) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
      {isLoading && (
        <div
          className="full-height d-flex"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          {skeleton ? (
            <ListSkeletonLoader />
          ) : (
            <div
              className="d-flex"
              style={{ alignItems: 'center', flexDirection: 'column' }}
            >
              {' '}
              <LoadingIcon />
              <h6>Loading Member</h6>
            </div>
          )}
        </div>
      )}
      {data && children(data)}
      {error && `An error occurred while fetching ${contextKey}`}
    </>
  )
}
export default Fetcher
