import dayjs from 'dayjs'

export default [
  {
    name: 'Health Check',
    formId: 'shrPou8GMbw9pKWpZ',
    id: 'tblyEGCkIMjscYtYj',
    fields: [
      {
        id: 'fldlQCZgIW3papD5A',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flder1YqEh0xdxCVw',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldFP04mEjxKsfnaB',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldXVLawvzAvKm1sn',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
        hide: true,
      },
      {
        id: 'fldh57vjw4JxvEtUO',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldKm2zQHGYTjKzpd',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldXp3Xds1Ehx3kMX',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldjPS2N9vEyNJ5Go',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper:
          'Please select and link this baseline to the right appointment so that we can automatically change the status of the appointment after you finalize your baseline consultation',
      },
      {
        id: 'fldCFaxkFZPlvTWIA',
        name: 'Date of baseline',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        hide: true,
      },
      {
        id: 'fldfkc7yGNsuMsstd',
        name: 'Gender',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        hide: true,
      },
      {
        id: 'fldODCwcf4vBUqtnP',
        name: 'Is the BN a minor',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        hide: true,
      },
      {
        id: 'fldcs1Wm67by9xJjl',
        name: 'Interaction type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldPpZOvc3sID7fD3',
        name: 'Current Health Issues',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'I just wanted to ask about whether you are having any health issue, right now, that is affecting or concerning you.',
      },
      {
        id: 'fldQLkaDm3DmzIDIj',
        name: 'Current Health Issues description?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'In case of a complaint that may need visual confirmation, please ask the member what phone they are using and if they can take a photo or even have a WhatsApp video call\n\nThe key here is to determining the following:\nIs the condition acute?\nIs the condition chronic?\nIs the condition a Priority (meaning, does the Member consider the condition to be important)?',
        conditionType: '',
        parentKey: 'Current Health Issues',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Current Health Issues'])) {
            return ['Yes'].some((r) =>
              values['Current Health Issues'].includes(r)
            )
          }
          return ['Yes'].includes(values['Current Health Issues'])
        },
      },
      {
        id: 'fldVTzBcoWVkmSG3H',
        name: 'Past Medical/Surgical History',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Ask member of any significant illnesses they have had in the past, the management and if it has resolved or not',
      },
      {
        id: 'fldYrUPF5yGAwvNA1',
        name: 'Describe any medical/surgical history',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Past Medical/Surgical History',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Past Medical/Surgical History'])) {
            return ['Yes'].some((r) =>
              values['Past Medical/Surgical History'].includes(r)
            )
          }
          return ['Yes'].includes(values['Past Medical/Surgical History'])
        },
      },
      {
        id: 'fldADJtt1OqdkaRJQ',
        name: 'Vaccination Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Could you please upload, [child\'s name] KEPI vaccination card?\nIf you don\'t have it handy, do you know whether the vaccines are up to date?"\n\nVaccination Schedule: Click here to see the KEPI vaccination schedule (<a href="http://www.vacfa.uct.ac.za/sites/default/files/image_tool/images/210/Immunization_Schedules/Kenya.pdf" target="_blank">http://www.vacfa.uct.ac.za/sites/default/files/image_tool/images/210/Immunization_Schedules/Kenya.pdf</a>',
        conditionType: '',
        parentKey: 'Is the BN a minor',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Is the BN a minor'])) {
            return ['Yes'].some((r) => values['Is the BN a minor'].includes(r))
          }
          return ['Yes'].includes(values['Is the BN a minor'])
        },
      },
      {
        id: 'fldv5nDUYZgSKPvuC',
        name: 'Copy of Vaccination Card',
        type: 'multipleAttachment',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '!',
        parentKey: 'Vaccination Status',
        parentValues: ['Unknown'],
        condition: (values: any) => {
          if (Array.isArray(values['Vaccination Status'])) {
            return ['Unknown'].some(
              (r) => !values['Vaccination Status'].includes(r)
            )
          }
          return !['Unknown'].includes(values['Vaccination Status'])
        },
      },
      {
        id: 'fldAcpXqcaCHnMpf6',
        name: 'Developmental History',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"We are just going to ask a few questions about, [child\'s name] development to check on his/her developmental progress"\n\n[Click on the link below to open the CDC developmental milestones table.\nIf any abnormality is identified, DO NOT, say anything to the parent just yet. Continue the baseline and then make sure that a consultation with a VC is made.]\n\n[Click here to see a table of normal pediatric development: <a href="https://www.cdc.gov/ncbddd/actearly/pdf/checklists/Checklists-with-Tips_Reader_508.pdf" target="_blank">https://www.cdc.gov/ncbddd/actearly/pdf/checklists/Checklists-with-Tips_Reader_508.pdf</a>\n',
        conditionType: '',
        parentKey: 'Is the BN a minor',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Is the BN a minor'])) {
            return ['Yes'].some((r) => values['Is the BN a minor'].includes(r))
          }
          return ['Yes'].includes(values['Is the BN a minor'])
        },
      },
      {
        id: 'fldoIWbgLORP9cnxD',
        name: 'Describe Developmental Delay',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"If, [child\'s name] has not begun to do, [delayed activity], could you describe what he/she is doing."',
        conditionType: '',
        parentKey: 'Developmental History',
        parentValues: ['Developmentally Delayed'],
        condition: (values: any) => {
          if (Array.isArray(values['Developmental History'])) {
            return ['Developmentally Delayed'].some((r) =>
              values['Developmental History'].includes(r)
            )
          }
          return ['Developmentally Delayed'].includes(
            values['Developmental History']
          )
        },
      },
      {
        id: 'fldllmfi4jCzXv5Ip',
        name: 'Educational Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '"Is, [child\'s name] in school? ',
        conditionType: '',
        parentKey: 'Is the BN a minor',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Is the BN a minor'])) {
            return ['Yes'].some((r) => values['Is the BN a minor'].includes(r))
          }
          return ['Yes'].includes(values['Is the BN a minor'])
        },
      },
      {
        id: 'fldMRN89BronZrqbe',
        name: 'Grade',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '"What grade is, [child\'s name] in?"',
        conditionType: '',
        parentKey: 'Educational Status',
        parentValues: ['In school'],
        condition: (values: any) => {
          if (Array.isArray(values['Educational Status'])) {
            return ['In school'].some((r) =>
              values['Educational Status'].includes(r)
            )
          }
          return ['In school'].includes(values['Educational Status'])
        },
      },
      {
        id: 'fldL9jxSd3Rp08ltQ',
        name: 'Reason out of school',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '"Why is, [child\'s name] not in school at this time?"',
        conditionType: '',
        parentKey: 'Educational Status',
        parentValues: ['Out of school'],
        condition: (values: any) => {
          if (Array.isArray(values['Educational Status'])) {
            return ['Out of school'].some((r) =>
              values['Educational Status'].includes(r)
            )
          }
          return ['Out of school'].includes(values['Educational Status'])
        },
      },
      {
        id: 'fld3GQgj3l991L0sp',
        name: 'ROS - review of system',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Are you currently having any complaints or issues that are new or old in the following parts of your body"\n\n[Please use the following as simple descriptions:]\nNEUROLOGIC: any issues related to taste, sight, smell, touch or hearing. Any Seizures or issues with your brain\nHEENT: any issues realted to your Head, Eyes, Ears, Nose or Throat\nCARDIOVASCULAR: any issues related to your heart or blood pressure, veins or arteries\n\nPULMONARY: any issues related to your lungs or breathing\nGASTROINTESTINAL: any vomiting or diarrhea, constipation irritable bowels or other issue passing stool\nGENITOURINARY: any issues with your genitalia/private parts; any difficulty urinating or problem with sexual performance\nEXTREMITIES: any tingling in your fingers or toes, any pain or swelling in your arms or legs, difficulty with your hands or feet\nDERMATOLOGIC: any rashes, lumps, bumps, skin color changes or skin problems\n\nMENTAL HEALTH: are you having any mental health issues\nHEMATOLOGIC: have you ever been told you are anemic\n\nREPRODUCTIVE: \nMen: any issues with erectile dysfunction, fertility or testicular issues\nFemale: any menstruation related, fertility related or ovarian issues\nENDOCRINE: have you ever been told you have an issue with your hormones\nNEOPLASTIC: are you currently receiving care for cancer\nIMMUNOLOGIC: have you ever been told you have a weakened immune system',
      },
      {
        id: 'fldgBi8GSdb3MvKvG',
        name: 'Is this a serious condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"For example: brain aneurysm, or brain tumor, or not cured of encephalitis or meningitis, or epilepsy/seizure in last 5 years, or multiple sclerosis, or neuropathy, or Parkinson\'s, or stroke, or diagnosed w/fainting and >41, or Transient Ischemic Attack, or subdural hematoma, or traumatic brain injury."',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Neurologic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Neurologic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Neurologic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldIJUtqaLdQGW8Ta',
        name: 'Date of last seizure',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Do you remember the date of the LAST seizure [member\'s name] had?"\n\n[If BN has a seizure disorder, please enter the date of LAST seizure]',
        conditionType: '',
        parentKey: 'Is this a serious condition',
        parentValues: [
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Is this a serious condition'])) {
            return [
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
            ].some((r) => values['Is this a serious condition'].includes(r))
          }
          return [
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
          ].includes(values['Is this a serious condition'])
        },
      },
      {
        id: 'fldFbXKZQWLEdeoHn',
        name: 'ROS: Please describe the NEUROLOGIC findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Neurologic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Neurologic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Neurologic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldlWKSZlUo2Sm2vU',
        name: 'Is this a serious HEENT condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['HEENT'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['HEENT'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['HEENT'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldyYCujEYZfBh9ZC',
        name: 'ROS: Please describe the HEENT findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['HEENT'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['HEENT'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['HEENT'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fld5EGfbkjFO9fhxB',
        name: 'Is this a serious CARDIOVASCULAR condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'For example: heart attack, or atrial fibrilation/flutter, or abnormal heartbeat caused fainting, or taking >2 heart meds, or been advised to test heart periodically with echocardiogram, or advised to have surgery for heart murmur, or doctor said more than 1 episode of pericarditis, or seen doctor in last 6 months for pericarditis, or other.',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Cardiovascular '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Cardiovascular '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Cardiovascular '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldDlB3KKXfuoKh3s',
        name: 'How many heart medications is the patient taking?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'please add the medication using a form in the guided workflow.',
        conditionType: '',
        parentKey: 'Is this a serious CARDIOVASCULAR condition',
        parentValues: [
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
        ],
        condition: (values: any) => {
          if (
            Array.isArray(values['Is this a serious CARDIOVASCULAR condition'])
          ) {
            return [
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
            ].some((r) =>
              values['Is this a serious CARDIOVASCULAR condition'].includes(r)
            )
          }
          return [
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
          ].includes(values['Is this a serious CARDIOVASCULAR condition'])
        },
      },
      {
        id: 'fld71JnItn0CF4WfM',
        name: 'ROS: Please describe the CARDIOVASCULAR findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Cardiovascular '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Cardiovascular '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Cardiovascular '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldLNRNu78WHSejXG',
        name: 'Is this a serious PULMONARY condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'For example: Sarcoidosis, or COPD, or admitted to hospital /emergency room for asthma in last year, or if >41 and >3 oral steroids in last 12 months, or pulmonary nodule or lung spot, or using CPAP machine, or not sure on resolved bronchitis/pneumonia/tuberculosis, or had other.',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Pulmonary '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Pulmonary '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Pulmonary '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldfHOUkWMNPfNLat',
        name: 'If admitted for pulmonary reasons in the last year, what was the date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Is this a serious PULMONARY condition',
        parentValues: [
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Is this a serious PULMONARY condition'])) {
            return [
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
            ].some((r) =>
              values['Is this a serious PULMONARY condition'].includes(r)
            )
          }
          return [
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
          ].includes(values['Is this a serious PULMONARY condition'])
        },
      },
      {
        id: 'fldFkxpU75V1qP6Tg',
        name: 'ROS: Please describe the PULMONARY findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Pulmonary '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Pulmonary '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Pulmonary '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldcaFURrLDr2cNf8',
        name: 'Is this a serious GASTROINTESTINAL condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          "For example: anorectal fistula, or celiac, or colon polyp, or Crohn's disease, or ulcerative colitis, or advised to get liver biopsy, or hepatitis B/C/D, or pancreatitis, or pancreatic abscess, or not sure ulcer resolved, or Barrett's or dysphagia, or weight loss surgery or other\n",
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Gastrointestinal'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Gastrointestinal'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Gastrointestinal'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldTvvPftgwZYuRrB',
        name: 'Date of diverticulitis flare or ulcer treatment',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '[If the BN has diverticulitis or ulcers, please enter the date of last flare or treatment respectively]',
        conditionType: '',
        parentKey: 'Is this a serious GASTROINTESTINAL condition',
        parentValues: [
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
        ],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Is this a serious GASTROINTESTINAL condition']
            )
          ) {
            return [
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
            ].some((r) =>
              values['Is this a serious GASTROINTESTINAL condition'].includes(r)
            )
          }
          return [
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
          ].includes(values['Is this a serious GASTROINTESTINAL condition'])
        },
      },
      {
        id: 'fldvsVRdw8HNOWMmT',
        name: 'ROS: Please describe the GASTROINTESTINAL findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Gastrointestinal'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Gastrointestinal'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Gastrointestinal'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldNBY34cZovTDy6z',
        name: 'Is this a serious GENITOURINARY condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'For example: Glomerulonephritis or nephropathy, or kidney obstruction/infection due to stones, or surgery for stones, or remaining stones, or kidney failure, or dialysis, or urological abnormalities, or Proteinuria, or multiple renal cysts, or other/not sure.',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Genitourinary '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Genitourinary '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Genitourinary '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fld7OxSIgVuBmZGkR',
        name: 'ROS: Please describe the GU findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Genitourinary '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Genitourinary '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Genitourinary '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldk9bt9H9kB26Kb1',
        name: 'Is this a serious REPRODUCTIVE condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'In Men for Example: testicular torsion, infertility, erectile dysfunction, varicocoele\nIn Women For Example: inability to conceive, history of fibroids, ovarian cysts, endometriosis, hysterectomy, ectopic pregnancy or any other issue you may want to share',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Reproductive'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Reproductive'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Reproductive'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fld7Pf8C1WwEkkb0r',
        name: 'ROS: Please describe the REPRODUCTIVE findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Reproductive'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Reproductive'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Reproductive'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldFkTdMQMzcnutZd',
        name: 'Please describe the EXTREMITIES findings ',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Extremities '],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Extremities '].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Extremities '].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldiOPuUnad9KerR7',
        name: 'ROS: Please describe the DERMATOLOGIC findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Dermatologic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Dermatologic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Dermatologic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fld1YqXCbxFmTpIrL',
        name: 'Is this a serious MUSCULOSKELETAL condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'For example: is the member taking arthritis medication, or surgery for scoliosis, or other. ',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Musculoskeletal'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Musculoskeletal'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Musculoskeletal'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldxYwjRtwhVy4LCY',
        name: 'ROS: Please describe the MUSCULOSKELETAL findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Musculoskeletal'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Musculoskeletal'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Musculoskeletal'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fld4Cenhq4YTtDjwi',
        name: 'Is this a serious HEMATOLOGIC condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'For example: \nHemolytic or other anemia, iron deficiency, chronic bleeding, problems with blood clotting, easy or excessive bleeding, coagulation defects(hemophilia), \nenlarged spleen (hypersplenism), low platelet count (thrombocytopenia) or ITP (idiopathic thrombocytopenic purpura)',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Hematologic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Hematologic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Hematologic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldfHThjo0WwB9ZDg',
        name: 'ROS: Please describe the HEMATOLOGY findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Hematologic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Hematologic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Hematologic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldJURcazKVu5asql',
        name: 'Is this a serious MENTAL HEALTH condition?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Does the member have any history of:\nHOSPITALIZATION for Depression, anxiety, psychosis, suicide thoughts or attempts, anorexia or bulimia, post traumatic stress disorder, obsessive compulsive disorder, bipolar disorder, attention deficit hyperactivity disorder (ADHD) or other emotional disorder; or depression not diagnosed as situational only, or memory impairment, or delusion, or eating disorder, or suicide attempt',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Mental Health'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Mental Health'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Mental Health'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldxags43PC2sNs20',
        name: 'ROS: Please describe the MENTAL HEALTH findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'At Antara we provide counseling services for our members, are you interested in doing a consultation with our counselor? if the answer is yes, please check with member if you can go ahead and book the consultation or if the member wants to do it at their convenience (in that case, create a member task for them to do it in the app)',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Mental Health'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Mental Health'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Mental Health'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldtM8ktVrAm5t7Qx',
        name: 'Is this a serious ENDOCRINE condition?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'For example: they had or plan to have surgery or a biopsy of the cyst or nodule; or been advised by a member of the medical profession to have scans or imaging procedures of the thyroid that have not yet been completed; or being treated for your hypothyroidism (underactive thyroid) or hyperthyroidism (overactive thyroid); or other.\n',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Endocrine'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Endocrine'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Endocrine'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldA0C5aqVgBirJ1v',
        name: 'ROS: Please describe the ENDOCRINE findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Endocrine'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Endocrine'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Endocrine'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldoEzJ6WPD3p5pTJ',
        name: 'Is this a serious NEOPLASTIC condition?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Does the patient have any cancers, such as malignant tumor, skin cancer, leukemia, or melanoma?',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Neoplastic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Neoplastic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Neoplastic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldZfv2CNlwkYtKf0',
        name: 'ROS: Please describe the NEOPLASTIC findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Is this a serious NEOPLASTIC condition?',
        parentValues: [
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
          'Yes',
        ],
        condition: (values: any) => {
          if (
            Array.isArray(values['Is this a serious NEOPLASTIC condition?'])
          ) {
            return [
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
              'Yes',
            ].some((r) =>
              values['Is this a serious NEOPLASTIC condition?'].includes(r)
            )
          }
          return [
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
            'Yes',
          ].includes(values['Is this a serious NEOPLASTIC condition?'])
        },
      },
      {
        id: 'fldrIQ3I7Z50JOQ58',
        name: 'Please describe the IMMUNOLOGIC findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'ROS - review of system',
        parentValues: ['Immunologic'],
        condition: (values: any) => {
          if (Array.isArray(values['ROS - review of system'])) {
            return ['Immunologic'].some((r) =>
              values['ROS - review of system'].includes(r)
            )
          }
          return ['Immunologic'].includes(values['ROS - review of system'])
        },
      },
      {
        id: 'fldfjIB4UfHc4CNvK',
        name: 'Please upload any relevant images or files here',
        type: 'multipleAttachment',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld7290ZkNXm1bHvT',
        name: 'Physical Exam Findings',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Interaction type',
        parentValues: ['In-person'],
        condition: (values: any) => {
          if (Array.isArray(values['Interaction type'])) {
            return ['In-person'].some((r) =>
              values['Interaction type'].includes(r)
            )
          }
          return ['In-person'].includes(values['Interaction type'])
        },
      },
      {
        id: 'fldQdzthHvd8IcxIb',
        name: 'PE: Please select the system(s) with a relevant finding',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '[If this is a virtual Baseline, please note any self-reported physical exam findings or any observed findings using video or photographic tools]',
        conditionType: '',
        parentKey: 'Physical Exam Findings',
        parentValues: ['Relevant Exam findings'],
        condition: (values: any) => {
          if (Array.isArray(values['Physical Exam Findings'])) {
            return ['Relevant Exam findings'].some((r) =>
              values['Physical Exam Findings'].includes(r)
            )
          }
          return ['Relevant Exam findings'].includes(
            values['Physical Exam Findings']
          )
        },
      },
      {
        id: 'fldxukfP4SE5ONGtG',
        name: 'PE: Please describe the NEUROLOGIC findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Neurologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Neurologic'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Neurologic'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldcgG0VxjmWvcbhN',
        name: 'PE: Please describe the NECK findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Neck'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Neck'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Neck'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldjxkzeqFuK6LMH4',
        name: 'PE: Please describe the CARDIOVASCULAR findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Cardiovascular'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Cardiovascular'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Cardiovascular'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldbzwbFqyTnw3st6',
        name: 'PE: Please describe the PULMONARY findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Pulmonary'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Pulmonary'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Pulmonary'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldXL2buduAyrXz17',
        name: 'PE: Please describe the ABDOMINAL findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Abdominal'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Abdominal'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Abdominal'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldIsTm0pfwhV90l4',
        name: 'PE: Please describe the GU findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['GU'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['GU'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['GU'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldvq3tIbwO14b9iC',
        name: 'PE: Please describe the EXTREMITIES findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Extremities'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Extremities'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Extremities'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldzyTRLsWxM8uCnv',
        name: 'PE: Please describe the DERMATOLOGIC findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Dermatologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Dermatologic'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Dermatologic'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldsy3UyQzzs58Zf2',
        name: 'PE: Please describe the OTHER finding',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'PE: Please select the system(s) with a relevant finding',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['PE: Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Other'].some((r) =>
              values[
                'PE: Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Other'].includes(
            values['PE: Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldm00eF3024fNsZS',
        name: 'Activity?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Ask if the member is doing any activity. If Yes:describe it in the next field, if no: "That\\\'s okay, let\\\'s find something you will enjoy and start doing it."',
      },
      {
        id: 'fldTc7EwOHKhSNTP0',
        name: 'Activity Description',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"What kind of Physical Activity do you like to do? Do you like to walk, run, cycle, swim, go to the gym, play football, rugby or any other activity?"\n\nIf YES:\n"How often do you do [activity from above] and typically, how long do you do it for in any given session?',
        conditionType: '',
        parentKey: 'Activity?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Activity?'])) {
            return ['Yes'].some((r) => values['Activity?'].includes(r))
          }
          return ['Yes'].includes(values['Activity?'])
        },
      },
      {
        id: 'fldRozIE8zsPzozuK',
        name: 'Social History',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"How much a person smokes, drinks or uses recreational drugs can have an important impact on health. That is why we ask. There is no judgement, only concern for your well-being"',
        conditionType: '',
        parentKey: 'Is the BN a minor',
        parentValues: ['No'],
        condition: (values: any) => {
          if (Array.isArray(values['Is the BN a minor'])) {
            return ['No'].some((r) => values['Is the BN a minor'].includes(r))
          }
          return ['No'].includes(values['Is the BN a minor'])
        },
      },
      {
        id: 'fldUDLKuoyJzNELNM',
        name: 'Tobacco',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'How many cigarettes do you smoke per day?',
        conditionType: '',
        parentKey: 'Social History',
        parentValues: ['Tobacco'],
        condition: (values: any) => {
          if (Array.isArray(values['Social History'])) {
            return ['Tobacco'].some((r) => values['Social History'].includes(r))
          }
          return ['Tobacco'].includes(values['Social History'])
        },
      },
      {
        id: 'fld1qv5wFWJoAM1nu',
        name: 'Last smoking date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'When did you smoke your last cigarette (if you have quit)?',
        conditionType: '',
        parentKey: 'Social History',
        parentValues: ['Tobacco'],
        condition: (values: any) => {
          if (Array.isArray(values['Social History'])) {
            return ['Tobacco'].some((r) => values['Social History'].includes(r))
          }
          return ['Tobacco'].includes(values['Social History'])
        },
      },
      {
        id: 'fldUYKFRJfYPWxsR5',
        name: 'Alcohol',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'How many drinks do you have per week?',
        conditionType: '',
        parentKey: 'Social History',
        parentValues: ['Alcohol'],
        condition: (values: any) => {
          if (Array.isArray(values['Social History'])) {
            return ['Alcohol'].some((r) => values['Social History'].includes(r))
          }
          return ['Alcohol'].includes(values['Social History'])
        },
      },
      {
        id: 'fldn9k5Z9zQUupwoG',
        name: 'Recreational Drugs',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Tell us about the type of drugs that you use and how often you use them."',
        conditionType: '',
        parentKey: 'Social History',
        parentValues: ['Recreational drugs'],
        condition: (values: any) => {
          if (Array.isArray(values['Social History'])) {
            return ['Recreational drugs'].some((r) =>
              values['Social History'].includes(r)
            )
          }
          return ['Recreational drugs'].includes(values['Social History'])
        },
      },
      {
        id: 'fldYqSg6LyiDiQjAr',
        name: 'On average how many hours of uninterrupted sleep do you get every night?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please fill in the numbers of hours of sleep between 0 to 10. Quality of sleep is uninterrupted 7 - 9 hours of sleep where one wakes up feeling refreshed and rejuvenated (recommended 8 hours) if anyone is sleeping less than 5 hours of sleep, it is important to refer for MH Counseling',
      },
      {
        id: 'fld1sqQhQ4FaTO32o',
        name: 'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'NOTE: A " yes " response to use of alcohol or substance  is a red flag that requires referral for MHC. \n',
      },
      {
        id: 'fldPRNSWPMlZv8k4A',
        name: 'Medication',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'please enter the names of medications and the frequency',
        conditionType: '',
        parentKey:
          'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?',
        parentValues: ['Medication'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ]
            )
          ) {
            return ['Medication'].some((r) =>
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ].includes(r)
            )
          }
          return ['Medication'].includes(
            values[
              'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
            ]
          )
        },
      },
      {
        id: 'fldI63VddYCadkiEb',
        name: 'How many drinks do you have per week?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'please enter quantity of alcohol per day',
        conditionType: '',
        parentKey:
          'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?',
        parentValues: ['Alcohol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ]
            )
          ) {
            return ['Alcohol'].some((r) =>
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ].includes(r)
            )
          }
          return ['Alcohol'].includes(
            values[
              'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
            ]
          )
        },
      },
      {
        id: 'fldmB3NJ5QSuT5kdD',
        name: 'How many cigarettes do you smoke per day?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'please enter number of stick per day',
        conditionType: '',
        parentKey:
          'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?',
        parentValues: ['Smoke'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ]
            )
          ) {
            return ['Smoke'].some((r) =>
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ].includes(r)
            )
          }
          return ['Smoke'].includes(
            values[
              'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
            ]
          )
        },
      },
      {
        id: 'fldNo7olDusR7yu5k',
        name: 'Substances',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'please enter the substances that the member is taking like drugs or other and the frequency',
        conditionType: '',
        parentKey:
          'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?',
        parentValues: ['Other substance'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ]
            )
          ) {
            return ['Other substance'].some((r) =>
              values[
                'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
              ].includes(r)
            )
          }
          return ['Other substance'].includes(
            values[
              'Do you take any medication, alcohol, smoke or any other substance in order for you to sleep?'
            ]
          )
        },
      },
      {
        id: 'fldMwmPNsW6aq1mmB',
        name: 'Does the Member have a condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Do you currently have, or have you ever been told you have, a chronic condition? That is any condition that has been present for more than 3 months. Examples of chronic conditions are: high blood pressure, diabetes, arthritis, asthma or high cholesterol. Also add any other chronic conditions like anemia, gout etc and acute condition or issue that member has had or is suffering from at that moment. NOTE: If you identify condition(s) please add the condition using a form in the guided workflow',
      },
      {
        id: 'fldISgDp8nGwq7BR1',
        name: 'Is the Member @ risk of a condition?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Risk factors include a family history, prior abnormal readings, smoking, eating habits etc.\n\nIf the response is yes, please add the condition using a form in the guided workflow.',
      },
      {
        id: 'fldWh4JG8vCTeqWVd',
        name: 'Mental Health Phase',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Or a Minor Chronic Condition / Acute Condition?',
        parentValues: ['Mental Health'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Or a Minor Chronic Condition / Acute Condition?']
            )
          ) {
            return ['Mental Health'].some((r) =>
              values[
                'Or a Minor Chronic Condition / Acute Condition?'
              ].includes(r)
            )
          }
          return ['Mental Health'].includes(
            values['Or a Minor Chronic Condition / Acute Condition?']
          )
        },
      },
      {
        id: 'fldh6l04sg3mNl1Zf',
        name: 'Next steps',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please select the next steps to be taken after this baseline',
      },
      {
        id: 'fldyhH53h0a3Ncxuy',
        name: 'Next Steps (Others)',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Next steps',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (Array.isArray(values['Next steps'])) {
            return ['Others'].some((r) => values['Next steps'].includes(r))
          }
          return ['Others'].includes(values['Next steps'])
        },
      },
      {
        id: 'fldCid3k9MRImOQta',
        name: 'Please jot down any notes you would like to keep in the record',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'HIF',
    formId: 'shrQlDyAynyeYDxT0',
    id: 'tblL7bahmNjC58rEc',
    helper:
      'Please use this to complete Beneficiary information for those Beneficiaries that were not able to complete their HIFs before the Baseline',
    fields: [
      {
        id: 'fldfyYfFvyuAjmIL0',
        name: 'Your Age',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldCFn05pBRhY3Y31',
        name: 'Date/Time',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldkA2wgirGsnDdnk',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flduCCDJmxGuVlLPi',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldSRzJzWesS79XLz',
        name: 'Do you have any of the following conditions?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          "If it's a minor and they have any of the following chronic conditions that has lasted for more than 3 months, book a health check",
      },
      {
        id: 'fldBEd9lJpUX6DMPe',
        name: 'Other current conditions',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Others'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Others'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldPOvao9CY441YLD',
        name: 'Have you had any of the following conditions?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldWrVIfOGjQcnhQa',
        name: 'Other past conditions',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Have you had any of the following conditions?',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Have you had any of the following conditions?']
            )
          ) {
            return ['Others'].some((r) =>
              values['Have you had any of the following conditions?'].includes(
                r
              )
            )
          }
          return ['Others'].includes(
            values['Have you had any of the following conditions?']
          )
        },
      },
      {
        id: 'fldy8BqzycP3QQ0h1',
        name: 'Have you ever been told you are at risk for any of the following conditions?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldcXGe3jntfydkRE',
        name: 'Do your parents, siblings or grandparents, have any of the following conditions',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'If member has already given this information during screening or PSPB or HIF phase, please see it in the hif filled form',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fld1wArLXpqRrJpMr',
        name: 'Is there any other family health history you think we should know about?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey:
          'Do your parents, siblings or grandparents, have any of the following conditions',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Do your parents, siblings or grandparents, have any of the following conditions'
              ]
            )
          ) {
            return ['Others'].some((r) =>
              values[
                'Do your parents, siblings or grandparents, have any of the following conditions'
              ].includes(r)
            )
          }
          return ['Others'].includes(
            values[
              'Do your parents, siblings or grandparents, have any of the following conditions'
            ]
          )
        },
      },
      {
        id: 'fldwJJH8FplI4qlLE',
        name: 'HIF Completed',
        type: 'checkbox-hidden',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld58mBbotwbl70uz',
        name: 'Are you currently taking any medications?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld2iYtTiNHWUcvUt',
        name: 'What medications are you taking?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Are you currently taking any medications?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Are you currently taking any medications?'])
          ) {
            return ['Yes'].some((r) =>
              values['Are you currently taking any medications?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Are you currently taking any medications?']
          )
        },
      },
      {
        id: 'fld2xO9bXCIWZ4umk',
        name: 'Are you currently concerned about any aspect of your health?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldvDBSGXfljixmBS',
        name: 'What aspect of your health are you concerned about?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Are you currently concerned about any aspect of your health?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Are you currently concerned about any aspect of your health?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Are you currently concerned about any aspect of your health?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Are you currently concerned about any aspect of your health?'
            ]
          )
        },
      },
      {
        id: 'fldOrDHca3HZ1Jgs9',
        name: 'What is your Blood Type?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldGqwP9q6K5f4Erd',
        name: 'Do you have any medication allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldiFnIzYvWkcrOSO',
        name: 'Which medications are you allergic to?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any medication allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Do you have any medication allergies?'])) {
            return ['Yes'].some((r) =>
              values['Do you have any medication allergies?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Do you have any medication allergies?']
          )
        },
      },
      {
        id: 'fldO4YubmZ2JwGsv3',
        name: 'Do you have any food allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldjPCITvynDbf5A3',
        name: 'Which food are you allergic to?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any food allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Do you have any food allergies?'])) {
            return ['Yes'].some((r) =>
              values['Do you have any food allergies?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Do you have any food allergies?'])
        },
      },
      {
        id: 'fldp7mFI4blXJlUvf',
        name: 'On a scale of 0-5, how Important is your health to you at this time?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Insert a number from 0 to 5',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
    ],
  },
  {
    name: 'Conditions',
    id: 'tblYSNrfZJnzdSwmx',
    formId: 'shreJWFrTNVXs6RKW',
    fields: [
      {
        id: 'fld3OPeFGLFkNGL9c',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldyFh8acJXVq8PEi',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldl5wapEqikLZkdR',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldGYz0R80jFfpeqB',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fld9AVIdnQw496G46',
        name: 'Conditions master list',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldZJUrSBCt3qggt6',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblR6LlerAkXAmVnc',
        required: true,
        helper: '',
      },
      {
        id: 'fld0GTYwhld18Rv5T',
        name: 'Starting Underweight stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '      * Stage 1: BMI 17.0 - 18.4\n      * Stage 2: BMI 16.0 - 16.9\n      * Stage 3: BMI < 16.0',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recpKWliH8DpATqAW'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recpKWliH8DpATqAW'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recpKWliH8DpATqAW'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'flddAWmwGgrUz1x48',
        name: 'Underweight Key Goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '      * If Stage 1: 3% BMI increase\n      * If Stage 2: 5% BMI increase\n      * If Stage 3: 7% BMI increase',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recpKWliH8DpATqAW'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recpKWliH8DpATqAW'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recpKWliH8DpATqAW'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldC507d7BMWauGE2',
        name: 'ICD10 code',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please look for ICD10 codes here: <a href="https://icd.who.int/browse/2024-01/mms/en#1656445230" target="_blank">https://icd.who.int/browse/2024-01/mms/en#1656445230</a>\nand enter it in the field. Examples: I10 or E10 or E11',
      },
      {
        id: 'fldOxXWdy7eBWoaon',
        name: 'Asthma Starting Score',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"I am just going to walk you through a simple questionnaire that we use to give you/your child and Asthma Score. This score is used to measure asthma control. \n\nOur goal is to get your score to be above 20. \nNo matter what it is now, we will get there!"\n\n\nPlease use this link to score the asthma condition and enter the result: <a href="https://www.asthmacontroltest.com/en-gb/welcome/" target="_blank">https://www.asthmacontroltest.com/en-gb/welcome/</a>\n\nPlease use the language in the Score Flow to guide the questions you ask. \n\nREMEMBER: If a child’s score is 12 or less, his or her asthma is likely to be very poorly controlled.',
        conditionType: '',
        parentKey: 'Conditions mster list',
        parentValues: ['recsYfjhmamvUbgM7'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recsYfjhmamvUbgM7'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recsYfjhmamvUbgM7'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldJRaCLCihb9YtLC',
        name: 'Asthma triggers',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Do you know what triggers [member\'s name]\'s Asthma. Common triggers are: cold, exercise, smoke, pollen, pollution and dust. Do any of those consistently trigger an attack?"',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recsYfjhmamvUbgM7'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recsYfjhmamvUbgM7'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recsYfjhmamvUbgM7'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldrEDudtyieyKqep',
        name: 'Other asthma triggers',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Some people have attacks triggered by unusual things so if there is anything you know triggers an attack, let me know what it is."',
        conditionType: '',
        parentKey: 'Asthma triggers',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Asthma triggers'])) {
            return ['Other'].some((r) => values['Asthma triggers'].includes(r))
          }
          return ['Other'].includes(values['Asthma triggers'])
        },
      },
      {
        id: 'flddPJrcQlDAVXiQp',
        name: 'Osteoarthritis Starting Score',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          ' "One of the worst things about Osteoarthritis is the pain it brings and its effects on someone’s activities of daily living”.\nPlease obtain the member’s overall joint score using this calculator:\n    * If HIP use this: <a href="https://www.orthopaedicscore.com/scorepages/hip_disability_osteoarthritis_outcome_score_hoos.html" target="_blank">https://www.orthopaedicscore.com/scorepages/hip_disability_osteoarthritis_outcome_score_hoos.html</a> \n  * If Knee use this: <a href="https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Knee-pain-calculator_sukw7#_luEz0" target="_blank">https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Knee-pain-calculator_sukw7#_luEz0</a> \n  * If Shoulder, Arm, Hand use this: <a href="https://www.orthopaedicscore.com/scorepages/disabilities_of_arm_shoulder_hand_score_dash.html" target="_blank">https://www.orthopaedicscore.com/scorepages/disabilities_of_arm_shoulder_hand_score_dash.html</a> \n  * If Spine use this: <a href="https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR#_luYs-" target="_blank">https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR#_luYs-</a> \nOnce you have scored it, please enter the result. Examples: 65 or 56 or 89',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: [
          'recZETSYK81fAKYEy',
          'recCvj1vrZI7QJTJT',
          'rec976C51ukYbVEZP',
          'recatck1FWNN5RmWe',
          'recZ36sY8T3Yungmo',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return [
              'recZETSYK81fAKYEy',
              'recCvj1vrZI7QJTJT',
              'rec976C51ukYbVEZP',
              'recatck1FWNN5RmWe',
              'recZ36sY8T3Yungmo',
            ].some((r) => values['Conditions master list'].includes(r))
          }
          return [
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
          ].includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldDPULFHtAeONC7K',
        name: 'Other, specify',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Where applicable',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recfNbsZGueaHQUto'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recfNbsZGueaHQUto'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recfNbsZGueaHQUto'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldXjCjXPqTjYeg0K',
        name: 'Starting hypertension stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nAt risk: Sys <120 and Dia <80\nElevated BP: Sys is 120-130 and Dia <80\nStage 1 Hypertension: Sys is 130-140 or Dia is 80-89\nStage 2 Hypertension: Sys >140 or Dia >=90',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recfOQjJ8Yo2oiVD6'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recfOQjJ8Yo2oiVD6'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recfOQjJ8Yo2oiVD6'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldcuGv2Odr8AJrPp',
        name: 'Starting Hyperlipidemia stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'At risk if members with previous hx or family hx\n Hypercholesterolemia if TC>200mg/dl\n Hypertriglyceridemia if TG >150mg/dl only done in a fasting state\n Mixed hyperlipidemia if defined as elevated LDL >130mg/dl, TC>200mg/dl and TG>150mg/dl',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recLdUqB94LuWsfpj'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recLdUqB94LuWsfpj'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recLdUqB94LuWsfpj'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldmMSWQbkA6gIRMK',
        name: 'Starting GERD stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recLpbGIM06FnDBN4'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recLpbGIM06FnDBN4'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recLpbGIM06FnDBN4'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldfFO1HSVa5Kiq2i',
        name: 'Starting stage - other conditions',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: [],
        condition: (values: any) => {
          const excludedValues = [
            'recfOQjJ8Yo2oiVD6',
            'recLdUqB94LuWsfpj',
            'recLpbGIM06FnDBN4',
            'receXizGwFWI5igxn',
            'recR916dEtATKYuvw',
            'recQPGTOSPnwjyPPA',
            'rec1yyeyxkQxZtIsD',
            'recpLfyAirbx5OlFS',
            'recVlgx6cf6Fw3gzn',
            'recauBAdwn9QuqRRs',
            'recjHCg4fZrqtuim3',
            'rec9GJtCUjz54voue',
            'recFEGuc9JL0Tajlb',
            'rechQ6Cvl5WeVP6tI',
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
            'recsYfjhmamvUbgM7',
            'recwoDtKd1B4ztytB',
            'recpKWliH8DpATqAW',
            'recfNbsZGueaHQUto',
          ]
          if (Array.isArray(values['Conditions master list'])) {
            return !excludedValues.some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return !excludedValues.includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldKN5ByF1QYXBEga',
        name: 'Starting Diabetes 1 stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['receXizGwFWI5igxn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['receXizGwFWI5igxn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['receXizGwFWI5igxn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldhyGE6HmSAMaSPQ',
        name: 'Starting Diabetes 2 stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Can you tell me a little bit more about your Diabetes.\nAre you taking any medications to treat your diabetes?\nAre you or have you ever taken injectable insulin to treat your diabetes?"\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)\n\nAt risk: HB1AC <5.7%\nStage 1: HB1AC > 6.5%\nStage 2: HB1AC >7.5%, FBS >7 mmol/l, only on oral meds\nStage 3: HB1AC >7.5%, FBS >7 mmol/l, on insulin\nPrediabetes: HBA1C 5.7% to 6.4% FBS >6 mmol/l, Positive impaired glucose tolerance test (RBS 7.8-11.1 mmol/l)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recR916dEtATKYuvw'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recR916dEtATKYuvw'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recR916dEtATKYuvw'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld09qe2SAI77hdpp',
        name: 'Starting Diabetes gestational stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recQPGTOSPnwjyPPA'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recQPGTOSPnwjyPPA'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recQPGTOSPnwjyPPA'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldO6uH6SjKMl8Fw6',
        name: 'Starting varicose veins stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Can you please describe the impact of your varicose veins on everyday life? \nDo you have any pain?"\n\nIf NO --> MILD\n\nIf YES\n"Does the pain limit any activity? How frequently do you have pain?\nDo you have any swelling? Does the swelling ever go above the ankles? How high?\nCan you please describe your varicose veins or send me a picture of them?\nHave you ever had, or do you have ulcers "\n\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)\n\nMILD: Occasional pain not restricting activities , few veins, number of active ulcers 1, occasional edema\n\nMODERATE: Daily moderate activity limitation requiring occasional analgesia use, Multiple veins/torturous, 2 ulcers present, Occasional edema above the level of the ankles\n\nSEVERE: Extensive veins, daily pain limiting daily activities, more than 3 ulcers, edema to the level of the knee, severe cellulitis',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rec1yyeyxkQxZtIsD'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rec1yyeyxkQxZtIsD'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rec1yyeyxkQxZtIsD'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldJ72UEXXraid24F',
        name: 'Starting hemorrhoids stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recpLfyAirbx5OlFS'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recpLfyAirbx5OlFS'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recpLfyAirbx5OlFS'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldvR9aClmQB4vVJo',
        name: 'Lower back pain score',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '* If acute: please ask the member to scale their pain from 1 to 10 (10 is the worst scenario) and enter the result\n* If chronic: please obtain the member’s score using this calculator: <a href="https://coda.io/d/_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR" target="_blank">https://coda.io/d/_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR</a> and enter the result\n* Examples: 1 or 5 or 8',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recVlgx6cf6Fw3gzn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recVlgx6cf6Fw3gzn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recVlgx6cf6Fw3gzn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldeahOPKqY22tSgO',
        name: 'Starting lower back pain stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"How long have you been having pain for?"\n\nIf less than 4 weeks: acute\n"I am sorry you are having acute back pain. Why don\'t we schedule a session with our Physiotherapist who should be able to help you with this?"\n\nIf between 4 and 12 weeks: sub-acute\n"I am sorry you are having sub-acute back pain. Why don\'t we schedule a session with our Physiotherapist who should be able to help you with this?"\n\nIf chronic → select the stage as displayed in the calculator\n\nIf > 12 weeks: CHRONIC\n"It sounds as though this has been going on for a long time. I want to understand your back pain a bit better in order to help. I am going to take you through a few questions that will allow us to give your lower back pain a score. Then we will work together to improve that score. Part of that work will definitely involve a visit to our physical therapist, but there are other things we shall do as well!"\n\nIf more than 12 weeks, please calculate the score here: <a href="https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe</a> \n',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recVlgx6cf6Fw3gzn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recVlgx6cf6Fw3gzn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recVlgx6cf6Fw3gzn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldlNxgjdawHJC3hq',
        name: 'Starting gastritis H. Pylori-associated stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recauBAdwn9QuqRRs'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recauBAdwn9QuqRRs'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recauBAdwn9QuqRRs'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldCqkDRizzeEWSs6',
        name: 'Starting gastritis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nAcute: < 6 weeks\nChronic > 6 weeks',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recjHCg4fZrqtuim3'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recjHCg4fZrqtuim3'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recjHCg4fZrqtuim3'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldkwUT9UUBObkvlI',
        name: 'Starting fibroid stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Are you having any noticeable symptoms?"\nIf NOT: Asymptomatic\n\nif YES:\n"Are you having any pain associated with your menstrual period? Have you ever been anemic or had difficulty getting pregnant?"\n\nIf YES: Symptomatic\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rec9GJtCUjz54voue'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rec9GJtCUjz54voue'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rec9GJtCUjz54voue'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld579dhVEiwhewMa',
        name: 'Starting allergic rhinitis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Do you have any of the following symptoms: running nose, watery eyes, itchy eyes or nose, sneezing, red eyes?\nWhen do you get these symptoms? \nIs it seasonal, meaning at different times during the year or is it more constant than that?\nIf it is more constant than that, would you say you have symptoms more or less than 4 days per week or more or less than 4 weeks per year?"\n\n\nStages:\nSEASONAL: Symptoms triggered seasonally\nINTERMITTENT: Symptoms < 4 days per week or < 4 weeks per year\nPERSISTENT: Symptoms > 4 days per week or > 4 weeks per year\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recFEGuc9JL0Tajlb'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recFEGuc9JL0Tajlb'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recFEGuc9JL0Tajlb'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldTTSI2PzfJvD2nS',
        name: 'Starting eczema stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rechQ6Cvl5WeVP6tI'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rechQ6Cvl5WeVP6tI'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rechQ6Cvl5WeVP6tI'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldBPrM1zuwE56Flt',
        name: 'Starting Osteoarthritis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"One of the worst things about Osteoarthritis is the pain it brings. On a scale of 1-10, how bad would you say the pain is, with 0 being no pain and 10 being the worst pain of your life. Please score the pain as it is before you take medicine to help with that pain."\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)\n\nStage 1: Minor wear-and-tear in the joints. Little to no pain in the affected area\nStage 2: Pain score <3 - Mild (some morning stiffness, intermittent pain with NO quality of life impact)\nStage 3: Pain score 4-7 - Moderate (intermittent pain with impact on quality of life)\nStage 4: Pain score >8 - Severe (persistent pain with significant impact on quality of life)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: [
          'recZETSYK81fAKYEy',
          'recCvj1vrZI7QJTJT',
          'rec976C51ukYbVEZP',
          'recatck1FWNN5RmWe',
          'recZ36sY8T3Yungmo',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return [
              'recZETSYK81fAKYEy',
              'recCvj1vrZI7QJTJT',
              'rec976C51ukYbVEZP',
              'recatck1FWNN5RmWe',
              'recZ36sY8T3Yungmo',
            ].some((r) => values['Conditions master list'].includes(r))
          }
          return [
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
          ].includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldo8ZqJD8xU0NV97',
        name: 'Starting Asthma stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nStage 1: Score of 24-25\nStage 2: Score of 21-23\nStage 3: Score of 16-20\nStage 4: Score <15',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recsYfjhmamvUbgM7'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recsYfjhmamvUbgM7'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recsYfjhmamvUbgM7'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldfpzaJu0a44DfOQ',
        name: 'Starting Overweight stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nStage 1: BMI 25-29.9\nStage 2: BMI 30-39.9\nStage 3: BMI >=40',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recwoDtKd1B4ztytB'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recwoDtKd1B4ztytB'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recwoDtKd1B4ztytB'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldCLV5I8SPsdho0A',
        name: 'Acute vs Chronic',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Have your symptoms been present for more than 3 months?"\n\nIf YES: Chronic\nIf NO: Acute',
      },
      {
        id: 'fldo520HOZqPtKnb9',
        name: 'Date of Diagnosis/Condition',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please enter the date you are or were interacting with the beneficiary',
      },
      {
        id: 'fld5bJMdP2nMJwYz2',
        name: 'Condition Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldGNCLKxvQo1XTg7',
        name: 'Diagnosis Stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Is this a new diagnosis or was the member aware of it before you spoke today?',
        conditionType: '!',
        parentKey: 'Condition Status',
        parentValues: ['HX'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition Status'])) {
            return ['HX'].some((r) => !values['Condition Status'].includes(r))
          }
          return !['HX'].includes(values['Condition Status'])
        },
      },
      {
        id: 'fldkCJeB3i5xxD3UH',
        name: 'Starting clinical status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: "Is the member's condition well controlled or not?",
      },
      {
        id: 'fldmMNmXsKLkOk5PN',
        name: 'Risk Factor @ diagnosis',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'What are the risk factors that you have identified during this baseline?',
      },
      {
        id: 'fldkKeJ82aiRToCpA',
        name: 'Other Risk Factor',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Risk Factor @ diagnosis',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Risk Factor @ diagnosis'])) {
            return ['Other'].some((r) =>
              values['Risk Factor @ diagnosis'].includes(r)
            )
          }
          return ['Other'].includes(values['Risk Factor @ diagnosis'])
        },
      },
      {
        id: 'fldAtiDnQi0xza2xO',
        name: 'Hypertension Key Goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select the key goal\n\nif@risk: <120/80\nIf Elevated BP: <120/80\nIf Stage 1: <130/80\nIf Stage 2: <130/80 (if the member reached 140/90 before the end of HMP 3 cycle)\nIf Stage 2: <140/90',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recfOQjJ8Yo2oiVD6'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recfOQjJ8Yo2oiVD6'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recfOQjJ8Yo2oiVD6'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld9hQ23p3n2ijtA9',
        name: 'Eczema key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rechQ6Cvl5WeVP6tI'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rechQ6Cvl5WeVP6tI'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rechQ6Cvl5WeVP6tI'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldyNYrMy0f5V56kV',
        name: 'Asthma Key Goal',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select the key goal\n\nIf Stage 1: 60% reduction in use of rescue inhaler, Asthma Score > 20\nIf Stage 2: 60% reduction in use of rescue inhaler, Asthma Score > 20\nIf Stage 3: 60% reduction in use of rescue inhaler, Asthma Score > 20, 60% reduction in Nos of exacerbation\nIf Stage 4: 60% reduction in use of rescue inhaler, Asthma Score > 20, 60% reduction in Nos of exacerbation',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recsYfjhmamvUbgM7'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recsYfjhmamvUbgM7'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recsYfjhmamvUbgM7'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld5SZTvX2xFBQoRw',
        name: 'Varicose veins key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please select the key goal\n\nMild: Symptom relief\nModerate and Severe: Symptom relief and improve functionality',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rec1yyeyxkQxZtIsD'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rec1yyeyxkQxZtIsD'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rec1yyeyxkQxZtIsD'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldhnIQoKONbOCWI0',
        name: 'Fibroid key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rec9GJtCUjz54voue'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rec9GJtCUjz54voue'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rec9GJtCUjz54voue'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldSJgkNPVARZEZao',
        name: 'GERD key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recLpbGIM06FnDBN4'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recLpbGIM06FnDBN4'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recLpbGIM06FnDBN4'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldKHrBVbKIwVfADV',
        name: 'Allergic Rhinitis key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recFEGuc9JL0Tajlb'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recFEGuc9JL0Tajlb'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recFEGuc9JL0Tajlb'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldwLrpLwHcfyOxdI',
        name: 'Hyperlipidemia key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'At risk →  LDL<130mg/dl, TC < 200mg/dl, Fasting TG < 150mg/dl\n Hypercholesterolemia → TC< 200mg/dl\n Hypertriglyceridemia → Fasting TG < 150mg/dl\n Mixed hyperlipidemia → LDL<130mg/dl, TC<200mg/dl, Fasting TG <150mg/dl',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recLdUqB94LuWsfpj'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recLdUqB94LuWsfpj'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recLdUqB94LuWsfpj'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldz3AN7czO2qpfLz',
        name: 'Gastritis key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please select the key goal\n\nAcute: symptom resolution\nChronic: symptom management',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recjHCg4fZrqtuim3'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recjHCg4fZrqtuim3'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recjHCg4fZrqtuim3'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldwIDfoWFByOFluX',
        name: 'Lower back pain key goal',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '  * If acute and sub-acute select functional recovery and pain control\n  * if chronic select functional recovery and pain score less then 9/36',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recVlgx6cf6Fw3gzn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recVlgx6cf6Fw3gzn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recVlgx6cf6Fw3gzn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld0IyTpaV0FytcXr',
        name: 'Gastritis H. pylori-associated key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recauBAdwn9QuqRRs'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recauBAdwn9QuqRRs'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recauBAdwn9QuqRRs'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldWrBbxZnA6crn6j',
        name: 'Diabetes 1 key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['receXizGwFWI5igxn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['receXizGwFWI5igxn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['receXizGwFWI5igxn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldvTsCMs2roYc0J0',
        name: 'Diabetes 2 Key Goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select the key goal\n\nif @risk = HgBA1c <5.7%\nif stage 1 = HB1AC <6.5%, FBS <7 mmol/l\nIf stage 2 = HB1AC <7.5%, FBS <7 mmol/l\nIf stage 3 = HB1AC <7.5%, FBS <7 mmol/l\nIf pre-diabetic = HB1AC <5.7%, FBS <5.5 mmol/l\n ',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recR916dEtATKYuvw'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recR916dEtATKYuvw'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recR916dEtATKYuvw'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldeQWRMDiNGcSHy4',
        name: 'Diabetes gestational key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'HB1AC< 6.0% ',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recQPGTOSPnwjyPPA'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recQPGTOSPnwjyPPA'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recQPGTOSPnwjyPPA'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldhmh40nmdztaQpf',
        name: 'Hemorrhoids key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recpLfyAirbx5OlFS'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recpLfyAirbx5OlFS'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recpLfyAirbx5OlFS'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldFLEU6e43sSyYd0',
        name: 'Osteoarthritis Key Goal',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select the key goal\n\nIf stage 1: avoid progression of symptoms\nOther stages: improved functionality and pain scale <3',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: [
          'recZETSYK81fAKYEy',
          'recCvj1vrZI7QJTJT',
          'rec976C51ukYbVEZP',
          'recatck1FWNN5RmWe',
          'recZ36sY8T3Yungmo',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return [
              'recZETSYK81fAKYEy',
              'recCvj1vrZI7QJTJT',
              'rec976C51ukYbVEZP',
              'recatck1FWNN5RmWe',
              'recZ36sY8T3Yungmo',
            ].some((r) => values['Conditions master list'].includes(r))
          }
          return [
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
          ].includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldlj4lpz4t87ifw0',
        name: 'Overweight Key Goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'If Stage 1: 5% BMI reduction\nIf Stage 2: 7% BMI reduction\nIf Stage 3: 10% BMI reduction',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recc2gPxj8JniRiyY', 'recwoDtKd1B4ztytB'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recc2gPxj8JniRiyY', 'recwoDtKd1B4ztytB'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recc2gPxj8JniRiyY', 'recwoDtKd1B4ztytB'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld4lNktx8cirY97v',
        name: 'Other overweight key goal',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please enter the custom BMI reduction key goal in %\nexample: \n3% BMI reduction \n12% BMI reduction',
        conditionType: '',
        parentKey: 'Overweight Key Goal',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Overweight Key Goal'])) {
            return ['Other'].some((r) =>
              values['Overweight Key Goal'].includes(r)
            )
          }
          return ['Other'].includes(values['Overweight Key Goal'])
        },
      },
      {
        id: 'fldiCO1rgfUfm60ZW',
        name: 'Other conditions key goal',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '!',
        parentKey: 'Conditions master list',
        parentValues: [
          'rec1yyeyxkQxZtIsD',
          'recwoDtKd1B4ztytB',
          'recZETSYK81fAKYEy',
          'recCvj1vrZI7QJTJT',
          'rec976C51ukYbVEZP',
          'recatck1FWNN5RmWe',
          'recZ36sY8T3Yungmo',
          'recVlgx6cf6Fw3gzn',
          'recLdUqB94LuWsfpj',
          'recfOQjJ8Yo2oiVD6',
          'recpLfyAirbx5OlFS',
          'recLpbGIM06FnDBN4',
          'recjHCg4fZrqtuim3',
          'recauBAdwn9QuqRRs',
          'rec9GJtCUjz54voue',
          'rechQ6Cvl5WeVP6tI',
          'receXizGwFWI5igxn',
          'recR916dEtATKYuvw',
          'recQPGTOSPnwjyPPA',
          'recsYfjhmamvUbgM7',
          'recFEGuc9JL0Tajlb',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return [
              'rec1yyeyxkQxZtIsD',
              'recwoDtKd1B4ztytB',
              'recZETSYK81fAKYEy',
              'recCvj1vrZI7QJTJT',
              'rec976C51ukYbVEZP',
              'recatck1FWNN5RmWe',
              'recZ36sY8T3Yungmo',
              'recVlgx6cf6Fw3gzn',
              'recLdUqB94LuWsfpj',
              'recfOQjJ8Yo2oiVD6',
              'recpLfyAirbx5OlFS',
              'recLpbGIM06FnDBN4',
              'recjHCg4fZrqtuim3',
              'recauBAdwn9QuqRRs',
              'rec9GJtCUjz54voue',
              'rechQ6Cvl5WeVP6tI',
              'receXizGwFWI5igxn',
              'recR916dEtATKYuvw',
              'recQPGTOSPnwjyPPA',
              'recsYfjhmamvUbgM7',
              'recFEGuc9JL0Tajlb',
            ].some((r) => !values['Conditions master list'].includes(r))
          }
          return ![
            'rec1yyeyxkQxZtIsD',
            'recwoDtKd1B4ztytB',
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
            'recVlgx6cf6Fw3gzn',
            'recLdUqB94LuWsfpj',
            'recfOQjJ8Yo2oiVD6',
            'recpLfyAirbx5OlFS',
            'recLpbGIM06FnDBN4',
            'recjHCg4fZrqtuim3',
            'recauBAdwn9QuqRRs',
            'rec9GJtCUjz54voue',
            'rechQ6Cvl5WeVP6tI',
            'receXizGwFWI5igxn',
            'recR916dEtATKYuvw',
            'recQPGTOSPnwjyPPA',
            'recsYfjhmamvUbgM7',
            'recFEGuc9JL0Tajlb',
          ].includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldMniwVWtJfrWXYS',
        name: 'Engagement Level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldCV54l55rLFB4Tw',
        name: 'Does the member have a Primary care provider?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldQD92uu8w68NQja',
        name: 'Primary Doctor',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldxoNoRdmsiqbtvw',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblsixUe3jfbOUMQP',
        required: true,
        helper: "Fill in member's primary/preferred doctor",
        conditionType: '',
        parentKey: 'Does the member have a Primary care provider?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Does the member have a Primary care provider?']
            )
          ) {
            return ['Yes'].some((r) =>
              values['Does the member have a Primary care provider?'].includes(
                r
              )
            )
          }
          return ['Yes'].includes(
            values['Does the member have a Primary care provider?']
          )
        },
      },
      {
        id: 'fldGtNxCqOor6GrAT',
        name: 'Others',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Fill in the Primary doctor not found',
        conditionType: '',
        parentKey: 'Primary Doctor',
        parentValues: ['rec0n79m4zKaXuZJD'],
        condition: (values: any) => {
          if (Array.isArray(values['Primary Doctor'])) {
            return ['rec0n79m4zKaXuZJD'].some((r) =>
              values['Primary Doctor'].includes(r)
            )
          }
          return ['rec0n79m4zKaXuZJD'].includes(values['Primary Doctor'])
        },
      },
      {
        id: 'fldUWLLD3IZwUhcDh',
        name: 'Condition Notes',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter any additional information related to the above condition that is relevant',
      },
    ],
  },
  {
    name: 'Appointments',
    id: 'tblZB4YOpd7XH3cYt',
    formId: 'shrZWjIcj1g2zMA5S',
    helper:
      'Please remember that all internal appointments (NC,PC,MHC and VC) need to be booked using Calendly. You can use this form if you are recording an appointment with an external provider. In exceptional cases, you can use this form to record an internal appointment. Please refer to the supervisor in that case',
    fields: [
      {
        id: 'fldafLUdREtVz9706',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldmYqD8B7oj39miH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldxO5BQfFPKki6Pd',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldmWmtgYRXsTM1jm',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldQlXe2zComT4i3P',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Needed: if the appointment has no date and no time and you want our team to schedule it\nScheduled: we know the date and time and it is assigned\nMissed: the member did not pick up the call or picked up but could not do the call without giving a new date and time, we will need to reschedule\nComplete: successful interaction/ consultation has been done (on phone or in person)\nCanceled: we, Antara, decides that the appointment is not relevant anymore.',
      },
      {
        id: 'fldzq9nKvEgOpuKpy',
        name: 'Internal vs External',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select Internal if the appointment will be performed by Antara. If not, select External',
      },
      {
        id: 'fldv1OxoNTVJJ5b8r',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld80Zs0yKt5WG9Oe',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper:
          'If the appointment is internal, please select who will perform the appointment in our team',
        conditionType: '',
        parentKey: ['Internal vs External', 'Status'],
        parentValues: [
          'Internal',
          'Scheduled',
          'Completed',
          'Missed',
          'Cancelled',
        ],
        condition: (values: any) => {
          return (
            ['Internal'].includes(values['Internal vs External']) ||
            ['Scheduled', 'Completed', 'Missed', 'Cancelled'].includes(
              values.Status
            )
          )
        },
      },
      {
        id: 'fldvTJ7ck1qsPPMou',
        name: 'start_date_time',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter time in UTC+3 (Kenya time zone)',
        conditionType: '',
        parentKey: 'Status',
        parentValues: ['Scheduled', 'Completed', 'Missed', 'Cancelled'],
        condition: (values: any) => {
          if (Array.isArray(values.Status)) {
            return ['Scheduled', 'Completed', 'Missed', 'Cancelled'].some((r) =>
              values.Status.includes(r)
            )
          }
          return ['Scheduled', 'Completed', 'Missed', 'Cancelled'].includes(
            values.Status
          )
        },
      },
      {
        id: 'flddSo1PMhy87XRwt',
        name: 'Service',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldH50RfElGxwqC9t',
        name: 'Lab/imaging management',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldwXTM9HtvpkCXsE',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYOGN4iEGRc3Mjm',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Service',
        parentValues: ['Laboratory', 'Radiology'],
        condition: (values: any) => {
          if (Array.isArray(values.Service)) {
            return ['Laboratory', 'Radiology'].some((r) =>
              values.Service.includes(r)
            )
          }
          return ['Laboratory', 'Radiology'].includes(values.Service)
        },
      },
      {
        id: 'fldIK4CHOHR4GyixK',
        name: 'Facilities from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld2wYDYU8o85Brjp',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Internal vs External',
        parentValues: ['External'],
        condition: (values: any) => {
          if (Array.isArray(values['Internal vs External'])) {
            return ['External'].some((r) =>
              values['Internal vs External'].includes(r)
            )
          }
          return ['External'].includes(values['Internal vs External'])
        },
      },
      {
        id: 'fldQa1FYUWaVqeyb8',
        name: 'Other Facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Fill in the Facility not found in the provider base. Enter Other facility name with format Name -Location e.g Antara Health - Lavington ',
        parentKey: 'Facilities from Provider base',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (Array.isArray(values['Facilities from Provider base'])) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values['Facilities from Provider base'].includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(
            values['Facilities from Provider base']
          )
        },
      },
      {
        id: 'fld09egAdhTkoNNwW',
        name: 'Specialists from Provider Base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldbLq7pGDhffE6CV',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblsixUe3jfbOUMQP',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Internal vs External',
        parentValues: ['External'],
        condition: (values: any) => {
          if (Array.isArray(values['Internal vs External'])) {
            return ['External'].some((r) =>
              values['Internal vs External'].includes(r)
            )
          }
          return ['External'].includes(values['Internal vs External'])
        },
      },
      {
        id: 'fldbFvsmhiv0GtF5z',
        name: 'Other Specialist',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Fill in the Specialist not found in the provider base. Enter Other specialist name with format Name -Location e.g Dr Grace - Antara ',
        parentKey: 'Specialists from Provider Base',
        parentValues: ['rec0n79m4zKaXuZJD'],
        condition: (values: any) => {
          if (Array.isArray(values['Specialists from Provider Base'])) {
            return ['rec0n79m4zKaXuZJD'].some((r) =>
              values['Specialists from Provider Base'].includes(r)
            )
          }
          return ['rec0n79m4zKaXuZJD'].includes(
            values['Specialists from Provider Base']
          )
        },
      },
      {
        id: 'fldv8QwCKoLRuYmRm',
        name: 'Comments',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Nutritional Consultation',
    id: 'tblJoayRD7xQ33qpR',
    formId: 'shrFmDt0AU4XjbsAr',
    fields: [
      {
        id: 'fld97KWfGQMlZeAT3',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldujoBzhHxX4oSOt',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldXvSfjevSU59hol',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld33jxyGnKOQkPgN',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldr6yxzbVBuh0OCC',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNkjgTUFxBnfNX7',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper:
          'Please select the appointment so that the system can automatically update the status after your consultation',
      },
      {
        id: 'fldjL2gP5X6ZpRhEo',
        name: 'Date of Consultation',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld3tBosjJIiQNX1F',
        name: 'Nutritional Consultation #',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldQbVDAaAm7m1Vtl',
        name: 'Source of NC request',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldW1SZOP6G11ny2B',
        name: 'Assessment Type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld5PQAlXm2zG4lDW',
        name: 'Do you have any of the following conditions?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld7cngqqlITbCrRD',
        name: 'Describe Other Condition',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Other'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Other'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldMYi3r23NEB3qpY',
        name: 'Conditions (from MemberDB)',
        type: 'conditions',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldm4JKb5DAWFzFYc',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: false,
        helper: '',
      },
      {
        id: 'fldgXkBa5ueRWLcBk',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld1ToqzQ0FELQLam',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
        required: false,
        helper: '',
      },
      {
        id: 'fldCBcTkWDirOsrKw',
        name: 'Consulting Clinican',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld4usvEu91PpcNHb',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fld1CS9ZVxdfSs7Yh',
        name: 'Breakfast',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Describe your typical meal here',
      },
      {
        id: 'fldEGAssEiCL7qr9c',
        name: 'Lunch',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Describe your typical meal here',
      },
      {
        id: 'fldehyaYtQMzpVZ9S',
        name: 'Dinner',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Describe your typical meal here',
      },
      {
        id: 'fldWtHET2RY5pWQXL',
        name: 'Snacks',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Describe your typical snacks here',
      },
      {
        id: 'fldpRQ41n7VtcRuS1',
        name: 'How many glasses of water do you take in a day?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldWRCNu3yWkBXt3c',
        name: 'High Salt Foods (Packaged salty snacks like crisps, salted nuts, popcorn or salty biscuits/crackers)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldE3XjTNTLI7kHFz',
        name: 'High Salt Foods (Cold Cuts or Processed Meats like sausage, bacon, ham, or smokie)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldmfoOXeuvxvuSPb',
        name: 'High Salt Foods (Fast food like chips, bhajia, pizza, deep-fried chicken, or cheesy foods)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld2vDVdB8ck2N3u3',
        name: 'High Salt Foods (Canned foods like baked beans, maize, corn, peas, or tomatoes)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldUDB2dCQZmQdtRA',
        name: 'High Salt Foods (Condiments like tomato sauce, ketchup, chili sauce or mustard)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldT6wajypTInDPXG',
        name: 'High Salt Foods (Seasoning like Royco, Maggi cubes, Soy sauce, Tomato Paste)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldQER2cg8hzwVTPC',
        name: 'High Salt Foods (Table Salt)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld8VEFIe2e4PtqtT',
        name: 'Is salt added to your food when cooked?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldOshDKPvDSVyzof',
        name: 'Basal Daily Sodium',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldRowVXuyA2bcpJm',
        name: 'Estimated daily sodium intake',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Level [0]: <1500mg (Recommended for hypertensives)\nLevel [1]: 1500-2500mg (Normal)\nLevel [2]: 2500-3500mg (High)\nLevel [3]: 3500-4500mg (Very High)\nLevel [4]: >4500mg (Excessively High)',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldgOLvIDrnMc1T8Q',
        name: 'High Potassium Foods (Dark green leafy or traditional/kienyeji vegetables)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldhrrx0yX9QZ9AzL',
        name: 'High Potassium Foods (Ripe bananas)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldr0sgrdqpOIYzkr',
        name: 'High Potassium Foods (Cooked plantains/ green bananas)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld6RMbLT1NJZDnJZ',
        name: 'High Potassium Foods (Unsalted nuts)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld8iuz7sgu9itaPc',
        name: 'High Potassium Foods (Root vegetables like beetroot, sweet potatoes, arrow roots or yams)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldp5AvGTFGkNi6N3',
        name: 'Basal Daily Potassium',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'flddULOofgHvRKU70',
        name: 'Estimated Daily Potassium Intake',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Level [0]: >3500mg (Recommended)\nLevel [1]: 2500-3500mg (Normal)\nLevel [2]: 1500-2500mg (Low)\nLevel [3]: <1500mg (Inadequate)',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Blood Pressure'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Blood Pressure'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Blood Pressure'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldLOY33TW8gOOkaN',
        name: 'Basal Metabolic Rate',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Overweight'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Overweight'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Overweight'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldJ8R7OCRTbzvp70',
        name: 'Estimated Daily Caloric Intake',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Overweight'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Overweight'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Overweight'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldcLRAVW3R2xuXl0',
        name: 'Estimated Caloric Needs',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Overweight'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Overweight'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Overweight'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldrnlIM2dOFULhDQ',
        name: 'Breakfast Glycemic Load',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Diabetes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Diabetes'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Diabetes'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldOgwk0ZhW8BlSAO',
        name: 'Lunch Glycemic Load',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Diabetes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Diabetes'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Diabetes'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldmaVhJDwt0p4XDL',
        name: 'Snacks Glycemic Load',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Diabetes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Diabetes'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Diabetes'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldnRUSLScLdKh4tQ',
        name: 'Dinner Glycemic Load',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Diabetes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Diabetes'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Diabetes'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld9Tp1N5bO9XzGYn',
        name: 'Total Daily Glycemic Load',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please input the calculated glycemic load using this field.\nLevel 0: <100 (Recommended for diabetes)\nLevel 1: 100 - 180 (recommended for at risk/healthy)\nLevel 2: 181 - 200\nLevel 3: >200',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['Diabetes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['Diabetes'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['Diabetes'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld3s2ByuDjHcvKws',
        name: 'Eggs',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Cholesterol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Cholesterol'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Cholesterol'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldqrE4NfGeA8GTQ2',
        name: 'Solid Cooking Fats',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Cholesterol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Cholesterol'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Cholesterol'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'flduTh07roJyr0CFB',
        name: 'Deep Fried',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Cholesterol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Cholesterol'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Cholesterol'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldMRmTLNVIIjA6GD',
        name: 'Fast Food',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Cholesterol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Cholesterol'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Cholesterol'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldLPkl6LKeEGHZ7w',
        name: 'Cold Cuts',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the number of times per week',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Cholesterol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Cholesterol'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Cholesterol'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fldH4zP9eAeYncWu7',
        name: 'Daily estimated cholesterol intake',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'CHOLESTEROL INTAKE LEVELS\t\t\nLevel [0]: <200mg (Recommended for those with heart disease)\nLevel [1]: 200-300mg (Normal)\nLevel [2]: 300-500mg (High)\nLevel [3]: >500mg (Very High)',
        conditionType: '',
        parentKey: 'Do you have any of the following conditions?',
        parentValues: ['High Cholesterol'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any of the following conditions?']
            )
          ) {
            return ['High Cholesterol'].some((r) =>
              values['Do you have any of the following conditions?'].includes(r)
            )
          }
          return ['High Cholesterol'].includes(
            values['Do you have any of the following conditions?']
          )
        },
      },
      {
        id: 'fld9OCSyJzHE7Ib5e',
        name: 'Current dietary challenges',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'What dietary challenges is the member facing currently?',
      },
      {
        id: 'fld2ahqR93fsHyYuH',
        name: 'Describe current dietary challenges',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        condition: (values: any) => {
          if (Array.isArray(values['Current dietary challenges'])) {
            return ['Other'].some((r) =>
              values['Current dietary challenges'].includes(r)
            )
          }
          return ['Other'].includes(values['Current dietary challenges'])
        },
      },
      {
        id: 'fldIh3t7oy1oL3gG9',
        name: 'Future dietary challenges',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'What dietary challenges does the member anticipate?',
      },
      {
        id: 'flda0buplgSWwz2T6',
        name: 'Describe future dietary challenges',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        condition: (values: any) => {
          if (Array.isArray(values['Future dietary challenges'])) {
            return ['Other'].some((r) =>
              values['Future dietary challenges'].includes(r)
            )
          }
          return ['Other'].includes(values['Future dietary challenges'])
        },
      },
      {
        id: 'fldYbwXC8AvuQ9b8g',
        name: 'Assessment',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'A summary of the nutrition diagnosis, diet type, meal portions & dietary behaviours',
      },
      {
        id: 'fldJGI1AH4AlbDk6o',
        name: 'Nutrition consultation outcomes',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldYlv7EnMoPW0T1N',
        name: 'Other outcomes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Nutrition consultation outcomes',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Nutrition consultation outcomes'])) {
            return ['Other'].some((r) =>
              values['Nutrition consultation outcomes'].includes(r)
            )
          }
          return ['Other'].includes(values['Nutrition consultation outcomes'])
        },
      },
      {
        id: 'fldyXgLDarMyh2YuI',
        name: 'Recommendation',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'A summary of the recommended HMP template, diet plan & dietary milestones\nClick here to track the dietary interventions: <a href="https://airtable.com/app5syOvwU86ByWD8/tblTmMtBgwT76JrQN/viw7Lol2O4HIYTFJS?blocks=hide" target="_blank">https://airtable.com/app5syOvwU86ByWD8/tblTmMtBgwT76JrQN/viw7Lol2O4HIYTFJS?blocks=hide</a> ',
      },
      {
        id: 'fldaBEyw3S8a40Gro',
        name: 'Date of next Nutritional Consultation',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please book the next appointment with the member using calendly now if less than 10 days from today and enter the date here in the form (note that if the date is more than 10 days, a task for ME will be created so that they confirm the availability of the member)',
      },
      {
        id: 'fldDt5sfuzRfkev7Q',
        name: 'Put anything else you want to share here!',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Vitals',
    id: 'tblNC7CZy3MqYRs6j',
    formId: 'shr0VkCzeprnRSIhA',
    fields: [
      {
        id: 'fldbWJ9BNCnQjsBF9',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldCxBwawrriBvtZT',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldX19jwUFrByPh6J',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldUcuTE7pxn3fM6o',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldr7gtyHTivwMQwQ',
        name: 'Staff',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld87gti8UwxGmYPs',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: false,
        helper: 'Please select',
      },
      {
        id: 'fldJCpsPJVa1z6Dyj',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Enter date of Vitals Measurement',
      },
      {
        id: 'fldKOOjHU4SxlzslW',
        name: 'Type of Reading',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldK4ZtjvPsBxLa9Q',
        name: 'Temperature',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '(℃)',
      },
      {
        id: 'fldKlVgtBDgMYo0z0',
        name: 'RR',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'BPM',
      },
      {
        id: 'fldNNiBdWJ33zK19o',
        name: 'SPO2',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '(%)',
      },
      {
        id: 'fldGdLBCeDbyMDQqF',
        name: 'Height',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '(m) - examples: 1.5m 1.8m 1.75m',
      },
      {
        id: 'fldw8miPR14Hk4uY6',
        name: 'Weight',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '(kg)',
      },
      {
        id: 'fldof4wve2EI0GJCG',
        name: 'Muscle mass (kgs)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the Muscle mass identified by the device in Kilograms \n(if decimals, use a . not a ,)',
      },
      {
        id: 'fld6dnS7napxuFUM8',
        name: 'Body fat',
        type: 'number',
        format: 'percentV2',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the Body fat identified by the device. \nExample: 10%, 14.20%, 22.15%, 30%\n(if decimals, use a . not a ,)',
      },
      {
        id: 'fld3DD0x6guc1KJYV',
        name: 'Visceral fat',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the Visceral fat identified by the device.\n 0-9: Normal\n 10-14: High\n 15 and above: Very high',
      },
      {
        id: 'fld6xN5vVaZTfjgkp',
        name: 'Waist circumference',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Men: <94 cm is healthy, 94-101 cm is at Risk, >102 cm is at High Risk\n Women: <80 cm is healthy, 80-87 cm is at Risk, >88 cm is at High Risk',
      },
      {
        id: 'fldV9WFYjplmekeQF',
        name: 'Hip circumference',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '(cm)',
      },
      {
        id: 'fldBjrUmBBwCgY3Rk',
        name: 'Bone density',
        type: 'number',
        format: 'percentV2',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Normal values for Men: 3.1 kgs to 3.3 kgs\n Normal values for Women: 2.4 kgs to 2.6 kgs',
      },
      {
        id: 'fldzDmiBfbnK1BuNO',
        name: 'Water content',
        type: 'number',
        format: 'percentV2',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Normal values for Men: 55% to 65%\n Normal values for Women: 45% to 60%',
      },
      {
        id: 'fld8DtLYgymRbULpM',
        name: 'Mid-Upper Arm Circumference(MUAC)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Enter vital reading for children below 5 years\n <11.5 cm - severely undernourished\n 11.5 - 12.5 cm - moderately undernourished\n >12.5 cm - healthy',
      },
      {
        id: 'fldLCh6oZY8JjMOpd',
        name: '6-Lead ECG Findings',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please describe the ECG findings here',
      },
    ],
  },
  {
    name: 'BP Mon',
    id: 'tblNNpLhOgVYAOQvU',
    formId: 'shrJo1OLcSNVTTA0w',
    fields: [
      {
        id: 'fldY2oAahzsrtK3ye',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldR0pWuG0oabOepZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldRiW5bF4mGsb9nD',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld7xKdXCF2UHQasW',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldRPfjICFgHGMnrx',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldttZ4N7ASR2uF46',
        name: 'BP Reading Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld5AE8hi2cdd58wl',
        name: 'Type of reading',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldiMxpgo3x8UgB6E',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld1jEcoiqh4de3iq',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
        required: false,
        conditionType: '',
        parentKey: 'BP Reading Type',
        parentValues: ['Data collection for HMP'],
        condition: (values: any) => {
          if (Array.isArray(values['BP Reading Type'])) {
            return ['Data collection for HMP'].some((r) =>
              values['BP Reading Type'].includes(r)
            )
          }
          return ['Data collection for HMP'].includes(values['BP Reading Type'])
        },
      },
      {
        id: 'fld1Oqsf9qzTC6nSK',
        name: 'Morning Systolic',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'mm/Hg',
      },
      {
        id: 'fldIGta2IYTFcve3V',
        name: 'Morning Diastolic',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'mm/Hg',
      },
      {
        id: 'fldNIP3xuDGqscEAa',
        name: 'Morning Pulse',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'BPM',
      },
      {
        id: 'fldtAVt5rKnX2BbKF',
        name: 'Evening Systolic',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'mm/Hg',
      },
      {
        id: 'fldViCahhOnTKK2r0',
        name: 'Evening Diastolic',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'mm/Hg',
      },
      {
        id: 'fldlCaZsoQXE4YQw8',
        name: 'Evening Pulse',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'BPM',
      },
    ],
  },
  {
    name: 'CHL Mon',
    id: 'tblfxocXbfPnj9l2e',
    formId: 'shreiiEvt7m7qg6az',
    fields: [
      {
        id: 'fld7jptb7F7xE7SH6',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldMNr49dkTnjdOTQ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldZo75EFrbdsQcvH',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldWDjUZZ2I1gitLP',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldBWYABeVHG1c0Px',
        name: 'Test Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldUKCMS7YUDld2rY',
        name: 'Lipid panel test type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldvDoodUbTJBUFtY',
        name: 'Type of reading',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldIz93Cp47H1T9EC',
        name: 'HDL',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Interpretation of Results:\n\nMen < 40mg/dL: Poor\nWomen <50 mg/dL: Poor\n40-59 mg/dL: Better\n> 60 mg/dL: Best',
      },
      {
        id: 'fldCdIxVotjsl3ScF',
        name: 'LDL',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Interpretation of Results:\n\n<70 mg/dL: target if coronary artery disease: \n< 100 mg/dL: target if @ risk for coronary artery disease:\n100-129 mg/dL: Normal\n130-159 mg/dL: Borderline high\n160-189 mg/dL: High\n190 mg/dL and above: Very high',
      },
      {
        id: 'fldgHX4xlRillNT6M',
        name: 'Total Cholesterol',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Interpretation of Results:\n\n<200 mg/dL: Desirable\n200-239 mg/dL: Borderline\n>240 mg/dL: High',
      },
      {
        id: 'fldt5FL2oZ4pelk4d',
        name: 'Triglyceride',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Interpretation of Results:\n\n<150 mg/dL: Desirable\n150-199 mg/dL: Borderline High\n200-499 mg/dL: High\n> 500 mg/dL : Very High',
      },
    ],
  },
  {
    name: 'DM Mon',
    id: 'tblT5m8xaMTefircT',
    formId: 'shrbn21wPY6Vj0Ufv',
    fields: [
      {
        id: 'fld2zAEadgjEC682h',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld903cn5XIVtKgQp',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldDW51eEYf4oZiFm',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldAbhQzYzMScrzVu',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldfuWwbdsLxXl6Zc',
        name: 'Test Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldtT3PmMbInK9WGx',
        name: 'Type of reading',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldp6xbxwTUDVt7QE',
        name: 'Morning BS timing',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Preprandial morning blood sugar indicates a fasting Blood sugar reading. \n\nIf it is post-prandial then it is not a fasting glucose',
      },
      {
        id: 'fld7CzLQVsDJxyWxe',
        name: 'Fasting Blood Sugar',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Preprandial morning blood sugar indicates a fasting Blood sugar reading. If it is post-prandial then it is not a fasting glucose\n\nInterpretation of Results:\n\nNormal: <5.5 mmol/l\nPre-diabetic: 5.5-6.9 mmol/l\nDiabetic: >7 mmol/l\n\nTarget for Diabetics: <7 mmol/l',
        conditionType: '',
        parentKey: 'Morning BS timing',
        parentValues: ['preprandial', 'preprandial', 'preprandial', 'both'],
        condition: (values: any) => {
          if (Array.isArray(values['Morning BS timing'])) {
            return ['preprandial', 'preprandial', 'preprandial', 'both'].some(
              (r) => values['Morning BS timing'].includes(r)
            )
          }
          return ['preprandial', 'preprandial', 'preprandial', 'both'].includes(
            values['Morning BS timing']
          )
        },
      },
      {
        id: 'fldIE6ib5a4LUfRCf',
        name: 'Morning postprandial BS',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter (NON fasting) morning value here.',
        conditionType: '',
        parentKey: 'Morning BS timing',
        parentValues: ['postprandial', 'postprandial', 'postprandial', 'both'],
        condition: (values: any) => {
          if (Array.isArray(values['Morning BS timing'])) {
            return [
              'postprandial',
              'postprandial',
              'postprandial',
              'both',
            ].some((r) => values['Morning BS timing'].includes(r))
          }
          return [
            'postprandial',
            'postprandial',
            'postprandial',
            'both',
          ].includes(values['Morning BS timing'])
        },
      },
      {
        id: 'fld50MLMpYxtYmKbb',
        name: 'Afternoon BS timing',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldnKhW7qC3vtr0w6',
        name: 'Afternoon preprandial BS',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Afternoon BS timing',
        parentValues: ['preprandial', 'preprandial', 'preprandial', 'both'],
        condition: (values: any) => {
          if (Array.isArray(values['Afternoon BS timing'])) {
            return ['preprandial', 'preprandial', 'preprandial', 'both'].some(
              (r) => values['Afternoon BS timing'].includes(r)
            )
          }
          return ['preprandial', 'preprandial', 'preprandial', 'both'].includes(
            values['Afternoon BS timing']
          )
        },
      },
      {
        id: 'fldXUOIeZDbN7pkAI',
        name: 'Afternoon postprandial BS',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Afternoon BS timing',
        parentValues: ['postprandial', 'postprandial', 'postprandial', 'both'],
        condition: (values: any) => {
          if (Array.isArray(values['Afternoon BS timing'])) {
            return [
              'postprandial',
              'postprandial',
              'postprandial',
              'both',
            ].some((r) => values['Afternoon BS timing'].includes(r))
          }
          return [
            'postprandial',
            'postprandial',
            'postprandial',
            'both',
          ].includes(values['Afternoon BS timing'])
        },
      },
      {
        id: 'fldBaoTCWI0l6GZY9',
        name: 'Evening BS timing',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldZCnjQa4j2m0pgL',
        name: 'Evening preprandial BS',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Evening BS timing',
        parentValues: ['preprandial', 'preprandial', 'preprandial', 'both'],
        condition: (values: any) => {
          if (Array.isArray(values['Evening BS timing'])) {
            return ['preprandial', 'preprandial', 'preprandial', 'both'].some(
              (r) => values['Evening BS timing'].includes(r)
            )
          }
          return ['preprandial', 'preprandial', 'preprandial', 'both'].includes(
            values['Evening BS timing']
          )
        },
      },
      {
        id: 'fldaQ8qRG5gnizrSq',
        name: 'Evening postprandial BS',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Evening BS timing',
        parentValues: ['postprandial', 'postprandial', 'postprandial', 'both'],
        condition: (values: any) => {
          if (Array.isArray(values['Evening BS timing'])) {
            return [
              'postprandial',
              'postprandial',
              'postprandial',
              'both',
            ].some((r) => values['Evening BS timing'].includes(r))
          }
          return [
            'postprandial',
            'postprandial',
            'postprandial',
            'both',
          ].includes(values['Evening BS timing'])
        },
      },
      {
        id: 'fldURl3vti0fV0EbC',
        name: 'HbA1c',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Interpretation of Results:\n\nNormal:  <5.7%\npre-diabetes: 5.7-6.4%\nDiabetic: >6.5%\n\nTarget Level for Diabetics: <7.5%',
      },
    ],
  },
  {
    name: 'Interventions',
    id: 'tblTmMtBgwT76JrQN',
    formId: 'shrwlizJiy4xcAR2Y',
    helper:
      'Please use this form to enter in a new intervention for a beneficiary',
    fields: [
      {
        id: 'fldCgT1FPO8iK1SLi',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldxRQ6AVQRpbpEtd',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldnE7LZxxsDSXA1F',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld1geILSUPoNogEP',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldIM0afO9BuMtoJg',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldM3NKbxpX4mj6Wf',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
        required: false,
        helper: '',
      },
      {
        id: 'fldMPzXAtbjKrLGB6',
        name: 'Started At',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldaNcgPoBcmBH07w',
        name: 'Intervention',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldxMX1UvHY8a1PUZ',
        name: 'Other intervention',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Other'].some((r) => values.Intervention.includes(r))
          }
          return ['Other'].includes(values.Intervention)
        },
      },
      {
        id: 'fld70d5ifwYuNB62f',
        name: 'Condition (from memberDB)',
        type: 'conditions',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8VuhvyzeT14NFA',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: false,
        helper:
          'Note: you can select several conditions that are related to this intervention',
      },
      {
        id: 'fldU2O14PwFb5dpMW',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Active intervention - it is ongoing\nInactive intervention- not ongoing',
      },
      {
        id: 'fldu4Nwamz7R2ocWm',
        name: 'Status Cause',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Paused should be an option under inactive\nSuccessful can either be active or inactive',
      },
      {
        id: 'fldwibgAvaWBZhv3j',
        name: 'Resumption Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'The date the intervention gets back to effect',
        conditionType: '',
        parentKey: 'Status Cause',
        parentValues: ['Stopped', 'Paused'],
        condition: (values: any) => {
          if (Array.isArray(values['Status Cause'])) {
            return ['Stopped', 'Paused'].some((r) =>
              values['Status Cause'].includes(r)
            )
          }
          return ['Stopped', 'Paused'].includes(values['Status Cause'])
        },
      },
      {
        id: 'fldDOdcPCIRv2deLh',
        name: 'Starting activity - description',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please briefly describe the type of activity, the frequency and the duration',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Activity Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Activity Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldgdar5xv7r46nSF',
        name: 'Starting activity measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please go to this view <a href="https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Activity-METs-calculator_suNvx#_luc_1" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM</a> to identify the MET-Min/week (total of MET-Min/week of each activity)\nExample: 500 or 550',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Activity Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Activity Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldOsrHl0q0peeL94',
        name: 'Starting asthma measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please use this link to score the asthma condition and enter the result: <a href="https://www.asthmacontroltest.com/en-gb/welcome/" target="_blank">https://www.asthmacontroltest.com/en-gb/welcome/</a>\nExample: 6 or 21',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Asthma Action Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Asthma Action Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Asthma Action Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldPjxnzz9on7basl',
        name: 'Starting salt measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Daily salt intake in mg - without the unit\nExample: 1000',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Salt Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Salt Reduction Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Salt Reduction Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldOPuOknClXEuVIQ',
        name: 'Starting BMI measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Stage 1: BMI 25.0 - 29.9\nStage 2: BMI 30.0 - 39.9\nStage 3: BMI =/>40',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Weight Gain Plan', 'Caloric Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Weight Gain Plan', 'Caloric Reduction Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Weight Gain Plan', 'Caloric Reduction Plan'].includes(
            values.Intervention
          )
        },
      },
      {
        id: 'fldzwPjrFkl8JBu7A',
        name: 'Starting glycemix index',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Glycemix index\nExample: 85 or 167',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Diabetic Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Diabetic Diet Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Diabetic Diet Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fld99KfJX7bA73FxO',
        name: 'Starting cholesterol measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Daily cholesterol intake in mg - without the unit\nExample: 220 or 450',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Cholesterol Reduction'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Cholesterol Reduction'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Cholesterol Reduction'].includes(values.Intervention)
        },
      },
      {
        id: 'fldOKy5oLDAE1isdc',
        name: 'Starting Potassium measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Daily potassium intake in mg without the unit\nExample: 200',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Potassium Rich Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Potassium Rich Diet Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Potassium Rich Diet Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldig3ueNTzHRCjUU',
        name: 'Starting activity level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: 0 MET-minutes/week\n1: <500 MET-minutes/week\n2: 500 - 1499 MET-minutes/week\n3: 1500 - 2900 MET-minutes/week\n4: >= 3000 MET-minutes/week',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Activity Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Activity Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldHQIt7n5MBWGKRJ',
        name: 'Starting Asthma level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Above 11 years old\n1: Score 24 - 27\n2: Score 21 - 23\n3: Score 16 - 20\n4: Score < 15\n\n4 to 11 years old\n1: Score 25 - 27\n2: Score 21 - 24\n3: Score 13 - 20\n4: Score < 12',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Asthma Action Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Asthma Action Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Asthma Action Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldDpUmNqPPcx4EUm',
        name: 'Starting salt level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: <1500mg (Recommended for hypertensives)\n1: 1500-2500mg (Normal)\n2: 2501-3500mg (High)\n3: 3501-4500mg (Very High)\n4: >4500mg (Excessively High)',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Salt Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Salt Reduction Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Salt Reduction Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldyTMe0prmNCiAmn',
        name: 'Starting BMI level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '1: BMI 25-30\n2: BMI 31-40\n3: BMI >40',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Caloric Reduction Plan', 'Weight Gain Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Caloric Reduction Plan', 'Weight Gain Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Caloric Reduction Plan', 'Weight Gain Plan'].includes(
            values.Intervention
          )
        },
      },
      {
        id: 'fld8vyy47pdiFprUD',
        name: 'Weight gain milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '      * If BMI 17.0 - 18.4:\n1-month: 1% increase\n3-month: 1% increase\n6-month: 1% increase\n      * If BMI 16.0 - 16.9:\n1-month: 1% increase\n3-month: 2% increase\n6-month: 2% increase\n      * If BMI < 16.0:\n1-month: 2% increase\n3-month: 2% increase\n6-month: 3% increase',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Weight Gain Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Weight Gain Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Weight Gain Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldOGxcqIyo9hf9Dc',
        name: 'Starting Glycemix level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Level 0: <100\nLevel 1: 100 - 180\nLevel 2: 181 - 200\nLevel 3: >200',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Diabetic Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Diabetic Diet Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Diabetic Diet Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fld6xSPIjtfXoA2et',
        name: 'Starting cholesterol level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: <200mg (Recommended for those with heart disease)\n1: 200-300mg (Normal)\n2: 301-500mg (High)\n3: >500mg (Very High)',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Cholesterol Reduction'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Cholesterol Reduction'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Cholesterol Reduction'].includes(values.Intervention)
        },
      },
      {
        id: 'fldW7aB4CRW8bcTyu',
        name: 'Starting potassium level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: >3500mg (Recommended)\n1: 2500-3500mg (Normal)\n2: 1500-2499mg (Low)\n3: <1500mg (Inadequate)',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Potassium Rich Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Potassium Rich Diet Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Potassium Rich Diet Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldjxvGhKaM7oYTeL',
        name: 'Activity milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If 0 go to level 1: <500 MET-minutes/week\nIf 1 go to level 2: 500 - 1499 MET-minutes/week\nIf 2 go to level 3: 1500 - 2900 MET-minutes/week\nIf 3 and 4 go to level 4: >= 3000 MET-minutes/week',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Activity Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Activity Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldBzVbSYXjvGuNfq',
        name: 'Asthma milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Above 11 years old\nIf 1 and 2, go to level 1: Score 24 - 27\nIf 3, go to level 2: Score 21 - 23\nIf 4, go to level 3: Score 16 - 20\n\n4 to 11 years old\nIf 1 and 2, go to level 1: Score 25 - 27\nIf 3, go to level 2: Score 21 - 24\nIf 4, go to level 3: Score 13 - 20',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Asthma Action Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Asthma Action Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Asthma Action Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldDT3gwroP6jT8Ee',
        name: 'Potassium rich diet milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If 0 and 1, got to level 0: >3500mg (Recommended)\nIf 2, go to level 1: 2500-3500mg (Normal)\nIf 3, go to level 2: 1500-2499mg (Low)\nIf 4, go to level 3: <1500mg (Inadequate)',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Potassium Rich Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Potassium Rich Diet Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Potassium Rich Diet Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldrjBM0FWxXfT8Q1',
        name: 'Caloric reduction milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If Stage 1:\n1-month: 1% reduction\n3-month: 2% reduction\n6-month: 2% reduction\n\nIf Stage 2:\n1-month: 2% reduction\n3-month: 2% reduction\n6-month: 3% reduction\n \nIf Stage 3:\n1-month: 2% reduction\n3-month: 3% reduction\n6-month: 5% reduction',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Caloric Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Caloric Reduction Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Caloric Reduction Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldx1hmjkXUKsyqwK',
        name: 'Salt reduction milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If 0 and 1, go to level 0: <1500mg (Recommended for hypertensives)\nIf 2, go to level 1: 1500-2500mg (Normal)\nIf 3, go to level 2: 2500-3500mg (High)\nIf 4, go to level 3: 3500-4500mg (Very High)',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Salt Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Salt Reduction Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Salt Reduction Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldWJ9vYYmJWvDeAG',
        name: 'Diabetic milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If condition is Diabetes + condition stage = AT RISK and:\n  Level 0: <100, target = Level 0: <100\n  Level 1: 100 - 180, target = Level 1: 100 - 180\n  Level 2: 181 - 200, target = Level 1: 100 -180\n  Level 3: >200, target = Level 2: 181 - 200\n\n If condition is Diabetes + condition stage = PRE-DIABETES, 1, 2, or 3 and:\n  Level 0: <100, target = Level 0: <100\n  Level 1: 100 - 180, target = Level 0 <100\n  Level 2: 181 - 200, target = Level 1: 100 -180\n  Level 3: >200, target = Level 2: 181 - 200',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Diabetic Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Diabetic Diet Plan'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Diabetic Diet Plan'].includes(values.Intervention)
        },
      },
      {
        id: 'fldRA57xdMV6siq2v',
        name: 'Cholesterol milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If 0 and 1, go to level 0: <200mg (Recommended for those with heart disease)\nIf 2, go to level 1: 200-300mg (Normal)\nIf 3, go to level 2: 300-500mg (High)',
        conditionType: '',
        parentKey: 'Intervention',
        parentValues: ['Cholesterol Reduction'],
        condition: (values: any) => {
          if (Array.isArray(values.Intervention)) {
            return ['Cholesterol Reduction'].some((r) =>
              values.Intervention.includes(r)
            )
          }
          return ['Cholesterol Reduction'].includes(values.Intervention)
        },
      },
      {
        id: 'fldSjoPwKwk0F88NJ',
        name: 'Notes',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Prescriptions',
    id: 'tbl3iBWzYVWEpdLje',
    formId: 'shrH0jDDogdH2ySWr',
    helper: 'Only for usage of HN, Doctor should use the VC Prescription form',
    fields: [
      {
        id: 'fldiB18lEynAzpg0t',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldqmUGyhUTCMnrwZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldb32h6GgavKARi3',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldOgcAa03iu9LbHH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldAzPD8eGWs0ihjF',
        name: 'Medication',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldBcjGCipeX0kg6s',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblYzI0t7WX9LGW4h',
        required: true,
        helper: '',
      },
      {
        id: 'fldsOMD3iYcHSyxs9',
        name: 'Other Medication',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Medication',
        parentValues: ['rechmJ9RLO7W8zS5v'],
        condition: (values: any) => {
          if (Array.isArray(values.Medication)) {
            return ['rechmJ9RLO7W8zS5v'].some((r) =>
              values.Medication.includes(r)
            )
          }
          return ['rechmJ9RLO7W8zS5v'].includes(values.Medication)
        },
      },
      {
        id: 'fld4aX9xYNTWkcC7z',
        name: 'Associated condition(s) (from memberDB)',
        type: 'conditions',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld95BGdWauLUeE4L',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: true,
        helper: '',
      },
      {
        id: 'fldremcqSObFjY3pP',
        name: 'Brand Name',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldhpN3z7ztLZjPMc',
        name: 'Dose',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'You can skip this field if the medication name includes the dosage',
      },
      {
        id: 'fldGpL0sxGrQZotlr',
        name: 'Dosage Unit',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldmgFni4l4fDZeqF',
        name: 'Frequency',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'How often should this be taken?',
      },
      {
        id: 'fldtAenTsO7SLKWE4',
        name: 'Other frequency',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Frequency',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Frequency)) {
            return ['Other'].some((r) => values.Frequency.includes(r))
          }
          return ['Other'].includes(values.Frequency)
        },
      },
      {
        id: 'fldD1aEmsctOhxYVs',
        name: 'Route',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'How is this administered?\n',
      },
      {
        id: 'fldBBaStFOCgIIWSR',
        name: 'Other route',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Route',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Route)) {
            return ['Other'].some((r) => values.Route.includes(r))
          }
          return ['Other'].includes(values.Route)
        },
      },
      {
        id: 'fldq8s2qlrd8RNaGZ',
        name: 'Duration',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Enter the number of days the medication is to be taken ',
      },
      {
        id: 'fld6WjGYJyoYj6HRG',
        name: 'Quantity',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Enter the number of tabs, capsules or mL of liquid  taken per instance here',
      },
      {
        id: 'fld9bNvBJnCDualIv',
        name: 'Quantity Units',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldkJyzyyI2lqNPDS',
        name: 'Start Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldCmogYM9WXEnCqz',
        name: 'Scripts',
        type: 'multipleAttachment',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please upload any prescription that should be on file',
      },
      {
        id: 'fldfiJtWgiaX00gXG',
        name: 'Refillable',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldVHqcnqr6wZnisF',
        name: 'Instructions',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldGx1NFRXwWpIU5Q',
        name: 'Additional Instructions',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Instructions',
        parentValues: ['As directed'],
        condition: (values: any) => {
          if (Array.isArray(values.Instructions)) {
            return ['As directed'].some((r) => values.Instructions.includes(r))
          }
          return ['As directed'].includes(values.Instructions)
        },
      },
      {
        id: 'fldWQFX6QbtpS0aZ9',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please log any notes here that are important',
      },
      {
        id: 'fldzhc4XlQavjztsW',
        name: 'Prescription Refills',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl3iBWzYVWEpdLje',
        required: false,
        helper: '',
      },
      {
        id: 'fldOZqelFM03BLkFW',
        name: 'Prescribing facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flds2KBKMVuwj7mjs',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: true,
        helper: '',
      },
      {
        id: 'fldeCL4LwSAiILodY',
        name: 'Other prescribing facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Enter Other facility name with format Name - Location e.g Antara Health - Lavington',
        parentKey: 'Prescribing facility from Provider base',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Prescribing facility from Provider base'])
          ) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values['Prescribing facility from Provider base'].includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(
            values['Prescribing facility from Provider base']
          )
        },
      },
      {
        id: 'fldq8XrNhO2xTdUdH',
        name: 'Refill facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNynT0qvDI0nrw6',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: '',
      },
      {
        id: 'fldPXmDvLGxgPrh20',
        name: 'Other refill facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Enter Other facility name with format Name -Location e.g Antara Health - Lavington',
        parentKey: 'Refill facility from Provider base',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (Array.isArray(values['Refill facility from Provider base'])) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values['Refill facility from Provider base'].includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(
            values['Refill facility from Provider base']
          )
        },
      },
      {
        id: 'fldsHV3Kh5t0QshVK',
        name: 'Change of medication',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select YES if this medication has been prescribed as a result of a change in the current medication. It can be a change of dose or a change or drug.',
      },
    ],
  },
  {
    name: 'Member tasks',
    id: 'tbljwCFIDT2vG65AH',
    formId: 'shr1nZ8X0K7jPo3oq',
    fields: [
      {
        id: 'fldkv6teX0vK710bJ',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld3FmUu2F205JDkq',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fld1o1V0Wy0ou5Ttp',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld7yVfnf4oL3rV74',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldTiulR2UX2D7BK7',
        name: 'Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Appointment: allow the member to book an appointment with us\nData collection: allow the member to share measurement with us\nOpen data sharing: allow the member to share a picture or a message\nScreening - prebaseline\nScreening - self serve\nHMP review: push the link to HMP to the member for review',
      },
      {
        id: 'fldGg7O7GksO0PlqM',
        name: 'Data collection type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Data Collection'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Data Collection'].some((r) => values.Type.includes(r))
          }
          return ['Data Collection'].includes(values.Type)
        },
      },
      {
        id: 'fldPWBfz50yXLw6rT',
        name: 'Task duration',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the number of days the task will be active for the member. A notification will be sent every morning as long as the task is active.',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Data Collection', 'Open data sharing'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Data Collection', 'Open data sharing'].some((r) =>
              values.Type.includes(r)
            )
          }
          return ['Data Collection', 'Open data sharing'].includes(values.Type)
        },
      },
      {
        id: 'flduQp9AdjtNPe9wt',
        name: 'Appointment booking type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Appointment Booking'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Appointment Booking'].some((r) => values.Type.includes(r))
          }
          return ['Appointment Booking'].includes(values.Type)
        },
      },
      {
        id: 'fldglHZKc52Hlt2wx',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldApSta2CrBuQ5xX',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Physiotherapy Consultation',
    id: 'tblwa1zmfOng2aNA1',
    formId: 'shrIUxxcayh5fueyK',
    fields: [
      {
        id: 'fldNk3FbUqzGHSR0T',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldTiyikhirj9yc7A',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldPOyuznQaVyHZSu',
        name: 'member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld438GVtObQK0PVH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldcnNvYqWtMNsm1s',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldUCO8xejI0prRPk',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper:
          'Please select the appointment in the list so that the status can be automatically updated when your meeting is done',
      },
      {
        id: 'fldNxiqs8cugeOGG3',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldnEsF0u9HOfiIzQ',
        name: 'Consulting Clinician',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldf4B7pKtyDNgYAe',
        name: 'Referral source',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld1GQib8H9bS10bz',
        name: 'Other referral source',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Referral source',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Referral source'])) {
            return ['Other'].some((r) => values['Referral source'].includes(r))
          }
          return ['Other'].includes(values['Referral source'])
        },
      },
      {
        id: 'fldl5uoxLjmqzmEMl',
        name: 'Consultation type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldFvjEMvE47IpIf2',
        name: 'Appointment type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldXkSyiWBuWq6lQi',
        name: 'Follow-up #',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment type',
        parentValues: ['Follow-up'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment type'])) {
            return ['Follow-up'].some((r) =>
              values['Appointment type'].includes(r)
            )
          }
          return ['Follow-up'].includes(values['Appointment type'])
        },
      },
      {
        id: 'fldhWKvvmNITgB24P',
        name: 'Follow-up notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment type',
        parentValues: ['Follow-up'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment type'])) {
            return ['Follow-up'].some((r) =>
              values['Appointment type'].includes(r)
            )
          }
          return ['Follow-up'].includes(values['Appointment type'])
        },
      },
      {
        id: 'fldKXqkI5AD9jJdF9',
        name: 'Past medical hx',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment type',
        parentValues: ['Initial'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment type'])) {
            return ['Initial'].some((r) =>
              values['Appointment type'].includes(r)
            )
          }
          return ['Initial'].includes(values['Appointment type'])
        },
      },
      {
        id: 'fldetcdSlektueNd0',
        name: 'Past surgical hx',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment type',
        parentValues: ['Initial'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment type'])) {
            return ['Initial'].some((r) =>
              values['Appointment type'].includes(r)
            )
          }
          return ['Initial'].includes(values['Appointment type'])
        },
      },
      {
        id: 'fldlFqIQ3aWbr9OCA',
        name: 'Chief complaint',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldTjVHPU6C7iTziZ',
        name: 'On medications',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Is the member taking medications?',
      },
      {
        id: 'fldVQVHi8r9dJ6Lj5',
        name: 'Which medications?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'On medications',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['On medications'])) {
            return ['Yes'].some((r) => values['On medications'].includes(r))
          }
          return ['Yes'].includes(values['On medications'])
        },
      },
      {
        id: 'fldq6VhQ7gPTiumoO',
        name: 'Other external management?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldk28f5wT9KH6X75',
        name: 'Which management?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Other external management?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Other external management?'])) {
            return ['Yes'].some((r) =>
              values['Other external management?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Other external management?'])
        },
      },
      {
        id: 'fldaZ1NlG0sqCmVBI',
        name: 'Pain Score',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldjW8X56OyAt24i8',
        name: 'Review of systems with relevant findings',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldpYiXlFsYY9VYTU',
        name: 'ROS neck',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Neck'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Neck'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Neck'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldx6iXzdex2kiUWc',
        name: 'ROS Thoracic',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Thoracic'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Thoracic'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Thoracic'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldS7VG0GOPiK4ph3',
        name: 'ROS Shoulder',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Shoulder'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Shoulder'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Shoulder'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldxzG4uZsIYv5dWT',
        name: 'ROS Sacral',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Sacral'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Sacral'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Sacral'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldQ96QlhJ6muZFJZ',
        name: 'ROS Lumbar',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Lumbar'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Lumbar'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Lumbar'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldu9ajsRhYfqaSUJ',
        name: 'ROS Hip',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Hip'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Hip'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Hip'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'flda88FXkZI3Jjc9d',
        name: 'ROS Elbow',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Elbow'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Elbow'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Elbow'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldLTe21566hZIJbQ',
        name: 'ROS wrist',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Wrist'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Wrist'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Wrist'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldPWPnZchgkd2yLg',
        name: 'ROS knee',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Knee'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Knee'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Knee'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldOBaQP12MfaFMd1',
        name: 'ROS ankle',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Review of systems with relevant findings',
        parentValues: ['Ankle'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Review of systems with relevant findings'])
          ) {
            return ['Ankle'].some((r) =>
              values['Review of systems with relevant findings'].includes(r)
            )
          }
          return ['Ankle'].includes(
            values['Review of systems with relevant findings']
          )
        },
      },
      {
        id: 'fldPXakFfIvc0kltR',
        name: 'Provisional Diagnosis',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If you have identified a new condition, please enter it here: ',
      },
      {
        id: 'fldONvpMmrBtBe66x',
        name: 'Management',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Put in what you have done for the patient',
      },
      {
        id: 'fldruFeGlGwp6WOhb',
        name: 'Treatment Plan',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Next steps for the patient',
      },
      {
        id: 'fldnFUxSw72utPqaG',
        name: 'Other treatment plan',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Treatment Plan',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Treatment Plan'])) {
            return ['Other'].some((r) => values['Treatment Plan'].includes(r))
          }
          return ['Other'].includes(values['Treatment Plan'])
        },
      },
      {
        id: 'fldkb7pS6RspclPYi',
        name: 'Date of next appointment',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please book the next appointment with the member using calendly now if less than 10 days from today and enter the date here in the form (note that if the date is more than 10 days, a task for ME will be created so that they confirm the availability of the member)',
      },
      {
        id: 'fldZhpOo75n9kc8oY',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter any additional comments or observation you think are important\n\nif you identify a condition, please add the condition using a form in the guided workflow',
      },
    ],
  },
  {
    name: 'Mental Health Consultation',
    id: 'tblQb2OzaAh2weE2Q',
    formId: 'shrhYNq5OIeTDCUYy',
    fields: [
      {
        id: 'fldyXLrbRtzpI1Tub',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNVHu9ugcXfxG4p',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldHkeazkTY8UWXen',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldUAcY8lzGu20FpX',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldoBhEqAccOcIjiZ',
        name: 'Consulting Clinician',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldRuYkcSDR9gIiqi',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldQHnnOkg8A4te8l',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldkZCMhKmRyTUiZJ',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper:
          'Please select the appointment record so that we can update the status at the end of your consultation',
      },
      {
        id: 'fldS7KUfbvkGO1R4a',
        name: 'Referral source',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld2Cs0QXkWMr2WRh',
        name: 'Interaction type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldDlIh7yuoW03hWb',
        name: 'Counseling type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld89w1AKt0zvPSbL',
        name: 'Counseling type details',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Counseling type',
        parentValues: ['Family', 'Group'],
        condition: (values: any) => {
          if (Array.isArray(values['Counseling type'])) {
            return ['Family', 'Group'].some((r) =>
              values['Counseling type'].includes(r)
            )
          }
          return ['Family', 'Group'].includes(values['Counseling type'])
        },
      },
      {
        id: 'fldnG9LoiOoyTUED4',
        name: 'Consultation type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldqiZFUkf5q5TUBv',
        name: 'Family origin',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '* Parents: {names, age, current/ former occupation, hx of chronic illness}\n* Siblings: {names, age, occupation, hx of chronic illness}\n* Relationships with/ between family members: {cordial, strained, non-existent}\n* Family History of Mental Illness: {specify the illness, paternal/ maternal/ parent/ sibling}\n* Family History of Substance use: {specify the substance, pattern of use, paternal/ maternal/ parent/ sibling}',
        conditionType: '',
        parentKey: 'Consultation type',
        parentValues: ['Initial consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Initial consultation'].some((r) =>
              values['Consultation type'].includes(r)
            )
          }
          return ['Initial consultation'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldN1JyPajiW7V7IK',
        name: 'Family of Procreation',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '* Relationships with/ between family members: {partner/ children; cordial, strained, non-existent}\n* Family History of Mental Illness: {specify the illness, partner/ children}\n* Family History of Substance use: {specify the substance, pattern of use, partner/ children}',
        conditionType: '',
        parentKey: 'Consultation type',
        parentValues: ['Initial consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Initial consultation'].some((r) =>
              values['Consultation type'].includes(r)
            )
          }
          return ['Initial consultation'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldqXJpcH2NjVODL4',
        name: 'Social History',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '* Friends: {how many, nature of relationship - cordial/ strained}\n* Current relationships: {name, age, occupation, nature of relationship - cordial/ strained}\n* Sexual Orientation: {Heterosexual, Homosexual, Bisexual, Pansexual, Asexual, any other-specify}\n* Recreation activities: {Hobbies / area of interest}\n* Use of substances: {when it began, pattern of use, cessation, relapse}\n* Spiritual experience: {Religious affiliation, specific practices}\n* Premorbid personality: {functionality prior to the presenting symptoms}',
        conditionType: '',
        parentKey: 'Consultation type',
        parentValues: ['Initial consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Initial consultation'].some((r) =>
              values['Consultation type'].includes(r)
            )
          }
          return ['Initial consultation'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fld18bR1BaRMXN5ts',
        name: 'Personal History',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '* Birth: {delivery method}\n* Developmental milestones: {specify any delays, regression periods}\n* Childhood: {Family relationships in upbringing, Nursery and early schooling, socializing hx}\n* Adolescence: {School life and academic achievements, Pubertal development (physically and psychological)}\n* Past trauma: {any experiences in childhood, adolescence, adulthood}',
        conditionType: '',
        parentKey: 'Consultation type',
        parentValues: ['Initial consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Initial consultation'].some((r) =>
              values['Consultation type'].includes(r)
            )
          }
          return ['Initial consultation'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldXdwZ10YYICzrzA',
        name: 'Education and Work History',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '{Primary, high school, collage/ university, previous employment}',
        conditionType: '',
        parentKey: 'Consultation type',
        parentValues: ['Initial consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Initial consultation'].some((r) =>
              values['Consultation type'].includes(r)
            )
          }
          return ['Initial consultation'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldhsMxOF6jOwSSAV',
        name: 'Psychiatric history',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Specify disorder',
        conditionType: '!',
        parentKey: 'Consultation type',
        parentValues: ['Follow up'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Follow up'].some(
              (r) => !values['Consultation type'].includes(r)
            )
          }
          return !['Follow up'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldj4sKLaghbCiSla',
        name: 'On medication?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '!',
        parentKey: 'Consultation type',
        parentValues: ['Follow up'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Follow up'].some(
              (r) => !values['Consultation type'].includes(r)
            )
          }
          return !['Follow up'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldB9JTWXlo1DEgwY',
        name: 'Which medication?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'On medication?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['On medication?'])) {
            return ['Yes'].some((r) => values['On medication?'].includes(r))
          }
          return ['Yes'].includes(values['On medication?'])
        },
      },
      {
        id: 'fldqmsLJpqiH5TVW1',
        name: 'Psychological assessment & evaluation type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '!',
        parentKey: 'Consultation type',
        parentValues: ['Follow up'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Follow up'].some(
              (r) => !values['Consultation type'].includes(r)
            )
          }
          return !['Follow up'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldqbTncYbSSz8OHc',
        name: 'Which tool?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Psychological assessment & evaluation type',
        parentValues: ['Test / Screen'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Psychological assessment & evaluation type'])
          ) {
            return ['Test / Screen'].some((r) =>
              values['Psychological assessment & evaluation type'].includes(r)
            )
          }
          return ['Test / Screen'].includes(
            values['Psychological assessment & evaluation type']
          )
        },
      },
      {
        id: 'fldhKJfL0mPzGy9T7',
        name: 'Mental status examination',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Psychological assessment & evaluation type',
        parentValues: ['Interview / Mental health examination'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Psychological assessment & evaluation type'])
          ) {
            return ['Interview / Mental health examination'].some((r) =>
              values['Psychological assessment & evaluation type'].includes(r)
            )
          }
          return ['Interview / Mental health examination'].includes(
            values['Psychological assessment & evaluation type']
          )
        },
      },
      {
        id: 'fldSNGlqqbbCRAh4M',
        name: 'Provisional Diagnosis',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '!',
        parentKey: 'Consultation type',
        parentValues: ['Follow up'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Follow up'].some(
              (r) => !values['Consultation type'].includes(r)
            )
          }
          return !['Follow up'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldeQCHV5HlDcesVM',
        name: 'Confirmed Diagnosis using DSM-5 criteria',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '!',
        parentKey: 'Consultation type',
        parentValues: ['Follow up'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Follow up'].some(
              (r) => !values['Consultation type'].includes(r)
            )
          }
          return !['Follow up'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldsSvh6dVJRjuv0c',
        name: 'Plan',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldxFv7SOVCHBJQJP',
        name: 'Providers',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldw0qdFv2DtYbvX1',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Referral'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Referral'].some((r) => values.Plan.includes(r))
          }
          return ['Referral'].includes(values.Plan)
        },
      },
      {
        id: 'fldCTXw4pafX6PuPo',
        name: 'Next appointment',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please book the next appointment with the member using calendly now if less than 10 days from today and enter the date here in the form (note that if the date is more than 10 days, a task for ME will be created so that they confirm the availability of the member)',
      },
      {
        id: 'fldRzlWo9idLzYGIy',
        name: 'Notes',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Clinical Consultation',
    id: 'tblLhL72JyizQ4ycc',
    formId: 'shrPWg4S3LYxHbgmv',
    fields: [
      {
        id: 'fldig3jhN9bqflF1u',
        name: 'Consultation Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldpGMSDrfLJjMILW',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNAdbDUypCHkcq4',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fld3ArFgEyyGCW8Y3',
        name: 'Consulting Clinician',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldvPiE0jId7PD7VD',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fldh2kcBumJq9eaM1',
        name: 'Minor',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldQuwWZXJT8JLJDr',
        name: 'Interaction type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldLEHx8g2IjQSYoH',
        name: 'Initial vs FU',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldQsjPejgDj3FyHk',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldz7vf0iwdAq5AuW',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: true,
        helper:
          'Please add the appointment record here. If you do not, the appointment will not be automatically marked as completed',
        parentKey: 'Consultation Type',
        parentValues: ['Refillable medication prescription'],
        toggleRequriedOnCondition: true,
        conditionType: '',
        requirementCondition: (values: any) => {
          if (Array.isArray(values?.['Consultation Type'])) {
            return ['Refillable medication prescription'].some((r) =>
              values?.['Consultation Type'].includes(r)
            )
          }

          return ['Refillable medication prescription'].includes(
            values?.['Consultation Type']
          )
        },
      },
      {
        id: 'fld7J2NcNxZyYDOQm',
        name: 'Conditions (from MemberDB)',
        type: 'conditions',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldQKRpnV6wF2L6EG',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: false,
        helper:
          'Please link this consultation form to the condition(s) that was reviewed or discussed or diagnosed during this consultation',
      },
      {
        id: 'fld7papvjJHJd4IIH',
        name: 'Date of Consultation',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld883QZW8r2qFZgE',
        name: 'Visit Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldGqyonxPD5Hl3HJ',
        name: 'Chief Complaint',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldzvMmjxZA84FgkN',
        name: 'Milestone attainment',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Minor',
        parentValues: ['yes'],
        condition: (values: any) => {
          if (Array.isArray(values.Minor)) {
            return ['yes'].some((r) => values.Minor.includes(r))
          }
          return ['yes'].includes(values.Minor)
        },
      },
      {
        id: 'fldfRS5yERrJDR1qs',
        name: 'Vaccination status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Minor',
        parentValues: ['yes'],
        condition: (values: any) => {
          if (Array.isArray(values.Minor)) {
            return ['yes'].some((r) => values.Minor.includes(r))
          }
          return ['yes'].includes(values.Minor)
        },
      },
      {
        id: 'fldNqJUSMFNpwhAKB',
        name: 'PMH',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld3sFkfqGYCh2e8O',
        name: 'Any Medication Allergies',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldO3AWdw2bq4AWSZ',
        name: 'Please specify the Allergy',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Any Medication Allergies',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Any Medication Allergies'])) {
            return ['Yes'].some((r) =>
              values['Any Medication Allergies'].includes(r)
            )
          }
          return ['Yes'].includes(values['Any Medication Allergies'])
        },
      },
      {
        id: 'fld1Fj1fOCb1Yk493',
        name: 'Temperature (C)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldDaDJeycGHbjSck',
        name: 'Please select the system(s) with a relevant finding',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please select the system(s) with a relevant finding',
      },
      {
        id: 'fldPGWPZ1Lqwz6Ap1',
        name: 'Please describe the NEUROLOGIC findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Neurologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Neurologic'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Neurologic'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldaMYgEU3pioWoOl',
        name: 'Please describe the HEENT findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['HEENT'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['HEENT'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['HEENT'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fld9Y0ltfSjauLcyJ',
        name: 'Please describe the CARDIOVASCULAR findings ',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Cardiovascular'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Cardiovascular'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Cardiovascular'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldplMNVCfE17cbxQ',
        name: 'Please describe the PULMONARY findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Pulmonary'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Pulmonary'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Pulmonary'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldqENthqHDFfVvOs',
        name: 'Please describe the GASTROINTESTINAL findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Gastrointestinal'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Gastrointestinal'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Gastrointestinal'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fld77D1aYPSm2e88F',
        name: 'Please describe the GU findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['GU'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['GU'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['GU'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldjbE58hQhu1VZNp',
        name: 'ROS Neck',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Neck'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Neck'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Neck'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldc3LoVvE7OfcgxU',
        name: 'Please describe the EXTREMITIES findings ',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Extremities'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Extremities'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Extremities'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldbhHIMuWsDlTmgT',
        name: 'Please describe the DERMATOLOGIC findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Dermatologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Dermatologic'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Dermatologic'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'fldpcBwYMq2NgzjGA',
        name: 'Please describe the OTHER systems findings',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Other'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Other'].includes(
            values['Please select the system(s) with a relevant finding']
          )
        },
      },
      {
        id: 'flds3vdOIFPGUIoIy',
        name: 'Please upload any relevant images or files here',
        type: 'multipleAttachment',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldvsIQYDpSOIdqhD',
        name: 'LMP',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldix1yciXUUbOIr1',
        name: 'Were you able to conduct a Physical Examination?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldZHnbqxsdJzjwfT',
        name: 'Type of Physical Examination',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Were you able to conduct a Physical Examination?',
        parentValues: ['Yes', 'In-person'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Were you able to conduct a Physical Examination?']
            )
          ) {
            return ['Yes', 'In-person'].some((r) =>
              values[
                'Were you able to conduct a Physical Examination?'
              ].includes(r)
            )
          }
          return ['Yes', 'In-person'].includes(
            values['Were you able to conduct a Physical Examination?']
          )
        },
      },
      {
        id: 'fldar9fkX45bR90P5',
        name: 'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldgcKK3PW3AQThhf',
        name: 'PE NEUROLOGIC findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Neuro'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Neuro'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Neuro'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldRvtMsyjxgUFqPs',
        name: 'PE HEENT findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['HEENT'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['HEENT'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['HEENT'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldZ6vNq8WMa38vkc',
        name: 'PE CARDIOVASCULAR findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Cardiovascular'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Cardiovascular'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Cardiovascular'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldG3gBooS9VL9ZcK',
        name: 'PE PULMONARY findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Pulmonary'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Pulmonary'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Pulmonary'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldthpD8YoBg1VMTz',
        name: 'PE GASTROINTESTINAL findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Gastrointestinal'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Gastrointestinal'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Gastrointestinal'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldgH8vNkXXXcrCQz',
        name: 'PE GU findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['GU'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['GU'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['GU'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldiAqzMzTfqJwyAK',
        name: 'PE EXTREMITIES findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Extremities'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Extremities'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Extremities'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldRR9coRETOma9St',
        name: 'PE DERMATOLOGIC findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Dermatologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Dermatologic'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Dermatologic'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldGgr7KineUHmXAY',
        name: 'PE OTHER findings',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ]
            )
          ) {
            return ['Other'].some((r) =>
              values[
                'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
              ].includes(r)
            )
          }
          return ['Other'].includes(
            values[
              'Please select the system(s) with a relevant PHYSICAL EXAMINATION finding'
            ]
          )
        },
      },
      {
        id: 'fldlhNsjrqOqZIO51',
        name: 'Primary Diagnosis',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'if identify new condition, please add a condition using a form',
      },
      {
        id: 'fldQ4GtalrF5Kumkb',
        name: 'Secondary Diagnosis',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldHaKX13hPhsBI49',
        name: 'Assessment',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please summarize what you think is going on with the patient here',
      },
      {
        id: 'fld5mzMe9DBw1tOXR',
        name: 'Plan',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Select the next steps in the care of this patient',
      },
      {
        id: 'fldNCG4qkvP5EqCs1',
        name: 'Lab/imaging management',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldwXTM9HtvpkCXsE',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblYOGN4iEGRc3Mjm',
        required: false,
        helper:
          'When requesting for lab or imaging, if the the request already exist in our system, please select it in the dropdown so that we can update the status automatically. If it is a new request, the lab/imaging record will automatically be created in our system once you submit this form',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Order Labs', 'Order Radiologic Examinations'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Order Labs', 'Order Radiologic Examinations'].some((r) =>
              values.Plan.includes(r)
            )
          }
          return ['Order Labs', 'Order Radiologic Examinations'].includes(
            values.Plan
          )
        },
      },
      {
        id: 'fldfw0IXDwO7Z4rc8',
        name: 'Providers coordination notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please add as many information as possible for each providers (specialist and facility) for the different plan. If several plan, add information for each provider as well. Information can be about preferred practician, location, etc... This data will be shared with ME for appointment coordination',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: [
          'Order Labs',
          'Order Radiologic Examinations',
          'Refer for in-person Consultation',
          'Refer to a Specialist',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return [
              'Order Labs',
              'Order Radiologic Examinations',
              'Refer for in-person Consultation',
              'Refer to a Specialist',
            ].some((r) => values.Plan.includes(r))
          }
          return [
            'Order Labs',
            'Order Radiologic Examinations',
            'Refer for in-person Consultation',
            'Refer to a Specialist',
          ].includes(values.Plan)
        },
      },
      {
        id: 'fldx9wihQQxDLZb8s',
        name: 'Other plan?',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Other'].some((r) => values.Plan.includes(r))
          }
          return ['Other'].includes(values.Plan)
        },
      },
      {
        id: 'fldVlM0jKJvDVftC3',
        name: 'Reason for referral',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: [
          'Refer to a Specialist',
          'Refer for in-person Consultation',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return [
              'Refer to a Specialist',
              'Refer for in-person Consultation',
            ].some((r) => values.Plan.includes(r))
          }
          return [
            'Refer to a Specialist',
            'Refer for in-person Consultation',
          ].includes(values.Plan)
        },
      },
      {
        id: 'fldaomDGBfdks4ude',
        name: 'Routine labs (synced view from lab base)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldRTcRqRxpvhbjXg',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblV0rNDZCPe3ZalK',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Order Labs'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Order Labs'].some((r) => values.Plan.includes(r))
          }
          return ['Order Labs'].includes(values.Plan)
        },
      },
      {
        id: 'fldIm1MgrlUbN9ZVo',
        name: 'Type of radiology test',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Order Radiologic Examinations'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Order Radiologic Examinations'].some((r) =>
              values.Plan.includes(r)
            )
          }
          return ['Order Radiologic Examinations'].includes(values.Plan)
        },
      },
      {
        id: 'fldPYc0UXNXw9aATM',
        name: 'Type of X-Ray',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Type of radiology test',
        parentValues: ['X-Ray'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of radiology test'])) {
            return ['X-Ray'].some((r) =>
              values['Type of radiology test'].includes(r)
            )
          }
          return ['X-Ray'].includes(values['Type of radiology test'])
        },
      },
      {
        id: 'fldvHx7mUnX3Qwayt',
        name: 'Type of Ultrasound',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Type of radiology test',
        parentValues: ['Ultrasound'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of radiology test'])) {
            return ['Ultrasound'].some((r) =>
              values['Type of radiology test'].includes(r)
            )
          }
          return ['Ultrasound'].includes(values['Type of radiology test'])
        },
      },
      {
        id: 'fldKieyqIGBfVofYY',
        name: 'Type of CT Scan',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Type of radiology test',
        parentValues: ['CT Scan'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of radiology test'])) {
            return ['CT Scan'].some((r) =>
              values['Type of radiology test'].includes(r)
            )
          }
          return ['CT Scan'].includes(values['Type of radiology test'])
        },
      },
      {
        id: 'fldzxsURh4yWUaOXB',
        name: 'Type of MRI',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Type of radiology test',
        parentValues: ['MRI'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of radiology test'])) {
            return ['MRI'].some((r) =>
              values['Type of radiology test'].includes(r)
            )
          }
          return ['MRI'].includes(values['Type of radiology test'])
        },
      },
      {
        id: 'fld5m4zrHmP31e0uv',
        name: 'Other Radiology test',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: [
          'Type of X-Ray',
          'Type of MRI',
          'Type of Ultrasound',
          'Type of CT Scan',
          'Echocardiogram',
        ],
        parentValues: ['Other:'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of X-Ray'])) {
            return ['Other:'].some((r) => values['Type of X-Ray'].includes(r))
          }
          if (Array.isArray(values['Type of MRI'])) {
            return ['Other:'].some((r) => values['Type of MRI'].includes(r))
          }
          if (Array.isArray(values['Type of Ultrasound'])) {
            return ['Other:'].some((r) =>
              values['Type of Ultrasound'].includes(r)
            )
          }
          if (Array.isArray(values['Type of CT Scan'])) {
            return ['Other:'].some((r) => values['Type of CT Scan'].includes(r))
          }
          if (Array.isArray(values.Echocardiogram)) {
            return ['Other:'].some((r) => values.Echocardiogram.includes(r))
          }
          return ['Other:'].includes(values['Type of X-Ray'])
        },
      },
      {
        id: 'fldsNwD20slDl4Dg1',
        name: 'Other lab test',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'What lab tests would you like to order?',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What lab tests would you like to order?'])
          ) {
            return ['Other'].some((r) =>
              values['What lab tests would you like to order?'].includes(r)
            )
          }
          return ['Other'].includes(
            values['What lab tests would you like to order?']
          )
        },
      },
      {
        id: 'fldJRvi9GdbW31PYc',
        name: 'Previous imaging result',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Order Radiologic Examinations'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Order Radiologic Examinations'].some((r) =>
              values.Plan.includes(r)
            )
          }
          return ['Order Radiologic Examinations'].includes(values.Plan)
        },
      },
      {
        id: 'fldC1uCP4mTcA6SRn',
        name: 'Medication',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'if you prescribe a medication, please add the it using a form in the guided workflow',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: ['Prescribe Medications'],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return ['Prescribe Medications'].some((r) =>
              values.Plan.includes(r)
            )
          }
          return ['Prescribe Medications'].includes(values.Plan)
        },
      },
      {
        id: 'fldkAHqczThmfdTfd',
        name: 'Sick days required',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'The member needs sick days?',
      },
      {
        id: 'fldn4t3Jv9RheLWZU',
        name: 'Sick days number',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter the number of sick days required',
        conditionType: '',
        parentKey: 'Sick days required',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Sick days required'])) {
            return ['Yes'].some((r) => values['Sick days required'].includes(r))
          }
          return ['Yes'].includes(values['Sick days required'])
        },
      },
      {
        id: 'fldgb3pmJRmhwoYa8',
        name: 'Next appointment',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please book the next appointment with the member using calendly now if less than 10 days from today and enter the date here in the form (note that if the date is more than 10 days, a task for ME will be created so that they confirm the availability of the member)',
      },
      {
        id: 'fldriphoZRDX96JyD',
        name: 'Please write in any additional comments or observation you think are important',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'This is the place you can write anything you want to document about the patient\n Need to create a task for the HN team? Please add a HN task using the form',
      },
      {
        id: 'fldPDOnQ4PpfE46WY',
        name: 'Consultation type - billing',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Only for billing purpose. \nAll Blue options are billable.\nAll Yellow Options are not billable.',
      },
      {
        id: 'fldt0PbRoCHuNlRQK',
        name: 'Date of first diagnosis of this condition',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: "This field is used to fill in GA's claim form.",
        conditionType: '',
        parentKey: 'Insurance Provider',
        parentValues: ['GA insurance'],
        condition: (values: any) => {
          if (Array.isArray(values['Insurance Provider'])) {
            return ['GA insurance'].some((r) =>
              values['Insurance Provider'].includes(r)
            )
          }
          return ['GA insurance'].includes(values['Insurance Provider'])
        },
      },
      {
        id: 'fld266ZMLYKJLahbD',
        name: 'Has the patient suffered from this complaint previously?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: "This field is used to fill in GA's claim form.",
        conditionType: '',
        parentKey: 'Insurance Provider',
        parentValues: ['GA insurance'],
        condition: (values: any) => {
          if (Array.isArray(values['Insurance Provider'])) {
            return ['GA insurance'].some((r) =>
              values['Insurance Provider'].includes(r)
            )
          }
          return ['GA insurance'].includes(values['Insurance Provider'])
        },
      },
      {
        id: 'fldoCRXun8dC87Yit',
        name: 'Date they suffered from the complaint',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: "This field is used to fill in GA's claim form.",
        conditionType: '',
        parentKey: 'Insurance Provider',
        parentValues: ['GA insurance'],
        condition: (values: any) => {
          if (Array.isArray(values['Insurance Provider'])) {
            return ['GA insurance'].some((r) =>
              values['Insurance Provider'].includes(r)
            )
          }
          return ['GA insurance'].includes(values['Insurance Provider'])
        },
      },
      {
        id: 'fldshRE6TSHucsN0B',
        name: 'Name of the treatment and drug prescribed',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: "This field is used to fill in GA's claim form.",
        conditionType: '',
        parentKey: 'Insurance Provider',
        parentValues: ['GA insurance'],
        condition: (values: any) => {
          if (Array.isArray(values['Insurance Provider'])) {
            return ['GA insurance'].some((r) =>
              values['Insurance Provider'].includes(r)
            )
          }
          return ['GA insurance'].includes(values['Insurance Provider'])
        },
      },
    ],
  },
  {
    name: 'HMP',
    id: 'tblMKwFctRYwBYHgt',
    formId: 'shrLf0JnXDQ7jNxOg',
    helper:
      'HMP intake form should only be used for HMP2,3 and 4. For HMP1, the HMP record is created automatically',
    fields: [
      {
        id: 'flddquJOgORTpcHUT',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldsYxL4P4hHqBdJS',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldfC9gKlDT3fePv9',
        name: 'HMP #',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'flduWeSe3ybVzufwZ',
        name: 'HMP Link',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldr1VOEwRtLo32tW',
        name: 'HMP State',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldOOenkIsR5cpVbL',
        name: 'Monitoring Kits',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldbjYMug1G5qLM6H',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl6PAXT80XyT7mAN',
        required: false,
        helper: '',
      },
      {
        id: 'fld42ufFsk2PwpcYx',
        name: 'HN Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'PAFU',
    id: 'tblxLXrtmAgf3D3x9',
    formId: 'shrCRi52uE0oDSpme',
    fields: [
      {
        id: 'fld2x7JNi1J2WcXyD',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8bjXe4wYsEkeI9',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldPliLtE6ZkSpmMq',
        name: 'Appointment Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldBH0ALQhc0FUQH5',
        name: 'Appointment',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldHWOyKKk9xUKpT6',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: true,
        helper: '',
      },
      {
        id: 'fldif086hra6vZMua',
        name: 'Clinical Consultation',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldqZQI9QPu6BKHhG',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLhL72JyizQ4ycc',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: [
          'Virtual Consultation',
          'Antara Virtual Doctor Consultation',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return [
              'Virtual Consultation',
              'Antara Virtual Doctor Consultation',
            ].some((r) => values['Appointment Type'].includes(r))
          }
          return [
            'Virtual Consultation',
            'Antara Virtual Doctor Consultation',
          ].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fld0l524aF4xCFQ7U',
        name: 'Reason for admission',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: ['Inpatient'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Inpatient'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Inpatient'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldkE6CLmWYy2zsYZ',
        name: 'Date of Admission',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: ['Inpatient'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Inpatient'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Inpatient'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldXiz0JTvdofrYFd',
        name: 'Date of Discharge',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: ['Inpatient'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Inpatient'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Inpatient'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldo2cZXIQQhlaZQy',
        name: 'Attended appointment?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: [
          'Outpatient',
          'Virtual Consultation',
          'Antara Virtual Doctor Consultation',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return [
              'Outpatient',
              'Virtual Consultation',
              'Antara Virtual Doctor Consultation',
            ].some((r) => values['Appointment Type'].includes(r))
          }
          return [
            'Outpatient',
            'Virtual Consultation',
            'Antara Virtual Doctor Consultation',
          ].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldRoF1EdEceIzzX6',
        name: 'Reason for Missed Appointments',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Missed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Missed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Missed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fld5mujINwNYetA1Z',
        name: 'Facilities',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldOsOBfMzPbDNSGi',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper:
          'Please select the facility the member was sent to for the appointment',
      },
      {
        id: 'fld9M6Et2Z3zvJcdp',
        name: 'Other Facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Fill in the Facility not found in the provider base. Enter Other facility name with format Name -Location e.g Antara Health - Lavington',
        parentKey: 'Facilities',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (Array.isArray(values.Facilities)) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values.Facilities.includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(values.Facilities)
        },
      },
      {
        id: 'fldP9UxdCfKvgAE8u',
        name: 'Specialists',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flduZYLsmRuWQZc3C',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblsixUe3jfbOUMQP',
        required: false,
        helper:
          'Please select the specialist the member was sent to for the appointment',
        conditionType: '!',
        parentKey: 'Appointment Type',
        parentValues: [
          'Virtual Consultation',
          'Antara Virtual Doctor Consultation',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ![
              'Virtual Consultation',
              'Antara Virtual Doctor Consultation',
            ].some((r) => !values['Appointment Type'].includes(r))
          }
          return ![
            'Virtual Consultation',
            'Antara Virtual Doctor Consultation',
          ].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldsZjcqBRwDEL8XD',
        name: 'Other Specialist',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Fill in the Specialist not found in the provider base. Enter Other facility name with format Name -Location e.g Dr Grace - Antara',
        parentKey: 'Specialists',
        parentValues: ['rec0n79m4zKaXuZJD'],
        condition: (values: any) => {
          if (Array.isArray(values.Specialists)) {
            return ['rec0n79m4zKaXuZJD'].some((r) =>
              values.Specialists.includes(r)
            )
          }
          return ['rec0n79m4zKaXuZJD'].includes(values.Specialists)
        },
      },
      {
        id: 'fld7bh8tSoQEvygHA',
        name: 'Received reminder',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Indicate, "true" if the BN received an appointment reminder from a HN',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: ['Outpatient'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Outpatient'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Outpatient'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldaxAf2DzEB4K1NR',
        name: 'Antara awareness',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldR3THjSjS0qcm23',
        name: 'Received diagnosis',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Indicate whether beneficiary received a diagnosis at the clinic/virtual consultation',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldg0oZjJXYotm5xY',
        name: 'Diagnosis',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        formId: 'shreJWFrTNVXs6RKW',
        ctlabel: 'Enter condition',
        helper: 'To enter a new condition diagnosed, please click the button',
        conditionType: '',
        parentKey: 'Received diagnosis',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received diagnosis'])) {
            return ['True'].some((r) =>
              values['Received diagnosis'].includes(r)
            )
          }
          return ['True'].includes(values['Received diagnosis'])
        },
      },
      {
        id: 'fldfy6pieOjk5VMlK',
        name: 'Had lab test',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Indicate if laboratory test was done',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldBiSwObftYtsQXU',
        name: 'Lab test purpose',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'What does the BN think the lab test was for?',
        conditionType: '',
        parentKey: 'Had lab test',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Had lab test'])) {
            return ['True'].some((r) => values['Had lab test'].includes(r))
          }
          return ['True'].includes(values['Had lab test'])
        },
      },
      {
        id: 'fldX16W4KrGWml0Tk',
        name: 'Had imaging (Ray, CT Scan, Ultrasound or MRI)',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: ' X-Ray, CT Scan, Ultrasound or MRI',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldiNEp8hTtXdoMZ2',
        name: 'Imaging purpose',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Why does the BN think the imaging was done?',
        conditionType: '',
        parentKey: 'Had imaging (Ray, CT Scan, Ultrasound or MRI)',
        parentValues: ['True'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Had imaging (Ray, CT Scan, Ultrasound or MRI)']
            )
          ) {
            return ['True'].some((r) =>
              values['Had imaging (Ray, CT Scan, Ultrasound or MRI)'].includes(
                r
              )
            )
          }
          return ['True'].includes(
            values['Had imaging (Ray, CT Scan, Ultrasound or MRI)']
          )
        },
      },
      {
        id: 'fldKuQxgNAX9ZD5O7',
        name: 'Received referral',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Indicate, "true" if the BN was referred',
      },
      {
        id: 'fldm1j94N45O3Sjzv',
        name: 'Facility referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldc9uoRNXlbGtK7V',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: 'Optional - select the facility the member was referred to',
        conditionType: '!',
        parentKey: 'Know imaging purpose',
        parentValues: ['True'],
        condition: (values: any) => {
          const receivedReferralCondition = Array.isArray(
            values['Received referral']
          )
            ? ['True'].some((r) => values['Received referral'].includes(r))
            : ['True'].includes(values['Received referral'])

          const appointmentTypeCondition = Array.isArray(
            values['Appointment Type']
          )
            ? ![
                'Virtual Consultation',
                'Antara Virtual Doctor Consultation',
              ].some((r) => values['Appointment Type'].includes(r))
            : ![
                'Virtual Consultation',
                'Antara Virtual Doctor Consultation',
              ].includes(values['Appointment Type'])
          return receivedReferralCondition && appointmentTypeCondition
        },
      },
      {
        id: 'fld9FOJovz6xQsfAY',
        name: 'Other Facility Referred',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Fill in the Facility Referred not found in the provider base',
        parentKey: 'Facility referred',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (Array.isArray(values['Facility referred'])) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values['Facility referred'].includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(values['Facility referred'])
        },
      },
      {
        id: 'fldxalPpB7900nBDE',
        name: 'Provider referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldn4KkCzCv1UK8Gb',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: 'Which provider has been referred to the member?',
        conditionType: '',
        parentKey: 'Received referral',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received referral'])) {
            return ['True'].some((r) => values['Received referral'].includes(r))
          }
          return ['True'].includes(values['Received referral'])
        },
      },
      {
        id: 'flds0QnIgjTBoyyVZ',
        name: 'Other Referral',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please describre the referral and inform CS that they need to add the provider in our blue base',
        parentKey: 'Provider referred',
        parentValues: ['recE0m2e4jKISKlRM'],
        condition: (values: any) => {
          if (Array.isArray(values['Provider referred'])) {
            return ['recE0m2e4jKISKlRM'].some((r) =>
              values['Provider referred'].includes(r)
            )
          }
          return ['recE0m2e4jKISKlRM'].includes(values['Provider referred'])
        },
      },
      {
        id: 'fldFyWLKY34jdfElN',
        name: 'Specialist referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldqdnAoI0EaNkhs4',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblsixUe3jfbOUMQP',
        required: false,
        helper: '',
        condition: (values: any) => {
          if (Array.isArray(values['Received referral'])) {
            return ['True'].some((r) => values['Received referral'].includes(r))
          }
          return ['True'].includes(values['Received referral'])
        },
      },
      {
        id: 'fldDdb8Tcyb6bFS4G',
        name: 'Other Specialist Referred',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Fill in the Specialist Referred not found in the provider base',
        parentKey: 'Specialist referred',
        parentValues: ['rec0n79m4zKaXuZJD'],
        condition: (values: any) => {
          if (Array.isArray(values['Specialist referred'])) {
            return ['rec0n79m4zKaXuZJD'].some((r) =>
              values['Specialist referred'].includes(r)
            )
          }
          return ['rec0n79m4zKaXuZJD'].includes(values['Specialist referred'])
        },
      },
      {
        id: 'fldyDZpY0yspXyZhV',
        name: 'Referral appointment booked?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'flddSeUAwseWD5ONF',
        name: 'Referral Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Enter the date the member expects to go for the referral if available. (We will use this to auto create an appointment for them)',
        conditionType: '',
        parentKey: 'Received referral',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received referral'])) {
            return ['True'].some((r) => values['Received referral'].includes(r))
          }
          return ['True'].includes(values['Received referral'])
        },
      },
      {
        id: 'fldivgxkAYBNzcFVn',
        name: 'Reason for Referral',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Indicate why the BN believes the referral was made',
        conditionType: '',
        parentKey: 'Received referral',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received referral'])) {
            return ['True'].some((r) => values['Received referral'].includes(r))
          }
          return ['True'].includes(values['Received referral'])
        },
      },
      {
        id: 'fldVKPGPUJvj3O1hs',
        name: 'Received medication',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldrnOG8oWTBmDNa6',
        name: 'Accepted Medications?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Received medication',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received medication'])) {
            return ['True'].some((r) =>
              values['Received medication'].includes(r)
            )
          }
          return ['True'].includes(values['Received medication'])
        },
      },
      {
        id: 'fldUph3fBxhRRfk9O',
        name: 'Medication Information available',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please indicate whether the member has all the medications information to allow you fill in the prescription form. If not available, we will auto create a task for you to collect medications information from them later.',
        conditionType: '',
        parentKey: 'Accepted Medications?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Accepted Medications?'])) {
            return ['Yes'].some((r) =>
              values['Accepted Medications?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Accepted Medications?'])
        },
      },
      {
        id: 'fldek01rSiqsfW6UZ',
        name: 'Medication',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'if a medication was prescribed, please add it using a form in the guided workflow.',
        conditionType: '',
        parentKey: 'Received medication',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received medication'])) {
            return ['True'].some((r) =>
              values['Received medication'].includes(r)
            )
          }
          return ['True'].includes(values['Received medication'])
        },
      },
      {
        id: 'fldK8jQHBoDTizGZa',
        name: 'Know medication purpose',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Received medication',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received medication'])) {
            return ['True'].some((r) =>
              values['Received medication'].includes(r)
            )
          }
          return ['True'].includes(values['Received medication'])
        },
      },
      {
        id: 'fld4FEwNyskSw78YF',
        name: 'Medication purpose',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Describe the BN understanding of why the medication was prescribed',
        parentKey: 'Medication Information available',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Medication Information available'])) {
            return ['True'].some((r) =>
              values['Medication Information available'].includes(r)
            )
          }
          return ['True'].includes(values['Medication Information available'])
        },
      },
      {
        id: 'fldOwUtLyyufZZfgE',
        name: 'Health management plan',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Indicate, "true" if the BN was given a clear management plan by the clinician',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldensWJgGcJVyQlz',
        name: 'Health management plan description',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Health management plan',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Health management plan'])) {
            return ['True'].some((r) =>
              values['Health management plan'].includes(r)
            )
          }
          return ['True'].includes(values['Health management plan'])
        },
      },
      {
        id: 'fldfjMpeQn66c2BZh',
        name: 'Symptoms progress',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Discuss with member and please indicates if the symptom(s) or the condition(s) have been progressing',
      },
      {
        id: 'fldTwoq14mBNFbo2h',
        name: 'New symptoms',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Symptoms progress',
        parentValues: ['New Symptoms', 'Worsening Symptoms'],
        condition: (values: any) => {
          if (Array.isArray(values['Symptoms progress'])) {
            return ['New Symptoms', 'Worsening Symptoms'].some((r) =>
              values['Symptoms progress'].includes(r)
            )
          }
          return ['New Symptoms', 'Worsening Symptoms'].includes(
            values['Symptoms progress']
          )
        },
      },
      {
        id: 'fld3pysmxIi5RPBy6',
        name: 'Additional information',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please add any other relevant information here',
      },
      {
        id: 'fldSma0M083k2xKzf',
        name: 'Received next appointment',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'flduov8GXVi7yCC91',
        name: 'Requires a VC follow-up?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If the Virtual Consultation requires a follow-up, please book the follow-up with our Virtual Doctor',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: [
          'Virtual Consultation',
          'Antara Virtual Doctor Consultation',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return [
              'Virtual Consultation',
              'Antara Virtual Doctor Consultation',
            ].some((r) => values['Appointment Type'].includes(r))
          }
          return [
            'Virtual Consultation',
            'Antara Virtual Doctor Consultation',
          ].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldSfUmB82GITIQd2',
        name: 'Next appointment date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Received next appointment',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Received next appointment'])) {
            return ['True'].some((r) =>
              values['Received next appointment'].includes(r)
            )
          }
          return ['True'].includes(values['Received next appointment'])
        },
      },
      {
        id: 'fldTaskK2IeiCKhAa',
        name: 'Asked to make payment',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldzHpK9XKURy1g92',
        name: 'Payment purpose',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Asked to make payment',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Asked to make payment'])) {
            return ['True'].some((r) =>
              values['Asked to make payment'].includes(r)
            )
          }
          return ['True'].includes(values['Asked to make payment'])
        },
      },
      {
        id: 'fldNGGX4e8YpF9YXX',
        name: 'Payment amount',
        type: 'number',
        format: 'currency',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Asked to make payment',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Asked to make payment'])) {
            return ['True'].some((r) =>
              values['Asked to make payment'].includes(r)
            )
          }
          return ['True'].includes(values['Asked to make payment'])
        },
      },

      {
        id: 'fldzX2CKNgyLoeoe1',
        name: 'Feedback',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please put any additional feedback the BN has on Avenue here',
        conditionType: '',
        parentKey: 'Attended appointment?',
        parentValues: ['Completed'],
        condition: (values: any) => {
          if (Array.isArray(values['Attended appointment?'])) {
            return ['Completed'].some((r) =>
              values['Attended appointment?'].includes(r)
            )
          }
          return ['Completed'].includes(values['Attended appointment?'])
        },
      },
      {
        id: 'fldobmRcPY3eQXCBU',
        name: 'Flag for review',
        type: 'checkbox',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Logistics Tasks',
    id: 'tblJmoQGSS2vl8u9g',
    formId: 'shruHjY6gGmXxdags',
    fields: [
      {
        id: 'fldTJ6nR54ydrQSYR',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld9EuLrH7Y3ouPgD',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldfbRAhzzdCCLKfl',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld24hFHD6OS3p3kE',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper:
          'Please insert the member if the task concerns a specific member',
      },
      {
        id: 'fldHzd7G3aRKV2ylY',
        name: 'Type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select the type of tasks you want the riders to perform. Remember to always select weight measurement if any of blood sugar, HbA1c, lipid panel, blood pressure, bp kit delivery or glucometer delivery',
      },
      {
        id: 'fldV9AmtTGkiKRQbs',
        name: 'Other task type',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Describe the task to be performed',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Other'].some((r) => values.Type.includes(r))
          }
          return ['Other'].includes(values.Type)
        },
      },
      {
        id: 'fld91H8VjMjf8q5Uq',
        name: 'Beneficiary',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'When the task is not linked to a member, you can add a beneficiary, who is the person that will received or delivered the item associated to the task.',
      },
      {
        id: 'fldco9YyzkrTZgNad',
        name: 'Prescriptions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldX1idlF8QkShQIK',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl3iBWzYVWEpdLje',
        required: true,
        helper:
          'Please add all the prescriptions records that will be delivered',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Medication delivery', 'Medication pick up'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Medication delivery', 'Medication pick up'].some((r) =>
              values.Type.includes(r)
            )
          }
          return ['Medication delivery', 'Medication pick up'].includes(
            values.Type
          )
        },
      },
      {
        id: 'fldOsObR3Tf4ujyZ6',
        name: 'Pharmacy provider (Facility from Provider base)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldUT8JomIJ3VUWxy',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: 'Please select the pharmacy that will deliver the medication',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Medication pick up'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Medication pick up'].some((r) => values.Type.includes(r))
          }
          return ['Medication pick up'].includes(values.Type)
        },
      },
      {
        id: 'fldKa7QgVWngb1n3K',
        name: 'Location',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          "ONLY specify the location of the task when the task should not happen at the member's known address. If this field is empty the member's address will be automatically used by the system as the location to perform the task\n\nKeep empty if you want us to perform the task at member's known location",
      },
      {
        id: 'fld26RqzUFPlXMSSM',
        name: 'Contact',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If the task is linked to one member, the system will automatically fetch the known phone number but it is better to confirm with the member the phone number that can be used on the day of the task.',
      },
      {
        id: 'fld0bdmt3Wd6gtpzi',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Select "To do" - (you do not have the choice anyway ;) )',
      },
      {
        id: 'fldy74OAxHa7oZIny',
        name: 'Due date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the due date you agreed with the member. Please take the below rules into consideration when selecting the date:\nThika Road from Roysambu to Thika town - Wednesdays\nKiserian / Ngong / Langata / Karen - Thursdays\nMombasa Road / Utawala / JKIA / Kitengela- Fridays\nMaximum of two fasting tasks per day at Antara. Please verify with Logistics first (<a href="https://airtable.com/app5syOvwU86ByWD8/tblJmoQGSS2vl8u9g/viwrNUL5bEGmPbeWd?blocks=hide)" target="_blank">https://airtable.com/app5syOvwU86ByWD8/tblJmoQGSS2vl8u9g/viwrNUL5bEGmPbeWd?blocks=hide)</a>',
      },
      {
        id: 'fldqIcXvtcB2w3D83',
        name: 'Time',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'This is the agreed time with member, please note that Logistic admin might be requesting a reschedule.\nDo not fill if no specific time was agreed with the member.',
      },
      {
        id: 'fldFiJvTaVC3jK7tT',
        name: 'Priority',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '! Critical tasks will be done before any other tasks !',
      },
      {
        id: 'fldpjO6fkuFKrt5BM',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Any additional notes - especially list of medications when the task is medication pick up or delivery\n\nPlease meke sure to give all information about the due time for the task is the member requested something specific',
      },
      {
        id: 'fldjg8jmie5T4sj0H',
        name: 'Creator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8qo2EQvnHiaS7R',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper:
          'Select your ID here, you will be able to receive a notification when the task is completed',
      },
    ],
  },
  {
    name: 'Intervention Data Tracking',
    id: 'tbljaKK4MXz7M990E',
    formId: 'shrU6coJtTURljj15',
    helper:
      'This form should be used to collect data about a bene intervention progress',
    fields: [
      {
        id: 'fld3HJ6VSpWRPUrXE',
        name: 'Member Intervention',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldED2PmnAj6gH4Dd',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblTmMtBgwT76JrQN',
        required: true,
        helper: '',
      },
      {
        id: 'fldCtuk3JlRtqOFXy',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Date that the data was collected',
      },
      {
        id: 'fldItp6l73XyoRfiY',
        name: 'HMP Number',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the CURRENT HMP#',
      },
      {
        id: 'fldsXSgs2qXYzCuD0',
        name: 'Intervention type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'This type selection will allow the form to ask the right questions for this intervention',
      },
      {
        id: 'fldrCo5S3DKKPrsJd',
        name: 'Current activity - description',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please briefly describe the types of activities, frequencies and duration',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Activity Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Activity Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fld1EwIkwxiNB0Zuv',
        name: 'Current activity measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please go to this view <a href="https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Activity-METs-calculator_suNvx#_luc_1" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM</a> to identify the MET-Min/week (total of MET-Min/week of each activity)\nExample: 500 or 550',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Activity Plan', 'Fitness Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Activity Plan', 'Fitness Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Activity Plan', 'Fitness Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldCFOsgFR4thpBsu',
        name: 'Current asthma score',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please use this link to score the asthma condition and enter the result: <a href="https://www.asthmacontroltest.com/en-gb/welcome/" target="_blank">https://www.asthmacontroltest.com/en-gb/welcome/</a>',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Asthma Action Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Asthma Action Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Asthma Action Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldq7uuwv4SEggicV',
        name: 'Current salt measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Enter salt measurement in mg without unit - 2000 or 3000 or 1500...',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Salt Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Salt Reduction Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Salt Reduction Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldYQsM2dhJdhXXn6',
        name: 'Current BMI change measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Stage 1: BMI 25.0 - 29.9\nStage 2: BMI 30.0 - 39.9\nStage 3: BMI =/>40',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Caloric Reduction Plan', 'Weight Gain Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan', 'Weight Gain Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan', 'Weight Gain Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldfFw7ks29uUAqxX',
        name: 'Current glycemix index',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Enter glycemic measurement - 80 or 90 or 130...',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Diabetic Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Diabetic Diet Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Diabetic Diet Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fld0ABI8orJr9X4es',
        name: 'current cholesterol measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Enter daily cholesterol intake in mg without unit \nExample: 200 or 300 or 150...',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Cholesterol Reduction'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Cholesterol Reduction'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Cholesterol Reduction'].includes(values['Intervention type'])
        },
      },
      {
        id: 'flduK3cldnw1wkPUS',
        name: 'Current potassium measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Enter daily potassium intake in mg without the unit\nExample: 200',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Potassium Rich Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Potassium Rich Diet Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Potassium Rich Diet Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldaePZSqQRFIOJay',
        name: 'Current asthma trigger measurement',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please select the type of trigger',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Asthma trigger management'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Asthma trigger management'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Asthma trigger management'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldMgIrXxtnFg0E8Z',
        name: 'Current activity level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: 0 MET-minutes/week\n1: <500 MET-minutes/week\n2: 500 - 1499 MET-minutes/week\n3: 1500 - 2900 MET-minutes/week\n4: >= 3000 MET-minutes/week',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Activity Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Activity Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldCMJwVSO853fe1s',
        name: 'Current asthma level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Above 11 years old\n1: Score 24 - 27\n2: Score 21 - 23\n3: Score 16 - 20\n4: Score < 15\n\n4 to 11 years old\n1: Score 25 - 27\n2: Score 21 - 24\n3: Score 13 - 20\n4: Score < 12',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Asthma Action Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Asthma Action Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Asthma Action Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldozIVUzDlVUE1is',
        name: 'Current BMI level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '1: BMI 25-30\n2: BMI 31-40\n3: BMI >40',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Caloric Reduction Plan', 'Weight Gain Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan', 'Weight Gain Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan', 'Weight Gain Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldmFpfdvoqor5bka',
        name: 'Current salt level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: <1500mg (Recommended for hypertensives)\n1: 1500-2500mg (Normal)\n2: 2501-3500mg (High)\n3: 3501-4500mg (Very High)\n4: >4500mg (Excessively High)',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Salt Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Salt Reduction Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Salt Reduction Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldqLlNeOr3tYf6EC',
        name: 'Current potassium level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: >3500mg (Recommended)\n1: 2500-3500mg (Normal)\n2: 1500-2499mg (Low)\n3: <1500mg (Inadequate)',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Potassium Rich Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Potassium Rich Diet Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Potassium Rich Diet Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldDaI2JW3324ujcS',
        name: 'Current cholesterol level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '0: <200mg (Recommended for those with heart disease)\n1: 200-300mg (Normal)\n2: 301-500mg (High)\n3: >500mg (Very High)',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Cholesterol Reduction'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Cholesterol Reduction'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Cholesterol Reduction'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldjlKnq4zFU8u49g',
        name: 'Current diabetic level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Level 0: <100\nLevel 1: 100 - 180\nLevel 2: 181 - 200\nLevel 3: >200',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Diabetic Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Diabetic Diet Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Diabetic Diet Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldLOX17z5GCASFOw',
        name: 'Current Milestone Target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          "What was the BN's Milestone Target at LAST HMP\n\nCaloric Reduction BMI Target: \nIf Stage 1:\n1-month: 1% reduction\n3-month: 2% reduction\n6-month: 2% reduction\n \nIf Stage 2:\n1-month: 2% reduction\n3-month: 2% reduction\n6-month: 3% reduction\n\nIf Stage 3:\n1-month: 2% reduction\n3-month: 3% reduction\n6-month: 5% reduction\n\nSalt:\nLevel 0: <1500mg (Recommended for hypertensives)\nLevel 1: 1500-2500mg (Normal)\nLevel 2: 2500-3500mg (High)\nLevel 3: 3500-4500mg (Very High)\nLevel 4: >4500mg (Excessively High)\n\nGlycemic Index:\nStage 0: 80-180 (At Risk)\nStage 1: <80 (Newly dx)\nStage 2: <100 (1st line meds)\nStage 3: <180 (2nd line meds)\n\nActivity:\nLevel 1: 7-10 km per week\nLevel 2: 10-15km brisk walking per week\nLevel 3: 15-20km brisk walking per week\nLevel 4: Daily exercise/Athlete\n\nCholesterol:\nLevel [0]: <200mg (Recommended for those with heart disease)\nLevel 1: 200-300mg (Normal)\nLevel 2: 300-500mg (High)\nLevel 3: >500mg (Very High)\n\nAsthma:\nStage 1: Mild intermittent\nStage 2: Moderate intermittent\nStage 3: Moderate persistent\nStage 4: Severe persistent\n\nIf BMI 17.0 - 18.4:\n1-month: 1% increase\n3-month: 1% increase\n6-month: 1% increase\nIf BMI 16.0 - 16.9:\n1-month: 1% increase\n3-month: 2% increase\n6-month: 2% increase\nIf BMI < 16.0:\n1-month: 2% increase\n3-month: 2% increase\n6-month: 3% increase",
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Caloric Reduction Plan', 'Weight Gain Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan', 'Weight Gain Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan', 'Weight Gain Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldm57eb2B0cNjonu',
        name: 'Current Milestone Attainment',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Is the patient exceeding, on track, off track, or regressing on their goal?\n\nExceeding: the beneficiary has already reach the target level and will likely reach another level before the target date\n\nOn track: the beneficiary is not yet there but will likely succeed into reaching the target milestone\n\nOff track: the beneficiary is not yet there and will unlikely succeed into reaching the target milestone\n\nRegressing: the beneficiary is struggling with the milestone and we will likely have to refine another milestone or approach\n\nThe current progress of the intervention leads to a required update of the condition (new stage or new status)? click the button.',
      },
      {
        id: 'flds05B74ZBhtCTUV',
        name: 'Is the member doing what we want them to be doing in this intervention?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Question is used to generate Persona of the member for this intervention',
        conditionType: '!',
        parentKey: 'Current Milestone Attainment',
        parentValues: ['Exceeded', 'On Track'],
        condition: (values: any) => {
          if (Array.isArray(values['Current Milestone Attainment'])) {
            return ['Exceeded', 'On Track'].some(
              (r) => !values['Current Milestone Attainment'].includes(r)
            )
          }
          return !['Exceeded', 'On Track'].includes(
            values['Current Milestone Attainment']
          )
        },
      },
      {
        id: 'fldBC1pC8wgOsaWBT',
        name: 'Does the member want to be doing what we want them to do in this intervention?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Question is used to generate Persona of the member for this intervention',
        conditionType: '',
        parentKey:
          'Is the member doing what we want them to be doing in this intervention?',
        parentValues: ['No'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Is the member doing what we want them to be doing in this intervention?'
              ]
            )
          ) {
            return ['No'].some((r) =>
              values[
                'Is the member doing what we want them to be doing in this intervention?'
              ].includes(r)
            )
          }
          return ['No'].includes(
            values[
              'Is the member doing what we want them to be doing in this intervention?'
            ]
          )
        },
      },
      {
        id: 'fldxs3oO67guP0PDY',
        name: 'Status update',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Select the status: Active : intervention is ongoing \n Paused: the member decided to stop for now or you decide to pause it to focus on another intervention \n Completed: intervention is done \n Canceled: the intervention will not apply anymore',
      },
      {
        id: 'fldKyHKhvNtQ3WRZj',
        name: 'Reason for status update',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the reason that explain the status',
      },
      {
        id: 'fldqAL8R4DCw2IKsL',
        name: 'Status Cause',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          "If intervention has been completely successful or should stop for any reason and we do not need the member to continue it, please change the status below. \n\n(By entering a new status below, the Intervention status will be automatically changed in Airtable)\n\n`Paused` means Antara and/or bene temporarily stop an intervention\n'Stopped' means Antara decided to stop the intervention\n'Opted out' means beneficiary decided to stop the intervention",
      },
      {
        id: 'fld8oWfNzH0zQwcVX',
        name: 'Resumption Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'The date the intervention gets back to effect',
        conditionType: '',
        parentKey: 'Status Cause',
        parentValues: ['Stopped', 'Paused'],
        condition: (values: any) => {
          if (Array.isArray(values['Status Cause'])) {
            return ['Stopped', 'Paused'].some((r) =>
              values['Status Cause'].includes(r)
            )
          }
          return ['Stopped', 'Paused'].includes(values['Status Cause'])
        },
      },
      {
        id: 'fldQzwHoVXf9ure8X',
        name: 'Intervention result',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If you are doing this update at the end of a HMP cycle, please capture the result of the intervention',
      },
      {
        id: 'fldJm6DPdfLZfoLUG',
        name: 'Other result',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the other result',
        conditionType: '',
        parentKey: 'Intervention result',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention result'])) {
            return ['Other'].some((r) =>
              values['Intervention result'].includes(r)
            )
          }
          return ['Other'].includes(values['Intervention result'])
        },
      },
      {
        id: 'fldfn6Uygthm68RU7',
        name: 'Next activity milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Optional unless you want to change the current milestone\n\n0: 0 MET-minutes/week\n1: <500 MET-minutes/week\n2: 500 - 1499 MET-minutes/week\n3: 1500 - 2900 MET-minutes/week\n4: >= 3000 MET-minutes/week',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Activity Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Activity Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Activity Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldWQw5BoLC4nkwYq',
        name: 'Next asthma milestone target',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Optional unless you want to change the current milestone\n\nIf 1 and 2, go to level 1\nIf 3, go to level 2\nIf 4, go to level 3',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Asthma Action Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Asthma Action Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Asthma Action Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldoD0EXYB09WFFdP',
        name: 'Next diabetic milestone',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If condition is Diabetes + condition stage = AT RISK and:\nLevel 0: <100, target = Level 0: <100\nLevel 1: 100 - 180, target = Level 1: 100 - 180\nLevel 2: 181 - 200, target = Level 1: 100 -180\nLevel 3: >200, target = Level 2: 181 - 200\n\nIf condition is Diabetes + condition stage = PRE-DIABETES, 1, 2, or 3 and:\nLevel 0: <100, target = Level 0: <100\nLevel 1: 100 - 180, target = Level 0 <100\nLevel 2: 181 - 200, target = Level 1: 100 -180\nLevel 3: >200, target = Level 2: 181 - 200\n',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Diabetic Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Diabetic Diet Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Diabetic Diet Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldnfxxENZSQ4oPw4',
        name: 'Next potassium rich diet milestone',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Optional unless you want to change the current milestone',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Potassium Rich Diet Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Potassium Rich Diet Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Potassium Rich Diet Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'flduaiyogoXQQ4OL7',
        name: 'Next BMI milestone',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Optional unless you want to change the current milestone\n\nIf Stage 1:\n1-month: 1% reduction\n3-month: 2% reduction\n6-month: 2% reduction\n \nIf Stage 2:\n1-month: 2% reduction\n3-month: 2% reduction\n6-month: 3% reduction\n\nIf Stage 3:\n1-month: 2% reduction\n3-month: 3% reduction\n6-month: 5% reduction\n\nIf BMI 17.0 - 18.4:\n1-month: 1% increase\n3-month: 1% increase\n6-month: 1% increase\nIf BMI 16.0 - 16.9:\n1-month: 1% increase\n3-month: 2% increase\n6-month: 2% increase\nIf BMI < 16.0:\n1-month: 2% increase\n3-month: 2% increase\n6-month: 3% increase',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Caloric Reduction Plan', 'Weight Gain Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan', 'Weight Gain Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan', 'Weight Gain Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldKIeM74fkUcirDl',
        name: 'Next salt reduction milestone',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Optional unless you want to change the current milestone\n\nLevel 0: <1500mg (Recommended for hypertensives)\nLevel 1: 1500-2500mg (Normal)\nLevel 2: 2500-3500mg (High)\nLevel 3: 3500-4500mg (Very High)\nLevel 4: >4500mg (Excessively High)',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Salt Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Salt Reduction Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Salt Reduction Plan'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldQaatGVMnJ9YmVH',
        name: 'Next cholesterol reduction milestone',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Optional unless you want to change the current milestone\n\nLevel 0: <200mg (Recommended for those with heart disease)\nLevel 1: 200-300mg (Normal)\nLevel 2: 300-500mg (High)\nLevel 3: >500mg (Very High)',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Cholesterol Reduction'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Cholesterol Reduction'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Cholesterol Reduction'].includes(values['Intervention type'])
        },
      },
      {
        id: 'fldN914KuTtTNwNRj',
        name: 'Source of data',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldJw7pLxBqrlFudC',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Conditions Data tracking',
    id: 'tblBqZ9SArUq2qVKM',
    formId: 'shrFefBCXsPCUxo2o',
    deprecated: true,
    fields: [
      {
        id: 'fldI77iqzFEkN7BSq',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldd3twXCMXc9b2aC',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldoz1yPNhAI1grbH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldr1AHCEp9BKfJaG',
        name: 'Member Conditions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld3kimMz92Pewa1q',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: true,
        helper:
          'Please note that "current stage" in the condition name is the last recorded current stage. In this form you will be tracking the new current stage',
      },
      {
        id: 'fldTNLhh5wic9GP4Z',
        name: 'Conditions master list',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldAoPcKjUN8vKTTy',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblR6LlerAkXAmVnc',
        required: false,
        helper: '',
      },
      {
        id: 'fld0YymouKkwHQRY1',
        name: 'Update Underweight stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '    * Stage 1: BMI 17.0 - 18.4\n    * Stage 2: BMI 16.0 - 16.9\n    * Stage 3: BMI < 16.0',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recpKWliH8DpATqAW'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recpKWliH8DpATqAW'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recpKWliH8DpATqAW'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldDM5Pru8LLyL45X',
        name: 'Update hypertension stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '@risk: Sys/DIa <120/80\nElevated BP: 120-130 and <80 mmHg\nStage 1 Hypertension: 130-140 or 80-89 mmHg\nStage 2 Hypertension: >140 or >90mmHg',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recfOQjJ8Yo2oiVD6'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recfOQjJ8Yo2oiVD6'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recfOQjJ8Yo2oiVD6'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld32WpA9KCa2NqU5',
        name: 'Update gastritis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Acute: < 6 weeks\nChronic > 6 weeks',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['recjHCg4fZrqtuim3'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['recjHCg4fZrqtuim3'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['recjHCg4fZrqtuim3'].includes(values['Condition type'])
        },
      },
      {
        id: 'fld6gFfk2b9btxdOG',
        name: 'Update gastritis Hpylori stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recauBAdwn9QuqRRs'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recauBAdwn9QuqRRs'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recauBAdwn9QuqRRs'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldIiXuUXZ2jkZ7p4',
        name: 'Update lower back pain stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Acute: symptoms < 4 weeks\nSub-acute: symptoms > 4 weeks & < 12 weeks\nChronic: select the stage as displayed in the calculator',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recVlgx6cf6Fw3gzn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recVlgx6cf6Fw3gzn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recVlgx6cf6Fw3gzn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldCDPMXM2qUX2R0c',
        name: 'Update Hyperlipidemia stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'At risk if members with previous hx or family hx\n Hypercholesterolemia if TC>200mg/dl\n Hypertriglyceridemia if TG >150mg/dl only done in a fasting state\n Mixed hyperlipidemia if defined as elevated LDL >130mg/dl, TC>200mg/dl and TG>150mg/dl',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recLdUqB94LuWsfpj'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recLdUqB94LuWsfpj'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recLdUqB94LuWsfpj'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldEZgKU6H129LTGE',
        name: 'Update other condition stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recfNbsZGueaHQUto'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recfNbsZGueaHQUto'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recfNbsZGueaHQUto'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld78eP8uUfPBod0d',
        name: 'Update asthma stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Stage 1: Mild intermittent = score of 24-25\nStage 2: Moderate intermittent = score of 21-23\nStage 3: Moderate persistent = score of 16-20\nStage 4: Severe persistent = score of 0-15',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recsYfjhmamvUbgM7'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recsYfjhmamvUbgM7'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recsYfjhmamvUbgM7'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldGTmcBx5HFQRl1E',
        name: 'Update varicose veins stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Mild: Occasional pain not restricting activities , few veins, number of active ulcers 1, occasional edema\nModerate: Daily moderate activity limitation requiring occasional analgesia use, Multiple veins/torturous, 2 ulcers present, Occasional edema above the level of the ankles\nSevere: Extensive veins, daily pain limiting daily activities, more than 3 ulcers, edema to the level of the knee, severe cellulitis',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rec1yyeyxkQxZtIsD'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rec1yyeyxkQxZtIsD'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rec1yyeyxkQxZtIsD'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldnGqJ4EgNX4K0zD',
        name: 'Update fibroid stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Asymptomatic: diagnosed during routine visit but not symptomatic\nSymptomatic: associated with menstrual disturbances, anemia, difficulty in conception',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rec9GJtCUjz54voue'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rec9GJtCUjz54voue'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rec9GJtCUjz54voue'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldUWSLJyuvelsJmt',
        name: 'Update diabetes 2 stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'At risk: HB1AC <5.7%\nStage 1: HB1AC > 6.5%\nStage 2: HB1AC >7.5%, FBS >7 mmol/l, only on oral meds\nStage 3: HB1AC >7.5%, FBS >7 mmol/l, on insulin\nPrediabetes: HBA1C 5.7% to 6.4% FBS >6 mmol/l, Positive impaired glucose tolerance test (RBS 7.8-11.1 mmol/l)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recR916dEtATKYuvw'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recR916dEtATKYuvw'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recR916dEtATKYuvw'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld8CKlD1crxGlLfI',
        name: 'Update diabetes 1 stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['receXizGwFWI5igxn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['receXizGwFWI5igxn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['receXizGwFWI5igxn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldXsqQ6RKJ7pjD1I',
        name: 'Update diabetes gestational stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recQPGTOSPnwjyPPA'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recQPGTOSPnwjyPPA'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recQPGTOSPnwjyPPA'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fld6IW1629jbxnH8b',
        name: 'Update Allergic Rhinitis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'To identify the stage, please assess following symptoms: running nose, watery eyes, itchy eyes or nose, sneezing, red eyes.\n\nStages:\nSeasonal: Symptoms triggered seasonally\nIntermittent: Symptoms < 4 days per week or < 4 weeks per year\nPersistent: Symptoms > 4 days per week or > 4 weeks per year',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recFEGuc9JL0Tajlb'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recFEGuc9JL0Tajlb'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recFEGuc9JL0Tajlb'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldh5LFoc46PfHC3u',
        name: 'Update hemorrhoids stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recpLfyAirbx5OlFS'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recpLfyAirbx5OlFS'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recpLfyAirbx5OlFS'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldpPz5E9ni06NrzY',
        name: 'Update overweight stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Stage 1: BMI 25-29.9\nStage 2: BMI 30-39.9\nStage 3: BMI >=40',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recwoDtKd1B4ztytB'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recwoDtKd1B4ztytB'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recwoDtKd1B4ztytB'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldEYo0uMwr14j64s',
        name: 'Update osteoarthritis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Stage 1: Minor wear-and-tear in the joints. Little to no pain in the affected area\nStage 2: Pain score <3 - Mild (some morning stiffness, intermittent pain with NO quality of life impact)\nStage 3: Pain score 4-7 - Moderate (intermittent pain with impact on quality of life)\nStage 4: Pain score >8 - Severe (persistent pain with significant impact on quality of life)',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: [
          'recZETSYK81fAKYEy',
          'recCvj1vrZI7QJTJT',
          'rec976C51ukYbVEZP',
          'recatck1FWNN5RmWe',
          'recZ36sY8T3Yungmo',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return [
              'recZETSYK81fAKYEy',
              'recCvj1vrZI7QJTJT',
              'rec976C51ukYbVEZP',
              'recatck1FWNN5RmWe',
              'recZ36sY8T3Yungmo',
            ].some((r) => values['Conditions master list'].includes(r))
          }
          return [
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
          ].includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldNKuxqIZGNa85U3',
        name: 'Osteoarthritis current pain score',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          ' "One of the worst things about Osteoarthritis is the pain it brings and its effects on someone’s activities of daily living”.\nPlease obtain the member’s overall joint score using this calculator:\n    * If HIP use this: <a href="https://www.orthopaedicscore.com/scorepages/hip_disability_osteoarthritis_outcome_score_hoos.html" target="_blank">https://www.orthopaedicscore.com/scorepages/hip_disability_osteoarthritis_outcome_score_hoos.html</a> \n  * If Knee use this: <a href="https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Knee-pain-calculator_sukw7#_luEz0" target="_blank">https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Knee-pain-calculator_sukw7#_luEz0</a> \n  * If Shoulder, Arm, Hand use this: <a href="https://www.orthopaedicscore.com/scorepages/disabilities_of_arm_shoulder_hand_score_dash.html" target="_blank">https://www.orthopaedicscore.com/scorepages/disabilities_of_arm_shoulder_hand_score_dash.html</a> \n  * If Spine use this: <a href="https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR#_luYs-" target="_blank">https://coda.io/d/Clinical-Hub_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR#_luYs-</a> \nOnce you have scored it, please enter the result. Examples: 65 or 56 or 89',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: [
          'recZETSYK81fAKYEy',
          'recCvj1vrZI7QJTJT',
          'rec976C51ukYbVEZP',
          'recatck1FWNN5RmWe',
          'recZ36sY8T3Yungmo',
        ],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return [
              'recZETSYK81fAKYEy',
              'recCvj1vrZI7QJTJT',
              'rec976C51ukYbVEZP',
              'recatck1FWNN5RmWe',
              'recZ36sY8T3Yungmo',
            ].some((r) => values['Conditions master list'].includes(r))
          }
          return [
            'recZETSYK81fAKYEy',
            'recCvj1vrZI7QJTJT',
            'rec976C51ukYbVEZP',
            'recatck1FWNN5RmWe',
            'recZ36sY8T3Yungmo',
          ].includes(values['Conditions master list'])
        },
      },
      {
        id: 'fldPiptKj8CjuekRt',
        name: 'Update GERD stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recLpbGIM06FnDBN4'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recLpbGIM06FnDBN4'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recLpbGIM06FnDBN4'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldpW4Ybc5Dmxhvpj',
        name: 'Update eczema stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['rechQ6Cvl5WeVP6tI'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['rechQ6Cvl5WeVP6tI'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['rechQ6Cvl5WeVP6tI'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldNgagxAwV5HS6Z5',
        name: 'Update clinical status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please note that this is the new clinical status of the conditions if it has changed.',
      },
      {
        id: 'fldXU6wFngD5NNh5H',
        name: 'Update condition status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please note that this is the new status of the conditions if it has changed. Since you are tracking data for active conditions, this should change to Inactive when the member does not have the condition anymore',
      },
      {
        id: 'fldMrWeUzpJcUyuHK',
        name: 'Update lower back pain score',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          ' * Acute: symptoms < 4 weeks\nSub-acute: symptoms > 4 weeks & < 12 weeks\nIf chronic → select the stage as displayed in the calculator\n\nIf > 12 weeks: CHRONIC\n"It sounds as though this has been going on for a long time. I want to understand your back pain a bit better in order to help. I am going to take you through a few questions that will allow us to give your lower back pain a score. Then we will work together to improve that score. Part of that work will definitely involve a visit to our physical therapist, but there are other things we shall do as well!"\n\nIf more than 12 weeks, please calculate the score here: <a href="https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe</a>',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recVlgx6cf6Fw3gzn'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recVlgx6cf6Fw3gzn'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recVlgx6cf6Fw3gzn'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldneQ3GbMAQwgMn2',
        name: 'Acute vs Chronic',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please note that this state (acute or chronic) will be pushed to the condition table as the last known status',
      },
      {
        id: 'flduB7GL6319BEFUs',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Prescriptions VC',
    id: 'tbl3iBWzYVWEpdLje',
    formId: 'shrY7UhjHNpZxNfNK',
    helper:
      'Only for usage of Doctor, HN should use the Medication Prescription Form ',
    fields: [
      {
        id: 'fldiB18lEynAzpg0t',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldqmUGyhUTCMnrwZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldtvidZZAwp6pQaF',
        name: 'Clinical Consultation',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld9azWX8GMfBldqD',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLhL72JyizQ4ycc',
        required: false,
        helper:
          'Please link the prescription to the Clinical Consultation. If you are in guided workflow, please submit the clinical consultation form first so that you can see it here',
      },
      {
        id: 'fldb32h6GgavKARi3',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldOgcAa03iu9LbHH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldAzPD8eGWs0ihjF',
        name: 'Medication',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldBcjGCipeX0kg6s',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblYzI0t7WX9LGW4h',
        required: true,
        helper: '',
      },
      {
        id: 'fldsOMD3iYcHSyxs9',
        name: 'Other Medication',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Medication',
        parentValues: ['rechmJ9RLO7W8zS5v'],
        condition: (values: any) => {
          if (Array.isArray(values.Medication)) {
            return ['rechmJ9RLO7W8zS5v'].some((r) =>
              values.Medication.includes(r)
            )
          }
          return ['rechmJ9RLO7W8zS5v'].includes(values.Medication)
        },
      },
      {
        id: 'fld4aX9xYNTWkcC7z',
        name: 'Associated condition(s) (from memberDB)',
        type: 'conditions',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld95BGdWauLUeE4L',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: false,
        helper: '',
      },
      {
        id: 'fldremcqSObFjY3pP',
        name: 'Brand Name',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldmgFni4l4fDZeqF',
        name: 'Frequency',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldtAenTsO7SLKWE4',
        name: 'Other frequency',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Frequency',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Frequency)) {
            return ['Other'].some((r) => values.Frequency.includes(r))
          }
          return ['Other'].includes(values.Frequency)
        },
      },
      {
        id: 'fldq8s2qlrd8RNaGZ',
        name: 'Duration',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Enter the number of the medication is to be taken',
      },
      {
        id: 'fldD1aEmsctOhxYVs',
        name: 'Route',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldBBaStFOCgIIWSR',
        name: 'Other route',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Route',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Route)) {
            return ['Other'].some((r) => values.Route.includes(r))
          }
          return ['Other'].includes(values.Route)
        },
      },
      {
        id: 'fld6WjGYJyoYj6HRG',
        name: 'Quantity',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld9bNvBJnCDualIv',
        name: 'Quantity Units',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldGpL0sxGrQZotlr',
        name: 'Dosage Unit',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldOZqelFM03BLkFW',
        name: 'Prescribing facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flds2KBKMVuwj7mjs',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: '',
      },
      {
        id: 'fldeCL4LwSAiILodY',
        name: 'Other prescribing facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Fill in the Prescribing Facility not found in the provider base. Enter Other facility name with format Name -Location e.g Antara Health - Lavington',
        parentKey: 'Prescribing facility from Provider base',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Prescribing facility from Provider base'])
          ) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values['Prescribing facility from Provider base'].includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(
            values['Prescribing facility from Provider base']
          )
        },
      },
      {
        id: 'fldq8XrNhO2xTdUdH',
        name: 'Refill facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNynT0qvDI0nrw6',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: '',
      },
      {
        id: 'fldPXmDvLGxgPrh20',
        name: 'Other refill facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Fill in the Refill Facility not found in the provider base. Enter Other facility name with format Name -Location e.g Antara Health - Lavington',
        parentKey: 'Refill facility from Provider base',
        parentValues: ['recuzcwIPr5MYoltq'],
        condition: (values: any) => {
          if (Array.isArray(values['Refill facility from Provider base'])) {
            return ['recuzcwIPr5MYoltq'].some((r) =>
              values['Refill facility from Provider base'].includes(r)
            )
          }
          return ['recuzcwIPr5MYoltq'].includes(
            values['Refill facility from Provider base']
          )
        },
      },
      {
        id: 'fldkJyzyyI2lqNPDS',
        name: 'Start Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please enter the start date if the member is already taking the medication. If this a new medication, Care team will confirm and update the start date after delivery of the medication.',
      },
      {
        id: 'fldfiJtWgiaX00gXG',
        name: 'Refillable',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldVHqcnqr6wZnisF',
        name: 'Instructions',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldGx1NFRXwWpIU5Q',
        name: 'Additional Instructions',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldzhc4XlQavjztsW',
        name: 'Prescription Refills',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl3iBWzYVWEpdLje',
        required: false,
        helper: '',
      },
      {
        id: 'fldsHV3Kh5t0QshVK',
        name: 'Change of medication',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please select YES if this medication has been prescribed as a result of a change in the current medication. It can be a change of dose or a change or drug.',
      },
    ],
  },
  {
    name: 'Incident reports',
    id: 'tblwEw59kdphWgewi',
    formId: 'shrG0hIdvQ626V9GN',
    fields: [
      {
        id: 'fldSgWWdVMxopl0VS',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldhSilQWVmaP5ZYn',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
      },
      {
        id: 'fldeqJLPLjO9XMXnu',
        name: 'Channel of discovery',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld3CpR39hWGnKXAF',
        name: 'Other channel',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Channel of discovery',
        parentValues: ['Other', 'Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Channel of discovery'])) {
            return ['Other', 'Other'].some((r) =>
              values['Channel of discovery'].includes(r)
            )
          }
          return ['Other', 'Other'].includes(values['Channel of discovery'])
        },
      },
      {
        id: 'fldbMZrcCAqBEL6qO',
        name: 'Source',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldSNGqPl10revLVD',
        name: 'Other source',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Source',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Source)) {
            return ['Other'].some((r) => values.Source.includes(r))
          }
          return ['Other'].includes(values.Source)
        },
      },
      {
        id: 'fldrdlVaM0HyjBbN1',
        name: 'Source name',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the name of the source (example: Jubilee, Dr John, Rebecca...)',
      },
      {
        id: 'fldnw8JzyEcKwsKCW',
        name: 'Incident risk category',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Classify and prioritize risks based on their nature and potential impact',
      },
      {
        id: 'fld0zuq9iUcEtU8hG',
        name: 'Severity',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Indicates the degree of impact/importance of an issue. P0-An incident that is very impactful and significant and needs immediacy in resolution and has great repercussion .Requires an all-hands on deck approach. P1-An incident that is moderate/mild  in nature, needs time to be solved and one or fewer team members.P2- Minor issues or incidences raised that may go unnoticed if not brought up. Solution is readily available and restoration is quick',
      },
      {
        id: 'fldi8Ilnmxay3ueCd',
        name: 'Responsible party',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldOZpDcrwa4ZSCK0',
        name: 'External responsible party',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Responsible party',
        parentValues: ['External', 'Clinical diagnosis', 'Prescribing'],
        condition: (values: any) => {
          if (Array.isArray(values['Responsible party'])) {
            return ['External', 'Clinical diagnosis', 'Prescribing'].some((r) =>
              values['Responsible party'].includes(r)
            )
          }
          return ['External', 'Clinical diagnosis', 'Prescribing'].includes(
            values['Responsible party']
          )
        },
      },
      {
        id: 'fldhaQ74NBruUcUJY',
        name: 'Date of report',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please enter the date when the incident happened (not the time you are reporting it)',
      },
      {
        id: 'fld2J5074d9pYGoa0',
        name: 'Incident location',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Where did it happen?',
      },

      {
        id: 'fldJyiQrTsJ7aLLxs',
        name: 'Incident type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please select the type(s) of incident that is reported',
      },
      {
        id: 'fldTarPA0DtqFaAxc',
        name: 'Administrative type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Administrative'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Administrative'].some((r) =>
              values['Incident type'].includes(r)
            )
          }
          return ['Administrative'].includes(values['Incident type'])
        },
      },
      {
        id: 'fldYhSQoSxxm9qU1O',
        name: 'Service delivery type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Service delivery', 'Supplies'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Service delivery', 'Supplies'].some((r) =>
              values['Incident type'].includes(r)
            )
          }
          return ['Service delivery', 'Supplies'].includes(
            values['Incident type']
          )
        },
      },
      {
        id: 'fldSlVy8LjvBDJKwf',
        name: 'Clinical treatment type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Clinical treatment'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Clinical treatment'].some((r) =>
              values['Incident type'].includes(r)
            )
          }
          return ['Clinical treatment'].includes(values['Incident type'])
        },
      },
      {
        id: 'flduJrXOu5HdrOjOf',
        name: 'Systems type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Systems'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Systems'].some((r) => values['Incident type'].includes(r))
          }
          return ['Systems'].includes(values['Incident type'])
        },
      },
      {
        id: 'fldkgfFUlDscJluWi',
        name: 'Appointment type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Appointment'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Appointment'].some((r) =>
              values['Incident type'].includes(r)
            )
          }
          return ['Appointment'].includes(values['Incident type'])
        },
      },
      {
        id: 'flddapBSjK9HBgf7Z',
        name: 'Other type',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter a type (not the full description)',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Other', 'Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Other', 'Other'].some((r) =>
              values['Incident type'].includes(r)
            )
          }
          return ['Other', 'Other'].includes(values['Incident type'])
        },
      },
      {
        id: 'fldCag13CvGUJzlzn',
        name: 'Incident medication type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident type',
        parentValues: ['Antara', 'Medication error', 'Administration'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident type'])) {
            return ['Antara', 'Medication error', 'Administration'].some((r) =>
              values['Incident type'].includes(r)
            )
          }
          return ['Antara', 'Medication error', 'Administration'].includes(
            values['Incident type']
          )
        },
      },
      {
        id: 'fld5O19sAlftDrN7y',
        name: 'Other medication type',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Incident medication type',
        parentValues: ['Other', 'Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Incident medication type'])) {
            return ['Other', 'Other'].some((r) =>
              values['Incident medication type'].includes(r)
            )
          }
          return ['Other', 'Other'].includes(values['Incident medication type'])
        },
      },
      {
        id: 'fldY9vaVYOKHLWLWr',
        name: 'Antara Staff Involved',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: false,
        helper:
          'Please tag the staff member who was in charge of the member or who was linked to the incident',
        valueType: 'collaborator',
      },
      {
        id: 'fldxlqOq6zcekT1TH',
        name: 'Incident Description',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Give details of what transpired, making clear all parties involved, both at Antara and elsewhere as applicable, and dates/time during which the event transpired',
      },
      {
        id: 'fldSpxlqAYBboxSXG',
        name: 'Patient outcomes',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please indicate the severity of the incident for the member',
      },
      {
        id: 'fldPPvEv5vZSZynCg',
        name: 'Action Taken',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Give details of what action you took to escalate/resolve the incident',
      },
    ],
  },
  {
    name: 'Interaction log',
    id: 'interactionlogform',
    fields: [
      {
        id: 'interactionStartedAt',
        name: 'Encounter Date',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
      },
      {
        id: 'interactorType',
        name: 'Interactor Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [
          'Beneficiary',
          'Employer',
          'Provider',
          'Payor',
          'Caregiver',
          'Relative',
          'Other',
          'Pharmacy',
        ],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'interactorName',
        name: 'Interactor Name',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Interactor Type',
        parentValues: ['Beneficiary'],
        condition: (values: any) => {
          if (values['Interactor Type']) {
            if (Array.isArray(values['Interactor Type'])) {
              return ['Beneficiary'].some(
                (r) => !values['Interactor Type'].includes(r)
              )
            }
            return !['Beneficiary'].includes(values['Interactor Type'])
          }
          return false
        },
      },
      {
        id: 'relationshipType',
        name: 'Relationship Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: ['Parent', 'Other', 'Child', 'Spouse'],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        parentKey: 'Interactor Type',
        parentValues: ['Payor', 'Caregiver', 'Relative'],
        condition: (values: any) => {
          if (Array.isArray(values['Interactor Type'])) {
            return ['Payor', 'Caregiver', 'Relative'].some((r) =>
              values['Interactor Type'].includes(r)
            )
          }
          return ['Payor', 'Caregiver', 'Relative'].includes(
            values['Interactor Type']
          )
        },
      },
      {
        id: 'modeOfCommunication',
        name: 'Mode of Communication',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [
          'SMS',
          'Email',
          'WhatsApp',
          'In-person',
          'Phone call',
          'Chat(Intercom)',
        ],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'interactionDirection',
        name: 'Interaction Direction',
        type: 'select',
        format: '',
        isDateTime: false,
        options: ['Outbound interaction', 'Inbound interaction'],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'inboundInteractionCategory',
        name: 'Inbound Interaction Category',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [
          'Urgent care issue',
          'Clinical question',
          'Medication question',
          'Scheduled interaction',
          'Rescheduling request',
          'Appointment request',
          'Data input',
          'HMP follow-up',
          'Nutrition follow-up',
          'HMP check-in call',
          'Lab result review',
          'Lab and vitals review',
          'Other',
        ],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        parentKey: 'Interaction Direction',
        parentValues: ['Inbound interaction'],
        condition: (values: any) => {
          if (Array.isArray(values['Interaction Direction'])) {
            return ['Inbound interaction'].some((r) =>
              values['Interaction Direction'].includes(r)
            )
          }
          return ['Inbound interaction'].includes(
            values['Interaction Direction']
          )
        },
      },
      {
        id: 'otherCategoryInbound',
        name: 'Other Category (Inbound)',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Inbound Interaction Category',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Inbound Interaction Category'])) {
            return ['Other'].some((r) =>
              values['Inbound Interaction Category'].includes(r)
            )
          }
          return ['Other'].includes(values['Inbound Interaction Category'])
        },
      },
      {
        id: 'outboundInteractionCategory',
        name: 'Outbound Interaction Category',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [
          'Appointment reminder',
          'Data request',
          'Education',
          'HMP Follow-up',
          'Pre-Appointment prep',
          'Rescheduling call',
          'Routine follow-up',
          'Scheduled interaction',
          'Send HMP',
          'Other',
          'Appointment booking',
          'Request for clinical summary',
          'Confirmation of appointment',
          'Post appointment follow-up (provider)',
          'Medication follow-up',
          'VC Follow up',
          'Chronic consent collection',
          'Nutrition follow up',
          'Chief complaint review',
          'HMP check-in call',
          'Lab result review',
          'Lab and vitals review',
        ],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        parentKey: 'Interaction Direction',
        parentValues: ['Outbound interaction'],
        condition: (values: any) => {
          if (Array.isArray(values['Interaction Direction'])) {
            return ['Outbound interaction'].some((r) =>
              values['Interaction Direction'].includes(r)
            )
          }
          return ['Outbound interaction'].includes(
            values['Interaction Direction']
          )
        },
      },
      {
        id: 'otherCategoryOutbound',
        name: 'Other Category (Outbound)',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Outbound Interaction Category',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Outbound Interaction Category'])) {
            return ['Other'].some((r) =>
              values['Outbound Interaction Category'].includes(r)
            )
          }
          return ['Other'].includes(values['Outbound Interaction Category'])
        },
      },
      {
        id: 'interactionSummaryNotes',
        name: 'Interactor Summary Notes',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
      },
      {
        id: 'outcome',
        name: 'Next Steps',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [
          'Virtual Consultation Required',
          'Flag for Review',
          'MHC',
          'Nutritional Consultation',
          'Pediatric Consultation',
          'None',
        ],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'flagForReview',
        name: 'Flag for Review',
        type: 'select',
        format: '',
        isDateTime: false,
        options: ['Yes', 'No', 'Reviewed'],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        parentKey: 'Next Steps',
        parentValues: ['Flag for Review'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Flag for Review'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Flag for Review'].includes(values['Next Steps'])
        },
      },
      {
        id: 'reasonForConsultation',
        name: 'Reasons for Consultation',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please describe the reason(s) why you are requesting a Virtual Consultation with as much details as you can.',
        conditionType: '',
        parentKey: 'Next Steps',
        parentValues: ['Virtual Consultation Required'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Virtual Consultation Required'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Virtual Consultation Required'].includes(
            values['Next Steps']
          )
        },
      },
      {
        id: 'mhcReferralReasons',
        name: 'MHC Reasons for Referral',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Next Steps',
        parentValues: ['MHC'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['MHC'].some((r) => values['Next Steps'].includes(r))
          }
          return ['MHC'].includes(values['Next Steps'])
        },
      },
      {
        id: 'ncReferralNotes',
        name: 'Notes for Nutritional Consultation',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Next Steps',
        parentValues: ['Nutritional Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Nutritional Consultation'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Nutritional Consultation'].includes(values['Next Steps'])
        },
      },
      {
        id: 'ncReferralReasons',
        name: 'NC Reasons for Referral',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Next Steps',
        parentValues: ['Nutritional Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Nutritional Consultation'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Nutritional Consultation'].includes(values['Next Steps'])
        },
      },
      {
        id: 'pedcReferralReasons',
        name: 'Pedriatic Reasons for Referral',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Next Steps',
        parentValues: ['Pediatric Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Pediatric Consultation'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Pediatric Consultation'].includes(values['Next Steps'])
        },
      },
      {
        id: 'pedcReferralNotes',
        name: 'Notes for Pediatric',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Next Steps',
        parentValues: ['Pediatric Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Pediatric Consultation'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Pediatric Consultation'].includes(values['Next Steps'])
        },
      },
    ],
  },
  {
    name: 'Member Feedback',
    id: 'tblMUuaFt7c7xSDPG',
    fields: [
      {
        id: 'fldnZuyEn8l5CgECo',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldLDNYzMqFF5GGwZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldPwElsUgF8Mx16F',
        name: 'Did the member provide any feedback?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldD9sggfxIhet9uP',
        name: 'Type of feedback',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Did the member provide any feedback?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback?'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Did the member provide any feedback?']
          )
        },
      },
      {
        id: 'fldIZh3Q8dRNbRYnq',
        name: 'Testimonial',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Written In 1st person (“I cannot remember”) and In Member’s own words. This can be general, service focused, value, segment or feature focused. Record testimonial in the language of the member and put a translation to it. It can be something touching, something memorable, something funny',
        conditionType: '',
        parentKey: 'Type of feedback',
        parentValues: ['Testimonial'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of feedback'])) {
            return ['Testimonial'].some((r) =>
              values['Type of feedback'].includes(r)
            )
          }
          return ['Testimonial'].includes(values['Type of feedback'])
        },
      },
      {
        id: 'fld3k3WCvviCgfUBl',
        name: 'What did the member provide feedback for?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Did the member provide any feedback?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback?'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Did the member provide any feedback?']
          )
        },
      },
      {
        id: 'fldfxk4IwefCnuocX',
        name: 'Feedback',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Did the member provide any feedback?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback?'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Did the member provide any feedback?']
          )
        },
      },
      {
        id: 'fldMyiOIugKSt9CbH',
        name: 'Source',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
    ],
  },
  {
    name: 'Minor Health Check (6 to 17)',
    id: 'tblQy757W3IQxJ8FA',
    helper:
      'Please fill this form only if minor is older than 5 years old, if not, delete the form from the workflow. Please note that you can also push the parent to fill it in the app by creating a member task',
    fields: [
      {
        id: 'fldsQoD6p93Nwu8cg',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld2RFAO3POOhuSrM',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldzMqzMyS6VJRWJJ',
        name: 'Age',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Put 1 if less than a year and if not prefilled',
      },
      {
        id: 'fldnxZCKX1htG8Dm2',
        name: 'Gender',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldXp3Xds1Ehx3kMX',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldjPS2N9vEyNJ5Go',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper:
          'Please select and link this baseline to the right appointment so that we can automatically change the status of the appointment after you finalize your baseline consultation',
      },
      {
        id: 'fldMSK1BkvmhUhRai',
        name: 'Do you know your child height/length (m)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the height/ length in meters',
      },
      {
        id: 'fldgmrkKSfvFG3k5l',
        name: 'Do you know your child weight (kg)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the weight in kgs',
      },
      {
        id: 'flduj8fsllBhxZZgp',
        name: 'Do you have any concerns about your child health today?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldX7iGi7YzEQf99v',
        name: 'What are your concerns?',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any concerns about your child health today?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any concerns about your child health today?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Do you have any concerns about your child health today?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Do you have any concerns about your child health today?']
          )
        },
      },
      {
        id: 'fldzozelSvBfeeaWJ',
        name: 'Do you know whether your child vaccines are up to date?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldhx6nIDWxlxZNUm',
        name: 'Has your child had any reactions to vaccinations in the past?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldLPQJXGTMCdFcU6',
        name: 'If yes, what reactions did your child get?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey:
          'Has your child had any reactions to vaccinations in the past?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Has your child had any reactions to vaccinations in the past?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Has your child had any reactions to vaccinations in the past?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Has your child had any reactions to vaccinations in the past?'
            ]
          )
        },
      },
      {
        id: 'fldXf3hseq7iUjVH3',
        name: 'Does your child have any allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld8g2sR5ZwXaR61w',
        name: 'If yes, what are the allergies?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Does your child have any allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Does your child have any allergies?'])) {
            return ['Yes'].some((r) =>
              values['Does your child have any allergies?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Does your child have any allergies?'])
        },
      },
      {
        id: 'fldY8hTQ1sccRXQIU',
        name: 'Does your child have any  food allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldopksorJcS8CDSP',
        name: 'If yes, what are the food allergies?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Does your child have any  food allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Does your child have any  food allergies?'])
          ) {
            return ['Yes'].some((r) =>
              values['Does your child have any  food allergies?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Does your child have any  food allergies?']
          )
        },
      },
      {
        id: 'fldf9T9Ocgzu39gLL',
        name: 'Is your child currently taking any medications?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld4tgO908JSrQUle',
        name: 'If yes, what are the medication details?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please enter the medications in the HN prescription form if all details are available or create a task for HN to collect data and add a new Rx in the src for the member.',
        conditionType: '',
        parentKey: 'Is your child currently taking any medications?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Is your child currently taking any medications?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Is your child currently taking any medications?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Is your child currently taking any medications?']
          )
        },
      },
      {
        id: 'fldDiCzIonFB6qyGi',
        name: 'Does your child have any  medication allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldO1HAj54zKajn24',
        name: 'If yes, what are the medication allergies?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Does your child have any  medication allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Does your child have any  medication allergies?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does your child have any  medication allergies?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Does your child have any  medication allergies?']
          )
        },
      },
      {
        id: 'fldA4Dba7SAIy69Yb',
        name: 'Does your child speak clearly?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldSO0QtfO4Dbvybf',
        name: 'Does your child have good hand-eye coordination? know left from right?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldvfJ67ynk1JCcsF',
        name: 'Does your child read?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldoS0H49nclEkpiB',
        name: 'Does your child interact well with others? ',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldH9FEPi4diZrMY7',
        name: 'Does your child stay dry all night?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldPyE37Vk20nibtq',
        name: 'Do you have concerns about how your child sees?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['7', '8'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['7', '8'].some((r) => values.Age.includes(r))
          }
          return ['7', '8'].includes(values.Age)
        },
      },
      {
        id: 'fldd39Kzk0kdtReib',
        name: 'Do you have concerns about how your child hears or speaks?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['7', '8'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['7', '8'].some((r) => values.Age.includes(r))
          }
          return ['7', '8'].includes(values.Age)
        },
      },
      {
        id: 'fldpAb7gGwpWYW7Jk',
        name: 'Does your child have good hand-eye coordination?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['7', '8'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['7', '8'].some((r) => values.Age.includes(r))
          }
          return ['7', '8'].includes(values.Age)
        },
      },
      {
        id: 'fldV6Cx1LnJayz1gP',
        name: 'Are you concerned about your child interaction with peers at school?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldf6MxSlx7bQP3T3',
        name: 'Does your child play cooperatively with other children?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['7', '8'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['7', '8'].some((r) => values.Age.includes(r))
          }
          return ['7', '8'].includes(values.Age)
        },
      },
      {
        id: 'fldX0Jr3sXcD1ELAn',
        name: 'Has your child ever failed a vision screening test?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a peadiatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldHnSr6VE6oA9yii',
        name: 'Do you have concerns about how your child sees, hears, or speaks?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldLjnsLuQvioubjv',
        name: 'Have you talked to your child about puberty?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a HN consult meeting',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'flda82PcgSMrP3ePa',
        name: 'Does your child have friends at school?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldQZo8JrtHxME10C',
        name: 'Does your child have good physical coordination overall?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldyyYoiF1oAqBZAD',
        name: 'Do you have any concerns about your hearing or sight?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a Virtual consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fld37r7nRKNOeLhFF',
        name: 'What grade level is your child in school?  ',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If not age appropriate, schedule Health Check',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'flddy5e50DNv9ZwSv',
        name: 'Is your child doing grade-level work at school/ able to keep up with school work?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldCWMM1f4wQrUSV8',
        name: 'Other activities (music/arts/sports/other)?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld3PRkXvYO8xC91P',
        name: 'What are your child interests and goals?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldomqHCj9btn54eu',
        name: 'What grade?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldpMHCq4xCituMSy',
        name: 'Are you or anyone else worried about your grades?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fld6djaYnHkrJDPz2',
        name: 'What are your interests and future goals?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldh0NXy1dJxhwG9i',
        name: 'What activities do you participate in (music/arts/sports/other)?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldnPdiO6x8I9E79H',
        name: 'How many hours of NON-SCHOOL related screen time do you get per day? ',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If above 4 hours, automate content ',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldh5rXuATuayEz6y',
        name: 'How much dairy does your child drink (cow milk, goat milk, camel milk, soy milk, yoghurt) per day?',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in cups. If less than 1 cup, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldqA5oU9pXMpXyZx',
        name: 'Does your child have any dietary restrictions (like food allergies or intolerances)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldwGS3VawLEKUGKq',
        name: 'Is your child eating at least 1 fruit and 2 servings of vegetables per day? ',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'flduLPxzJ2hkxN6I2',
        name: 'Does your child eat iron-rich foods (meat, iron-fortified cereal, or beans) per day?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldAqnDLniSraXQNM',
        name: 'How much juice or sweet beverages does your child drink in a day?   ',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in cups. If more than 2 cups, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld5pWUTZRLDVNBgK',
        name: 'Does your child eat junk/fast food (crisps, biscuits, sweet, chocolate, pizza, chips, burgers) more than twice per week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld2nL52ifSpDd8tV',
        name: 'Does your child take any dietary supplements?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldbbISzKbEPoOf1c',
        name: 'How much dairy do you drink (cow milk, goat milk, camel milk, soy milk, yoghurt) per day?',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in cups. If less than 1 cup, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldBt4ALDuJNEpw7P',
        name: 'How much juice/soda/sports/energy drinks do you drink each day? ',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in cups. If more than 2 cups, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldmSBDyqcSkuuLut',
        name: 'How much tea or coffee do you drink in a day?',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in cups. If more than 2 cups, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldQtuyGyIT4wRJoU',
        name: 'Do you eat at least 1 fruit and 2 servings of vegetables per day? ',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldx4B0hv8d9DrNhr',
        name: 'Do you eat junk/fast food (crisps, biscuits, sweet, chocolate, pizza, chips, burgers) more than twice per week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldHIwKmFsZ7PWF1t',
        name: 'Do you eat iron rich foods (meat, iron-fortified cereals, beans) daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldCL5dPg85nKvM1G',
        name: 'Do you take any dietary supplements?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldn6jLGAh7JanqUX',
        name: 'Are you trying to gain or lose weight currently?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fld4kgxjsuZ870oys',
        name: 'Are there any problems with pooping or peeing?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes, schedule pediatric consultation',
      },
      {
        id: 'fldXEFMGrcZV9IDFY',
        name: 'Does your child exercise or play sports most days of the week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If No and Age is between 8 and 11, automate content push\nIf No and Age= 6 and Age=7 , schedule HN consultation meeting',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldTRex2gJK5XWGyx',
        name: 'Does your child have any chest pain or shortness of breath with exercise?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a Virtual Consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['8', '9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldfvoY47HezMFi7W',
        name: 'Has your child had a major sports related injury or concussion?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['8', '9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldQt2qHbG5jbTPND',
        name: 'Do you exercise or play sports most days of the week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldDa0tfkD2qzcAuK',
        name: 'Do you have any chest pain, dizziness, or fainting with exercise?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldohHdBoH0AVa9As',
        name: 'Have you ever had a seizure or loss of consciousness?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldO2tlgTdz97Encj',
        name: 'Have you ever had a concussion or head injury?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldrgMpEbzpZS2huY',
        name: 'Do you use an inhaler for asthma, cough, or sports?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldTGSqDoxXqbP3rm',
        name: 'Does your child see a dentist every 12 months/ 1 yr?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldAoeKLSsUhiOcD7',
        name: 'Does your child brush (with your help) her/his teeth daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld8Rizmeoohhnm2n',
        name: 'Do you brush your teeth daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldb7durz5k2EmSNR',
        name: 'Do you see a dentist regularly (twice a year)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldI4NkegrwIXFKAT',
        name: 'How many hours does your child sleep at night?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If below 6 hrs, schedule a mental health consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldtUsXKw4Ed8iPs7',
        name: 'Does your child snore on a regular basis?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule health check',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldatriE2eUBtD46F',
        name: 'How many hours do you sleep at night?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldlK686pZyjmHtTu',
        name: 'Are you satisfied with your sleep?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a mental health consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldcZwMPi0d9qYYuJ',
        name: 'Does your child get screen time more than 2 hours per day?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld31tEw8LLs6ErYy',
        name: 'Is there a television or computer in your child bedroom?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldRqmkPd2mUQi24h',
        name: 'Do you monitor your child television and internet use?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldrxccsGMWeeNsyj',
        name: 'Is your child always supervised when near water and also able to swim?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldT9NRLzI3OcHBxk',
        name: 'Have you discussed stranger awareness and personal safety with your child?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldX0D4WoR6xixYZK',
        name: 'Has your child seriously injured or been seriously injured in the past year?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldvqYTwDPJvLVu4H',
        name: 'Has your child ever bullied or been bullied (including cyber-bullied)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, Schedule MHC consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldWQmKS9hLBfoiwJ',
        name: 'Does your child often seem sad or depressed?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, Schedule MHC consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldVrPO9kcVTsRZBD',
        name: 'Does your child spend time with anyone who smokes or vapes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6', '7', '8', '9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6', '7', '8', '9', '10', '11'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['6', '7', '8', '9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldZUCYlpiRMLvCDE',
        name: 'Has your child ever smoked cigarettes, chewed tobacco, or vaped?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld6tc0bWN3ulyqxq',
        name: 'Are you concerned that your child is drinking alcohol, smoking, or abusing drugs (over-the-counter, prescription, sniffing glue)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fld1AUxowusT6lgos',
        name: 'Does your child have friends or family members who have a problem with drugs or alcohol?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['9', '10', '11'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['9', '10', '11'].some((r) => values.Age.includes(r))
          }
          return ['9', '10', '11'].includes(values.Age)
        },
      },
      {
        id: 'fldajxJXi7Jw1ulT9',
        name: 'Do you always wear a seat belt when in the car?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, automate content push',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldtCRAmriSh6Fmif',
        name: 'Have you ever bullied or been bullied (including cyber-bullied)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldO73Dpt4DSScwGp',
        name: 'Do you spend time with anyone who smokes or vapes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VCD consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['12', '13', '14', '15', '16', '17'].some((r) =>
              values.Age.includes(r)
            )
          }
          return ['12', '13', '14', '15', '16', '17'].includes(values.Age)
        },
      },
      {
        id: 'fldUgxMiRpTT2skgc',
        name: 'Have you had your first period?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: ['Gender', 'Age'],
        parentValues: ['Female', '12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          return (
            ['12', '13', '14', '15', '16', '17'].includes(values.Age) &&
            ['Female'].includes(values.Gender)
          )
        },
      },
      {
        id: 'fldBqWs2VfB92uxaN',
        name: 'Are your periods irregular, painful, or heavy?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a Virtual consultation',
        conditionType: '',
        parentKey: 'Have you had your first period?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Have you had your first period?'])) {
            return ['Yes'].some((r) =>
              values['Have you had your first period?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Have you had your first period?'])
        },
      },
      {
        id: 'fldFbu8XGM0DQ1JlQ',
        name: 'Do you have any questions about your periods?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a VC',
        conditionType: '',
        parentKey: ['Gender', 'Age'],
        parentValues: ['Female', '12', '13', '14', '15', '16', '17'],
        condition: (values: any) => {
          return (
            ['12', '13', '14', '15', '16', '17'].includes(values.Age) &&
            ['Female'].includes(values.Gender)
          )
        },
      },
    ],
  },
  {
    name: 'Minor Health Check (0 to 5)',
    id: 'tblUM9EHWPoKlh943',
    helper:
      'Please fill this form only if minor is younger than 5 years old, if not, delete the form from the workflow',
    fields: [
      {
        id: 'fldw4qcGpVJHk29BJ',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld65H9o3BuI52TQf',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldpvTRsR1UtgUVnU',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldbLLSznDKiFyqjD',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fldRVyquXWH9xH90R',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldQoguueforo7NPT',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper: '',
      },
      {
        id: 'fldzwSzrSYPRDIgEy',
        name: 'Date Of Birth',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldD0s8myEMPxpX8c',
        name: 'Age',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Put 1 if less than a year and if not prefilled',
      },
      {
        id: 'fldrL1bkXNXnuGELv',
        name: 'Gender',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldQ6MAbkh2bIPSzL',
        name: 'Do you know your child height/length (m)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the height/ length in meters',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldkAtTkS1bzuBluO',
        name: 'Do you know your child weight (kg)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the weight in kgs',
      },
      {
        id: 'fldyxaO2l7hblx0FS',
        name: 'Do you have any concerns about your child health today?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Schedule a pediatric consult if symptoms have persisted for the last 7 days',
      },
      {
        id: 'fld1lkfS7KfyENayY',
        name: 'What are your concerns?',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Do you have any concerns about your child health today?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do you have any concerns about your child health today?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Do you have any concerns about your child health today?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Do you have any concerns about your child health today?']
          )
        },
      },
      {
        id: 'flds0HFOVPbVlTCnD',
        name: 'Does your child currently have a medical condition?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, Schedule a VCD consultation',
      },
      {
        id: 'fldJvDlw5fpfAMPpw',
        name: 'Please tell us the condition',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Does your child currently have a medical condition?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Does your child currently have a medical condition?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does your child currently have a medical condition?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Does your child currently have a medical condition?']
          )
        },
      },
      {
        id: 'fldDCBNVShh92Mblc',
        name: 'Do you know whether your child vaccines are up to date?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldlL8WiDIdflxOjP',
        name: 'Has your child had any reactions to vaccinations in the past?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldP3SixGFsw1ddjz',
        name: 'If yes, what reactions did your child get?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey:
          'Has your child had any reactions to vaccinations in the past?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Has your child had any reactions to vaccinations in the past?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Has your child had any reactions to vaccinations in the past?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Has your child had any reactions to vaccinations in the past?'
            ]
          )
        },
      },
      {
        id: 'fldFKkD1Vg4pZE0H8',
        name: 'Does your child have any  food allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld1t5Q2ecNcIRW6w',
        name: 'Does your child have any medication allergies?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldcu41r5LcRYp7qZ',
        name: 'If yes, what are the allergies?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: [
          'Does your child have any  food allergies?',
          'Does your child have any medication allergies?',
        ],
        parentValues: ['Yes'],
        condition: (values: any) => {
          return (
            ['Yes'].includes(
              values['Does your child have any  food allergies?']
            ) ||
            ['Yes'].includes(
              values['Does your child have any medication allergies?']
            )
          )
        },
      },
      {
        id: 'fldjnVIoc2foRHhae',
        name: 'Is your child currently taking any medications or supplements?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld8HinJ0UpMfoVKH',
        name: 'If yes, what are the medication/supplement details?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Please enter the medications in the HN prescription form if all details are available or create a task for HN to collect data and add a new Rx in the src for the member.',
        conditionType: '',
        parentKey:
          'Is your child currently taking any medications or supplements?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Is your child currently taking any medications or supplements?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Is your child currently taking any medications or supplements?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Is your child currently taking any medications or supplements?'
            ]
          )
        },
      },
      {
        id: 'fldtWVIMMrw1o0pDj',
        name: 'Has your child had any surgeries before?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If yes, schedule a VCD consultation',
      },
      {
        id: 'fldUbw42qcpIYlJ5t',
        name: 'Please describe any surgeries your child might have had',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Has your child had any surgeries before?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Has your child had any surgeries before?'])
          ) {
            return ['Yes'].some((r) =>
              values['Has your child had any surgeries before?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Has your child had any surgeries before?']
          )
        },
      },
      {
        id: 'fld7mo8u8Y67h4DfA',
        name: 'Has your child ever been hospitalized',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If yes, schedule a VCD consultation',
      },
      {
        id: 'fldURweYuR2Re6Gvb',
        name: 'Please tell us for what and when that was',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Has your child ever been hospitalized?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Has your child ever been hospitalized?'])) {
            return ['Yes'].some((r) =>
              values['Has your child ever been hospitalized?'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Has your child ever been hospitalized?']
          )
        },
      },
      {
        id: 'fldMOMzPBcZGQv6ky',
        name: 'Has your child ever had been diagnosed with a condition that lasted longer than 3 months',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If yes, schedule a VCD consultation',
      },
      {
        id: 'fldfFIfHVv1s09a6C',
        name: 'Please tell us what the condition was',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          'Has your child ever had been diagnosed with a condition that lasted longer than 3 months',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Has your child ever had been diagnosed with a condition that lasted longer than 3 months'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Has your child ever had been diagnosed with a condition that lasted longer than 3 months'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Has your child ever had been diagnosed with a condition that lasted longer than 3 months'
            ]
          )
        },
      },
      {
        id: 'fldJWX2wHZGk4ECVW',
        name: 'Does your baby look at your face?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 90
        },
      },
      {
        id: 'fldwHhktvkEro8pBb',
        name: 'Does your baby respond to voices or sounds?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 21
        },
      },
      {
        id: 'fldtAn0viQgpSLdpl',
        name: 'Do you have any concerns about how your baby sees or hears?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 90
        },
      },
      {
        id: 'fldsUjCjcEt11GlTP',
        name: 'Does your baby move both arms and legs equally?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 90 && diff >= 14
        },
      },
      {
        id: 'fld5RTpCZ3kYxUbq9',
        name: 'Does your baby smile at you?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 90 && diff >= 14
        },
      },
      {
        id: 'fldZUElI1UqAI9WTJ',
        name: 'Does your baby talk to you (“coo”)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 90 && diff >= 14
        },
      },
      {
        id: 'fldcE196BOnUufOR8',
        name: 'Does your baby lift his/her head 45˚ when lying on his/her tummy?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff <= 90 && diff >= 14
        },
      },
      {
        id: 'fldbp3wPZOqh6djAj',
        name: 'Does your baby feed him/herself finger foods?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 360
        },
      },
      {
        id: 'fldRF9cezLKUxj4fC',
        name: 'Does your baby pick objects up with thumb and index finger?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 360
        },
      },
      {
        id: 'fldLWMlUBsHPQ4dyh',
        name: 'Does your baby babble (e.g. “dada,” “mama”)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 270
        },
      },
      {
        id: 'fldbJ7JHJxzeZC37u',
        name: 'Does your baby understand “no” or their name?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 270
        },
      },
      {
        id: 'fldkA12dONFGXrbSU',
        name: 'Does your baby sit without support?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 270
        },
      },
      {
        id: 'fldf7BM3zlR5HPTmu',
        name: 'Does your baby crawl or scoot around?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 270
        },
      },
      {
        id: 'fldriMrYDNO7VrHSP',
        name: 'Does your baby pull to stand?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 270
        },
      },
      {
        id: 'fldL9WMJhbZvgQv8Q',
        name: 'Does your baby see without crossing/drifting eyes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 270
        },
      },
      {
        id: 'fldFTiWChSh97D6Ka',
        name: 'Does your baby hold a cup to drink?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldG0bcZxcje2xjbD',
        name: 'Does your baby combine syllables (e.g. “dada,” “mama”)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldoipChxi0N7yDGG',
        name: 'Does your baby use gestures (point with finger/hand)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldchENYu2TGddaQo',
        name: 'Does your baby understand words (“no,” “more”)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fld0aPwG7Qhk60Tmu',
        name: 'Does your baby play peek-a-boo?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldDwQh5FXw3JskiJ',
        name: 'Does your baby look at something when you point and say “look”?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fld07afoHgwYTMKi3',
        name: 'Does your baby see well without crossing or drifting eyes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldpz8IdUMrdPlH51',
        name: 'Does your baby walk while holding onto furniture (cruise)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldvuJario1RGrf27',
        name: 'Does your baby walk alone?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 360 && diff <= 450
        },
      },
      {
        id: 'fld2c5ejzDLeaMxSO',
        name: 'Does your baby clap hands?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldK2IHkUIb1ftjyt',
        name: 'Does your baby wave bye-bye?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 360
        },
      },
      {
        id: 'fldG1qCk2SpaKnpA5',
        name: 'Does your baby scribble with a crayon/pencil?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return (!isNaN(parseFloat(diff)) && diff === 540) || diff === 450
        },
      },
      {
        id: 'fldTFBuZVikEl1wj7',
        name: 'Does your baby drink from a cup and feed him/herself finger foods?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 450
        },
      },
      {
        id: 'fldjJEc2aVQBDdCUG',
        name: 'Does your baby say at least 3 words (eg. “hi”, “no”, “uh-oh”)',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 450
        },
      },
      {
        id: 'fldNTPsWHwsLgfhGu',
        name: 'Does your baby say “words” that you dont understand (jargoning)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 450
        },
      },
      {
        id: 'fldxsG7O2lxSIZ944',
        name: 'Does your baby understand and follow simple commands?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 540 && diff <= 450
        },
      },
      {
        id: 'fldeDw7R0B9kNQW9g',
        name: 'Does your baby bend down and then stand up again?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 450
        },
      },
      {
        id: 'flduaVO8aQVfY5rlm',
        name: 'Does your baby crawl up stairs?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 450
        },
      },
      {
        id: 'fldIFZ6h7qRQujQzG',
        name: 'Does your baby stack 2 blocks or objects (one on another)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return (!isNaN(parseFloat(diff)) && diff === 450) || diff === 540
        },
      },
      {
        id: 'fldJGewau5sUp5AF5',
        name: 'Does your baby enjoy books?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return (!isNaN(parseFloat(diff)) && diff === 450) || diff === 540
        },
      },
      {
        id: 'fldIDceOUVffbQBbQ',
        name: 'Does your baby walk well?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldtlN9oe22Y5qBnL',
        name: 'Does your baby run?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldq7BajlzBtGrfJc',
        name: 'Does your baby climb?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldyVvRmyoxyxXrBQ',
        name: 'Does your baby drink from a cup?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldvefRs5FyCf7Ep2',
        name: 'Does your baby feed with a spoon?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldZnCR5ZkmLQq67W',
        name: 'Does your baby say at least 4-10 words?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldU7pg6lql42QeOY',
        name: 'Does your baby point to 4-6 body parts when asked?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 540
        },
      },
      {
        id: 'fldthGZXQLyG10xm0',
        name: 'Who provides daytime care for your child?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 540
        },
      },
      {
        id: 'fldmQ3LFPePJW8Zt3',
        name: 'Does your baby know 6 or more body parts?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldNfegaxyykMdgCc',
        name: 'Does your baby use utensils?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldXiaQN3AERSuxcb',
        name: 'Is your child showing interest in potty training?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldCPSXT1VqbMoKVi',
        name: 'Does your child kick a ball?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldHkhhxvZxAvdxyN',
        name: 'Does your child jump off the ground?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldUAt9nPJoDpRhuG',
        name: 'Does your baby use more than 50 words?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldPpfDtLIyYy4e7z',
        name: 'Does your baby use pronouns (I, me, you)? ',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldAEaXq1pAKVViEO',
        name: 'Does your baby scribble?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldVXOVa9b1BWKowS',
        name: 'Does your baby jump in place?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fld8S7TtbsFhZT5Mu',
        name: 'Does your baby walk up/down the stairs?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldG7tt3Aa18pB0BV',
        name: 'Does your baby understand directions?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fld6Xd9qIoD4PFzIy',
        name: 'Does your child use alternating feet when walking up stairs?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldsMw17cwbyvmZgM',
        name: 'Does your child understand concepts like cold, tired, hungry?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldgQVBbb2yOOji92',
        name: 'Does your child start to say the ABCs?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fld1ClmTRDPw3bIeT',
        name: 'Does your child identify several colors?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldmwkfsoUtAuzQtP',
        name: 'Does your child draw a circle?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldZqsPW5qAbzsSQg',
        name: 'Does your child speak and be 75% understandable even to a stranger?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldYLI6lGL63MOb2k',
        name: 'Do you and your child read together daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'If No and age= 3, schedule pediatric consultation\nIf No and age= 4 or 5, create a task to send content',
        conditionType: '',
        parentKey: ['Age'],
        parentValues: ['3', '4', '5'],
        condition: (values: any) => {
          return ['3', '4', '5'].includes(values.Age)
        },
      },
      {
        id: 'fldw6cX5iruJb92d7',
        name: 'Does your child speak in 3 word sentences?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldfncrnxymZR6RWe',
        name: 'Does your child use plurals (cars)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fld3By7vk6fa4f7AG',
        name: 'Does your child help with dressing and brushing teeth?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3'].some((r) => values.Age.includes(r))
          }
          return ['3'].includes(values.Age)
        },
      },
      {
        id: 'fldJGic9vs3xyOEAe',
        name: 'Does your child throw a ball?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'flduxv2IuxVQBoJZn',
        name: 'Does your child know some colors/letters?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fldTbsawTZH7kVLcz',
        name: 'Does your child speak in complex sentences?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fldIAfuulLFhAemuk',
        name: 'Does your child count to 10?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fldsSyf5iyNqLmgwe',
        name: 'Does your child know their full name?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fldwiQYGzYwdjETUr',
        name: 'Does your child speak clearly (understandable to all)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fld4QkVdLP6z1nuTL',
        name: 'Does your child tell stories? _ sing songs? _ use their imagination?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fldMeJxPF1CH17Dss',
        name: 'Does your child have friends and enjoy playing with others?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['4'].some((r) => values.Age.includes(r))
          }
          return ['4'].includes(values.Age)
        },
      },
      {
        id: 'fldVw7IFfrs8MAIFS',
        name: 'Does your child stay dry all day?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: ['Age'],
        parentValues: ['3', '4'],
        condition: (values: any) => {
          return ['3', '4'].includes(values.Age)
        },
      },
      {
        id: 'fldKl17VlwVnltGuB',
        name: 'Does your child catch a ball?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldfCpsLzgidqtyPo',
        name: 'Does your child hop on one foot?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldMCIMaDjF9nKGEC',
        name: 'Does your child jump a short distance?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldlGODHhOXIdqgVA',
        name: 'Does your child draw a triangle?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldgJDA4Vv8x6eSfF',
        name: 'Does your child draw a person?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldqaxSMsrQmeDSDO',
        name: 'Does your child write their name?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldg69AStluICbTD9',
        name: 'Does your child cut with safety scissors?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fld9x2SxVhZg3S5wv',
        name: 'Does your child color?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldiEA7qiZMWJXzc7',
        name: 'Does your child play well with others?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldyxNLaZS8KS3k4j',
        name: 'Does your child speak clearly?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldyO2XZPYTWUYfQY',
        name: 'Does your child tell stories?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldhK0lfOGV9FLboy',
        name: 'Does your child stay dry all day and night?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fld7ltGXRwtI2ji48',
        name: 'What grade level is your child in school?  ',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If not age appropriate, schedule HC',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldvkGbHgA6fKz7Pp',
        name: 'Where?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'What grade level is your child in school?  ',
        condition: (values: any) => {
          if (
            Object.prototype.hasOwnProperty.call(
              values,
              'What grade level is your child in school?  '
            )
          ) {
            return values['What grade level is your child in school?  '] !== ''
          }
          return false
        },
      },
      {
        id: 'fldhM7NF0ptpXxxhY',
        name: 'Is your child doing grade-level work at school/ able to keep up with school work?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
      },
      {
        id: 'fldGaOlBfQcKfsTkB',
        name: 'Other activities (music/arts/sports/other)?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fld73TTxvKu2laaqi',
        name: 'What are your child interests and goals?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldtkNYYwTPk6stLb',
        name: 'Do you give your baby a bottle of anything other than formula or breast milk?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a Nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 14 && diff <= 150
        },
      },
      {
        id: 'fldkGTaGI5UWjswFW',
        name: 'Do you have any concerns about your baby feeding or weight?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a Nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 14 && diff <= 150
        },
      },
      {
        id: 'fldi2PjV4j5zNZOl9',
        name: 'If breastfeeding, does your baby have any latching problem?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 14 && diff <= 150
        },
      },
      {
        id: 'fldljtw4AFa4mcAv1',
        name: 'How much dairy does your child drink (cow milk, goat milk, camel milk, soy milk, yoghurt) per day?',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If less than 2 cups, send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 1800
        },
      },
      {
        id: 'fld6NZG9m0TG2zu0K',
        name: 'Does your baby eat calcium-rich foods daily? (milk, yoghurt, beans, soya, spinach, etc)',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldSC8QxyOqoQ735m',
        name: 'Is your child eating a variety of fruits and vegetables daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldoZ19W2KydkTM9I',
        name: 'Does your child eat iron-rich foods (meat/iron-fortified cereal, beans) daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldEeGoEeVUp3rUOF',
        name: 'Do you give your baby any other beverages except formula, milk, water or fresh fruit juice?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fld4t0zwy6bsDYfmJ',
        name: 'Does your child get 3 servings of calcium-rich foods (milk, yoghurt, beans, soya, spinach, etc) daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'fldSw9N0CWKe41ZHr',
        name: 'Does your child eat iron-rich foods (meat, iron fortified cereal, beans) daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'fld4kN9b8C35Ajpl1',
        name: 'How much juice or other sweet beverage does your child drink per day?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If more than 1 cup, send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'fld9DYttZDrxJlCFd',
        name: 'Does your child eat junk/fast food (crisps, biscuits, sweet, chocolate, pizza, chips, burgers) more than twice per week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, send content.',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'flduO7Xu9bDGdvzo0',
        name: 'Does your child have any dietary restrictions (like food allergies or intolerances)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'fld6BNECi1yjrL9So',
        name: 'Does your child take any dietary supplements?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'flds0jgAYURwPTjzM',
        name: 'Does your baby have at least 6-8 wet diapers in 24 hours? ',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 14
        },
      },
      {
        id: 'fld3EmrGMJKSVOBuM',
        name: 'Does your baby have a strong urine stream?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 14
        },
      },
      {
        id: 'fldrgjtWFrm8AOrD6',
        name: 'Does your baby have soft, yellow poops?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a VCD',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 14
        },
      },
      {
        id: 'fldXDunkc8luIz9uN',
        name: 'Does your baby have daily poops with a soft/loose consistency?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule a VCD',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 30 && diff <= 180
        },
      },
      {
        id: 'flds1xPfc4iZU7Ebl',
        name: 'Are there any problems with pooping or peeing?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes, schedule VCD',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 210 && diff <= 1800
        },
      },
      {
        id: 'fldJDlLeacPkaZpqi',
        name: 'Does your child play actively most days of the week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If no, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 940
        },
      },
      {
        id: 'fld1SHlgrYFPXgE4r',
        name: 'Does your child exercise or play sports most days of the week?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule health check',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldl7W9BVgGDyGGx4',
        name: 'What is the longest time your baby sleeps at night without feeding?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in hours',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return (!isNaN(parseFloat(diff)) && diff >= 14) || diff <= 60
        },
      },
      {
        id: 'fld2XjuM60eeTJ1XC',
        name: 'Do you always put your baby to sleep on her/his back?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return (!isNaN(parseFloat(diff)) && diff >= 14) || diff <= 60
        },
      },
      {
        id: 'fldZjikz4YwbYFR6a',
        name: 'Where does your baby sleep?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return (!isNaN(parseFloat(diff)) && diff >= 14) || diff <= 60
        },
      },
      {
        id: 'fldeaIZUMGfRCALJp',
        name: 'How long does your child sleep at night without awakening?    ',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in hours',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 540
        },
      },
      {
        id: 'fldtKOd1dCyJ3wsCl',
        name: 'How long does your child nap throughout the day?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in minutes',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 540
        },
      },
      {
        id: 'fldq8uDePSqm2WZSS',
        name: 'Can they self-soothe? ',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 540
        },
      },
      {
        id: 'fldPVVwHZ6Q8DH2Lj',
        name: 'Where does your child sleep?',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 540
        },
      },
      {
        id: 'fldQxhkZ8dZqwrk9i',
        name: 'How long does your child sleep at night?   ',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in hours',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2', '3', '4', '5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2', '3', '4', '5'].some((r) => values.Age.includes(r))
          }
          return ['2', '3', '4', '5'].includes(values.Age)
        },
      },
      {
        id: 'fldNUIrMIC8AQrXhv',
        name: 'How long does your child nap?  ',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Enter in minutes',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2', '3', '4', '5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2', '3', '4', '5'].some((r) => values.Age.includes(r))
          }
          return ['2', '3', '4', '5'].includes(values.Age)
        },
      },
      {
        id: 'fldx8uwkwQk7WQQRA',
        name: 'Does your child snore on a regular basis?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule health check',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fld6YFMB8tqLEkQ2V',
        name: 'Do you always place your baby in a rear-facing car seat in the back seat?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 14
        },
      },
      {
        id: 'fldvOgVXh7PHPHUpm',
        name: 'Is your car seat the right one for the age and size of your baby?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 14
        },
      },
      {
        id: 'fldt8utNvrCtMeNRK',
        name: 'Does your baby get any screen time?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 60
        },
      },
      {
        id: 'fldTFFrPZjVMqGHcB',
        name: 'Does your baby spend time with anyone who smokes or vapes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && (diff === 14 || diff === 60)
        },
      },
      {
        id: 'fldVYwvFEbXHlOBf3',
        name: 'Do you always stay with your baby when she/he is in the bathtub?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, schedule pediatric consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 60
        },
      },
      {
        id: 'fldUzT9BYR9Bnww5B',
        name: 'Does your child use a car seat when travelling in cars?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff === 60
        },
      },
      {
        id: 'fld3YVDnZJZqMbmyn',
        name: 'Does your child get any screen time?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 270 && diff <= 750
        },
      },
      {
        id: 'flduBXaL7ST1q00qi',
        name: 'Does your child get screen time more than 1 hour per day?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3', '4'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3', '4'].some((r) => values.Age.includes(r))
          }
          return ['3', '4'].includes(values.Age)
        },
      },
      {
        id: 'fldgdylpiMT3ewZTc',
        name: 'Does your child get screen time more than 2 hours per day?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If Yes, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['5'].some((r) => values.Age.includes(r))
          }
          return ['5'].includes(values.Age)
        },
      },
      {
        id: 'fldgnGRIlqXhnx7o8',
        name: 'Is your child always supervised when near water, including the bathtub?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fldnW1j3zi70R0ga4',
        name: 'Do you have safety guards on upper floor windows and gates for the stairs?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fldd0Qap5jjJjwUDm',
        name: 'Does your home have cleaning supplies/medicines/matches locked away?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fld6XTWCvjW3OMr5l',
        name: 'Is your child learning how to swim?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fldb9ZY30WkTa3gf7',
        name: 'Is your child car seat appropriately sized, rear-facing, and in the back seat?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fldjXZnMujP1oQzde',
        name: 'Do you always check for children before backing your car out?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fldpPAakmNnhB9yBF',
        name: 'Does your child wear a helmet when riding anything with wheels?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 1800
        },
      },
      {
        id: 'fldNHB4RMdn3juPNb',
        name: 'Do you brush your child teeth daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 240 && diff <= 540
        },
      },
      {
        id: 'fldSRnCtZnmsAucN9',
        name: 'Does your child see a dentist annually (once a year)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['2'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['2'].some((r) => values.Age.includes(r))
          }
          return ['2'].includes(values.Age)
        },
      },
      {
        id: 'fldXUUZdojDkZn4QP',
        name: 'Does your child see a dentist every 6 months?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3', '4', '5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3', '4', '5'].some((r) => values.Age.includes(r))
          }
          return ['3', '4', '5'].includes(values.Age)
        },
      },
      {
        id: 'fldFf4rLqPj4qMApI',
        name: 'Does your child (with your help) brush his/her teeth daily?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If No, create a task to send content',
        conditionType: '',
        parentKey: 'Age',
        parentValues: ['3', '4', '5'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['3', '4', '5'].some((r) => values.Age.includes(r))
          }
          return ['3', '4', '5'].includes(values.Age)
        },
      },
    ],
  },
  {
    id: 'tbl9clBB6eEPiIbmS',
    name: 'Healthy triage form',
    fields: [
      {
        id: 'fldJ1jlmDfsJH9x0M',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldYGlDNBU3s7yL08',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fld1ovFAUaWYAp6fe',
        name: 'Healthy Program Tracking',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld6sR3Mi58IYorkN',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblxRNsmLq9YDmMVm',
        required: false,
        helper:
          'Seba: this is optional but might be helpful for tracking/monitoring. It is a link to the member record in Healthy program table',
      },
      {
        id: 'fldwKVqOLHP4br93O',
        name: 'Gender',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'flduWbM6VacIUZxo8',
        name: 'Triage date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldkJAQssyntEJ4qE',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldRgKK354Cbly9Fe',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fldGVduOoMTEm5uW2',
        name: 'Triaged Health goals',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld9bscs7oEo0Mpre',
        name: 'Healthy eating interests',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'I want to...',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Eating healthy'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Eating healthy'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Eating healthy'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldgQdAsgZOnXPtjx',
        name: 'Other healthy eating interest',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Healthy eating interests',
        parentValues: ['Other reason'],
        condition: (values: any) => {
          if (Array.isArray(values['Healthy eating interests'])) {
            return ['Other reason'].some((r) =>
              values['Healthy eating interests'].includes(r)
            )
          }
          return ['Other reason'].includes(values['Healthy eating interests'])
        },
      },
      {
        id: 'fldBpZKYvED0tztzN',
        name: 'Preferred Healthy eating resources',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Eating healthy'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Eating healthy'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Eating healthy'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldGtnVF76TtRBXFY',
        name: 'Other preferred healthy eating resource',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Preferred Healthy eating resources',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Preferred Healthy eating resources'])) {
            return ['Other'].some((r) =>
              values['Preferred Healthy eating resources'].includes(r)
            )
          }
          return ['Other'].includes(
            values['Preferred Healthy eating resources']
          )
        },
      },
      {
        id: 'fldmsvZxR6wL6JXv1',
        name: 'Current fitness description',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Tell us the type of exercise, duration in minutes/hours, frequency in days/weeks. Example: Walking for 15 minutes, 5 days a week',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Getting fit'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Getting fit'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Getting fit'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldNoaonw3H3VPOIh',
        name: 'Fitness interests',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'I enjoy...',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Getting fit'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Getting fit'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Getting fit'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldltHl6CUcYSBql5',
        name: 'Other fitness interest',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Fitness interests',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Fitness interests'])) {
            return ['Other'].some((r) =>
              values['Fitness interests'].includes(r)
            )
          }
          return ['Other'].includes(values['Fitness interests'])
        },
      },
      {
        id: 'fldRzz9oCvq5JNX0G',
        name: 'Preferred fitness resources',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Getting fit'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Getting fit'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Getting fit'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldcDzTP6kkKR9KEW',
        name: 'Other preferred fitness resource',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Preferred fitness resources',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Preferred fitness resources'])) {
            return ['Other'].some((r) =>
              values['Preferred fitness resources'].includes(r)
            )
          }
          return ['Other'].includes(values['Preferred fitness resources'])
        },
      },
      {
        id: 'fldwpLGaakXnFoZEC',
        name: 'Do you have a decreased sex drive or libido?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fld7pKuA6B3s0fqwX',
        name: 'Do you experience pleasure during sexual activities?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If No book a VC, If Yes send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldoIBxjdCyBweyqp',
        name: 'Do you experience pain or burning sensation when urinating or during sexual activities?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldnHrO2yaqv3Jr4j',
        name: 'Do you often experience heightened levels of stress or anxiety that might be impacting your sexual health and intimacy in any way?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a MHC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldjYb17LFr045GrV',
        name: 'Do you currently have any penile discharge or rashes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldnjqO5Omv3I0MK5',
        name: 'Do you experience pain or swelling in your testicles?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fld5rNzjvEMxV4YST',
        name: 'Do you get an erection during sexual intercourse?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If No book a VC, If Yes send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldEgWukX77LxKAOL',
        name: 'Are you able to sustain an erection during sexual activities?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If No book a VC, If Yes send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldPegqvG503AdEBH',
        name: 'Do you ejaculate within a minute or less during sexual activities?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldiNl4ARAdxeiRol',
        name: 'Do you have lower abdominal pain not related to menstruation?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fld7ms7Q5xqwGfz5C',
        name: 'Do you have any vaginal itchiness, sores or rashes?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldwOxWfscR5cGjLM',
        name: 'Do you have any change in vaginal discharge (smell or color)?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fld0wHFO2L00Ec5lP',
        name: 'Do you experience vaginal bleeding or odour after sexual intercourse?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Healthy sex life'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Healthy sex life'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Healthy sex life'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldWqICNXcgmtY16E',
        name: 'Do you have any of the following skin problems?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Clearer skin'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Clearer skin'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Clearer skin'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'flddGnaE1knWSy6c3',
        name: 'Do you have any areas of redness, pain or discharge on your skin?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Clearer skin'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Clearer skin'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Clearer skin'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldWZuLnatclHjdzw',
        name: 'Do you have any allergies affecting your skin?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'If Food allergies → book an NC, if Medication allergies → send content, if None → no follow up needed',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Clearer skin'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Clearer skin'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Clearer skin'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldzamKNn8f1VoCvJ',
        name: 'Additional skin interests',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Tell us more...',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Clearer skin'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Clearer skin'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Clearer skin'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldrHWge5iEh6fgw5',
        name: 'Do you feel overwhelmed with your life?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Managing stress'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Managing stress'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Managing stress'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldowBxxtu0x4WCcj',
        name: 'Do you get less than 6 hours of sleep per night?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Managing stress'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Managing stress'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Managing stress'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldPJdt3wqvQwjrA1',
        name: 'Do you struggle to fall or stay asleep at night due to stress?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Managing stress'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Managing stress'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Managing stress'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldh856uenjXZnTSl',
        name: 'Do you have trouble staying focused on the present moment?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Managing stress'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Managing stress'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Managing stress'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldI4RdH4KDWPr5sk',
        name: 'Do you experience headaches or muscle tension frequently?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Managing stress'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Managing stress'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Managing stress'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldPefLbCK8zjuI2a',
        name: 'Do you have regular sleeping and waking up times?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Sleeping well'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Sleeping well'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Sleeping well'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldsPaN8ypZMLqZ4p',
        name: 'Do you experience disrupted sleep?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Sleeping well'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Sleeping well'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Sleeping well'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldFwHPAEr2ci4xvb',
        name: 'Do you have trouble falling or staying asleep at night? (sleep)',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Sleeping well'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Sleeping well'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Sleeping well'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldWqlZMek4s5lvf3',
        name: 'Do you use alcohol, medication or drugs to help you sleep?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Sleeping well'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Sleeping well'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Sleeping well'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldVriFWdyfo6kJUd',
        name: 'Do you have difficulties staying awake during day?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Sleeping well'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Sleeping well'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Sleeping well'].includes(values['Triaged Health goals'])
        },
      },
      {
        id: 'fldQSaeq2iFJI4R1M',
        name: 'How long have you been having lower back pain?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '- Occasional (Send content)\n- Less than 4 weeks (This is Acute LBP; schedule HC)\n- Between 4 and 12 weeks (This is Sub-acute LBP; schedule HC)\n- More than 12 weeks (This is Chronic LBP; schedule VC)',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fldt5M4HEH1w39DPU',
        name: 'Have you experienced any recent injuries or incidents that might have contributed to it?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fldpQF3A8j9PvQy7i',
        name: 'Are there any underlying medical conditions or relevant medical history that may contribute to your lower back pain?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fldWSaIUnHWK4nZuo',
        name: 'On a scale of 1 to 10, with 10 being the most severe, how would you rate the intensity of your pain?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If 3 and above book a VC, If less than 3 send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fld8HtAqPVjWm8cLB',
        name: 'Does the pain radiate to any other areas, such as your legs, buttocks, or hips?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fldXuqpu3wDURmYg9',
        name: 'Are there other symptoms accompanying your lower back pain, such as numbness, tingling, or weakness in the legs?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fld5hWxB2gesSyF8X',
        name: 'Have you noticed any specific activities or movements that make the pain worse or better?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'fldIVCN5vfFBl2bz9',
        name: 'Does the pain impact your daily life and activities, such as work, exercise, or sleep?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'If Yes book a VC, If No send content',
        conditionType: '',
        parentKey: 'Triaged Health goals',
        parentValues: ['Reduce lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Triaged Health goals'])) {
            return ['Reduce lower back pain'].some((r) =>
              values['Triaged Health goals'].includes(r)
            )
          }
          return ['Reduce lower back pain'].includes(
            values['Triaged Health goals']
          )
        },
      },
      {
        id: 'flddOt10uVx0JC4Ap',
        name: 'How would you like to engage with your Antara Wellness Family?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'I want to get... (select as many as you want)',
      },
    ],
  },
  {
    name: 'Lab/imaging management',
    id: 'tblYOGN4iEGRc3Mjm',
    fields: [
      {
        id: 'fld6bbxFuHmUvS0dX',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld3GL6Nfl7NcffTx',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldWQy5aMn2Ktt7dh',
        name: 'Type',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld9VL6rLwQmy4okQ',
        name: 'Routine lab (from Lab synced view)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldHRmEmdxwBgDzMT',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblV0rNDZCPe3ZalK',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Lab'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Lab'].some((r) => values.Type.includes(r))
          }
          return ['Lab'].includes(values.Type)
        },
      },
      {
        id: 'fldl5LFULpE3ff64k',
        name: 'Imaging type',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Imaging'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Imaging'].some((r) => values.Type.includes(r))
          }
          return ['Imaging'].includes(values.Type)
        },
      },
      {
        id: 'fldIWQMKsV3bcY9AE',
        name: 'Reason',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the reason why we are requesting this lab',
      },
      {
        id: 'fldOdL1I33KJI9jEE',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '[Needed] -> we want this service to happen but we have no logistic task planned or no appointment with provider scheduled\n[Scheduled] -> we have a logistic task planned or a provider appointment scheduled\n[Checkin Confirmed] -> if the request is about lab/imaging, this means the member went to facility or the sample was delivered to facility\n[Results received by Member] (only for lab and imaging)\n[Results received by Antara] (only for lab and imaging)\n[Results reviewed by HN] -> HN has identified from the result if Doctor needs to take over for review with member (only for lab and imaging)\n[Completed] -> results were reviewed with member for lab and imaging or PAFU is done for referral. Nothing else to do for this service request\n[Canceled]',
      },
      {
        id: 'fld4ozFXDprQvKat7',
        name: 'Sample Collection Date',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'That is when we collected the sample if we did it at Antara or the date and time the member went to the laboratory',
        conditionType: '',
        parentKey: 'Status',
        parentValues: [
          'Scheduled',
          'Checkin Confirmed',
          'Results received by Member',
          'Results received by Antara',
          'Results reviewed by HN',
          'Completed',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Status)) {
            return [
              'Scheduled',
              'Checkin Confirmed',
              'Results received by Member',
              'Results received by Antara',
              'Results reviewed by HN',
              'Completed',
            ].some((r) => values.Status.includes(r))
          }
          return [
            'Scheduled',
            'Checkin Confirmed',
            'Results received by Member',
            'Results received by Antara',
            'Results reviewed by HN',
            'Completed',
          ].includes(values.Status)
        },
      },
      {
        id: 'fldUWW0w1CY9BqM4j',
        name: 'Sample Drop Off Date',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'That is when we dropped the sample to that laboratory (only applicable if we managed the sample collection at Antara',
        conditionType: '',
        parentKey: 'Status',
        parentValues: [
          'Scheduled',
          'Checkin Confirmed',
          'Results received by Member',
          'Results received by Antara',
          'Results reviewed by HN',
          'Completed',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Status)) {
            return [
              'Scheduled',
              'Checkin Confirmed',
              'Results received by Member',
              'Results received by Antara',
              'Results reviewed by HN',
              'Completed',
            ].some((r) => values.Status.includes(r))
          }
          return [
            'Scheduled',
            'Checkin Confirmed',
            'Results received by Member',
            'Results received by Antara',
            'Results reviewed by HN',
            'Completed',
          ].includes(values.Status)
        },
      },
      {
        id: 'fld0Q1Ej07GxPwkfk',
        name: 'Result Date',
        type: 'date',
        format: '',
        isDateTime: true,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'That is when the results were provided to us, whether it was from facility directly or from member',
        conditionType: '',
        parentKey: 'Status',
        parentValues: [
          'Checkin Confirmed',
          'Results received by Member',
          'Results received by Antara',
          'Results reviewed by HN',
          'Completed',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Status)) {
            return [
              'Checkin Confirmed',
              'Results received by Member',
              'Results received by Antara',
              'Results reviewed by HN',
              'Completed',
            ].some((r) => values.Status.includes(r))
          }
          return [
            'Checkin Confirmed',
            'Results received by Member',
            'Results received by Antara',
            'Results reviewed by HN',
            'Completed',
          ].includes(values.Status)
        },
      },
      {
        id: 'fldTNYT7DrNKKo286',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
    ],
  },
  {
    name: 'Care Team Tasks',
    id: 'tblfH6lD7Cd1cGgSR',
    fields: [
      {
        id: 'fldFpZ9f9DZRPqfVN',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldJYRny4intY0HtI',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldluUjdXcncSqpNk',
        name: 'Scribe Tags',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionalOptions: true,
        isMixed: true,
        prefills: (name: string, value: any) => {
          return {
            [name]: value,
            'Task definition': null,
            'Task Priority': null,
            'Due Date': '',
            'Task Notes': '',
          }
        },
      },
      {
        id: 'fldrJeu9BzF1p0thE',
        name: 'Task definition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        conditionalOptions: true,
        symmetricColumnId: 'fldDQIfKUcgxqPs2b',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltE2P2zScwkJvB1',
        required: true,
        helper: '',
        isMixed: true,
        prefills: (name: string, value: any, airtableMetaArgs?: any) => {
          const recordId =
            Array.isArray(value) && !!value.length
              ? value[0]
              : value?.id ?? value
          const args = airtableMetaArgs?.getTaskDefinitionById(recordId)

          if (args) {
            return {
              'Task Priority': args?.defaultPriority,
              'Task Notes': args?.notes,
              'Due Date': args?.dueDate ?? dayjs(args?.dueDate).toDate(),
              'Task definition': {
                id: args.recordId,
                name: args?.clinicalPrefferedName,
              },
            }
          }

          return {
            [name]: value,
          }
        },
      },
      {
        id: 'fldm9Xve7yWI1vSYL',
        name: 'Appointment',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld4YyDh9WtNqXc8d',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Scribe Tags',
        parentValues: ['Internal Appointment', 'Appointment', 'Referral'],
        condition: (values: any) => {
          if (Array.isArray(values['Scribe Tags'])) {
            return ['Internal Appointment', 'Appointment', 'Referral'].some(
              (r) => values['Scribe Tags'].includes(r)
            )
          }
          const tagsValues = values['Scribe Tags']
          return ['Internal Appointment', 'Appointment', 'Referral'].includes(
            tagsValues?.name ?? tagsValues
          )
        },
      },
      {
        id: 'fldnfVIFhMTSb6tFP',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldrz47Uj13D7yBUx',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Scribe Tags',
        parentValues: ['HMP'],
        condition: (values: any) => {
          if (Array.isArray(values['Scribe Tags'])) {
            return ['HMP'].some((r) => values['Scribe Tags'].includes(r))
          }
          const tagsValues = values['Scribe Tags']
          return ['HMP'].includes(tagsValues?.name ?? tagsValues)
        },
      },
      {
        id: 'fldf3oTj4SbPU3waC',
        name: 'Condition (from MemberDB)',
        type: 'conditions',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldVxEnaxNA305O1B',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Scribe Tags',
        parentValues: ['Condition'],
        condition: (values: any) => {
          if (Array.isArray(values['Scribe Tags'])) {
            return ['Condition'].some((r) => values['Scribe Tags'].includes(r))
          }
          const tagsValues = values['Scribe Tags']
          return ['Condition'].includes(tagsValues?.name ?? tagsValues)
        },
      },
      {
        id: 'fldTCEzVgbpXoYhYZ',
        name: 'Prescription',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldZ266HXKxJyMYR2',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbl3iBWzYVWEpdLje',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Scribe Tags',
        parentValues: ['Medication'],
        condition: (values: any) => {
          if (Array.isArray(values['Scribe Tags'])) {
            return ['Medication'].some((r) => values['Scribe Tags'].includes(r))
          }
          const tagsValues = values['Scribe Tags']
          return ['Medication'].includes(tagsValues?.name ?? tagsValues)
        },
      },
      {
        id: 'fldyKWbgj5Ly2wLDR',
        name: 'Member tasks',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldBpGpwNj4gNVIWr',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbljwCFIDT2vG65AH',
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Scribe Tags',
        parentValues: ['Member Task'],
        condition: (values: any) => {
          if (Array.isArray(values['Scribe Tags'])) {
            return ['Member Task'].some((r) =>
              values['Scribe Tags'].includes(r)
            )
          }
          const tagsValues = values['Scribe Tags']
          return ['Member Task'].includes(tagsValues?.name ?? tagsValues)
        },
      },
      {
        id: 'fldpHFRM829UWPSss',
        name: 'Due Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldA4jQrhD8uqQZTn',
        name: 'Task Priority',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld8DZRpNZO8UpuzV',
        name: 'Task Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldy2gbiCU4M7D0sR',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldJy4EdenWTTlT8s',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fld44WK9nOk5ZanUX',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
    ],
  },
]
