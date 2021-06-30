import React from 'react'
import Bugsnag from '@bugsnag/js'
import startBugsnag from '../../helpers/bugsnag'

startBugsnag()

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const ErrorView = (props: any) => {
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
export default ({ children }: any) => (
  <ErrorBoundary FallbackComponent={ErrorView}>{children}</ErrorBoundary>
)
