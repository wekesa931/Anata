const dayjs = require('dayjs')
const dotenv = require('dotenv')

const result = dotenv.config()

let envs = {}

if (!('error' in result)) {
  if (result.parsed.ON_HEROKU) {
    console.log('Building with Heroku Config Vars', result.parsed)
    envs = {
      BUILD_DATE: result.parsed.RELEASE_DATE
        ? dayjs().utc(result.parsed.RELEASE_DATE).format('DD MMM YYYY HH:mmA')
        : '',
      COMMIT: result.parsed.COMMIT ? result.parsed.COMMIT.substring(0, 7) : '',
      VERSION: result.parsed.VERSION,
    }
  } else {
    const commitHash = require('child_process')
      .execSync('git rev-parse --short HEAD')
      .toString()

    const currentVersion = require('child_process')
      .execSync('git name-rev --tags --name-only $(git rev-parse HEAD)')
      .toString()

    envs = {
      BUILD_DATE: dayjs().format('DD MMM YYYY HH:mma'),
      COMMIT: commitHash ? commitHash : 'None',
      VERSION: currentVersion ? currentVersion : 'None',
    }
  }
  envs = JSON.stringify({ ...result.parsed, ...envs })
} else {
  for (const [key, value] of Object.entries(process.env)) {
    envs[key] = value
  }
  envs = JSON.stringify(envs)
}

module.exports = envs
