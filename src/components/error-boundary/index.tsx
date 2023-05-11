import React from 'react'
import * as Sentry from '@sentry/react'
import startSentry from 'src/utils/error-handling/setup'

startSentry()

function ErrorView(props: any) {
  return (
    <div className="card my-5">
      <div className="card-header">
        <p>
          There was an error in loading this view.{' '}
          <button
            className="btn-unstyled text-blue-dark text-normal"
            onClick={() => {
              window.location.reload()
            }}
          >
            Reload this page
          </button>
        </p>
      </div>
      <div className="card-body">
        <details className="error-details">
          <summary>Click for error details</summary>
          <p className="text-small text-danger">{JSON.stringify(props)}</p>
        </details>
      </div>
    </div>
  )
}

function Boundary({ children }: any) {
  return (
    <Sentry.ErrorBoundary fallback={ErrorView} showDialog>
      {children}
    </Sentry.ErrorBoundary>
  )
}

export default Boundary
