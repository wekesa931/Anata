import useAnalytics from 'src/hooks/analytics'

export const useHomePageAnalytics = () => {
  const homePageSections = useAnalytics('Home page')

  return {
    trackUserRedirectedToTasksPage: () =>
      homePageSections.track('task section - default accessed'),
    trackUserNavigatedToTasksPage: () =>
      homePageSections.track('task section - clicked'),
  }
}
