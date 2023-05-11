import React from 'react'
import AirtableIframe from 'src/components/iframes/airtable-iframe'
import { useSidebar } from 'src/context/sidebar'

function AirtableView({ activeView, activeSubView, prev }: any) {
  const subListUrl = process.env.PROD
    ? activeSubView?.rootUrl
    : activeSubView?.url_sandbox
  const listUrl = process.env.PROD
    ? activeView?.rootUrl
    : activeView?.url_sandbox
  const prevUrl = process.env.PROD ? prev?.rootUrl : prev?.url_sandbox
  const urlToShow = () => {
    if (activeView.name === 'Tasks' && !activeSubView) {
      return prevUrl
    }
    if (activeSubView) {
      return subListUrl
    }

    return listUrl
  }
  if (!prev.component) {
    return <AirtableIframe src={urlToShow()} />
  }
  if (!activeSubView && prev.component && activeView.name === 'Tasks') {
    return prev.component
  }

  return <AirtableIframe src={urlToShow()} />
}

function HNDashboard() {
  const { activeView, activeSubView, prev } = useSidebar()

  React.useEffect(() => {
    document.title = `src Home: ${activeView.name}`
  }, [activeView])
  const view = () => {
    if (activeSubView) {
      return activeSubView.name
    }
    if (activeView.name === 'Tasks') {
      return prev.name
    }
    return activeView.name
  }
  return (
    <div data-testid="main-dash" className="flex h-full bg-white">
      <div className="flex-1 p-6 overflow-y-auto">
        <p
          data-testid="hn-text-heading"
          className="text-heading-2 margin-bottom-16"
        >
          {view()}
        </p>
        {activeView?.component && !activeSubView ? (
          activeView?.component
        ) : (
          <AirtableView
            activeSubView={activeSubView}
            activeView={activeView}
            prev={prev}
          />
        )}
      </div>
    </div>
  )
}

export default HNDashboard
