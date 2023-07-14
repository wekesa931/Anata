import React from 'react'
import BioDataSection from 'src/modules/member/views/biodata-layout'
import ErrorBoundary from 'src/components/error-boundary'
import type { Member } from 'src/modules/member/db/models'

type BioDataProps = {
  member: Member | null
}
function BioData({ member }: BioDataProps) {
  return (
    <ErrorBoundary>
      <BioDataSection member={member} />
    </ErrorBoundary>
  )
}

export default BioData
