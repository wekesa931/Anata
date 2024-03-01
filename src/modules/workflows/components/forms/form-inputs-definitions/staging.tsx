import dayjs from 'dayjs'

export default [
  {
    name: 'Baseline',
    id: 'tblQKOtAe0RqE5KFn',
    formId: 'shrTABmC46zid89Uh',
    fields: [
      {
        id: 'fldzbfmz2ihvXLKBS',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld2saq6dUwRLRQ6h',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldXV8VCax5IUmERF',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldf1T1M1N8tcti9r',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: true,
        helper: '',
      },
      {
        id: 'fldfvbOtYfcfZaBt1',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldBV0T3FJcwfQmns',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: false,
        helper:
          'Please select and link this baseline to the right appointment so that we can automatically change the status of the appointment after you finalize your baseline consultation',
      },
      {
        id: 'fldULioAbdnjX0dpE',
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
      },
      {
        id: 'fldxqkYOc10sezJah',
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
        id: 'fld6JKnsLi3zmxK4T',
        name: 'Is the BN a minor',
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
        id: 'flduy9NCClJwBE00p',
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
        id: 'fld7v7FLIh0G5ewk7',
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
        id: 'fld8Rs1TShbk1PUpn',
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
        id: 'flddZHssUatiOZXKL',
        name: 'PMH - Past Medical History',
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
        id: 'fldadJyNgGl2RNjXj',
        name: 'Do you have any significant past medical history not listed above?',
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
        parentKey: 'PMH',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values.PMH)) {
            return ['Yes'].some((r) => values.PMH.includes(r))
          }
          return ['Yes'].includes(values.PMH)
        },
      },
      {
        id: 'fldSJRkJx2YbMh8qU',
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
          'Vaccination Schedule: Click here to see the KEPI vaccination schedule (<a href="http://www.vacfa.uct.ac.za/sites/default/files/image_tool/images/210/Immunization_Schedules/Kenya.pdf)" target="_blank">http://www.vacfa.uct.ac.za/sites/default/files/image_tool/images/210/Immunization_Schedules/Kenya.pdf)</a>',
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
        id: 'fldNbvuaudOQcWMbG',
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
        parentKey: ['Vaccination Status', 'Is the BN a minor'],
        parentValues: ['Unknown', 'Yes'],
        condition: (values: any) => {
          return (
            ['Unknown'].includes(values['Vaccination Status']) &&
            ['Yes'].includes(values['Is the BN a minor'])
          )
        },
      },
      {
        id: 'fldSixOGIoaFPTGWa',
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
        id: 'fldGO42wh2pNBjEeH',
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
        conditionType: '!',
        parentKey: 'Developmental History',
        parentValues: ['Developmentally Delayed', 'Other'],
        condition: (values: any) => {
          return ['Developmentally Delayed', 'Other'].includes(
            values['Developmental History']
          )
        },
      },
      {
        id: 'fldDru6yAxaxpCmpt',
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
        id: 'fld4XVZp7FWlryHSi',
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
        id: 'fld3fro8JhpnsfCaU',
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
        id: 'fldiCb2egrjuvp9wF',
        name: 'Have you ever had surgery',
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
        id: 'fldgx2GVBMeyYC4h5',
        name: 'Please describe any surgeries you may have had?',
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
        parentKey: 'Have you ever had surgery',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Have you ever had surgery'])) {
            return ['Yes'].some((r) =>
              values['Have you ever had surgery'].includes(r)
            )
          }
          return ['Yes'].includes(values['Have you ever had surgery'])
        },
      },
      {
        id: 'fldlMY7zzzH7tSh9t',
        name: 'ROS - review of system',
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
          '"Are you currently having any complaints or issues that are new or old in the following parts of your body"\n\n[Please use the following as simple descriptions:]\nNEUROLOGIC: any issues related to taste, sight, smell, touch or hearing. Any Seizures or issues with your brain\nHEENT: any issues realted to your Head, Eyes, Ears, Nose or Throat\nCARDIOVASCULAR: any issues related to your heart or blood pressure, veins or arteries\n\nPULMONARY: any issues related to your lungs or breathing\nGASTROINTESTINAL: any vomiting or diarrhea, constipation irritable bowels or other issue passing stool\nGENITOURINARY: any issues with your genitalia/private parts; any difficulty urinating or problem with sexual performance\nEXTREMITIES: any tingling in your fingers or toes, any pain or swelling in your arms or legs, difficulty with your hands or feet\nDERMATOLOGIC: any rashes, lumps, bumps, skin color changes or skin problems\n\nMENTAL HEALTH: are you having any mental health issues\nHEMATOLOGIC: have you ever been told you are anemic\n\nREPRODUCTIVE: \nMen: any issues with erectile dysfunction, fertility or testicular issues\nFemale: any menstruation related, fertility related or ovarian issues\nENDOCRINE: have you ever been told you have an issue with your hormones\nNEOPLASTIC: are you currently receiving care for cancer\nIMMUNOLOGIC: have you ever been told you have a weakened immune system',
      },
      {
        id: 'fldyHqZWorJ1eC1cK',
        name: 'Is this a serious condition',
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
        id: 'fld0P2kGGZLO83pAe',
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
        id: 'fldXh5BfmajCFlFor',
        name: 'ROS: Please describe the NEUROLOGIC findings',
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
        id: 'fldD2SJfR8W0ktjcY',
        name: 'Is this a serious HEENT condition',
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
        id: 'fldQ4Klzacxd3oqGG',
        name: 'ROS: Please describe the HEENT findings',
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
        id: 'fldnKO6rQxdMBmyeF',
        name: 'Is this a serious CARDIOVASCULAR condition',
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
        id: 'fldVrJU0gbNsQRyKw',
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
          'Please click here to enter the medications: <a href="https://airtable.com/shrH0jDDogdH2ySWr" target="_blank">https://airtable.com/shrH0jDDogdH2ySWr</a> ',
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
        id: 'fldp7ReYZByA7bdWQ',
        name: 'ROS: Please describe the CARDIOVASCULAR findings',
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
        id: 'fld3TZEKDmuFklAEK',
        name: 'Is this a serious PULMONARY condition',
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
        id: 'fldxNWLAs0lNHU2Rx',
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
        id: 'fldXqFgaDjtZSWnAk',
        name: 'ROS: Please describe the PULMONARY findings',
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
        id: 'fldugNL7XZbpuj4Wc',
        name: 'Is this a serious GASTROINTESTINAL condition',
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
        id: 'fldbBDGvZu4XqB88F',
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
        id: 'fldNy3It2mfLg333X',
        name: 'ROS: Please describe the GASTROINTESTINAL findings',
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
        id: 'fld5H6UkIdWtlKPND',
        name: 'Is this a serious GENITOURINARY condition',
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
        id: 'fldpUFJYM92zO6X1V',
        name: 'ROS: Please describe the GU findings',
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
        id: 'fldCfjkpdnSzud1S5',
        name: 'Is this a serious REPRODUCTIVE condition',
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
        id: 'fldpVnZSxa4CMrsHv',
        name: 'ROS: Please describe the REPRODUCTIVE findings',
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
        id: 'fldXq142m07aPBKGh',
        name: 'Please describe the EXTREMITIES findings ',
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
        id: 'fldAUXlaToL7clIyb',
        name: 'ROS: Please describe the DERMATOLOGIC findings',
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
        id: 'fldj4yOSHLdklwZ8P',
        name: 'Is this a serious MUSCULOSKELETAL condition',
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
        id: 'fldP4Ea7ZKPT0b2j2',
        name: 'ROS: Please describe the MUSCULOSKELETAL findings',
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
        id: 'fldmImexWiwRVKAdm',
        name: 'Is this a serious HEMATOLOGIC condition',
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
        id: 'fldxN18zUeuu3ggkk',
        name: 'ROS: Please describe the HEMATOLOGY findings',
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
        id: 'fld10Z3q5YtsxhJ7p',
        name: 'Is this a serious MENTAL HEALTH condition?',
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
        id: 'fldPgojkz3a0UUJJ4',
        name: 'ROS: Please describe the MENTAL HEALTH findings',
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
        id: 'fldLSgbJrF8kxAoxB',
        name: 'Is this a serious ENDOCRINE condition?',
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
        id: 'fldS6KWqW9OzKy0Iz',
        name: 'ROS: Please describe the ENDOCRINE findings',
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
        id: 'fldGKHAms3b1RcGAN',
        name: 'Is this a serious NEOPLASTIC condition?',
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
        id: 'fldhlDTSjz4iqA1W4',
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
        id: 'fldJOYUYDdDYbV7Mc',
        name: 'Please describe the IMMUNOLOGIC findings',
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
        id: 'fldxpQskqtfawJ4cO',
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
        id: 'fldp8hRfQ1vktiYcX',
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
        id: 'fld8jHkxdJL6ajOpf',
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
        id: 'fldPAs65A6c3gUXaK',
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
        id: 'fldumORb3xUUXjsYR',
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
        id: 'fldBDsquWT2IyS3o8',
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
        id: 'fldtFE2VWMrlYaJaa',
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
        id: 'fldfRa2KJI8wT4QIb',
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
        id: 'fld0y1dgVt4fngh28',
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
        id: 'fldNwbkYHKmZwiqZG',
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
        id: 'fldRE1I1Ya5KABT4z',
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
        id: 'fldKEbLOmN7qxfgW6',
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
        id: 'fldlwX8fw0NiYPCei',
        name: 'LMP (Last Menstrual Period)',
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
        parentKey: 'Gender',
        parentValues: ['Female'],
        condition: (values: any) => {
          if (Array.isArray(values.Gender)) {
            return ['Female'].some((r) => values.Gender.includes(r))
          }
          return ['Female'].includes(values.Gender)
        },
      },
      {
        id: 'fldCiNJQpmWHcrb5w',
        name: 'LMP date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'For Minors, only complete if menses has begun',
        conditionType: '',
        parentKey: 'LMP (Last Menstrual Period)',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['LMP (Last Menstrual Period)'])) {
            return ['Yes'].some((r) =>
              values['LMP (Last Menstrual Period)'].includes(r)
            )
          }
          return ['Yes'].includes(values['LMP (Last Menstrual Period)'])
        },
      },
      {
        id: 'fldMsiCyBsQekHPI6',
        name: 'No LMP reason',
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
        parentKey: 'LMP (Last Menstrual Period)',
        parentValues: ['No'],
        condition: (values: any) => {
          if (Array.isArray(values['LMP (Last Menstrual Period)'])) {
            return ['No'].some((r) =>
              values['LMP (Last Menstrual Period)'].includes(r)
            )
          }
          return ['No'].includes(values['LMP (Last Menstrual Period)'])
        },
      },
      {
        id: 'fldQCyq5W8VrMmNT6',
        name: 'Family Planning',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'For Minors, only ask if appropriate upon insight of HN',
        conditionType: '',
        parentKey: 'Gender',
        parentValues: ['Female'],
        condition: (values: any) => {
          if (Array.isArray(values.Gender)) {
            return ['Female'].some((r) => values.Gender.includes(r))
          }
          return ['Female'].includes(values.Gender)
        },
      },
      {
        id: 'fldfKpz2Q2AY8T5An',
        name: 'Family Planning Description',
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
        parentKey: 'Family Planning',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Family Planning'])) {
            return ['Yes'].some((r) => values['Family Planning'].includes(r))
          }
          return ['Yes'].includes(values['Family Planning'])
        },
      },
      {
        id: 'fld54p1IbKgC9jDYo',
        name: 'No family planning reason',
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
        parentKey: 'Family Planning',
        parentValues: ['No'],
        condition: (values: any) => {
          if (Array.isArray(values['Family Planning'])) {
            return ['No'].some((r) => values['Family Planning'].includes(r))
          }
          return ['No'].includes(values['Family Planning'])
        },
      },
      {
        id: 'fldE685VzeA2HUJGW',
        name: 'Activity?',
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
          'Ask if the member is doing any activity. If Yes:describe it in the next field, if no: "That\\\'s okay, let\\\'s find something you will enjoy and start doing it."',
      },
      {
        id: 'fldbifvMkVifkUaw4',
        name: 'Activity Description',
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
        id: 'fldWm6rmjATY4WQFS',
        name: 'Access to a gym',
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
          '"Do you have access to a gym or currently have a gym membership?"',
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
        id: 'fldMTns5CJz3iLFUM',
        name: 'Gym usage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Are you using to the gym?',
        conditionType: '',
        parentKey: 'Access to a gym',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Access to a gym'])) {
            return ['True'].some((r) => values['Access to a gym'].includes(r))
          }
          return ['True'].includes(values['Access to a gym'])
        },
      },
      {
        id: 'fld9uHzUEN0N1vQbO',
        name: 'Social History',
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
        id: 'fldcJTBKUMhxfL2uQ',
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
        helper: '',
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
        id: 'fldjwDWMbahm2Ti4y',
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
        helper: '',
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
        id: 'fldc4Sw7ftwNoEJy9',
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
        helper: 'Please estimate based on their response to drinks per day',
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
        id: 'fldFfsWfFNoSWwN5K',
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
        id: 'fldgw07mhMQBKXAhv',
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
        id: 'fldjyyHxmid8lVkJs',
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
        id: 'fld7XVJcl0TXXfBLE',
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
        helper: '',
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
        id: 'fldKslyV6i2w0Yabp',
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
        id: 'fldUPhTBX3sYuemaO',
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
        id: 'fld4CuG3YaE8S8D3F',
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
          '"Do you currently have, or have you ever been told you have, a chronic condition? That is any condition that has been present for more than 3 months. \n\nExamples of chronic conditions are: high blood pressure, diabetes, arthritis, asthma or high cholesterol."\n\nIf you identify condition(s) please enter them here: <a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a>',
      },
      {
        id: 'fld0YouFEBeuSeSy5',
        name: 'Is the Member @ risk of a condition?',
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
          'Risk factors include a family history, prior abnormal readings, smoking, eating habits etc.\n\nIf the response is yes, click here: \n<a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a> ',
      },
      {
        id: 'fldh6jX8FztBouh0T',
        name: 'If you could work on one aspect of your health?',
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
          'IF NOT PRE-FILLED:\n"Have you ever thought about personal health goals? \nDo you have any?\nIs there any aspect of your health that you’d like to work on or work towards?  \nIt’s okay if you don’t have an answer right now. If something comes to mind, you can always reach out to me and we can talk about how I can help."\n\nIF PRE-FILLED:\n"It is great that you want to work on [insert health goal]. \nHave you already started to work towards, [insert health goal]?\nWere you able to achieve the goal? \nWhat was it like trying to reach that goal?"\n\nIF SUCCEEDED: \n"Do you have any new goals you would like to achieve now?\nWonderful, let’s work together on that"\n\nIF FAILED:\n"Would you like to keep trying with my support?"\n\nIf it is a nutritional goal, tell the member you will set up an appointment with the nutritionist.\nIf fitness, sell the virtues of the Nike app if non-gym type. If gym type, find out what they would like to achieve and walk them through how you will support them to achieve the goal. ',
      },
      {
        id: 'fldAxV875t3dDatQF',
        name: 'Other health goals',
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
        parentKey: 'If you could work on one aspect of your health?',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['If you could work on one aspect of your health?']
            )
          ) {
            return ['Other'].some((r) =>
              values[
                'If you could work on one aspect of your health?'
              ].includes(r)
            )
          }
          return ['Other'].includes(
            values['If you could work on one aspect of your health?']
          )
        },
      },
      {
        id: 'fldencAWEJaRGxdCh',
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
        id: 'fld0wKceefHGv9745',
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
        id: 'fldNA1izDqnRAwmZ4',
        name: 'Primary Doctor',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldJGyoauJpFuBdl8',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblKoFLuzxN9g13xT',
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
        id: 'fld6TB4JVkEu32QCY',
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
      },
      {
        id: 'fldhKJ7vAc79y1sWR',
        name: 'Does the beneficiary require Ancillary services?',
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
          'HN makes a determination regarding the need for additional services on the basis of the responses to prior questions',
      },
      {
        id: 'fld34icr6Q9NBiJ50',
        name: 'Ancillary Services',
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
          '[If you need to book any appointments with Antara (Nutrition, Mental Health, Virtual Consult, Physio...) please go to the members view in Scribe and use the Calendly links (buttons)]',
        conditionType: '',
        parentKey: 'Does the beneficiary require Ancillary services?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Does the beneficiary require Ancillary services?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does the beneficiary require Ancillary services?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Does the beneficiary require Ancillary services?']
          )
        },
      },
      {
        id: 'fldse3MLimCctR0HA',
        name: 'What is your preferred channel of communication?',
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
          '"I want to make sure that we communicate using your preferred channel. We can do calls, WhatsApp, SMS or our favorite, the Antara App. Which would you prefer?"\n',
      },
      {
        id: 'fld1kRWm8v0JHcH5O',
        name: 'What is your secondary channel of communication?',
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
          '"If we can\'t reach you on [preferred channel], what is plan B"',
      },
      {
        id: 'fldJIaSzHlwfn9fHs',
        name: 'What would be the ideal frequency of communication?',
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
          '"How often would you like me to be in touch?\nAntara always has new things on offer, communications around seasonal health issues, things of this nature. Plus, as your Health Navigator, I like to check in personally to see how you’re doing and if there is anything I can do to help. \nWeekly, Monthly, Quarterly or never?"\nIf they say never, let them know they will receive the routine Antara All-Member updates that go out at least once per quarter.\n"Which of those options would you prefer?"',
      },
      {
        id: 'fldV550AJYeR1PeJb',
        name: 'Frequency of communication (Other)',
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
        parentKey: 'What would be the ideal frequency of communication?',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['What would be the ideal frequency of communication?']
            )
          ) {
            return ['Other'].some((r) =>
              values[
                'What would be the ideal frequency of communication?'
              ].includes(r)
            )
          }
          return ['Other'].includes(
            values['What would be the ideal frequency of communication?']
          )
        },
      },
      {
        id: 'fld9VMyJ3e1K7dWSx',
        name: 'What is your preferred day for communication',
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
        id: 'fld7favH3DrAxdLqY',
        name: 'What is your preferred time for communication',
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
        id: 'fld3YXedBQKWsZpw3',
        name: 'How to share your plan?',
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
        id: 'fldWKwQNRMB2JaJba',
        name: 'Does the member has devices?',
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
        id: 'fldE8r6evet3HyaY7',
        name: 'Device selection',
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
        parentKey: 'Does the member has devices?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Does the member has devices?'])) {
            return ['Yes'].some((r) =>
              values['Does the member has devices?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Does the member has devices?'])
        },
      },
      {
        id: 'fldzctRkYuBkfsiGj',
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
        id: 'fldQnPWjNeI1fjObC',
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
        id: 'fldUolUAF0pGOV7ae',
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
    name: 'Appointments',
    id: 'tblhHcP4VrFV9atFx',
    formId: 'shrOn4TQvlY78detU',
    fields: [
      {
        id: 'fldslTLtnS1T1goHa',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldE4yuo7lWhvgDZL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fld8r55i5QWklbzKT',
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
        id: 'fldRwhe01SOMRB16C',
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
        id: 'fldN7WoEj7tHbcsPv',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldq67jg4Y13oNqvi',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: false,
        helper:
          'If the appointment is internal, please select who will perform the appointment in our team',
        conditionType: '',
        parentKey: 'Internal vs External',
        parentValues: ['Internal'],
        condition: (values: any) => {
          if (Array.isArray(values['Internal vs External'])) {
            return ['Internal'].some((r) =>
              values['Internal vs External'].includes(r)
            )
          }
          return ['Internal'].includes(values['Internal vs External'])
        },
      },
      {
        id: 'fldvYwS5iv66z48dx',
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
        id: 'fldZb8IvazevYxTQx',
        name: 'Lab/imaging request',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldRTcRqRxpvhbjXg',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgUOEkOSePEa30q',
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
        id: 'fld8g9weqaITSlPSc',
        name: 'Other Facility',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Fill in the Facility not found in the provider base',
      },
      {
        id: 'fldifm7QJvriQU4d0',
        name: 'Specialists from Provider Base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldtRyYFcRPdHLnjZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblKoFLuzxN9g13xT',
        required: false,
        helper: '',
      },
      {
        id: 'fldNeYnSgCjPW5Dyq',
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
    name: 'BP Mon',
    id: 'tbllrGqE6LTUzb5Hw',
    fields: [
      {
        id: 'fldpWdKyXzkCryozf',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldFb1SkUa0QGdpEy',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldptwY5UaeDF9CD9',
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
        id: 'fld17gJap5QN1RUgI',
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
        id: 'fldQqO4DGyv4TDQig',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldzXVRLAVf0cBiu2',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblkoNkzLmWsAlWs5',
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
        id: 'fldzsH7CrVxPBtC4m',
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
        id: 'fldgkKPp0tRBbStfx',
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
        id: 'fldlm6IUM8EmrzTMM',
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
        id: 'fld1ec8sJflT1YqWh',
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
        id: 'fldtWTPEzjlPJ7hDC',
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
        id: 'fldTgrEPGlVA3l5IK',
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
    name: 'HN Tasks',
    id: 'tblxNecTDQLZENxzV',
    formId: 'shrmZqamldvPG4uwg',
    fields: [
      {
        id: 'fldD2d73HnneN7T11',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNbgDNlONsdxhYN',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldXv70vFRxPhxwCR',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld14ZeOAwVrq7YaM',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'flduuoc5BjzK3NL2P',
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
        id: 'fldHT9VSNZu8wMx6x',
        name: 'ME task type',
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
        parentValues: ['ME task type'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['ME task type'].some((r) => values.Type.includes(r))
          }
          return ['ME task type'].includes(values.Type)
        },
      },
      {
        id: 'fldRJZxQK5EdOUfbq',
        name: 'Other task type',
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
        parentKey: 'Type',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Others'].some((r) => values.Type.includes(r))
          }
          return ['Others'].includes(values.Type)
        },
      },
      {
        id: 'fldEf5muDMuGtC9FP',
        name: 'Appointment',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld4YyDh9WtNqXc8d',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZB4YOpd7XH3cYt',
        required: false,
        helper: '',
      },
      {
        id: 'fldFl3zVN0rQDdKmT',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldJFcYaPfBBzFSBB',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl4QEwsZ5wu35YXx',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Type',
        parentValues: [
          'HMP: Follow',
          'HMP: Followup',
          'HMP: Internal Review',
          'HMP: Member Review',
          'HMP: Send',
          'HMP: Send Monitoring Plan & Coordinate Kit Delivery',
          'HMP: Generate',
          'HMP: Confirm Monitoring Plan and Kit Delivery ',
          'HMP: Confirm Monitoring Plan and Kit Delivery',
          'HMP: Collect condition data',
          'HMP: book consult to review with member',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return [
              'HMP: Follow',
              'HMP: Followup',
              'HMP: Internal Review',
              'HMP: Member Review',
              'HMP: Send',
              'HMP: Send Monitoring Plan & Coordinate Kit Delivery',
              'HMP: Generate',
              'HMP: Confirm Monitoring Plan and Kit Delivery ',
              'HMP: Confirm Monitoring Plan and Kit Delivery',
              'HMP: Collect condition data',
              'HMP: book consult to review with member',
            ].some((r) => values.Type.includes(r))
          }
          return [
            'HMP: Follow',
            'HMP: Followup',
            'HMP: Internal Review',
            'HMP: Member Review',
            'HMP: Send',
            'HMP: Send Monitoring Plan & Coordinate Kit Delivery',
            'HMP: Generate',
            'HMP: Confirm Monitoring Plan and Kit Delivery ',
            'HMP: Confirm Monitoring Plan and Kit Delivery',
            'HMP: Collect condition data',
            'HMP: book consult to review with member',
          ].includes(values.Type)
        },
      },
      {
        id: 'fldfitOLmHr14Kyig',
        name: 'Collect Condition Data',
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
        parentKey: 'Type',
        parentValues: ['HMP: Collect condition data'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['HMP: Collect condition data'].some((r) =>
              values.Type.includes(r)
            )
          }
          return ['HMP: Collect condition data'].includes(values.Type)
        },
      },
      {
        id: 'fldqnduTODJTpxxOW',
        name: 'What condition data?',
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
        parentKey: 'Collect Condition Data',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Collect Condition Data'])) {
            return ['Other'].some((r) =>
              values['Collect Condition Data'].includes(r)
            )
          }
          return ['Other'].includes(values['Collect Condition Data'])
        },
      },
      {
        id: 'fldHNNI2EgHSoW99w',
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
        id: 'fldSarHHNRGsSXgAr',
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
        id: 'fldQ8o2y88CKzKh9V',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld1EcvtKBuRlsaPw',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: true,
        helper: '',
      },
      {
        id: 'fldma4BpT2S3rhEB1',
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
        id: 'fldJMRweOiQSpj5Ea',
        name: 'Collaborator (created by)',
        type: 'collaborator',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please select yourself here only if you want to be informed about the status of this task (especially if the task is supposed to be done by somebody else)',
      },
      {
        id: 'fldqJ7IFjdm6mwLgZ',
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
    ],
  },
  {
    name: 'Vitals',
    id: 'tbllgohmQyKmXeHiV',
    fields: [
      {
        id: 'fldvFqYTcapxxcwil',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldsQLy1pUvj2C1i0',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldZLx8VZogrv95Is',
        name: 'Staff',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldGLx8FqputFJd14',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblf6noUXSKCzG2Ze',
        required: false,
        helper: 'Please select',
      },
      {
        id: 'fldhgG7c1q8XytSKV',
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
        id: 'fldis5Y4czQtkWHxy',
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
        id: 'fldiIg8GNkqxw8pls',
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
        id: 'fldiZcVQT8eIXLfLC',
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
        id: 'fldlrzgAee1Zy7gl0',
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
        id: 'fldeR2gZw89uL05Ch',
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
        id: 'fld4MDXc9w2DjrJaI',
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
        id: 'fldWTlbSwxCEZ3YOi',
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
          'Please enter the Muscle mass identified by the device in Kilograms.\n(if decimals, use a . not a ,)',
      },
      {
        id: 'fldERExuFFntt29YK',
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
        id: 'fldBhUFUoLs807Yax',
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
        id: 'fldWCFEBEEPAj0mpn',
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
        id: 'fld54GRe9Vaf358kz',
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
        id: 'fldTzBfWCKB8HM8Ys',
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
        id: 'fldpahW1OHQUHeXqp',
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
        id: 'fldXXIImyjSl1iS9E',
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
        helper: '',
      },
      {
        id: 'fldjgyLLht6Fi93BP',
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
    name: 'Prescriptions VC',
    id: 'tblloJNPu9uCRk20i',
    formId: 'shrJhHus0eaDpxl84',
    helper:
      'Only for usage of Doctor, HN should use the Medication Prescription Form ',
    fields: [
      {
        id: 'fldAH9ZBaMVy1wxHx',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldIs2xON8rAeuId3',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldLBq4fvO4nyw7RJ',
        name: 'Clinical Consultation',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldrgHNdEUkd3su7H',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl3nTYifMQxibPTg',
        required: false,
        helper:
          'Please link the prescription to the Clinical Consultation. If you are in guided workflow, please submit the clinical consultation form first so that you can see it here',
      },
      {
        id: 'fldt9a8mcuItcH8Z7',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld6mkrqwhQsBSsoL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldSFXuoKUuqspy0J',
        name: 'Medication',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldTirxSODMVsrxNw',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblgFQRJDav7dNdLl',
        required: false,
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
        required: false,
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
        id: 'fld3Z6VDAKlYqEPyF',
        name: 'Associated condition(s)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldrbJxtso2JmlVLP',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgYVivvXVxFZN3B',
        required: false,
        helper: '',
      },
      {
        id: 'fldJku3Go2JDL5k6T',
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
        id: 'fldEmNeyAzCd56v7J',
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
        id: 'fldLGme9Y2FQdRdl8',
        name: 'Other frequency',
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
        id: 'fldIeATGRFL6jUrn3',
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
        id: 'fldV7ivCYq1MJEfCw',
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
        id: 'fldTHiJJb2aeaPdzV',
        name: 'Other route',
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
        id: 'fldo2rxefMWWLdYyK',
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
        id: 'fldrhVmRfBaBWhCpz',
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
        id: 'fldYvTRI3UZOrvK2v',
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
        id: 'fld65y5Bb0y13SBm0',
        name: 'Prescribing facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldK8Ss0i92uLeD0w',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
        required: false,
        helper: '',
      },
      {
        id: 'fldwITV1268gaSFU2',
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
        id: 'fldIe5i3N2AvlkbUL',
        name: 'Refill facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld5EvKgWJbGsuIda',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
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
        id: 'fldCPGqO4WAjSU6kW',
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
        id: 'fldxoRkcMwIVs7xEK',
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
        id: 'flddNy3DWFEuruz9J',
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
        id: 'fldYD9EVnb4URPbMU',
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
        id: 'fldRnkVdR4ItLGK90',
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
        id: 'fldKN3U0Nj1YizyCO',
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
    name: 'Prescriptions',
    id: 'tblloJNPu9uCRk20i',
    formId: 'shrYktkrywbdose8D',
    helper: 'Only for usage of HN, Doctor should use the VC Prescription form',
    fields: [
      {
        id: 'fldAH9ZBaMVy1wxHx',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldIs2xON8rAeuId3',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldt9a8mcuItcH8Z7',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld6mkrqwhQsBSsoL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper: '',
      },
      {
        id: 'fldSFXuoKUuqspy0J',
        name: 'Medication',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldTirxSODMVsrxNw',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblgFQRJDav7dNdLl',
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
        required: false,
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
        id: 'fld3Z6VDAKlYqEPyF',
        name: 'Associated condition(s)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldrbJxtso2JmlVLP',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgYVivvXVxFZN3B',
        required: false,
        helper: '',
      },
      {
        id: 'fldJku3Go2JDL5k6T',
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
        id: 'fldzvVUPDN1Jrq6tg',
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
        id: 'fldYvTRI3UZOrvK2v',
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
        id: 'fldEmNeyAzCd56v7J',
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
        id: 'fldLGme9Y2FQdRdl8',
        name: 'Other frequency',
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
        id: 'fldV7ivCYq1MJEfCw',
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
        id: 'fldTHiJJb2aeaPdzV',
        name: 'Other route',
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
        id: 'fldIeATGRFL6jUrn3',
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
        id: 'fldo2rxefMWWLdYyK',
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
        id: 'fldrhVmRfBaBWhCpz',
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
        id: 'fldCPGqO4WAjSU6kW',
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
        id: 'fldUsw7einuV6uT7D',
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
        id: 'fldxoRkcMwIVs7xEK',
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
        id: 'flddNy3DWFEuruz9J',
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
        id: 'fldYD9EVnb4URPbMU',
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
        id: 'fldeWNOmmp1nk7rGd',
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
        id: 'fldRnkVdR4ItLGK90',
        name: 'Prescription Refills',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblloJNPu9uCRk20i',
        required: false,
        helper: '',
      },
      {
        id: 'fld65y5Bb0y13SBm0',
        name: 'Prescribing facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldK8Ss0i92uLeD0w',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
        required: true,
        helper: '',
      },
      {
        id: 'fldwITV1268gaSFU2',
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
        helper: '',
      },
      {
        id: 'fldIe5i3N2AvlkbUL',
        name: 'Refill facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld5EvKgWJbGsuIda',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
        required: false,
        helper: '',
      },
      {
        id: 'fld73uuLhU5ehyyJ4',
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
        helper: '',
      },
      {
        id: 'fldKN3U0Nj1YizyCO',
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
    name: 'PAFU',
    id: 'tblPR5iJSOOdvKked',
    formId: 'shrdigxXEIvLGYwq0',
    fields: [
      {
        id: 'fldkDfA3Ofh0ojefH',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldqhrOuAKwq6rvpd',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fld7rqCJakxikwDtu',
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
        id: 'fldTN8r1mvKY717o9',
        name: 'Appointment',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldZ2Wp0gyHvmRGAa',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: true,
        helper: '',
      },
      {
        id: 'fldAl8ZmNFI4X63be',
        name: 'Clinical Consultation',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldI5Yzpm3243RYYK',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl3nTYifMQxibPTg',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: ['Virtual Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Virtual Consultation'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Virtual Consultation'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldirdTkGTCv4M7OY',
        name: 'Reason for admission',
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
        id: 'fldCKet1SawwuGJF3',
        name: 'Date of Admission',
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
        id: 'fldfoHRZpJLmHyfmh',
        name: 'Date of Discharge',
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
        id: 'fldG8kQde4ofNhgxC',
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
        helper:
          'If the appointment has been missed, please update the status of the appointment accordingly. Please also create a task for ME team to coordinate the new appointment.',
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
        id: 'fld9uNSUJSKcaGQEa',
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
        id: 'fldnsCaYjKlWGARI3',
        name: 'Facilities',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld6yWsviNn95U9nm',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
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
        id: 'fld7f2ot8titIHVPy',
        name: 'Specialists',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldM56CIS52Ui6tKG',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblKoFLuzxN9g13xT',
        required: false,
        helper:
          'Please select the specialist the member was sent to for the appointment',
        conditionType: '!',
        parentKey: 'Appointment Type',
        parentValues: 'Virtual Consultation',
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return !['Virtual Consultation'].some(
              (r) => !values['Appointment Type'].includes(r)
            )
          }
          return !['Virtual Consultation'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldphpZJoCoCXFxoE',
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
          'Select yes if the member was reminded to go to the appointment by Antara',
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
        id: 'fldsDI6i9NczwRiuV',
        name: 'Antara awareness',
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
        id: 'fld991yzoxqYSjDJ7',
        name: 'Received diagnosis',
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
        id: 'fldy6wQzfbwmVtme2',
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
        helper:
          'To enter a new condition diagnosed, please click here: <a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a> ',
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
        id: 'fldxEegyK2Rix232O',
        name: 'Had lab test',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Indicate if laboratory test was done',
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
        id: 'fldTo0n4Ht1WVz7EY',
        name: 'Lab test purpose',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'What does the BN think the lab test was for?',
        conditionType: '',
        parentKey: 'Know lab test purpose',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Know lab test purpose'])) {
            return ['True'].some((r) =>
              values['Know lab test purpose'].includes(r)
            )
          }
          return ['True'].includes(values['Know lab test purpose'])
        },
      },
      {
        id: 'fldf7eNkgFeUOshAo',
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
        id: 'fldATMgoN71VFv3G6',
        name: 'Imaging purpose',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Why does the BN think the imaging was done?',
        conditionType: '',
        parentKey: 'Know imaging purpose',
        parentValues: ['True'],
        condition: (values: any) => {
          if (Array.isArray(values['Know imaging purpose'])) {
            return ['True'].some((r) =>
              values['Know imaging purpose'].includes(r)
            )
          }
          return ['True'].includes(values['Know imaging purpose'])
        },
      },
      {
        id: 'fld2AYowjOv7rKmvb',
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
        helper: 'Select yes if the member has received one or many referral',
      },
      {
        id: 'fldE7r0kjiDMvZAgz',
        name: 'Facility referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldufCf7jbT98A1OZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
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
            ? !['Virtual Consultation'].some((r) =>
                values['Appointment Type'].includes(r)
              )
            : !['Virtual Consultation'].includes(values['Appointment Type'])
          return receivedReferralCondition && appointmentTypeCondition
        },
      },
      {
        id: 'fldrLWAE1NEvizwh2',
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
        id: 'fldXE4C0uhChFmV2R',
        name: 'Specialist referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldIjvrEeec8fry98',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblKoFLuzxN9g13xT',
        required: false,
        helper: 'Optional - select the specialist the member was referred to',
        conditionType: '',
        parentKey: 'Referral appointment booked?',
        parentValues: ['No'],
        condition: (values: any) => {
          if (Array.isArray(values['Referral appointment booked?'])) {
            return ['No'].some((r) =>
              values['Referral appointment booked?'].includes(r)
            )
          }
          return ['No'].includes(values['Referral appointment booked?'])
        },
      },
      {
        id: 'fldVjjZ9IMJ4DM9LK',
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
        id: 'fldQJ7gewM0npFgYZ',
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
        helper:
          'Please Yes if the member already have a date and time for this appointment',
      },
      {
        id: 'fldABooA6c9L1jWCr',
        name: 'Reason for Referral',
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
          'IPlease enter all the details about the referral(s) so that ME can coordinate or confirm later (including reason for referral, preferred specialist or facility...)',
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
        id: 'flddQXx5qX3hvViYw',
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
        id: 'fldJtWxoUarzOK4Ra',
        name: 'Accepted Medications?',
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
        id: 'fldcvpUv7LPPjmBQS',
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
        id: 'fldwq8SHowYqH3nB3',
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
          'Use this link to fill in the medication <a href="https://airtable.com/shrH0jDDogdH2ySWr" target="_blank">https://airtable.com/shrH0jDDogdH2ySWr</a>',
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
        id: 'fld2erHX7CbRKGXGe',
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
        helper:
          "If the member doesn't know the medication purpose please educate them ",
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
        id: 'fldmLMn34GSQYepFJ',
        name: 'Medication purpose',
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
        id: 'fld6C2k14M2dr6wXI',
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
        id: 'fldwtANZMUKHnF72D',
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
        id: 'fldxpUgumBE4E9SGl',
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
        id: 'fldbCwhhAA9L7iFJl',
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
        id: 'fldlvGjC3WQ3jWSfa',
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
        id: 'fldasiR2wmBiuE1gj',
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
        helper:
          'Please select Yes if the member needs to have a follow-up for this appointment',
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
        id: 'fldMuDZWt9Q50JTQ5',
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
        parentValues: ['Virtual Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Virtual Consultation'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Virtual Consultation'].includes(values['Appointment Type'])
        },
      },
      {
        id: 'fldal2dREgeGlP7U6',
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
        helper:
          'If external appointment\nIf the follow up appointment is already booked (external), please create the appointment using the form in scribe.\nIf not booked, please create a task to coordinate\n\nIf Virtual Consult\nbook it using calendly link',
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
        id: 'fldbgAb0yWMg4Ryhe',
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
        id: 'fldRNxBptYsP08xQ6',
        name: 'Payment purpose',
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
        id: 'fld5MOOkKmwn7gfE1',
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
        id: 'fldvFmt5HjyoCRJVy',
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
        id: 'fldGhuIslcBci4TiY',
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
    name: 'Nutritional Consultation',
    id: 'tbl1uip79l5OvaH6V',
    formId: 'shrjafP0tceKOu86T',
    fields: [
      {
        id: 'fldrdSNvc4kjrlRA7',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldMpwsPNV5Vwv9vx',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldfB06zKJqSxgy5p',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldl9roOcBiMir6XR',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldJcGoPH99sJ75jG',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld5qr79qT5zPm4Eb',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: false,
        helper:
          'Please select the appointment so that the system can automatically update the status after your consultation',
      },
      {
        id: 'fldBRa75BbEXRYyls',
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
        id: 'fldlzJfIPXggiUeIJ',
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
        id: 'fld8h3uQGOU5O8cap',
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
        id: 'flde70Q4lkeZtuPJF',
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
        id: 'fldnVYrBtAAx8bCk0',
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
        id: 'fldpiv7GWzgRDJIyH',
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
        id: 'fldJmfqKRRSYBKrAD',
        name: 'Conditions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldEaRBrBR8U7GWFg',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgYVivvXVxFZN3B',
        required: false,
        helper: '',
      },
      {
        id: 'fldy3ssqBIMPoStio',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldjZwhPmedCdX2Rq',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl4QEwsZ5wu35YXx',
        required: false,
        helper: '',
      },
      {
        id: 'fldUHkKAsRQpgzIrA',
        name: 'Consulting Clinican',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldmAAmU0nzNRj4of',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: false,
        helper: '',
      },
      {
        id: 'fldjI00frLLdkzoFl',
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
        id: 'fldWMIjIawaJzxIQg',
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
        id: 'fldwnG1eZ4kxR2gQW',
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
        id: 'fldezPv9y5w3R37EP',
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
        id: 'fldHXYVhTltrEYLz5',
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
        id: 'fldeXKEKzMui34KKg',
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
        id: 'fldW95a9j7jGzrYmD',
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
        id: 'fldElwFdKI3vXB9wf',
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
        id: 'fldkBLMt7mKiuUkb7',
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
        id: 'fldcJJTt84xkikKyE',
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
        id: 'fldbcE1z4DrGPK6EK',
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
        id: 'fld8KZTsMmPxY2awG',
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
        id: 'fldq1MwYKgM2hAHaX',
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
        id: 'fld6ypu0lJbQnFQ5j',
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
        id: 'fld9uEMd0M80DjGqq',
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
        id: 'fldyUTmY9FVKE8aPU',
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
        id: 'fldzxzog4bHOrgRgP',
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
        id: 'fldJ6A7HJEXMa5Q1v',
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
        id: 'fldoXU21pflHrKEq3',
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
        id: 'fldqoCqnYu27KArwg',
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
        id: 'fldHbImWpTeifpnu7',
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
        id: 'fldv0TFELuftjRbO4',
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
        id: 'fld3U6UjpaGegVBRR',
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
        id: 'fld1eZY485r91CGO4',
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
        id: 'flduRZrbshp0ZBe24',
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
        id: 'fldJttz2yrmDmSykU',
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
        id: 'fld6mEbgvvu63s9hS',
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
        id: 'fldEg38Z9K1YRbekP',
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
        id: 'fldFX2J1oqjbcolaU',
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
        id: 'fldrZxS3Bpm7pGXFr',
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
        id: 'fldlyasO0RRFEC1dw',
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
        id: 'fldIxMV3LUMyANax6',
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
        id: 'fldMZpRnXChwT7TmF',
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
        id: 'fld4XuK1j9gGLHnnH',
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
        id: 'fld3VscmhYMC8OgOA',
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
        id: 'fldZaHGpKOMWPjdbb',
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
        id: 'fldrUKJOfNfCzPsMi',
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
        id: 'fldkgph7FhNq9FfbL',
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
        id: 'fld0nbknUMzmdaxnd',
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
        id: 'flds6jlFRuqUYGjAa',
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
        id: 'fldghEOSEO3sigsPk',
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
        id: 'fld1MQSQdi8jDKBNs',
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
        id: 'fldgrDYUT0WNo7aIR',
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
        id: 'fldQ3oCTGFkwJ9fbM',
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
        id: 'fldsHMpMz6G8w7X8s',
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
        id: 'fldVzdjv0NpdMlMOU',
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
    name: 'Member tasks',
    id: 'tblBCKwY97At8dmhL',
    formId: 'shrqu5FLNg5vPsQWP',
    fields: [
      {
        id: 'fldCBekute3Iz8hSN',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldlLuLKyTAYxQU1u',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldju9MgsMymWcaat',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldpE36DLiWJvycO8',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldboCc7y8v05eSrb',
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
        id: 'fldYmfFncy0MsWC7Q',
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
        id: 'fld72J6PBe6VdDn8X',
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
        id: 'fldMWx0QJx1Lhlqdx',
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
        id: 'fldyrPQ0IjAFNAjdB',
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
        id: 'fldSv0kqyQZzWXme1',
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
    name: 'Logistics Tasks',
    id: 'tbl1swHWo6AtNfLQk',
    formId: 'shrTgTLN7tg5rb8Kr',
    fields: [
      {
        id: 'fldbPee7Bi6bTX9FV',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldrKCCHdlw1QB6XH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldxhZrx5NLA4S1Wp',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldkapwX9kmQvwk1I',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper:
          'Please insert the member if the task concerns a specific member',
      },
      {
        id: 'fldZFlYWzopIn9P22',
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
        id: 'flddfIdJpUSgcY7Sw',
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
        id: 'fldr7PZbP0RdAxmBu',
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
        id: 'flduuhPO5yZRrn4Rh',
        name: 'Prescriptions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldf7q4Bbmoiko7pO',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblloJNPu9uCRk20i',
        required: false,
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
        id: 'fld6yW27z7N2WqPGa',
        name: 'Pharmacy provider (Facility from Provider base)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldcZgAESWh1n1deC',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
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
        id: 'fld2gfHwraVeD8EKO',
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
        id: 'fldkcZhPqTnjpT9zQ',
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
          'Please specify the phone number to call when logistic team member reach the place. If the task is linked to one member, the system will automatically fetch the known phone number.',
      },
      {
        id: 'fldihldJzaL4IAGgm',
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
        id: 'fldQdcFQ3VI5Q6Z4C',
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
        id: 'fldIOkOLZq90YaUP7',
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
          'This is a test / work in progress to identify specific time. \nIt is the agreed time with member, please note that Logistic admin might be requesting a reschedule.\nDo not fill if no specific time was agreed with the member.',
      },
      {
        id: 'fldXoRm9G9a1LRoaX',
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
        id: 'fldHpWXvQIdITAmiQ',
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
        id: 'fldBmgaCOsDRwzAHL',
        name: 'Creator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldqwwTUmJVFKh9OV',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: true,
        helper:
          'Select your ID here, you will be able to receive a notification when the task is completed',
      },
    ],
  },
  {
    name: 'CHL Mon',
    id: 'tblNbFRktKNjiwAeQ',
    fields: [
      {
        id: 'fldx2oK1XW99rdrHj',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flduhAzmhxGXfFIXr',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: false,
        helper: '',
      },
      {
        id: 'fld9AffYwqFC0zf19',
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
        id: 'fldsoTrfptSzkAhDA',
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
        id: 'fldgdqIZHz5D0goQe',
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
        id: 'fldaRZciGYhokq7oh',
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
        id: 'fldOleJUDmghka8io',
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
        id: 'fld1JWqpGu2ldIzgP',
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
    name: 'HIF',
    formId: 'shr0Qz4EzYZzNzk6W',
    id: 'tbl3dj1xS1RAxfIlg',
    helper:
      'Please use this to complete Beneficiary information for those Beneficiaries that were not able to complete their HIFs before the Baseline',
    fields: [
      {
        id: 'fldxE66V1M2yLtZs4',
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
        id: 'fldULvRlVPpfqafK5',
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
        id: 'fldCGanwOFeqPKu4o',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldMIKuZSLesns2wm',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldaXHAPss0QzgesD',
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
        id: 'fldTKl0BfDsVyK3wi',
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
        id: 'fld7UD1EFQw2w8fsH',
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
        id: 'fldex3zvkUROEuyxe',
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
        id: 'fldQeJhP4qn1iXhY5',
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
        id: 'fldu3O5jPB1d0kByI',
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
        id: 'fldjCIi1tDYPTQGtv',
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
        id: 'fldDly3zjU11AMt0H',
        name: 'What is Your Weight?',
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
          '"How much do you weigh"\n\n(kg) examples: 60 or 75 or 85\n(If member has already given this information during screening or PSPB or HIF phase and if you can see it on Vitals section on src, please skip this step)',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
        },
      },
      {
        id: 'fldbWsDSKqj9MqQ8V',
        name: 'What is Your Height?',
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
          '"Do you know how tall you are? Even if you have a vague memory of your height in Meters, let us know."\n\n(m) examples: 1.5 or 1.8 or 1.55\n(If member has already given this information during screening or PSPB or HIF phase, please see the height in the filled form)\n\nYou need to enter vitals? Please fill the vitals form in Guided workflow form',
        conditionType: '',
        parentKey: 'Your Age',
        condition: (values: any) => {
          return values['Your Age'] >= 18
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
        id: 'fldneusrUH49NehbD',
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
        id: 'fldko6k9O1fUmjMBx',
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
        id: 'fldiiEOfz7S9Twrh6',
        name: 'If you could work on one aspect of your health, what would it be?',
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
        id: 'fldapreuXlPCjuII1',
        name: 'Other health goal?',
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
          'If you could work on one aspect of your health, what would it be?',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'If you could work on one aspect of your health, what would it be?'
              ]
            )
          ) {
            return ['Others'].some((r) =>
              values[
                'If you could work on one aspect of your health, what would it be?'
              ].includes(r)
            )
          }
          return ['Others'].includes(
            values[
              'If you could work on one aspect of your health, what would it be?'
            ]
          )
        },
      },
      {
        id: 'fldkDW0rtQgUrbL3o',
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
        id: 'fldNJJJWttThKEDiW',
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
        id: 'fld6xLysGhfXtQx9d',
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
        id: 'fldYwEGpWki3HbV8h',
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
        id: 'fldALvzPuJuiEy5zS',
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
        id: 'fld6a6lrSdAHYNJc7',
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
        id: 'fldBVKz91MVBDmmh7',
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
        id: 'fldHduwYApTVbsbcj',
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
    name: 'DM Mon',
    id: 'tblbbuZNG0rcHpITX',
    fields: [
      {
        id: 'fldV2dSuacN2Q6zmq',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldShpHPuNkQEyQCy',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldxA4nrJGjvpsnGg',
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
        id: 'fldHcF2N27sBnAoxI',
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
        id: 'fldpIHC6rGbHZFdei',
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
        id: 'fld0Ke9rBoCJmm8jj',
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
        id: 'fldn6UC2Vc5rqt1Sf',
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
        id: 'fldFQpNnWQBtVyhda',
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
        id: 'fldf0WzuvRJLzwBhM',
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
        id: 'fldTgwKSsWyjyNgFd',
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
        id: 'fldhIva6GiR0O7GXP',
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
        id: 'fldsWgh7cjOlKGIzu',
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
        id: 'fldcXtULZwydn7VSG',
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
    name: 'HMP',
    formId: 'shrw35jOHxrjkqFRQ',
    id: 'tbl4QEwsZ5wu35YXx',
    fields: [
      {
        id: 'fldvwCA4M2pRRjYBX',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldK4FCkliPFSIuqW',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldxIh70RRr1Hl6cd',
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
        id: 'fldM2mJuzMJT1Bwd3',
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
        id: 'fldJ73FU251JQaja0',
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
        id: 'fld6UmeAeGp3EwcSP',
        name: 'Monitoring Kits',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldtp6DKMfe3SS3NL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbloVIO9EevwleDhR',
        required: false,
        helper: '',
      },
      {
        id: 'fldm8C6VYyANYwtFB',
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
    name: 'Interventions',
    id: 'tblbsUkRMKr5yQIxR',
    fields: [
      {
        id: 'fldUm1SVl2Ggc89sm',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldPXYXQr4pnDwVah',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldFKfCf3L0Bk4RIJ',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldjmmz1o8nmfvxlT',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fld0S81vkn9seAFqk',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld49VBr3Dv2OqnDj',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl4QEwsZ5wu35YXx',
        required: false,
        helper: '',
      },
      {
        id: 'fldsTk75UPKk3OhOA',
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
        id: 'fldPS5Sa1Vw6C86B3',
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
        id: 'fldJrUwouuqQyDKSe',
        name: 'Condition',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldq1C8L4NMRtb4mE',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgYVivvXVxFZN3B',
        required: true,
        helper:
          'Note: you can select several conditions that are related to this intervention',
      },
      {
        id: 'fldc8WSklKd9xkGt0',
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
        id: 'fldMaVnqSNFPuvtDq',
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
        id: 'fldOoj7Q1ouzroMKn',
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
      },
      {
        id: 'fld4VHOQZpRITSXia',
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
        id: 'fldVUl358Wptukvsl',
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
        id: 'fldyjiil3JFpwdEzJ',
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
          'Please go to this view <a href="https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM</a>  to identify the MET-Min/week (total of MET-Min/week of each activity)\nExample: 500 or 550 ',
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
        id: 'fld6yzyBwEynGl2Q8',
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
        id: 'fld7pFeP5nWlzir9p',
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
        id: 'fld6VCFATQTV6BcpU',
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
        helper: 'Calculate starting BMI using the current beneficiary weight',
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
        id: 'fldRCXaHbyT6bILOE',
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
        id: 'fldrfS6ZtlJyzaWeS',
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
        id: 'fld6QGWEhR8CtpJUg',
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
        id: 'fldAmbluj77FjJABY',
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
        id: 'fldZWQknTjkzoN1yN',
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
        id: 'fldVv2d3W3naZbVBq',
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
        id: 'fldQZU5gVFUL4pR3r',
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
        id: 'fld6MF3GeMW7Jmqkg',
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
        id: 'fldoD0GYPHNVQHjVx',
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
        id: 'fldedisk85u6Djafy',
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
        id: 'fldBDDxxgok5Q5aVP',
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
        id: 'fldTF328ubRt8B4Wu',
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
        id: 'fldVZb7MXCn4L0pli',
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
        id: 'fldJpJDgba5VH0px5',
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
        id: 'fldP7pdzQbsIUFHdO',
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
        id: 'fldePhmeuAhUXKvhK',
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
          'If condition is Diabetes + condition stage = AT RISK and:\nLevel 0: <100, target = Level 0: <100\nLevel 1: 100 - 180, target = Level 1: 100 - 180\nLevel 2: 181 - 200, target = Level 1: 100 -180\nLevel 3: >200, target = Level 2: 181 - 200\n\nIf condition is Diabetes + condition stage = PRE-DIABETES, 1, 2, or 3 and:\nLevel 0: <100, target = Level 0: <100\nLevel 1: 100 - 180, target = Level 0 <100\nLevel 2: 181 - 200, target = Level 1: 100 -180\nLevel 3: >200, target = Level 2: 181 - 200',
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
        id: 'fld9GdYNJ0t4UpHJz',
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
        id: 'fldqBGpkDDLg7wIBH',
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
          '* If BMI 17.0 - 18.4:\n1-month: 1% increase\n3-month: 1% increase\n6-month: 1% increase\n      * If BMI 16.0 - 16.9:\n1-month: 1% increase\n3-month: 2% increase\n6-month: 2% increase\n      * If BMI < 16.0:\n1-month: 2% increase\n3-month: 2% increase\n6-month: 3% increase',
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
        id: 'fldapwGMgKSY7fpuN',
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
    name: 'Intervention Data Tracking',
    id: 'tblBgSBkib75egqHI',
    formId: 'shrKSeWm890KAwJES',
    helper:
      'This form should be used to collect data about a bene intervention progress',
    fields: [
      {
        id: 'fldlNRXboDuPh1IEI',
        name: 'Member Intervention',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldWJaGCTOR4IOlkh',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblbsUkRMKr5yQIxR',
        required: true,
        helper: '',
      },
      {
        id: 'fldUzCbjfzprSVWEC',
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
        id: 'fld0zxXBDhvwQYwZ2',
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
        id: 'fldK307IyEvW1JLk4',
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
        id: 'fldJIwW8zRiIhyJqh',
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
        id: 'fldjKEzA2LQL37gbz',
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
        id: 'fldULWjwb5CrJwS9y',
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
        id: 'fldIdClM1iqCInzTZ',
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
        id: 'fldgWADiJvhbJ4e4a',
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
        id: 'fldxLEYAYgHsmHHe1',
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
        id: 'fldiGJzoUFhpB4lVw',
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
        id: 'fldMQb3BJB4ZYr6BW',
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
        id: 'fldskXQ8W4pDaV0RC',
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
        id: 'fld4mQid3HVDI7VP3',
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
        id: 'fldUSRnbo2G3vmvIw',
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
        id: 'fldGFQMa5RTTmLiZw',
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
        id: 'fldELx6t1CYmTcs1e',
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
        id: 'fldIRtEukFBrqmnlG',
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
        id: 'fldVgQTZshB0wBATW',
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
        id: 'fldBrSeGANdSABlQk',
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
        id: 'fld3U5Sn5jeA2ZWvA',
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
        id: 'fldEbf5ryPyafqF4y',
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
        formId: 'shrFefBCXsPCUxo2o',
        ctlabel: 'Fill in condition',
        helper:
          'Is the patient exceeding, on track, off track, or regressing on their goal?\n\nExceeding: the beneficiary has already reach the target level and will likely reach another level before the target date\n\nOn track: the beneficiary is not yet there but will likely succeed into reaching the target milestone\n\nOff track: the beneficiary is not yet there and will unlikely succeed into reaching the target milestone\n\nRegressing: the beneficiary is struggling with the milestone and we will likely have to refine another milestone or approach\n\nThe current progress of the intervention leads to a required update of the condition (new stage or new status)? click the button.',
      },
      {
        id: 'fldK6dsnAd9fVJaBZ',
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
        id: 'fldTI9gSEKOMUhdiX',
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
        id: 'fldPybf4ClOsh76k2',
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
        id: 'fld2EPBx111Ov38Gn',
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
        id: 'fldIGTZ7ARauuP19P',
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
        id: 'fldqu4635VyxiDtC1',
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
        id: 'fld8FEyErbN7WyvP1',
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
        id: 'fld1seu5JtjXHv2BK',
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
        id: 'fldxteLOMHPkyf8Bb',
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
        id: 'fldeWEWRUZa2PrNFu',
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
        id: 'fldGJ8vduPy7oMWUT',
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
          'If condition is Diabetes + condition stage = AT RISK and:\nLevel 0: <100, target = Level 0: <100\nLevel 1: 100 - 180, target = Level 1: 100 - 180\nLevel 2: 181 - 200, target = Level 1: 100 -180\nLevel 3: >200, target = Level 2: 181 - 200\n\nIf condition is Diabetes + condition stage = PRE-DIABETES, 1, 2, or 3 and:\nLevel 0: <100, target = Level 0: <100\nLevel 1: 100 - 180, target = Level 0 <100\nLevel 2: 181 - 200, target = Level 1: 100 -180\nLevel 3: >200, target = Level 2: 181 - 200',
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
        id: 'fldFlFoUjdqOwv6d8',
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
        id: 'fldMgqpEMCvOib5sb',
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
        id: 'fld2OmDnAtSSEpIkp',
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
        id: 'fld8gikWr0VHB5DCL',
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
        id: 'fld5f9V0071RfD4yn',
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
        id: 'fld1Cfg13PYpNMLUG',
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
    ],
  },
  {
    name: 'Member Feedback',
    id: 'tbl40C1VZlK5ZZUwK',
    formId: 'shrfE9xB0KuLFDMjL',
    fields: [
      {
        id: 'fldF5CpUTmT34nVjs',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld3JVPPiEdDxNXd3',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper: '',
      },
      {
        id: 'fld7CMcIqud6eEiNJ',
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
        id: 'fldVfA7wLLgfGAqbT',
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
        id: 'fld5IHU0ii0Bd5uwW',
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
        helper: '',
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
        id: 'fldlqbNS1JQAImbip',
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
        id: 'fldxDsVY2sNAPBFT1',
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
        id: 'fld4EqFY0uiQVgTSL',
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
    name: 'Clinical Consultation',
    id: 'tbl3nTYifMQxibPTg',
    formId: 'shr9Q23J6pB5oDd8p',
    fields: [
      {
        id: 'fldAmbaxjnJoHsWIy',
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
        id: 'fldHMUJTXtjHLTZs0',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld5Gl2TqMXA9rt78',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper: '',
      },
      {
        id: 'fldlGzwwaM6E43pF7',
        name: 'Consulting Clinician',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldNVqvgPWL5hKoCH',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: true,
        helper: '',
      },
      {
        id: 'fldz8s3R0AhoBlrt5',
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
        id: 'fld8AENftXr6bS0kv',
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
        id: 'fld3KPooMgghiZf5L',
        name: 'Initial vs FU',
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
        id: 'fld8yrGuPubhvMPoo',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldRdD6gOKLyScRb0',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: true,
        helper:
          'Please add the appointment record here. If you do not, the appointment will not be automatically marked as completed',
        parentKey: 'Consultation Type',
        parentValues: ['Refillable medication prescription'],
        conditionType: '',
        toggleRequriedOnCondition: true,
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
        id: 'fldFUezkqIOSrnIQG',
        name: 'Conditions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8QZgDrk4DuSnlK',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgYVivvXVxFZN3B',
        required: false,
        helper:
          'Please link this consultation form to the condition(s) that was reviewed or discussed or diagnosed during this consultation',
      },
      {
        id: 'fldpvigLPXfHFbZpL',
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
        id: 'fldqebHfsmZ0SMgXI',
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
        id: 'fldYwGfD33b39skoN',
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
        id: 'fldRBUdz3d86wMx1R',
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
        id: 'fldxX0WOa5ZH5Yi7w',
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
        id: 'fld5wRL8iTlnYoRrF',
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
        id: 'fldlyNbvWUwAJ9vPS',
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
        id: 'fld69INt2gJowHdz3',
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
        id: 'fldjLrSvkQJZqrlQ7',
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
        id: 'fldVgLAu4qeFDq9To',
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
        id: 'fld7M4GfxZYu1dR65',
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
        id: 'fldsS67UqhXgQ3Fvp',
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
        id: 'fldr48cJL6R8WStfN',
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
        id: 'fldHrUEb8tcZzjseU',
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
        id: 'fldIKVkxWVbDH2Mvw',
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
        id: 'fldpdLSqu3qkulpPJ',
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
        id: 'fldBhMWoN4Pst2gut',
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
        id: 'fldu9Tfb1SFMHjxeY',
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
        id: 'fldtnPz20a0BN0DXX',
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
        id: 'fldHiJneiEALIGAnE',
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
        id: 'fldK9D44eTnEmPFpC',
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
        id: 'fldNyQHe9DqMakHYH',
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
        id: 'fldAD9psObsSDVZ85',
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
        id: 'fldhNv2G3GLH1qNWX',
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
        id: 'fldsxh6AtiD9jghw9',
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
        id: 'fldyiSBjlaByi0yYj',
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
        id: 'fld9BBDI4x5emMHww',
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
        id: 'fldhcDEGEak8vfM1g',
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
        id: 'fldY9osEU6HTdggTO',
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
        id: 'fldLnxuouC9et23AD',
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
        id: 'fldyNgm3QbvVEyTxD',
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
        id: 'fldAGyq257NobDPhO',
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
        id: 'fld9Xh3EnSrMOhqzx',
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
        id: 'fldYmzY0OBMS9teh2',
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
        id: 'fldDnVjzXEmorP5M5',
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
          'If you identify a new condition: <a href="https://airtable.com/shrduoUdDObJnDFTj" target="_blank">https://airtable.com/shrduoUdDObJnDFTj</a>',
      },
      {
        id: 'fld8aOkqRFd3cBD1f',
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
        id: 'fldZgSOhzvnfUIZLd',
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
        id: 'fldnsHDuFR9utA5EV',
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
        id: 'fld5IOVGQJn36xT95',
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
        id: 'fldxC8zd9Km5rbITc',
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
        id: 'fldPfE9xm45Bd6sPw',
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
        id: 'flddrURzgX3BnmKj7',
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
        id: 'fldCGPhs57PkHkaWh',
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
        id: 'fldyhbgCf5UfYvfRc',
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
        id: 'fldJox8Ev5bVBd0fH',
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
        id: 'fld7JWe6A3Xd6bnD2',
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
        id: 'fldL6X27UQfsfs8xO',
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
    name: 'Mental Health Consultation',
    id: 'tbl8haFPGOP0YlVJU',
    formId: 'shruwb65aP6cOGfZ2',
    fields: [
      {
        id: 'fldQ3TirnH7na8abf',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld51Plp0uKVHEXLt',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldZqm1PQ7w6m3eVr',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldcGkPoRNesu7W61',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldGHpvG6qKMEPAZ3',
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
        id: 'fld9A6bsoRp7IPz7m',
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
        id: 'fld8Nve4QuGywAvPp',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldC5KDxgApwl1zGN',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: false,
        helper:
          'Please select the appointment record so that we can update the status at the end of your consultation',
      },
      {
        id: 'fldadSLvHJSEg88Le',
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
        id: 'fldkIAR6tyuKT9dyl',
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
        id: 'fldVrQ8n4IWUsayDf',
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
        id: 'fldqfESQgHyxXW9SP',
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
        id: 'fldFMhCEO2Wwl1Vk8',
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
        id: 'fldt01Eqnoc1w9h1r',
        name: 'Family of origin',
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
        id: 'flddey3MOicXIx4Uy',
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
        id: 'fldboNGZhgbHRlKZm',
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
        id: 'fldQsFsU24GgnqPur',
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
        id: 'fldJtG2oTt2znT6Aj',
        name: 'Education and work History',
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
        id: 'fldzyUo4bkRMYZ9hZ',
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
        id: 'fldBaAB1GuP94p92e',
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
        id: 'fldTfRKctzWZ5Lxd2',
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
        id: 'fldIsACZVEQFx0cD5',
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
        id: 'fldIh1esupqQ1f5og',
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
        id: 'fldzQR61wAnx8FqAb',
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
        id: 'fldaTOcGWpJAjHyLQ',
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
        id: 'fldwWKybBVTBElJCQ',
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
        id: 'fldKYD8mJ9hPLBMHg',
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
        id: 'fldPLDY8k9aF3Q7qT',
        name: 'Providers',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldO6y4V1gbrqiME5',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl6t7enrCGLBDQ4V',
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
        id: 'fldUZ5nkVoNVyWLws',
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
        helper: '',
      },
      {
        id: 'fld9FtNEFwLJ15XpC',
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
    name: 'Conditions Data tracking',
    id: 'tblTw7086FsouxcrQ',
    formId: 'shrFdrXBS2PxcpyhC',
    fields: [
      {
        id: 'fld0df9G5TcifeSzu',
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
        id: 'fldv9Bnd80vaBijRG',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldGF9p5jv8GtnISL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldJ7IySaDHzcm0RK',
        name: 'Member Conditions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldlqqd25nANGDrIu',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblgYVivvXVxFZN3B',
        required: true,
        helper:
          'Please note that "current stage" in the condition name is the last recorded current stage. In this form you will be tracking the new current stage',
      },
      {
        id: 'fldbTT8xBKQaBN6L3',
        name: 'Conditions master list',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldSuX30P8l6XRaAC',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl9cTcuXOSV2tc4g',
        required: false,
        helper: '',
      },
      {
        id: 'fldi4GdE0YSu9X8F5',
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
        id: 'fldVSdGH0mjJ0SlM1',
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
        id: 'fldl84gQFYa8uUHB9',
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
        id: 'fldomN6AypH9VEuvK',
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
        id: 'fld0o5latdAhM6o68',
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
          'Acute: symptoms < 4 weeks\nSub-acute: symptoms > 4 weeks & < 12 weekss\n If chronic → select the stage as displayed in the calculator\n If > 12 weeks: CHRONIC \n "It sounds as though this has been going on for a long time. I want to understand your back pain a bit better in order to help. I am going to take you through a few questions that will allow us to give your lower back pain a score. Then we will work together to improve that score. Part of that work will definitely involve a visit to our physical therapist, but there are other things we shall do as well!\nIf more than 12 weeks, please calculate the score here: https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe ',
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
        id: 'fldUJXDdigYSp98Hg',
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
        id: 'fldW5oBaCVz0BSanI',
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
        id: 'fldpemGo08NN3vuHh',
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
        id: 'fldYZu3R3jfDiYCII',
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
        id: 'fldFMyAkaulVwRhgH',
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
        id: 'fldc20CZ4I3cNz03x',
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
        id: 'fldqIScTxqZv8s2WM',
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
        id: 'fldfyyHmnYh5RqUIM',
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
        id: 'fldoO4SmynR9ZuYPf',
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
        id: 'fldzbTwEIiENHOTKy',
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
        id: 'fldHVHWUFBQYyUIg2',
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
        id: 'fldW4wRKiKZZwqnLw',
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
        id: 'fld5QCoGedeLCfmB7',
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
        id: 'fld7oxk0PmahWlByx',
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
        id: 'fldH2cPrIjbkZoM6n',
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
        id: 'fld5mi7N6Kt39ZnG9',
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
        id: 'fldf0enVTub3fUyML',
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
        id: 'fld4x45a5DhamFLoO',
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
          '    * If acute: please ask the member to scale their pain from 1 to 10 (10 is the worst scenario) and enter the result\n    * If chronic: please obtain the member’s score using this calculator: <a href="https://coda.io/d/_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR" target="_blank">https://coda.io/d/_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR</a>  and enter the result\n    * Examples: 1 or 5 or 8',
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
        id: 'fldFkYUWH08OYn346',
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
        id: 'fldMHfx1Chz73LWBw',
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
    id: 'tblOg9qCL2Veuh4h5',
    formId: 'shrciJq59dln0jePw',
    fields: [
      {
        id: 'fld5qbwrqE7E9Z8HX',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldboG9ANwZhBFtOE',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fld7UGlPT4IT0Ogzy',
        name: 'member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldm9gxbZ2JOc76CL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper: '',
      },
      {
        id: 'fldutVmeWa1KfzDIw',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldcIWZNKxgYRy8wo',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: false,
        helper:
          'Please select the appointment in the list so that the status can be automatically updated when your meeting is done',
      },
      {
        id: 'fld5DqhIEq2eGVXn7',
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
        id: 'fldFKAwg0nfMHpZgU',
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
        id: 'fldxaJYFgH6Bfnfhi',
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
        id: 'fldjMY9rEVH9k8hSD',
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
        id: 'fldDbCfNhxUo1tVtp',
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
        id: 'fldXBrv21SC5awZW6',
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
        id: 'fldfq0pysP2USdCxm',
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
        id: 'fldz2SmLS1gRIIjLT',
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
        id: 'fld23ybYBOb7LQumd',
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
        id: 'fldwzk48RsSrWl4U4',
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
        id: 'fldDLyz6zou9Tg5jE',
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
        id: 'fldbp3y5qka5K0QZ3',
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
        id: 'flddW3yyEFHbbd209',
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
        id: 'fldIc386DunRKBD5S',
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
        id: 'fldC8g6l27HI9deO9',
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
        id: 'flds59EBce0o4tciM',
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
        id: 'fldB2gOlC26yV9lZc',
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
        id: 'fldH4qOBbGwWB2fAY',
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
        id: 'fldPcqOPJs50MpbDg',
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
        id: 'fldad3xgc2ngcbGY7',
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
        id: 'fldPFOVKvGgWXcuDX',
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
        id: 'fld8feHBNXEkW6Wq3',
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
        id: 'fldMfiaInvwdSh9BN',
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
        id: 'fldsegwdQdg1bqtQh',
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
        id: 'fld3ZmThBkEfrP0SU',
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
        id: 'fld72XefIvOiF9Psk',
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
        id: 'fld6HiH5xgkdCM3U5',
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
        id: 'fld73ibVLW3asrCaV',
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
        id: 'fld6TDg2SF9r3lnNB',
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
        id: 'fldJAN5WRU4ny35Yf',
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
        id: 'fldFL2o82lAsVWHRK',
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
        id: 'fldChfg8C50nEs6Fm',
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
        id: 'fldhnxFEDjV7Mjp52',
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
    name: 'Incident reports',
    id: 'tblOKEWpQrXfonvdm',
    formId: 'shrD8ZlyRD64mJ33t',
    fields: [
      {
        id: 'fldam4Ntr05mRshCW',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldzYqc6s9U8hcgFr',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '(Should be automatically filled by SCRIBE)',
      },
      {
        id: 'fldwwRC5hxm7pTe4y',
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
        id: 'fldlIxIjFvuEPRehJ',
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
        id: 'fldtS7is8OYz6Sn7S',
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
        id: 'fldaTOh5RfypGC2CH',
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
        id: 'fldJjtMqiefwLIsu5',
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
          'Indicates the degree of impact/importance of an issue. P0-An incident that is very impactful and significant and needs immediacy in resolution and has great repercussion .Requires an all-hands on deck approach. P1-An incident that is moderate/mild  in nature, needs time to be solved and one or fewer team members. P2- Minor issues or incidences raised that may go unnoticed if not brought up. Solution is readily available and restoration is quick',
      },
      {
        id: 'fldAeQcDSLIwvBvjh',
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
        id: 'fld65xusXKI2rZTr4',
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
        id: 'fldzgYYkjPZsmjbq2',
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
        id: 'fldkPdRnArHnqNFR4',
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
        id: 'fld1EqHHpGh5CS2ew',
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
        id: 'fldbgzGQwR1o7hReg',
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
        id: 'fldgn0HEoL5kBxbIS',
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
        id: 'fldar3pohx3z5Q1dj',
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
        id: 'fldMPzO40jfbTVAvj',
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
        id: 'fldCmnwaRR0absLDm',
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
        id: 'fldvgxs8PYHF3nwO3',
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
        id: 'fldUgoSj8JeSbGCgr',
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
        id: 'fldnU90I6zNr5y4OC',
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
        id: 'fldgfD1bu2iFd32Dv',
        name: 'Antara Staff Involved',
        type: 'collaborator',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: false,
        helper:
          'Please tag the staff member who was in charge of the member or who was linked to the incident',
      },
      {
        id: 'fldPryFGCNKcM0iAL',
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
        id: 'fldavFcG6c99QE9EK',
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
        id: 'fld7VDvLBJxQrFEjk',
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
    name: 'Minor Health Check (6 to 17)',
    id: 'tbl8EfWnshgOZQpmE',
    helper:
      'Please fill this form only if minor is older than 5 years old, if not, delete the form from the workflow. Please note that you can also push the parent to fill it in the app by creating a member task',
    fields: [
      {
        id: 'fldKWwumVnBLYBpTk',
        name: 'Full name',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldkXNr4z3mMJB98Q',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldRSyq246ETbYdqN',
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
        id: 'fldFD7t0tfPr8fU36',
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
        id: 'fldqbfy1LVXwJE7u8',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldsptsb4F0hAsrZk',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: false,
        helper: '',
      },
      {
        id: 'fld4YSSRQJUfmo8Rm',
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
        id: 'fldyszb0ot3D8aBMp',
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
        id: 'fldMpg6IRz9fZ6gXt',
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
        id: 'fldfdqxyDc7CimqQz',
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
        id: 'fldRuH5BoJ9dGlrDN',
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
        id: 'fldzDeeY9a5jZ64Bq',
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
        id: 'fld3VYAdc7kAFMtBa',
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
        id: 'fldflb8IKEFgmqco7',
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
        id: 'fldqmaj7Bd4VCYnIA',
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
        id: 'fldgepK6xGKaj47pY',
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
        id: 'fldGvsjEXXKQAJUzT',
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
        id: 'fldxf104Iu7svgxsP',
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
        id: 'fldmzoFpwmhQTXb2i',
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
        id: 'fldVoKqYUBdzyxPnm',
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
        id: 'fld67PrzBi7ICqEJ8',
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
        id: 'fldSaL2qD68G0dqFf',
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
        id: 'fldaU8HJL2CBDCPSj',
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
        id: 'fldNlRXn4BSZbJt9J',
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
        id: 'fldGY8ykFBKj6rGZF',
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
        id: 'fldZfNv5OiLgry3Fb',
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
        id: 'fld7EMUnryAYPpsau',
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
        id: 'fldv9hBPQeSbVYvZf',
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
        id: 'fldHGjYwcKXUq3oqo',
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
        id: 'flddcKohhBh80GiXT',
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
        id: 'fldxcUo8RLF9iWkA7',
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
        id: 'fldf6RijYbKBtL2h',
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
        id: 'fldZt0imrSEm2gPZm',
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
        id: 'fld3pvj1043gQBs0z',
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
        id: 'fldseaGsM6kphavwe',
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
        id: 'fld85wZZXHfveLiHG',
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
        id: 'fldQE6fybfWySIghH',
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
        id: 'fldldzYDnYlMGSymJ',
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
        id: 'fldvEd5lwRltB6Nzz',
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
        id: 'fldU2UDhLi4OT19Cc',
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
        id: 'fldlVZbd1cm6ZJqIT',
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
        id: 'fldGsyySPnJrPclVy',
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
        id: 'fldHSPtGALagVB3zC',
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
        id: 'fldojr1eTVSpbK6g6',
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
        id: 'fldz6VOOxrhvJDXQm',
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
        id: 'fldFVl94CLGGBLoQL',
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
        id: 'fldzbzOK67280LQNC',
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
        id: 'fldIGdfaFDvKR4PGB',
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
        id: 'fldOM0UbGKjCc1Xru',
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
        id: 'fldMRXoPfgPiZUnp6',
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
        id: 'fldSwvu1TwqpC47uQ',
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
        id: 'fldnv4L9v5jBnUSXO',
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
        id: 'fldktTWiOtqn5kpaZ',
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
        id: 'fldthQJPgpcNQVwIg',
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
        id: 'fldTzcr19IhL6wNOT',
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
        id: 'fldEYJuOWqqiWB2bx',
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
        id: 'fld8zCpW4Wr2YY05Y',
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
        id: 'fldPaJRx1mL75y4Yv',
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
        id: 'fldZOEBCbGx5h3WIx',
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
        id: 'fldURd45MmDlcC3IK',
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
        id: 'fldFcrCW6vFHCuHB1',
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
        id: 'fldmqoozYIx6z7Ffw',
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
        id: 'fldfKNDWXqxTBPUm2',
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
        id: 'fldbXmoiMXi3p3XfB',
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
        id: 'fldxBwPkDVMxeMzO0',
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
        id: 'fld8zahXHUDhD06uH',
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
        id: 'fldVg8kvQRAo1jRbO',
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
        id: 'fldGnP4RUVyynhqhw',
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
        id: 'fld68Bcwpr77zLETn',
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
        id: 'fldJmUgUHNXXk9yb2',
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
        id: 'fldbM0hTULvoDWk8q',
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
        id: 'fldSumB1oGsfKVtkb',
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
        id: 'fldqXqqCKCWfJuDJr',
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
        id: 'fldtdllH5jS06t9uV',
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
        id: 'fld0aVbuMF4GpM1hX',
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
        id: 'fldL0AO02icbAp69b',
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
        id: 'fldszz9UysszVKlNJ',
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
        id: 'fldDQeZmVd6hOOKAy',
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
        id: 'fldu5ED5OeL7S5fbN',
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
        id: 'fldl7BvMEZjqyLIFC',
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
        id: 'fld9wub5JgUSipjLl',
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
        id: 'fldJDk3Ic0ucGUJfn',
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
        id: 'fldbfVI15WBMEOSeo',
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
        id: 'fldf6LVcU5EvKEfGO',
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
        id: 'fldNw6KM93htd2LLL',
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
        id: 'fldeWuB8FvjzHvzdN',
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
        id: 'flddxXFpQqtRUYgiH',
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
        id: 'fldh0KPBVwpKdCTkI',
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
        id: 'fldozkRrs1BsNFHeu',
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
        id: 'fldjG2oE2I0Rysx5w',
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
        id: 'fldspFAdOlhutBCAd',
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
        id: 'fldLIZrCXwqfyMDZj',
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
        id: 'fld6dbuFZibQkjNnt',
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
        id: 'fldcmFDynDrRuzBXg',
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
        id: 'fldTw4jirt97uBORR',
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
        id: 'fldXhCZdc0yBi802U',
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
    name: 'Conditions',
    id: 'tblgYVivvXVxFZN3B',
    formId: 'shrMqZKe4VM5QwIUk',
    fields: [
      {
        id: 'fldlUX5VcZdifN2Qg',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldQLpZqIXvTSf6lm',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
        helper: '',
      },
      {
        id: 'fldDbE1FaEQid6BUV',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldY4HR7EeRDHwv7F',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper: '',
      },
      {
        id: 'fldrG3ztT442BdXLa',
        name: 'Conditions master list',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldhP2i87Q11Snxaa',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbl9cTcuXOSV2tc4g',
        required: true,
        helper: '',
      },
      {
        id: 'fldUb8YtDPkUCBXl6',
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
          'Please look for ICD10 codes here: <a href="https://icdcodelookup.com/icd-10/codes" target="_blank">https://icdcodelookup.com/icd-10/codes</a>\nand enter it in the field. Examples: I10 or E10 or E11',
      },
      {
        id: 'fldxLWSXo9I3cpHJm',
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
      },
      {
        id: 'fldUR3WYE6nqFoFHE',
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
        id: 'fldNXh1SRAozwCcqs',
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
          '      * If acute: please ask the member to scale their pain from 1 to 10 (10 is the worst scenario) and enter the result\n    * If chronic: please obtain the member’s score using this calculator: <a href="https://coda.io/d/_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR" target="_blank">https://coda.io/d/_dLO3YmEbw6e/Lower-back-pain-calculator_suYVR</a>  and enter the result\n    * Examples: 1 or 5 or 8',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recdroomItEDYaxgr'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recdroomItEDYaxgr'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recdroomItEDYaxgr'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldwgpF5gEw0uA9XS',
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
        parentValues: ['recdroomItEDYaxgr'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recdroomItEDYaxgr'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recdroomItEDYaxgr'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldOOL6EsT9wgMCb1',
        name: 'Lower back pain key goal',
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
          '  * If acute and sub-acute select functional recovery and pain control\n  * if chronic select functional recovery and pain score less then 9/36',
        conditionType: '',
        parentKey: 'Conditions master list',
        parentValues: ['recdroomItEDYaxgr'],
        condition: (values: any) => {
          if (Array.isArray(values['Conditions master list'])) {
            return ['recdroomItEDYaxgr'].some((r) =>
              values['Conditions master list'].includes(r)
            )
          }
          return ['recdroomItEDYaxgr'].includes(
            values['Conditions master list']
          )
        },
      },
      {
        id: 'fldGbaRXkdYNVRESd',
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
        id: 'fldnhRDtlgVKbDfg6',
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
        id: 'fldYTKC03Jomt4aXb',
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
        id: 'fldCIR5RzwDvZKkBL',
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
        id: 'fldESVddYYjigrmwR',
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
        id: 'fldAIWSHMtsdOdhG0',
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
      },
      {
        id: 'fld4tqnbsHhdT3eFW',
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
        id: 'fldU1dVBBjZJ7IlAA',
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
        id: 'fldc2TCTzWxumotkl',
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
      {
        id: 'fldCQmAoyoQPlvT6E',
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
        id: 'fld8JhTK0m44AU70e',
        name: 'Primary Doctor',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldPuVf7JA0gSiKcA',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblKoFLuzxN9g13xT',
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
    ],
  },
  {
    name: 'Minor Health Check (0 to 5)',
    id: 'tblcShvXs3WINoqL7',
    helper:
      'Please fill this form only if minor is younger than 5 years old, if not, delete the form from the workflow',
    fields: [
      {
        id: 'fldOay3WV9hFM9qiN',
        name: 'Full name',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldobP0EzP2Gx9axj',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldHB1IInfsrI1c4Y',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldtRTJPTRig7FH0H',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: true,
        helper: '',
      },
      {
        id: 'fld91GhKtaf7ZOqHV',
        name: 'Appointments',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8uolKKtWpQe4wX',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblhHcP4VrFV9atFx',
        required: false,
        helper: '',
      },
      {
        id: 'fldRC0qHocnP5PxlC',
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
        id: 'fldV6AZC4SkNZwePg',
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
        id: 'fldJR92At1vlWNVsz',
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
        id: 'fld8cUrrQvA9aW9gP',
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
        id: 'fldCGBKAofJxWICbS',
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
        id: 'fldQDiFiRlP9NEhmW',
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
        id: 'fldjrs68DYNw6Urf2',
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
        id: 'fldK6Pw4r3JTN0T4H',
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
        id: 'fld1BLcMBtXd2T66A',
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
        id: 'fldVIJEbovP7uTs2g',
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
        id: 'fldDRgNy9WLdNE50T',
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
        id: 'fld7909NcT0utku0D',
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
        id: 'fldXQsuhruCnrLhoc',
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
        id: 'fld5ccnftbAlXQy9l',
        name: 'If yes, what are the food allergies?',
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
        id: 'fldjzdHiKqlaaYdNA',
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
        id: 'flduAcSHBZKPqwo73',
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
        parentKey: 'Does your child have any medication allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Does your child have any medication allergies?']
            )
          ) {
            return ['Yes'].some((r) =>
              values['Does your child have any medication allergies?'].includes(
                r
              )
            )
          }
          return ['Yes'].includes(
            values['Does your child have any medication allergies?']
          )
        },
      },
      {
        id: 'fldBt3zEIgNmjOyRi',
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
        id: 'fldqNqeZw8XKHvcrL',
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
          'Please enter the medications in the HN prescription form if all details are available or create a task for HN to collect data and add a new Rx in the scribe for the member.',
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
        id: 'fldL23z2iF4ZQ7Gkn',
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
        id: 'fldchEViWqXGqs0Mx',
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
        id: 'fldpswZKEcE5JbUWE',
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
        id: 'fldcXE5e05APGdXcf',
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
        parentKey: 'Has your child ever been hospitalized',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Has your child ever been hospitalized'])) {
            return ['Yes'].some((r) =>
              values['Has your child ever been hospitalized'].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Has your child ever been hospitalized']
          )
        },
      },
      {
        id: 'fld4UUq57qxEiCn1C',
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
        id: 'fldzSfEVwD1npEOY2',
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
        id: 'fldxLQ6XrJzqsgrNG',
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
        id: 'fldQDVCqv6GIkaBLn',
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
        parentValues: ['6'],
        condition: (values: any) => {
          if (Array.isArray(values.Age)) {
            return ['6'].some((r) => values.Age.includes(r))
          }
          return ['6'].includes(values.Age)
        },
      },
      {
        id: 'fldQUaOflcrUm5wx2',
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
        id: 'fldzQ8cvkUt77Ss5C',
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
        id: 'fldprBxdnK1GuqzLc',
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
        id: 'fldNqO2XMOEdcGowt',
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
        id: 'fldYgWcRL4KIHza1F',
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
        id: 'fldp91KN1Y20Nhr7m',
        name: 'What are your child’s interests and goals?',
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
        id: 'fldLqVPe27niyzKsf',
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
        id: 'fldCM11WejsULzNm0',
        name: 'Do you have any concerns about your baby’s feeding or weight?',
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
        id: 'fldA8XabAxDxf652d',
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
        id: 'fldDpBnk6TI2OjRc5',
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
        helper:
          'Enter in cups. If less than 1 cup, schedule a Nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 1800
        },
      },
      {
        id: 'fldoT7xpSerEuGLHO',
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
        helper: 'If No, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldaIgHN42YmiekMq',
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
        helper: 'If No, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldG590cyY6bM03QM',
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
        helper: 'If No, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldWkOfUK9snvybvJ',
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
        helper: 'If Yes, schedule a nutrition consultation',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 180 && diff <= 360
        },
      },
      {
        id: 'fldmz8qM4kJq55w3N',
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
        id: 'fldaChEg8aicw8gov',
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
        id: 'fldmqV0rEQB32qG25',
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
        helper: 'Enter in cups. If more than 1 cup, schedule an NC.',
        conditionType: '',
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'fldrJ6kJvRZvbsTmh',
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
        parentKey: 'Date Of Birth ',
        condition: (values: any) => {
          const birthDate = dayjs(values['Date Of Birth'])
          const diff = dayjs().diff(birthDate, 'day')
          return !isNaN(parseFloat(diff)) && diff >= 390 && diff <= 1800
        },
      },
      {
        id: 'fldMUfOKFpbEFCQ54',
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
        id: 'fldoHVvSOf6hTSqzs',
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
        id: 'fldK6r7Qu8puh0AgQ',
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
        id: 'fldlKuiWiXiQnVSbQ',
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
        id: 'fldJmrkcbFU62VIka',
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
        id: 'fldfJCeAImTsaGqbR',
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
        id: 'fldK7FGvIiQXmeVSp',
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
        id: 'fld1JtCuGqniC6G7m',
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
        id: 'fldjYPcwXcdNpnVLv',
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
        id: 'fldDd40RrueB0NXe8',
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
        id: 'fldk3rl2CeMclQiEG',
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
        id: 'fldhpqbPAc49qM8Ne',
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
        id: 'fldwgQQaiUNP4H2qt',
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
        id: 'fldLQW4hJQ6HvDJjp',
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
        id: 'fldIeCuul6Yku3gzW',
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
        id: 'fld713nXvko65Ojsn',
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
        id: 'fld8DpbfErxoYyBQm',
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
        id: 'fld50Qi2eQGyiyeYz',
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
        id: 'fldPeCnA24S5oX7yE',
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
        id: 'fldo4NDREHYJ6r7JZ',
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
        id: 'fldNUoMdNlnFhOb6q',
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
        id: 'fldLeCk31Farel4yO',
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
        id: 'fldbLNi5vxtKSNYTF',
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
        id: 'fldd4EmVapvFNVSW7',
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
        id: 'fldcF10Ru5HzPDNMF',
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
        id: 'fldl43uDvXxoeiDfr',
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
        id: 'fldMH511D6rZS7h7m',
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
        id: 'fldyjGcFO0r1GDgAg',
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
        id: 'fldytOIYREvfPEo5c',
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
        id: 'fldF29aj5wFYj7xR8',
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
        id: 'fldv6Y1FBxRHLDbkq',
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
        id: 'fldo31NS1xu1gTIMp',
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
        id: 'fldtf7PjwaSRCaxWb',
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
        id: 'fldB37e20xnZQXQUi',
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
        id: 'fldHVI1AS1Vf3gPiJ',
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
        id: 'fld5NJV7irV1LB6uf',
        name: 'Do you brush your child’s teeth daily?',
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
        id: 'fldaXvtJvBUq2Btud',
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
        id: 'fldf02QtUxbirulxT',
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
        id: 'fldXlci1W3R2STR6M',
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
    id: 'tblritsRCscNKPs3W',
    name: 'Healthy triage form',
    fields: [
      {
        id: 'fld17rcC9t0H9gOHQ',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldgMtu378BqzF2Hc',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: true,
        helper: '',
      },
      {
        id: 'fldOQ3h4hVn2DyqKS',
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
        id: 'fldM2jDmroKGm6O5c',
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
        id: 'fldCPIHIYMVr6Ql7I',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld9mSBjBia9NFqmi',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblZyeANbBkE2q4uG',
        required: true,
        helper: '',
      },
      {
        id: 'fldY1ll4U0rCOcLD6',
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
        id: 'fldrhA3IDCcmsTG8i',
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
        id: 'fldyWlrIMdmlpWK0B',
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
        id: 'fldTv7Be1SbYVGKgR',
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
        id: 'fldYzvMVDkrrjIem2',
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
        id: 'fldEyDQNnk4JyQec5',
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
        id: 'fld5uifD2hf1nW5pl',
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
        id: 'fldDzPcm88KWkIH29',
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
        id: 'fld9FH0E8JY3bUeHK',
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
        id: 'flduJHK5CySIjg1l0',
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
        id: 'fldOvTxqGyvl7vglG',
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
        helper: '',
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
        id: 'fldpvSlQCPBqsmHd1',
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
        helper: '',
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
        id: 'fldGOJozJQ6zYlP7t',
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
        helper: '',
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
        id: 'fldB4jSnhTZYwcX8Z',
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
        helper: '',
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
        id: 'fldFpyFlkA31a73r9',
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
        helper: '',
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
        id: 'fldnxVqz1SkvnbfzX',
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
        helper: '',
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
        id: 'fldWm4lAtlFJZRRvP',
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
        helper: '',
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
        id: 'fld7kohLcjy12kViL',
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
        helper: '',
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
        id: 'fldATtVQnOLvGp85p',
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
        helper: '',
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
        id: 'fldpsAY6BLYu8mQMG',
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
        helper: '',
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
        id: 'fldOUFNvYqp3ENAsQ',
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
        helper: '',
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
        id: 'fldiCPw4yZyY6jm2T',
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
        helper: '',
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
        id: 'fldewQt3tqOkV5iNI',
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
        helper: '',
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
        id: 'fldvMv1UxyVUkFnT7',
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
        helper: '',
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
        id: 'fldRguB3TmNZnvTcN',
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
        id: 'fldJN47uBwcfymxd9',
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
        id: 'fldGCJoNZIyvw3TTn',
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
        id: 'fld7Plkj2E3OYqIh5',
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
        id: 'fldzedXKKBRVruazp',
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
        id: 'fld0aZ4XAYbUhym9o',
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
        id: 'fld7knCr8YGxLBZJe',
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
        id: 'fldKViEo4DxKdxgLt',
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
        id: 'fldXCPGQaFAaKbOcf',
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
        id: 'fldewtQ2KyCqxsMW7',
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
        id: 'flddxqwcJMNmyr0Bh',
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
        id: 'fld8Yi5GywdHab8IQ',
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
        helper: '',
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
        id: 'fldLbUVXaVzuvgUwY',
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
        helper: '',
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
        id: 'fldHWNUQExHNXXPOm',
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
        helper: '',
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
        id: 'fldeYizaTVuIwugbs',
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
        helper: '',
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
        id: 'fldqNBrGl9RUOftsF',
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
        helper: '',
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
        id: 'fldfAygKzKbSjtfXd',
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
        helper: '',
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
        id: 'fldnn4oRyuMqkFWP1',
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
        helper: '',
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
        id: 'fld01KEl1tdzN9sgd',
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
        helper: '',
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
    ],
  },
  {
    name: 'Lab/imaging management',
    id: 'tblgUOEkOSePEa30q',
    fields: [
      {
        id: 'fldohjoV0VUSXZhU1',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldlMTX3LzFLEmwAB',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblAjKAJOCIDk5Nco',
        required: false,
        helper: '',
      },
      {
        id: 'fldeWGWqiBAIVAoUl',
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
        id: 'fldr1TXHhKok0bF1U',
        name: 'Routine lab (from Lab synced view)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldZXuvCJL4zIKQtX',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbld6zETvQncv6r2O',
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
        id: 'fldDbTwahDc1HmnLo',
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
        id: 'fld02YD0Y9B9E5qhI',
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
        id: 'fld6jTSYzhiHagAlI',
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
        id: 'fldmuHwd9DZOXRrab',
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
        id: 'fldc24RMxQw73x3Ln',
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
        id: 'fldiW9vzwlevhDBWo',
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
        id: 'fldbT6Kn9FlIcvjPa',
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
]
