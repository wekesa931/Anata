const dotenv = require('dotenv')

const result = dotenv.config()

let envs

if (!('error' in result)) {
  envs = JSON.stringify(result.parsed)
} else {
  envs = {}
  for (const [key, value] of Object.entries(process.env)) {
    envs[key] = value
  }
  envs = JSON.stringify(envs)
}

module.exports = envs
