const mockHnTasks = {
  data: {
    memberHnTasks: {
      edges: [
        {
          node: {
            recordId: 'recFAKETASK1',
            type: 'Prescribe Med',
            dueDate: '2000-06-01',
            taskNotes: 'Task Notes',
            status: 'Complete',
            taskPriority: 'High',
            measurementsToTake: ['Height', 'Blood Pressure'],
            assignee: {
              fullName: 'Test HN User',
            },
            lastStatusChangedAt: '2000-01-01T00:00:00+00:00',
            formUrl: 'http://something.com/fake_url/',
          },
        },
      ],
    },
  },
}

export default mockHnTasks
