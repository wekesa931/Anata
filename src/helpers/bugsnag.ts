import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

const startBugsnag = () => {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY || '',
    plugins: [new BugsnagPluginReact()],
    enabledReleaseStages: ['production'],
    appVersion: process.env.APP_VERSION || '',
    redactedKeys: [/^password$/i, /^access_token$/i, /^id_token$/i, /^token$/i],
    releaseStage: process.env.ENVIRONMENT || '',
    user: { email: '', name: '' },
  })
}

export default startBugsnag
