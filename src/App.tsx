import React, { useEffect } from 'react'
import 'src/styles/index.css'
import 'src/styles/tailwind.styles.css'
import ErrorBoundary from 'src/components/error-boundary/index'
import AppContexts from 'src/context/index'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { datadogRum } from '@datadog/browser-rum'
import Routes from './routes'
import { useCheckAppUpdate } from './hooks/force-update'

function App() {
  useCheckAppUpdate() // clear cache if there was an update requiring it

  useEffect(() => {
    datadogRum.startSessionReplayRecording()

    return () => datadogRum.stopSessionReplayRecording()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ErrorBoundary>
            <div className="bg-neutral-base h-full">
              <BrowserRouter>
                <AppContexts>
                  <Routes />
                </AppContexts>
              </BrowserRouter>
            </div>
          </ErrorBoundary>
        </LocalizationProvider>
      </StyledEngineProvider>
    </GoogleOAuthProvider>
  )
}

export default App
