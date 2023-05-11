import prod from './prod'
import staging from './staging'

export default process.env.PROD === 'true' ? prod : staging
