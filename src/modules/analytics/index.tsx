import { useMember } from 'src/context/member'
import useAnalytics from 'src/hooks/analytics'

export const useModuleAnalytics = () => {
  const leftSectionAnalytics = useAnalytics('Left Section')
  const rightSectionAnalytics = useAnalytics('Right Section')
  const middlesSectionAnalytics = useAnalytics('Middle Section')
  const homePageSectionAnalytics = useAnalytics('Home Page')
  const memberAnalytics = useAnalytics('Member')
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
    trackSeeWhyButtonClicked: () => {
      leftSectionAnalytics.track('See why button clicked')
    },
    trackAddButtonClicked: (title: any) => {
      leftSectionAnalytics.track('Add button clicked', title)
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

    trackActionEdited: (item: string, data: any) => {
      rightSectionAnalytics.track(`${item} edited`, data)
    },

    // udm
    trackDocumentSearched: (filters: any) =>
      middlesSectionAnalytics.track('Document searched', filters),
    trackDocumentShared: (doc: any, success = true) =>
      middlesSectionAnalytics.track(
        `Document ${success ? 'shared' : 'sharing failed'}`,
        doc
      ),
    trackDocumentUploaded: (success: boolean, doc: any) => {
      if (success) {
        middlesSectionAnalytics.track('Document uploaded', doc)
      } else {
        middlesSectionAnalytics.track('Document upload failed', doc)
      }
    },
    trackNewDocOpened: () => {
      middlesSectionAnalytics.track('New document opened')
    },
    trackNewDocSelected: (docType: string) => {
      middlesSectionAnalytics.track('New document selected', { docType })
    },
    trackNewDocumentPreviewed: (document: any) => {
      middlesSectionAnalytics.track('New document previewed', { document })
    },
    trackNewDocmentPreviewCancelled: (document: any) => {
      middlesSectionAnalytics.track('New document preview cancelled', {
        document,
      })
    },
    trackNewDocumentGenerated: (document: any, success = true) => {
      middlesSectionAnalytics.track(
        `New document ${success ? 'generated' : 'generation failed'}`,
        { document }
      )
    },
    trackPeriodToDocumentGeneration: (
      document: any,
      durationInSeconds: any
    ) => {
      middlesSectionAnalytics.track('New prescription document generated', {
        document,
        durationInSeconds,
      })
    },
    trackNewDocumentPreviewEdited: (document: any) => {
      middlesSectionAnalytics.track('New document preview edited', { document })
    },
    trackNewDocumentShared: (document: any, shared = true) => {
      middlesSectionAnalytics.track(
        `New document ${shared ? 'shared' : 'not shared'}`,
        { document }
      )
    },

    // comms
    trackOutboundCall: (call: any) => {
      rightSectionAnalytics.track('Outbound call to member', call)
      rightSectionAnalytics.track('Call initiated', call)
    },
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
    trackValidateMemberClicked: (validatedMember: any) => {
      rightSectionAnalytics.track(
        'Call Validate member clicked',
        validatedMember
      )
    },
    trackValidatedMember: (validatedMember: any) => {
      rightSectionAnalytics.track('Call Member validated', validatedMember)
    },
    trackOpenFormClicked: (formName: any) => {
      rightSectionAnalytics.track('Call Open form clicked', formName)
    },
    trackHoldParticipant: (participant: any, held = true) => {
      rightSectionAnalytics.track(
        `Call Participant ${held ? 'hold' : 'unhold'} clicked`,
        participant
      )
    },
    trackNewContactAdded: (contact: any) => {
      rightSectionAnalytics.track('Call New contact added', contact)
    },
    trackCallEnded: (call: any) => {
      rightSectionAnalytics.track('Call ended', call)
    },
    trackTransferRequested: (call: any) => {
      rightSectionAnalytics.track('Call transfer requested', call)
    },
    trackTransferValidated: (call: any) => {
      rightSectionAnalytics.track('Call transfer validated', call)
    },
    trackCalInitiated: (call: any) => {
      rightSectionAnalytics.track('Call initiated', call)
    },

    // labs and vitals
    trackLabsAndVitalsTypeSelected: (type: string) => {
      middlesSectionAnalytics.track('Labs & Vitals Type selected', { type })
    },
    trackLabsAndVitalsRangeSelected: (
      timeRange: any,
      type: string,
      rangeName: string
    ) => {
      middlesSectionAnalytics.track('Labs & Vitals Range selected', {
        timeRange,
        type,
        rangeName,
      })
    },
    trackLabsAndVitalsPreviousPeriodClicked: (type: string, period: string) => {
      middlesSectionAnalytics.track('Labs & Vitals Previous period clicked', {
        type,
        period,
      })
    },
    trackLabsAndVitalsPreviousNextClicked: (type: string, period: string) => {
      middlesSectionAnalytics.track('Labs & Vitals Next period clicked', {
        type,
        period,
      })
    },
    trackLabsAndVitalsDataHovered: (type: string, data: any) => {
      middlesSectionAnalytics.track('Labs & Vitals Data hovered', {
        type,
        data,
      })
    },

    // table events
    trackRowDetailsAccessed: (tableName: string, row: any) => {
      middlesSectionAnalytics.track(
        `${tableName} table - Row details accessed`,
        row
      )
    },

    trackPageSelected: (tableName: string, pageNumber: number) => {
      middlesSectionAnalytics.track(
        `${tableName} table - Page ${pageNumber} selected`
      )
    },
    trackRowsPerPageSelected: (tableName: string, rowsPerPage: number) => {
      middlesSectionAnalytics.track(
        `${tableName} table - Rows per page selected`,
        { rowsPerPage }
      )
    },
    trackFieldNameSorted: (
      tableName: string,
      fieldName: string,
      order: string,
      source: 'home' | 'middle'
    ) => {
      const sectionAnalytics =
        source === 'home' ? homePageSectionAnalytics : middlesSectionAnalytics
      sectionAnalytics.track(`${tableName} table - ${fieldName} field sorted`, {
        order,
      })
    },
    trackTableGrouped: (tableName: string, groupColumn: string) => {
      homePageSectionAnalytics.track(
        `${tableName} table - grouped by ${groupColumn}`
      )
    },
    trackTableGroupAllExpandToggled: (tableName: string, expanded: boolean) => {
      homePageSectionAnalytics.track(
        `${tableName} table - all groups ${expanded ? 'expanded' : 'collapsed'}`
      )
    },
    trackTableRowExpandToggled: (
      tableName: string,
      rowName: any,
      expanded: boolean
    ) => {
      homePageSectionAnalytics.track(
        `${tableName} table - ${rowName} ${expanded ? 'expanded' : 'collapsed'}`
      )
    },
    trackTasksFiltered: (table: string, filter: string) => {
      homePageSectionAnalytics.track(`${table} table - filtered by ${filter}`)
    },
    trackUserOpenedWorkflow: (workflow: any) =>
      homePageSectionAnalytics.track('workflow section - workflow opened', {
        workflow,
      }),

    trackTasksSectionOpenedFromMenu: () => {
      homePageSectionAnalytics.track(
        'tasks section - opened from dashboard menu'
      )
    },
    trackWorkflowsSectionOpenedFromMenu: () => {
      homePageSectionAnalytics.track(
        'workflows section - opened from dashboard menu'
      )
    },
    trackMemberSearched: (searchedMember: any, source: 'main' | 'member') => {
      memberAnalytics.track(`searched from ${source} dashboard`, {
        member: searchedMember,
      })
    },
    trackTaskItemOpened: (task: any) => {
      homePageSectionAnalytics.track(`tasks - task opened`, { task })
    },

    // tasks modal
    trackTaskCompletion: (data: any) => {
      rightSectionAnalytics.track(
        `complete button clicked for a single task`,
        data
      )
    },
    trackMissedTaskClicked: (data: any, tasksLength: any) => {
      rightSectionAnalytics.track(`missed button clicked`, {
        data,
        tasksLength,
      })
    },
    trackTemplateEdit: (item: any) => {
      rightSectionAnalytics.track(item)
    },
    trackReshedulingDueDate: (item: any[]) => {
      item.map((item) => {
        rightSectionAnalytics.track(`rescheduling date modified - ${item}`)
        return item
      })
    },
    trackAutomaticActionsInteractionLog: (data: any) => {
      rightSectionAnalytics.track(
        `automatic next steps interaction log saved`,
        data
      )
    },
    trackAutomaticActionsSms: (data: any) => {
      rightSectionAnalytics.track(`automatic next steps sms sent`, data)
    },
    trackUpdateAppointment: (data: any) => {
      rightSectionAnalytics.track(
        `Appointment linked to a task marked as missed `,
        data
      )
    },

    trackAutomaticActionSubmitted: () => {
      rightSectionAnalytics.track('automatic actions submitted')
    },
    trackActiveTasksSectionOpened: (tasks: any) =>
      rightSectionAnalytics.track('Active tasks section clicked', tasks),
    trackInActiveTasksSectionOpened: (tasks: any) =>
      rightSectionAnalytics.track('InActive tasks section clicked', tasks),
    trackTaskCompletionForMultipleTasks: (data: any) => {
      rightSectionAnalytics.track(
        `complete button clicked for multiple tasks`,
        data
      )
    },
    trackLabRequestCreatedFromDocs: (labTypes: any) => {
      middlesSectionAnalytics.track(
        'lab requests created from UDM document upload',
        {
          labTypes,
        }
      )
    },
    trackLabRequestUpdated: (labRequest: any) => {
      middlesSectionAnalytics.track('lab request updated', labRequest)
    },
    trackFormSaved: (form: any, workflowId?: string) => {
      rightSectionAnalytics.track(`${form} form submitted`, {
        form,
        workflowId,
      })
    },
    trackFormOpened: (formName: string) => {
      rightSectionAnalytics.track(`${formName} form opened`)
    },
    trackFormClosed: (formName: string) => {
      rightSectionAnalytics.track(`${formName} form closed`)
    },
  }
}
