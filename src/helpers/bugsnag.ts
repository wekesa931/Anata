import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

const startBugsnag = () => {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY || '',
    plugins: [new BugsnagPluginReact()],
    enabledReleaseStages: ['production'],
  })
}

export default startBugsnag
