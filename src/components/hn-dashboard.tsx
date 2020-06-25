import React from 'react'
import '../styles/index.css'
import Routes from './routes'
import AppContexts from '../context'

const App = () => {
  console.log(process.env.NODE_PROXY_URL)
  return (
    <div className="appContainer">
      <AppContexts>
        <Routes />
      </AppContexts>
    </div>
  )
}

export default App
