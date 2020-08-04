import TestConfig from './config.test.json'
import ProdConfig from './config.prod.json'

const config = process.env.PROD ? ProdConfig : TestConfig

export default config
