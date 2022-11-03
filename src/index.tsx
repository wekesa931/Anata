import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/hn-dashboard'
import 'react-tippy/dist/tippy.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
