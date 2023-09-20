import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { Database } from '@nozbe/watermelondb'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import React from 'react'
import storage from 'src/storage/secure-storage'
import keys from 'src/config/constants'
import logger from '@nozbe/watermelondb/utils/common/logger'
import schema from './schema'
import migrations from './migrations'
import models from './models'

logger.silence()

const checkIfUserIsLoggedIn = () => {
  let loggedInUser = storage.get(keys.USER)
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser)
  }

  return !!loggedInUser
}

const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onQuotaExceededError: (error) => {
    // eslint-disable-next-line no-console
    console.error('DB: Quota exceeded while writing to IndexedDB', error)
    // eslint-disable-next-line no-alert
    alert(
      'Sorry, we ran out of space on your device. Please try clearing your browser cache or deleting unnecessary data.'
    )
  },
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
    // eslint-disable-next-line no-console
    console.error('DB: Failed to load database', error)
    // eslint-disable-next-line no-alert
    alert(
      'Sorry, we are unable to setup local db. Please try clearing your browser cache or deleting unnecessary data.'
    )
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      // Called when this adapter is forced to overwrite contents of IndexedDB.
      // This happens if there's another open tab of the same app that's making changes.
      // Try to synchronize the app now, and if user is offline, alert them that if they close this
      // tab, some data may be lost
    },
    onversionchange: () => {
      // database was deleted in another browser tab (user logged out), so we must make sure we delete
      // it in this tab as well - usually best to just refresh the page
      if (checkIfUserIsLoggedIn()) {
        window.location.reload()
      }
    },
  },
})

export const database = new Database({
  adapter,
  modelClasses: models,
})

export function DataProvider({ children }: any) {
  return <DatabaseProvider database={database}>{children}</DatabaseProvider>
}

export default DataProvider
