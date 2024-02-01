import React from 'react'
import ErrorRetry from 'src/components/feedbacks/error-retry'
import Loading from 'src/components/loaders/centered'

type Props = {
  loading: boolean
  error: any
  retry: () => void
  children: React.ReactNode
}

function UploadOptionLoader({ loading, error, children, retry }: Props) {
  return (
    <>
      {loading && <Loading message="Loading upload options..." />}
      {error && <ErrorRetry retry={retry} />}
      {!loading && !error && children}
    </>
  )
}

export default UploadOptionLoader
