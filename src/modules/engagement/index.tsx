import React from 'react'
import TableauReport from 'tableau-react'
import { useMember } from 'src/context/member'

function EngagementDashboard() {
  const { member } = useMember()

  const filters = { 'Antara Id (Members)': [member['Antara ID']] }

  const options = {
    hideTabs: true,
    hideToolbar: true,
    height: 1050,
    width: '100%',
  }

  const dashboardURL =
    'https://dub01.online.tableau.com/t/kenyanairobi/views/WIPMemberEngagementDashboards/ScribeEmbed-MemberLevelEngagementSummary'

  return (
    <TableauReport
      url={dashboardURL}
      filters={filters}
      options={options}
      query="?:jsdebug=false"
    />
  )
}

export default EngagementDashboard
