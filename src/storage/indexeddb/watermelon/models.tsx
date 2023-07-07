import workflowModels from 'src/modules/workflows/db/models'
import memberModels from 'src/modules/member/db/models'
import conditionModels from 'src/modules/conditions/db/models'
import interventionModels from 'src/modules/interventions/db/models'
import relationsModels from 'src/storage/indexeddb/watermelon/relations-models'
import hmpModels from 'src/modules/hmp/db/models'

export default [
  ...workflowModels,
  ...memberModels,
  ...conditionModels,
  ...interventionModels,
  ...relationsModels,
  ...hmpModels,
]
