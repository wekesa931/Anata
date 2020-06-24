import React from 'react'
import '../styles/index.css'
import Routes from './routes'
import AppContexts from '../context'

const App = () => {
  return (
    <div className="appContainer">
      <AppContexts>
        <Routes />
      </AppContexts>
    </div>
  )
}

export default App
