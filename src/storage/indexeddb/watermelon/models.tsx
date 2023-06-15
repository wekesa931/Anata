import workflowModels from 'src/modules/workflows/db/models'
import memberModels from 'src/modules/member/db/models'

export default [...workflowModels, ...memberModels]
