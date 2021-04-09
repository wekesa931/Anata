import React from 'react'
import * as Loads from 'react-loads'
import airtableFetch from '../../../resources/airtable-fetch'
import LoadingIcon from '../../../assets/img/icons/loading.svg'
import ListSkeletonLoader from '../skeleton-loader/skeleton-loader.component'

const Fetcher = ({
  url,
  contextKey,
  children,
  skeleton = true,
  getDocumentTitle,
}: any) => {
  const { response, error, isPending, isResolved } = Loads.useLoads(
    contextKey,
    () => airtableFetch(url)
  )

  React.useEffect(() => {
    if (getDocumentTitle && response) {
      document.title = getDocumentTitle(response)
    }
  }, [getDocumentTitle, response])

  return (
    <>
      {isPending && (
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
      {isResolved && children(response)}
      {error && `An error occurred while fetching ${contextKey}`}
    </>
  )
}
export default Fetcher
