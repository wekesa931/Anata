import React from 'react'
import BioDataSection from 'src/modules/member/biodata'
import ErrorBoundary from 'src/components/error-boundary'

function BioData() {
  return (
    <ErrorBoundary>
      <BioDataSection />
    </ErrorBoundary>
  )
}

export default BioData
