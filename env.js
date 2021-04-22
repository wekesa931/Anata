const dayjs = require('dayjs')
const dotenv = require('dotenv')

const result = dotenv.config()

if (!result.error && result.parsed) {
  console.log(result.parsed)
  const commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString()

  const currentVersion = require('child_process')
    .execSync('git name-rev --tags --name-only $(git rev-parse HEAD)')
    .toString()
}

let envs = {
  BUILD_DATE: dayjs().format('DD MMM YYYY HH:mma'),
  COMMIT: commitHash ? commitHash : 'None',
  VERSION: currentVersion ? currentVersion : 'None',
}

if (!('error' in result)) {
  envs = JSON.stringify({ ...result.parsed, ...envs })
} else {
  for (const [key, value] of Object.entries(process.env)) {
    envs[key] = value
  }
  envs = JSON.stringify(envs)
}

module.exports = envs
