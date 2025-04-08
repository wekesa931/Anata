import useAnalytics from 'src/hooks/analytics'

export const useHomePageAnalytics = () => {
  const homePageSections = useAnalytics('Home page')

  return {
    trackUserRedirectedToTasksPage: () =>
      homePageSections.track('task section - default accessed'),
    trackUserNavigatedToTasksPage: () =>
      homePageSections.track('task section - accessed from the left menu'),
    trackUserNavigatedToWorkflowsPage: () =>
      homePageSections.track('workflow section - clicked'),
    trackUserNavigatedToEngagementsPage: () =>
      homePageSections.track('member engagement section - clicked'),
    trackUserOpenedWorkflow: (workflow: any) =>
      homePageSections.track('workflow section - workflow opened', {
        workflow,
      }),
    trackUserOpenedRegistration: () =>
      homePageSections.track('registration section - clicked'),
    trackUserLoggedOut: () =>
      homePageSections.track('logout section - clicked'),
  }
}
