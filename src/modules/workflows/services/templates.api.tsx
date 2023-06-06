import { useLazyDataSource, NormalizeDataFn } from 'src/services/api/utils'
import { GET_ALL_TEMPLATES } from 'src/modules/workflows/services/gql'
import { TWorkflowTemplateVariables } from 'src/modules/workflows/types'
import { Templates as TWorkflowTemplate } from 'src/modules/workflows/db/models'

export const normalizeWorkflowTemplates: NormalizeDataFn<
  TWorkflowTemplate[]
> = (data: any) => {
  return data?.workflowTemplates?.edges?.map(({ node }: any) => ({
    name: node?.name,
    moduleNames: node?.moduleNames,
    modules: node?.modules,
    updatedAt: node?.updatedAt,
  }))
}

export const useWorkflowTemplates = () =>
  useLazyDataSource<TWorkflowTemplate[], TWorkflowTemplateVariables>(
    GET_ALL_TEMPLATES,
    normalizeWorkflowTemplates,
    {
      variables: {
        name: '',
        status: 'Active',
      },
    }
  )

export default useWorkflowTemplates
