import { useMember } from 'src/context/member'
import useAnalytics from 'src/hooks/analytics'

export const useModuleAnalytics = () => {
  const leftSectionAnalytics = useAnalytics('Left Section')
  const rightSectionAnalytics = useAnalytics('Right Section')
  const middlesSectionAnalytics = useAnalytics('Middle Section')
  const { member } = useMember()

  return {
    trackConditionsSummaryOpened: (condition: any) =>
      leftSectionAnalytics.track('Conditions summary clicked', condition),
    trackHmpPreviewed: (hmp: any) =>
      leftSectionAnalytics.track('HMP previewed', hmp),
    trackInterventionsSummaryOpened: (intervention: any) =>
      leftSectionAnalytics.track('Interventions summary clicked', intervention),
    trackPersonalSectionAccessed: () => {
      // eslint-disable-next-line no-underscore-dangle
      leftSectionAnalytics.track('Personal section accessed', member?._raw)
    },

    trackClinicalSectionAccessed: () => {
      // eslint-disable-next-line no-underscore-dangle
      leftSectionAnalytics.track('Clinical section accessed', member?._raw)
    },
    trackEditProfile: (editMsg: string) => leftSectionAnalytics.track(editMsg),
    trackProfileEdited: (editMsg: string, changes: any) =>
      leftSectionAnalytics.track(editMsg, changes),
    trackMiddleSectionOpened: (section: string, props?: any) =>
      middlesSectionAnalytics.track(section, props),
    trackRightSectionOpened: (section: string, props?: any) =>
      rightSectionAnalytics.track(section, props),
    trackConditionsFiltered: (filter: any) =>
      middlesSectionAnalytics.track('Conditions filtered', { filter }),
    trackInterventionsFiltered: (filter: any) =>
      middlesSectionAnalytics.track('Interventions filtered', { filter }),
    trackConditionsDetailsOpened: (condition: any) =>
      middlesSectionAnalytics.track(
        'Condition - associated item clicked',
        condition
      ),
    trackInterventionsDetailsOpened: (intervention: any) =>
      middlesSectionAnalytics.track(
        'Intervention - associated item clicked',
        intervention
      ),

    // udm
    trackDocumentSearched: (filters: any) =>
      middlesSectionAnalytics.track('Document searched', filters),
    trackDocumentShared: (doc: any) =>
      middlesSectionAnalytics.track('Document shared', doc),
    trackDocumentUploaded: (success: boolean, doc: any) => {
      if (success) {
        middlesSectionAnalytics.track('Document uploaded', doc)
      } else {
        middlesSectionAnalytics.track('Document upload failed', doc)
      }
    },

    // comms
    trackOutboundCall: (call: any) =>
      rightSectionAnalytics.track('Outbound call to member', call),
    trackCallTransferred: (success: boolean, details: any) => {
      if (success) {
        middlesSectionAnalytics.track('Call transferred successfully', details)
      } else {
        middlesSectionAnalytics.track('Call transfer failed', details)
      }
    },
    trackCallLogDetailsAccessed: (call: any) =>
      middlesSectionAnalytics.track('Call log details accessed', call),
    trackMissedCall: (inbound: boolean, call: any) => {
      if (inbound) {
        middlesSectionAnalytics.track('Inbound call missed', call)
      } else {
        middlesSectionAnalytics.track('Outbound call missed', call)
      }
    },
    trackSMSSent: (success: boolean, sms: any) => {
      if (success) {
        rightSectionAnalytics.track('SMS sent', sms)
      } else {
        rightSectionAnalytics.track('SMS send failed', sms)
      }
    },
  }
}
