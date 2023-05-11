/* eslint-disable no-console */
// import * as Sentry from '@sentry/react'
// import storage from '../../../helpers/secure-storage'
// import constants from '../../../constants/storage'

// const logError = (e: any) => {
//   const isProductionEnvironment =
//     process.env.NODE_ENV && process.env.NODE_ENV === 'production'
//   if (isProductionEnvironment) {
//     const user = JSON.parse(storage.get(constants.USER))
//     Sentry.setUser({ email: user?.email, name: user?.name })
//     Sentry.captureException(e)
//   }
// }

export const logError = console.error

export default console.error
