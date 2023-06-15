import { DocumentNode, gql } from '@apollo/client'
import { print } from 'graphql'

// Define all possible variables with their types
const ALL_VARIABLES = {
  memberDetails: 'UpdateMemberDetailsInput',
  memberContact: 'UpdateMemberContactInput',
  memberInsurance: 'UpdateMemberInsuranceInput',
  memberPhones: 'UpdateMemberPhonesInput',
  memberStaff: 'UpdateMemberStaffInput',
  memberStatus: 'MemberStatusUpdateInput',
  memberAddress: 'UpdateMemberAddressesInput',
}

export function composeMutations(...nodes: DocumentNode[]) {
  const usedVariables = new Set()

  const mutationBodies = nodes.map((node) => {
    const printed = print(node)
    const mutationBody = printed
      .slice(printed.indexOf('{') + 1, printed.lastIndexOf('}'))
      .trim()

    // Extract used variables from the mutation body
    Object.keys(ALL_VARIABLES).forEach((variable) => {
      if (mutationBody.includes(variable)) {
        usedVariables.add(variable)
      }
    })

    return mutationBody
  })

  // Filter the combined variables to include only the ones that are used
  const combinedVariables = Object.entries(ALL_VARIABLES)
    .filter(([variable]) => usedVariables.has(variable))
    .map(([variable, type]) => `$${variable}: ${type}`)
    .join('\n')

  return gql`
    mutation Combined(${combinedVariables}) {
      ${mutationBodies.join('\n')}
    }
  `
}
