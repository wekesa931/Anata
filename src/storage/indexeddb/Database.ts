/* eslint-disable class-methods-use-this */
import { Collection } from '@nozbe/watermelondb'
import { CollectionType, Model } from 'src/storage/types'
import { database } from './watermelon/db'

class Database {
  getCollection<T>(collectionType: CollectionType): Collection<Model<T>> {
    return database.get(collectionType)
  }

  async getById(collectionType: CollectionType, id: string) {
    return database.get(collectionType).find(id)
  }

  async clear() {
    return database.write(async () => {
      return database.unsafeResetDatabase()
    })
  }

  async batch(
    ...e: (false | void | Model<any> | Promise<void> | null)[]
  ): Promise<void> {
    return database.batch(...e)
  }

  async write<T>(cb: () => Promise<T>) {
    return database.write<T>(cb)
  }
}

export default new Database()
