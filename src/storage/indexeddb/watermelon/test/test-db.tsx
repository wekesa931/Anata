import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { Database } from '@nozbe/watermelondb'
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider'
import schema from 'src/storage/indexeddb/watermelon/schema'
import models from 'src/storage/indexeddb/watermelon/models'
import React from 'react'
import logger from '@nozbe/watermelondb/utils/common/logger'

logger.silence()

export const debug = (msg: string) => logger.log(msg)

const adapter = new LokiJSAdapter({
  dbName: 'test',
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
})

export const testDatabase = new Database({
  adapter,
  modelClasses: models,
})

export const tearDown = async () => {
  await testDatabase.write(async () => {
    // eslint-disable-next-line no-underscore-dangle
    testDatabase._subscribers = []
    await testDatabase.unsafeResetDatabase()
  })
}

export function DataProvider({ children }: any) {
  return <DatabaseProvider database={testDatabase}>{children}</DatabaseProvider>
}
