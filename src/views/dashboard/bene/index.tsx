import React, { useEffect } from 'react'
import { useMember } from 'src/context/member'
import CenteredLoader from 'src/components/loaders/centered'
import MemberNotFound from 'src/components/dialog/member-not-found'
import useAnalytics from 'src/hooks/analytics'
import NavBar from 'src/components/navbar'
import { useUser } from 'src/context/user'
import BillingEligibilityModal from 'src/modules/member/components/forms/billing/components/billing-eligibility-modal'
import { useLocation } from 'react-router-dom'
import RightViews from './right-views'
import MainViews from './main-views'
import BioData from './biodata'

function DashboardContent() {
  const { isLoading, memberNotFound, member } = useMember()
  const { identifyMember } = useAnalytics('Member Dashboard')
  const user = useUser()
  const location = useLocation()

  useEffect(() => {
    if (member) {
      identifyMember(member)
      document.title = `Scribe: ${member.fullName}`
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  const isSubscriptionValid = (enrollment: any) => {
    const validStatuses = ['ACTIVE', 'GRACE_PERIOD']
    const status = enrollment?.billingSchemeSubscription?.subscriptionStatus
    if (!status) return false
    return validStatuses.includes(status)
  }

  return isLoading && !member && !memberNotFound ? (
    <div className="flex items-center justify-center h-screen w-full">
      <CenteredLoader message="Loading member..." />
    </div>
  ) : (
    <div className="flex flex-col h-full flex-1 bg-white w-full">
      {!!user?.userAirtableId && <NavBar />}
      {memberNotFound ? (
        <MemberNotFound />
      ) : (
        <>
          <div className="w-full flex justify-between bg-white h-full relative rounded-t-2xl transition">
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
          {!isSubscriptionValid(member?.activeBillingPackageEnrollment) &&
            location.search !== '?register=true' && <BillingEligibilityModal />}
        </>
      )}
    </div>
  )
}

export default DashboardContent
