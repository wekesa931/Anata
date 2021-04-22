import React from 'react'
import '../styles/index.css'
import Routes from './routes'
import AppContexts from '../context'
import ErrorBoundary from './error-boundary/error-boundary.component'
import Footer from './footer/footer.component'

const App = () => {
  return (
    <ErrorBoundary>
      <div className="appContainer">
        <AppContexts>
          <Routes />
        </AppContexts>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
