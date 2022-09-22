import Bugsnag from '@bugsnag/js'
import storage from '../../../helpers/secure-storage'
import constants from '../../../constants/storage'

const logError = (e: any) => {
  const isProductionEnvironment =
    process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  if (isProductionEnvironment) {
    const user = JSON.parse(storage.get(constants.USER))
    Bugsnag.setUser('', user?.email, user?.name)
    Bugsnag.notify(e)
  } else {
    console.log(e) //eslint-disable-line
  }
}

export default logError
