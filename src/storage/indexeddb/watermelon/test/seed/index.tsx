import { Database } from '@nozbe/watermelondb'
import { seedMember } from 'src/storage/indexeddb/watermelon/test/seed/member'
import { seedVitals } from './vitals'

export const seedTestDb = async (database: Database) => {
  await seedMember(database)
  await seedVitals(database)
}
