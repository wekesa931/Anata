import { appSchema } from '@nozbe/watermelondb'
import workflowSchemas from 'src/modules/workflows/db/schema'
import memberSchemas from 'src/modules/member/db/schema'
import conditionSchema from 'src/modules/conditions(deprecated)/db/schema'
import interventionSchema from 'src/modules/interventions/db/schema'
import relationSchema from 'src/storage/indexeddb/watermelon/relation-schema'
import hmpSchema from 'src/modules/hmp/db/schema'
import vitalsSchema from 'src/modules/vitals/db/schema'
import v2ConditionSchema from 'src/modules/conditions/db/schema'

export default appSchema({
  version: 9,
  tables: [
    ...workflowSchemas,
    ...memberSchemas,
    ...conditionSchema,
    ...interventionSchema,
    ...relationSchema,
    ...hmpSchema,
    ...vitalsSchema,
    ...v2ConditionSchema,
  ],
})
