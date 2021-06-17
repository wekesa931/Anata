const mockCallSession = {
  data: {
    conferenceSessions: {
      edges: [
        {
          node: {
            origin: '+254715338188',
            callDirection: 'OUTBOUND',
            createdAt: '2021-05-31T15:20:04.436300+00:00',
            endedAt: null,
            startedAt: null,
            deadline: null,
            activeParticipants: 0,
            totalParticipants: 2,
            roomName: 'cbb69fa4-334c-4445-95cd-855fa8cee5ec',
            agentPhone: '+254715338188',
            agentEmail: 'bill@antarahealth.com',
            memberPhone: '+254708201772',
            sessionStarted: false,
            sessionEnded: false,
            allPresent: false,
            inCallDuration: 0.0,
          },
        },
      ],
    },
  },
}

export default mockCallSession
