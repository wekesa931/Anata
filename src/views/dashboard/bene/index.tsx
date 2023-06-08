import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Fetcher from 'src/utils/airtable/fetcher'
import ErrorBoundary from 'src/components/error-boundary'
import analytics from 'src/config/analytics'
import { MemberProvider, useMember } from 'src/context/member'
import { DateFilterProvider } from 'src/context/date-range-filter'
import CenteredLoader from 'src/components/loaders/centered'
import RightViews from './right-views'
import MainViews from './main-views'
import BioData from './biodata'

function DashboardContent() {
  const { v2Member } = useMember()

  return !v2Member ? (
    <CenteredLoader message="Loading member" />
  ) : (
    <DateFilterProvider>
      <div className="flex justify-between bg-white h-full relative rounded-t-2xl">
        <ErrorBoundary>
          <BioData />
        </ErrorBoundary>
        <div className="w-1/2 flex-1 border-r border-solid border-white">
          <MainViews />
        </div>

        <div className="bg-white border-l border-solid border-dark-blue-10 w-1/5 pb-7">
          <RightViews />
        </div>
      </div>
    </DateFilterProvider>
  )
}

function PatientDashboard() {
  const [recId, setRecId] = useState<string>()
  const params = useParams<any>()

  if (params.recId && recId !== params.recId) {
    setRecId(params.recId)
  }

  useEffect(() => {
    if (recId) {
      analytics.page('Member Dashboard', {
        memberId: recId,
      })
    }
  }, [recId])

  const getDocumentTitle = (member: any) => {
    return `src: ${member['Full Name'] ? member['Full Name'] : 'Loading'}`
  }

  return (
    <Fetcher
      url={`members/${recId}`}
      contextKey={recId}
      skeleton={false}
      getDocumentTitle={getDocumentTitle}
    >
      {(response: any) => (
        <MemberProvider member={response}>
          <DashboardContent />
        </MemberProvider>
      )}
    </Fetcher>
  )
}

export default PatientDashboard
