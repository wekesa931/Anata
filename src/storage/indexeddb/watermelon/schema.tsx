import { appSchema } from '@nozbe/watermelondb'
import workflowSchemas from 'src/modules/workflows/db/schema'

export default appSchema({
  version: 1,
  tables: [...workflowSchemas],
})
