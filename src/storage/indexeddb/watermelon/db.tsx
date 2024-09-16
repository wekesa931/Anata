import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { Database } from '@nozbe/watermelondb'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import React from 'react'
import logger from '@nozbe/watermelondb/utils/common/logger'
import { useParams } from 'react-router-dom'
import { Alert } from '@mui/material'
import { useCheckTabDuplication } from 'src/hooks/tab-duplication-check'
import schema from './schema'
import migrations from './migrations'
import models from './models'

// enable this to see detailed IndexedDB debugging information
// eslint-disable-next-line no-underscore-dangle
// window.__loki_incremental_idb_debug = true

logger.silence()

const getAdapter = (dbName: string) =>
  new LokiJSAdapter({
    schema,
    migrations,
    useWebWorker: false,
    useIncrementalIndexedDB: false,

    dbName,
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
        // alert('Please refresh the page to avoid data loss.')
        window.location.reload()
      },
      onversionchange: () => {
        // database was deleted in another browser tab (user logged out), so we must make sure we delete
        // it in this tab as well - usually best to just refresh the page
        window.location.reload()
      },
    },
  })

export const getDatabase = (dbName: string) =>
  new Database({
    adapter: getAdapter(dbName),
    modelClasses: models,
  })

function CloseTabPage({ antaraId }: any) {
  return (
    <div className="h-full w-full">
      <Alert severity="warning" variant="filled">
        This member&apos;s dashboard ({antaraId}) is open in another tab. Please
        close one of the tabs to avoid data loss or app crashes.
      </Alert>
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col items-center justify-center gap-2 w-1/2">
          <p className="text-3xl font-bold text-dark-blue-100">
            This member&apos;s dashboard ({antaraId}) is open in another tab.
            Please close this tab, use the other one and refresh.
          </p>
        </div>
      </div>
    </div>
  )
}

export function DataProvider({ children }: any) {
  const { antaraId } = useParams()
  const dbName = antaraId ? `${antaraId}.db` : 'scribe.db'

  const database = getDatabase(dbName)

  const { showAlert } = useCheckTabDuplication()

  return showAlert ? (
    <CloseTabPage antaraId={antaraId} />
  ) : (
    <DatabaseProvider database={database}>{children}</DatabaseProvider>
  )
}

export default DataProvider
