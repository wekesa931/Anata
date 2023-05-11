import { ViewApi } from '@fullcalendar/core'
import useAnalytics from 'hooks/analytics'

const VIEWS: Record<string, string> = {
  resourceThreeMonths: '3 months view',
  resourceSixMonths: '6 months view',
  resourceMonthly: 'Monthly view',
  resourceWeekly: 'Weekly view',
  resourceDaily: 'Daily view',
}

const useLongitudinalTracker = () => {
  const { track, page } = useAnalytics('Longitudinal tracker')

  const viewChanged = (previousView: string, currentView: string) => {
    track('View changed', {
      previousView: VIEWS[previousView],
      currentView: VIEWS[currentView],
    })
  }

  const periodChanged = (view: ViewApi) => {
    const start = view.currentStart
    const end = view.currentEnd

    track('Period changed', {
      periodStart: start,
      periodEnd: end,
    })
  }

  const resourcesSelected = (resources: string[]) => {
    track('Resources selected', {
      resources,
    })
  }

  const itemOpened = (item?: Record<string, unknown>) => {
    track('Item opened', {
      ...item,
    })
  }

  return {
    viewChanged,
    page: () =>
      page({
        page: 'Longitudinal tracking',
      }),
    periodChanged,
    resourcesSelected,
    itemOpened,
  }
}

export default useLongitudinalTracker
