import {
  schemaMigrations,
  createTable,
} from '@nozbe/watermelondb/Schema/migrations'
import { membersTableColumns } from 'src/modules/member/db/schema'
import { CollectionType } from 'src/storage/types'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: CollectionType.MEMBERS,
          columns: membersTableColumns,
        }),
      ],
    },
  ],
})
