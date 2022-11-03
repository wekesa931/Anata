import React from 'react'
import TableauReport from 'tableau-react'
import { useMember } from '../../../../context/member.context'

function EngagementDashboard() {
  const { member } = useMember()

  const filters = { 'Antara Id': [member['Antara ID']] }

  const options = {
    hideTabs: true,
    hideToolbar: true,
  }

  const dashboardURL =
    'https://dub01.online.tableau.com/t/kenyanairobi/views/Engagement-EmbedScribe/Story1/a6b6fc90-448d-4295-a0c9-9ff2694cd6bd/d76ead17-55a8-4bc0-9162-a38cba09563a?:display_count=n&:showVizHome=n&:origin=viz_share_link'

  return (
    <TableauReport url={dashboardURL} filters={filters} options={options} />
  )
}

export default EngagementDashboard
