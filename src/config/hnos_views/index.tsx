import TestConfig from './test.json'
import ProdConfig from './production.json'
import SandboxConfig from './sandbox.json'

const getConfig = () => {
  if (process.env.PROD) {
    return ProdConfig
  }
  if (process.env.SANDBOX) {
    return SandboxConfig
  }
  return TestConfig
}

const config: any = getConfig()

export default config
