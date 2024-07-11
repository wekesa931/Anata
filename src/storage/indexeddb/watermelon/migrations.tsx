import {
  schemaMigrations,
  createTable,
} from '@nozbe/watermelondb/Schema/migrations'
import { membersTableColumns } from 'src/modules/member/db/schema'
import { CollectionType } from 'src/storage/types'
import { conditionColumns } from 'src/modules/conditions(deprecated)/db/schema'
import { interventionColumns } from 'src/modules/interventions/db/schema'
import { conditionsInterventionsColumn } from 'src/storage/indexeddb/watermelon/relation-schema'
import { hmpColumns } from 'src/modules/hmp/db/schema'
import { vitalsTableColumns } from 'src/modules/vitals/db/schema'
import { lookupColumns } from 'src/modules/conditions/db/schema'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 9,
      steps: [
        createTable({
          name: CollectionType.MEMBERS,
          columns: membersTableColumns,
        }),
        createTable({
          name: CollectionType.CONDITIONS,
          columns: conditionColumns,
        }),
        createTable({
          name: CollectionType.INTERVENTIONS,
          columns: interventionColumns,
        }),
        createTable({
          name: CollectionType.CONDITIONS_INTERVENTIONS,
          columns: conditionsInterventionsColumn,
        }),
        createTable({
          name: CollectionType.HMPS,
          columns: hmpColumns,
        }),
        createTable({
          name: CollectionType.VITALS,
          columns: vitalsTableColumns,
        }),
        createTable({
          name: CollectionType.LOOKUPS,
          columns: lookupColumns,
        }),
      ],
    },
  ],
})
