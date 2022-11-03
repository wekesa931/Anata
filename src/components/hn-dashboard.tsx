import React from 'react'
import '../styles/index.css'
import Routes from './routes'
import AppContexts from '../context'
import ErrorBoundary from './error-boundary/error-boundary.component'

function App() {
  return (
    <ErrorBoundary>
      <div className="appContainer">
        <AppContexts>
          <Routes />
        </AppContexts>
      </div>
    </ErrorBoundary>
  )
}

export default App
