import { appSchema } from '@nozbe/watermelondb'
import workflowSchemas from 'src/modules/workflows/db/schema'
import memberSchemas from 'src/modules/member/db/schema'

export default appSchema({
  version: 2,
  tables: [...workflowSchemas, ...memberSchemas],
})
