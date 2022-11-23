import React from 'react'
import TableauReport from 'tableau-react'
import { useMember } from '../../../../context/member.context'

function EngagementDashboard() {
  const { member } = useMember()

  const filters = { 'Antara Id (Members)': [member['Antara ID']] }

  const options = {
    hideTabs: true,
    hideToolbar: true,
  }

  const dashboardURL =
    'https://dub01.online.tableau.com/t/kenyanairobi/views/WIPMemberEngagementDashboards/ScribeEmbed-MemberLevelEngagementSummary'

  return (
    <TableauReport url={dashboardURL} filters={filters} options={options} />
  )
}

export default EngagementDashboard
