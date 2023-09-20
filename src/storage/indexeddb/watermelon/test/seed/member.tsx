import { Database } from '@nozbe/watermelondb'
import type { Member } from 'src/modules/member/db/models'
import { CollectionType } from 'src/storage/types'

export const seedMember = async (database: Database) => {
  const collection = database.collections.get<Member>(CollectionType.MEMBERS)

  await database.write(async () => {
    await collection.create((member) => {
      member.firstName = 'John'
      member.lastName = 'Doe'
      member.antaraId = 'TEST-1234'
      member.airtableRecordId = 'rec1234'
      member.middleName = 'Smith'
      member.email = 'test@mail.com'
    })
  })
}
