export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
    case 'Confirmed':
    case 'Achieved':
      return 'text-[#34c759]'
    case 'Inactive':
    case 'Refuted':
    case 'Rejected':
    case 'Worsening':
      return 'text-[#FF3B30]'
    case 'Provisioned':
    case 'Provisional':
    case 'Recurrence':
    case 'Sustaining':
      return 'text-[#FF9500]'
    case 'Resolved':
      return 'text-[#007AFF]'
    case 'Pending':
      return 'text-[#FFC107]'
    default:
      return 'text-[#5D6B82]'
  }
}
