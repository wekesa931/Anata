import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import { datadogRum } from '@datadog/browser-rum'

const { DATADOG_APPLICATION_ID, DATADOG_CLIENT_TOKEN } = process.env

if (!DATADOG_APPLICATION_ID || !DATADOG_CLIENT_TOKEN) {
  throw new Error(
    'DATADOG_APPLICATION_ID or DATADOG_CLIENT_TOKEN environment variable is not defined'
  )
}

datadogRum.init({
  applicationId: DATADOG_APPLICATION_ID,
  clientToken: DATADOG_CLIENT_TOKEN,
  site: 'us5.datadoghq.com',
  service: 'scribe',
  env: process.env.NODE_ENV,
  version: '1.0.0',
  sessionSampleRate: 100,
  premiumSampleRate: 100,
  trackUserInteractions: true,
  defaultPrivacyLevel: 'mask-user-input',
})

datadogRum.startSessionReplayRecording()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
