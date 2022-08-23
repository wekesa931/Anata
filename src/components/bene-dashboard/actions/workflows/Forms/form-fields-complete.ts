const ProductionSchema = [
  {
    name: 'Baseline',
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
        required: true,
        helper: '',
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
        id: 'fldQLkaDm3DmzIDIj',
        name: 'Current Health Issues?',
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
          '"I just wanted to ask about whether you are having any health issue, right now, that is affecting or concerning you."\n\nQuickly make a judgment on the next steps that may need to follow for the particular complaint.\n\nIn case of a complaint that may need visual confirmation, please ask the member what phone they are using and if they can take a photo or even have a WhatsApp video call\n\nThe key here is to determining the following:\nIs the condition acute?\nIs the condition chronic?\nIs the condition a Priority (meaning, does the Member consider the condition to be important)?',
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
        id: 'fldd8erRZbAQUzMvg',
        name: 'Height (m)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        formId: 'shr0VkCzeprnRSIhA',
        ctlabel: 'Enter Vitals',
        helper:
          '"Do you know how tall you are? Even if you have a vague memory of your height in Meters, let us know."\n\n(m) examples: 1.5 or 1.8 or 1.55\n(If member has already given this information during screening or PSPB or HIF phase and if you can see it on Vitals section on Scribe, please skip this step)\n\nYou need to enter vitals? Click the button',
      },
      {
        id: 'fldAeTRV1wNUXYLkj',
        name: 'Weight (kg)',
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
          '"How much do you weigh"\n\n(kg) examples: 60 or 75 or 85\n(If member has already given this information during screening or PSPB or HIF phase and if you can see it on Vitals section on Scribe, please skip this step)',
      },
      {
        id: 'fldzJcksuUVBUBo2R',
        name: 'Systolic Blood Pressure (mmHg)',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        formId: 'shrJo1OLcSNVTTA0w',
        ctlabel: 'Create BP Intake',
        helper:
          '"Have you ever taken or had someone else take your Blood Pressure? If so, do you remember the last BP reading you had"\n\n(mm/Hg)\nBetter to create a BP intake.',
      },
      {
        id: 'fldMBunVl8Fvmy8JB',
        name: 'Diastolic Blood Pressure (mmHg)',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        formId: 'shrJo1OLcSNVTTA0w',
        ctlabel: 'Create BP Intake',
        helper: '(mm/Hg)\nBetter to create a BP intake.',
      },
      {
        id: 'fld3GQgj3l991L0sp',
        name: 'Please select the system(s) with a relevant finding',
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
          '"Are you currently having any complaints or issues that are new or old in the following parts of your body"\n\n[Please use the following as simple descriptions:]\n\nNEUROLOGIC: any issues related to taste, sight, smell, touch or hearing. Any Seizures or issues with your brain\n\nHEENT: any issues realted to your Head, Eyes, Ears, Nose or Throat\n\nCARDIOVASCULAR: any issues related to your heart or blood pressure, veins or arteries\n\nPULMONARY: any issues related to your lungs or breathing\n\nGASTROINTESTINAL: any vomiting or diarrhea, constipation irritable bowels or other issue passing stool\n\nGENITOURINARY: any issues with your genitalia/private parts; any difficulty urinating or problem with sexual performance\n\nEXTREMITIES: any tingling in your fingers or toes, any pain or swelling in your arms or legs, difficulty with your hands or feet\n\nDERMATOLOGIC: any rashes, lumps, bumps, skin color changes or skin problems\n\nMENTAL HEALTH: are you having any mental health issues\n\nHEMATOLOGIC: have you ever been told you are anemic\n\nREPRODUCTIVE: \nMen: any issues with erectile dysfunction, fertility or testicular issues\nFemale: any menstruation related, fertility related or ovarian issues\n\nENDOCRINE: have you ever been told you have an issue with your hormones\n\nNEOPLASTIC: are you currently receiving care for cancer\n\nIMMUNOLOGIC: have you ever been told you have a weakened immune system',
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
        required: false,
        helper:
          '"For example: brain aneurysm, or brain tumor, or not cured of encephalitis or meningitis, or epilepsy/seizure in last 5 years, or multiple sclerosis, or neuropathy, or Parkinson\'s, or stroke, or diagnosed w/fainting and >41, or Transient Ischemic Attack, or subdural hematoma, or traumatic brain injury."',
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
        required: false,
        helper:
          'For example: heart attack, or atrial fibrilation/flutter, or abnormal heartbeat caused fainting, or taking >2 heart meds, or been advised to test heart periodically with echocardiogram, or advised to have surgery for heart murmur, or doctor said more than 1 episode of pericarditis, or seen doctor in last 6 months for pericarditis, or other.',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Cardiovascular '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Cardiovascular '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Cardiovascular '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        formId: 'shrH0jDDogdH2ySWr',
        ctlabel: 'Enter the medications',
        helper: 'Please click the button to enter the medications.',
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Cardiovascular '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Cardiovascular '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Cardiovascular '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'For example: Sarcoidosis, or COPD, or admitted to hospital /emergency room for asthma in last year, or if >41 and >3 oral steroids in last 12 months, or pulmonary nodule or lung spot, or using CPAP machine, or not sure on resolved bronchitis/pneumonia/tuberculosis, or had other.',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Pulmonary '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Pulmonary '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Pulmonary '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Pulmonary '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Pulmonary '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Pulmonary '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          "For example: anorectal fistula, or celiac, or colon polyp, or Crohn's disease, or ulcerative colitis, or advised to get liver biopsy, or hepatitis B/C/D, or pancreatitis, or pancreatic abscess, or not sure ulcer resolved, or Barrett's or dysphagia, or weight loss surgery or other\n",
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
        required: false,
        helper:
          'For example: Glomerulonephritis or nephropathy, or kidney obstruction/infection due to stones, or surgery for stones, or remaining stones, or kidney failure, or dialysis, or urological abnormalities, or Proteinuria, or multiple renal cysts, or other/not sure.',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Genitourinary '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Genitourinary '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Genitourinary '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Genitourinary '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Genitourinary '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Genitourinary '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'In Men for Example: testicular torsion, infertility, erectile dysfunction, varicocoele\nIn Women For Example: inability to conceive, history of fibroids, ovarian cysts, endometriosis, hysterectomy, ectopic pregnancy or any other issue you may want to share',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Reproductive'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Reproductive'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Reproductive'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Reproductive'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Reproductive'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Reproductive'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Extremities '],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Extremities '].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Extremities '].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'For example: is the member taking arthritis medication, or surgery for scoliosis, or other. ',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Musculoskeletal'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Musculoskeletal'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Musculoskeletal'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Musculoskeletal'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Musculoskeletal'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Musculoskeletal'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'For example: \nHemolytic or other anemia, iron deficiency, chronic bleeding, problems with blood clotting, easy or excessive bleeding, coagulation defects(hemophilia), \nenlarged spleen (hypersplenism), low platelet count (thrombocytopenia) or ITP (idiopathic thrombocytopenic purpura)',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Hematologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Hematologic'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Hematologic'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Hematologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Hematologic'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Hematologic'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'Does the member have any history of:\nHOSPITALIZATION for Depression, anxiety, psychosis, suicide thoughts or attempts, anorexia or bulimia, post traumatic stress disorder, obsessive compulsive disorder, bipolar disorder, attention deficit hyperactivity disorder (ADHD) or other emotional disorder; or depression not diagnosed as situational only, or memory impairment, or delusion, or eating disorder, or suicide attempt',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Mental Health'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Mental Health'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Mental Health'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Mental Health'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Mental Health'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Mental Health'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'For example: they had or plan to have surgery or a biopsy of the cyst or nodule; or been advised by a member of the medical profession to have scans or imaging procedures of the thyroid that have not yet been completed; or being treated for your hypothyroidism (underactive thyroid) or hyperthyroidism (overactive thyroid); or other.\n',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Endocrine'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Endocrine'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Endocrine'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Endocrine'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Endocrine'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Endocrine'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper:
          'Does the patient have any cancers, such as malignant tumor, skin cancer, leukemia, or melanoma?',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Neoplastic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Neoplastic'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Neoplastic'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        required: false,
        helper: '',
        conditionType: '',
        parentKey: 'Please select the system(s) with a relevant finding',
        parentValues: ['Immunologic'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Please select the system(s) with a relevant finding']
            )
          ) {
            return ['Immunologic'].some((r) =>
              values[
                'Please select the system(s) with a relevant finding'
              ].includes(r)
            )
          }
          return ['Immunologic'].includes(
            values['Please select the system(s) with a relevant finding']
          )
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
        id: 'fldkcFSAT8oJKkUos',
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
        helper: 'For Minors, only complete if menses has begun',
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
        id: 'fldywqzPqUntkfwc2',
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
        id: 'fldXEhIMkO20GMOTj',
        name: 'Family Planning Description',
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
        id: 'fldEgYA6Nml0CPzYO',
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
        id: 'flduNfBP6v15QEodI',
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
        required: false,
        helper:
          '"What kind of Physical Activity do you like to do? Do you like to walk, run, cycle, swim, go to the gym, play football, rugby or any other activity?"\n\nIf YES:\n"How often do you do [activity from above] and typically, how long do you do it for in any given session?\n\nIf NO:\n"That\'s okay, let\'s find something you will enjoy and start doing it."',
      },
      {
        id: 'fld6gal0rU8EW7uqS',
        name: 'Activity',
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
          '[From Activity Description response, please assign a level.]\n\n\nIF ADULT\n 0: No/very light activity = Only sitting, watching TV or staying in bed\n\n1: Light activity = Sitting work with leisure activity; or at least 30 minutes brisk walking 3 days per week; or\nlight weight lifting, yoga, stretching exercises\n\n2: Moderate activity = Partly standing/walking work; or at least 30 minutes brisk walking 5 days per week; or\nmoderate weight lifting, low impact home exercises (push ups, sit ups, star jumps, dancing, aerobics, zumba), cycling for leisure, jog-walk combination, slow skipping, occasional hiking\n\n3: Vigorous activity = Mainly standing/walking work; or at least 60 minutes brisk walking 7 days per week; or\nheavy weight lifting, high impact home exercises, cycling to work, jogging, fast skipping, weekend hiking\n\n4: Daily sports/athlete = Daily strenuous work like heavy lifting, digging, farming, sports cycling, sports training, competitive sports, hiking\n\n\nIF MINOR\n 0: No/very light activity = Only sitting, watching TV or staying in bed\n\n1: Light activity = At least 60 minutes of running, cycling, jumping, play, sports - once per week\n\n2: Moderate activity = At least 60 minutes of running, cycling, jumping, play, sports - 3 times per week\n\n3: Vigorous activity = At least 60 minutes of running, cycling, jumping, play, sports - 5 times per week\n\n4: Daily sports/athlete = At least 60 minutes of running, cycling, jumping, play, sports - 7 times per week\n',
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
        formId: 'shreJWFrTNVXs6RKW',
        ctlabel: 'Enter the medications',
        helper:
          '"Do you currently have, or have you ever been told you have, a chronic condition? That is any condition that has been present for more than 3 months. \n\nExamples of chronic conditions are: high blood pressure, diabetes, arthritis, asthma or high cholesterol."\n\nIf you identify condition(s) please click the button and enter them.',
      },
      {
        id: 'fldCruVXj9uiYeelJ',
        name: 'Is it a Major Condition?',
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
          '"Do you have or have you ever been told you have any one of these conditions?"',
        conditionType: '',
        parentKey: 'Does the Member have a condition',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Does the Member have a condition'])) {
            return ['Yes'].some((r) =>
              values['Does the Member have a condition'].includes(r)
            )
          }
          return ['Yes'].includes(values['Does the Member have a condition'])
        },
      },
      {
        id: 'fld5dK2E5bx5jwhOH',
        name: 'Or a Minor Chronic Condition / Acute Condition?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '"How about any of these conditions?"',
        conditionType: '',
        parentKey: 'Does the Member have a condition',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Does the Member have a condition'])) {
            return ['Yes'].some((r) =>
              values['Does the Member have a condition'].includes(r)
            )
          }
          return ['Yes'].includes(values['Does the Member have a condition'])
        },
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
        required: false,
        formId: 'shreJWFrTNVXs6RKW',
        ctlabel: 'The member at risk?',
        helper:
          'Risk factors include a family history, prior abnormal readings, smoking, eating habits etc.\n\nIf the response is yes, click the button.',
      },
      {
        id: 'fldOMzmpG7FAjST25',
        name: 'Does the BN have their own machine or the ability to purchase one?',
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
          '"Do you have your own blood pressure cuff or is there one that you have regular access to?"',
        conditionType: '',
        parentKey: 'Is it a Major Condition?',
        parentValues: ['Hypertension'],
        condition: (values: any) => {
          if (Array.isArray(values['Is it a Major Condition?'])) {
            return ['Hypertension'].some((r) =>
              values['Is it a Major Condition?'].includes(r)
            )
          }
          return ['Hypertension'].includes(values['Is it a Major Condition?'])
        },
      },
      {
        id: 'fldZ0b6S9lVDWn0jP',
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
        id: 'fldirNhRzfvfb3c9B',
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
        id: 'fldvuTrj7cPT8p5i0',
        name: 'Primary Doctor',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldJqYmPM2sVpnVT6',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblsixUe3jfbOUMQP',
        required: false,
        helper: "Fill in member's primary/preferred doctor",
      },
      {
        id: 'fldONtdtp66wBVzVU',
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
        id: 'fldZEBgf4Yzb6UbfN',
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
        id: 'fldLYalbACBP9bsoW',
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
        id: 'flda8VVvM84e1KJ0w',
        name: 'What is your preferred channel of communication?',
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
          '"I want to make sure that we communicate using your preferred channel. We can do calls, WhatsApp, SMS or our favorite, the Antara App. Which would you prefer?"\n',
      },
      {
        id: 'fldJeJ56ChsLf5qoK',
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
        id: 'fldrC21jb7YhV2Y0o',
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
        id: 'fldLSPnX5CcY0S8PZ',
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
        required: false,
        helper: 'Please select the next steps to be taken after this baseline',
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
      {
        id: 'fldXbcmhzFPF09G3F',
        name: 'Did the member provide any feedback',
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
        id: 'fldGp7FlQjpQHN0z5',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldhiX15qn918jhvn',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fld41oPr7JELfjDTI',
        name: 'Other feedback',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldzMvdS4fMQy6kjm',
        name: 'Feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
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
      },
      {
        id: 'fldlfqcjNGt38FcjD',
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
        helper: '',
      },
      {
        id: 'fldTQkMCecLbkjzrR',
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
        helper: '',
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
        required: false,
        helper: '',
      },
      {
        id: 'fldavm4P5yT4PnxDd',
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
        helper:
          '"For example: have you ever been admitted to a hospital, had surgery or been given a diagnosis that required multiple visits and or treatment that lasted more than 3 months"',
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
        id: 'fldxh1i1xQsfiIUKa',
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
        id: 'fldl9UbhfySk0krAS',
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
        id: 'fld8a0pe1RBXNuX4j',
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
        id: 'fldPQ473fqLMx5Y2J',
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
        id: 'flddFn6W6HFg3rDQ7',
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
        id: 'fldkkaLIp7TljJH4H',
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
        id: 'fldcN5hWnFqjXExXw',
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
        id: 'fldsIrIhIzgFSMp25',
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
        id: 'fldEZEIMKovxeJFbT',
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
        id: 'fldOytlklZTz412rN',
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
        required: false,
        helper: '',
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
        required: true,
        helper: 'Insert a number from 0 to 5',
      },
    ],
  },
  {
    name: 'HIF Minor',
    formId: 'shrGMz8GeHIly7FWy',
    id: 'tblcQxKM1jPnH9s9d',
    fields: [
      {
        id: 'fldhgcvl4qtJ4TONA',
        name: 'Dependent',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flds6l0gDQ2lkNWOB',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldIkUD6TJqmiuNJR',
        name: 'Primary Member',
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
        id: 'fldOpLzbq42T6ZyUY',
        name: 'Relationship to Child/Dependent',
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
        id: 'fldPaIk62Cs4eOhEt',
        name: 'Other Relationship',
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
        id: 'fldH8i7R5tnwuYGxc',
        name: 'Do your child/dependent have any medication allergies?',
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
        id: 'fldrkVsqVWBf8A1cV',
        name: 'What is your child/dependent allergic to?',
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
        parentKey: 'Do your child/dependent have any medication allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Do your child/dependent have any medication allergies?']
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Do your child/dependent have any medication allergies?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Do your child/dependent have any medication allergies?']
          )
        },
      },
      {
        id: 'fld0fzMEVcCnem7hm',
        name: 'Does your child/dependent any Food allergies?',
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
        id: 'fld1uk5rpeTyd1ybM',
        name: 'What food is your child/dependent allergic to?',
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
        parentKey: 'Does your child/dependent any Food allergies?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values['Does your child/dependent any Food allergies?']
            )
          ) {
            return ['Yes'].some((r) =>
              values['Does your child/dependent any Food allergies?'].includes(
                r
              )
            )
          }
          return ['Yes'].includes(
            values['Does your child/dependent any Food allergies?']
          )
        },
      },
      {
        id: 'fldch9Jq6brKizsKv',
        name: 'Child/Dependent Past Medical History',
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
          'Please describe any past medical history here. Leave blank if no relevant information',
      },
      {
        id: 'fldE7UHzVka9e7fcK',
        name: 'Is your child/dependent currently taking any medications?',
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
        id: 'fldf6BD6nK8IHZyle',
        name: 'What medications is your child/dependent taking?',
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
        parentKey: 'Is your child/dependent currently taking any medications?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Is your child/dependent currently taking any medications?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Is your child/dependent currently taking any medications?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values['Is your child/dependent currently taking any medications?']
          )
        },
      },
      {
        id: 'fldblUcylPHjsT49n',
        name: 'Please describe any surgeries your child/dependent may have had',
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
        id: 'fldZSRgB0hHsKSneL',
        name: 'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypertension?',
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
        id: 'fld5UpHz6P01FuulN',
        name: 'FH Hypertension Description',
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
          'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypertension?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypertension?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypertension?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypertension?'
            ]
          )
        },
      },
      {
        id: 'fld1YzdaezWv5l0V4',
        name: 'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have Diabetes?',
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
        id: 'fldG5285SS7XEBtWq',
        name: 'FH Diabetes Description',
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
          'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have Diabetes?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have Diabetes?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have Diabetes?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have Diabetes?'
            ]
          )
        },
      },
      {
        id: 'fldISzBDbqBYUfQZ4',
        name: 'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?',
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
        id: 'fldshjYKRsGe7wC9K',
        name: 'FH Hypercholesterolemia Description',
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
          'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Does anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?'
            ]
          )
        },
      },
      {
        id: 'fld8lOCB8Oimdp7YL',
        name: 'Is there anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?',
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
        id: 'flds8LhOvctqAlSM4',
        name: 'FH Cardiovascular Event Description',
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
          'Is there anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'Is there anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?'
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                'Is there anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?'
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              'Is there anyone in your child/dependent immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?'
            ]
          )
        },
      },
      {
        id: 'fldO5fdowzqLW4I6t',
        name: 'Family History',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please add any other relevant family history here as well',
      },
      {
        id: 'fld8q36awYxgCCLAs',
        name: 'What type of physical activity does your child/dependent do?',
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
        id: 'fld9Bmv9pJG1nYNrD',
        name: 'Other activity description',
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
          'What type of physical activity does your child/dependent do?',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'What type of physical activity does your child/dependent do?'
              ]
            )
          ) {
            return ['Other'].some((r) =>
              values[
                'What type of physical activity does your child/dependent do?'
              ].includes(r)
            )
          }
          return ['Other'].includes(
            values[
              'What type of physical activity does your child/dependent do?'
            ]
          )
        },
      },
      {
        id: 'fld6FFQkrWhWWMJiI',
        name: 'How frequently does your child engage in this activity?',
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
        id: 'fldsVuFtNCJi4ly9O',
        name: 'If you could work on one aspect of you child/dependent health, what would it be?',
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
        id: 'fldHNQTR6RDicjH8c',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldKJH1ZVImMc4RZW',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fldLdJoyPP28KJ5sd',
        name: 'Condition',
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
          'Please enter any new or previously unregistered condition here\n\nNote that GERD includes, hyperacidity, heartburn, acid reflux and dyspepsia.',
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
        required: false,
        helper:
          'Please look for ICD10 codes here: <a href="https://icdcodelookup.com/icd-10/codes" target="_blank">https://icdcodelookup.com/icd-10/codes</a>\nand enter it in the field. Examples: I10 or E10 or E11',
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
        required: false,
        helper:
          '"I am just going to walk you through a simple questionnaire that we use to give you/your child and Asthma Score. This score is used to measure asthma control. \n\nOur goal is to get your score to be above 20. \nNo matter what it is now, we will get there!"\n\n\nPlease use this link to score the asthma condition and enter the result: <a href="https://www.asthmacontroltest.com/en-gb/welcome/" target="_blank">https://www.asthmacontroltest.com/en-gb/welcome/</a>\n\nPlease use the language in the Score Flow to guide the questions you ask. \n\nREMEMBER: If a child’s score is 12 or less, his or her asthma is likely to be very poorly controlled.',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Asthma', 'Asthma, exercise induced'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Asthma', 'Asthma, exercise induced'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Asthma', 'Asthma, exercise induced'].includes(
            values.Condition
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
        parentKey: 'Condition',
        parentValues: ['Asthma'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Asthma'].some((r) => values.Condition.includes(r))
          }
          return ['Asthma'].includes(values.Condition)
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
        required: false,
        helper:
          '"One of the worst things about Osteoarthritis is the pain it brings. On a scale of 1-10, how bad would you say the pain is, with 0 being no pain and 10 being the worst pain of your life. Please score the pain as it is before you take medicine to help with that pain."\n\nPlease score the pain of the member using this website: <a href="https://www.researchgate.net/figure/The-Universal-Pain-Assessment-Tool-UPAT-that-has-been-used-to-identify-functional-TMJ_fig1_311158988" target="_blank">https://www.researchgate.net/figure/The-Universal-Pain-Assessment-Tool-UPAT-that-has-been-used-to-identify-functional-TMJ_fig1_311158988</a>\n\nOnce you have scored it, please enter the result. \nExamples: 1 or 5 or 8\n',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: [
          'Osteoarthritis of Hip',
          'Osteoarthritis of Knee',
          'Osteoarthritis of Shoulder',
          'Osteoarthritis of spine',
          'Osteoarthritis, other',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return [
              'Osteoarthritis of Hip',
              'Osteoarthritis of Knee',
              'Osteoarthritis of Shoulder',
              'Osteoarthritis of spine',
              'Osteoarthritis, other',
            ].some((r) => values.Condition.includes(r))
          }
          return [
            'Osteoarthritis of Hip',
            'Osteoarthritis of Knee',
            'Osteoarthritis of Shoulder',
            'Osteoarthritis of spine',
            'Osteoarthritis, other',
          ].includes(values.Condition)
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
        required: false,
        helper: 'Where applicable',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Other'].some((r) => values.Condition.includes(r))
          }
          return ['Other'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nAt risk: Sys <120 and Dia <80\nElevated BP: Sys is 120-130 and Dia <80\nStage 1 Hypertension: Sys is 130-140 or Dia is 80-89\nStage 2 Hypertension: Sys >140 or Dia >=90',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hypertension', 'Hypertension, malignant'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hypertension', 'Hypertension, malignant'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Hypertension', 'Hypertension, malignant'].includes(
            values.Condition
          )
        },
      },
      {
        id: 'fldTZQp13J6facu5H',
        name: 'Starting Hypercholesterolemia stage',
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
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hypercholesterolemia'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hypercholesterolemia'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Hypercholesterolemia'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hyperlipidemia'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hyperlipidemia'].some((r) => values.Condition.includes(r))
          }
          return ['Hyperlipidemia'].includes(values.Condition)
        },
      },
      {
        id: 'fldUNR6bhbc9Z3FY8',
        name: 'Starting Hypertriglyceridemia stage',
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
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hypertriglyceridemia'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hypertriglyceridemia'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Hypertriglyceridemia'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Gastroesophageal reflux (GERD)'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Gastroesophageal reflux (GERD)'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Gastroesophageal reflux (GERD)'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '!',
        parentKey: 'Condition',
        parentValues: [
          'Allergic rhinitis',
          'Asthma',
          'Diabetes I',
          'Diabetes II',
          'Diabetes, Gestational',
          'Eczema',
          'Fibroid (leiomyoma)',
          'Gastritis',
          'Gastritis: H.pylori associated',
          'Gastroesophageal reflux (GERD)',
          'Hemorrhoids',
          'Hypercholesterolemia',
          'Hyperlipidemia',
          'Hypertension',
          'Hypertriglyceridemia',
          'Lower Back Pain',
          'Osteoarthritis of Hip',
          'Osteoarthritis of Knee',
          'Osteoarthritis of Shoulder',
          'Osteoarthritis of spine',
          'Osteoarthritis, other',
          'Overweight',
          'Varicose Veins',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return [
              'Allergic rhinitis',
              'Asthma',
              'Diabetes I',
              'Diabetes II',
              'Diabetes, Gestational',
              'Eczema',
              'Fibroid (leiomyoma)',
              'Gastritis',
              'Gastritis: H.pylori associated',
              'Gastroesophageal reflux (GERD)',
              'Hemorrhoids',
              'Hypercholesterolemia',
              'Hyperlipidemia',
              'Hypertension',
              'Hypertriglyceridemia',
              'Lower Back Pain',
              'Osteoarthritis of Hip',
              'Osteoarthritis of Knee',
              'Osteoarthritis of Shoulder',
              'Osteoarthritis of spine',
              'Osteoarthritis, other',
              'Overweight',
              'Varicose Veins',
            ].some((r) => !values.Condition.includes(r))
          }
          return ![
            'Allergic rhinitis',
            'Asthma',
            'Diabetes I',
            'Diabetes II',
            'Diabetes, Gestational',
            'Eczema',
            'Fibroid (leiomyoma)',
            'Gastritis',
            'Gastritis: H.pylori associated',
            'Gastroesophageal reflux (GERD)',
            'Hemorrhoids',
            'Hypercholesterolemia',
            'Hyperlipidemia',
            'Hypertension',
            'Hypertriglyceridemia',
            'Lower Back Pain',
            'Osteoarthritis of Hip',
            'Osteoarthritis of Knee',
            'Osteoarthritis of Shoulder',
            'Osteoarthritis of spine',
            'Osteoarthritis, other',
            'Overweight',
            'Varicose Veins',
          ].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Diabetes I'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Diabetes I'].some((r) => values.Condition.includes(r))
          }
          return ['Diabetes I'].includes(values.Condition)
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
        required: false,
        helper:
          '"Can you tell me a little bit more about your Diabetes.\nAre you taking any medications to treat your diabetes?\nAre you or have you ever taken injectable insulin to treat your diabetes?"\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)\n\nAt risk: HB1AC <5.7%\nStage 1: HB1AC > 6.5%\nStage 2: HB1AC >7.5%, FBS >7 mmol/l, only on oral meds\nStage 3: HB1AC >7.5%, FBS >7 mmol/l, on insulin\nPrediabetes: HBA1C 5.7% to 6.4% FBS >6 mmol/l, Positive impaired glucose tolerance test (RBS 7.8-11.1 mmol/l)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Diabetes II'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Diabetes II'].some((r) => values.Condition.includes(r))
          }
          return ['Diabetes II'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Diabetes, Gestational'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Diabetes, Gestational'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Diabetes, Gestational'].includes(values.Condition)
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
        required: false,
        helper:
          '"Can you please describe the impact of your varicose veins on everyday life? \nDo you have any pain?"\n\nIf NO --> MILD\n\nIf YES\n"Does the pain limit any activity? How frequently do you have pain?\nDo you have any swelling? Does the swelling ever go above the ankles? How high?\nCan you please describe your varicose veins or send me a picture of them?\nHave you ever had, or do you have ulcers "\n\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)\n\nMILD: Occasional pain not restricting activities , few veins, number of active ulcers 1, occasional edema\n\nMODERATE: Daily moderate activity limitation requiring occasional analgesia use, Multiple veins/torturous, 2 ulcers present, Occasional edema above the level of the ankles\n\nSEVERE: Extensive veins, daily pain limiting daily activities, more than 3 ulcers, edema to the level of the knee, severe cellulitis',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Varicose Veins'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Varicose Veins'].some((r) => values.Condition.includes(r))
          }
          return ['Varicose Veins'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hemorrhoids'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hemorrhoids'].some((r) => values.Condition.includes(r))
          }
          return ['Hemorrhoids'].includes(values.Condition)
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
        required: false,
        helper:
          '"How long have you been having pain for?"\n\nIf less than 4 weeks: ACUTE\n"I am sorry you are having acute back pain. Why don\'t we schedule a session with our Physiotherapist who should be able to help you with this?"\n\nIf between 4 and 12 weeks: SUB-ACUTE\n"I am sorry you are having sub-acute back pain. Why don\'t we schedule a session with our Physiotherapist who should be able to help you with this?"\n\nIf > 12 weeks: CHRONIC\n"It sounds as though this has been going on for a long time. I want to understand your back pain a bit better in order to help. I am going to take you through a few questions that will allow us to give your lower back pain a score. Then we will work together to improve that score. Part of that work will definitely involve a visit to our physical therapist, but there are other things we shall do as well!"\n\nIf more than 12 weeks, please calculate the score here: <a href="https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Lower-back-pain-calculator_sutix#_lumhe</a> \n',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Lower Back Pain'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Lower Back Pain'].some((r) => values.Condition.includes(r))
          }
          return ['Lower Back Pain'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Gastritis: H.pylori associated'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Gastritis: H.pylori associated'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Gastritis: H.pylori associated'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nAcute: < 6 weeks\nChronic > 6 weeks',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Gastritis'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Gastritis'].some((r) => values.Condition.includes(r))
          }
          return ['Gastritis'].includes(values.Condition)
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
        required: false,
        helper:
          '"Are you having any noticeable symptoms?"\nIf NOT: Asymptomatic\n\nif YES:\n"Are you having any pain associated with your menstrual period? Have you ever been anemic or had difficulty getting pregnant?"\n\nIf YES: Symptomatic\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Fibroid (leiomyoma)'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Fibroid (leiomyoma)'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Fibroid (leiomyoma)'].includes(values.Condition)
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
        required: false,
        helper:
          '"Do you have any of the following symptoms: running nose, watery eyes, itchy eyes or nose, sneezing, red eyes?\nWhen do you get these symptoms? \nIs it seasonal, meaning at different times during the year or is it more constant than that?\nIf it is more constant than that, would you say you have symptoms more or less than 4 days per week or more or less than 4 weeks per year?"\n\n\nStages:\nSEASONAL: Symptoms triggered seasonally\nINTERMITTENT: Symptoms < 4 days per week or < 4 weeks per year\nPERSISTENT: Symptoms > 4 days per week or > 4 weeks per year\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Allergic rhinitis'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Allergic rhinitis'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Allergic rhinitis'].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Eczema'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Eczema'].some((r) => values.Condition.includes(r))
          }
          return ['Eczema'].includes(values.Condition)
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
        required: false,
        helper:
          '"One of the worst things about Osteoarthritis is the pain it brings. On a scale of 1-10, how bad would you say the pain is, with 0 being no pain and 10 being the worst pain of your life. Please score the pain as it is before you take medicine to help with that pain."\n\nStarting stage should be captured at the first interaction with member (initial diagnosis)\n\nStage 1: Minor wear-and-tear in the joints. Little to no pain in the affected area\nStage 2: Pain score <3 - Mild (some morning stiffness, intermittent pain with NO quality of life impact)\nStage 3: Pain score 4-7 - Moderate (intermittent pain with impact on quality of life)\nStage 4: Pain score >8 - Severe (persistent pain with significant impact on quality of life)',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: [
          'Osteoarthritis of Hip',
          'Osteoarthritis of Knee',
          'Osteoarthritis of Shoulder',
          'Osteoarthritis of spine',
          'Osteoarthritis, other',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return [
              'Osteoarthritis of Hip',
              'Osteoarthritis of Knee',
              'Osteoarthritis of Shoulder',
              'Osteoarthritis of spine',
              'Osteoarthritis, other',
            ].some((r) => values.Condition.includes(r))
          }
          return [
            'Osteoarthritis of Hip',
            'Osteoarthritis of Knee',
            'Osteoarthritis of Shoulder',
            'Osteoarthritis of spine',
            'Osteoarthritis, other',
          ].includes(values.Condition)
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nStage 1: Score of 24-25\nStage 2: Score of 21-23\nStage 3: Score of 16-20\nStage 4: Score <15',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Asthma', 'Asthma, exercise induced'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Asthma', 'Asthma, exercise induced'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Asthma', 'Asthma, exercise induced'].includes(
            values.Condition
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
        required: false,
        helper:
          'Starting stage should be captured at the first interaction with member (initial diagnosis)\n\nStage 1: BMI 25-29.9\nStage 2: BMI 30-39.9\nStage 3: BMI >=40',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Overweight'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Overweight'].some((r) => values.Condition.includes(r))
          }
          return ['Overweight'].includes(values.Condition)
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
        required: false,
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
          'Please select the key goal\n\nif@risk: <120/80\nIf Elevated BP: <120/80\nIf Stage 1: <130/80\nIf Stage 2: <130/80',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hypertension'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hypertension'].some((r) => values.Condition.includes(r))
          }
          return ['Hypertension'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Eczema'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Eczema'].some((r) => values.Condition.includes(r))
          }
          return ['Eczema'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Asthma'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Asthma'].some((r) => values.Condition.includes(r))
          }
          return ['Asthma'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Varicose Veins'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Varicose Veins'].some((r) => values.Condition.includes(r))
          }
          return ['Varicose Veins'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Fibroid (leiomyoma)'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Fibroid (leiomyoma)'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Fibroid (leiomyoma)'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Gastroesophageal reflux (GERD)'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Gastroesophageal reflux (GERD)'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Gastroesophageal reflux (GERD)'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Allergic rhinitis'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Allergic rhinitis'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Allergic rhinitis'].includes(values.Condition)
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
        helper: 'Please select the key goal',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Hyperlipidemia'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hyperlipidemia'].some((r) => values.Condition.includes(r))
          }
          return ['Hyperlipidemia'].includes(values.Condition)
        },
      },
      {
        id: 'fldpLDncfoYZy4A86',
        name: 'Hypertriglyceridemia key goal',
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
        parentKey: 'Condition',
        parentValues: ['Hypertriglyceridemia'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hypertriglyceridemia'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Hypertriglyceridemia'].includes(values.Condition)
        },
      },
      {
        id: 'fldAHgOi8C2aymAZA',
        name: 'Hypercholesterolemia key goal',
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
        parentKey: 'Condition',
        parentValues: ['Hypercholesterolemia'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hypercholesterolemia'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Hypercholesterolemia'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Gastritis'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Gastritis'].some((r) => values.Condition.includes(r))
          }
          return ['Gastritis'].includes(values.Condition)
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
          'Please select the key goal\n\nAll stages: pain control, functional recovery',
        conditionType: '',
        parentKey: 'Condition',
        parentValues: ['Lower Back Pain'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Lower Back Pain'].some((r) => values.Condition.includes(r))
          }
          return ['Lower Back Pain'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Gastritis: H.pylori associated'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Gastritis: H.pylori associated'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Gastritis: H.pylori associated'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Diabetes I'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Diabetes I'].some((r) => values.Condition.includes(r))
          }
          return ['Diabetes I'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Diabetes II'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Diabetes II'].some((r) => values.Condition.includes(r))
          }
          return ['Diabetes II'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Diabetes, Gestational'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Diabetes, Gestational'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Diabetes, Gestational'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Hemorrhoids'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Hemorrhoids'].some((r) => values.Condition.includes(r))
          }
          return ['Hemorrhoids'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: [
          'Osteoarthritis of Hip',
          'Osteoarthritis of Knee',
          'Osteoarthritis of Shoulder',
          'Osteoarthritis of spine',
          'Osteoarthritis, other',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return [
              'Osteoarthritis of Hip',
              'Osteoarthritis of Knee',
              'Osteoarthritis of Shoulder',
              'Osteoarthritis of spine',
              'Osteoarthritis, other',
            ].some((r) => values.Condition.includes(r))
          }
          return [
            'Osteoarthritis of Hip',
            'Osteoarthritis of Knee',
            'Osteoarthritis of Shoulder',
            'Osteoarthritis of spine',
            'Osteoarthritis, other',
          ].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: ['Obesity', 'Overweight'],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return ['Obesity', 'Overweight'].some((r) =>
              values.Condition.includes(r)
            )
          }
          return ['Obesity', 'Overweight'].includes(values.Condition)
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
        parentKey: 'Condition',
        parentValues: [
          'Varicose Veins',
          'Overweight',
          'Osteoarthritis of Hip',
          'Osteoarthritis of Knee',
          'Osteoarthritis of Shoulder',
          'Osteoarthritis of spine',
          'Osteoarthritis, other',
          'Lower Back Pain',
          'Hypercholesterolemia',
          'Hyperlipidemia',
          'Hypertension',
          'Hypertriglyceridemia',
          'Hemorrhoids',
          'Gastroesophageal reflux (GERD)',
          'Gastritis',
          'Gastritis: H.pylori associated',
          'Fibroid (leiomyoma)',
          'Eczema',
          'Diabetes I',
          'Diabetes II',
          'Diabetes, Gestational',
          'Asthma',
          'Allergic rhinitis',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Condition)) {
            return [
              'Varicose Veins',
              'Overweight',
              'Osteoarthritis of Hip',
              'Osteoarthritis of Knee',
              'Osteoarthritis of Shoulder',
              'Osteoarthritis of spine',
              'Osteoarthritis, other',
              'Lower Back Pain',
              'Hypercholesterolemia',
              'Hyperlipidemia',
              'Hypertension',
              'Hypertriglyceridemia',
              'Hemorrhoids',
              'Gastroesophageal reflux (GERD)',
              'Gastritis',
              'Gastritis: H.pylori associated',
              'Fibroid (leiomyoma)',
              'Eczema',
              'Diabetes I',
              'Diabetes II',
              'Diabetes, Gestational',
              'Asthma',
              'Allergic rhinitis',
            ].some((r) => !values.Condition.includes(r))
          }
          return ![
            'Varicose Veins',
            'Overweight',
            'Osteoarthritis of Hip',
            'Osteoarthritis of Knee',
            'Osteoarthritis of Shoulder',
            'Osteoarthritis of spine',
            'Osteoarthritis, other',
            'Lower Back Pain',
            'Hypercholesterolemia',
            'Hyperlipidemia',
            'Hypertension',
            'Hypertriglyceridemia',
            'Hemorrhoids',
            'Gastroesophageal reflux (GERD)',
            'Gastritis',
            'Gastritis: H.pylori associated',
            'Fibroid (leiomyoma)',
            'Eczema',
            'Diabetes I',
            'Diabetes II',
            'Diabetes, Gestational',
            'Asthma',
            'Allergic rhinitis',
          ].includes(values.Condition)
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
        required: false,
        helper: "Fill in member's primary/preferred doctor",
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
        helper: '',
      },
      {
        id: 'fldHZ3rttK2QCw4Yg',
        name: 'Appt Type',
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
        helper: '',
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
        required: false,
        helper: 'Fill in the Facility not found in the provider base',
        parentKey: 'Facilities from Provider base',
        parentValues: ['recfQYLarLZAkH6QM'],
        condition: (values: any) => {
          if (Array.isArray(values['Facilities from Provider base'])) {
            return ['recfQYLarLZAkH6QM'].some((r) =>
              values['Facilities from Provider base'].includes(r)
            )
          }
          return ['recfQYLarLZAkH6QM'].includes(
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
        required: false,
        helper: 'Fill in the Specialist not found in the provider base',
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
        id: 'fldersOYzP3Kjx8on',
        name: 'Location (Other)',
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
        helper: '',
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
        id: 'fldteF51gn1kU7ViE',
        name: 'Consultation type',
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
        id: 'fldrg7zulDk09DaTz',
        name: 'Conditions',
        type: 'foreignKey',
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
        required: false,
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
        name: 'Dietary challenges',
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
        id: 'fld2ahqR93fsHyYuH',
        name: 'Describe dietary challenges',
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
          'Click here to book the consultation on Calendly: <a href="https://calendly.com/antara-health/nutrition-consultation" target="_blank">https://calendly.com/antara-health/nutrition-consultation</a> ',
      },
      {
        id: 'fld04NxGr5I2lLZWp',
        name: 'Did the member provide any feedback',
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
        id: 'fldw39SaE9cHEkRwZ',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldeGrfDCDxRRRCOk',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldElc2hfhHAxBRRu',
        name: 'Other feedback',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldzzeCra3jTMAQWX',
        name: 'Feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
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
        name: 'Muscle mass',
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
          'Please enter the Muscle mass identified by the device. Example: 20%, 24.20%, 32.15%, 40%\n\n(if decimals, use a . not a ,)',
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
          'Please enter the Body fat identified by the device. \nExample: 10%, 14.20%, 22.15%, 30%\n\n(if decimals, use a . not a ,)',
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
        helper: 'Please enter the Visceral fat identified by the device. ',
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
        required: true,
        formId: 'shrLf0JnXDQ7jNxOg',
        ctlabel: 'Create HMP',
        helper:
          "If the HMP record doesn't exist please create it first. Once done refresh this form to get the record.",
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
        required: true,
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
        id: 'fldrlMF8YgSS6wtba',
        name: 'Condition',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld8VuhvyzeT14NFA',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: true,
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
        id: 'fldiuzCWrbNnP7mgR',
        name: 'Inactive Status Cause',
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
          "`Paused` means Antara and/or a member temporarily stop an intervention\n'Stopped' means Antara decided to stop the intervention\n'Opted out' means a member decided to stop the intervention",
        conditionType: '',
        parentKey: 'Status',
        parentValues: ['Inactive'],
        condition: (values: any) => {
          if (Array.isArray(values.Status)) {
            return ['Inactive'].some((r) => values.Status.includes(r))
          }
          return ['Inactive'].includes(values.Status)
        },
      },
      {
        id: 'fldXLcpbyRprmR8md',
        name: 'Active Status Cause',
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
        parentKey: 'Status',
        parentValues: ['Active'],
        condition: (values: any) => {
          if (Array.isArray(values.Status)) {
            return ['Active'].some((r) => values.Status.includes(r))
          }
          return ['Active'].includes(values.Status)
        },
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
        parentKey: 'Inactive Status Cause',
        parentValues: ['Paused'],
        condition: (values: any) => {
          if (Array.isArray(values['Inactive Status Cause'])) {
            return ['Paused'].some((r) =>
              values['Inactive Status Cause'].includes(r)
            )
          }
          return ['Paused'].includes(values['Inactive Status Cause'])
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
          'Please go to this view <a href="https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM</a> to identify the MET-Min/week (total of MET-Min/week of each activity)\nExample: 500 or 550',
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
        helper: 'Calculate starting BMI using the current beneficiary weight',
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
          '0: 80-180 (At Risk)\n1: <80 (Newly dx)\n2: <100 (1st line meds)\n3: <180 (2nd line meds)',
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
          'If 0 and 1, go to level 0: 80-180 (At Risk)\nIf 2, go to level 1: <80 (Newly dx)\nIf 3, go to level 2: <100 (1st line meds)',
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
        id: 'fldkxvvwWIyL81Ob9',
        name: 'Drug Name',
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
        parentKey: 'Drug Name',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Drug Name'])) {
            return ['Other'].some((r) => values['Drug Name'].includes(r))
          }
          return ['Other'].includes(values['Drug Name'])
        },
      },
      {
        id: 'fldLTY4n4wN0YxyRB',
        name: 'Associated condition(s)',
        type: 'foreignKey',
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
        id: 'fldxjmSVjESDx9w9V',
        name: 'Prescribing facility (Providers)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldLzrEqWhTfmFvk5',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
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
        required: false,
        helper: '',
        parentKey: 'Prescribing facility (Providers)',
        parentValues: ['recE0m2e4jKISKlRM'],
        condition: (values: any) => {
          if (Array.isArray(values['Prescribing facility (Providers)'])) {
            return ['recE0m2e4jKISKlRM'].some((r) =>
              values['Prescribing facility (Providers)'].includes(r)
            )
          }
          return ['recE0m2e4jKISKlRM'].includes(
            values['Prescribing facility (Providers)']
          )
        },
      },
      {
        id: 'fldW9ZGlBPaVXDaPf',
        name: 'Refill facility (providers)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldWa5qIDmmNBxH84',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
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
        required: false,
        helper: '',
        parentKey: 'Refill facility (providers)',
        parentValues: ['recE0m2e4jKISKlRM'],
        condition: (values: any) => {
          if (Array.isArray(values['Refill facility (providers)'])) {
            return ['recE0m2e4jKISKlRM'].some((r) =>
              values['Refill facility (providers)'].includes(r)
            )
          }
          return ['recE0m2e4jKISKlRM'].includes(
            values['Refill facility (providers)']
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
    name: 'HN Tasks',
    id: 'tblfH6lD7Cd1cGgSR',
    formId: 'shrSPv5zEGvh1nm22',
    fields: [
      {
        id: 'fldlW5gNb9Pgl0CkX',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldv58MxPAfuLq0hJ',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
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
        id: 'fldcoglP551MBGulL',
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
        id: 'fldpN14ChLWa4Fgpt',
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
        id: 'fldzDRGAeR6fmNYum',
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
        id: 'fldm9Xve7yWI1vSYL',
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
        id: 'fldXclXvQtT3CDhBc',
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
        id: 'fld8h5DDipbVXqg7S',
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
        helper: 'Note: if CS task, please assign it to Effie',
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
      {
        id: 'fldrGJFYi4iUXcOX6',
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
          'Please enter the date of the next appointment. If you want to book the appointment now, please use the button in scribe dashboard',
      },
      {
        id: 'fldA5NN02OiYKW1Rh',
        name: 'Did the member provide any feedback',
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
        id: 'flduVomIICMdB9i3f',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldXwGXb69DvJn61u',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fld5emlkJkZ3NQ5xD',
        name: 'Other feedback',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldJTvYNB5iD0hYdZ',
        name: 'Feedack',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
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
        formId: 'shrSPv5zEGvh1nm22',
        ctlabel: 'Create HN Task',
        helper:
          'Please enter any additional comments or observation you think are important\n\nYou need to create a HN task? Click the button',
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
        helper: '',
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
      {
        id: 'fldmBOeE5dUb4UqCX',
        name: 'Did the member provide any feedback',
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
        id: 'fldvzIn7TfEBMVeaM',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldEzYvpaaP4mlK6R',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fld67gBGfbmRS0GDV',
        name: 'Other feedback',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldzKk9IOL3P8ZQen',
        name: 'Feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
    ],
  },
  {
    name: 'Kits',
    id: 'tbl6PAXT80XyT7mAN',
    formId: 'shrnOUMPNs7vVStMR',
    fields: [
      {
        id: 'fldw9UPlRjp4mJ5XQ',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldKFLn2QOrjWbULc',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
        helper: '',
      },
      {
        id: 'fldysITPkuGZHEFt8',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldZWQKI4VkgUeYNY',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldbjYMug1G5qLM6H',
        name: 'HMP',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldOOenkIsR5cpVbL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
        required: false,
        helper: '',
      },
      {
        id: 'fldKwEiW70RCUVc68',
        name: 'Kit Type',
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
        id: 'fldbhYcs5EhTWRQvE',
        name: 'Kit Identifier',
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
        id: 'fld1CPZj2mbNzgIbf',
        name: 'LOCATION',
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
        id: 'fldyW80I0JWRF3OrY',
        name: 'Date Kit Sent',
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
        id: 'fldt6S6dtCZLOs2w6',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldeVpsapBCwhwKPp',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: false,
        helper: '',
      },
      {
        id: 'fldX5F88lIP5XVSP9',
        name: 'Status',
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
        id: 'fldKgZ63SWsFnfXgS',
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
      {
        id: 'fldcBV8ypB5gh0tHq',
        name: 'Date Kit Returned',
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
    ],
  },
  {
    name: 'Clinical Consultation',
    id: 'tblLhL72JyizQ4ycc',
    formId: 'shrPWg4S3LYxHbgmv',
    fields: [
      {
        id: 'fldoOlTXfHynyqhfe',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld0x0OQ1U4Zkjij2',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl7Kh4tVrQp9JdUc',
        required: false,
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
        required: false,
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
        required: false,
        helper:
          'Please add the appointment record here. If you do not, the appointment will not be automatically marked as completed',
      },
      {
        id: 'fldOSLWjqjBZUDiap',
        name: 'Insurance Provider',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'This field is needed for GA Billing',
      },
      {
        id: 'fld7papvjJHJd4IIH',
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
        formId: 'shrduoUdDObJnDFTj',
        ctlabel: 'New Condition',
        helper: 'If you identify a new condition, click the',
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
        id: 'fldUY3O7pjQpY5kE6',
        name: 'What lab tests would you like to order?',
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
        parentKey: 'Type of X-Ray',
        parentValues: ['Other:'],
        condition: (values: any) => {
          if (Array.isArray(values['Type of X-Ray'])) {
            return ['Other:'].some((r) => values['Type of X-Ray'].includes(r))
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
        formId: 'shrY7UhjHNpZxNfNK',
        ctlabel: 'Medical Prescription',
        helper: 'Please click the button to write a medication prescription',
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
        id: 'fld2pp0DbbM0w3MYZ',
        name: 'Facilities',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld0dw0mF5TfKgGrp',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tbltmQuqyuKPc4Ffo',
        required: false,
        helper: '',
      },
      {
        id: 'fldUFerg5uqwxSTsV',
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
        conditionType: '',
        parentKey: 'Facilities',
        parentValues: ['recfQYLarLZAkH6QM'],
        condition: (values: any) => {
          if (Array.isArray(values.Facilities)) {
            return ['recfQYLarLZAkH6QM'].some((r) =>
              values.Facilities.includes(r)
            )
          }
          return ['recfQYLarLZAkH6QM'].includes(values.Facilities)
        },
      },
      {
        id: 'flddYAMFOOByDFwno',
        name: 'Specialists',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldrEEdZzxI2WanXI',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblsixUe3jfbOUMQP',
        required: false,
        helper: '',
      },
      {
        id: 'fldLWQ4vCT91OTXMO',
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
          '<a href="https://calendly.com/antara-health/antara-virtual-doctor-consultation?month=2021-01" target="_blank">https://calendly.com/antara-health/antara-virtual-doctor-consultation?month=2021-01</a>',
      },
      {
        id: 'fldriphoZRDX96JyD',
        name: 'Please write in any additional comments or observation you think are important.',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        formId: 'shrSPv5zEGvh1nm22',
        ctlabel: 'Create HN Task',
        helper:
          'This is the place you can write anything you want to document about the patient\n\nNeed to create a task for the HN team? Click the button',
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
      {
        id: 'fld26w0mmyxb8gDe8',
        name: 'Did the member provide any feedback',
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
        id: 'fldNpRBf9YJHwNBrv',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fld1EQKVz5FONmq9k',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldveUgSc6VYWAS5m',
        name: 'Other feedback',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldNU3bjJaTgRitq5',
        name: 'Feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
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
        id: 'fldJ1nCTavnTUwkPQ',
        name: 'HMP Status',
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
        id: 'fld6Cr5ZKnz4n4MPf',
        name: 'HMP Phase',
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
        required: false,
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
        formId: 'shrZWjIcj1g2zMA5S',
        ctlabel: 'Fill appointment form',
        helper:
          'If the appointment has been missed, you can fill a new appointment form by clicking the button',
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
        helper: '',
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
        required: false,
        helper: 'Fill in the Facility not found in the provider base',
        parentKey: 'Facilities',
        parentValues: ['recfQYLarLZAkH6QM'],
        condition: (values: any) => {
          if (Array.isArray(values.Facilities)) {
            return ['recfQYLarLZAkH6QM'].some((r) =>
              values.Facilities.includes(r)
            )
          }
          return ['recfQYLarLZAkH6QM'].includes(values.Facilities)
        },
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
        helper: '',
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
        parentValues: ['recfQYLarLZAkH6QM'],
        condition: (values: any) => {
          if (Array.isArray(values['Facility referred'])) {
            return ['recfQYLarLZAkH6QM'].some((r) =>
              values['Facility referred'].includes(r)
            )
          }
          return ['recfQYLarLZAkH6QM'].includes(values['Facility referred'])
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
        helper: '',
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
        required: false,
        helper: 'Fill in the Specialist not found in the provider base',
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
        required: false,
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
        required: false,
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
        id: 'fldB8DB7Iqcd8N35V',
        name: 'Know lab test purpose',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If the BN knows what the test was for, select, "true"',
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
        id: 'fldZi6SYMWcmp7tQs',
        name: 'Know imaging purpose',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Indicate, "true" if the BN knows why they had imaging done',
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
        id: 'fldxalPpB7900nBDE',
        name: 'Provider referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldkoxiSLYTqZFB7R',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
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
        formId: 'shrH0jDDogdH2ySWr',
        ctlabel: 'Fill in medication',
        helper: 'Click the button to fill in the medication.',
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
        required: false,
        helper:
          'Describe the BN understanding of why the medication was prescribed',
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
        required: false,
        helper:
          'Discuss with member and please indicates if the symptom(s) or the condition(s) have been progressing',
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
        id: 'fldc4yCFEefOFkHNS',
        name: 'On a scale from 1-10, how likely are you to recommend Avenue services to your friends?',
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
          'Only ask this question when the provider is related to Avenue HealthCare',
      },
      {
        id: 'flda8qzIWDXQcpjwA',
        name: 'On a scale of 0 to 10, how likely are you to recommend Antara Health to your friends and family based on today’s experience? (0=very unlikely to 10=very likely)',
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
          'Only ask this question when the provider is NOT related to Avenue HealthCare',
      },
      {
        id: 'fldBMQDwYQREqTCdA',
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
      {
        id: 'fldGAI9OffEPF1b04',
        name: 'Did the member provide any feedback',
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
        id: 'fldPrqD2SgUiUj73k',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldDEEcXQ3r2HNVuB',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldZlzqdH1fQTS6jS',
        name: 'Other',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldPPKT8galll9xi3',
        name: 'Feedback from the member',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
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
        helper: 'What is the task(s) you want to assign to the team',
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
        id: 'flduRFp9SDwo9Kr0j',
        name: 'BP Device #days',
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
          'Please enter the number of days for which the member needs to use the device. After this duration a task will be automatically created for us to go pick up the device',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['BP device delivery'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['BP device delivery'].some((r) => values.Type.includes(r))
          }
          return ['BP device delivery'].includes(values.Type)
        },
      },
      {
        id: 'fldIRPTJkY3sDciwx',
        name: 'Glucometer Device #days',
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
          'Please enter the number of days for which the member needs to use the device. After this duration a task will be automatically created for us to go pick up the device',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Glucometer delivery'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Glucometer delivery'].some((r) => values.Type.includes(r))
          }
          return ['Glucometer delivery'].includes(values.Type)
        },
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
          'Tasks will be done as soon as possible, please enter the latest possible date at which you want the task to be performed.',
      },
      {
        id: 'fldXAnmikYNI6pI1V',
        name: 'Time preference',
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
          'What is the best time range for the member? (Note that this is a general preference as we can not ensure the date of delivery) The member will be notified as soon as the date is validated by our system',
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
        id: 'fldEdaQD900vsrNnI',
        name: 'Did the member provide any feedback',
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
        id: 'fldb38MeePBlvREhy',
        name: 'Type of feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldYCH22li96FyqEq',
        name: 'What did the member provide feedback for',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
      },
      {
        id: 'fldinGuESwotaAUPQ',
        name: 'Other feedback',
        type: 'text',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Please enter the area member provided the feedback for?',
        conditionType: '',
        parentKey: 'What did the member provide feedback for',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for']
          )
        },
      },
      {
        id: 'fldaRNLf2v6wfKJ5V',
        name: 'Feedback',
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
        parentKey: 'Did the member provide any feedback',
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (Array.isArray(values['Did the member provide any feedback'])) {
            return ['Yes'].some((r) =>
              values['Did the member provide any feedback'].includes(r)
            )
          }
          return ['Yes'].includes(values['Did the member provide any feedback'])
        },
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
          'Please go to this view <a href="https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM" target="_blank">https://coda.io/d/Member-Ops-HQ_dC7z-wysRxW/Activity-METs-calculator_sudrw#_luOZM</a> to identify the MET-Min/week (total of MET-Min/week of each activity)\nExample: 500 or 550',
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
        id: 'fldSTWmhcnvKOV7Xk',
        name: 'Current Milestone Measurement',
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
          'Enter the measured milestone achievement here.\n\nSalt:\nDaily Sodium \n\nCalories (starting level will be BMI):\nWeight\n\nGlycemic Index:\n\nActivity:\nKm/week\n\nCholesterol:\nDaily cholesterol consumption\n\nAsthma:\nStage 1: Mild intermittent\nStage 2: Moderate intermittent\nStage 3: Moderate persistent\nStage 4: Severe persistent',
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
          "What was the BN's Milestone Target at LAST HMP\n\nCaloric Reduction BMI Target: \nIf Stage 1:\n1-month: 2% reduction\n3-month: 3% reduction\n6-month: 5% reduction\n\nIf Stage 2:\n1-month: 3% reduction\n3-month: 5% reduction\n6-month: 7% reduction\n\nIf Stage 3:\n1-month: 3% reduction\n3-month: 5% reduction\n6-month: 7% reduction\n\nSalt:\nLevel 0: <1500mg (Recommended for hypertensives)\nLevel 1: 1500-2500mg (Normal)\nLevel 2: 2500-3500mg (High)\nLevel 3: 3500-4500mg (Very High)\nLevel 4: >4500mg (Excessively High)\n\nGlycemic Index:\nStage 0: 80-180 (At Risk)\nStage 1: <80 (Newly dx)\nStage 2: <100 (1st line meds)\nStage 3: <180 (2nd line meds)\n\nActivity:\nLevel 1: 7-10 km per week\nLevel 2: 10-15km brisk walking per week\nLevel 3: 15-20km brisk walking per week\nLevel 4: Daily exercise/Athlete\n\nCholesterol:\nLevel [0]: <200mg (Recommended for those with heart disease)\nLevel 1: 200-300mg (Normal)\nLevel 2: 300-500mg (High)\nLevel 3: >500mg (Very High)\n\nAsthma:\nStage 1: Mild intermittent\nStage 2: Moderate intermittent\nStage 3: Moderate persistent\nStage 4: Severe persistent",
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
        formId: 'shrFefBCXsPCUxo2o',
        ctlabel: 'Fill in condition',
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
        required: false,
        helper: '',
      },
      {
        id: 'fldJzBP5nV0opdWJk',
        name: 'Inactive Status Cause',
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
          "If intervention has been completely successful or should stop for any reason and we do not need the member to continue it, please change the status below. \n\n(By entering a new status below, the Intervention status will be automatically changed in Airtable)\n\n`Paused` means Antara and/or bene temporarily stop an intervention\n'Stopped' means Antara decided to stop the intervention\n'Opted out' means beneficiary decided to stop the intervention",
        conditionType: '',
        parentKey: 'Status update',
        parentValues: ['Inactive'],
        condition: (values: any) => {
          if (Array.isArray(values['Status update'])) {
            return ['Inactive'].some((r) => values['Status update'].includes(r))
          }
          return ['Inactive'].includes(values['Status update'])
        },
      },
      {
        id: 'fldU3IQdGEUN5MuaB',
        name: 'Active Status Cause',
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
          'If intervention has been completely successful or should stop for any reason and we do not need the member to continue it, please change the status below. \n\n(By entering a new status below, the Intervention status will be automatically changed in Airtable)',
        conditionType: '',
        parentKey: 'Status update',
        parentValues: ['Active'],
        condition: (values: any) => {
          if (Array.isArray(values['Status update'])) {
            return ['Active'].some((r) => values['Status update'].includes(r))
          }
          return ['Active'].includes(values['Status update'])
        },
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
        helper: '',
        conditionType: '',
        parentKey: 'Inactive Status Cause',
        parentValues: ['Stopped'],
        condition: (values: any) => {
          if (Array.isArray(values['Inactive Status Cause'])) {
            return ['Stopped'].some((r) =>
              values['Inactive Status Cause'].includes(r)
            )
          }
          return ['Stopped'].includes(values['Inactive Status Cause'])
        },
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
        required: false,
        helper: 'Please enter the reason why the status changed',
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
          'Since you have stopped the intervention, please enter here if it has been successful or not.',
        conditionType: '',
        parentKey: 'Status update',
        parentValues: ['Inactive'],
        condition: (values: any) => {
          if (Array.isArray(values['Status update'])) {
            return ['Inactive'].some((r) => values['Status update'].includes(r))
          }
          return ['Inactive'].includes(values['Status update'])
        },
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
          'Optional unless you want to change the current milestone\n\nIf Stage 1:\n1-month: 1% reduction\n3-month: 2% reduction\n6-month: 2% reduction\n \nIf Stage 2:\n1-month: 2% reduction\n3-month: 2% reduction\n6-month: 3% reduction\n\nIf Stage 3:\n1-month: 2% reduction\n3-month: 3% reduction\n6-month: 5% reduction',
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
        id: 'fldcvaP9Z8Lug3oFK',
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
        id: 'fldIiXuUXZ2jkZ7p4',
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
        id: 'fld5GcH5Wf1xgMlw5',
        name: 'Update Hypercholesterolemia stage',
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
        parentValues: ['Hypercholesterolemia'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hypercholesterolemia'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hypercholesterolemia'].includes(values['Condition type'])
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
        required: false,
        helper: '',
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
        id: 'fldKb7GRejVgRPD4m',
        name: 'Update Hypertriglyceridemia stage',
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
        parentValues: ['Hypertriglyceridemia'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hypertriglyceridemia'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hypertriglyceridemia'].includes(values['Condition type'])
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
        required: false,
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
        id: 'fldkxvvwWIyL81Ob9',
        name: 'Drug Name',
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
        parentKey: 'Drug Name',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Drug Name'])) {
            return ['Other'].some((r) => values['Drug Name'].includes(r))
          }
          return ['Other'].includes(values['Drug Name'])
        },
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
        required: false,
        helper: '',
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
        relationship: 'many',
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
        required: false,
        helper:
          'Fill in the Prescribing Facility not found in the provider base',
        parentKey: 'Prescribing facility from Provider base',
        parentValues: ['recfQYLarLZAkH6QM'],
        condition: (values: any) => {
          if (
            Array.isArray(values['Prescribing facility from Provider base'])
          ) {
            return ['recfQYLarLZAkH6QM'].some((r) =>
              values['Prescribing facility from Provider base'].includes(r)
            )
          }
          return ['recfQYLarLZAkH6QM'].includes(
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
        relationship: 'many',
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
        required: false,
        helper: 'Fill in the Refill Facility not found in the provider base',
        parentKey: 'Refill facility from Provider base',
        parentValues: ['recfQYLarLZAkH6QM'],
        condition: (values: any) => {
          if (Array.isArray(values['Refill facility from Provider base'])) {
            return ['recfQYLarLZAkH6QM'].some((r) =>
              values['Refill facility from Provider base'].includes(r)
            )
          }
          return ['recfQYLarLZAkH6QM'].includes(
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
        helper: '',
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
        required: false,
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
        required: false,
        helper: '',
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
        required: true,
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
        type: 'multiCollaborator',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please tag the staff member who was in charge of the member or who was linked to the incident',
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
        required: false,
        helper:
          'Give details of what action you took to escalate/resolve the incident',
      },
      {
        id: 'fldfC6UCq1iYykhlj',
        name: 'Next steps',
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
          'Details any follow up taken/needs to be taken to fully resolve the issue',
      },
      {
        id: 'fld9TCBIF50hq2wFp',
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
        id: 'healthnavigator',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: '',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
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
        type: 'select',
        format: '',
        isDateTime: false,
        options: [
          'Virtual Consultation Required',
          'Flag for Review',
          'MHC',
          'Nutritional Consultation',
          'Physio Consultation',
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
        id: 'mhcReferralNotes',
        name: 'Notes for MHC',
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
        id: 'pcReferralNotes',
        name: 'Notes for Physio Consultation',
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
        parentValues: ['Physio Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Physio Consultation'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Physio Consultation'].includes(values['Next Steps'])
        },
      },
      {
        id: 'pcReferralReasons',
        name: 'Reasons for Referral',
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
        parentValues: ['Physio Consultation'],
        condition: (values: any) => {
          if (Array.isArray(values['Next Steps'])) {
            return ['Physio Consultation'].some((r) =>
              values['Next Steps'].includes(r)
            )
          }
          return ['Physio Consultation'].includes(values['Next Steps'])
        },
      },
      {
        id: 'feedback',
        name: 'Did the member provide any feedback?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: ['Yes', 'No'],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'typeOfFeedback',
        name: 'Type of feedback',
        type: 'select',
        format: '',
        isDateTime: false,
        options: ['Positive', 'Negative'],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
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
        id: 'reasonForFeedback',
        name: 'What did the member provide feedback for?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: [
          'Provider',
          'Mobile App',
          'Query on Antara Services',
          'Appointment Scheduling/Rescheduling',
          'Communication',
          'Antara Services (Health Navigation/Specialists/Delivery)',
          'Antara Staff (Health Navigator/Specialists/Delivery)',
          'Antara Values (Timeliness, Responsiveness, Accuracy)',
          'Others',
        ],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
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
        id: 'otherFeedback',
        name: 'Other',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'Please enter the area member provided the feedback for',
        conditionType: '',
        parentKey: 'What did the member provide feedback for?',
        parentValues: ['Others'],
        condition: (values: any) => {
          if (
            Array.isArray(values['What did the member provide feedback for?'])
          ) {
            return ['Others'].some((r) =>
              values['What did the member provide feedback for?'].includes(r)
            )
          }
          return ['Others'].includes(
            values['What did the member provide feedback for?']
          )
        },
      },
      {
        id: 'feedbackFromMember',
        name: 'Feedback',
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
    ],
  },
]

const StagingSchema = [
  {
    name: 'Appointments',
    id: 'tblxflDbHI5TGqra5',
    fields: [
      {
        id: 'fld5smgdxaNGjFl1P',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldUAD8DgmVoS9gvY',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fld3F5cL5oTFIsqk3',
        name: 'Health Navigator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldGEg7nQfr1V3o0Q',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblf6noUXSKCzG2Ze',
        required: true,
        helper: '',
      },
      {
        id: 'fldfDk6QLf0MBTjaS',
        name: 'Appt Type',
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
        id: 'fld3x0MzCwooOc1A6',
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
        helper: '',
      },
      {
        id: 'fldLwFGc4Mw46k6I5',
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
        id: 'fldJ88BmfLBEDlgh5',
        name: 'Providers',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldGfOttut3SPqnHL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblm1g2udT6J8TOzt',
        required: false,
        helper: '',
      },
      {
        id: 'fldM5JtlRk1GiUnAZ',
        name: 'Location (Other)',
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
        id: 'fldoZeTpR7miSrxfr',
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
        id: 'fld3M7bZ2TJNtlB3Y',
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
        required: true,
        helper:
          'If the HMP record doesn\'t exist please create it first. \nUse this <a href="https://airtable.com/shrLf0JnXDQ7jNxOg" target="_blank">https://airtable.com/shrLf0JnXDQ7jNxOg</a> form to enter the HMP. Once done refresh this form to get the record.',
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
        name: 'Muscle mass',
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
          'Please enter the Muscle mass identified by the device. Example: 20%, 24.20%, 32.15%, 40%\n\n(if decimals, use a . not a ,)',
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
          'Please enter the Body fat identified by the device. \nExample: 10%, 14.20%, 22.15%, 30%\n\n(if decimals, use a . not a ,)',
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
        helper: 'Please enter the Visceral fat identified by the device. ',
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
        id: 'fldSbMaTedwH7o3nL',
        name: 'Drug Name',
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
        id: 'fldSbMaTedwH7o3nL',
        name: 'Drug Name',
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
        parentKey: 'Drug Name',
        parentValues: ['Other'],
        condition: (values: any) => {
          if (Array.isArray(values['Drug Name'])) {
            return ['Other'].some((r) => values['Drug Name'].includes(r))
          }
          return ['Other'].includes(values['Drug Name'])
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
        id: 'fld5XDxiB9QzwwLlx',
        name: 'Prescribing facility (Providers)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldjdIjNeMRbl2KwH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblm1g2udT6J8TOzt',
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
        required: false,
        helper: '',
      },
      {
        id: 'flduNglITk8RW0p1R',
        name: 'Refill facility (providers)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'flduOm55VRkJAUWkG',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblm1g2udT6J8TOzt',
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
        required: false,
        helper: '',
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
        required: false,
        helper: '',
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
          'If the appointment has been missed, you can fill a new appointment form here: <a href="https://airtable.com/shrZWjIcj1g2zMA5S" target="_blank">https://airtable.com/shrZWjIcj1g2zMA5S</a>',
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
        id: 'fld9ZY9LDxYuKahYj',
        name: 'Provider',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld2Ce1xT9nwUvWdE',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblm1g2udT6J8TOzt',
        required: false,
        helper: 'Where the appointment happened',
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
        id: 'fld2NHCZvDXgvK2ce',
        name: 'Other provider',
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
        id: 'fld9MUgu0Va97aihx',
        name: 'Know lab test purpose',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'If the BN knows what the test was for, select, "true"',
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
        id: 'fldxWnxl4raiouI24',
        name: 'Know imaging purpose',
        type: 'select',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Indicate, "true" if the BN knows why they had imaging done',
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
        helper: 'Indicate, "true" if the BN was referred',
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
        id: 'fld5OCuMTC7WZKQPg',
        name: 'Provider referred',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldS2OXf3tRmY2Qjt',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblm1g2udT6J8TOzt',
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
        id: 'fld0E725yORxnVN7B',
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
        conditionType: '',
        parentKey: 'Provider referred',
        parentValues: [],
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
        id: 'fldKIPh2WJdKEHWZu',
        name: 'On a scale from 1-10, how likely are you to recommend Avenue services to your friends?',
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
          'Only ask this question when the provider is related to Avenue HealthCare',
      },
      {
        id: 'fldIMHe5e8VMbMyIc',
        name: 'On a scale from 1-10, how likely are you to recommend the services to your friends?',
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
          'Only ask this question when the provider is NOT related to Avenue HealthCare',
      },
      {
        id: 'fld9q7iTglPApgRpc',
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
    id: 'tblh2rdeVCvM2qFBt',
    fields: [
      {
        id: 'fldv99UGw0QQ4wwAX',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldBHAcVYSIKPH4sp',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldRpjVcns4VoewQ0',
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
        id: 'fldB7S3PBeGePacdh',
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
        id: 'fldoPciXs5k3loaFX',
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
        id: 'fld1SWKoySZgTuaug',
        name: 'Consultation type',
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
        id: 'fldDt7fIfR0vFrAPy',
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
        id: 'fldFQEVNIQGPaZG3f',
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
        id: 'fldzg9Omd2bbRPmaT',
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
        id: 'fldckR7PWNAH6NGlO',
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
        id: 'fldMVPPlLlKvoielu',
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
        id: 'fldu7YjgkmW1oj59n',
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
        id: 'fldXv7JoFCTpbeJ4D',
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
        id: 'flduvTsRl3UgAkIfO',
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
        id: 'fldcHeYg5oJE6HWRb',
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
        id: 'fldUTFtkwZttuR71N',
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
        id: 'fldA9UAATDag1aiGF',
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
        id: 'fldshSHAUlXiPAI3c',
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
        id: 'fldrKNPGQUREm049i',
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
        id: 'fldoi8HzyDfvvi81e',
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
        id: 'fldGzVk5wxc0OQFFv',
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
        id: 'fldm6yi770BOUVOAR',
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
        id: 'fldp2NAkM3yYazEVY',
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
        id: 'fldOs2a5VWlIbo8ks',
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
        id: 'fldP5IcnQs7MYwPLn',
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
        id: 'fldZEJVOvVnKHlOw3',
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
        id: 'fldEv3Q8bwLFY0CVB',
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
        id: 'fldGWLeuKLs5hQp1O',
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
        id: 'fldXJRa3baEgMFlZF',
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
        id: 'fldLy2tLxLFrQ79jC',
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
        id: 'fldjsfIqbr6cNbzmp',
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
        id: 'fldhM8MbUmR7ySEjC',
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
        id: 'fldKp8fieyPYwRcxC',
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
        id: 'fldZ1Cn9kIMBT8wPs',
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
        id: 'fldmUNZnhMU4AI7Mq',
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
        id: 'fldUOcW6V1rWorcPn',
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
        id: 'fldVvbx8aHJ9JEjFs',
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
        id: 'fldHxGGanGM5WWVaZ',
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
        id: 'fldB6jgVM8hDbSZI4',
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
        id: 'fldY5VJaxbcw7382E',
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
        id: 'fld2xyFuJTHuqnRRd',
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
        id: 'fldkvDy85qGEiXlSf',
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
        id: 'fldjtB0t3fcAF4ej8',
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
        id: 'fldfIQuww5cUmzbGJ',
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
        id: 'fldHsTxV14FA65qhQ',
        name: 'Dietary challenges',
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
        id: 'fldAOy5erydoGVdGj',
        name: 'Describe dietary challenges',
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
        id: 'fldwPNCZq5tqPwqkS',
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
        id: 'fld6Bxq0sWKugpdGk',
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
        id: 'fldIfVdTln663nVD0',
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
          'Click here to book the consultation on Calendly: <a href="https://calendly.com/antara-health/nutrition-consultation" target="_blank">https://calendly.com/antara-health/nutrition-consultation</a> ',
      },
      {
        id: 'fldb7m7CM4PbjBKjs',
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
      {
        id: 'fldh7UVRqcAFBRTE2',
        name: 'Relevant for CSAT?',
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
    id: 'tblh0Fv3an0rkvJlS',
    fields: [
      {
        id: 'fldfduM3lFPGUpNxA',
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
        id: 'fldtNR1QbbieJe5n4',
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
        id: 'fldNP8fER4byB8ZrX',
        name: 'Members',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldAIyk4VBMO2Miwg',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: false,
        helper:
          'Please insert the member if the task concerns a specific member',
        conditionType: '',
        parentKey: 'Type',
        parentValues: [
          'Admin task',
          'Blood Pressure measurement',
          'BP device delivery',
          'BP device pick up',
          'Card delivery',
          'Glucometer delivery',
          'Glucometer pick up',
          'HB1AC measurement',
          'Height measurement',
          'Lipid panel measurement',
          'Medication delivery',
          'Other',
          'Oxygen saturation measurement',
          'Random Blood sugar measurement',
          'Temperature measurement',
          'Weight measurement',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return [
              'Admin task',
              'Blood Pressure measurement',
              'BP device delivery',
              'BP device pick up',
              'Card delivery',
              'Glucometer delivery',
              'Glucometer pick up',
              'HB1AC measurement',
              'Height measurement',
              'Lipid panel measurement',
              'Medication delivery',
              'Other',
              'Oxygen saturation measurement',
              'Random Blood sugar measurement',
              'Temperature measurement',
              'Weight measurement',
            ].some((r) => values.Type.includes(r))
          }
          return [
            'Admin task',
            'Blood Pressure measurement',
            'BP device delivery',
            'BP device pick up',
            'Card delivery',
            'Glucometer delivery',
            'Glucometer pick up',
            'HB1AC measurement',
            'Height measurement',
            'Lipid panel measurement',
            'Medication delivery',
            'Other',
            'Oxygen saturation measurement',
            'Random Blood sugar measurement',
            'Temperature measurement',
            'Weight measurement',
          ].includes(values.Type)
        },
      },
      {
        id: 'fldHFYNiBhhb7Nk62',
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
        id: 'fldiOovDdrlcaoCfm',
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
        id: 'fldAK85WcaNhW974o',
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
        id: 'fldyPu1Qlrb2fQELU',
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
        id: 'fld6LltXPc83nmXza',
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
        id: 'flddW0agsqAZi7mFv',
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
        id: 'fldXX5LCCZDGqQkNo',
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
        id: 'fldRUpYJAJ3P3Pycj',
        name: 'Creator',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldG4FH180lDhx7jt',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblf6noUXSKCzG2Ze',
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
        condition: (values) => {
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
        condition: (values) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Lower back pain'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Lower back pain'].includes(values['Condition type'])
        },
      },
      {
        id: 'fldDktmseKZtf9AIH',
        name: 'Update Hypercholesterolemia stage',
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
        parentValues: ['Hypercholesterolemia'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hypercholesterolemia'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hypercholesterolemia'].includes(values['Condition type'])
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
        helper: '',
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
        id: 'fldiPolewOTcQcSgY',
        name: 'Update Hypertriglyceridemia stage',
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
        parentValues: ['Hypertriglyceridemia'],
        condition: (values: any) => {
          if (Array.isArray(values['Condition type'])) {
            return ['Hypertriglyceridemia'].some((r) =>
              values['Condition type'].includes(r)
            )
          }
          return ['Hypertriglyceridemia'].includes(values['Condition type'])
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
        id: 'fldsSRHtAe7rcqHhU',
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
        id: 'fldGOaoZw32Ookxz2',
        name: 'We’d like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):',
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
          'We’d like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):',
        parentValues: ['“Another reason"'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                'We’d like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):'
              ]
            )
          ) {
            return ['“Another reason"'].some((r) =>
              values[
                'We’d like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):'
              ].includes(r)
            )
          }
          return ['“Another reason"'].includes(
            values[
              'We’d like to better understand the reasons why you want to be healthier. This will help us better support you. Here are some common options; please choose up to two (2):'
            ]
          )
        },
      },
      {
        id: 'fldU6euNxqscPMXta',
        name: 'We’d like to learn more about how you approach a challenge or problem in your life.',
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
          'We’ve learned that some people like to take things head-on right from the start, with all their energy. Others tend to prefer a slow and steady approach and don’t like to take everything on all at once. With that in mind, which of the following best describes you:',
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
    id: 'tblkoNkzLmWsAlWs5',
    fields: [
      {
        id: 'fldL4LobyjPPozW6v',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fld0COqr7zfDpYsVu',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblQRToQAT8BRlLHW',
        required: true,
        helper: '',
      },
      {
        id: 'fldNgqV7D8RZeB4HL',
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
        id: 'fld2AvxBl39RyRuIB',
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
        id: 'fldhFEhgs0lPTTz1s',
        name: 'HMP Status',
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
        id: 'fldEgIKm2Sx0mr11R',
        name: 'HMP Phase',
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
        id: 'fldmsv2H0XP1bMann',
        name: 'Monitoring Kits',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: [],
        symmetricColumnId: 'fldJXfrRywE1p81ij',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblEtRCgqvVuSuBMp',
        required: false,
        helper: '',
      },
      {
        id: 'fldCGLU2KP0LvMra9',
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
]
export default process.env.PROD ? ProductionSchema : StagingSchema
