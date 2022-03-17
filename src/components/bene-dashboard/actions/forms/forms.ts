const FORMS = [
  {
    name: 'Health Navigator Task Form',
    url: 'shrSPv5zEGvh1nm22',
    url_sandbox: 'shr1dgOLCFq2P05jR',
    hnField: 'Assignee',
  },
  {
    name: 'Member Task Form',
    url_sandbox: 'shryJ347Eg4Ymboth',
    url: 'shr1nZ8X0K7jPo3oq',
  },
  {
    name: 'Interaction Log Form',
    url: `/interaction/create`,
    airtableUrl: false,
  },
  {
    name: 'PAFU',
    url_sandbox: 'shrBbbtaMH60vGguG',
    url: 'shrCRi52uE0oDSpme',
  },
  {
    name: 'Medication Prescription Form',
    url_sandbox: 'shroBQxpNNm6KXtwv',
    url: 'shrH0jDDogdH2ySWr',
  },
  {
    name: 'Appointment Form',
    url: 'shrZWjIcj1g2zMA5S',
    url_sandbox: 'shrg4wfIhaNdPsALo',
    hnField: 'Health Navigator',
  },
  {
    name: 'Vitals Intake Form',
    url: 'shr0VkCzeprnRSIhA',
    url_sandbox: 'shrlsxxByLfWCepi2',
    hnField: 'Staff',
  },
  {
    name: 'BP Monitoring Intake',
    url_sandbox: 'shrnG4Kdq4S57wsXE',
    url: 'shrJo1OLcSNVTTA0w',
  },
  {
    name: 'CHL Monitoring Intake',
    url_sandbox: 'shrsqW3PhcfdiAfqd',
    url: 'shreiiEvt7m7qg6az',
  },
  {
    name: 'DM Monitoring',
    url_sandbox: 'shrZ2TWEQsxU2jwa6',
    url: 'shrbn21wPY6Vj0Ufv',
  },
  {
    name: 'Baseline Form',
    url_sandbox: 'shrWdIHgT7sOUEiMP',
    url: 'shrPou8GMbw9pKWpZ',
    hnField: 'Health Navigator',
  },
  {
    name: 'Condition Diagnosis Form',
    url_sandbox: 'shrjHJjzwiX1I4y12',
    url: 'shreJWFrTNVXs6RKW',
    hnField: 'Health Navigator',
  },
  {
    name: 'HIF',
    url_sandbox: 'shr8shifAD1eU4COB',
    url: 'shrQlDyAynyeYDxT0',
  },
  {
    name: 'Minor HIF Form',
    url_sandbox: 'shrY9IRkqmgOZ9tZZ',
    url: 'shrGMz8GeHIly7FWy',
  },
  {
    name: 'HMP Intake Form',
    url_sandbox: 'shr4ZuYxSMoN3O6SZ',
    url: 'shrLf0JnXDQ7jNxOg',
  },
  {
    name: 'Monitoring Kit Form',
    url_sandbox: 'shrM2jCCYt8QVtmue',
    url: 'shrnOUMPNs7vVStMR',
    hnField: 'Health Navigator',
  },
  {
    name: 'Nutritional Consultation Form',
    url_sandbox: 'shr35X678IUcLYdlT',
    url: 'shrFmDt0AU4XjbsAr',
  },
  {
    name: 'Intervention Intake Form',
    url_sandbox: 'shrmUaOekDvAH9Er1',
    url: 'shrwlizJiy4xcAR2Y',
  },
  {
    name: 'Intervention Data Collection Form',
    url_sandbox: 'shr7db5hbcvnVx2Eg',
    url: 'shrU6coJtTURljj15',
  },
  {
    name: 'Logistics Task',
    url_sandbox: 'shrlnUGgWFhDMuix1',
    url: 'shruHjY6gGmXxdags',
    hnField: 'Creator',
  },
  {
    name: 'Conditions data tracking',
    url_sandbox: 'shrdv0jeIi7yXZGuK',
    url: 'shrFefBCXsPCUxo2o',
  },
  {
    name: 'Clinical consultation',
    url_sandbox: 'shr9lYct5PR7hcVyA',
    url: 'shrPWg4S3LYxHbgmv',
  },
  {
    name: 'VC prescription request',
    url_sandbox: 'shrjRIzQkMCrbVX7z',
    url: 'shrY7UhjHNpZxNfNK',
    hnField: 'Creator',
  },
  {
    name: 'MHC intake form',
    url_sandbox: '',
    url: 'shrhYNq5OIeTDCUYy',
  },
]

const sorted = FORMS.sort((a, b) => {
  if (a.name > b.name) {
    return 1
  }
  if (b.name > a.name) {
    return -1
  }
  return 0
})
export default sorted
