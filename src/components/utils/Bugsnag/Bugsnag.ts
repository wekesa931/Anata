import Bugsnag from '@bugsnag/js'

const logError = (e: any) => {
  const envChack = process.env.NODE_ENV === 'production'
  if (envChack) {
    Bugsnag.notify(e)
  } else {
    console.log(e) //eslint-disable-line
  }
}

export default logError
