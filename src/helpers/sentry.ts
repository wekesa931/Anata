import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const startSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_API_KEY || '',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

export default startSentry
