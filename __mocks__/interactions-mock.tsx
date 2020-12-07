const mockInteractions = {
  data: {
    memberInteractions: {
      edges: [
        {
          node: {
            interactionStartedAt: '2020-02-18T16:37:00+00:00',
            interactionSummaryNotes: 'Test Sumamary Notes',
            interactorType: 'BENEFICIARY',
            interactionDirection: 'OUTBOUND_INTERACTION',
            inboundInteractionCategory: null,
            outboundInteractionCategory: null,
            otherCategoryOutbound: null,
            otherCategoryInbound: null,
            flagForReview: 'NO',
            healthNavigator: {
              fullName: 'Test HN 1',
            },
          },
        },
        {
          node: {
            interactionStartedAt: '2020-02-20T12:27:00+00:00',
            interactionSummaryNotes: 'Shes doing very well',
            interactorType: 'BENEFICIARY',
            interactionDirection: 'OUTBOUND_INTERACTION',
            inboundInteractionCategory: null,
            outboundInteractionCategory: null,
            otherCategoryOutbound: null,
            otherCategoryInbound: null,
            flagForReview: 'NO',
            healthNavigator: {
              fullName: 'Test HN 2',
            },
          },
        },
      ],
    },
  },
}
export default mockInteractions
