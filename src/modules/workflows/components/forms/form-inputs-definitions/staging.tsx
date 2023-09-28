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
        id: 'fldslTLtnS1T1goHa',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldkC6ueqmW6xII0t',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblLsYlG4IiNEbWWs',
        required: false,
        helper: '',
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
        id: 'fldtLDjCNw3Y8AWMD',
        name: 'Other Specialist',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Fill in the Specialist not found in the provider base',
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
    id: 'tblNln00p7bXb3v4t',
    fields: [
      {
        id: 'fldd3gOCr8XNONu7p',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldhC82VmNlpXnWFk',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldK2x0cnAZIA3Jxn',
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
        id: 'fldXriJZzgU632vB5',
        name: 'CS task type',
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
        parentValues: ['CS task type'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['CS task type'].some((r) => values.Type.includes(r))
          }
          return ['CS task type'].includes(values.Type)
        },
      },
      {
        id: 'fld7h8lXwm4bladGY',
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
        id: 'fldvQCCS8YRZB0wNO',
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
        id: 'fldGVmi0AU9RWNvju',
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
        id: 'fldXlWw9qx7QVc7E4',
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
        id: 'fld8IAvOz86qpde5Z',
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
        id: 'fldGhgwM5uM4TMJLx',
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
        id: 'fld6GxQFUp2I60fEt',
        name: 'Assignee',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldhcljAwSUPSI8k4',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblf6noUXSKCzG2Ze',
        required: true,
        helper: 'Note: if CS task, please assign it to Effie',
      },
      {
        id: 'fldCIdpwFji1YxC6z',
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
        id: 'fldZk0klAzgQWz39I',
        name: 'Collaborator (created by)',
        type: 'collaborator',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'Team member who is creating this task (this field will be used for follow up)',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['CS task type'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['CS task type'].some((r) => values.Type.includes(r))
          }
          return ['CS task type'].includes(values.Type)
        },
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
    id: 'tblBWSBWgqUAoA0vQ',
    fields: [
      {
        id: 'fldGAol00tDdMxqNo',
        name: 'Consultation',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldDeqfUOJfOH0zYD',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbljV2Mp13gvPrNoO',
        required: true,
        helper: '',
      },
      {
        id: 'fldJHjWtYL8rJX6uF',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldmUtfxiygq88qTj',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldkovDDIJtKVzPUv',
        name: 'Clinician',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldU8SJMfv5aiteI9',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblf6noUXSKCzG2Ze',
        required: true,
        helper: '',
      },
      {
        id: 'fldoevgEChhLDunJH',
        name: 'Medication',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldA1nOQHM3lw2dt5',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblglBRVOue24usUH',
        required: false,
        helper: '',
      },
      {
        id: 'fld0s3iqAtaDRVMEL',
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
        parentValues: ['recZ4ZsdaFQHReh72'],
        condition: (values: any) => {
          if (Array.isArray(values.Medication)) {
            return ['recZ4ZsdaFQHReh72'].some((r) =>
              values.Medication.includes(r)
            )
          }
          return ['recZ4ZsdaFQHReh72'].includes(values.Medication)
        },
      },
      {
        id: 'flddoEkG5JDjEyBHq',
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
        id: 'fldP34IWp4rHYG4YO',
        name: 'Dose',
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
        id: 'flde32FPPbpMYLIx3',
        name: 'Dosage Unit',
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
        id: 'fldNaBGUBnt0vfVvk',
        name: 'Refill facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldCRGwZg7SgcW1sq',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblU94ZnFmMT7S0o0',
        required: false,
        helper: '',
      },
      {
        id: 'fldnBDiS3bvcOOweC',
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
        parentValues: ['OTHER'],
        condition: (values: any) => {
          if (Array.isArray(values['Refill facility from Provider base'])) {
            return ['OTHER'].some((r) =>
              values['Refill facility from Provider base'].includes(r)
            )
          }
          return ['OTHER'].includes(
            values['Refill facility from Provider base']
          )
        },
      },
      {
        id: 'fldLG9PUQxV3rbiPz',
        name: 'Prescribing facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldKz9n3g1RE3macs',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblU94ZnFmMT7S0o0',
        required: false,
        helper: '',
      },
      {
        id: 'fldMg2J8OnyeH8DpA',
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
        parentValues: ['OTHER'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Prescribing facility from Provider base'])
          ) {
            return ['OTHER'].some((r) =>
              values['Prescribing facility from Provider base'].includes(r)
            )
          }
          return ['OTHER'].includes(
            values['Prescribing facility from Provider base']
          )
        },
      },
      {
        id: 'fldUUW2FmQ2bCmtCh',
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
        helper: '',
      },
      {
        id: 'fld1ev2gKj5OK7bQG',
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
        id: 'fldbFrjJKHrKgUd74',
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
        helper: '',
      },
      {
        id: 'fld9frxQXjAcH5b4t',
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
        id: 'fldtlHRKIW4sYKxEh',
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
        id: 'fldYMJHNDWb4QapSB',
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
        helper: '',
      },
      {
        id: 'fldEAAll13mUitW3i',
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
        id: 'fldHP4aY1SAztxAU7',
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
        id: 'fldSnPeVQd0hpa4Pu',
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
        id: 'fldNW08jyN8TZnv9i',
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
        id: 'fldebis29suSo59hs',
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
    ],
  },
  {
    name: 'Prescriptions',
    id: 'tblBWSBWgqUAoA0vQ',
    fields: [
      {
        id: 'fldJHjWtYL8rJX6uF',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldmUtfxiygq88qTj',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: false,
        helper: '',
      },
      {
        id: 'fldoevgEChhLDunJH',
        name: 'Medication',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldA1nOQHM3lw2dt5',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblglBRVOue24usUH',
        required: true,
        helper: '',
      },
      {
        id: 'fld0s3iqAtaDRVMEL',
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
        parentKey: 'Medication',
        parentValues: ['recZ4ZsdaFQHReh72'],
        condition: (values: any) => {
          if (Array.isArray(values.Medication)) {
            return ['recZ4ZsdaFQHReh72'].some((r) =>
              values.Medication.includes(r)
            )
          }
          return ['recZ4ZsdaFQHReh72'].includes(values.Medication)
        },
      },
      {
        id: 'fldjxfJKm1LWXUN3d',
        name: 'Associated condition(s)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldHJSlAeFsHTBTgn',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblww46ChelvcfLy9',
        required: false,
        helper: '',
      },
      {
        id: 'fldP34IWp4rHYG4YO',
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
        id: 'flde32FPPbpMYLIx3',
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
        id: 'fldUUW2FmQ2bCmtCh',
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
        id: 'fld1ev2gKj5OK7bQG',
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
        id: 'fldbFrjJKHrKgUd74',
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
        id: 'fld9frxQXjAcH5b4t',
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
        id: 'fldYMJHNDWb4QapSB',
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
        id: 'fldEAAll13mUitW3i',
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
        id: 'fldHP4aY1SAztxAU7',
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
        id: 'fldSnPeVQd0hpa4Pu',
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
        id: 'flda0FVl4EUTDKRCb',
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
        id: 'fldNW08jyN8TZnv9i',
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
        id: 'fldtlHRKIW4sYKxEh',
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
        id: 'fldebis29suSo59hs',
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
        id: 'flduuWCt8GrlRnpbL',
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
        id: 'fld7VtJkDl8riWIEy',
        name: 'Prescription Refills',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblBWSBWgqUAoA0vQ',
        required: false,
        helper: '',
      },
      {
        id: 'fldLG9PUQxV3rbiPz',
        name: 'Prescribing facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldKz9n3g1RE3macs',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblU94ZnFmMT7S0o0',
        required: true,
        helper: '',
      },
      {
        id: 'fldMg2J8OnyeH8DpA',
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
        parentValues: ['recKyWKUXonDwCbYC'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Prescribing facility from Provider base'])
          ) {
            return ['recKyWKUXonDwCbYC'].some((r) =>
              values['Prescribing facility from Provider base'].includes(r)
            )
          }
          return ['recKyWKUXonDwCbYC'].includes(
            values['Prescribing facility from Provider base']
          )
        },
      },
      {
        id: 'fldNaBGUBnt0vfVvk',
        name: 'Refill facility from Provider base',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldCRGwZg7SgcW1sq',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblU94ZnFmMT7S0o0',
        required: false,
        helper: '',
      },
      {
        id: 'fldnBDiS3bvcOOweC',
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
        parentValues: ['recKyWKUXonDwCbYC'],
        condition: (values: any) => {
          if (Array.isArray(values['Refill facility from Provider base'])) {
            return ['recKyWKUXonDwCbYC'].some((r) =>
              values['Refill facility from Provider base'].includes(r)
            )
          }
          return ['recKyWKUXonDwCbYC'].includes(
            values['Refill facility from Provider base']
          )
        },
      },
      {
        id: 'fld0lcI7zArWPPw7m',
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
    id: 'tbl5pe6QE5eb20iJL',
    fields: [
      {
        id: 'fldAbooaAwHYVzcKf',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldGPACBm1WoDHtUL',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldnZzqQWBXgRMBY2',
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
        id: 'fld9lhf88MaWEh5TH',
        name: 'Appointment',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldfA5d72P7tT7E5I',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblxflDbHI5TGqra5',
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Appointment Type',
        parentValues: ['Inpatient', 'Outpatient'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Inpatient', 'Outpatient'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Inpatient', 'Outpatient'].includes(
            values['Appointment Type']
          )
        },
      },
      {
        id: 'fld0DInEtw2U9Bdn7',
        name: 'Clinical Consultation',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldAdBgvity5HJFhh',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbljV2Mp13gvPrNoO',
        required: false,
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
        id: 'fldyZmHrsa2tB25jw',
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
        id: 'fldSinh8ErWu1WHaB',
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
        id: 'fldvWQF6b0bkeOdRP',
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
        id: 'fldWGtEk0lOdkxe2a',
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
        parentValues: ['Outpatient', 'Virtual Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Appointment Type'])) {
            return ['Outpatient', 'Virtual Consultation'].some((r) =>
              values['Appointment Type'].includes(r)
            )
          }
          return ['Outpatient', 'Virtual Consultation'].includes(
            values['Appointment Type']
          )
        },
      },
      {
        id: 'fldp2WG1v9aaHWO9I',
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
        id: 'fldbRKbHmngZwGSbG',
        name: 'Facilities',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldyrj7ShQ0EZfnm9',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblU94ZnFmMT7S0o0',
        required: false,
        helper:
          'Please select the facility the member was sent to for the appointment',
      },
      {
        id: 'fldskA3Lwge073XV3',
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
        parentValues: ['recT1DtxlC4G9BuUj'],
        condition: (values: any) => {
          if (Array.isArray(values.Facilities)) {
            return ['recT1DtxlC4G9BuUj'].some((r) =>
              values.Facilities.includes(r)
            )
          }
          return ['recT1DtxlC4G9BuUj'].includes(values.Facilities)
        },
      },
      {
        id: 'fldlKityzjREz70y5',
        name: 'Specialists',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldfE6RxLw5jVTB46',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblPpf5F81JypdC9k',
        required: false,
        helper:
          'Please select the specialist the member was sent to for the appointment',
      },
      {
        id: 'fldiJcYY2QADhhu02',
        name: 'Other Specialist',
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
        parentKey: 'Specialists',
        parentValues: ['reco4phjmLbZai3dD'],
        condition: (values: any) => {
          if (Array.isArray(values.Specialists)) {
            return ['reco4phjmLbZai3dD'].some((r) =>
              values.Specialists.includes(r)
            )
          }
          return ['reco4phjmLbZai3dD'].includes(values.Specialists)
        },
      },
      {
        id: 'fldIbRUpV4Cx37gZt',
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
        id: 'fldi87cD55V5Y0k0J',
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
        id: 'fldIn0buWHI6lxSau',
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
        helper: 'optional - if date is already known by member please say yes',
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
        id: 'fldLwvzXOXcSCs3Zh',
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
          'Mandatory - create a new appointment using a form\nOptional - please enter the date of the appointment ',
        conditionType: '',
        parentKey: 'Referral appointment booked?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Referral appointment booked?'])) {
            return ['Yes'].some((r) =>
              values['Referral appointment booked?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Referral appointment booked?'])
        },
      },
      {
        id: 'fld4tpEgIpYxBTlKt',
        name: 'Facility referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldgzsE6mmZuw5Z0w',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblU94ZnFmMT7S0o0',
        required: false,
        helper: 'Optional - select the facility the member was referred to',
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
        id: 'fldTxRkTQ7exaoOk2',
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
        parentValues: ['OTHER'],
        condition: (values: any) => {
          if (Array.isArray(values['Facility referred'])) {
            return ['OTHER'].some((r) =>
              values['Facility referred'].includes(r)
            )
          }
          return ['OTHER'].includes(values['Facility referred'])
        },
      },
      {
        id: 'fldgnVeeCoT8BgKNe',
        name: 'Specialist referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldES6cFyBUmKG1kZ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblPpf5F81JypdC9k',
        required: false,
        helper: 'Optional - select the specialist the member was referred to',
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
        id: 'fldxbGB4ZFrDq2Kvo',
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
        parentValues: ['reco4phjmLbZai3dD'],
        condition: (values: any) => {
          if (Array.isArray(values['Specialist referred'])) {
            return ['reco4phjmLbZai3dD'].some((r) =>
              values['Specialist referred'].includes(r)
            )
          }
          return ['reco4phjmLbZai3dD'].includes(values['Specialist referred'])
        },
      },
      {
        id: 'fldQ9xcHStzJyzU7Z',
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
        helper:
          'Please enter all the details about the referral(s) so that ME can coordinate or confirm later (including reason for referral, preferred specialist or facility...)',
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
        id: 'fldFPyNQaTOAuVvTc',
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
        parentKey: ['Appointment Type', 'Antara awareness'],
        parentValues: ['Outpatient', 'Yes'],
        condition: (values: any) => {
          return (
            ['Outpatient'].includes(values['Appointment Type']) &&
            ['Yes'].includes(values['Antara awareness'])
          )
        },
      },
      {
        id: 'fldpHamGaOQWpzBeF',
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
        id: 'fldOEFEG1sWksJkJA',
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
          'To enter the diagnosis, please click here: <a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a> ',
        conditionType: '',
        parentKey: ['Attended appointment?', 'Received diagnosis'],
        parentValues: ['Completed', 'True'],
        condition: (values: any) => {
          return (
            ['Completed'].includes(values['Attended appointment?']) &&
            ['True'].includes(values['Received diagnosis'])
          )
        },
      },
      {
        id: 'fldNcn4Fwjhg4i1xm',
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
        parentKey: ['Attended appointment?', 'Appointment Type'],
        parentValues: ['Completed', 'Outpatient'],
        condition: (values: any) => {
          return (
            ['Outpatient'].includes(values['Appointment Type']) &&
            ['Completed'].includes(values['Attended appointment?'])
          )
        },
      },
      {
        id: 'fld9W9bbtKrUsP59w',
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
        id: 'fldvFnBr2WESlIf5W',
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
        id: 'fldQrV4vzorTcL1bE',
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
        id: 'fldto6lccetf2bgt4',
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
        id: 'fldGPGLtxsESqesII',
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
        id: 'flds3yICT2fNQCzlq',
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
        id: 'fldMYhGOaNooejl6B',
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
        parentKey: [
          'Received medication',
          'Medication Information available',
          'Appointment Type',
        ],
        parentValues: ['True', 'Virtual Consultation'],
        condition: (values: any) => {
          return (
            ['Virtual Consultation'].includes(values['Appointment Type']) &&
            ['True'].includes(values['Received medication']) &&
            ['True'].includes(values['Medication Information available'])
          )
        },
      },
      {
        id: 'fldiMAv4TTBPhWVbM',
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
        id: 'fldCjVbaQXiOvunah',
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
      },
      {
        id: 'fldmab88Q3sbYmusg',
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
        id: 'fldM1JB6ybaFUV5xb',
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
        id: 'fldY9groMtezIv0e5',
        name: 'Symptoms progress',
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
          'Discuss with member and please indicates if the symptom(s) or the condition(s) have been progressing',
      },
      {
        id: 'fldB3P7JPdg1QcQKI',
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
        id: 'fldq0rF9iD1g1UZLR',
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
        parentKey: ['Appointment Type', 'Attended appointment?'],
        parentValues: ['Inpatient', 'Outpatient', 'Completed'],
        condition: (values: any) => {
          return (
            ['Inpatient', 'Outpatient'].includes(values['Appointment Type']) &&
            ['Completed'].includes(values['Attended appointment?'])
          )
        },
      },
      {
        id: 'fldcj9xtfvEwDJB4c',
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
        id: 'fldqTb1YqxEES55pE',
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
          'If external appointment\nIf the follow up appointment is already booked (external), please create the appointment using the form in src.\nIf not booked, please create a task to coordinate\n\nIf Virtual Consult\nbook it using calendly link',
        conditionType: '',
        parentKey: ['Received next appointment', 'Requires a VC follow-up?'],
        parentValues: ['True', 'Yes'],
        condition: (values: any) => {
          return (
            ['True'].includes(values['Received next appointment']) &&
            ['Yes'].includes(values['Requires a VC follow-up?'])
          )
        },
      },
      {
        id: 'fldrOJZ7kdceB7wMM',
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
        parentKey: ['Appointment Type', 'Attended appointment?'],
        parentValues: ['Virtual Consultation', 'Completed'],
        condition: (values: any) => {
          return (
            ['Virtual Consultation'].includes(values['Appointment Type']) &&
            ['Completed'].includes(values['Attended appointment?'])
          )
        },
      },
      {
        id: 'fld7lGpwffSNxovlE',
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
        parentKey: ['Appointment Type', 'Asked to make payment'],
        parentValues: ['Virtual Consultation', 'True'],
        condition: (values: any) => {
          return (
            ['Virtual Consultation'].includes(values['Appointment Type']) &&
            ['True'].includes(values['Asked to make payment'])
          )
        },
      },
      {
        id: 'fldlkXCrwDWlEwd9z',
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
        id: 'fldWPDwz7t1aPkRNw',
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
          'Please input the calculated glycemic load using this field.\n[Stage 0]: <100 (Recommended for diabetes)\n[Stage 1]: 80-180 (Normal)\n[Stage 2]: >180 (High)',
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
    id: 'tblRaTk5Vo0rFtkMj',
    fields: [
      {
        id: 'fldz2iAne3Ykts8F1',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldFccUKxzmH2OajG',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldrWL0ekpVYCuQWJ',
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
          '[Open data sharing] will allow the member to share a picture or a message with no specific focus. NOT TO USE YET - WIP',
      },
      {
        id: 'fldeUotuYPqKZcACo',
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
        id: 'fldnASUWnvwTKTlDv',
        name: "Task's duration",
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
        id: 'fld2uGOXvOrJOBoI5',
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
        id: 'fldOZYE7uA0DkQhI9',
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
        id: 'fld8398xk7pxtdkJz',
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
        helper: 'What is the task yo want to assign to the team',
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
          'Tasks will be done as soon as possible, please enter the latest possible date at which you want the task to be performed.',
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
    name: 'Conditions Data tracking',
    id: 'tbl94gOfSWSm1NaWo',
    fields: [
      {
        id: 'fldgLoXNRaCgMuQ42',
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
        id: 'fldLHKbkUhV88yhme',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldWdidc5MyE0DGnj',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldZFRmZWU7xJCYmi',
        name: 'Member Conditions',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldBYz19RE0LdTpd2',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblww46ChelvcfLy9',
        required: true,
        helper:
          'Please note that "current stage" in the condition name is the last recorded current stage. In this form you will be tracking the new current stage',
      },
      {
        id: 'fldK9ruwhDJqfqDRm',
        name: 'Condition type',
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
          'WIP (we are still adding conditions on a monthly basis)\nThis field is used to provide you with the appropriate questions',
      },
      {
        id: 'fldbqmuOMDJHx8jhz',
        name: 'Update hypertension stage',
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
          '@risk: Sys/DIa <120/80\nElevated BP: 120-130 and <80 mmHg\nStage 1 Hypertension: 130-140 or 80-89 mmHg\nStage 2 Hypertension: >140 or >90mmHg',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Hypertension'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hypertension'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hypertension'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldBGd4XrfA61aF6H',
        name: 'Update gastritis stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Acute: < 6 weeks\nChronic > 6 weeks',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Gastritis'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Gastritis'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Gastritis'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldEUWUHkG77sUs0i',
        name: 'Update gastritis Hpylori stage',
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
        parentKey: 'Condition type',
        parentValues: ['Gastritis H.Pylori-associated'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Gastritis H.Pylori-associated'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Gastritis H.Pylori-associated'].includes(
            values['Condition type']
          )
        },
      },
      {
        id: 'fldgWe9hfu0fjmmBG',
        name: 'Update lower back pain stage',
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
          'Acute: symptoms < 4 weeks\nSub-acute: symptoms > 4 weeks & < 12 weeks\nMild chronic: symptoms  >12 weeks; score to be defined\nModerate chronic: symptoms  >12 weeks; score to be defined\nSevere chronic: symptoms  >12 weeks; score to be defined',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Lower back pain'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Lower back pain'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Lower back pain'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldah6rk4xoQWp6cO',
        name: 'Update Hyperlipidemia stage',
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
          'At risk if members with previous hx or family hx\n Hypercholesterolemia if TC>200mg/dl\n Hypertriglyceridemia if TG >150mg/dl only done in a fasting state\n Mixed hyperlipidemia if defined as elevated LDL >130mg/dl, TC>200mg/dl and TG>150mg/dl',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Hyperlipidemia'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hyperlipidemia'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hyperlipidemia'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldcDxphocZY888Sg',
        name: 'Update other condition stage',
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
        parentKey: 'Condition type',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Other'].some((r) => values['Condition type'].includes(r))
          }
          return ['Other'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldFMvuvMpdLALscP',
        name: 'Update asthma stage',
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
          'Stage 1: Mild intermittent = score of 24-25\nStage 2: Moderate intermittent = score of 21-23\nStage 3: Moderate persistent = score of 16-20\nStage 4: Severe persistent = score of 0-15',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Asthma'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Asthma'].some((r) => values['Condition type'].includes(r))
          }
          return ['Asthma'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldexDRYPAFBPeAdg',
        name: 'Update varicose veins stage',
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
          'Mild: Occasional pain not restricting activities , few veins, number of active ulcers 1, occasional edema\nModerate: Daily moderate activity limitation requiring occasional analgesia use, Multiple veins/torturous, 2 ulcers present, Occasional edema above the level of the ankles\nSevere: Extensive veins, daily pain limiting daily activities, more than 3 ulcers, edema to the level of the knee, severe cellulitis',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Varicose veins'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Varicose veins'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Varicose veins'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldVkHorWLLT37fLf',
        name: 'Update fibroid stage',
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
          'Asymptomatic: diagnosed during routine visit but not symptomatic\nSymptomatic: associated with menstrual disturbances, anemia, difficulty in conception',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Fibroid (leiomyoma)'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Fibroid (leiomyoma)'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Fibroid (leiomyoma)'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldsA9q6QZtakPYy5',
        name: 'Update diabetes 2 stage',
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
          'At risk: HB1AC <5.7%\nStage 1: HB1AC > 6.5%\nStage 2: HB1AC >7.5%, FBS >7 mmol/l, only on oral meds\nStage 3: HB1AC >7.5%, FBS >7 mmol/l, on insulin\nPrediabetes: HBA1C 5.7% to 6.4% FBS >6 mmol/l, Positive impaired glucose tolerance test (RBS 7.8-11.1 mmol/l)',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Diabetes 2'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Diabetes 2'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Diabetes 2'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldGg100jHptFI0rk',
        name: 'Update diabetes 1 stage',
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
        parentKey: 'Condition type',
        parentValues: ['Diabetes 1'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Diabetes 1'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Diabetes 1'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldv6Hvt9fH3oGSdk',
        name: 'Update diabetes gestational stage',
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
        parentKey: 'Condition type',
        parentValues: ['Diabetes, Gestational'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Diabetes, Gestational'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Diabetes, Gestational'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldEmdGtkEh7wKWkN',
        name: 'Update Allergic Rhinitis stage',
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
          'To identify the stage, please assess following symptoms: running nose, watery eyes, itchy eyes or nose, sneezing, red eyes.\n\nStages:\nSeasonal: Symptoms triggered seasonally\nIntermittent: Symptoms < 4 days per week or < 4 weeks per year\nPersistent: Symptoms > 4 days per week or > 4 weeks per year',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Allergic rhinitis'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Allergic rhinitis'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Allergic rhinitis'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldPJ2kLuz4Le4Rf6',
        name: 'Update hemorrhoids stage',
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
        parentKey: 'Condition type',
        parentValues: ['Hemorrhoids'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hemorrhoids'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hemorrhoids'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldXtQK1rSgW5aGLA',
        name: 'Update overweight stage',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Stage 1: BMI 25-29.9\nStage 2: BMI 30-39.9\nStage 3: BMI >=40',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Overweight'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Overweight'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Overweight'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldcCFFR41pX3Glg4',
        name: 'Update osteoarthritis stage',
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
          'Stage 1: Minor wear-and-tear in the joints. Little to no pain in the affected area\nStage 2: Pain score <3 - Mild (some morning stiffness, intermittent pain with NO quality of life impact)\nStage 3: Pain score 4-7 - Moderate (intermittent pain with impact on quality of life)\nStage 4: Pain score >8 - Severe (persistent pain with significant impact on quality of life)',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Osteoarthritis'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Osteoarthritis'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Osteoarthritis'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldvQLkGQCYU2dSmp',
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
          'Please score the pain of the member using this website: <a href="https://www.researchgate.net/figure/The-Universal-Pain-Assessment-Tool-UPAT-that-has-been-used-to-identify-functional-TMJ_fig1_311158988" target="_blank">https://www.researchgate.net/figure/The-Universal-Pain-Assessment-Tool-UPAT-that-has-been-used-to-identify-functional-TMJ_fig1_311158988</a> ',
        conditionType: '',
        parentKey: 'Condition type',
        parentValues: ['Osteoarthritis'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Osteoarthritis'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Osteoarthritis'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldnWG87BDAftBz35',
        name: 'Update GERD stage',
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
        parentKey: 'Condition type',
        parentValues: ['GERD'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['GERD'].some((r) => values['Condition type'].includes(r))
          }
          return ['GERD'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldXAlDyuABiwEKBV',
        name: 'Update eczema stage',
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
        parentKey: 'Condition type',
        parentValues: ['Eczema'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Eczema'].some((r) => values['Condition type'].includes(r))
          }
          return ['Eczema'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldlUrVUS1T1GflbH',
        name: 'Update clinical status',
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
          'Please note that this is the new clinical status of the conditions if it has changed.',
      },
      {
        id: 'fldvynb2FLB1Mawhj',
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
        id: 'fldVS7I3thyMvD1zE',
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
        id: 'fld2fol8oyZ5A1U64',
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
    name: 'HIF',
    id: 'tbljLsPEEihy4vGQO',
    fields: [
      {
        id: 'fldajEFsH6PdXqdfD',
        name: 'Date/Time',
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
        id: 'fldSejbDAWEom0szW',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld2gTi6E2EqUI01U',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldm5UmzsyFV06vEL',
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
      },
      {
        id: 'flde4NuwIBI1erTDP',
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
      },
      {
        id: 'fldQjEnWg0UgbO34q',
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
        id: 'fldmIf9yEu0Fv3HHF',
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
      },
      {
        id: 'fldRtTngN3lzaCkMF',
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
        id: 'fldqvQoWeJqO6wcXb',
        name: 'Do you have any of the following conditions?',
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
        id: 'fldI9DJcn3R0OKMPP',
        name: 'Do you have any significant past medical history not listed above?',
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
        id: 'fldDMDgyGYu7kufGb',
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
        id: 'fldAWf8gAiFSTzK65',
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
        id: 'fld5ViXoPlqbh59WM',
        name: 'Have you ever had surgery?',
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
        id: 'fldTNbQEx3QgZHGMu',
        name: 'Please describe any surgeries you may have had',
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
        parentKey: 'Have you ever had surgery?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Have you ever had surgery?'])) {
            return ['Yes'].some((r) =>
              values['Have you ever had surgery?'].includes(r)
            )
          }
          return ['Yes'].includes(values['Have you ever had surgery?'])
        },
      },
      {
        id: 'fldGOh4BjmzTMRcgV',
        name: 'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?',
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
        id: 'fldnulMqxVJIwsdel',
        name: 'Please Describe FH of HTN',
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
          'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?'
            ]
          )
        },
      },
      {
        id: 'fldLjELjocDc2OS2J',
        name: 'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?',
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
        id: 'fldSYrq5HCRhi6Wgj',
        name: 'Please Describe FH of DM',
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
          'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?'
            ]
          )
        },
      },
      {
        id: 'fldKrmWjFaofW1M98',
        name: 'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?',
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
        id: 'fld0mInE04eBR9EeH',
        name: 'Please Describe FH of High Cholesterol',
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
          'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?'
            ]
          )
        },
      },
      {
        id: 'fldcDVn92Tttd6Unv',
        name: 'Is there anyone in your immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack or stroke) before age 55?',
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
        id: 'fldmcK0HDuRv3ohDp',
        name: 'Please Describe FH of Cardiovascular events',
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
          'Is there anyone in your immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack or stroke) before age 55?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Is there anyone in your immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack or stroke) before age 55?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Is there anyone in your immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack or stroke) before age 55?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Is there anyone in your immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack or stroke) before age 55?'
            ]
          )
        },
      },
      {
        id: 'fldzaR68fUoNq6EY3',
        name: 'Is there any other family health history you think we should know about?',
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
        id: 'fldJXaoqfycIrqeWq',
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
        id: 'fld2TgRhYaeajD3Zt',
        name: 'email address',
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
        parentKey: 'What is your preferred channel of communication?',
        parentValues: ['Email'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['What is your preferred channel of communication?']
            )
          ) {
            return ['Email'].some((r) =>
              values[
                'What is your preferred channel of communication?'
              ].includes(r)
            )
          }
          return ['Email'].includes(
            values['What is your preferred channel of communication?']
          )
        },
      },
      {
        id: 'fldVClryzCx7hDBoz',
        name: 'What is your secondary channel of communication?',
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
        id: 'fldPDCjViIdSGTyZG',
        name: 'What would be the ideal frequency of communication?',
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
        id: 'fldvXseyv87Bm4SPw',
        name: 'If you could work on one aspect of your health, what would it be?(retired)',
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
      },
      {
        id: 'fldXLDk5mGjTII9HR',
        name: 'On a scale of 0-5, how Important is your health to you at this time?',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Insert a number from 0-5',
      },
      {
        id: 'fld6cMnwK0PJzEc9L',
        name: 'Other reasons for wanting to be healthier',
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
          "We'd like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):",
        parentValues: ['“Another reason"'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                "We'd like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):"
              ]
            )
          ) {
            return ['“Another reason"'].some((r) =>
              values[
                "We'd like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):"
              ].includes(r)
            )
          }
          return ['“Another reason"'].includes(
            values[
              "We'd like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):"
            ]
          )
        },
      },
      {
        id: 'fldU6euNxqscPMXta',
        name: "We'd like to learn more about how you approach a challenge or problem in your life.",
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
          "We've learned that some people like to take things head-on right from the start, with all their energy. Others tend to prefer a slow and steady approach and don't like to take everything on all at once. With that in mind, which of the following best describes you:",
      },
    ],
  },
  {
    name: 'DM Mon',
    id: 'tblrJDNUshRaeFGov',
    fields: [
      {
        id: 'fldbAmGBWtd0nmxRY',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8PyvWg4KObOO76',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldN8dbyvXJtWIlbO',
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
        id: 'fldXKOQUOoSzUQm2g',
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
        id: 'fldFgQqddXBFwVbJQ',
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
        id: 'fldginXynF2HTC6OR',
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
        id: 'fldDE3q9HtvpXJZnN',
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
        id: 'fldVoyBuI71rsOfII',
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
        id: 'fldvy5nBh89J6MzMk',
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
        id: 'fld9OFyZedYh53eaL',
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
        id: 'fldxgEYdszhYlnEsn',
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
        id: 'fldIup5eYAejhWG42',
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
        id: 'fldsvCISLNYbUnTne',
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
    name: 'Intervention Data Tracking',
    id: 'tblRO1pr4sx3Lwocg',
    fields: [
      {
        id: 'fldBl0LiaUUNOhG9g',
        name: 'Member Intervention',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldchjuJF5h2f4jPP',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblr038Yy1R356G2p',
        required: true,
        helper: '',
      },
      {
        id: 'flda7LZq1QPppbU9a',
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
        id: 'fldg7GLIpyVuneuuA',
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
        id: 'fld0B9VPkVVUyZJPC',
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
        id: 'fldZgFKfl8IGOOHVP',
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
        id: 'fldziNnHO2gJAneG7',
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
          'Please go to this view <a href="https://airtable.com/tblTCHo0WAfWgEF6J/viwUPC7gUPA1NiQyV?blocks=hide" target="_blank">https://airtable.com/tblTCHo0WAfWgEF6J/viwUPC7gUPA1NiQyV?blocks=hide</a> to identify the MET-Min/week (total of MET-Min/week of each activity)\nExample: 500 or 550',
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
        id: 'fldaj57DXm2pgMQE6',
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
        id: 'fldYLL9TNzQAfDxox',
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
        id: 'fldwuJrpvMH9gkczI',
        name: 'Current BMI reduction measurement',
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
          'Calculate current BMI using the new current weight. \nIdentify the difference between previous BMI and current BMI\nEnter the increase or decrease in BMI\nFormula to use: ((current BMI/initial BMI)-1)*100\n\nexample: \ninitial BMI was 24 \ncurrent BMI is 26\nformula: X = ((26/24)-1)*100\nresult = 8.33\nenter: 8.33% increase\n\nexample 2:\ninitial BMI was 25\ncurrent BMI is 23\nformula: X = ((23/25)-1)*100\nresult = -8\nenter: 8% reduction\n\nSome examples:\n3% reduction, 4% increase, 2% reduction, 0%\n',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Caloric Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldNjNMHKx7qTXFJz',
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
        id: 'fldyeSnvGWHn8kjq4',
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
        id: 'fld2okRIvSuXvH46u',
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
        id: 'fldIS6EfIlPBHbYma',
        name: 'Current asthma trigger measurement',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the daily number of triggers\nExample: 5 or 10',
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
        id: 'fldkUZ6kPYlBfnTkB',
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
        id: 'fldaq0biaj612Ctd4',
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
        id: 'fldWdZAhR8jRT1gu4',
        name: 'Current caloric level',
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
        parentValues: ['Caloric Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldUjGUANTokqsqwM',
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
        id: 'fldYpCsB6W1pXClQe',
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
        id: 'fldbOZH6ey1Y3Ryou',
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
        id: 'fldRZ12Nm4DQ7RjlS',
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
          '0: 80-180 (At Risk)\n1: <80 (Newly dx)\n2: <100 (1st line meds)\n3: <180 (2nd line meds)',
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
        id: 'fldUJoTyk6Y8MGDz6',
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
          'Is the patient exceeding, on track, off track, or regressing on their goal?\n\nExceeding: the beneficiary has already reach the target level and will likely reach another level before the target date\n\nOn track: the beneficiary is not yet there but will likely succeed into reaching the target milestone\n\nOff track: the beneficiary is not yet there and will unlikely succeed into reaching the target milestone\n\nRegressing: the beneficiary is struggling with the milestone and we will likely have to refine another milestone or approach\n\nThe current progress of the intervention leads to a required update of the condition (new stage or new status)? click here: <a href="https://airtable.com/shrFefBCXsPCUxo2o" target="_blank">https://airtable.com/shrFefBCXsPCUxo2o</a>',
      },
      {
        id: 'fld0EmgumuzdsZ86x',
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
        id: 'fld9gi4Zq1eKrxbNv',
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
        id: 'fld56k3boCeqOn4PA',
        name: 'Status update',
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
        id: 'fldicYpENirM2j6bV',
        name: 'Reason for status update',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the reason why the status changed',
      },
      {
        id: 'fldN0Hj6ngfjYSR6Y',
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
        helper: '',
      },
      {
        id: 'fldodNmLdsd5tOtkz',
        name: "Intervention's result",
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
          'Since you have stopped the intervention, please enter here if it has been successful or not.',
        conditionType: '',
        parentKey: 'Status update',
        parentValues: ['Opted out', 'Stopped'],
        condition: (values: any) => {
          if (Array.isArray(values['Status update'])) {
            return ['Opted out', 'Stopped'].some((r) =>
              values['Status update'].includes(r)
            )
          }
          return ['Opted out', 'Stopped'].includes(values['Status update'])
        },
      },
      {
        id: 'fldh0nicvKJVeL06i',
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
        parentKey: "Intervention's result",
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values["Intervention's result"])) {
            return ['Other'].some((r) =>
              values["Intervention's result"].includes(r)
            )
          }
          return ['Other'].includes(values["Intervention's result"])
        },
      },
      {
        id: 'fldN1nzVyYfi5v66J',
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
        id: 'flduuNKYGgA0mHLa2',
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
        id: 'fldWhhjkg6Y5V2Upr',
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
          'Optional unless you want to change the current milestone\n\nStage 0: 80-180 (At Risk)\nStage 1: <80 (Newly dx)\nStage 2: <100 (1st line meds)\nStage 3: <180 (2nd line meds)',
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
        id: 'fldVTOc15uQM3L4IG',
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
        id: 'fld2OzdLyTVMPr3XJ',
        name: 'Next caloric reduction milestone',
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
          'Optional unless you want to change the current milestone\n\nIf Stage 1:\n1-month: 2% reduction\n3-month: 3% reduction\n6-month: 5% reduction\n\nIf Stage 2:\n1-month: 3% reduction\n3-month: 5% reduction\n6-month: 7% reduction\n\nIf Stage 3:\n1-month: 3% reduction\n3-month: 5% reduction\n6-month: 7% reduction',
        conditionType: '',
        parentKey: 'Intervention type',
        parentValues: ['Caloric Reduction Plan'],
        condition: (values: any) => {
          if (Array.isArray(values['Intervention type'])) {
            return ['Caloric Reduction Plan'].some((r) =>
              values['Intervention type'].includes(r)
            )
          }
          return ['Caloric Reduction Plan'].includes(
            values['Intervention type']
          )
        },
      },
      {
        id: 'fldimvrumKiQbFGPX',
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
        id: 'fldoOr83dhlF8lB7j',
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
        id: 'fldlNiJ7MorPMT23V',
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
        id: 'fldhao48P6onk2Jpe',
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
        id: 'fldGUtKdLV6l0xyWi',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldiD8F6x8CXMqz06',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblpQpVJrFonBQuBg',
        required: false,
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
        name: 'Date of appointment',
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
        required: false,
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
]
