/*eslint-disable */
let CommDB: any = null

if (window.indexedDB) {
  const commLibDBReq = indexedDB.open('commLibDB', 1)

  commLibDBReq.onupgradeneeded = function (event: any) {
    CommDB =
      event && event.target && event.target.result ? event.target.result : null
    if (!CommDB.objectStoreNames.contains('notificationItems')) {
      CommDB.createObjectStore('notificationItems', { autoIncrement: true })
    }
  }

  commLibDBReq.onsuccess = function (event: any) {
    CommDB =
      event && event.target && event.target.result ? event.target.result : null
    CommDB = event.target.result
  }
}

export function fetchAll<T>(tableName: string): Promise<Array<T>> {
  return new Promise((resolve, reject) => {
    // TODO: Figure out a way to wait for the variable to be initialized.

    setTimeout(() => {
      if (!CommDB || !CommDB.transaction) {
        reject('Database is not initialised')
      }
      const transaction = CommDB.transaction(tableName, 'readwrite')
      const store = transaction.objectStore(tableName)
      const records = store.getAll()
      transaction.oncomplete = function (event: any) {
        resolve(records.result)
      }

      transaction.onerror = function (event: any) {
        reject('Error occurred while retrieving data')
      }
    }, 100)
  })
}

export function clearTable(tableName: string) {
  return new Promise((resolve, reject) => {
    if (!CommDB) {
      reject('Database is not initialised')
    }
    const transaction = CommDB.transaction(tableName, 'readwrite')
    const store = transaction.objectStore(tableName)
    const records = store.clear()
    transaction.oncomplete = function (event: any) {
      resolve(records.result)
    }

    transaction.onerror = function (event: any) {
      reject('Error occurred while retrieving data')
    }
  })
}

export default CommDB

/*eslint-disable */
