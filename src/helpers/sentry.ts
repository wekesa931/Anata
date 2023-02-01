import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const startSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_API_KEY || '',
    tracesSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [new Integrations.BrowserTracing(), new Sentry.Replay()],
  })
}

export default startSentry
