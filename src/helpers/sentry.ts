import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const startSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_API_KEY || '',
    tracesSampleRate: 1.0,
    beforeSend(event: any, hint: any) {
      /* tslint:disable:no-string-literal only-arrow-functions */
      const isNonErrorException =
        event?.exception?.values[0]?.value?.startsWith(
          'Non-Error exception captured'
        ) ||
        hint?.originalException?.message?.startsWith(
          'Non-Error exception captured'
        )
      /* tslint:enable:no-string-literal only-arrow-functions */

      if (isNonErrorException) {
        // We want to ignore those kind of errors
        return null
      }
      return event
    },
    replaysOnErrorSampleRate: 1.0,
    integrations: [new Integrations.BrowserTracing(), new Sentry.Replay()],
  })
}

export default startSentry
