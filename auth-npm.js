const fs = require('fs')
const os = require('os')
const path = require('path')

function writeRegistryFile() {
  const npmrc = path.resolve(process.cwd(), '.npmrc')
  const registryUrl = String(process.env.REGISTRY_URL)
  const scope = String(process.env.GITHUB_SCOPE).toLowerCase()
  const authString =
    registryUrl.replace(/(^\w+:|^)/, '') + '/:_authToken=${NPM_TOKEN}'
  const registryString = `${scope}:registry=${registryUrl}`
  const contents = `${registryString}${os.EOL}${authString}${os.EOL}`
  console.log('CONTENTS', contents)
  fs.writeFileSync(npmrc, contents)
}

writeRegistryFile()
