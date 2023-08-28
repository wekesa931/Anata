import React, { useEffect } from 'react'
import { useMember } from 'src/context/member'
import { DateFilterProvider } from 'src/context/date-range-filter'
import CenteredLoader from 'src/components/loaders/centered'
import MemberNotFound from 'src/components/dialog/member-not-found'
import useAnalytics from 'src/hooks/analytics'
import RightViews from './right-views'
import MainViews from './main-views'
import BioData from './biodata'

function DashboardContent() {
  const { isLoading, memberNotFound, member } = useMember()
  const { identifyMember } = useAnalytics('Member Dashboard')

  useEffect(() => {
    if (member) {
      identifyMember(member)
      document.title = `Scribe: ${member.fullName}`
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
