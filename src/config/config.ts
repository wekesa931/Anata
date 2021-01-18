import TestConfig from './config.test.json'
import ProdConfig from './config.prod.json'
import SandboxConfig from './config.sandbox.json'

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
