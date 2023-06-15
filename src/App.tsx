import React from 'react'
import 'src/styles/index.css'
import 'src/styles/tailwind.styles.css'
import ErrorBoundary from 'src/components/error-boundary/index'
import AppContexts from 'src/context/index'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Routes from './routes'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ErrorBoundary>
        <div className="bg-neutral-base h-full">
          <AppContexts>
            <Routes />
          </AppContexts>
        </div>
      </ErrorBoundary>
    </LocalizationProvider>
  )
}

export default App
