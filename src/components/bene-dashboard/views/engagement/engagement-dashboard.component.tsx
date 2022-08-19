import React from 'react'
import TableauReport from 'tableau-react'
import { useMember } from '../../../../context/member.context'

const EngagementDashboard = () => {
  const { member } = useMember()

  const filters = { 'Antara Id': member['Antara ID'] }

  const options = {
    hideTabs: true,
  }

  const dashboardURL =
    'https://dub01.online.tableau.com/t/kenyanairobi/views/Engagement-EmbedScribe/Story1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link'

  return (
    <TableauReport url={dashboardURL} filters={filters} options={options} />
  )
}

export default EngagementDashboard
