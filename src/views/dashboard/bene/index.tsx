import React, { useEffect } from 'react'
import analytics from 'src/config/analytics'
import { useMember } from 'src/context/member'
import { DateFilterProvider } from 'src/context/date-range-filter'
import CenteredLoader from 'src/components/loaders/centered'
import MemberNotFound from 'src/components/dialog/member-not-found'
import RightViews from './right-views'
import MainViews from './main-views'
import BioData from './biodata'

function DashboardContent() {
  const { isLoading, memberNotFound, member } = useMember()
  useEffect(() => {
    if (member) {
      analytics.page('Member Dashboard', {
        memberId: member.antaraId,
      })

      document.title = `Scribe: ${member.fullName}`
    }
  }, [member])

  return isLoading ? (
    <CenteredLoader message="Loading member" />
  ) : (
    <>
      {memberNotFound ? (
        <MemberNotFound />
      ) : (
        <DateFilterProvider>
          <div className="w-full flex justify-between bg-white h-full relative rounded-t-2xl">
            <div className="h-full w-1/4">
              <BioData member={member} />
            </div>
            <div className="w-1/2 flex-1 border-r border-solid border-white">
              <MainViews />
            </div>

            <div className="bg-white border-l border-solid border-dark-blue-10 w-1/4 pb-7">
              <RightViews />
            </div>
          </div>
        </DateFilterProvider>
      )}
    </>
  )
}

export default DashboardContent
