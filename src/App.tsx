import React from 'react'
import 'src/styles/index.css'
import 'src/styles/tailwind.styles.css'
import ErrorBoundary from 'src/components/error-boundary/index'
import AppContexts from 'src/context/index'
import Routes from './routes'

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-neutral-base h-full">
        <AppContexts>
          <Routes />
        </AppContexts>
      </div>
    </ErrorBoundary>
  )
}

export default App
