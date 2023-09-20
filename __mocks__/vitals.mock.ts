export const mockVitalsResponse = {
  data: {
    vitals: {
      edges: {
        node: {
          weight: 100,
          height: 1.7,
          timestamp: '2021-09-01T00:00:00.000Z',
          temperature: 36.5,
          oxygenSaturation: 100,
          sixLeadEcgFindings: 'TEST-6-LEAD-ECG-FINDINGS',
          respiratoryRate: 100,
          measurer: 'TEST-MEASURER',
          id: 'TEST-VITALS-ID',
        },
      },
    },
    cholesterolMonitoring: {
      edges: {
        node: {
          timestamp: '2021-09-01T00:00:00.000Z',
          measurer: 'TEST-MEASURER',
          totalCholesterol: 100,
          triglyceride: 100,
          ldl: 100,
          hdl: 100,
          lipidPanelTestType: 'TEST-LIPID-PANEL-TEST-TYPE',
          id: 'TEST-CHOLESTEROL-ID',
        },
      },
    },
    bloodPressureMonitoring: {
      edges: {
        node: {
          timestamp: '2021-09-01T00:00:00.000Z',
          measurer: 'TEST-MEASURER',
          morningSystolic: 100,
          morningDiastolic: 100,
          eveningSystolic: 100,
          eveningDiastolic: 100,
          morningPulse: 100,
          eveningPulse: 100,
          averageDailySystolic: 100,
        },
      },
    },
    bloodGlucoseMonitoring: {
      edges: {
        node: {
          timestamp: '2021-09-01T00:00:00.000Z',
          measurer: 'TEST-MEASURER',
          fastingBloodGlucose: 100,
          id: 'TEST-BLOOD-GLUCOSE-ID',
          morningBloodGlucoseTiming: 'TEST-MORNING-BLOOD-GLUCOSE-TIMING',
        },
      },
    },
    hba1cMonitoring: {
      edges: {
        node: {
          timestamp: '2021-09-01T00:00:00.000Z',
          measurer: 'TEST-MEASURER',
          hba1c: 100,
          id: 'TEST-HBA1C-ID',
        },
      },
    },
  },
}
