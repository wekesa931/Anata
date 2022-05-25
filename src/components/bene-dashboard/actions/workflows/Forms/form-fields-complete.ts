export default [
  {
    name: 'Baseline',
    id: 'tblyEGCkIMjscYtYj',
    fields: [
      {
        id: 'fldlQCZgIW3papD5A',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selska4alBMR57z2R',
              name: 'Female',
            },
            {
              id: 'seleUkv9Y481CqJl0',
              name: 'Male',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selvwB6rscawvczET',
              name: 'No',
            },
            {
              id: 'selicq5Qxe5AlYZMY',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel5CwdDZOiyzKnR8',
              name: 'In-person',
            },
            {
              id: 'selN3WB7GVX4yrQPP',
              name: 'Virtual',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'seluyc6MiqHkC93I4',
              name: 'Fully vaccinated',
            },
            {
              id: 'selZFDFEEI9pVRPTx',
              name: 'Partially vaccinated',
            },
            {
              id: 'selBXp7Ep1ZiWEnTC',
              name: 'Unknown',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Could you please upload, [child\'s name] KEPI vaccination card?\nIf you don\'t have it handy, do you know whether the vaccines are up to date?"\n\nVaccination Schedule: Click here to see the KEPI vaccination schedule (<a href="http://www.vacfa.uct.ac.za/sites/default/files/image_tool/images/210/Immunization_Schedules/Kenya.pdf)" target="_blank">http://www.vacfa.uct.ac.za/sites/default/files/image_tool/images/210/Immunization_Schedules/Kenya.pdf)</a>',
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel13NBOY27LPRKy0',
              name: 'Developmentally Appropriate',
            },
            {
              id: 'selBR7uXozSXLMuWY',
              name: 'Developmentally Delayed',
            },
            {
              id: 'selNkkTjV83jQ6YjG',
              name: 'Other',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"We are just going to ask a few questions about, [child\'s name] development to check on his/her developmental progress"\n\n[Click on the link below to open the CDC developmental milestones table.\nIf any abnormality is identified, DO NOT, say anything to the parent just yet. Continue the baseline and then make sure that a consultation with a VC is made.]\n\n[Click here to see a table of normal pediatric development: <a href="https://www.cdc.gov/ncbddd/actearly/pdf/checklists/Checklists-with-Tips_Reader_508.pdf]" target="_blank">https://www.cdc.gov/ncbddd/actearly/pdf/checklists/Checklists-with-Tips_Reader_508.pdf]</a>\n',
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selpE29fUY52tNXMa',
              name: 'In school',
            },
            {
              id: 'sel5G07MuPVJOPFug',
              name: 'Out of school',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Do you know how tall you are? Even if you have a vague memory of your height in Meters, let us know."\n\n(m) examples: 1.5 or 1.8 or 1.55\n(If member has already given this information during screening or PSPB or HIF phase and if you can see it on Vitals section on Scribe, please skip this step)\n\nYou need to enter vitals? go here: <a href="https://airtable.com/shr0VkCzeprnRSIhA" target="_blank">https://airtable.com/shr0VkCzeprnRSIhA</a>',
      },
      {
        id: 'fldAeTRV1wNUXYLkj',
        name: 'Weight (kg)',
        type: 'number',
        format: 'decimal',
        isDateTime: false,
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Have you ever taken or had someone else take your Blood Pressure? If so, do you remember the last BP reading you had"\n\n(mm/Hg)\nBetter to create a BP intake here: <a href="https://airtable.com/shrJo1OLcSNVTTA0w" target="_blank">https://airtable.com/shrJo1OLcSNVTTA0w</a>',
      },
      {
        id: 'fldMBunVl8Fvmy8JB',
        name: 'Diastolic Blood Pressure (mmHg)',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '(mm/Hg)\nBetter to create a BP intake here: <a href="https://airtable.com/shrJo1OLcSNVTTA0w" target="_blank">https://airtable.com/shrJo1OLcSNVTTA0w</a>',
      },
      {
        id: 'fld3GQgj3l991L0sp',
        name: 'Please select the system(s) with a relevant finding',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'sel3IsbRA2fTsH2xi',
              name: 'Cardiovascular ',
            },
            {
              id: 'sellVhIbFCF3E2SNG',
              name: 'Dermatologic',
            },
            {
              id: 'selOqiMa8FsbmaHDc',
              name: 'Endocrine',
            },
            {
              id: 'seldzJ4omZdlbdXbN',
              name: 'Extremities ',
            },
            {
              id: 'sel5dEEgrNWjd8ECk',
              name: 'Gastrointestinal',
            },
            {
              id: 'selukarGvyrozxsM5',
              name: 'Genitourinary ',
            },
            {
              id: 'selUlrqEi7krczy2S',
              name: 'HEENT',
            },
            {
              id: 'selDKeBjsW2K7X4yp',
              name: 'Hematologic',
            },
            {
              id: 'selu5CaxoFovvlY9V',
              name: 'Immunologic',
            },
            {
              id: 'selR0S9kn4ykc0AsW',
              name: 'Mental Health',
            },
            {
              id: 'selgKW3j0NK5S8fmD',
              name: 'Musculoskeletal',
            },
            {
              id: 'sel7AVl30CK494kZt',
              name: 'Neoplastic',
            },
            {
              id: 'selEHN2uUjflbbDS4',
              name: 'Neurologic',
            },
            {
              id: 'selDkvqjHdxFNyPZF',
              name: 'None',
            },
            {
              id: 'sel5xn8fNgBCq3jBl',
              name: 'Pulmonary ',
            },
            {
              id: 'selHEI6nWJVV9ED7Z',
              name: 'Reproductive',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        id: 'fld71JnItn0CF4WfM',
        name: 'ROS: Please describe the CARDIOVASCULAR findings',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selOURTFttBUFNGbd',
              name: 'No',
            },
            {
              id: 'selkzd4Vs5thbzy7o',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel5ALkckH2SysPLV',
              name: 'No',
            },
            {
              id: 'seljo7tth2ZV6cJXN',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selHctlXs63izv5Fd',
              name: 'Exam not possible',
            },
            {
              id: 'selkuWHi5p7SReeUs',
              name: 'No relevant exam finding',
            },
            {
              id: 'seleaJfeEKJveDMqO',
              name: 'Relevant Exam findings',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel5TJEUcfxCuGnUS',
              name: 'Abdominal',
            },
            {
              id: 'selqwDXjtzFlk3Xdz',
              name: 'Cardiovascular',
            },
            {
              id: 'selT6L7FJyF0z0aBF',
              name: 'Dermatologic',
            },
            {
              id: 'selm2zhIjNIDGpG89',
              name: 'Extremities',
            },
            {
              id: 'selR6jpRTLUAwL8jh',
              name: 'GU',
            },
            {
              id: 'selvQjuvLKMHvV0b9',
              name: 'Neck',
            },
            {
              id: 'selK94lEACSEiDRnF',
              name: 'Neurologic',
            },
            {
              id: 'selWzDjoLrNUMgnbd',
              name: 'Other',
            },
            {
              id: 'selTeWgQJZqzdoo4K',
              name: 'Pulmonary',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selHUK2qwQGLkYOFf',
              name: 'No',
            },
            {
              id: 'selO1SPKWGD9o81v3',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selXvwJwJqM74xKNg',
              name: 'False',
            },
            {
              id: 'selkg55xXRYRyjNBy',
              name: 'True',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selzrkDAVkoHBuGmu',
              name: 'No',
            },
            {
              id: 'sel0RT9uoUKr1uUML',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selZUuna47SRddZkh',
              name: '0',
            },
            {
              id: 'selLnDWzNnBDIGFod',
              name: '1',
            },
            {
              id: 'sel4YToJ6ihy29zgW',
              name: '2',
            },
            {
              id: 'selbkUWREc8kQa1n4',
              name: '3',
            },
            {
              id: 'selfzZteFgAxapeme',
              name: '4',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selXSykiKHsdDovqG',
              name: 'Alcohol',
            },
            {
              id: 'selGimEXLlbZGyHEm',
              name: 'None',
            },
            {
              id: 'selVuWRyMyavxVJEF',
              name: 'Recreational drugs',
            },
            {
              id: 'sel5QStfi5xME1onC',
              name: 'Tobacco',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selCx0r4u4jhaRSfw',
              name: 'No',
            },
            {
              id: 'selY2U6jXDdhYQSEj',
              name: 'Yes',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          '"Do you currently have, or have you ever been told you have, a chronic condition? That is any condition that has been present for more than 3 months. \n\nExamples of chronic conditions are: high blood pressure, diabetes, arthritis, asthma or high cholesterol."\n\nIf you identify condition(s) please enter them here: <a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a>',
      },
      {
        id: 'fldCruVXj9uiYeelJ',
        name: 'Is it a Major Condition?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selojxN3tIMA7zMnR',
              name: 'Asthma',
            },
            {
              id: 'selZYCQTd7OB8qubv',
              name: 'Cancer',
            },
            {
              id: 'selD9lGuWQx7RHHY0',
              name: 'Diabetes',
            },
            {
              id: 'selrim8w2DFDqFqBa',
              name: 'Hypercholesterolemia',
            },
            {
              id: 'selJ4rkIWxvA8iHLG',
              name: 'Hypertension',
            },
            {
              id: 'sell3QMettfNlSKEh',
              name: 'None of the above',
            },
            {
              id: 'selvvAXFF85XCHgGB',
              name: 'Osteoarthritis',
            },
            {
              id: 'selaTeXmL4FkbvKGu',
              name: 'Other Diagnosis',
            },
            {
              id: 'selinyQoHoM8D12NT',
              name: 'Overweight',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selAjzRIEWvY4RrEY',
              name: 'Eczema',
            },
            {
              id: 'selWsC4I6zRb315YH',
              name: 'Gastritis',
            },
            {
              id: 'selCPMiz7GCQIrVaZ',
              name: 'Gout',
            },
            {
              id: 'sel7W8gSbOqggPI0v',
              name: 'Mental Health',
            },
            {
              id: 'selNDVEX0YMhFkzoa',
              name: 'Other',
            },
            {
              id: 'sel9kAu884jrrOhf2',
              name: 'Pregnancy',
            },
            {
              id: 'selvAcGQNQ2X3UABl',
              name: 'Substance Abuse',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selQ7SUe2Ljq09U2Z',
              name: 'no',
            },
            {
              id: 'selu1135br8q1Gczq',
              name: 'yes',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Risk factors include a family history, prior abnormal readings, smoking, eating habits etc.\n\nIf the response is yes, click here: \n<a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a> ',
      },
      {
        id: 'fldOMzmpG7FAjST25',
        name: 'Does the BN have their own machine or the ability to purchase one?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'sel84Xane6gDPj7mu',
              name: 'No',
            },
            {
              id: 'selZ2RznwR1y4jkIL',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selbko2L0W7RxJSNH',
              name: 'Clearer skin',
            },
            {
              id: 'selhmXlPRKecF7r8L',
              name: 'Eating healthy',
            },
            {
              id: 'selkd7yJ0uAC4f2AF',
              name: 'Getting fit',
            },
            {
              id: 'sely5dxHw7hFOCkYx',
              name: 'Healthy sex life',
            },
            {
              id: 'seljrC5bxWfh4j3Kx',
              name: 'Managing your stress',
            },
            {
              id: 'selNV5Ib7CIyZWmBK',
              name: 'Sleeping well',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'IF NOT PRE-FILLED:\n"Have you ever thought about personal health goals? \nDo you have any?\nIs there any aspect of your health that you’d like to work on or work towards?  \nIt’s okay if you don’t have an answer right now. If something comes to mind, you can always reach out to me and we can talk about how I can help."\n\nIF PRE-FILLED:\n"It is great that you want to work on [insert health goal]. \nHave you already started to work towards, [insert health goal]?\nWere you able to achieve the goal? \nWhat was it like trying to reach that goal?"\n\nIF SUCCEEDED: \n"Do you have any new goals you would like to achieve now?\nWonderful, let’s work together on that"\n\nIF FAILED:\n"Would you like to keep trying with my support?"\n\nIf it is a nutritional goal, tell the member you will set up an appointment with the nutritionist.\nIf fitness, sell the virtues of the Nike app if non-gym type. If gym type, find out what they would like to achieve and walk them through how you will support them to achieve the goal. ',
      },
      {
        id: 'fldWh4JG8vCTeqWVd',
        name: 'Mental Health Phase',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selMDdFpJTdW9CM8u',
              name: 'Newly diagnosed',
            },
            {
              id: 'selHabbASCf7YZ67w',
              name: 'Pre-existing',
            },
          ],
        },
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
        id: 'fldZEBgf4Yzb6UbfN',
        name: 'Does the beneficiary require Ancillary services?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selSeFBbMFW5YArOR',
              name: 'No',
            },
            {
              id: 'seltBwrkfdraDPV75',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seleXjvan3EnLrwd9',
              name: 'Dental Appointment',
            },
            {
              id: 'selFET2ALrSECp9li',
              name: 'Fitness training',
            },
            {
              id: 'selODTJUunR1BEtoC',
              name: 'Mental health Appointment',
            },
            {
              id: 'selToXoC9MJ08MttV',
              name: 'Nutritional Appointment',
            },
            {
              id: 'selG4yfhUoImBQluE',
              name: 'Optician Appointment',
            },
            {
              id: 'selM4CIm63g3qOKDs',
              name: 'Physical Therapy Appointment',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selLq7p8unLiuh05s',
              name: 'Email',
            },
            {
              id: 'selLRXRorJWHZ1twK',
              name: 'Other',
            },
            {
              id: 'sel2t5iHdPb9LIG11',
              name: 'SMS',
            },
            {
              id: 'selgvCkFN4y1gPVsK',
              name: 'Smartphone Application',
            },
            {
              id: 'selMDApQcMNdqmi4i',
              name: 'Voice Call',
            },
            {
              id: 'selow4pXvoJPoSdg0',
              name: 'Whatsapp',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selg1NQybBPimsVh5',
              name: 'Email',
            },
            {
              id: 'selwmiRwVWkDiQTXk',
              name: 'Other',
            },
            {
              id: 'selixhFdTLCzXAei0',
              name: 'SMS',
            },
            {
              id: 'selTuPGA4zJVShlPM',
              name: 'Smartphone Application',
            },
            {
              id: 'sell1UkNPc2ERSnDl',
              name: 'Voice Call',
            },
            {
              id: 'selow4pXvoJPoSdg0',
              name: 'Whatsapp',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel42Ekczo7l4ERb8',
              name: 'Bi-monthly',
            },
            {
              id: 'selEkneHEThGY3Ej0',
              name: 'Daily',
            },
            {
              id: 'sel6idhNrOCSJujTX',
              name: 'Monthly',
            },
            {
              id: 'selAFJBS5xFeve2Fq',
              name: 'Never',
            },
            {
              id: 'selfEsvZ1jQOun5Jk',
              name: 'Only when something comes up',
            },
            {
              id: 'selZ0rytLTEnSX05i',
              name: 'Other',
            },
            {
              id: 'seltmbyPUAXa1bsH7',
              name: 'Quaterly',
            },
            {
              id: 'selyfDvN1zEm09spq',
              name: 'Weekly',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selSmYBk2HehpsdSY',
              name: 'Antara App',
            },
            {
              id: 'sel39SRgBttar1OwE',
              name: 'Email PDF',
            },
            {
              id: 'sel1tzusbkzwMJobw',
              name: 'Hard Copy',
            },
            {
              id: 'selShvBQdZqO6sgda',
              name: 'Other',
            },
            {
              id: 'selnYSaQ0St2WoxQo',
              name: 'Web link',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seldZIqwndWaCsI63',
              name: 'Create an appointment',
            },
            {
              id: 'selJ6TTEsOvgPZfaA',
              name: 'Develop HMP',
            },
            {
              id: 'selDkFiOv5zYOvpkq',
              name: 'Escalate issue',
            },
            {
              id: 'selBgy0rT6qCxQYNm',
              name: 'Follow up with provider',
            },
            {
              id: 'selbGTcA59uV8nTBZ',
              name: 'Get medication information',
            },
            {
              id: 'selOKAZY5vcqwVlLJ',
              name: 'Health Goal Management',
            },
            {
              id: 'sel3t3mQB6N8NlpSr',
              name: 'Objective Data Gathering',
            },
            {
              id: 'selrWwO8EF6jKAelT',
              name: 'Obtain Additional past Medical History',
            },
            {
              id: 'seljq67AnxnqICkLW',
              name: 'Refer to in-person consultation',
            },
            {
              id: 'selFRzQKnb7k4Yecv',
              name: 'Review with clinical team',
            },
            {
              id: 'selkha5df4cZiJLIq',
              name: 'Review with member experience team',
            },
            {
              id: 'selB9YQsnwZsWfph7',
              name: 'Routine Healthy member follow up ',
            },
            {
              id: 'selDRBnUMnFxFWqVK',
              name: 'Virtual Clinical Appointment',
            },
          ],
        },
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
        options: null,
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
    id: 'tblL7bahmNjC58rEc',
    fields: [
      {
        id: 'fldCFn05pBRhY3Y31',
        name: 'Date/Time',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selxzK0WIyr8kbgc9',
              name: 'A+',
            },
            {
              id: 'selOw83yz6ikQDlhh',
              name: 'A-',
            },
            {
              id: 'sel7XWXMHS8PfpLMJ',
              name: 'AB+',
            },
            {
              id: 'sel46XTSJv73F00I8',
              name: 'AB-',
            },
            {
              id: 'selViAO5qqOYYUPjV',
              name: 'B+',
            },
            {
              id: 'sel8LcRgxPJc1Rqjk',
              name: 'B-',
            },
            {
              id: 'selTwzhvZsjSJ1WgG',
              name: 'O+',
            },
            {
              id: 'selJoyUFkYhNfqWpn',
              name: 'O-',
            },
            {
              id: 'sels7x5pK88fUpIJ2',
              name: 'Unknown',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selk5ZikLSTxZkkDi',
              name: 'No',
            },
            {
              id: 'selhsu8P4pzA8skSZ',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selKmuVgACV916lS3',
              name: 'No',
            },
            {
              id: 'selEGmqxueG4CbAXP',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selER2dAQwaz7lmis',
              name: 'Asthma',
            },
            {
              id: 'sele47ghFnhzQkfbY',
              name: 'Cancer',
            },
            {
              id: 'selA6yUhLmppE6cLk',
              name: 'Diabetes',
            },
            {
              id: 'selpUAZLo5oXfnJdy',
              name: 'Heart Issues',
            },
            {
              id: 'seluueEzxoeGOFst2',
              name: 'High Blood Pressure',
            },
            {
              id: 'seltz10JRZHhQB9JO',
              name: 'High Cholesterol',
            },
            {
              id: 'selxWMSkLsumNxyPh',
              name: 'None',
            },
            {
              id: 'sel3oybcWxn40wcY9',
              name: 'Osteoarthritis',
            },
            {
              id: 'selipIAsRjfNldhd5',
              name: 'Overweight',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selSh7ESGyMIpAAjK',
              name: 'No',
            },
            {
              id: 'sel4eikjHBJemjKx4',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel8yVfAoyzthyOrw',
              name: "I don't know",
            },
            {
              id: 'seldxRYAUPvniQFOu',
              name: 'No',
            },
            {
              id: 'selfkY9K2nHCbSHNV',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'seleqXRM70waDKCZt',
              name: 'No',
            },
            {
              id: 'sel84BiqyljvwmL6u',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'seldfR876rmBJcznQ',
              name: 'No',
            },
            {
              id: 'sel05V629kjvoHJcy',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selNteX4Ow4JRtjp2',
              name: 'No',
            },
            {
              id: 'selWHBkjb2UvKuAmf',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selpczXEHbSI1gT5Q',
              name: 'No',
            },
            {
              id: 'seljYOLTA2fcQy6au',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
    id: 'tblcQxKM1jPnH9s9d',
    fields: [
      {
        id: 'fldhgcvl4qtJ4TONA',
        name: 'Dependent',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selrJ6XcyBTbZG8O8',
              name: 'Aunt/Uncle',
            },
            {
              id: 'seloggFJh3yKOhMeN',
              name: 'Daughter',
            },
            {
              id: 'selWBxrFGbd34YKU3',
              name: 'Grandchild',
            },
            {
              id: 'selrINFN5nlQpZejr',
              name: 'Legal ward',
            },
            {
              id: 'selUqJ74r5Lolgjxh',
              name: 'Nephew',
            },
            {
              id: 'selKgSwyrr7y32gTW',
              name: 'Niece',
            },
            {
              id: 'sel2qbPbZwSvzStM8',
              name: 'Other',
            },
            {
              id: 'selAAQUL9XENS8EBX',
              name: 'Other: test',
            },
            {
              id: 'selt2SJIvGsyMWbkZ',
              name: 'Parent',
            },
            {
              id: 'sel9EWEDrRZbAnNeK',
              name: 'Principal',
            },
            {
              id: 'selz36aCD2bXXxJnX',
              name: 'Sibling',
            },
            {
              id: 'selPAxrsm4y0jnTQq',
              name: 'Son',
            },
            {
              id: 'selFInKMQqHoWEfLx',
              name: 'Spouse',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selzYI3OxRPnL52B0',
              name: 'No',
            },
            {
              id: 'sel8WwUWQs7u585Tn',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selvBxRSrdpZqoGnu',
              name: 'No',
            },
            {
              id: 'selnh9rI9lJDa6LsW',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selyzqx6OENSbrWt8',
              name: 'No',
            },
            {
              id: 'selTKWHweKtaGNLic',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldZSRgB0hHsKSneL',
        name: "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypertension?",
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selkZM5B5hFycHx6b',
              name: 'No',
            },
            {
              id: 'selIGC6tRrmgNkKnF',
              name: 'Yes',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld5UpHz6P01FuulN',
        name: 'FH Hypertension Description',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypertension?",
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypertension?"
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypertension?"
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypertension?"
            ]
          )
        },
      },
      {
        id: 'fld1YzdaezWv5l0V4',
        name: "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have Diabetes?",
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selZfPu8V0Vthuxyz',
              name: 'No',
            },
            {
              id: 'selxnYi2qLvb7miYR',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have Diabetes?",
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have Diabetes?"
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have Diabetes?"
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have Diabetes?"
            ]
          )
        },
      },
      {
        id: 'fldISzBDbqBYUfQZ4',
        name: "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?",
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'seldMZHL4mjEZbZWC',
              name: 'No',
            },
            {
              id: 'selyxMYvdj77mu7LL',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?",
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?"
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?"
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              "Does anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) have hypercholesterolemia?"
            ]
          )
        },
      },
      {
        id: 'fld8lOCB8Oimdp7YL',
        name: "Is there anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?",
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selWMI3uQ3vsmozEy',
              name: 'No',
            },
            {
              id: 'selsDcqWlTD8om5mp',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
        parentKey:
          "Is there anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?",
        parentValues: ['Yes'],
        condition: (values: any) => {
          if (
            Array.isArray(
              values[
                "Is there anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?"
              ]
            )
          ) {
            return ['Yes'].some((r) =>
              values[
                "Is there anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?"
              ].includes(r)
            )
          }
          return ['Yes'].includes(
            values[
              "Is there anyone in your child/dependent's immediate family (Grandparents, Parents, Siblings) that has had a cardiovascular disease event (heart attack, stroke) before age 55?"
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selDIgxqQHdHTSZWW',
              name: 'None',
            },
            {
              id: 'selHGwxD4K9bixxx2',
              name: 'Occasional Exercise (<3x per week)',
            },
            {
              id: 'selQxVlQ6qjQdH6YK',
              name: 'Other',
            },
            {
              id: 'selEkJy9mLxPNd2vo',
              name: 'Plays alot',
            },
            {
              id: 'selioAxSlE2TQotxS',
              name: 'Regular exercise(>3x per week)',
            },
            {
              id: 'selzU8BYJQ9SpsfBA',
              name: 'Sports',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selV6kOMl0wA3mSrw',
              name: '< 3x per week',
            },
            {
              id: 'selqDBNYjwaDWAU3X',
              name: '> 3x per week',
            },
            {
              id: 'selt8vAypPcxWluBK',
              name: 'Daily',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldsVuFtNCJi4ly9O',
        name: "If you could work on one aspect of you child/dependent's health, what would it be?",
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
    fields: [
      {
        id: 'fld3OPeFGLFkNGL9c',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: 'fldKJH1ZVImMc4RZW',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblHs6JxFnMGAjNNC',
        required: true,
        helper: '',
      },
      {
        id: 'fldMniwVWtJfrWXYS',
        name: 'Engagement Level',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'sel4KYTI7ykdLY3Hd',
              name: 'High',
            },
            {
              id: 'selX34HfU9JpJzdcE',
              name: 'Low',
            },
            {
              id: 'selyyG69k045Xq9xT',
              name: 'Medium',
            },
            {
              id: 'sel2EfJFUNOxIiBXA',
              name: 'N/A',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldLdJoyPP28KJ5sd',
        name: 'Condition',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selk6JshO8ebnLPDe',
              name: 'Abortion, incomplete',
            },
            {
              id: 'sellSxhyexn5im3Pc',
              name: 'Abortion, induced',
            },
            {
              id: 'selFkgou11416B2yN',
              name: 'Abortion, spontaneous',
            },
            {
              id: 'selhL5N7ZpjIe2FtB',
              name: 'Abrasion',
            },
            {
              id: 'selWML0GMUojBHUcr',
              name: 'Abruptio placentae',
            },
            {
              id: 'selqXlVjqRn4pvs2N',
              name: 'Abscess of breast',
            },
            {
              id: 'selUcSiJmREV2MjJd',
              name: 'Acne',
            },
            {
              id: 'selJIqiQOWFMS3nxw',
              name: 'Acquired deformity, limb,',
            },
            {
              id: 'selQ08BUk1i8uH29B',
              name: 'Acrokeratoelastoidosis',
            },
            {
              id: 'selCu4gMrSmPnxvqZ',
              name: 'Actinic keratosis',
            },
            {
              id: 'seleZqOnjOKB7BjV8',
              name: 'Acute nasopharyngitis',
            },
            {
              id: 'selsyon9RPgiQuR6m',
              name: 'Acute sinusitis',
            },
            {
              id: 'selHjZAS5YRVzaBNf',
              name: 'Allergic rhinitis',
            },
            {
              id: 'seli0PkYy8VMUfw1U',
              name: 'Alopecia',
            },
            {
              id: 'selhXBQUmmjLbqKx9',
              name: 'Amebiasis',
            },
            {
              id: 'selzbidsenCCvSEjN',
              name: 'Amenorrhea',
            },
            {
              id: 'selcgM84DRuFJdY8t',
              name: 'Anal fissure and fistula',
            },
            {
              id: 'selW0nxak72GmU1hu',
              name: 'Anal fissure, nontraumatic',
            },
            {
              id: 'sellMpQN2fgWXXF77',
              name: 'Anemia, acute blood loss',
            },
            {
              id: 'selwMfg0W4cwgmCzf',
              name: 'Anemia, chronic disease',
            },
            {
              id: 'selD5RtzhmZ7uJB6d',
              name: 'Anemia, chronic kidney disease',
            },
            {
              id: 'selBvrOYROP8kFO3z',
              name: 'Anemia, chronic neoplastic disease',
            },
            {
              id: 'selelUT3oxFNtFpZI',
              name: 'Anemia, iron deficiency',
            },
            {
              id: 'sel9eSUaPyKZBzE4W',
              name: 'Anemia, iron deficiency, unspec.',
            },
            {
              id: 'selpHBJpS8VCmAeim',
              name: 'Anemia, other',
            },
            {
              id: 'selNm0avvAj7vkLio',
              name: 'Anemia, pernicious',
            },
            {
              id: 'selMlblwbbhKJYsqy',
              name: 'Angina Pectoris',
            },
            {
              id: 'selvk9BQlWQjVKvR9',
              name: 'Angina, unstable',
            },
            {
              id: 'selzRhiwFHKiEJ2l0',
              name: 'Ankylosing spondylitis',
            },
            {
              id: 'selSrkoFRHyHvFDUH',
              name: 'Anxiety Disorder',
            },
            {
              id: 'sel9bAZ6EGYF4PJsp',
              name: 'Aortic aneurysm',
            },
            {
              id: 'selYLXOczhSYUveQm',
              name: 'Appendicitis',
            },
            {
              id: 'sel1YyclBkPRdOI1F',
              name: 'Arterial disorder, other',
            },
            {
              id: 'sel2as6XgF31s8o23',
              name: 'Arthropathy',
            },
            {
              id: 'sel0Bfwx7lUZnMXuo',
              name: 'Arthropathy, traumatic',
            },
            {
              id: 'selZM75fmC6kPXRnW',
              name: 'Asthma',
            },
            {
              id: 'selzlAH9PM9oDCc6n',
              name: 'Asthma, exercise induced',
            },
            {
              id: 'sel7OVatutIUy8XT7',
              name: 'Atopic dermatitis and related conditions',
            },
            {
              id: 'selbOkbT1y8lsmAGm',
              name: 'Atrial fibrillation',
            },
            {
              id: 'selDGMmLmgM5Z955h',
              name: 'B12 deficiency w/o anemia',
            },
            {
              id: 'seleq5Q7jzHlCDpAz',
              name: 'Bacteremia (not septicemia)',
            },
            {
              id: 'selWT7GtO24vzXVSB',
              name: 'Bartholin cyst',
            },
            {
              id: 'selTZLhhZLOheIWz1',
              name: "Bell's palsy",
            },
            {
              id: 'selKuayhsXB7Pwpig',
              name: 'Benign intracranial hypertension',
            },
            {
              id: 'selKmQZ8C07MCzv92',
              name: 'Benign lesion',
            },
            {
              id: 'selRfWxmAuIz9QbLR',
              name: 'Benign prostatic hyperplasia',
            },
            {
              id: 'selE9bBHckqCBLa2g',
              name: 'Bilateral Upper Extremity Tremors',
            },
            {
              id: 'seleAllrjHUWOXnWj',
              name: 'Bipolar Disorder',
            },
            {
              id: 'selSM7G4RpHQnveEF',
              name: 'Birth asphyxia',
            },
            {
              id: 'selNrQwMZLQr6DWqi',
              name: 'Birth trauma',
            },
            {
              id: 'selk1LB7eUPzT0ewX',
              name: 'Bladder',
            },
            {
              id: 'selDE9GJ7nXjLoUPR',
              name: 'Bleeding in pregnancy',
            },
            {
              id: 'selxjji2O95PGne1A',
              name: 'Blepharitis',
            },
            {
              id: 'selsjIQVsJtdOpma4',
              name: 'Blood disease',
            },
            {
              id: 'selPr6ZvLkGRjuMA5',
              name: 'Breast cancer',
            },
            {
              id: 'seloaJrUJCvTMGdIT',
              name: 'Breast disease',
            },
            {
              id: 'selJ7paQEzyVDuFpB',
              name: 'Breast lump',
            },
            {
              id: 'selEtUuNAzvaZfCWl',
              name: 'Bronchiolitis, acute, due to RSV',
            },
            {
              id: 'selhRFHmmpK8pC6qF',
              name: 'Bronchitis',
            },
            {
              id: 'selYAlf80i8mTcy55',
              name: 'Bronchitis, acute',
            },
            {
              id: 'seluFSF43klKbzxgm',
              name: 'Bronchitis, chronic',
            },
            {
              id: 'selch0L8F95LpsF1E',
              name: 'Bronchospasm, acute',
            },
            {
              id: 'selOA3j4ILpKSBLdA',
              name: 'COVID19',
            },
            {
              id: 'selSYNojN3nMSUGZT',
              name: 'CVA, late effect',
            },
            {
              id: 'seldP3Q8LVwZrHpVJ',
              name: 'Calculus in urethra',
            },
            {
              id: 'selgaQgCD1qZnM23B',
              name: 'Calculus of kidney and ureter',
            },
            {
              id: 'selGWpgQ2L5iLu9cB',
              name: 'Calculus of ureter',
            },
            {
              id: 'sel2MU3tFHXCrzPIB',
              name: 'Calculus, urinary',
            },
            {
              id: 'selAKk8eWv3hJS6FR',
              name: 'Candidiasis',
            },
            {
              id: 'selfsR6X6qn0LxmXm',
              name: 'Carcinoma in situ, Penis',
            },
            {
              id: 'selIubLFFwQyCLDr1',
              name: 'Carcinoma in situ, Prostate',
            },
            {
              id: 'selA5XXnDgEMBxydD',
              name: 'Cardiac arrest',
            },
            {
              id: 'sel3SqKTIQGxBqz9G',
              name: 'Cardiomyopathy',
            },
            {
              id: 'selo45Yyb8TB7paRu',
              name: 'Carpal tunnel',
            },
            {
              id: 'selztmlb2ldIFItu0',
              name: 'Cataracts',
            },
            {
              id: 'selExjdk8TbBdsRr9',
              name: 'Cataracts',
            },
            {
              id: 'selVcHYzXntnUG4X3',
              name: 'Cellulitis',
            },
            {
              id: 'sel64VzP4agBmml8M',
              name: 'Cerebral artery occlusion with infarction',
            },
            {
              id: 'selWnjkCliIUavvcg',
              name: 'Cerumen impaction',
            },
            {
              id: 'selQrhToZiOukfbGW',
              name: 'Cervical cancer',
            },
            {
              id: 'selTz38RnkQ1gB0NS',
              name: 'Cervical disorder',
            },
            {
              id: 'selvU33ThTtJgJfwO',
              name: 'Cervical polyp',
            },
            {
              id: 'selSX1wdyoUTkcM5H',
              name: 'Cervicitis',
            },
            {
              id: 'selesKYEIXC5zgbSh',
              name: 'Cervix uteri (CIS)',
            },
            {
              id: 'selkn0vMcDPNyTB2Z',
              name: 'Chalazion',
            },
            {
              id: 'sele72FCXAJBZRjof',
              name: 'Chickenpox',
            },
            {
              id: 'selupcji8xtZYZYBW',
              name: 'Cholecystitis, acute',
            },
            {
              id: 'sel8rWVZma5755zH8',
              name: 'Cholelithiasis',
            },
            {
              id: 'selp18LzSoflmi9Bv',
              name: 'Cholera',
            },
            {
              id: 'selbrLomPdz0VrouU',
              name: 'Chronic Obstructive Pulmonary Disease',
            },
            {
              id: 'selvOGBnUPoBBm7rL',
              name: 'Chronic ischemic heart disease',
            },
            {
              id: 'selz2yNa2p6ltYLpI',
              name: 'Chronic osteomyelitis',
            },
            {
              id: 'selCDdms5npdLIPZi',
              name: 'Chronic sinusitis',
            },
            {
              id: 'selhKkBRCK2E6KSse',
              name: 'Circulatory disorder',
            },
            {
              id: 'selh5P3UMHXEbxtDh',
              name: 'Cleft lip',
            },
            {
              id: 'selaH17hh9JhDR4nx',
              name: 'Cognitive impairment, mild',
            },
            {
              id: 'selXhDTQwapbemrXL',
              name: 'Cold injury',
            },
            {
              id: 'selNxqSHvL8sZvKof',
              name: 'Complicated delivery/labor',
            },
            {
              id: 'selyfSm7lj9Avu9d2',
              name: 'Conduction disorder',
            },
            {
              id: 'selHQDGIlNDC085oC',
              name: 'Condyloma acuminata',
            },
            {
              id: 'selgYGabEwuh82cAf',
              name: 'Congenital anomaly, other',
            },
            {
              id: 'selx691rrftUwwH3M',
              name: 'Conjunctivitis',
            },
            {
              id: 'selVQ2erVg6KA65pI',
              name: 'Conjunctivitis, unspec.',
            },
            {
              id: 'sela1l1twS6oSTTTw',
              name: 'Conjunctivitis, viral',
            },
            {
              id: 'selHHxYVYXbOFFYqP',
              name: 'Connective tissue disease',
            },
            {
              id: 'selXmtxYIYYnqoMqw',
              name: 'Constipation',
            },
            {
              id: 'selw0eOyVuJtRqP0z',
              name: 'Constipation, unspec.',
            },
            {
              id: 'sel6hcw6NQrFLRSXr',
              name: 'Contact dermatitis',
            },
            {
              id: 'selcGHTxtW1DZxOyV',
              name: 'Contusion',
            },
            {
              id: 'sel8zH0YeYtECLBMs',
              name: 'Contusion, Chest wall',
            },
            {
              id: 'selTQUz3iD5cEJSF2',
              name: 'Corn/callus',
            },
            {
              id: 'selKemoH7LT3eg9eq',
              name: 'Corneal abrasion',
            },
            {
              id: 'selP4uTK8YFP96owX',
              name: 'Corneal ulcer',
            },
            {
              id: 'sel909xXBSO9KihXa',
              name: 'Coronary artery anomaly',
            },
            {
              id: 'selJ9DXz6zjw10Jod',
              name: 'Coronavirus Infection',
            },
            {
              id: 'selGPSZElsK6c2ccX',
              name: "Crohn's disease",
            },
            {
              id: 'selOtOqfqCcjZFGnq',
              name: 'Croup',
            },
            {
              id: 'selL2Z3ifKFOOBUEq',
              name: 'Crushing injury',
            },
            {
              id: 'selFgHbOugRn373Gn',
              name: 'Cyst of ovary, follicular',
            },
            {
              id: 'sel0EkIQzJK78TugM',
              name: 'Cystocele/rectocele/prolapse',
            },
            {
              id: 'sel1pbx14IbwwmCiF',
              name: 'Decreased fetal movements',
            },
            {
              id: 'selKpeQl0Bb0QGKaD',
              name: 'Dehydration',
            },
            {
              id: 'selF8GKthwPOgPRG7',
              name: 'Dental',
            },
            {
              id: 'selJlOyIOwJwCVErI',
              name: 'Dental abscess',
            },
            {
              id: 'selap6QeItVngzKzI',
              name: 'Dental caries',
            },
            {
              id: 'selOPlCBcOIxdP9lF',
              name: 'Depression',
            },
            {
              id: 'selA8AaOOU0F0k4kK',
              name: 'Derangement, knee, internal',
            },
            {
              id: 'selHXBjX8D2QEEko5',
              name: 'Dermatomycosis',
            },
            {
              id: 'selnekhaGv3eEnWxN',
              name: 'Dermatophytosis',
            },
            {
              id: 'selqkWzEWop1jmufg',
              name: 'Diabetes I',
            },
            {
              id: 'selYUJp9jBV8Bfdid',
              name: 'Diabetes II',
            },
            {
              id: 'selh4dabByb0JiknO',
              name: 'Diabetes, Gestational',
            },
            {
              id: 'selkp6zjbEoRZXfEx',
              name: 'Diaper rash',
            },
            {
              id: 'selWeSiiby2AdoSv7',
              name: 'Disc syndrome, no myelopathy',
            },
            {
              id: 'sel1ljdwishHYPHkC',
              name: 'Dislocation: other, closed',
            },
            {
              id: 'selS68FmOLYmPMFtz',
              name: 'Dislocation: shoulder, closed',
            },
            {
              id: 'sellC2P85Xlfpj8ra',
              name: 'Diverticulitis of colon',
            },
            {
              id: 'selE952dubVZMCAJV',
              name: 'Diverticulosis of colon',
            },
            {
              id: 'selSdXb5eTw6YBzRL',
              name: 'Dog bite',
            },
            {
              id: 'selmYRekSB3SBVO1i',
              name: 'Dysmetabolic syndrome',
            },
            {
              id: 'selyJeiCA45sOT0VJ',
              name: 'Dyspareunia',
            },
            {
              id: 'sel6Hj7hDbQDZ2xVP',
              name: 'Ear disorder',
            },
            {
              id: 'selurHugRMh1jQTtw',
              name: 'Ectopic pregnancy, no IUP',
            },
            {
              id: 'selFa4eFdz43Pa4zX',
              name: 'Eczema',
            },
            {
              id: 'sel7Xfz0rIQHH1j43',
              name: 'Emphysema',
            },
            {
              id: 'sel8uDYhtcYW8TZDu',
              name: 'Encephalocele',
            },
            {
              id: 'selCNl7vo0zTYdNkh',
              name: 'Encopresis',
            },
            {
              id: 'sel4w9yGvcS3qFTkm',
              name: 'Endometriosis',
            },
            {
              id: 'selXXPxWRqmESXteo',
              name: 'Endometritis, postpartum',
            },
            {
              id: 'sels9SmicGMFtrrUw',
              name: 'Enuresis',
            },
            {
              id: 'selcStQAxXIjrEbXP',
              name: 'Eosinophilia',
            },
            {
              id: 'sel9G8rHQPNNx3mn8',
              name: 'Epispadias',
            },
            {
              id: 'selO0AigyPEKjplPK',
              name: 'Erectile dysfunction',
            },
            {
              id: 'selfQPUrc7ALhIgzy',
              name: 'Esophageal disease',
            },
            {
              id: 'sel9MIrJV89o8FEvS',
              name: 'Esophagitis',
            },
            {
              id: 'seldegYr5OouuvmTL',
              name: 'Eustachian salpingitis',
            },
            {
              id: 'selbNZMGGTeRpVFb3',
              name: 'Exanthems, viral',
            },
            {
              id: 'sel3rEupYWkGpoCxh',
              name: 'Exhaustion due to exposure',
            },
            {
              id: 'sel6X0NByccIihB5r',
              name: 'Eye disorder',
            },
            {
              id: 'selktu2Z1toa1cf0t',
              name: 'Eye movement disorder',
            },
            {
              id: 'selbtUIzrqBnWWZo4',
              name: 'Fasciitis',
            },
            {
              id: 'sel8bQdtiV22UswVO',
              name: 'Female Infertility',
            },
            {
              id: 'selyS7AlQxtmnYzum',
              name: 'Female genital disease',
            },
            {
              id: 'selOrHnc3r51wlPIE',
              name: 'Female genital, CIS excluded',
            },
            {
              id: 'selzzHvkol8bKy6Zj',
              name: 'Fetal distress',
            },
            {
              id: 'selA2BLcLTOwU62fu',
              name: 'Fibroadenosis',
            },
            {
              id: 'sel2lpr5n7bvfIqPy',
              name: 'Fibrocystic disease',
            },
            {
              id: 'sel337601BiZQOkUv',
              name: 'Fibroid (leiomyoma)',
            },
            {
              id: 'sell5lUcQVgwDjZS2',
              name: 'Foreign body, skin, superficial',
            },
            {
              id: 'selObppYizVzFc0W6',
              name: 'Fracture of neck and trunk',
            },
            {
              id: 'selLLP3anSFRVknOA',
              name: 'Fracture of upper limb',
            },
            {
              id: 'selIjAIbweaFGa3FB',
              name: 'Fracture, stress: tibia or fibula',
            },
            {
              id: 'seluHJnWf4SXhewEG',
              name: 'Fracture: ankle, closed',
            },
            {
              id: 'selByX7HvEl8brx8F',
              name: 'Fracture: carpal, closed',
            },
            {
              id: 'selHrsX4ZqqgxPeI3',
              name: 'Fracture: clavicle, closed',
            },
            {
              id: 'selF9OHBRm33G6j62',
              name: 'Fracture: femur/hip, closed',
            },
            {
              id: 'selEI2tGaetVPMEzE',
              name: 'Fracture: femur/shaft, closed',
            },
            {
              id: 'sel4QLPomj4ywvsrF',
              name: 'Fracture: fibula, closed',
            },
            {
              id: 'selQnxUp7JiavUWk7',
              name: 'Fracture: foot, closed (not toes)',
            },
            {
              id: 'selZKZN10jV2QCUSr',
              name: 'Fracture: forearm, closed',
            },
            {
              id: 'selUA6Ko9ozlpYSBd',
              name: 'Fracture: humerus, closed',
            },
            {
              id: 'selfjLSyk6oCA8no6',
              name: 'Fracture: metacarpal, closed',
            },
            {
              id: 'seli1bp4nXdm4TsT2',
              name: 'Fracture: nose, closed',
            },
            {
              id: 'selurviNzd8ZZrFOy',
              name: 'Fracture: other sites, closed',
            },
            {
              id: 'selKuBdIQHUX8bgXR',
              name: 'Fracture: pelvic, closed',
            },
            {
              id: 'selHRqpEVukfW4wq2',
              name: 'Fracture: ribs, closed',
            },
            {
              id: 'selfzuVb3sluwyoo8',
              name: 'Fracture: skull, closed',
            },
            {
              id: 'sel9PV96E5CmEba1t',
              name: 'Fracture: tibia, closed',
            },
            {
              id: 'sel1pGj84LgeRMUJE',
              name: 'Functional disorder intestine',
            },
            {
              id: 'selh0DEEfGNMLkKME',
              name: 'Galactorrhea',
            },
            {
              id: 'selYiZbghZfef7RZV',
              name: 'Gallbladder disease',
            },
            {
              id: 'selnBPCtfM5Du6PGj',
              name: 'Ganglion',
            },
            {
              id: 'sel5jqo6SBF3OTb0r',
              name: 'Gangrene',
            },
            {
              id: 'selJWtG0yO6OAgJkD',
              name: 'Gastritis',
            },
            {
              id: 'selzHIvZTeVOsVzat',
              name: 'Gastritis: H.pylori associated',
            },
            {
              id: 'selRKJD8x3WVah6aP',
              name: 'Gastroenteritis, infectious',
            },
            {
              id: 'seledAPbBA7vUZXnl',
              name: 'Gastroesophageal reflux (GERD)',
            },
            {
              id: 'selyiNf4EVAxMoajD',
              name: 'Gestational hypertension',
            },
            {
              id: 'selJWqV3QQt54OIS7',
              name: 'Giardiasis',
            },
            {
              id: 'selXjE3s9d5ucQMU1',
              name: 'Glaucoma',
            },
            {
              id: 'seliyP7c9tB1NfxLA',
              name: 'Glomerulonephritis, acute',
            },
            {
              id: 'selqWRqGVThAd4rt8',
              name: 'Glomerulonephritis, chronic',
            },
            {
              id: 'selSCNniOcvfhtAFA',
              name: 'Glucose intolerance',
            },
            {
              id: 'selyyPIveXPEAS1F1',
              name: 'Gonorrhea, acute, lower GU tract',
            },
            {
              id: 'selVBfunHhvVUUL25',
              name: 'Gout',
            },
            {
              id: 'selfjyHuixvgkTbaH',
              name: 'Gunshot wound',
            },
            {
              id: 'selThS9PkZkXqrM93',
              name: 'HIV infection',
            },
            {
              id: 'selJJ0EwNnVslcqib',
              name: 'Hair disease',
            },
            {
              id: 'selD573Sz1B0D4e6q',
              name: 'Head injury',
            },
            {
              id: 'selw7FX8xZrDPWGol',
              name: 'Headache, Migraine',
            },
            {
              id: 'selcf06t7AYqddoKN',
              name: 'Headache, tension',
            },
            {
              id: 'selHi0D0VQsoU1MwW',
              name: 'Healed fracture, follow-up exam',
            },
            {
              id: 'selRvTX38sUkKcf4H',
              name: 'Healthy',
            },
            {
              id: 'sel9KG4G5lXMq3gFK',
              name: 'Hearing loss',
            },
            {
              id: 'sely7AX7KXXaoxPXM',
              name: 'Heart disease, other',
            },
            {
              id: 'selgwjfk2Jo1UcnBe',
              name: 'Heart failure, combined',
            },
            {
              id: 'selUEoyaHC5viKpSR',
              name: 'Heart failure, congestive',
            },
            {
              id: 'seldLnr82jNQSkFuL',
              name: 'Heart failure, diastolic',
            },
            {
              id: 'selIf0BncdXW2pCQw',
              name: 'Heart failure, systolic',
            },
            {
              id: 'selBhFpOeVahiAbx5',
              name: 'Heat injury',
            },
            {
              id: 'selCWdco3ESNJDKnH',
              name: 'Hematuria',
            },
            {
              id: 'sel8MzaBsoBC9HL6P',
              name: 'Hemorrhage, intracranial',
            },
            {
              id: 'selbH1h1BIaWCexEg',
              name: 'Hemorrhagic conditions',
            },
            {
              id: 'selKi5ICQEWFgLF2C',
              name: 'Hemorrhoids',
            },
            {
              id: 'selFi4wIWQ4SjTUoF',
              name: 'Hepatitis',
            },
            {
              id: 'selxVZ2YFBKgZvDge',
              name: 'Hepatitis, viral',
            },
            {
              id: 'selUMBfUb1nSP5oOl',
              name: 'Hernia, hiatal, noncongenital',
            },
            {
              id: 'sellCGFCPQMuTMF9E',
              name: 'Hernia, inguinal',
            },
            {
              id: 'selk8UjnmpPc5wtgY',
              name: 'Hernia, other',
            },
            {
              id: 'selwSz8bctlQa073z',
              name: 'Herpes zoster',
            },
            {
              id: 'sel6EDDyNEyq6X08c',
              name: 'Herpetic disease, uncomplicated',
            },
            {
              id: 'sel1FiUUhzQIA5fe2',
              name: 'Hirschsprung',
            },
            {
              id: 'selc73F8QPRzSTPaV',
              name: 'Hormone replacement therapy, postmenopausal',
            },
            {
              id: 'sels5b9QFtLzanEu3',
              name: 'Hydrocele',
            },
            {
              id: 'seloKAyDsdkzNpuLz',
              name: 'Hypercalcemia',
            },
            {
              id: 'sel90WNw1Or6aiRsZ',
              name: 'Hypercholesterolemia',
            },
            {
              id: 'sel4uxq8okAZkIZiM',
              name: 'Hyperkalemia',
            },
            {
              id: 'selsdOUfd3WnN9u0Y',
              name: 'Hyperlipidemia',
            },
            {
              id: 'selw4RrnS6eE7dig1',
              name: 'Hypernatremia',
            },
            {
              id: 'selH2az28MLxOAokI',
              name: 'Hyperparathyroidism',
            },
            {
              id: 'selRWqWoHvRFA9A9v',
              name: 'Hypertension',
            },
            {
              id: 'selrLpydbcjPlqjzm',
              name: 'Hypertension, malignant',
            },
            {
              id: 'selYYhLBR2TjEzxzc',
              name: 'Hyperthyroidism',
            },
            {
              id: 'selo0UEtucYyx92XK',
              name: 'Hypertriglyceridemia',
            },
            {
              id: 'selgB9XLcpqZredll',
              name: 'Hypocalcemia',
            },
            {
              id: 'selELeTkfjkvym2og',
              name: 'Hypoglycemia, nondiabetic',
            },
            {
              id: 'selQvDQfLrUQgW7El',
              name: 'Hypokalemia',
            },
            {
              id: 'selnEn9FSMz5YALjs',
              name: 'Hyponatremia',
            },
            {
              id: 'selPyxZLqqpP21PIf',
              name: 'Hypoparathyroidism',
            },
            {
              id: 'selUQIm0gXY7fxmgN',
              name: 'Hypospadias',
            },
            {
              id: 'seln1POCqP6uBlTKn',
              name: 'Hypotension, orthostatic',
            },
            {
              id: 'selxFoBshM8ik2g0u',
              name: 'Hypothyroidism',
            },
            {
              id: 'selmLSUBCifXxJNqc',
              name: 'Hypoxemia, newborn',
            },
            {
              id: 'selivtcn3NMYCqsBs',
              name: 'Impotence, organic',
            },
            {
              id: 'selixfb9O6NrarhFa',
              name: 'Incontinence, stress, female',
            },
            {
              id: 'selmtLl4kX61TRkej',
              name: 'Infectious diarrhea',
            },
            {
              id: 'selPnIu3kzuoo8bmf',
              name: 'Infectious mononucleosis',
            },
            {
              id: 'selYzE5trzqWZ1mjp',
              name: 'Infertility, female',
            },
            {
              id: 'selbT1dHVk2C6NzSe',
              name: 'Infertility, male',
            },
            {
              id: 'seldxLQlwzLyewWrL',
              name: 'Ingrown nail',
            },
            {
              id: 'selhQSO3MZrvqxBBT',
              name: 'Insect bite',
            },
            {
              id: 'seljcVabjL4hOS5zq',
              name: 'Intestinal obstruction',
            },
            {
              id: 'sel6EDGbbWpNAOwJv',
              name: 'Intestinal protozoa',
            },
            {
              id: 'sel40YpcyDXZ7cqhO',
              name: 'Irritable bowel syndrome',
            },
            {
              id: 'sel7mgwlyUov87xA6',
              name: 'Jaundice',
            },
            {
              id: 'selfsWR488bxIpuGN',
              name: 'Jaundice, newborn',
            },
            {
              id: 'selL5qcUYu7WKhbaY',
              name: 'Keloid scar',
            },
            {
              id: 'selha8AEVmCu7Ne8Y',
              name: 'Kidney, unspec',
            },
            {
              id: 'selXShKF6mUsn6MuP',
              name: 'Knee pain',
            },
            {
              id: 'selCBkOeRzBteNSKM',
              name: 'Kyphosis/scoliosis',
            },
            {
              id: 'selZf9ny5Y33lc8cj',
              name: 'Laryngitis, acute, no obstruction',
            },
            {
              id: 'selhSrD7tCHy94XWX',
              name: 'Leukemia, w/o remission',
            },
            {
              id: 'selXNgVqSyrZpZRW8',
              name: 'Leukocytopenia',
            },
            {
              id: 'selGbR2707sy3B7Ze',
              name: 'Limb anomaly',
            },
            {
              id: 'sel6KZbxmpCD7zq71',
              name: 'Lipoma, any site',
            },
            {
              id: 'sel1XFl8TYVroAeH9',
              name: 'Long QT syndrome',
            },
            {
              id: 'selC8Qcil7NWbK5EA',
              name: 'Lower Back Pain',
            },
            {
              id: 'selyp9Cr3qMyr5EJ6',
              name: 'Lower Extremity Edema',
            },
            {
              id: 'selGjqvXWEhNjaf6r',
              name: 'Lung',
            },
            {
              id: 'sel0n3WWPWPpX4ldY',
              name: 'Lymphadenitis',
            },
            {
              id: 'selKkQLO80uZtf4XK',
              name: 'Lymphadenitis, acute',
            },
            {
              id: 'selxKQqXX2fKCAq5h',
              name: 'Lymphadenitis, chronic',
            },
            {
              id: 'sel2yG0jerohcgemc',
              name: 'Lymphangitis',
            },
            {
              id: 'selLMExmmGSqE2qXX',
              name: 'Major salivary glands',
            },
            {
              id: 'selMFLmWoDqGpOvAS',
              name: 'Malaria',
            },
            {
              id: 'selK8VUmJ49v7iLeM',
              name: 'Male genital',
            },
            {
              id: 'sel31HH5He9BjCJDE',
              name: 'Malignant lesion',
            },
            {
              id: 'selLfvN1pvws9Tfcl',
              name: 'Mastitis',
            },
            {
              id: 'selEYqCFnAsrdJAGJ',
              name: 'Mastitis, lactating',
            },
            {
              id: 'selrEUqVyvAvWRBNL',
              name: 'Measles',
            },
            {
              id: 'seljASBzGsZC58JWZ',
              name: 'Mediastinitis',
            },
            {
              id: 'seleHsrl4xV2cVp74',
              name: 'Medication, adverse effects',
            },
            {
              id: 'seldez0ZyYd8esfvT',
              name: 'Meningitis',
            },
            {
              id: 'selQWGyaPToSe3h6w',
              name: 'Menopausal disorders',
            },
            {
              id: 'sel1y9YCcQ9hQG3YM',
              name: 'Menstruation, excessive/frequent',
            },
            {
              id: 'selSfTks2qeBLggb4',
              name: 'Menstruation, painful',
            },
            {
              id: 'selMnABzefN8a4jMa',
              name: 'Mental disorder',
            },
            {
              id: 'selFPoF2Hd3WqumSC',
              name: 'Metrorrhagia',
            },
            {
              id: 'selboUgEjlp4CybHQ',
              name: 'Migraine',
            },
            {
              id: 'selbuqTTj8cAGu8Nr',
              name: 'Moniliasis, skin/nails',
            },
            {
              id: 'selGwtugJ4M8gVhDP',
              name: 'Moniliasis, vulva/vagina',
            },
            {
              id: 'seltqnBApjGTzAmc2',
              name: 'Movement disorder',
            },
            {
              id: 'selsP4E7NtGK2ltFT',
              name: 'Multiple sclerosis',
            },
            {
              id: 'sel9m7doYB7Os3aum',
              name: 'Muscle spasm',
            },
            {
              id: 'selsNo9iz5bxZyWeJ',
              name: 'Muscle weakness, generalized',
            },
            {
              id: 'sely5dL0jEreFUTun',
              name: 'Mycoses of the body',
            },
            {
              id: 'selxDDhR7iyT7g68L',
              name: 'Mycoses, Of scalp and beard',
            },
            {
              id: 'sel7pDj2ngMQ49fAF',
              name: 'Myocardial infarction',
            },
            {
              id: 'selEWPDCKaIqrBx9W',
              name: 'Myocardial infarction, old',
            },
            {
              id: 'selcMwLVrVwUGJe86',
              name: 'Myopathy',
            },
            {
              id: 'selyhv24tvnvYyqh4',
              name: 'Nail disease',
            },
            {
              id: 'selZutPMZCvz1E2hI',
              name: 'Neoplasm',
            },
            {
              id: 'sel5V2B4Iexz2ggfp',
              name: 'Neoplasm, Bladder',
            },
            {
              id: 'selrZcqBVhkQSLjwF',
              name: 'Neoplasm, Stomach',
            },
            {
              id: 'selOvQRgKc9H3UkaX',
              name: 'Nephrotic syndrome',
            },
            {
              id: 'selBdgKcWzLGN4owi',
              name: 'Nephrotic syndrome with unspecified pathological lesion in kidney',
            },
            {
              id: 'seld5prlte3ixh3kb',
              name: 'Neuropathy.',
            },
            {
              id: 'selgbSOBb4V9tpoVB',
              name: 'Non-Coded Condition',
            },
            {
              id: 'selVpLlc7Yn2ks8It',
              name: 'Nontraffic accident involving motor',
            },
            {
              id: 'selgV7JR8Ye5gUxK4',
              name: 'Normal delivery',
            },
            {
              id: 'selaJDcs71L0xSFdf',
              name: 'Nutritional Deficiency, Other protein',
            },
            {
              id: 'selchOEghKhximqbO',
              name: 'Nutritional deficiencies',
            },
            {
              id: 'selNpUFHVl9771Aoe',
              name: 'Obesity',
            },
            {
              id: 'selqvqJCI7UzMcs60',
              name: 'Onychomycosis',
            },
            {
              id: 'selMQdcJRVwYsk8dN',
              name: 'Open wound, head/neck/trunk',
            },
            {
              id: 'selBqnnsbdlSiZDZe',
              name: 'Open wound, lower limb',
            },
            {
              id: 'sel7IQsybWnXdE1uD',
              name: 'Open wound, upper limb',
            },
            {
              id: 'selSVmSV8nTcaMQp9',
              name: 'Oral aphthae',
            },
            {
              id: 'seljbUfxsNHMhC2W7',
              name: 'Oral, tongue diseases',
            },
            {
              id: 'selPDnc0u7xoiULeA',
              name: 'Orchitis',
            },
            {
              id: 'selSfLdEqRvFEZmCr',
              name: 'Osteoarthritis of Hip',
            },
            {
              id: 'selzxLtvmb3hEPKhs',
              name: 'Osteoarthritis of Knee',
            },
            {
              id: 'selg6lqFus8vPCHtN',
              name: 'Osteoarthritis of Shoulder',
            },
            {
              id: 'selRKL9bgVoUiD0qG',
              name: 'Osteoarthritis of spine',
            },
            {
              id: 'selpNn27m4G2IjXIj',
              name: 'Osteoarthritis, other',
            },
            {
              id: 'selo8TsaSPnox6zEb',
              name: 'Osteomyelitis, chronic',
            },
            {
              id: 'selLkE6d47LYOTzYG',
              name: 'Osteoporosis',
            },
            {
              id: 'selN3khd5zU0tjAx2',
              name: 'Other',
            },
            {
              id: 'selhoClvN2XPdkZKq',
              name: 'Other complication of puerperium/postpartum',
            },
            {
              id: 'selY9nUGjnErjtZKr',
              name: 'Other skin disease',
            },
            {
              id: 'seldVIBkWM6hago1l',
              name: 'Other trauma',
            },
            {
              id: 'selwIQexAEdzwBjFA',
              name: 'Otitis media, acute',
            },
            {
              id: 'selhpluelyaHbIaPC',
              name: 'Otitis media, acute w/ rupture of TM',
            },
            {
              id: 'selrnzupDcAWGJ0In',
              name: 'Otitis media, chronic serous',
            },
            {
              id: 'selxmNW265TY6rIsk',
              name: 'Overweight',
            },
            {
              id: 'selxEVthVjrDOmGRp',
              name: 'PSA, elevated',
            },
            {
              id: 'selpIVL4NQd2stw3J',
              name: 'Pain in limb',
            },
            {
              id: 'selV21vRJVqUbXJqZ',
              name: 'Pancreatitis, acute',
            },
            {
              id: 'sel5TTtLRah3nUxoq',
              name: 'Paralysis',
            },
            {
              id: 'selrTwXMPbLF1p9NO',
              name: 'Parkinson',
            },
            {
              id: 'selcvCjROyIOZADCX',
              name: 'Parkinsonism, primary',
            },
            {
              id: 'selDuqI1Fz44Cvljj',
              name: 'Pauciarticular juvenile rheumatoid arthritis',
            },
            {
              id: 'seltgvner8NqT6h6B',
              name: 'Pediculosis',
            },
            {
              id: 'selho20bapGl5zaDy',
              name: 'Pediculosis, head',
            },
            {
              id: 'selybIzkQ4Ra8EMQY',
              name: 'Pelvic congestion syndrome',
            },
            {
              id: 'seldk3PRklPxi2Dab',
              name: 'Pelvic inflammatory disease',
            },
            {
              id: 'selfdO3wh9UJRaZyE',
              name: 'Peptic ulcer disease',
            },
            {
              id: 'selmXsbcahucIA9UW',
              name: 'Perforation of intestine',
            },
            {
              id: 'selMUc4QY0UYevRcL',
              name: 'Pericarditis, acute, nonspecific',
            },
            {
              id: 'sel8KkCfcK1fAMEVD',
              name: 'Periodontosis',
            },
            {
              id: 'selEXlxJt1VLYqSb4',
              name: 'Peripheral vascular disease',
            },
            {
              id: 'selkQUNc1iKbcvOqv',
              name: 'Peritonsillar abscess',
            },
            {
              id: 'selypXu6foHeUZdkf',
              name: 'Pervasive Developmental Delay',
            },
            {
              id: 'seljXpJZqmxcj0Qut',
              name: 'Pharyngitis, acute',
            },
            {
              id: 'sel9rJbrIpRh9Aj4v',
              name: 'Phlebitis, deep, lower extremity',
            },
            {
              id: 'selDp4kr8qXQ3pqLK',
              name: 'Pinworms',
            },
            {
              id: 'selo35xeaAqUv5mNf',
              name: 'Pityriasis rosea',
            },
            {
              id: 'seliHhfmbP5ugDfKf',
              name: 'Placenta previa, w/ bleeding',
            },
            {
              id: 'selfAW26PinsYwjRL',
              name: 'Placenta previa, w/o bleeding',
            },
            {
              id: 'selNqe4ZPuiBd1YbT',
              name: 'Plantar Fascitis',
            },
            {
              id: 'sel4fcmymTFVWNuM1',
              name: 'Pleural effusion',
            },
            {
              id: 'selWK57Bz2pBcNMjo',
              name: 'Plummers Disease',
            },
            {
              id: 'selZpY043BqqTYByc',
              name: 'Pneumonia',
            },
            {
              id: 'sel4uuXhDBprol9cY',
              name: 'Polycythemia vera',
            },
            {
              id: 'sel00rnqms8YqWdzd',
              name: 'Polymyalgia rheumatica',
            },
            {
              id: 'selns8ILVphLI6Fc8',
              name: 'Portal hypertension',
            },
            {
              id: 'sel30d1x1hasXKtqv',
              name: 'Post-term infant',
            },
            {
              id: 'selfMEBtEdiHFlBkb',
              name: 'Post-term pregnancy',
            },
            {
              id: 'selmbgb2EcNSR71jw',
              name: 'Postpartum follow-up, routine',
            },
            {
              id: 'selSLS4mRkR57OZWF',
              name: 'Pregnancy, other complications',
            },
            {
              id: 'seli04LrdRvHwwBsi',
              name: 'Pregnant state, incidental',
            },
            {
              id: 'selo2EJivfK9g2xcg',
              name: 'Premature beats',
            },
            {
              id: 'selLDhy8ylip21j9F',
              name: 'Premature ejaculation',
            },
            {
              id: 'selb1vm1G76wTqQuZ',
              name: 'Premenstrual tension syndrome',
            },
            {
              id: 'seltDtjjAMVh8oQ2q',
              name: 'Prenatal care, normal, first pregnancy',
            },
            {
              id: 'sel82loo7DSj499bl',
              name: 'Prostate',
            },
            {
              id: 'selIwU515hSh2nSSu',
              name: 'Prostatitis',
            },
            {
              id: 'selh7piGQVYYMzx2I',
              name: 'Prurigo',
            },
            {
              id: 'sel2nvtFfl6JUjfWI',
              name: 'Pruritus',
            },
            {
              id: 'sel5PTIQRbH1iDFrf',
              name: 'Pulmonary edema, acute',
            },
            {
              id: 'selOUmBvgXKCyspv7',
              name: 'Pulmonary embolism, not iatrogenic',
            },
            {
              id: 'selynOMENa14TVfgJ',
              name: 'Pyelonephritis, acute, w/o necrosis',
            },
            {
              id: 'selqzPtW8Q7oE7Y5g',
              name: 'Pyloric stenosis',
            },
            {
              id: 'selq0tFHk1R9Q5yma',
              name: 'Rape',
            },
            {
              id: 'sel4YLmnPpEAtenD1',
              name: 'Refractive errors',
            },
            {
              id: 'selDYkm7lXGtK2MMD',
              name: 'Renal failure',
            },
            {
              id: 'sel2IM7yqvWkEkMzb',
              name: 'Renal failure, acute',
            },
            {
              id: 'selvIkGnudW4TOrrx',
              name: 'Renal failure/insufficiency, chronic',
            },
            {
              id: 'selnJaUDbm3BrQHYe',
              name: 'Renal insufficiency, acute',
            },
            {
              id: 'sel0nL10CfL0iqOVp',
              name: 'Respiratory disease, other',
            },
            {
              id: 'selXiNaEw5jih4z3V',
              name: 'Respiratory distress syndrome',
            },
            {
              id: 'selHRRDHp2XDh8z0h',
              name: 'Respiratory problem, other',
            },
            {
              id: 'sel3mIbBrR9RO7cB3',
              name: 'Respiratory tract',
            },
            {
              id: 'selre6YSVvNyEzInb',
              name: 'Restless legs syndrome',
            },
            {
              id: 'selaiLRJ2dFNbYCjf',
              name: 'Retinal disorder',
            },
            {
              id: 'selPll4w1yfPBVip6',
              name: 'Rheumatic chorea',
            },
            {
              id: 'selWI0a73mxkoLOVD',
              name: 'Rheumatic heart disease',
            },
            {
              id: 'selHdYPCQdfsLeWjr',
              name: 'Rheumatoid arthritis',
            },
            {
              id: 'sela82DyIDUdbAhqe',
              name: 'Rheumatoid arthritis (not JRA)',
            },
            {
              id: 'selGoiFMYE8OiNYgr',
              name: 'Rhinitis, chronic',
            },
            {
              id: 'selCPv0uCqZX9N3b9',
              name: 'Salmonella gastroenteritis',
            },
            {
              id: 'selDm4NOzHm6XksjS',
              name: 'Scabies',
            },
            {
              id: 'sel1eYWJ7l29SmGfc',
              name: 'Sciatica',
            },
            {
              id: 'selLx0RvDQDC4Oh5L',
              name: 'Sebaceous cyst',
            },
            {
              id: 'selSLo53cmBIaP22D',
              name: 'Seborrheic dermatitis',
            },
            {
              id: 'selgKIHUCm2bOVRaM',
              name: 'Seborrheic keratosis',
            },
            {
              id: 'sel9Sgmm6EfzvJeVf',
              name: 'Sepsis',
            },
            {
              id: 'seld0AweLgfc3fnJi',
              name: 'Sepsis, neonatal',
            },
            {
              id: 'selcjiNQ4uUZiYXnm',
              name: 'Septicemia',
            },
            {
              id: 'selHzkqoAb3Oo3Mey',
              name: 'Sickle-cell disease',
            },
            {
              id: 'selP2ShsTHpNR9I14',
              name: 'Sickle-cell trait',
            },
            {
              id: 'sel7AHGXKyCmxDAHI',
              name: 'Sinusitis, acute',
            },
            {
              id: 'selsd9Xjmj51nutT8',
              name: 'Sinusitis, acute, frontal',
            },
            {
              id: 'selhSixpdSbAhd6Xs',
              name: 'Sinusitis, acute, maxillary',
            },
            {
              id: 'selvloBR5F4xfgJsZ',
              name: 'Sinusitis, chronic',
            },
            {
              id: 'selS3PH7hVQfPwopt',
              name: 'Sinusitis, chronic, frontal',
            },
            {
              id: 'seltQzHEdbevlRtZe',
              name: 'Sinusitis, chronic, maxillary',
            },
            {
              id: 'selCZpsgmtjdbbpEv',
              name: 'Skin',
            },
            {
              id: 'sel9AOXFTYiVU00w3',
              name: 'Skin condition, unspec',
            },
            {
              id: 'selmJHueXibMV4bYU',
              name: 'Skin, soft tissue neoplasm',
            },
            {
              id: 'selgwZZmlz6feH72L',
              name: 'Skin, uncertain behavior',
            },
            {
              id: 'selwtSJwtSOnfwOhC',
              name: 'Skin/temperature problem',
            },
            {
              id: 'sel4KIOUwaqiuotPC',
              name: 'Sleep apnea, obstructive',
            },
            {
              id: 'selsUeCB3VKZ5gcLc',
              name: 'Spondylolysis',
            },
            {
              id: 'sel0GUuVCLBvrnjjU',
              name: 'Sprain/strain: other site',
            },
            {
              id: 'sel9ZzjyZoMljmZSm',
              name: 'Sprain/strain: vertebral',
            },
            {
              id: 'selQ0Se5sIaqqfvoY',
              name: 'Staphylococcal food poisoning',
            },
            {
              id: 'selYV3Zctx4xxPgsB',
              name: 'Stephen Osotsi Omukakula',
            },
            {
              id: 'selxj7wim73siNAkz',
              name: 'Streptococcal meningitis',
            },
            {
              id: 'sel6NY4JJXYK6qaWh',
              name: 'Stricture',
            },
            {
              id: 'sel0cqAg00eXdmWCu',
              name: 'Stricture or kinking of ureter',
            },
            {
              id: 'selIpAsENbo7IEONz',
              name: 'Stye (hordeolum)',
            },
            {
              id: 'selsGMBFR5M72HSjr',
              name: 'Submucous leiomyoma of uterus',
            },
            {
              id: 'sel4VOAXvnXEMDr1M',
              name: 'Substance Abuse',
            },
            {
              id: 'selT7hsQfFaLJmh6F',
              name: 'Sudden infant death syndrome',
            },
            {
              id: 'selIV9ctAWIV9Ka1c',
              name: 'Supervision of normal first pregnancy',
            },
            {
              id: 'selV7TPC8bgHGpEJI',
              name: 'Swelling of limb',
            },
            {
              id: 'selXsWQySBOr1rjr6',
              name: 'Synovial cyst of popliteal space',
            },
            {
              id: 'selBwtrlj102NA9qr',
              name: 'Synovitis/tenosynovitis',
            },
            {
              id: 'selJJ6WojQY25Ad9A',
              name: 'Syphilis',
            },
            {
              id: 'selwA8IbYGVzpiY1i',
              name: 'Tachycardia, paroxysmal SVT',
            },
            {
              id: 'sel73ECZZJXaGfe4b',
              name: 'Threatened abortion',
            },
            {
              id: 'selGFe0vY7hhr2BT2',
              name: 'Thrombophlebitis',
            },
            {
              id: 'selvlYTwihoCVVFPV',
              name: 'Thyroid dysfunction',
            },
            {
              id: 'selLGY9e94EkWqNDL',
              name: 'Thyroid nodule',
            },
            {
              id: 'selDdLY9DEQm4dsR5',
              name: 'Tinea',
            },
            {
              id: 'sel69SIXoqA1VTUAH',
              name: 'Tinea nigra',
            },
            {
              id: 'self8UXOsEQP5hHxH',
              name: 'Tonsil/adenoid disease, chronic',
            },
            {
              id: 'selnfnH9aCxsECUKx',
              name: 'Tonsillitis, acute',
            },
            {
              id: 'selirNfxDMRbwZ5Xc',
              name: 'Trichomoniasis',
            },
            {
              id: 'selxA0rXD5KiQr1N6',
              name: 'Trigeminal neuralgia',
            },
            {
              id: 'selKO4TbPtKbbna0J',
              name: 'Tuberculosis, pulmonary',
            },
            {
              id: 'sel595aXdbmVz6sS7',
              name: 'Twins',
            },
            {
              id: 'selB8POUAP8n0mKre',
              name: 'Ulcer of heel and midfoot',
            },
            {
              id: 'sel0o2DVupG7bIi2B',
              name: 'Ulcer of other part of foot',
            },
            {
              id: 'selp0q1Pj11tJXvpx',
              name: 'Ulcer, skin, chronic',
            },
            {
              id: 'selDIESvvf3kUdpOv',
              name: 'Ulcerative colitis',
            },
            {
              id: 'selTUu9oyFqMy3GNX',
              name: 'Undernourished',
            },
            {
              id: 'seljyHIUDEDUMcZ5Z',
              name: 'Undescended testis',
            },
            {
              id: 'selS7MHECDSkKYcKa',
              name: 'Upper respiratory infection, acute',
            },
            {
              id: 'sel5iUf9Lb0D0WCBq',
              name: 'Urethral syndrome, non-VD',
            },
            {
              id: 'seltCmqWZ109UGbaT',
              name: 'Urethritis, nongonococcal',
            },
            {
              id: 'selP1Yp82eg1xCi4P',
              name: 'Urinary',
            },
            {
              id: 'selyaO8PRmK9vwrcE',
              name: 'Urinary obstruction',
            },
            {
              id: 'selrqBwaoP5xxHdPI',
              name: 'Urinary tract infection/pyuria',
            },
            {
              id: 'selvVvhQJKDcZpEfw',
              name: 'Urticaria',
            },
            {
              id: 'sellPKxyWv9PC7aRL',
              name: 'Uterine prolapse without mention of vaginal wall prolapse',
            },
            {
              id: 'sel1Dv4cDorkG37Xe',
              name: 'Uterovaginal prolapse',
            },
            {
              id: 'selZB5M5QhWIfNtmx',
              name: 'Varicocele',
            },
            {
              id: 'selQlF3FIt8AEYebs',
              name: 'Varicose Veins',
            },
            {
              id: 'selAMX9lnrJSh2sgv',
              name: 'Venereal disease',
            },
            {
              id: 'sel001RlYFSjrGRQG',
              name: 'Venous insufficiency',
            },
            {
              id: 'selyn5hYWd9frCgFx',
              name: 'Vertigo, central',
            },
            {
              id: 'selojReyjeP99OLak',
              name: 'Vertigo, peripheral',
            },
            {
              id: 'selBOWjqJWSW4I7Yc',
              name: 'Viral infection',
            },
            {
              id: 'selrjwgG3VQ1McgUn',
              name: 'Visual disturbance',
            },
            {
              id: 'sel5VkAXh9hEahgrE',
              name: 'Visual loss',
            },
            {
              id: 'selUipRMNPKzO6YuL',
              name: 'Vitamin A deficiency',
            },
            {
              id: 'selPioG2l2UiSzKEA',
              name: 'Vitiligo',
            },
            {
              id: 'selKMdovE04xo6RCG',
              name: 'Vomiting of pregnancy',
            },
            {
              id: 'selVq4paUid35bLRj',
              name: 'Warts, condyloma',
            },
            {
              id: 'selBrg0DLkZEAlqB7',
              name: 'Warts, viral',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selLWwx5TJCdYPAcS',
              name: 'Cold',
            },
            {
              id: 'sel8tQpmw5jiOxxR5',
              name: 'Dust',
            },
            {
              id: 'selAzGkB01aXEQWum',
              name: 'Exercise',
            },
            {
              id: 'selJRQ6iZd8BWBmh4',
              name: 'Other',
            },
            {
              id: 'selmXvP6oMpeQbxil',
              name: 'Smoke',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selC8a1G3HJtbNTbl',
              name: '1',
            },
            {
              id: 'selu9nlBYvESsTesn',
              name: '2',
            },
            {
              id: 'sel9hV2i5ePcGpDTl',
              name: 'At risk',
            },
            {
              id: 'sel2XGeVa7oo1K8h1',
              name: 'Elevated BP',
            },
            {
              id: 'selDfexeWMBb3BM2e',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel5oKpuaWkjDqXKZ',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel5oKpuaWkjDqXKZ',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel5oKpuaWkjDqXKZ',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selZcGMOCEpEazoOP',
              name: 'n/a',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selTCpz42BIdmNmgq',
              name: 'At risk',
            },
            {
              id: 'selDGW537J3HUCgY9',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selacEjklmMiI6ex6',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selC8a1G3HJtbNTbl',
              name: '1',
            },
            {
              id: 'selu9nlBYvESsTesn',
              name: '2',
            },
            {
              id: 'selwNBUMEouL4ajCW',
              name: '3',
            },
            {
              id: 'sel9hV2i5ePcGpDTl',
              name: 'At risk',
            },
            {
              id: 'selUQFw8a8iwksbLE',
              name: 'Prediabetes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel3tFZW5dPMLB7v1',
              name: 'At risk',
            },
            {
              id: 'selKCppgCVEfv4kVt',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel4sKWg8KenzsDmy',
              name: 'Mild',
            },
            {
              id: 'selwnyd25huDNkHCb',
              name: 'Moderate',
            },
            {
              id: 'selwPOO88KPvEqQBA',
              name: 'Severe',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selZcGMOCEpEazoOP',
              name: 'n/a',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seliJYSG8qCUc0rNp',
              name: 'Acute',
            },
            {
              id: 'seldc6c3ZkhzB3fqd',
              name: 'Mild chronic',
            },
            {
              id: 'selVO5TbhL842J3Bs',
              name: 'Moderate chronic',
            },
            {
              id: 'selJLUxKhZ0GWqw0D',
              name: 'Severe chronic',
            },
            {
              id: 'selWXMZuunAtGApaL',
              name: 'Sub-acute',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selUU9Mj8AY5qqkpT',
              name: 'n/a',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selUU9Mj8AY5qqkpT',
              name: 'Acute',
            },
            {
              id: 'selyIWTMhPSjiu5yT',
              name: 'Chronic',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selB03WdH0QGIZiZD',
              name: 'Asymptomatic',
            },
            {
              id: 'sel2DF2OwOUNJDftD',
              name: 'Symptomatic',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selMrfsFpKDzF2gmL',
              name: 'Intermittent',
            },
            {
              id: 'selqYGD6pSpPAanaY',
              name: 'Persistent',
            },
            {
              id: 'selBm9do9vBZR1AKO',
              name: 'Seasonal',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel94NRQ098jWYRTC',
              name: 'n/a',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selWPMcII4KIKp8S7',
              name: '1',
            },
            {
              id: 'selC8a1G3HJtbNTbl',
              name: '2',
            },
            {
              id: 'selu9nlBYvESsTesn',
              name: '3',
            },
            {
              id: 'selwNBUMEouL4ajCW',
              name: '4',
            },
            {
              id: 'selDfexeWMBb3BM2e',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selC8a1G3HJtbNTbl',
              name: '1',
            },
            {
              id: 'selu9nlBYvESsTesn',
              name: '2',
            },
            {
              id: 'selwNBUMEouL4ajCW',
              name: '3',
            },
            {
              id: 'selZcANrSKdScBxrg',
              name: '4',
            },
            {
              id: 'selDfexeWMBb3BM2e',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selC8a1G3HJtbNTbl',
              name: '1',
            },
            {
              id: 'selu9nlBYvESsTesn',
              name: '2',
            },
            {
              id: 'selwNBUMEouL4ajCW',
              name: '3',
            },
            {
              id: 'selDfexeWMBb3BM2e',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel7r72GpJnKh7Pcg',
              name: 'Acute',
            },
            {
              id: 'sel3X2yPOF2hWTpbs',
              name: 'Chronic',
            },
            {
              id: 'selyMiYe6RdYWBbUz',
              name: 'N/A',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          '"Have your symptoms been present for more than 3 months?"\n\nIf YES: Chronic\nIf NO: Acute',
      },
      {
        id: 'fldo520HOZqPtKnb9',
        name: 'Date of Diagnosis/Condition',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel9IpyZs0SWMwYz3',
              name: 'Active',
            },
            {
              id: 'selaXYqXEZDxfgg8m',
              name: 'HX',
            },
            {
              id: 'selVfUjNnIMJGWiQN',
              name: 'Inactive',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selvATYFIs0WyPkTv',
              name: 'Newly diagnosed',
            },
            {
              id: 'selmrx1pzivxK37Ty',
              name: 'Pre-existing',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selNmUXUgs0blyiAe',
              name: 'Controlled',
            },
            {
              id: 'selLL1SsYoRIUfwoO',
              name: 'Uncontrolled',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selv88lBNX8m2MMTO',
              name: 'Age',
            },
            {
              id: 'selnnygxnRDEwIxwL',
              name: 'Co-Morbidity',
            },
            {
              id: 'selFrXiqltSuoFJwp',
              name: 'Family History',
            },
            {
              id: 'selQJZTfSnr9lhvOC',
              name: 'History',
            },
            {
              id: 'selphMuZYGhOjmsxv',
              name: 'Lifestyle',
            },
            {
              id: 'sel0rxVbIPLpY9E1m',
              name: 'None',
            },
            {
              id: 'sel1rcEW3ZnnmzxRQ',
              name: 'Other',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selqQYR0Th0il30ly',
              name: 'BP < 120/80 mmHg',
            },
            {
              id: 'selICx9p9mGA6tw6S',
              name: 'BP < 130/80 mmHg',
            },
            {
              id: 'sel8SwYAorFVD47B4',
              name: 'Other',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel93NvV7OKXHI6CI',
              name: 'Symptom management',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel9k3fzh8tos4qYD',
              name: ' Asthma Score >20',
            },
            {
              id: 'selQRWZMtHbtMYPDK',
              name: '60% reduction in Nos of exacerbation',
            },
            {
              id: 'selYWGadjZsN3nhEh',
              name: '60% reduction in use of rescue inhaler',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sello0WTJL4qIxCYw',
              name: 'Symptom relief',
            },
            {
              id: 'selJffur2IsW5yLtv',
              name: 'Symptom relief and improve functionality',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selarENMIMWPdIzsG',
              name: 'Symptom management',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selp9fNHaRq1RLjhb',
              name: 'Symptom management',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selqxJyLCK91EdGpW',
              name: 'Symptom management',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selmb9J6Ufh7p6ho7',
              name: 'Total cholesterol <200mg/dL, LDL <130mg/dL, Triglycerides <200mg/dL',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selmb9J6Ufh7p6ho7',
              name: 'Triglycerides <200mg/dL',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selmb9J6Ufh7p6ho7',
              name: 'Total cholesterol <200mg/dL, LDL <130mg/dL',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seleHKE8nmzlZX9Uq',
              name: 'Symptom management',
            },
            {
              id: 'selIF5SfmRWTFEWRW',
              name: 'Symptom resolution',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel4JNDcgUtNwZkkz',
              name: 'Functional recovery',
            },
            {
              id: 'selNnYsZYTsS1HmP6',
              name: 'Pain control',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selIF5SfmRWTFEWRW',
              name: 'Eradication (6 week negative Stool Ag)',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selKs6aUyNQwJsF3W',
              name: 'HB1AC <6.5%, FBS <7 mmol/l',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selV9uzK4ko3VMf6C',
              name: 'HB1AC < 5.7%, FBS < 5.5 mmol/l',
            },
            {
              id: 'sel6pMhHP2MQ30Qvu',
              name: 'HB1AC < 6.5%',
            },
            {
              id: 'selsLSwY5JcIW0m0i',
              name: 'HB1AC < 6.5%, FBS < 7 mmol/l',
            },
            {
              id: 'sel6RCEUSFTpqJZHK',
              name: 'HB1AC < 7.5%, FBS < 7 mmol/l',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selT8AdQ2PHfDAzVq',
              name: 'HB1AC < 6.0%',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seleHKE8nmzlZX9Uq',
              name: 'Symptom management',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel0KnH5WVIs97CQs',
              name: 'Avoid progression of symptoms',
            },
            {
              id: 'selkcZDjbSjwHLmMf',
              name: 'Improved Functionality',
            },
            {
              id: 'sel8gRSEcy8xhFn3Z',
              name: 'Pain scale < 3',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selDYEN5AFr6NLZBI',
              name: '10% BMI reduction',
            },
            {
              id: 'selOyQCLoINbJ2UnR',
              name: '5% BMI reduction',
            },
            {
              id: 'selQtM8mZxri18u67',
              name: '7% BMI reduction',
            },
            {
              id: 'selr6Ros3LydLTckC',
              name: 'Other',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selVYdMz1Fnsg1KYm',
              name: 'N/A',
            },
          ],
        },
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
        id: 'fldUWLLD3IZwUhcDh',
        name: 'Condition Notes',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: null,
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
    name: 'Prescriptions',
    id: 'tbl3iBWzYVWEpdLje',
    fields: [
      {
        id: 'fldiB18lEynAzpg0t',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selFwOchdxLwbBG1B',
              name: 'ABACAVIR 300MG TABS',
            },
            {
              id: 'selxkwcm3lvojLpFh',
              name: 'ABIRATERONE ACETATE 250MG TABLETS',
            },
            {
              id: 'selg0GiFFM4F78Omb',
              name: 'ABITREXATE INJ 50mg/vial ',
            },
            {
              id: 'selK2gR8eERRm74Ua',
              name: 'ABZORB DUSTING POWDER',
            },
            {
              id: 'selNAXgev7RPTNq6K',
              name: 'ACETYLCYSTEINE 200mg ampule ( Martindale)',
            },
            {
              id: 'selY7RekicaQ6FhPY',
              name: 'ACETYLCYSTEINE 600MG TABS',
            },
            {
              id: 'selkZeiDhSPGW0eXT',
              name: 'ACETYLCYSTEINE INJ 10ML',
            },
            {
              id: 'selt1Ij1O3Fe2GU3B',
              name: 'ACT-HIB VACCINE 1DOSE (GSK)',
            },
            {
              id: 'selZT9fNM4yeLPKhC',
              name: 'ACTAL (CHEWABLE)',
            },
            {
              id: 'sel7efDcgj5hswmNe',
              name: 'ACTIFED COLD SYRUP 100MLS',
            },
            {
              id: 'selgSZzS9audCf0Iz',
              name: 'ACTIFED DRY COUGH AND COLD 100MLS',
            },
            {
              id: 'sel6idlcWoGaVb40W',
              name: 'ACTIFED PAED SYR 100ML',
            },
            {
              id: 'sel9CYcv1jTr8PjaX',
              name: 'ACTIFED WET COUGH & COLD 100MLS',
            },
            {
              id: 'selolnp0Qr0VXtMKu',
              name: 'ACTIGEM (GEMIFLOXACIN) 320MG TABS',
            },
            {
              id: 'sel9rK5dYwrOsvZdP',
              name: 'ACTINOMYCIN D INJECTION 0.5mg (Cosmegen Lyovac,Ovation)',
            },
            {
              id: 'sellxnZKCR6xGWHdx',
              name: 'ACYCLOVIR DENK 200mg TABLET (Acyclovir, Denk)',
            },
            {
              id: 'selHq9vBB5mRBHVNF',
              name: 'ACYCLOVIR DENK CREAM 5% 10g ',
            },
            {
              id: 'sel80J7IQBJUXC7n9',
              name: 'ACYCLOVIR INJ 250MG',
            },
            {
              id: 'sel4VP5XME7inPr83',
              name: 'ADACEL POLIO 1SSA',
            },
            {
              id: 'selfdBV8sJ6SixToY',
              name: 'ADENOSINE INJ 6MG2ML',
            },
            {
              id: 'selLi5XHovWLg6CqN',
              name: 'ADRENALINE 1MGML INJ',
            },
            {
              id: 'sel3dJvjhDLb8W4L7',
              name: 'ADRIAMYCIN 10MG(DOXORUBICIN)  INJ',
            },
            {
              id: 'selLX7tUkNAnnxuMM',
              name: 'ADRIAMYCIN 50MG (DOXORUBICIN) INJ',
            },
            {
              id: 'selwjdJCD0pnmI4zT',
              name: 'ADVANT 8MG TABS',
            },
            {
              id: 'sel14EgiBkmChG587',
              name: 'ADVANTAN CREAM 15G',
            },
            {
              id: 'selQNr2TCjMZHhzpa',
              name: 'ADVANTAN OINTMENT 15G',
            },
            {
              id: 'selTBk1pvel5jd3QT',
              name: 'ADVANTEC 16/12.5MG TABS',
            },
            {
              id: 'selnZ4mzAKR62pwxH',
              name: 'AERINAZE TABS 2.5/120 mg',
            },
            {
              id: 'selFk4Ob3nEWDmi6i',
              name: 'AERIUS SYRUP 150ml',
            },
            {
              id: 'selLisVLaJJiScCfZ',
              name: 'AEROCORT INHALER',
            },
            {
              id: 'selDF05gHiy7C07B3',
              name: 'AKINETON 2MG TABLET',
            },
            {
              id: 'sel2IgAT4EWpKxned',
              name: 'AKINETON INJ 5MG',
            },
            {
              id: 'selQbEBhp8OXhgnle',
              name: 'ALBENDAZOLE(ABZ) 400MG TABS',
            },
            {
              id: 'sel4inuEd6yOrVMtu',
              name: 'ALBENDAZOLE(ABZ) SYR 10ML',
            },
            {
              id: 'selzurIF60tiNqq79',
              name: 'ALDARA CREAM SATCHETS',
            },
            {
              id: 'selSIPVtYXFe4Lsm0',
              name: 'ALDOMET 500MG',
            },
            {
              id: 'sel9hajGWylSt2dLR',
              name: 'ALERID (CETRIZINE) SYR 5MG5ML',
            },
            {
              id: 'sel9YiMZMVaztkCpu',
              name: 'ALFARE 400GM',
            },
            {
              id: 'selusmjF3txAqAIIG',
              name: 'ALKERAN 2MG TABS.',
            },
            {
              id: 'selZ41lwXUL1ONlgM',
              name: 'ALKERAN 5MG TABS.',
            },
            {
              id: 'selTmSnyBwKd6HlF3',
              name: 'ALLEGIX 120MG TABS',
            },
            {
              id: 'selI2MAEVWl8RiQsv',
              name: 'ALLEGIX 180MG TABS',
            },
            {
              id: 'selmbtgJloyQzv5I4',
              name: 'ALLERDEX DROPS 8ML',
            },
            {
              id: 'selE0S9gyFHgomgHN',
              name: 'ALLERDEX E/E DROPS 8ML (, Tubilux)',
            },
            {
              id: 'sel3bT80gwfCxOfeH',
              name: 'ALLERGO COMOD EYE DROPS (DISCARD 12 WKS FROM DAY OF OPENING)',
            },
            {
              id: 'selddFX3mrzU4XPHW',
              name: 'ALLOPURINOL 100MG TABLETS',
            },
            {
              id: 'selUy1YUraam5zU0a',
              name: 'ALLOPURINOL 300MG TAB',
            },
            {
              id: 'selPestKtksgidS5u',
              name: 'ALOMIDE DROPS 5ML',
            },
            {
              id: 'selxsL3iGqpCmqvtn',
              name: 'ALPHAGAN EYE DROPS',
            },
            {
              id: 'selz2Oq0s0MiO5h50',
              name: 'ALTACEF 500MG TABS (AFTER A MEAL)',
            },
            {
              id: 'seltW63DjJ3GDPzVr',
              name: 'ALZOLAM 0.5MG TAB',
            },
            {
              id: 'sel8P6G3nIsoWtp6p',
              name: 'AMARYL 2MG TABS (WITH A MEAL)',
            },
            {
              id: 'selAzYz9vyCpZRpld',
              name: 'AMARYL2-M TABLETS (WITH A MEAL)',
            },
            {
              id: 'selbIQEo0c9rGLQ6W',
              name: 'AMIKACIN 500MG INJECTION',
            },
            {
              id: 'selGKVCy3FhK1lJlV',
              name: 'AMINOGARD LIQUID 200ML',
            },
            {
              id: 'sellEPxdHDvuiuDDd',
              name: 'AMINOGUARD SATCHETS',
            },
            {
              id: 'selRkwBgDT4y0ejYU',
              name: 'AMINOPHYLINE 2.5% INJ',
            },
            {
              id: 'seljlrvdDiMBNW1HT',
              name: 'AMINOPLASMA HEPA 500MLS',
            },
            {
              id: 'selYF7v3eb2QyZmMM',
              name: 'AMINOSTERIL KE 10% 500ML',
            },
            {
              id: 'selIQ8WbgCwiwNDaa',
              name: 'AMINOSTERIL N HEPA 8% 500ML',
            },
            {
              id: 'selzHLv8qT8O5Mlnf',
              name: 'AMIODARONE (CORDARONE)200MG TAB',
            },
            {
              id: 'selmUoSZIMtxcFjZB',
              name: 'AMIODARONE INJ. 150MG',
            },
            {
              id: 'sel0s9xE7dO4CAUaR',
              name: 'AMLIBON 5MG TABS',
            },
            {
              id: 'sel44DgrghuYeDRET',
              name: 'AMLOCIP 5MG TABS.',
            },
            {
              id: 'selbhH97GqZNOUOXU',
              name: 'AMLOCIP-NB 55MG TABS',
            },
            {
              id: 'selGSNyna22H5rit0',
              name: 'AMLOPRES-Z',
            },
            {
              id: 'selDkV9WlJXO77Irw',
              name: 'AMLOPRESS 5MG TABS',
            },
            {
              id: 'selMV7qYjz5eR7t7Z',
              name: 'AMLOSUN 5MG TABS',
            },
            {
              id: 'selrS1Yo5XRvY4fog',
              name: 'AMLOZAAR-H',
            },
            {
              id: 'sel0gxXXXqNTex2UX',
              name: 'AMOXIL CAPSULE 250MG',
            },
            {
              id: 'sel5QcBN6oHEqQou4',
              name: 'AMOXIL CAPSULE 500MG',
            },
            {
              id: 'sel2Z3QrxR3uB9gnx',
              name: 'AMOXIL FORTE 250MG5ML100ML(STORE IN FRIDGE)',
            },
            {
              id: 'sel8Pk4rQScW0mxRL',
              name: 'AMPHOTERICIN 50MG INJ',
            },
            {
              id: 'selNIPJ2tl6bBsidJ',
              name: 'AMPICILLINCLOXACILLIN TABS',
            },
            {
              id: 'sel5SdcxPf5GEJNmE',
              name: 'AMPICLOX 250MG5ML SUSP',
            },
            {
              id: 'selfE4Tp7QyNqiUnA',
              name: 'AMPICLOX NEONATAL DROPS',
            },
            {
              id: 'selR1OKl5I76Sxyw2',
              name: 'AMTEL 40MG/5MG TABS',
            },
            {
              id: 'sel1tzqHw0qmFqwfh',
              name: 'AMTEL 80/10MG TABS',
            },
            {
              id: 'selGVeAutnXWPiu6f',
              name: 'AMZART TABS',
            },
            {
              id: 'selKFAohYOHlcJLov',
              name: 'ANAFRANIL 10MG TABLETS',
            },
            {
              id: 'selPtAKsFsROiwjnp',
              name: 'ANDOLEX MOUTH GARGLE( DO NOT SWALLOW)',
            },
            {
              id: 'selMO9Qtkcvfdgk4D',
              name: 'ANDOLEX-C SPRAY',
            },
            {
              id: 'seluQqPSPOOa516hh',
              name: 'ANGIZAAR 50MG TABS',
            },
            {
              id: 'selIhjf5rYK2GY7jX',
              name: 'ANGIZAAR-H TABS',
            },
            {
              id: 'selsZWvkhv48X5jhx',
              name: 'ANTABUSE 200MG TABS',
            },
            {
              id: 'selKWRAkp79QIIsxO',
              name: 'ANTABUSE 400MG TABS',
            },
            {
              id: 'selvPatG8sINpLOCc',
              name: 'ANTI D 300MCG (STORE IN THE FRIDGE)',
            },
            {
              id: 'selvK6khCyH0ZfDHK',
              name: 'ANTI SNAKE VENOM(POLYVALENT)',
            },
            {
              id: 'sel38Hh2DuenBR6cE',
              name: 'ANTI-KALIUM 15G SATCHETS',
            },
            {
              id: 'selfnPcfKFarCqRDh',
              name: 'ANTI-RABIES VACCINE',
            },
            {
              id: 'selsjht8MIfTOjOvY',
              name: 'ANTI-SNAKE VENOM in 10ml ampoules (Pasteur Merieux)',
            },
            {
              id: 'selW0qfdUbTgXqvjE',
              name: 'ANTIGLOBULIN',
            },
            {
              id: 'selIIuFMxXwLUGwqF',
              name: 'ANUSOL OINTMENT 25G',
            },
            {
              id: 'sel2RwWGwoR4lGxAa',
              name: 'APDROPS EYE DROPS (MOXIFLOXACIN)',
            },
            {
              id: 'sel5FO5H0M2tK8vJf',
              name: 'APRAZOLE PLUS - 20 (DISSOLVE IN 2 TABLESPOONS OF WATER)',
            },
            {
              id: 'selnq4cyBPRx1635n',
              name: 'APRESOLINE 20MG INJ',
            },
            {
              id: 'sel0HGcp7ZeEJXlqm',
              name: 'APRESOLINE 25MG TABLETS',
            },
            {
              id: 'selmU1BLtsXfOEvWh',
              name: 'APROVASC TAB 150/5MG',
            },
            {
              id: 'selzuXDnwvAn4z1ys',
              name: 'APROVASC TABS 150/10MG',
            },
            {
              id: 'sel3NSjJEhy5do5hT',
              name: 'APROVASC TABS 300/10MG',
            },
            {
              id: 'selKNAwOIhGI3uERz',
              name: 'APROVASC TABS 300/5MG',
            },
            {
              id: 'seldHbCtVTtzv7mP0',
              name: 'APROVEL 150MG',
            },
            {
              id: 'sel4jN3026fSyTCgU',
              name: 'APROVEL 300MG TABS',
            },
            {
              id: 'sel136NNDAkFjzMNT',
              name: 'AQUEOUS CREAM 500G',
            },
            {
              id: 'seljeCZnV80B5QYNE',
              name: 'AQUEOUS CREAM 50G',
            },
            {
              id: 'selJninLujPZhzpEO',
              name: 'ARICEPT 5MG TABS',
            },
            {
              id: 'selPXVYaHdQGNCtda',
              name: 'ARIMIDEX 1MG TABLET',
            },
            {
              id: 'selnuVZbK81XrCQ5O',
              name: 'ARIPIPRAZOLE 10MG TAB',
            },
            {
              id: 'selxfD6t8mxkA7RnC',
              name: 'ARIPIPRAZOLE 15MG TABS',
            },
            {
              id: 'selx6UKRbJ6RPswkC',
              name: 'ARIPIPRAZOLE 30MG TABS',
            },
            {
              id: 'selLkmGclmtBlPEC3',
              name: 'ARIXTRA 2.5MG INJ',
            },
            {
              id: 'selHJfl418Gza1AxW',
              name: 'ARIXTRA 7.5MG INJ',
            },
            {
              id: 'sel8IuVZ1mIOdKzxe',
              name: 'ARTESUNATE 60MG INJ',
            },
            {
              id: 'selT42LcUFApHDt95',
              name: 'ARTESUNATE INJ 30MG',
            },
            {
              id: 'sel84Etqm9M9H0U95',
              name: 'ARTESUNATE INJ. 120MG',
            },
            {
              id: 'selvGYwo9Gtt4NF3A',
              name: 'ASCORIL EXP SYR 100ML',
            },
            {
              id: 'selRLW5gaNe3Ym7Sm',
              name: 'ASCORIL EXP SYR 200ML',
            },
            {
              id: 'seldFNbsTU3ORFghm',
              name: 'ASCORIL-D SYRUP',
            },
            {
              id: 'selMmDm8WjMbkGjSd',
              name: 'ASOMEX 5MG TABS',
            },
            {
              id: 'selUe6g5s0m7yPXsI',
              name: 'ASOMEX D(Amlodipine 2.5 and hctz12.5)',
            },
            {
              id: 'selRML2x7VqbwM9WE',
              name: 'ASOMEX D5 (Amlodipine 5mg hctz)',
            },
            {
              id: 'seleyRxdgvOhG1xmQ',
              name: 'ASOMEX-LT (AMLODIPINE 2.5MG/LOSARTAN 50MG)',
            },
            {
              id: 'sel15QzO2iaBpovzL',
              name: 'ASPARAGINASE INJ 10,000IU',
            },
            {
              id: 'selUnhohEKl2R7RJz',
              name: 'ASPEGIC SATCHET 250MG',
            },
            {
              id: 'selOFXT8D9hlpM1Y9',
              name: 'ASTYMIN CAPSULES',
            },
            {
              id: 'selRPZQ1m65cehMkq',
              name: 'ASTYMIN SYRUP',
            },
            {
              id: 'selmhI4d1U1V23YOv',
              name: 'ASUNRA  100MG (DEFERASIROX) TABLETS',
            },
            {
              id: 'sel4OGrwRqvNGiHrs',
              name: 'ASUNRA  400MG (DEFERASIROX) TABLETS',
            },
            {
              id: 'selVrJpQvhsCCljoa',
              name: 'ATACAND PLUS TABS(32/25mg)',
            },
            {
              id: 'selhI151XYm7c61c2',
              name: 'ATAZOR R',
            },
            {
              id: 'selZj0GgykEewf9D1',
              name: 'ATECARD 100MG TABS',
            },
            {
              id: 'selfdRfPLsYD2TwRn',
              name: 'ATECARD 50MG TABS',
            },
            {
              id: 'sel8hx45gno13Siah',
              name: 'ATECARD-D TABLETS',
            },
            {
              id: 'selEtD0AqHGHf9BeK',
              name: 'ATENOLOL 25MG',
            },
            {
              id: 'selfo1FqOpDuu9a3n',
              name: 'ATENOLOL 50MG TABS',
            },
            {
              id: 'selw1Rl1P9VzHIgpi',
              name: 'ATIVAN 1MG TABS.',
            },
            {
              id: 'sel3B7H1DFVZMkJSi',
              name: 'ATIVAN 2MG TABS.',
            },
            {
              id: 'selMnUqkZILxDPwXE',
              name: 'ATRACURIUM 10MG/ML 5ML',
            },
            {
              id: 'selfjek7q5fB29hDm',
              name: 'ATRIPLA 600200300 TABS',
            },
            {
              id: 'selKXdKoGuyQsGuOz',
              name: 'ATROPINE EYE DROPS 0.5%(UK)',
            },
            {
              id: 'selbvQrtRzjpx2g12',
              name: 'ATROPINE INJ 0.6MG',
            },
            {
              id: 'selPUJ1GS9agdF6ep',
              name: 'ATROPINE INJ 0.6mg/ml in 1ml ampoules (Le Renaudin France)',
            },
            {
              id: 'selCpkzslFkPnBgnC',
              name: 'ATROVENT 500MCG2ML NEB. SOLN',
            },
            {
              id: 'sel2dd4N3vkPrLcBt',
              name: 'ATROVENT MD INHALER 10ML',
            },
            {
              id: 'seld4CY9schWUXfUG',
              name: 'ATROVENT NEBUL. SOLN 250MCG',
            },
            {
              id: 'sel9Awksc7advFwGG',
              name: 'AUGMENTIN 1.2G INJ',
            },
            {
              id: 'selJEEWxeTeOWamiq',
              name: 'AUGMENTIN 1G TABS ( JUST BEFORE A MEAL)',
            },
            {
              id: 'selxACU5cqEsmJxQl',
              name: 'AUGMENTIN 228MG5ML SYR(STORE IN FRIDGE)',
            },
            {
              id: 'selJ6Sd9COMROqAae',
              name: 'AUGMENTIN 375MG TABS( JUST BEFORE A MEAL)',
            },
            {
              id: 'selKBakd5sn44crvJ',
              name: 'AUGMENTIN 600MG INJ',
            },
            {
              id: 'selwDK3ZWWDf6BFDB',
              name: 'AUGMENTIN ES SYR(642.9MG5ML(STORE IN FRIDGE)',
            },
            {
              id: 'seljDOwY11PMWGwj5',
              name: 'AUROMITAZ (CEFTAZIDIME) 1GM',
            },
            {
              id: 'selOjdTVQHRVcVhAQ',
              name: 'AUROTAZ-P INJ 2.25',
            },
            {
              id: 'selFixCmn7EeYsswD',
              name: 'AUROTAZ-P INJ 4.5G',
            },
            {
              id: 'selEUzljUqNJlAfPH',
              name: 'AUROXONE 1G INJECTION',
            },
            {
              id: 'selP3vuNsPDpUCnlS',
              name: 'AUROZIL 125MG/5ML (STORE IN THE FRIDGE)',
            },
            {
              id: 'selsskl9AledBLvwu',
              name: 'AUROZIL 250MG/5ML (STORE IN THE FRIDGE)',
            },
            {
              id: 'selDwGIznubqICClm',
              name: 'AUROZIL 500MG',
            },
            {
              id: 'selEaYHhqBbrCoeZ1',
              name: 'AVALIFE ADVANCE RESCUE(PRO BIOTIC)',
            },
            {
              id: 'selKDkJg2JFBdI98b',
              name: 'AVALIFE DAILY FLORA BALANCED(PRO BIOTIC)',
            },
            {
              id: 'selrHx7phOgBIAxON',
              name: 'AVASTATIN 20mg',
            },
            {
              id: 'selnKIfe0pDRmZGUc',
              name: 'AVAXIM VACCINE 160UNITS/DOSE ADULT ( Pasteur Merieux)',
            },
            {
              id: 'selPhttLFq4o8NRNv',
              name: 'AVAXIM VACCINE 8O UNITS/DOSE PAED (Pasteur Merieux)',
            },
            {
              id: 'seldQpatiPjdbnlu2',
              name: 'AVELOX 400MG INFUSION',
            },
            {
              id: 'selNvEtP8aecGYNT8',
              name: 'AVELOX 400MG TABS.',
            },
            {
              id: 'selBxCDNH0r4yI10F',
              name: 'AVODART 0.5MG TABS',
            },
            {
              id: 'selMMjHQ0BTMP7PTg',
              name: 'AVSAR 160/10MG TABS',
            },
            {
              id: 'selHTyzKz3mLiQs9r',
              name: 'AVSAR 160/5MG TABS',
            },
            {
              id: 'selE1Jgd5zu6bKKWm',
              name: 'AZITHRAX 500MG TABS(1HOUR BEFORE A MEAL)',
            },
            {
              id: 'selHvDFG8ceQmnSmn',
              name: 'AZITHRAX SUSP 15ML 200MG/5ML(1HOUR BEFORE A MEAL)',
            },
            {
              id: 'sel50IzwE018iTv7p',
              name: 'AZITHRAX SUSP 30ML 200MG/5ML(1HOUR BEFORE A MEAL)',
            },
            {
              id: 'sel0PtEgu5xELpHNm',
              name: 'AZTOR 10MG TABS.(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selvzyGT6IwFhjpS7',
              name: 'AZTOR 20MG TABS..(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selbK7f83sJtllOaM',
              name: 'AZTOR 40MG TABS..(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'seliQUnpJLH8ZGdcj',
              name: 'AZTOR-EZ TABLETS .(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selrHcqlhlBBgCb91',
              name: 'Actilyse 50mg',
            },
            {
              id: 'selGfMV4ZwZqj0DKC',
              name: 'Acular 5ml',
            },
            {
              id: 'selw9WMqhHg0xMPml',
              name: 'Adalat 20mg',
            },
            {
              id: 'seliyMyrTIfW2IUVQ',
              name: 'Adalat 30mg',
            },
            {
              id: 'seluG7gzsQ8mZpQ5w',
              name: 'Adalat 60mg',
            },
            {
              id: 'selDcDCGEqNw5oAcW',
              name: 'Additrace  10ml',
            },
            {
              id: 'seldUWkC0uGQc7q5L',
              name: 'Adol 125mg ',
            },
            {
              id: 'selHnfzM87eeqdG1w',
              name: 'Adol 250mg ',
            },
            {
              id: 'selKYrdF5tij9dxMX',
              name: 'Advant 16mg ',
            },
            {
              id: 'selyvV5EeiVwLYBte',
              name: 'Aerius 5mg ',
            },
            {
              id: 'selAZnSe0nZng7M0G',
              name: 'Aerovent',
            },
            {
              id: 'selxM2qUAflRn4OPj',
              name: 'Airtal 100mg',
            },
            {
              id: 'selhBf4ozOL2mzq7j',
              name: 'Airtal 100mg ',
            },
            {
              id: 'sel5E2RR1zHNXBXS2',
              name: 'Aldactone  25mg',
            },
            {
              id: 'selDfFrz2Y0DODagv',
              name: 'Aldactone 100mg',
            },
            {
              id: 'selJIQsvaEmd5VI7K',
              name: 'Aldara',
            },
            {
              id: 'selwifQHfrnKiTWgb',
              name: 'Aldomet 250mg',
            },
            {
              id: 'sel870AnKzwWH9K6u',
              name: 'Allergo -comod 10ml',
            },
            {
              id: 'selZ9dWJu1N8mlR82',
              name: 'Almex 400mg',
            },
            {
              id: 'selBAHSvhWDRUi0O2',
              name: 'Altacef',
            },
            {
              id: 'selbsOus3IOzqVxs3',
              name: 'Aluvia',
            },
            {
              id: 'selTn2SkS6yf3TcUP',
              name: 'Alzolam 0.25mg',
            },
            {
              id: 'selxtTNBVisX6dFNu',
              name: 'Amaryl 1mg',
            },
            {
              id: 'selTvgzoCTFtpKSSy',
              name: 'Amaryl 4mg',
            },
            {
              id: 'selSnLFDYNPDa7pDm',
              name: 'Amitriptyline 25mg',
            },
            {
              id: 'selKe3wJHto5BbIB6',
              name: 'Amlibon 10mg',
            },
            {
              id: 'selSrKZpaqodU19cX',
              name: 'Amlosun 10mg',
            },
            {
              id: 'selaHmlb8q021lIoG',
              name: 'Amlozaar',
            },
            {
              id: 'selP1HnvHSZmU8e3M',
              name: 'Amoxicillin 500mg',
            },
            {
              id: 'selyogVpRCNJwPyx9',
              name: 'Amoxil 125mg ',
            },
            {
              id: 'seleywZqe9kcnRqLd',
              name: 'Amoxil 250mg ',
            },
            {
              id: 'selocT2nahEL4AvJs',
              name: 'Amoxil 500mg',
            },
            {
              id: 'sel5ce96n4BBd6L1U',
              name: 'Ampiclox 250mg',
            },
            {
              id: 'selR1FdM9iNcFq2bm',
              name: 'Ampiclox 500mg',
            },
            {
              id: 'selW1p6DAqOFoH7Z9',
              name: 'Anafranil 25mg',
            },
            {
              id: 'selsSWHDt0xi4588a',
              name: 'Andriol 40mg',
            },
            {
              id: 'selBp0NPmaXIPgiqI',
              name: 'Anexate 0.5mg',
            },
            {
              id: 'selcHmkKjmrbG3t4i',
              name: 'Anusol',
            },
            {
              id: 'sel0mMsZJNG0k1igT',
              name: 'Approvel 150mg',
            },
            {
              id: 'seltQYgXLuHhuRbnm',
              name: 'Approvel 300mg',
            },
            {
              id: 'selscR7SVKB407zyw',
              name: 'Aprazole plus',
            },
            {
              id: 'selNSgfaSBvxeoRPK',
              name: 'Aprovasc',
            },
            {
              id: 'sele6IFBq1y6w9AaM',
              name: 'Aprovasc  5/150mg',
            },
            {
              id: 'selPifyavwD0in1bt',
              name: 'Aprovasc 10/300mg',
            },
            {
              id: 'selGKThlyCecazBH2',
              name: 'Arbitel 40mg ',
            },
            {
              id: 'selts5qRsGtnSxNJr',
              name: 'Arbitel 40mg H',
            },
            {
              id: 'selQhzI1KoksyoCoD',
              name: 'Arbitel 80mg ',
            },
            {
              id: 'seloweDijIVu6AvNP',
              name: 'Arbitel 80mg H',
            },
            {
              id: 'self7zULtXTOJ0yNa',
              name: 'Arcalion 200mg',
            },
            {
              id: 'selqwz8PlTAHrhrOT',
              name: 'Arcocxia 120mg ',
            },
            {
              id: 'selRCDprRwGvjiY5w',
              name: 'Arcocxia 60mg ',
            },
            {
              id: 'sell3s6sS76arVQH4',
              name: 'Arcocxia 90mg ',
            },
            {
              id: 'seldkHo5wkQYjFdNI',
              name: 'Artenam 120mg',
            },
            {
              id: 'selwtlFYeS2uSFSc4',
              name: 'Artenam 60mg',
            },
            {
              id: 'seloY0uvlF6HNNdb0',
              name: 'Artesun 120mg',
            },
            {
              id: 'selKI9XSWWg69EZee',
              name: 'Artesun 60mg',
            },
            {
              id: 'selEKWYidLhxJZh7A',
              name: 'Ascard 75mg',
            },
            {
              id: 'selfxxOuwGQhsm156',
              name: 'Ascoril',
            },
            {
              id: 'selCdndjtemNs6jI7',
              name: 'Ascoril Expectorant',
            },
            {
              id: 'selsm1D80SqhbAUPd',
              name: 'Asomex 2.5mg',
            },
            {
              id: 'selMcKzbs0Dp4yByc',
              name: 'Aspergic 1gm',
            },
            {
              id: 'selsfiMcLu3Vlxqdy',
              name: 'Aspergic 500mg',
            },
            {
              id: 'sel34TDpyswUqIEhI',
              name: 'Asprin cardio ',
            },
            {
              id: 'selwMnKWCY3Ea7fEd',
              name: 'Asthalin 100mcg',
            },
            {
              id: 'selTzZUja1520tG6H',
              name: 'Atacand 16mg',
            },
            {
              id: 'sel4sPFL65NoFp9pL',
              name: 'Atacand 32mg',
            },
            {
              id: 'selID4ZoWvw1NqCHc',
              name: 'Atacand 8mg',
            },
            {
              id: 'selW6HUGjGajLcDyg',
              name: 'Atacand Plus 16/12.5mg',
            },
            {
              id: 'selRMDoXm7nGB63Y6',
              name: 'Aterax 2mg/ml ',
            },
            {
              id: 'selbjTn2EtyFHwkEO',
              name: 'Atovastatin',
            },
            {
              id: 'sel7PpE91H3zVJlrP',
              name: 'Atripla ',
            },
            {
              id: 'selYeD3dnbK0RGCmD',
              name: 'Atropine 1mg',
            },
            {
              id: 'selv1jsbB71CfR5vT',
              name: 'Atrovent 500mcg/2ml',
            },
            {
              id: 'selNBZ0i9us5nG6l3',
              name: 'Augmentin 457mg ',
            },
            {
              id: 'sel45nKvaMPiCJYsF',
              name: 'Augmentin 625mg',
            },
            {
              id: 'selGNg5GnbSVr3QU0',
              name: 'Augmentin 625mg ',
            },
            {
              id: 'selvnqAi4Ajr1lqbH',
              name: 'Auropodox 200mg',
            },
            {
              id: 'selaupq9QmK38hfTK',
              name: 'Avamys',
            },
            {
              id: 'selmzwT14H8qYpCdk',
              name: 'Avamys ',
            },
            {
              id: 'selK6fN9AjHZ1hLFe',
              name: 'Avastatin',
            },
            {
              id: 'selLX5zNJAKpPQyDS',
              name: 'Avodart 0.5mg',
            },
            {
              id: 'sel4xK0IqxrG6vWE2',
              name: 'Axacef 500mg',
            },
            {
              id: 'selyCWIonWbe8AlSc',
              name: 'B-IMMUNE SATCHET 40G',
            },
            {
              id: 'selyHaQc7P1Y09ATw',
              name: 'BABYMOL (AFTER A MEAL)',
            },
            {
              id: 'selzAThzEOd90KU8P',
              name: 'BACLOFEN 10MGTABLETS',
            },
            {
              id: 'selHjihVdO3JhxPZn',
              name: 'BACQURE 500MG INJ',
            },
            {
              id: 'selA4qDT7MfZj7VgO',
              name: 'BACTACEF 500500MG INJ',
            },
            {
              id: 'sel2w26MGTVeqL0dq',
              name: 'BACTROBAN CREAM 15G',
            },
            {
              id: 'selNMKQ6fgSEYvZd3',
              name: 'BACTROBAN OINTMENT 15G',
            },
            {
              id: 'selwshndkaHJJ7aBQ',
              name: 'BANEOCIN OINTMENT 20G',
            },
            {
              id: 'selAguRdMGKmiyZDL',
              name: 'BANEOCIN POWDER',
            },
            {
              id: 'selfwq0qzcsAc00Fa',
              name: 'BAROLE 20MG TABS(1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selmIKJ5V6mFnyNeA',
              name: 'BCG VACCINE',
            },
            {
              id: 'selrvWNK3Wno55Yrd',
              name: 'BECLATE-200D INHALER',
            },
            {
              id: 'selzorYL2pbwTFkki',
              name: 'BECLOMIN OINT',
            },
            {
              id: 'selk8O4i1U4eLPlIr',
              name: 'BENDURIC 2.5MG TABS',
            },
            {
              id: 'sela54dnoK3ncnMLB',
              name: 'BENDURIC TABLETS 5MG',
            },
            {
              id: 'selHF46yi1TW8hdDK',
              name: 'BENNETTS BABY BAR 100G',
            },
            {
              id: 'selF9fxDIx2bGfUlZ',
              name: 'BENYLIN 4 FLU 200ML SYR(CONTAINS PARACETAMOL)',
            },
            {
              id: 'selyj6YuCQHHzxy8Y',
              name: 'BENYLIN DRY COUGH',
            },
            {
              id: 'selkIA0ewHoIdAjl5',
              name: 'BENYLIN EXPECTORANT SYR',
            },
            {
              id: 'selPFJNx0LvfqndM4',
              name: 'BENYLIN PAED 125MLS',
            },
            {
              id: 'selP9O8bqEAxVTWih',
              name: 'BENYLIN WITH CODEINE SYR ( MAY CAUSE DROWSINESS)',
            },
            {
              id: 'selm2Jj7wXarxZ7s3',
              name: 'BENZATHINE PENICILLIN 2.4INJ',
            },
            {
              id: 'sell7htcQptE2DHsF',
              name: 'BENZHEXOL TABLETS 5MG',
            },
            {
              id: 'selFXeqdy77wmwsO2',
              name: 'BEPANTHEN OINT 30G',
            },
            {
              id: 'selwg1HJK6Thzu3FV',
              name: 'BEROTEC 150MLS LIQUID',
            },
            {
              id: 'selkRaFofKPGeZZO7',
              name: 'BETADINE OINTMENT 40G',
            },
            {
              id: 'selaazpvO64lK5dRa',
              name: 'BETADINE SCRUB SOLUTION',
            },
            {
              id: 'sel3OMhQS7nUoEw6Q',
              name: 'BETADINE VAG. DOUCHE KIT',
            },
            {
              id: 'selMtyApzxllOMaCl',
              name: 'BETAGAN EYE DROPS 5ML (Allergan)',
            },
            {
              id: 'seleFPInzf8U7IsWj',
              name: 'BETALOC 100MG TABLETS',
            },
            {
              id: 'selC7bOi1CdYtH5eB',
              name: 'BETALOC 25MG TABS',
            },
            {
              id: 'selJVJwWDyfskDDHS',
              name: 'BETALOC 50MG TABS',
            },
            {
              id: 'selRDBlsPoaZXDX7C',
              name: 'BETALOC ZOK 200MG TABLETS',
            },
            {
              id: 'seltXd5JXlNJg9NIw',
              name: 'BETAMETHASONE EYE DROPS',
            },
            {
              id: 'sel4YlOBkJzBaRYPv',
              name: 'BETAPYN TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selCgOFgB2Ji2lamJ',
              name: 'BETASALIC LOTION',
            },
            {
              id: 'selhgl7qdJgKCCzMC',
              name: 'BETASERC TABLET',
            },
            {
              id: 'selA0NiAiAL4u1Kv0',
              name: 'BETASERC Tablet(s)',
            },
            {
              id: 'selHXaewX1iBYSSyF',
              name: 'BETASONE OINTMENT 15G',
            },
            {
              id: 'selWJPtBVTi3ZaIaO',
              name: 'BETNOVATE CREAM 15G',
            },
            {
              id: 'selZgnlnyTNZLoeid',
              name: 'BETNOVATE OINTMENT 15G',
            },
            {
              id: 'selNyHnLCa6hz48jD',
              name: 'BETNOVATE-N CREAM 15G',
            },
            {
              id: 'selQKdirAfHlYTa0S',
              name: 'BETOPTIC EYE DROPS 5ML (Alcon)',
            },
            {
              id: 'seliwOeGSGr1Rb7iY',
              name: 'BI-PRETERAX 10/2.5MG TABS',
            },
            {
              id: 'selZLRcbNxtnJdxXc',
              name: 'BI-PRETERAX 5/1.25MG TABS',
            },
            {
              id: 'selm4dwrv422Dnbww',
              name: 'BILTRICIDE 600MG',
            },
            {
              id: 'selhB4wmCsurzRRXG',
              name: 'BIODROXIL 1000MG CAPSULES (AFTER A MEAL)',
            },
            {
              id: 'selsEjVwazoBIUpZq',
              name: 'BIODROXIL 500MG CAPS (AFTER A MEAL)',
            },
            {
              id: 'seljHvwuwXEmRdI7H',
              name: 'BIODROXIL SUSPENSION 125MG/ML',
            },
            {
              id: 'selkc46mL5Xj3NUAX',
              name: 'BIODROXIL SUSPENSION 250MG/ML',
            },
            {
              id: 'seliK5ckcTjZTADxg',
              name: 'BIOFLOR SATCHETS 250MG',
            },
            {
              id: 'selGSTTy3gLdQjsFl',
              name: 'BIOGAIA',
            },
            {
              id: 'sel2EypZ34tAfBXNX',
              name: 'BISACODYL 5MG TABLETS',
            },
            {
              id: 'selcGt2JKBVKe7BQS',
              name: 'BISOLVON ELIXIR 200ML',
            },
            {
              id: 'sel7QI1uKCecVqy2g',
              name: 'BISOPROLOL (CONCOR) 10MG TABS',
            },
            {
              id: 'selvU9FUGOauKxr5P',
              name: 'BISOPROLOL (CONCOR) 2.5MG TABS',
            },
            {
              id: 'sel0EOKnkdrtthcB0',
              name: 'BISOPROLOL (CONCOR) 5MG TABS',
            },
            {
              id: 'sel9tW1hUlTxOrwd1',
              name: 'BISPANOL SYRUP 100MLS (AFTER A MEAL)',
            },
            {
              id: 'selNqij8Ux1EraQtx',
              name: 'BISPANOL SYRUP 60MLS (AFTER A MEAL)',
            },
            {
              id: 'selJQjKqMS508IAMt',
              name: 'BLASTOVIN INJ 10mg/vial (Teva)',
            },
            {
              id: 'sel2eFbEnjkUVRekD',
              name: 'BLEOCIP INJ 15mg/vial ',
            },
            {
              id: 'selv2GBh6UDt4Acmu',
              name: 'BLISTEZE 5GM CREAM',
            },
            {
              id: 'seldqTbllGNUkK3V3',
              name: 'BONDRONAT 6MG INJ',
            },
            {
              id: 'sellu9f9ctMZpvIZ1',
              name: 'BONJELA ADULT GEL',
            },
            {
              id: 'selkdp5G2eGROBmYz',
              name: 'BONJELA TEETHING GEL',
            },
            {
              id: 'selBkgz6XVwCUCMcB',
              name: 'BONNISAN SYRUP 120ML',
            },
            {
              id: 'sel5BZwzIeiRTeaod',
              name: 'BONNIUM TABS',
            },
            {
              id: 'selKZSvErraF5ASSu',
              name: 'BONVIVA INJ 3MG',
            },
            {
              id: 'selj3h2S3IhtRqmPr',
              name: 'BORIC ACID POWDER',
            },
            {
              id: 'selChN0LbhAAPokVz',
              name: 'BORTEZOMID 3.5MG',
            },
            {
              id: 'selnC7ibNXp07ABST',
              name: 'BOSENTUS TABS 62.5MG',
            },
            {
              id: 'selhzIRA5XVF0WExF',
              name: 'BRALIX TABS.[LIBRAX] GENERIC',
            },
            {
              id: 'selLetHFmYteFjY0g',
              name: 'BREATHEAZY (MONTELUKAST) 10MG',
            },
            {
              id: 'selOP8cI1DYJwymHk',
              name: 'BREATHEAZY (MONTELUKAST) 4MG',
            },
            {
              id: 'selR2JlNcOg5GNoMu',
              name: 'BREATHEAZY (MONTELUKAST) 5MG',
            },
            {
              id: 'seluMxSWxswsAursG',
              name: 'BRILINTA (TICAGRELOR) 90MG TAB',
            },
            {
              id: 'selceCO7s6Yc78OZu',
              name: 'BRINERDINE TABLETS',
            },
            {
              id: 'sela5GltwiGcOmCef',
              name: 'BRO-ZEDEX SYRUP 100MLS',
            },
            {
              id: 'selHPTIJQtxvLKPTX',
              name: 'BROMOCRIPTINE 2.5MG TABLET',
            },
            {
              id: 'selLr2xtKoKwmcDY0',
              name: 'BROMOCRIPTINE 2.5MG Tablet(s)',
            },
            {
              id: 'sel00j6Bir7QVGs6V',
              name: 'BRONCHICUM SYRUP 100ML',
            },
            {
              id: 'selAA8Zr5Qs6BMLnF',
              name: 'BRUFEN SYRUP 100ML (AFTER A MEAL)',
            },
            {
              id: 'selhB7ypifiaWUcZo',
              name: 'BRUFEN SYRUP 60 MLS',
            },
            {
              id: 'selk1URfRqlGxCmcs',
              name: 'BRUSTAN SYRUP (AFTER A MEAL)',
            },
            {
              id: 'selz1SyGqM5t9Evgx',
              name: 'BRUSTAN TABS ( AFTER A MEAL)',
            },
            {
              id: 'sel0ojTiXeJ6lEXw3',
              name: 'BUDECORT 200MCG INHALER',
            },
            {
              id: 'selvP1EzptiskqpmN',
              name: 'BUDECORT INHALER 100MCG',
            },
            {
              id: 'selcL5eYGnpJ8PCVA',
              name: 'BUDECORT RESPULES',
            },
            {
              id: 'selTtSznbSAOWEYVq',
              name: 'BUDESMA (budesonide 200mcg) 300mdi',
            },
            {
              id: 'sel4Qk3RTr25XDC5m',
              name: 'BURNCURE CREAM 15G',
            },
            {
              id: 'sel7CVWY1bED6IW3G',
              name: 'BUSCOPAN 10MG TABLETS..(AFTER MEALS)',
            },
            {
              id: 'selP9t1qNixYkgBQC',
              name: 'BUSCOPAN INJ. 20MG',
            },
            {
              id: 'selJ4q6gNNvw6Qlbl',
              name: 'BUSCOPAN PLUS TABS.(AFTER MEALS)',
            },
            {
              id: 'selk9AnWnAIrLdr8H',
              name: 'Benalyn Dry Cough syrup',
            },
            {
              id: 'sel1xuExIFzAxnn5z',
              name: 'Benylin Dry cough',
            },
            {
              id: 'selTNFkz1x2tiFnqI',
              name: 'Bifril 30mg',
            },
            {
              id: 'seliWLuNUqnRY76Gh',
              name: 'Bispanol Tabs',
            },
            {
              id: 'sel7TzqDFSiztvdK3',
              name: 'Bonviva 150mg',
            },
            {
              id: 'selScmXEEs5FZM7Wp',
              name: 'Bonviva 3mg',
            },
            {
              id: 'selKOoiQhKGBXyTGq',
              name: 'CABERLIN 0.5MG TABS',
            },
            {
              id: 'selO5OET2Kumv4BPY',
              name: 'CACHNERVE CAPSULES',
            },
            {
              id: 'selXa0F2TGs0ed0eW',
              name: 'CADISTIN EXPECT. 100ML',
            },
            {
              id: 'selEsBUjBG42u7zCL',
              name: 'CAFFEIN 5MG/1ML SOL INJ',
            },
            {
              id: 'selVdrH4NIcHXhygL',
              name: 'CALAMINE LOTION 100ML',
            },
            {
              id: 'sellorIr8W8PkZ9Hb',
              name: 'CALCIUM GLUCONATE INJ 10ML',
            },
            {
              id: 'selMTtOVeHqowQnK2',
              name: 'CALCIUM LACTATE 300MG',
            },
            {
              id: 'selqaer7iws1ETW1f',
              name: 'CALCIUM LEUCOVORIN INJ 50mg/vial (Teva)',
            },
            {
              id: 'selxCXTL9NSalY83C',
              name: 'CALCIUM SANDOZ 10MG',
            },
            {
              id: 'selK0PtG197ARXBoa',
              name: 'CALPOL SUSPENSION 100ML',
            },
            {
              id: 'sel0vaOhXAvywOUCD',
              name: 'CALPOL SUSPENSION 60ML',
            },
            {
              id: 'selGNdgrrNUMTRfLX',
              name: 'CAMPTO INJECTION 100mg/5ml ampoule (, Sanofi)',
            },
            {
              id: 'sel9GhDeR5kovVOmc',
              name: 'CAMPTO INJECTION 40mg/2ml ampoule (Irinotecan, Sanofi)',
            },
            {
              id: 'sel3ywzEAdmScRRRs',
              name: 'CANCIDAS INJ 50MG',
            },
            {
              id: 'selQkAokTtb7bTwXD',
              name: 'CANCIDAS INJ 70MG',
            },
            {
              id: 'sel0HaCMLko2vsO8w',
              name: 'CANDID B CREAM 15GMS',
            },
            {
              id: 'sel6cByITUaCGncR2',
              name: 'CANDID B LOTION',
            },
            {
              id: 'selT9uWQWv4VuA5dF',
              name: 'CANDID CREAM 20GMS',
            },
            {
              id: 'sel0vlFBMW2InwL02',
              name: 'CANDID EAR DROPS 15MLS',
            },
            {
              id: 'selDPnW81mDPqzsuW',
              name: 'CANDID LOTION 20MLS',
            },
            {
              id: 'seltltMALrUeocWzt',
              name: 'CANDID MOUTH PAINT 15MLS',
            },
            {
              id: 'selGTLAIktPS8Q3ls',
              name: 'CANDID POWDER 30GM',
            },
            {
              id: 'sel0lrkB6kX3RwbGZ',
              name: 'CANDID SPRAY',
            },
            {
              id: 'selSieQICOnZUiTW6',
              name: 'CANDID TV SHAMPOO 60MLS',
            },
            {
              id: 'sel7RzHG05O7Ng2Yi',
              name: 'CANDID V3 PESSARIES',
            },
            {
              id: 'selWX0PVxFtenOhwG',
              name: 'CANDID V6 PESSARIES',
            },
            {
              id: 'selJ9IKSuxxup8UsQ',
              name: 'CANDISTAT CREAM',
            },
            {
              id: 'selySPA1Wk2mVNWRj',
              name: 'CANDISTIN PESSARIES 14S',
            },
            {
              id: 'selzZweH4tj9mUGDo',
              name: 'CANDITRAL 100MG CAPS.(AVOID ALCOHOLIC DRINKS)',
            },
            {
              id: 'selqmnuEQEbUDceeD',
              name: 'CANEM 1GM INJ. VIAL',
            },
            {
              id: 'sel9R5nZYyXLJp4iv',
              name: 'CANEM 500MG INJ.',
            },
            {
              id: 'selQXKGL7V2SxoHX6',
              name: 'CANESTEN 20G CREAM',
            },
            {
              id: 'self6vROC220sEfaa',
              name: 'CANESTEN SOLUTION 20MLS',
            },
            {
              id: 'selXXTUasAyRNLXjz',
              name: 'CAPECITABINE 500MG TABS(RELICITABINE)',
            },
            {
              id: 'selI3EgoeHv7yhxiL',
              name: 'CAPSIFENAC GEL 20G',
            },
            {
              id: 'selhDmZ9LSvUPYO2i',
              name: 'CAPTOPRIL-HCTZ 50/25MG TABS',
            },
            {
              id: 'sel3EppaeG99MYj8Y',
              name: 'CARBOPLATIN 150MG INJ',
            },
            {
              id: 'selDEn6jck2my1yvY',
              name: 'CARBOPLATIN 450MG INJ',
            },
            {
              id: 'selowxHaAJxCIJ5wc',
              name: 'CARDIOASPIRIN 100MG TABS',
            },
            {
              id: 'selE3VBVn4k6ufYr2',
              name: 'CARDISPIRIN TABS 75MG',
            },
            {
              id: 'selyE1aGd3vC0GUYs',
              name: 'CARNATION CORN CAPS',
            },
            {
              id: 'selxt7jyYhTArLKyx',
              name: 'CARTIL FORTE CAPS',
            },
            {
              id: 'selxHoAQMm3XexQBb',
              name: 'CARTIL SUPER FORTE TABS',
            },
            {
              id: 'selUwxbFG8EgTpuYj',
              name: 'CARTINEX - OD (RANOLAZINE) 1000MG',
            },
            {
              id: 'selHbG854XIFk2yNB',
              name: 'CARTISAFE FORTE',
            },
            {
              id: 'sel2iE8MkMfARu8kj',
              name: 'CARVEDILOL 12.5MG TABS',
            },
            {
              id: 'selxqUPowq84lg5Tv',
              name: 'CARVEDILOL 25MG TABS',
            },
            {
              id: 'selww2dCGB5LQ3RE3',
              name: 'CARVEDILOL 3.125MG TABS',
            },
            {
              id: 'selwGjrZAYPbphA2Y',
              name: 'CARVEDILOL 6.25MG TABS',
            },
            {
              id: 'selUVWikd4RTBWjs5',
              name: 'CASDIN 50MG INJ',
            },
            {
              id: 'selLaRJJdRmwc72GR',
              name: 'CASDIN 70MG INJ',
            },
            {
              id: 'sel8UVNAjg3RMfgmM',
              name: 'CASODEX 150MG TABS',
            },
            {
              id: 'selXklhy0UoNKV52P',
              name: 'CASODEX 150mg TABLET ',
            },
            {
              id: 'selXNP75cUxKZr2RL',
              name: 'CASODEX 50MG TABS',
            },
            {
              id: 'selPCWDwUNhdSqKWt',
              name: 'CASTOR OIL 100ML',
            },
            {
              id: 'seljsdqXRvmCRsWsL',
              name: 'CATAFLAM 25MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selrAooiwfZJGZr5J',
              name: 'CATAFLAM 50MG TABS(AFTER A MEAL)',
            },
            {
              id: 'selItaS0prcJgwFUl',
              name: 'CATAFLAM DROPS 1.5% 15ML(STORE IN FRIDGE)',
            },
            {
              id: 'sel7GAIAAGn9EwHPl',
              name: 'CATAFLAM SUSP 120MLS (AFTER A MEAL)',
            },
            {
              id: 'seliAT9c60z5YDb29',
              name: 'CATAPRESS 100MCG',
            },
            {
              id: 'selBLFIJXUiOyEQxZ',
              name: 'CAUSTIC PENCIL 40%',
            },
            {
              id: 'seluJzp57DbKCsZus',
              name: 'CAUSTIC PENCIL 95%',
            },
            {
              id: 'selk0m5D0fKHP9R1u',
              name: 'CEF-CLAVE SYRUP 100ML(STORE IN FRIDGE)',
            },
            {
              id: 'seluC6drg7r5j0XvS',
              name: 'CEF-CLAVE TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selNCsoVm4UAysYiu',
              name: 'CEFLOREX (CEFIXIME) 400MG TABS',
            },
            {
              id: 'sellTeiduXjs9QzPi',
              name: 'CEFLOREX (CEFIXIME) SYRUP 70ML',
            },
            {
              id: 'selP9LN5m2ccPhwtD',
              name: 'CEFTAFAIR-SB 1.5',
            },
            {
              id: 'selDTYgrjcLdRW71o',
              name: 'CELCOXX 100MG CAPS (AFTER A MEAL)',
            },
            {
              id: 'sel4h2BoyDajGM9lM',
              name: 'CELCOXX 200MG CAPS (AFTER A MEAL)',
            },
            {
              id: 'selvEksRwkmcDFebY',
              name: 'CELEBREX 200MG CAPS( AFTER A MEAL)',
            },
            {
              id: 'selIw6KZl5zueT6YZ',
              name: 'CELESTAMINE TABLET 0.25mg/2mg ',
            },
            {
              id: 'selm0jqfmX2gTHDou',
              name: 'CELESTAMINE Tablet(s) 0.25mg/2mg',
            },
            {
              id: 'seljffi9oUDKDmK2k',
              name: 'CELESTONE INJ 4mg/ml ',
            },
            {
              id: 'selibgLJRS37ccSJB',
              name: 'CELLCEPT 500MG TABS.',
            },
            {
              id: 'selCv10OQDUhXYZf2',
              name: 'CENTRUM ADVANCE TABS',
            },
            {
              id: 'selcGoayKntYV4Aix',
              name: 'CENTRUM TABLETS',
            },
            {
              id: 'selnst5gS0ncLt9rx',
              name: 'CENTRUM-SELECT TABLETS',
            },
            {
              id: 'seltjo3sh9yG4GX7x',
              name: 'CEPROLEN EE DROPS',
            },
            {
              id: 'selfjuRNeMuj0UHex',
              name: 'CEPROLEN-D DROPS',
            },
            {
              id: 'selZQAPv9nFC7kDtW',
              name: 'CERELIFE (CEREBROPROTEIN) TABS',
            },
            {
              id: 'selNWA2pxfjG7GSQo',
              name: 'CERUMOL EAR DROPS',
            },
            {
              id: 'selfPSM9QNDcDZUgF',
              name: 'CERVARIX VACCINE',
            },
            {
              id: 'sel7UB7pTM0RfebIY',
              name: 'CETAMOL BLISTER 500MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selPXUBguEPxfjz4X',
              name: 'CETIN TABLETS (LORATADINE)',
            },
            {
              id: 'selNLSMO8tTYnYhm8',
              name: 'CETODERM CREAM 450G',
            },
            {
              id: 'selV682zOLLn0bvbU',
              name: 'CETRIZET 10MG TABS',
            },
            {
              id: 'selvuWk5l8Y9AyDrk',
              name: 'CETRIZET-D TABLETS',
            },
            {
              id: 'sel3tv3J31QZ36MyW',
              name: 'CEZINE (CETRIZINE) 10MG TABS',
            },
            {
              id: 'selbqqDLIfULITSv0',
              name: 'CEZINE (CETRIZINE) SYRUP',
            },
            {
              id: 'selJO91WXVUN8RURd',
              name: 'CHLORALHYDRATE HYDRATE SYRUP',
            },
            {
              id: 'selL4CeUxQklvgnl0',
              name: 'CHLORAMPHENICOL EAR DROPS',
            },
            {
              id: 'selvrZic7C17kQ2Iw',
              name: 'CHLORPHENIRAMINE INJ 10MG',
            },
            {
              id: 'seldex7ajl3qfRMlB',
              name: 'CHLORPROMAZINE 100MG TABS BP',
            },
            {
              id: 'sel4s4mFjpYKQqeBh',
              name: 'CHLORPROMAZINE 25MG TABS BP',
            },
            {
              id: 'selU0oSdI9hdTBwUs',
              name: 'CHOLERA VACCINE',
            },
            {
              id: 'sellp1KowoDGl0W1k',
              name: 'CHOLESTYRAMINE 4G',
            },
            {
              id: 'sel7crhI396HK8QjJ',
              name: 'CIALIS 20MG TABS',
            },
            {
              id: 'selWOifjbNCdTZoOy',
              name: 'CILOXAN 0.3% EYE DROPS',
            },
            {
              id: 'selDMVE17JzHat94v',
              name: 'CILVAS 5MG (CLINIDIPINE) TABLET',
            },
            {
              id: 'selftooZKoZ2b9sVs',
              name: 'CINCRO TABS',
            },
            {
              id: 'seliaRciZWYs8EzA3',
              name: 'CIPLADONE 1G TABLETS( DISSOLVED IN 1/2 GLASS WATER)',
            },
            {
              id: 'selz1kFRH0uVmL3SU',
              name: 'CIPLADONE 500MG TABS(DISSOLVED IN 1/2 GLASS WATER)',
            },
            {
              id: 'sel3vDnoNvpBoE64c',
              name: 'CIPRALEX 10MG',
            },
            {
              id: 'sel0AtvCkIatbaEH3',
              name: 'CIPRAM 20MG TABS',
            },
            {
              id: 'sel6OxSpPgGU956Il',
              name: 'CIPROBAY 500MG XR',
            },
            {
              id: 'selVc17JThHxEQpXN',
              name: 'CIPROBAY HC DROPS',
            },
            {
              id: 'sel48WKYb6A3wtpzQ',
              name: 'CIPROBAY HC OTIC DROPS 10ml (, Bayer)',
            },
            {
              id: 'selyZVodaWcvqz1Yw',
              name: 'CIPRODENK 500MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selVYHW0F11uWESOZ',
              name: 'CIPROFLOXACIN EYE/EAR DROPS (IVYZOXAN)',
            },
            {
              id: 'selXekvDrMnd661MD',
              name: 'CIPROFLOXACIN INJ 200MG',
            },
            {
              id: 'selcxz722Xs9orNVw',
              name: 'CIPROINTA 500MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selEHWEgoEazLbCxO',
              name: 'CIPROXIN (CIPROBAY) 200MG INJ',
            },
            {
              id: 'selP6DFGzEh12WJZG',
              name: 'CIPROXIN (CIPROBAY) 250MG TABS ( AFTER A MEAL)',
            },
            {
              id: 'selHvRPGRGvLc1dcd',
              name: 'CIPROXIN (CIPROBAY) 400MG I.V',
            },
            {
              id: 'sel7SxaHf92qCfJnM',
              name: 'CIPROXIN (CIPROBAY) 500MG TABS',
            },
            {
              id: 'selBimgrAkL3jc9q7',
              name: 'CIPROXIN (CIPROBAY) INJ 100MG',
            },
            {
              id: 'selJ55LiYbr7xxdVu',
              name: 'CISPLATINUM INJ 10mg/vial (Fresenius)',
            },
            {
              id: 'selRA2qIlkLca3xNc',
              name: 'CISPLATINUM INJ 25MG',
            },
            {
              id: 'selZOhDo6iAJW1h0X',
              name: 'CISPLATINUM INJ 50MG',
            },
            {
              id: 'sel90LPsA8C4ggGwI',
              name: 'CLARIE DS 125MG/5ML SYRUP',
            },
            {
              id: 'selBk0UMNW4vCdcTS',
              name: 'CLARIE DS 250MG/5ML SYRUP',
            },
            {
              id: 'selSDCsP2yVBoGC0h',
              name: 'CLARIE-OD 500MG TABS',
            },
            {
              id: 'selZaXVG6a0f9H3Na',
              name: 'CLARITINE 10MG TABLET',
            },
            {
              id: 'sel0gQYQbArG7Zn0I',
              name: 'CLARITINE 5mg/5ml 100ml',
            },
            {
              id: 'sel5lhlZpo6rg525U',
              name: 'CLAVAM 1.2G',
            },
            {
              id: 'selfGH7jnQGwGT00g',
              name: 'CLAVAM 1G ( JUST BEFORE A MEAL)',
            },
            {
              id: 'selcTC1NczSBXOfOV',
              name: 'CLEXANE INJ 20mg Sanofi Aventis',
            },
            {
              id: 'selgKjP0QDAYVRomy',
              name: 'CLEXANE INJ 40mg Sanofi Aventis',
            },
            {
              id: 'sel0nEtRS4Op0zulL',
              name: 'CLEXANE INJ 60mg Sanofi Aventis',
            },
            {
              id: 'selUnFeNePTQVXzo3',
              name: 'CLEXANE INJ 80mg/ampoule ( Sanofi Aventis)',
            },
            {
              id: 'seleAZfK98wchk6nn',
              name: 'CLINDAMYCIN (DACILIN) 300MG CAPS( AFTER A MEAL)',
            },
            {
              id: 'selIvhEk1J2vuET1N',
              name: 'CLINDAMYCIN (DACILIN) CAPS 150MG (AFTER A MEAL A MEAL)',
            },
            {
              id: 'seltyh1R4HCRhqoTT',
              name: 'CLOMID 50MG TABS',
            },
            {
              id: 'sel2o7fDtCManyaDK',
              name: 'CLOPILET 75MG TABS',
            },
            {
              id: 'selArm7gGYYxIiHNX',
              name: 'CLOPIXOL 10MGS TABS',
            },
            {
              id: 'selYzkYiTQk50FQ9T',
              name: 'CLOPIXOL 200MGS DEPOT',
            },
            {
              id: 'selsNOJifPSBZ0puX',
              name: 'CLOPIXOL 25MGS TABS',
            },
            {
              id: 'selxk7ZTiZ0REwXAr',
              name: 'CLOPIXOL 50MG ACUPHASE',
            },
            {
              id: 'sel7QaeToYddzJNwB',
              name: 'CLOPIXOL ACUPHASE 100MG',
            },
            {
              id: 'selHPJnWKBFuSnEY6',
              name: 'CLOPRESS 75MG',
            },
            {
              id: 'selQ0DtIjGKEX5CGh',
              name: 'CO-APROVEL 150/12.5MG TABS',
            },
            {
              id: 'selJ0rXJx45UYUQ1Z',
              name: 'CO-APROVEL 30012.5MG TABS',
            },
            {
              id: 'selqs2Wpj86hQve3C',
              name: 'CO-DIOVAN 8012.5MG TABS',
            },
            {
              id: 'sel7wa7t0Vwwmgv1p',
              name: 'CO-MICARDIS 40/12.5',
            },
            {
              id: 'selQmfLQv5f4OgOkl',
              name: 'CO-MICARDIS 80/12.5MG TABS',
            },
            {
              id: 'selW1VSQ9i2wFNZVc',
              name: 'COARTEM 20120MG TAB',
            },
            {
              id: 'selPD1oP5GKRjZ8Uf',
              name: 'COARTEM 80/480 TAB',
            },
            {
              id: 'selgkQ5NTVJ6fHOxn',
              name: 'COARTEM DISPERSABLE TABS',
            },
            {
              id: 'selvd3FaQNakmBJmM',
              name: 'COARTESIANE SYR 120ML',
            },
            {
              id: 'selXegeiPdnH59JVL',
              name: 'COARTESIANE SYR 60ML',
            },
            {
              id: 'sel5q6yDu174708qM',
              name: 'COBALIN-H INJ 1000mcg (Archimedes)',
            },
            {
              id: 'selRUwcjBEjs1gGVC',
              name: 'CODEIN PHOSPHATE 30MG TABS',
            },
            {
              id: 'seljrFopVJbFPcZdS',
              name: 'COLCHICINE 0.5MG TAB',
            },
            {
              id: 'selYo3ydPYGuZJeAX',
              name: 'COLD CREAM 50G',
            },
            {
              id: 'selynpnw0JTiIVLx1',
              name: 'COLIEF 15ML',
            },
            {
              id: 'selRNEF7IyfS0lJKb',
              name: 'COLOMYCIN 1MIU INJECTION',
            },
            {
              id: 'sel9T35rTww5r7NQh',
              name: 'COLOMYCIN 2MIU INJECTION',
            },
            {
              id: 'sel4jlRj4VrEawwfv',
              name: 'COLOPREP',
            },
            {
              id: 'selD6bXcNlsNWWWH2',
              name: 'COLOSAR DENK TABS',
            },
            {
              id: 'selIWNKeLTGsXbiIh',
              name: 'COMBIGAN EYE DROPS',
            },
            {
              id: 'sel39uSTxAT5AU5Yq',
              name: 'COMBIVENT UDV LIQUID',
            },
            {
              id: 'selfPvHOwwfnydkNT',
              name: 'COMBIWAVE (SALMETEROL/FLUTICASONE)  25/125MCG',
            },
            {
              id: 'selclKFzuFIrnJJVT',
              name: 'COMBIWAVE (SALMETEROL/FLUTICASONE) 25/250MCG',
            },
            {
              id: 'sellZu7zv9QLqmqZy',
              name: 'CONCERTA 18MG TABS',
            },
            {
              id: 'selUJcCkKVKRcl8XI',
              name: 'CONCERTA 27MG TABS',
            },
            {
              id: 'selWB8fzETldvHIBZ',
              name: 'CONTIFLO 0.4MG TABS',
            },
            {
              id: 'selXoUGNyE0hStGpn',
              name: 'CONTRACTUBEX 20G',
            },
            {
              id: 'seliYZLWrDmsPFQQ2',
              name: 'CONTRACTUBEX GEL 0.1%/1% 20g MERZ,Germany',
            },
            {
              id: 'selZ8ZrmSMrL74cK6',
              name: 'CONTRACTUBEX GEL 0.1%/1% 50g MERZ,Germany',
            },
            {
              id: 'selzoxm6X3l2H4Oit',
              name: 'CORDARONE INJ. 150MG',
            },
            {
              id: 'selBl875O9P0BDqUW',
              name: 'CORTISONE 25MG TABS',
            },
            {
              id: 'selYNFzSEn4wDGs1Q',
              name: 'COSAMIDE 100MG (LACOSAMIDE)',
            },
            {
              id: 'selhZiSiicowyJgla',
              name: 'COSAMIDE 50MG (LACOSAMIDE)',
            },
            {
              id: 'selT3Qgr1HDK3tt62',
              name: 'COTREICH DS 960MG TABS',
            },
            {
              id: 'selq4bhlGZSNyk5a7',
              name: 'COTREICH TABS 480MG',
            },
            {
              id: 'sell2YpFEX5Cr66bA',
              name: 'COVERAM 10/10MG (PERINDOPRIL/AMLODIPINE) TABS',
            },
            {
              id: 'selooinLjieAo6yML',
              name: 'COVERAM 10/5MG (PERINDOPRIL/AMLODIPINE) TABLETS',
            },
            {
              id: 'seldb0PHvKXHn0Kiq',
              name: 'COVERAM 5/10MG (PERINDOPRIL/AMLODIPINE) TABS',
            },
            {
              id: 'selip1WS3nLWIvsqK',
              name: 'COVERAM 5/5MG (PERINDOPRIL/AMLODIPINE) TABLETS',
            },
            {
              id: 'selQNrkF8fpKWYVxN',
              name: 'COVERSYL 10MG TABS',
            },
            {
              id: 'selWOs0ZI9RdSxA8w',
              name: 'COVERSYL 5MG TABS',
            },
            {
              id: 'selxcPUZXHNLLEqRM',
              name: 'COW & GATE 1 PDR MILK',
            },
            {
              id: 'selS3TdLLRCopW1Qs',
              name: 'COW & GATE 2 PDR MILK',
            },
            {
              id: 'selRhy8Syszt3TejA',
              name: 'COW &GATE NUTRIPEPTI',
            },
            {
              id: 'selctfqgudzIFiccA',
              name: 'CREON (PACRELIPASE) 10000 IU CAP',
            },
            {
              id: 'selrnItEwSaRTk24x',
              name: 'CRESTOR 10MG TABS (TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'seloXecyf5vJ5hijg',
              name: 'CRESTOR 20MG TABS(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selvwAPpUcFODeBLl',
              name: 'CRESTOR 5MG TABS (TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'sel8qlcr0Av8c837k',
              name: 'CRIXIVAN CAPSULES 400MG',
            },
            {
              id: 'selTQN57VwvRjjAT7',
              name: 'CRYSTAPEN PENICILLIN 1MU',
            },
            {
              id: 'selEQcjooY3rEJuXS',
              name: 'CUDO FORTE CAPS (STORE IN FRIDGE)',
            },
            {
              id: 'selITu6oFbdOfxr9N',
              name: 'CURTIS FORTE',
            },
            {
              id: 'selEyzlXxPo3YI0Ar',
              name: 'CUSICROM 2% EYE DROPS (Alcon)',
            },
            {
              id: 'seli1uZuBep6jAdoi',
              name: 'CUSICROM 4% EYE DROPS',
            },
            {
              id: 'selq7zi6bWVwJ2yCn',
              name: 'CUTIVATE CREAM 15G',
            },
            {
              id: 'sel7vkMjkuv5oq06X',
              name: 'CUTIVATE OINTMENT 15G',
            },
            {
              id: 'sel2IdPvUYKbylzoI',
              name: 'CYCLOPAM SUSPENSION 30ML.(AFTER MEALS)',
            },
            {
              id: 'sel9TCyPt8UfvVFxO',
              name: 'CYCLOPAM TABLETS.(AFTER MEALS)',
            },
            {
              id: 'selp0sDYkr1RcTR4k',
              name: 'CYCLOPHOSPHAMIDE INJ. 1G',
            },
            {
              id: 'selG7GX6xLatr8VVd',
              name: 'CYCLOPHOSPHAMIDE INJ. 200MG',
            },
            {
              id: 'sel0NIL1EgX3Vxet7',
              name: 'CYCLOPHOSPHAMIDE INJ. 500MG',
            },
            {
              id: 'selLU0RQ3hgCcmgDU',
              name: 'CYCLOSERINE 250MG CAPSULE',
            },
            {
              id: 'selhynKX4t03KPVEt',
              name: 'CYCLOVAX 200MG TABS',
            },
            {
              id: 'sel4XsAo2aIye2ccV',
              name: 'CYCLOVAX 400MG TABLETS',
            },
            {
              id: 'selq3WIf4NC15SFgk',
              name: 'CYCLOVAX 5% 10G CREAM',
            },
            {
              id: 'selGM82Mlt2485K3P',
              name: 'CYMBALTA 30MG CAPS',
            },
            {
              id: 'selM9bJF38yBWhNTf',
              name: 'CYMBALTA 60MG CAPS',
            },
            {
              id: 'sel8jT8jGa9ek215S',
              name: 'CYMEVENE I.V 500MG',
            },
            {
              id: 'selq7SbPWKJF7TQ2T',
              name: 'CYTOSAR INJ 100mg/vial (Cytarabine, Pfizer)',
            },
            {
              id: 'selnqSSzjH5TUqQCi',
              name: 'CYTOTEC 200MG TABLETS',
            },
            {
              id: 'selTT91dXYtr126jr',
              name: 'Cabalin 150mg',
            },
            {
              id: 'seluLa5GQgfFj9StJ',
              name: 'Caberlin 0.5',
            },
            {
              id: 'selNdphbRAXz9eouv',
              name: 'Calcium Sandoz',
            },
            {
              id: 'selT8gwjTQWMffJgE',
              name: 'Calcium folinate',
            },
            {
              id: 'selSFGQH4ERybDoS3',
              name: 'Calpol 120mg ',
            },
            {
              id: 'selDUJYt38uHBUwoY',
              name: 'Camcolit 200mg',
            },
            {
              id: 'selaYYC2CkX7XurNc',
              name: 'Camcolit 400mg',
            },
            {
              id: 'seltMXIEwPDNm6TFx',
              name: 'Carbimex',
            },
            {
              id: 'sela7XiENllzui6Oe',
              name: 'Cardronate 150mg',
            },
            {
              id: 'sele5emwedR2xUBLR',
              name: 'Cartisafe Forte',
            },
            {
              id: 'seldbhyWzEbNU3Y52',
              name: 'Cefukin 500mg',
            },
            {
              id: 'seliRJJgxhlbkQZPa',
              name: 'Celco',
            },
            {
              id: 'selTCDKZ639DbhNFu',
              name: 'Ceregard',
            },
            {
              id: 'selCVPEfjrVsEMKmF',
              name: 'Cetamol 120mg ',
            },
            {
              id: 'selHKpyO26RVfuI91',
              name: 'Cetin 5mg/5ml ',
            },
            {
              id: 'selvbxWrpbJUrUl4k',
              name: 'Cetirizine 5mg/5ml',
            },
            {
              id: 'selivQlBqsX9dH82I',
              name: 'Cetlivo 5mg ',
            },
            {
              id: 'selkvQ1jE1h98qFaG',
              name: 'Citopam 10mg',
            },
            {
              id: 'seleEA27yhwicn2gJ',
              name: 'Citopam 20mg',
            },
            {
              id: 'selBCxt1OaVUezaQ3',
              name: 'Claritek 250mg ',
            },
            {
              id: 'seltglFQGJdLw8t0I',
              name: 'Claritek 500mg',
            },
            {
              id: 'selXdvrf8v2Hidh9A',
              name: 'Clarithromycine 500mg',
            },
            {
              id: 'selM8Li5fmHNsmOW2',
              name: 'Clorpromazine 100mg',
            },
            {
              id: 'selR4Nx01NS0IeOiF',
              name: 'Clorpromazine 25mg',
            },
            {
              id: 'sela4ZFUMOovthVmw',
              name: 'Concor 10mg',
            },
            {
              id: 'sel0Fq2ieB3SophxX',
              name: 'Concor 5mg',
            },
            {
              id: 'selNpJuePMHs1J3BS',
              name: 'Concur 5 mg',
            },
            {
              id: 'selCMGCaJ9OgeX2IV',
              name: 'Cordarone 200mg',
            },
            {
              id: 'selkZ85Dg3eqSkGqo',
              name: "Curam 1g Tablets 14's",
            },
            {
              id: 'selGs2tEKguSUUjEk',
              name: 'Cyclogyl 15ml',
            },
            {
              id: 'selO0Q9XoANFdSU5x',
              name: 'D-TAM',
            },
            {
              id: 'sel73NX8yOZY3O9pu',
              name: 'DABBRORAL 250MG TABS',
            },
            {
              id: 'sel2T7zJmzpv8FQmI',
              name: 'DACARBAZINE 200MG INJ',
            },
            {
              id: 'selEiC6bKaR0iPEvn',
              name: 'DACARBAZINE 500MG INJ',
            },
            {
              id: 'sel4KOcpN2RIHzVs3',
              name: 'DAFLON 500MG TABLETS',
            },
            {
              id: 'selJFrjSVOTyMQTHt',
              name: 'DAFRACLAV (COAMOXICLAV) 1G TABS',
            },
            {
              id: 'selKVcqCNXRsS3BqL',
              name: 'DAIVONEX OINTMENT',
            },
            {
              id: 'selYtrIsH24Hdv17z',
              name: 'DAKTACORT CREAM15G',
            },
            {
              id: 'seljOaoboI4TQs78r',
              name: 'DAKTARIN CREAM 15G',
            },
            {
              id: 'selng8zDLhcToFm75',
              name: 'DAKTARIN CREAM 20G',
            },
            {
              id: 'seljhmEXxQDdsiYDt',
              name: 'DAKTARIN ORAL GEL 40G',
            },
            {
              id: 'selqT2ztOvt0qypiY',
              name: 'DALACIN 600MG INJ',
            },
            {
              id: 'sel2RXcHgl6364y5H',
              name: 'DALACIN C 150MG CAPSULES (AFTER A MEAL)',
            },
            {
              id: 'selG5OPqV2h1jpTQW',
              name: 'DALACIN C 300MG CAPS (AFTER A MEAL)',
            },
            {
              id: 'selwAN9tU4bESaqmp',
              name: 'DALACIN C INJ 300MG',
            },
            {
              id: 'selTgawd6TR0NBPRQ',
              name: 'DALACIN C SYRUP 80ML',
            },
            {
              id: 'selgRTTMAC3m3U4hV',
              name: 'DALACIN T SOLUTION',
            },
            {
              id: 'selceI96fIfuIf83A',
              name: 'DAONIL TABS 5MG',
            },
            {
              id: 'selWeGauW9DIpaQEJ',
              name: 'DAPSONE 100MG TABS',
            },
            {
              id: 'sel1c4oFvVGwS0nTp',
              name: 'DARAPRIM 25MG TABS',
            },
            {
              id: 'selkKQs0aLN4tfBNB',
              name: 'DARROWS HS SOLN 0.5L',
            },
            {
              id: 'selY5rZFtF1Ze8S1B',
              name: 'DAUNOXOME 50mg/vial (Diatos)',
            },
            {
              id: 'sel6x8gTNKO6CSNc0',
              name: 'DAXAS 500MCG',
            },
            {
              id: 'selkURYflqWS8V341',
              name: 'DAZIT 5MG TABS.(AFTER A M EAL)',
            },
            {
              id: 'selJCucLFZsoolBGO',
              name: 'DAZOLIC 500MG TABS.(AVOID ALCOHOLIC DRINKS)',
            },
            {
              id: 'sellrCLypOAPbvrdn',
              name: 'DE-NOLTAB 120MG',
            },
            {
              id: 'selVWW3bl9NN3pitQ',
              name: 'DEANXIT TABLETS',
            },
            {
              id: 'sel9bdVMsOsve8PLp',
              name: 'DEBRIDACE OINT 15G',
            },
            {
              id: 'selaU6fZimhTjqK2s',
              name: 'DEEP FREEZE COLD GEL 100G',
            },
            {
              id: 'selVhiKB2knXDoEOr',
              name: 'DEEP FREEZE COLD SPRAY  150ML',
            },
            {
              id: 'selVs1rTQ5ErxCpV0',
              name: 'DEEP FREEZE GEL 35G',
            },
            {
              id: 'selgVTKY7pLXp5n57',
              name: 'DEEP FREEZE SPRAY 135G',
            },
            {
              id: 'selupYYTyN8IKoJan',
              name: 'DEEP HEAT RUB 100G',
            },
            {
              id: 'selxopP9ZxeZtpHx8',
              name: 'DEEP HEAT RUB 35G',
            },
            {
              id: 'selwwva13F7GiM3uZ',
              name: 'DEEP HEAT SPRAY 150ML',
            },
            {
              id: 'selY2j0jFjtKN49I5',
              name: 'DEEP RELIEF GEL 50G',
            },
            {
              id: 'seld9UZvmLkXCvKGo',
              name: 'DELASED Syrup 100 ml',
            },
            {
              id: 'selc91FD2KgtNnFBb',
              name: 'DEMELAN CREAM 15GM',
            },
            {
              id: 'selZYxHkv57mfg4J9',
              name: 'DENTINOX COLIC SYRUP',
            },
            {
              id: 'selnuEtpUXSbKgsSe',
              name: 'DENTINOX TEETHING GEL 15G',
            },
            {
              id: 'selGxxpkPnmlKVp9W',
              name: 'DENTOGEL ANTISEPTIC',
            },
            {
              id: 'selBWrEtBgzLcrYxS',
              name: 'DEPO PROVERA 150MG INJ.',
            },
            {
              id: 'selXmbMbO2irUFITX',
              name: 'DEPO-MEDROL 200MG INJ.',
            },
            {
              id: 'selgdpYWynytkC4XQ',
              name: 'DEPO-MEDROL 40MG INJ.',
            },
            {
              id: 'selIELBTsCgtYOy4y',
              name: 'DEPO-MEDROL 80MG INJ.',
            },
            {
              id: 'selHfuIzYfobyPfZY',
              name: 'DEPO-MEDROL INJ. 400MG',
            },
            {
              id: 'sel7joaV27o6AUuQ7',
              name: 'DERBI 10MG (DEXRABEPRAZOLE) (BEFORE A MEAL)',
            },
            {
              id: 'selOrtm0kjq5odgmV',
              name: 'DERINIDE 100MCG INHALER',
            },
            {
              id: 'selIUu4ByMTlnRHSJ',
              name: 'DERIPHYLLIN 150MG TABS',
            },
            {
              id: 'selgheabjhk5KeXLl',
              name: 'DERIPHYLLIN 450MG TABS',
            },
            {
              id: 'seloofBdkQJFRFGcR',
              name: 'DERIPHYLLIN RETARD 300MG TABS',
            },
            {
              id: 'sel1eYDqmvRz8OyHw',
              name: 'DERMIKELP CREAM',
            },
            {
              id: 'selSG4WzUa1vlmNdA',
              name: 'DERMOBACTER SOLN. 300ML',
            },
            {
              id: 'selX77TtJKWOXONaf',
              name: 'DERMOFIX CREAM 20G',
            },
            {
              id: 'selbOzIZvRmQBFb2N',
              name: 'DERMOL CREAM',
            },
            {
              id: 'selZ5ltYmGJVMihmo',
              name: 'DERMOVATE CREAM 25GM',
            },
            {
              id: 'selgxfrG7WfuPmJA3',
              name: 'DERMOVATE OINTMENT 30GMS',
            },
            {
              id: 'selHgWwNqYoy3HvXo',
              name: 'DESFERAL INJ 500mg in 10ml vials (Novartis)',
            },
            {
              id: 'selayiTsZaCWkiS8t',
              name: 'DESODIUM HYDROGEN CITRATE 1.37/5MLS',
            },
            {
              id: 'selunFauiRCYdwNl2',
              name: 'DEXAMETHASONE 0.5MG TABS',
            },
            {
              id: 'selszFJAZuYuo3TrP',
              name: 'DEXAMETHASONE 2MG TABS',
            },
            {
              id: 'selvGlA76R8gfIZ65',
              name: 'DEXAMETHASONE 4MGML INJ',
            },
            {
              id: 'sellXxc3xhLNzu2KX',
              name: 'DEXAMETHASONE EYE DROPS',
            },
            {
              id: 'selZYjEsUuUbUQJOp',
              name: 'DEXAMETHASONE TABLET 2mg ',
            },
            {
              id: 'sel29EeLCYt7LsB5J',
              name: 'DEXIPAN CREAM 20G',
            },
            {
              id: 'selZIPatN1ojecJbQ',
              name: 'DEXTROSE 10% 0.5L',
            },
            {
              id: 'sel0QN0DYGjWUhLsQ',
              name: 'DEXTROSE 10% 1LT',
            },
            {
              id: 'selKHHDJv1ZJguNNy',
              name: 'DEXTROSE 25% 500ML',
            },
            {
              id: 'sel7Yow2kLJBDbQGb',
              name: 'DEXTROSE 5% 0.5L',
            },
            {
              id: 'selDTRuMAOUhXbwj5',
              name: 'DEXTROSE 5% 1LT',
            },
            {
              id: 'selAfcFYNkpve4loX',
              name: 'DEXTROSE 5% 250ML',
            },
            {
              id: 'sel8NTqPRUFIQEOFG',
              name: 'DEXTROSE 5%SALINE 0.5LT',
            },
            {
              id: 'seljWNuCZk0w7NloC',
              name: 'DEXTROSE 5%SALINE 1 LT',
            },
            {
              id: 'seluDd9Jyl99voajv',
              name: 'DEXTROSE 50% 100ML BAG',
            },
            {
              id: 'sel05lTBk5QpDhp9o',
              name: 'DEXTROSE 50% 10MLS',
            },
            {
              id: 'selsCub3eh0fgmgvI',
              name: 'DEXTROSE 50% 500ML',
            },
            {
              id: 'sel2yuB8d7kWehPGB',
              name: 'DF 118 30MG TABS',
            },
            {
              id: 'selKsDdhkI7KFc7Bn',
              name: 'DF118 30mg',
            },
            {
              id: 'sel1PT1YQFWBoDnAu',
              name: 'DIAMICRON MR 60MG TABS',
            },
            {
              id: 'selgoStKFCkiozHYQ',
              name: 'DIAMOX 250MG TABS',
            },
            {
              id: 'selJpcKv1mMzZsYty',
              name: 'DIANE-35 TABS',
            },
            {
              id: 'selWzCxx79WHFeErT',
              name: 'DIAZEPAM 10MG INJ',
            },
            {
              id: 'selCI4nWuohsdaxxv',
              name: 'DIAZEPAM 2MG TABS',
            },
            {
              id: 'selOskmbX9FXsAIRh',
              name: 'DIBEN (forestberry) 200ML LIQ.',
            },
            {
              id: 'sel4J9yR8fTz38n4R',
              name: 'DICHLOR 12.5MG (CHLORTHALIDONE)',
            },
            {
              id: 'selxpgD8jIK6Us0yH',
              name: 'DICHLOR 25MG (CHLORTHALIDONE)',
            },
            {
              id: 'selQ6kVoUOxQccPFi',
              name: 'DICLODENK 100MG SUPPOSITORIES',
            },
            {
              id: 'sel9rykauKwLn3yTq',
              name: 'DICLODENK 50MG TABS (AFTER A MEAL)',
            },
            {
              id: 'sel2D47wZP23XBfpD',
              name: 'DICLODENK 75MG INJ',
            },
            {
              id: 'sel7BllWiDbCEkasJ',
              name: 'DICLODENK SR 100MG TABS (AFTER A MEAL)',
            },
            {
              id: 'sel1631JWs7JJMmdS',
              name: 'DICLOMOL EC 50MG TABS( AFTER A MEAL)',
            },
            {
              id: 'selR398kAsKwhgvWP',
              name: 'DICLOMOL SR 100MG TABS( AFTER A MEAL)',
            },
            {
              id: 'selRP7W16gAmUZYcd',
              name: 'DIFLUCAN 200MG CAPSULES',
            },
            {
              id: 'selM8zZs7upyt2b1r',
              name: 'DIFLUCAN 200MG I.V INJ',
            },
            {
              id: 'selrnn78EDJBls68L',
              name: 'DIFLUCAN CAPSULES 150 MG',
            },
            {
              id: 'selFGqKeYwWGf9tfI',
              name: 'DIFLUCAN CAPSULES 50MG',
            },
            {
              id: 'selVNUmkCn3oC7oQE',
              name: 'DIFLUCAN I.V 100MG50MLS',
            },
            {
              id: 'seli1ATr0BgqPHslz',
              name: 'DIFLUCAN SUSP. 35MLS',
            },
            {
              id: 'selM9mfZRrHLdH4Wl',
              name: 'DIGOXIN 0.5MG INJ',
            },
            {
              id: 'selSHYWdG18ZCpRyT',
              name: 'DIGOXIN ELIXIR 60ML',
            },
            {
              id: 'selK1TShajCtMLT4U',
              name: 'DIHYDROCODEINE 30MG TABS',
            },
            {
              id: 'selztULyYeuAYYoMy',
              name: 'DILATREND 12.5MG TABS',
            },
            {
              id: 'seltVtHA1CgEC51tz',
              name: 'DILATREND 25MG TABS',
            },
            {
              id: 'selnWioozsHG4jdrV',
              name: 'DILATREND 6.25MG TABS',
            },
            {
              id: 'selmYTCYS5fHlfKmL',
              name: 'DILTIAZEM 90MG TABS',
            },
            {
              id: 'selnbjm1zSIyeMwYV',
              name: 'DILTIGESIC 30G',
            },
            {
              id: 'selF3EUBAkhIfUhBP',
              name: 'DIOVAN 160MG TABS',
            },
            {
              id: 'selHRMiZii3w6NZlG',
              name: 'DIOVAN 80MG TABS',
            },
            {
              id: 'selMOLMyCE3sqgy7G',
              name: 'DIPEPTIVEN 100ML (Fresenius Kabi)',
            },
            {
              id: 'selbGnAGsoxX5MZkq',
              name: 'DIPHTHERIA ANTI-TOXIN INJ 10,000 i.u (Pasteur Merieux)',
            },
            {
              id: 'selrMYVDFfQa6pGRm',
              name: 'DIPHTHERIA ANTI-TOXIN INJ 20,000 i.u (Pasteur Merieux)',
            },
            {
              id: 'selxfFbQuvzyWQ9Db',
              name: 'DIPHTHERIA VACCINE',
            },
            {
              id: 'sel7EQ5yeqmUNYyhS',
              name: 'DIPROFOS INJ',
            },
            {
              id: 'selEF9vnvX0r7hRed',
              name: 'DIPROGENTA CREAM 15 G',
            },
            {
              id: 'selgqI24unfxC6aQT',
              name: 'DIPROGENTA OINTMENT 15G',
            },
            {
              id: 'selFzHpcIHFD7Qm9d',
              name: 'DIPROSALIC 30G OINT',
            },
            {
              id: 'selDLgWeIptR9UTv0',
              name: 'DIPROSALIC LOTION',
            },
            {
              id: 'sel9KH76m0dU9RrnX',
              name: 'DIPROSONE CREAM 30G',
            },
            {
              id: 'sel017PkI5He1vdpy',
              name: 'DIPROSONE OINTMENT 30G',
            },
            {
              id: 'sel724sFecaAz8nI4',
              name: 'DIRACIP M SUSP 100ML',
            },
            {
              id: 'selKEOecpqZc1lHPG',
              name: 'DIRACIP-M DS TABS',
            },
            {
              id: 'selGGnDXprLfVPUrf',
              name: 'DISFLATYL TABLETS ( CHEWABLE )',
            },
            {
              id: 'selKtH9R9lKVnHN8w',
              name: 'DISULFIRAM 200mg TABS (, GSK)',
            },
            {
              id: 'selG49mIm0Kr5oA41',
              name: 'DIURIDE 10MG TAB',
            },
            {
              id: 'selR3uuDV1op06KCO',
              name: 'DIURIDE 20MG TABS',
            },
            {
              id: 'sellv81jx5WwsLLFp',
              name: 'DIXARIT 25MCG TABS',
            },
            {
              id: 'selwOBhhSTh6GMsZk',
              name: 'DOBESIL CREAM 30G',
            },
            {
              id: 'seliG84lEtBmsa9xT',
              name: 'DOBESIL TABLETS',
            },
            {
              id: 'selhUFocaLmUpjQKi',
              name: 'DOBUTAMINE 250MG INJ',
            },
            {
              id: 'selsqna7A7vXhJUtp',
              name: 'DOCETAXEL 20mg/vial INJ (Fresenius Kabi)',
            },
            {
              id: 'selmidqqqxcqrYIHs',
              name: 'DOCETAXEL 80MG INJ',
            },
            {
              id: 'selWQDSSkSV25Pz9J',
              name: 'DOMADOL 100MG INJECTION',
            },
            {
              id: 'selH0wBXUfNXUVYkC',
              name: 'DOMPERON 10MG TABS(1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selqx6lGSvoUsWuVF',
              name: 'DOMPERON SYRUP 30ML (1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selsIkJ3dMAstGikw',
              name: 'DONECEPT 5MG TABS',
            },
            {
              id: 'selHrpizsdVV2jBKh',
              name: 'DOPAMINE 200MG5ML INJ',
            },
            {
              id: 'selujEhTFkFOLZkNt',
              name: 'DORINEM(DORIPENEM) 500MG IV',
            },
            {
              id: 'selmuJdRhBVcpOtLM',
              name: 'DORMICUM 15MG TABLETS',
            },
            {
              id: 'selSaSiPOBq9lMVV9',
              name: 'DORMICUM 15MG3ML INJ.',
            },
            {
              id: 'selIIpwHeO7o5zsPP',
              name: 'DORMICUM 5MG5ML INJ.',
            },
            {
              id: 'sels2jQXLJ2aFe81k',
              name: 'DORMICUM INJ. 50MG/10ML',
            },
            {
              id: 'sel06DcbyoMwjuKis',
              name: 'DOXYCYCLINE 100MG BLIST.CAPS (AFTER A MEAL)',
            },
            {
              id: 'selD69gn4KnngA63U',
              name: 'DR Toux',
            },
            {
              id: 'selLWu7sZGGqxTEl8',
              name: 'DREZ GARGLE(MOUTH WASH) 100ML',
            },
            {
              id: 'selaCZL38uV14RIm3',
              name: 'DREZ OINTMENT 10G',
            },
            {
              id: 'selbgfdYJKt7PfNm9',
              name: 'DREZ SOLUTION 100MLS',
            },
            {
              id: 'seltllwahPJzPcSK6',
              name: 'DREZ SOLUTION 500MLS',
            },
            {
              id: 'selcECvH4GS920QfM',
              name: 'DREZ V GEL (MICONAZOLE/METRONIDAZOLE)',
            },
            {
              id: 'selAvMXGjbfx7txlK',
              name: 'DULCOLAX 5MG TABLETS',
            },
            {
              id: 'sel70HDqrl71LXszF',
              name: 'DULCOLAX SUPPOSITORY 10MG',
            },
            {
              id: 'selQFaC9R34emDqt3',
              name: 'DULCOLAX SUPPOSITORY INFANT',
            },
            {
              id: 'selulTCc1orNncotO',
              name: 'DUODART CAPS 0.5MG/0.4MG',
            },
            {
              id: 'selVqh2TY094V68k2',
              name: 'DUODERM GEL 15G',
            },
            {
              id: 'sel9x6nkpo7GHxjrb',
              name: 'DUOFILM 15ML BOTTLE',
            },
            {
              id: 'selj9xdcQGg09gapd',
              name: 'DUOTRAV EYE DROPS 2.5ML',
            },
            {
              id: 'sel0VrIFYKEHrATIx',
              name: 'DUOVENT MDI 200D 10ML',
            },
            {
              id: 'selBwbLoRfFYkCt9E',
              name: 'DUPHALAC SACTHETS',
            },
            {
              id: 'seltuAW6fvefNp7hm',
              name: 'DUPHALAC SYRUP 200ML',
            },
            {
              id: 'selYo7bKldwQBvUHB',
              name: 'DUPHALAC SYRUP 300ML',
            },
            {
              id: 'selK3MhlVZu1qdqIo',
              name: 'DUPHASTONE 10MG TABS',
            },
            {
              id: 'sel9vuRrEvnP587hy',
              name: 'DURA TEARS OINT',
            },
            {
              id: 'selbCrZPdYuFhvE6h',
              name: 'DUROGESIC 25MCG PATCH (fentanyl)',
            },
            {
              id: 'selZbVCJpBRXuQGkV',
              name: 'DUROGESIC 50MCG PATCH (fentanyl)',
            },
            {
              id: 'seltNkjXDYDQSSm40',
              name: 'DUSPATALIN 135MG TABS.',
            },
            {
              id: 'selmVc6uwcXtsrU9c',
              name: 'DUSPATALIN 200MG TABS.',
            },
            {
              id: 'seluFCyApbQHe6IDI',
              name: 'DYNACORT 6MG TABS',
            },
            {
              id: 'selri7XqlYHoSWh3p',
              name: 'DYNACORT(DEFLAZACORT) 18MG TABS',
            },
            {
              id: 'selDM5GfwbYT3L8an',
              name: 'DYNACORT(DEFLAZACORT) 30MG TABS',
            },
            {
              id: 'selZAfBEKvM6ZN72G',
              name: 'DYNAPAR (AQ) INJECTION 75MG',
            },
            {
              id: 'selh8FWZP8gu2cebk',
              name: 'DYNAPAR GEL 30GEL',
            },
            {
              id: 'sel6UxBcJv54DxnkW',
              name: 'DYNAPAR SPRAY 30ML',
            },
            {
              id: 'selj27MSYJNjxkIX4',
              name: 'DYRADE-M TABS',
            },
            {
              id: 'selneLjXovOb0Rpgv',
              name: 'Dantrium 20mg',
            },
            {
              id: 'selyIfawGiu2o5805',
              name: 'Dazel kit',
            },
            {
              id: 'sel6mcdvegqzoWTgH',
              name: 'Derihaler',
            },
            {
              id: 'selWVo6lqtMWdiL3M',
              name: 'Derinide 200mcg',
            },
            {
              id: 'selkguiEbIwgtstyA',
              name: 'Deteracin 3.5gm',
            },
            {
              id: 'selLAA2gmZyRqh4lJ',
              name: 'Dialin 2mg ',
            },
            {
              id: 'selYtoSp0jWdpLRKl',
              name: 'Diamcron MR 60mg',
            },
            {
              id: 'seldzpMT1EujhzczO',
              name: 'Diamicron',
            },
            {
              id: 'selSYValCwcRwiL0l',
              name: 'Diamicron 120 mg',
            },
            {
              id: 'seleQZHL6cGgEa6X5',
              name: 'Diazepam 5mg',
            },
            {
              id: 'selMpdjDjnpTyKQF5',
              name: 'Digoxin 0.125mg(UK Generics)',
            },
            {
              id: 'selBCqswAhkeVj7wB',
              name: 'Digoxin 0.25mg(UK Generics)',
            },
            {
              id: 'selLN9GhWwzCf3Xbo',
              name: 'Disodium Hydrogen Citrate 1.31mg/5ml',
            },
            {
              id: 'selWpz0CVK8UZAYEe',
              name: 'Dobesil',
            },
            {
              id: 'selWlpPhJvTDr9oQ5',
              name: 'Domadol',
            },
            {
              id: 'selfp92uhk83nWk8l',
              name: 'Dopamine 40mg/ml',
            },
            {
              id: 'selw7tiPk8OjyEdr5',
              name: 'Duo-Cotecxin ',
            },
            {
              id: 'selo5CyegIspF67kG',
              name: 'Duzela 30mg',
            },
            {
              id: 'selHCdmvHXcgoenzL',
              name: 'Duzela 60mg',
            },
            {
              id: 'sel3hmVdDAO4B0LIX',
              name: 'Dynamogen',
            },
            {
              id: 'selHiX5excpZ9ayQw',
              name: 'Dynapar Gel',
            },
            {
              id: 'selP2MrKtX07C6HJS',
              name: 'E45 CREAM 50G',
            },
            {
              id: 'selZhGcWJgabSfd0C',
              name: 'EBASTEL 10MG TABS',
            },
            {
              id: 'selIyAqEBAzj9poe7',
              name: 'EBASTEL SYRUP 120ML',
            },
            {
              id: 'selqhh3NdvSz8WahL',
              name: 'ECOFREE 120MG TABS',
            },
            {
              id: 'selEyQds8KMHgiMFL',
              name: 'ECOFREE 90MG TABS',
            },
            {
              id: 'selOpKJ1QwuAgw7Ec',
              name: 'ECOFREE PLUS TABLETS',
            },
            {
              id: 'sel2bPKoGgQ9WShev',
              name: 'ELOCOM CREAM 15GM',
            },
            {
              id: 'selrgpm84w5jdtz1A',
              name: 'ELOCOM LOTION 30ML',
            },
            {
              id: 'selIU2SPXOOao1A7S',
              name: 'ELOCOM OINT. 15G',
            },
            {
              id: 'sel2Tyl6KzoKoXCC7',
              name: 'ELTROXIN TABS 100MCG',
            },
            {
              id: 'selv8w63zx4JBbzNn',
              name: 'ELTROXIN TABS 50MCG',
            },
            {
              id: 'selBvFrArHCr0k8rq',
              name: 'ELYCORT 1% CREAM 15G',
            },
            {
              id: 'selHsX86oHP00Sda5',
              name: 'ELYCORT 1%SKIN OINT. 15 GMS',
            },
            {
              id: 'selidPzb4zr7FK5Ie',
              name: 'ELYMOL BLISTER 500MG TABS',
            },
            {
              id: 'selvYe1i5pN8DEMzP',
              name: 'ELYMOX SYRUP 125MG5ML',
            },
            {
              id: 'selEx8ijJEp1NuoMc',
              name: 'ELYVATE CREAM 15G',
            },
            {
              id: 'selktvF4pMw7aDqR7',
              name: 'ELYVATE OINTMENT 15G',
            },
            {
              id: 'sel5kOdLOEnNbdEsc',
              name: 'EMADINE EYE DROPS 5ml (Alcon)',
            },
            {
              id: 'selnZGvKymnyXCgVi',
              name: 'EMITINO 4MG INJECTION',
            },
            {
              id: 'selaMxWoFab8b2wUc',
              name: 'EMITINO 4MG TABS ( PLACE UNDER  TONGUE)',
            },
            {
              id: 'selDjzFyCtSjpgvNK',
              name: 'EMITINO SUSP 30ML(HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'sel3ufHkofF6HncCM',
              name: 'EMLA CREAM 5G',
            },
            {
              id: 'selvFzPqQZbmJtuGJ',
              name: 'EMULSIFYING OINT 50G',
            },
            {
              id: 'seld0UkvoTYwDUk5F',
              name: 'EMULSIFYING OINT BP 500G',
            },
            {
              id: 'sel1nIWQnShB0hjRV',
              name: 'ENALAPRIL 10MG TABS',
            },
            {
              id: 'selvVXthdoAr7RbOp',
              name: 'ENALAPRIL 20MG TABS',
            },
            {
              id: 'selcDPkZD44wKA0LK',
              name: 'ENALAPRIL 5MG TABS',
            },
            {
              id: 'selqvKh8j0V5t8t4K',
              name: 'ENAPRIL-20H TABS (intas)',
            },
            {
              id: 'selVtBhGxtXdNyqZ8',
              name: 'ENCEPHABOL SYRUP 100ML',
            },
            {
              id: 'selLIgaoJ6ekPsLYD',
              name: 'ENCEPHABOL TABS',
            },
            {
              id: 'selMkmEcFOs770z5f',
              name: 'ENCORATE 200MG TABS',
            },
            {
              id: 'selZZKfpqzBLWDtOo',
              name: 'ENCORATE CHRONO 300MG',
            },
            {
              id: 'selYqpvxn4510Cb9E',
              name: 'ENCORATE CHRONO 500MG',
            },
            {
              id: 'selR9VJgYSi4YKtAT',
              name: 'ENGERIX-B 10MCG PAED',
            },
            {
              id: 'selAMP2p6gBJNh021',
              name: 'ENPRED (DIFLUPREDNATE) EYE DROPS',
            },
            {
              id: 'selR0RP1seLKOZiH0',
              name: 'ENSURE NUTRTIONAL PDR 425G',
            },
            {
              id: 'selwIf0P8z66K8nIq',
              name: 'ENSURE POWDER 400GM (Abbott)',
            },
            {
              id: 'selJHUd00aht12u12',
              name: 'ENTAMIZOLE DS TABLETS',
            },
            {
              id: 'selJAtXwMBwReQyIs',
              name: 'ENTAMIZOLE SYRUP 100ML',
            },
            {
              id: 'selK4hM2arLgqXvMv',
              name: 'ENTAMIZOLE TABLETS',
            },
            {
              id: 'selUBHO6UPdgKcg3Y',
              name: 'ENTECAVIR 0.5MG TABLETS',
            },
            {
              id: 'sele9OY09wHOZSMv9',
              name: 'ENTEROGERMINA 10MLS (TO BE TAKEN ORALLY)',
            },
            {
              id: 'selPMcNjYgEee5Y8R',
              name: 'ENZOFLAM TABLETS (AFTER MEALS)',
            },
            {
              id: 'selAvB1fWJNfqHYYn',
              name: 'EPANUTIN 100MG CAPS',
            },
            {
              id: 'sel9w9ZByb5C8Q5XS',
              name: 'EPANUTIN 250MG INJ',
            },
            {
              id: 'seljUUgJZ7NGBUJsU',
              name: 'EPANUTIN 50MG CAPS',
            },
            {
              id: 'selfUAnjCRyR8i9P2',
              name: 'EPANUTIN SYRUP 500ML',
            },
            {
              id: 'sel5bFzcRlQf5qfis',
              name: 'EPHEDRINE 30MG TABS',
            },
            {
              id: 'selZhirkL9sZcV9i0',
              name: 'EPHEDRINE INJ. 30MG',
            },
            {
              id: 'sel42VOQBZwmJ2kUS',
              name: 'EPILIM 100MG TABS (CRASHABLE)',
            },
            {
              id: 'sel6mq1ZnLoroCK74',
              name: 'EPILIM 200MG TABS',
            },
            {
              id: 'selMi3ORkZ45FHOTV',
              name: 'EPILIM 400MG INJECTION',
            },
            {
              id: 'selalyhhitPaVKgjZ',
              name: 'EPILIM 500MG (CHRONO)',
            },
            {
              id: 'selI7BFCMJ4oYccxn',
              name: 'EPILIM CHRONO 300MG TABS',
            },
            {
              id: 'selxibzvO6IuWeiBk',
              name: 'EPILIM SYRUP',
            },
            {
              id: 'selSN4Xz2F9huRKUp',
              name: 'EPIMAX CREAM 100G',
            },
            {
              id: 'selKfdNOD5ErnT2Vr',
              name: 'EPIMAX CREAM 400G',
            },
            {
              id: 'selJS1j3UR8y170sL',
              name: 'EPIMAX JUNIOR CREAM 400G',
            },
            {
              id: 'selOxvecymjUZUQQp',
              name: 'EPIRUBICIN 10MG INJ',
            },
            {
              id: 'selyYGoj3bhlhUB3q',
              name: 'EPIRUBICIN 50MG INJ',
            },
            {
              id: 'sel0ZUhJFXHoN0No9',
              name: 'EPLONE (EPLERENONE) 25MG TABS',
            },
            {
              id: 'selxQ8a5B1T88GP2U',
              name: 'EPLONE (EPLERENONE) 50MG TABS',
            },
            {
              id: 'selmrXr00D4dg2NsX',
              name: 'EPNONE 25MG TABS(EPLERENONE)',
            },
            {
              id: 'seln8qDZvkbnK7OfT',
              name: 'EPNONE TABS 50MG(EPLERENONE)',
            },
            {
              id: 'selTbvN3I9ja3X8Ds',
              name: 'ERCEFURYL 200MG CAPSULES',
            },
            {
              id: 'seluPP0qdExGNRkVK',
              name: 'ERCEFURYL SYRUP 90ML',
            },
            {
              id: 'selVLuV9JfwoBOB9n',
              name: 'EROSTIN 10MG(TAKE AT NIGHT )',
            },
            {
              id: 'selOnRpi0x4pAwBBh',
              name: 'EROSTIN 20MG(TAKE AT NIGHT)',
            },
            {
              id: 'seljJyg0SpIrkdab6',
              name: 'EROSTIN SUSP 5MG/5ML 60ML(TAKE AT NIGHT)',
            },
            {
              id: 'selzMgmaBX7Jv9pld',
              name: 'ESCLAM KIT',
            },
            {
              id: 'selHGfhuKTto9q4PZ',
              name: 'ESOFAG-D (ESOMEPRAZOLE/DOMPERIDONE)',
            },
            {
              id: 'selN7udolLcpukfVs',
              name: 'ESOMAC 20MG',
            },
            {
              id: 'selOsI1PpchDNCRBI',
              name: 'ESOMAC 40MG',
            },
            {
              id: 'seldRsmdAYlQYqZeB',
              name: 'ESOME INJ 40MG',
            },
            {
              id: 'selZKV2EUPcgQfUUd',
              name: 'ESOSE 20MG TABS (HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'seltqFJ3eIFKDvp5N',
              name: 'ESOSE 40MG TABS( HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'sel1JE5AystnQYi18',
              name: 'ESOSE HP KIT',
            },
            {
              id: 'selGQtP58X0av6tBC',
              name: 'ETHINYLESTRADIOL 10mcg(UK)',
            },
            {
              id: 'selUt036qchtWsYb9',
              name: 'ETHINYLESTRADIOL 50mcg(UK)',
            },
            {
              id: 'selx64K21s74lao5G',
              name: 'ETOPOSIDE 100MG INJ',
            },
            {
              id: 'sel4eHkSGAX8kUyVD',
              name: 'ETORIX 120MG (AFTER A MEAL)',
            },
            {
              id: 'selJgg8QWdqGuiTSk',
              name: 'ETORIX 60MG (AFTER A MEAL)',
            },
            {
              id: 'seljuzjnM2lEszZ90',
              name: 'ETORIX 90MG (AFTER A MEAL)',
            },
            {
              id: 'selePjzmSGakOKP3D',
              name: 'EUMOVATE CREAM 25GMS',
            },
            {
              id: 'selwShwWQWlh0mJo9',
              name: 'EUMOVATE OINTMENT 30GMS',
            },
            {
              id: 'selUzzxt7LbFtuKCm',
              name: 'EUVAX B PAED',
            },
            {
              id: 'selIm3etYL0io3ddS',
              name: 'EUVAX B VACCINE ADULT (Pasteur Merieux)',
            },
            {
              id: 'selgyX2hpGZpBTifj',
              name: 'EUVAX B VACCINE PAED (Pasteur Merieux)',
            },
            {
              id: 'seluLSGqotVD1AOUI',
              name: 'EVRA PATCH',
            },
            {
              id: 'seldWs5yN64GiDTTy',
              name: 'EXEVATE-MF OINTMENT 20G',
            },
            {
              id: 'selzrJAgo1UG6LdnL',
              name: 'EXFORGE 10/160 HCTZ TABLETS',
            },
            {
              id: 'selTz1mYQkUzLLzcE',
              name: 'EXFORGE 10/160MG TABS',
            },
            {
              id: 'sel1oogjTb42Jf9ME',
              name: 'EXFORGE 5/160 HCTZ TABLETS',
            },
            {
              id: 'selkD2mncbiyrHOBZ',
              name: 'EXFORGE 5/160MG TABS',
            },
            {
              id: 'selfNtuS75S44qAB0',
              name: 'EXOCIN EYE DROPS (OFLOXACIN)',
            },
            {
              id: 'selFA1BE6LyORc6D2',
              name: 'EXTRADERM CREAM',
            },
            {
              id: 'seltQCtZ67wRtW1zP',
              name: 'EZETIMIBE 10MG TABS',
            },
            {
              id: 'selLsib4D1lZ7ZBm8',
              name: 'Ecofree',
            },
            {
              id: 'selJdRQXDjOtOcW2m',
              name: 'Elicort Cream 50 mg',
            },
            {
              id: 'selAofnCKtqBBeaZr',
              name: 'Emifilm',
            },
            {
              id: 'selVOb54js2UjYUj2',
              name: 'Enalapril 5mg',
            },
            {
              id: 'seliSYrZiI6NggahI',
              name: 'Enapril 5 mgs',
            },
            {
              id: 'sel3gqvliWbl2MlNq',
              name: 'Enaril',
            },
            {
              id: 'selDJDOpPIJwNpIBs',
              name: 'Enterogemina',
            },
            {
              id: 'selccRaySjCpaCJxb',
              name: 'Enzispor',
            },
            {
              id: 'selzcAdMo3oMFYcp3',
              name: 'Esome',
            },
            {
              id: 'sel071OCO3WVlhMcv',
              name: 'Etorix',
            },
            {
              id: 'selfROxxiyhFszAuv',
              name: 'Etorix 90',
            },
            {
              id: 'sel260zROWrmrlMGA',
              name: 'Euthyrox 100mcg',
            },
            {
              id: 'selPWw9CR7CTwcUdj',
              name: 'Euthyrox 25mcg',
            },
            {
              id: 'sel7b9nxteuz86XuC',
              name: 'Euthyrox 50ug',
            },
            {
              id: 'seluYAQF3XmH6EIqZ',
              name: 'FAMVIR 125MG TABS',
            },
            {
              id: 'selFJc0uSwgDhX7Bc',
              name: 'FAMVIR 250MG TABS',
            },
            {
              id: 'selDToK17wACVVhIF',
              name: 'FANLAR TABS',
            },
            {
              id: 'selW9uaapQc9MqBLG',
              name: 'FASIGYN 500MG TABLETS',
            },
            {
              id: 'selblwANVNeWKcMHK',
              name: 'FASTUM GEL 100G',
            },
            {
              id: 'selm2jxI1UNCkQnkm',
              name: 'FASTUM GEL 30G',
            },
            {
              id: 'sel2y9NaYySHYBPOB',
              name: 'FASTUM GEL 50G',
            },
            {
              id: 'selLPyKYVr0qT5GIz',
              name: 'FEBO-G 40MG TAB',
            },
            {
              id: 'sel33ZiXk02kjZiwP',
              name: 'FEBO-G 80MG TAB',
            },
            {
              id: 'selJcuTr27r0DATvm',
              name: 'FEBREX PLUS SYR 60ML',
            },
            {
              id: 'selNA97L3WU6psa4t',
              name: 'FEBREX PLUS SYRUP 100MLS',
            },
            {
              id: 'selt25ycmwBqkQ16p',
              name: 'FEBREX PLUS TABS',
            },
            {
              id: 'sel8vA3YMSGbmyxmB',
              name: 'FEFOL SPANSULES',
            },
            {
              id: 'selzm0Q4ldbMbekF1',
              name: 'FEMIPLAN PILLS',
            },
            {
              id: 'selDST6e9MnLn7YpP',
              name: 'FENPAR TABS',
            },
            {
              id: 'selcPQxiYf6x4LxvK',
              name: 'FENTANYL INJ 100MCG2ML',
            },
            {
              id: 'selrW5y1XfNhrxk3z',
              name: 'FERROSE (IRON SUCROSE 1OOMG/5ML)',
            },
            {
              id: 'selWMoOdvrYMEnoUx',
              name: 'FEXET 120MG TABS',
            },
            {
              id: 'selSIhcCqkYMOTiPK',
              name: 'FEXET D TABLETS',
            },
            {
              id: 'selPAyuJ77wSfTO02',
              name: 'FEXET TABS 180MG',
            },
            {
              id: 'sellAGBnExGFFaZKM',
              name: 'FEXIDINE 120MG TABS',
            },
            {
              id: 'sel3qjBGNrapWu6a6',
              name: 'FIBROVEIN 1%',
            },
            {
              id: 'selrg5PPZYRyqSup2',
              name: 'FINOSIN TABLETS',
            },
            {
              id: 'sel7RTXz77XMkeSST',
              name: 'FLAGENTYL TABLETS 500MG',
            },
            {
              id: 'selmYuXqA1ye8zqjz',
              name: 'FLAGYL 400MG TABS.(AVOID ALCOHOLIC DRINKS)',
            },
            {
              id: 'selOoNFCzGgwAcrA0',
              name: 'FLAGYL INFUSION 100ML',
            },
            {
              id: 'selhE0gqcyRTTirj5',
              name: 'FLAGYL-S SUSPENSION ( 200MG/5ML100ML',
            },
            {
              id: 'selQF08PVZqvXgbBP',
              name: 'FLAMAR EYE DROPS',
            },
            {
              id: 'seldImqREBFqNsvL2',
              name: 'FLAMOX 500MG CAPS',
            },
            {
              id: 'selOoy1D720nD2i1A',
              name: 'FLAMOX SYR 250MG5ML',
            },
            {
              id: 'selLXD8tucb4rq1Vt',
              name: 'FLAREX EYE DROPS 5ML (Alcon)',
            },
            {
              id: 'selyfOiqx8B5sSChS',
              name: 'FLATAMEAL DS 500MG ( CHEWABLE TABLETS)',
            },
            {
              id: 'selgGGRbtcWE5iC6G',
              name: 'FLATAMEAL SUSPENSION 200ML(AFTER MEALS)',
            },
            {
              id: 'selFgrMtrll3ZtlB7',
              name: 'FLEMING 1.2G INJECTION',
            },
            {
              id: 'selx4f0lKHBXCGLmj',
              name: 'FLEMING 228MG5ML SYR(STORE IN FRIDGE)',
            },
            {
              id: 'selnevEPOXvfDcUxS',
              name: 'FLEMING 457/5ML(STORE IN FRIDGE)',
            },
            {
              id: 'sel8ln4lRcWoyi5E0',
              name: 'FLEMING 625MG TABS (JUST BEFORE A MEAL)',
            },
            {
              id: 'selcMGyhbHFEcODFO',
              name: 'FLEXEN GEL 50G',
            },
            {
              id: 'selvxFaR5gj9MMDu0',
              name: 'FLEXILOR 8MG TABS.(AFTER MEALS)',
            },
            {
              id: 'selg2JeswoVU5khkm',
              name: 'FLEXILOR-P (LORNOXICAM/PARACETAMOL).(AFTER MEALS)',
            },
            {
              id: 'selFbZy7oNl8TcN9H',
              name: 'FLIXONASE AQUEOUS NASAL SPRAY',
            },
            {
              id: 'selFIIrY0z7Y1OCap',
              name: 'FLIXOTIDE INHALER 125MCG',
            },
            {
              id: 'selDUbRTmjSSf7O56',
              name: 'FLIXOTIDE INHALER 250MCG',
            },
            {
              id: 'selGESUSUmDSr81j5',
              name: 'FLIXOTIDE INHALER 50MCG',
            },
            {
              id: 'selj6ThQoh5OsPQKH',
              name: 'FLORAL EYE DROPS',
            },
            {
              id: 'selLjwmabkzmqJukd',
              name: 'FLORANORM SATCHETS(DISSOLVED IN 1/2 GLASS OF WATER)',
            },
            {
              id: 'selCRWAk4wApaRzQi',
              name: 'FLOXAPEN 500MG CAPSULES',
            },
            {
              id: 'selRljxrig6p71T4D',
              name: 'FLOXAPEN 60ML SYRUP',
            },
            {
              id: 'selBStgmnRuiHl9XK',
              name: 'FLOXAPEN CAPSULES 250MG',
            },
            {
              id: 'selNDmzKsBpx779g8',
              name: 'FLOXAPEN INJ 250MG',
            },
            {
              id: 'seldubGPa52LBtOQg',
              name: 'FLOXAPEN INJ 500MG',
            },
            {
              id: 'selFedbCUCFplle8j',
              name: 'FLOXAPEN SYRUP(125MG/5ML) 100ML',
            },
            {
              id: 'selA1j2kKTsaJOMP6',
              name: 'FLUANXOL 0.5MG TABS',
            },
            {
              id: 'selrkODDwJpxgwxJ1',
              name: 'FLUANXOL 20MG DEPOT INJECTION',
            },
            {
              id: 'selWPnuoCiWlQmYEn',
              name: 'FLUANXOL 3MG TABS',
            },
            {
              id: 'selZFSmcdI71fQL4H',
              name: 'FLUANXOL 40MG DEPOT INJ',
            },
            {
              id: 'selqm4gqbEBjjcIug',
              name: 'FLUCONAZOLE 200MG INFUSION',
            },
            {
              id: 'sel2Bt5tzmGoeOpoj',
              name: 'FLUDROCORTISONE 100MCG TABS',
            },
            {
              id: 'selcDWzcwZ9FxIHAP',
              name: 'FLUMOX 500MG CAPS',
            },
            {
              id: 'seln1zwrt75vtYWUk',
              name: 'FLUMOX INJ 500MG',
            },
            {
              id: 'selUEYZvb0lmxHxQB',
              name: 'FLUMOX SUSP 250MG5ML',
            },
            {
              id: 'selPYsIyk3t7JNyOO',
              name: 'FLUOROURACIL (5FU) INJ 250MG',
            },
            {
              id: 'selfTUUfFL2Nlxc8Y',
              name: 'FLUOROURACIL(5FU) INJ 500MG',
            },
            {
              id: 'selNRQ9ZWIx5uYofq',
              name: 'FLUTAMIDE 250MG TABS',
            },
            {
              id: 'sel6Ivr4V5yx02VUk',
              name: 'FM 85 BREAST MILK 200G',
            },
            {
              id: 'selVvt6A4LKb5ownx',
              name: 'FML (FLUOROMETHOLONE) EYE DROPS',
            },
            {
              id: 'selzM3y3vss6d8OmP',
              name: 'FOLIC ACID 5MG TABLETS',
            },
            {
              id: 'selj5bvsFh2ry7Lxe',
              name: 'FORALIN - 400 INHALER',
            },
            {
              id: 'selsH2e8MuXztHsCb',
              name: 'FORALIN 200MCG INHALER',
            },
            {
              id: 'selCDKZ577CasOag8',
              name: 'FORALIN-100 INHALER',
            },
            {
              id: 'selQC2rQ8ilWJVPmY',
              name: 'FORTUM (CEFTAZIDIME) 1GM',
            },
            {
              id: 'selJmcmbXs8RDdoKF',
              name: 'FORTUM (CEFTAZIDIME) 250MG INJ',
            },
            {
              id: 'selHBI8zIxNjUWvb1',
              name: 'FORTUM (CEFTAZIDIME) 2GM',
            },
            {
              id: 'selDQQswVj1T7vJkQ',
              name: 'FOSEAL 800MG TABS',
            },
            {
              id: 'selvFNUbIU6IyzYDS',
              name: 'FOSMOL 3GMS(FOSFOMYCIN)',
            },
            {
              id: 'selJR6v9ZkOXNFd7x',
              name: 'FRAMYDEX EE DROPS 8ML',
            },
            {
              id: 'seleBvIrSQWpddruE',
              name: 'FREBINI ENERGY DRINK 200ML',
            },
            {
              id: 'selRJU9DZg6PtDh1g',
              name: 'FRESUBIN 2KCAL FIBRE CHOC 200ML',
            },
            {
              id: 'sel0pNFFqLHJ9nTQe',
              name: 'FRESUBIN DIABEN 500ML (Fresenius Kabi)',
            },
            {
              id: 'selQNKG7Bpy9N6LTR',
              name: 'FRESUBIN DIABETES 500ML',
            },
            {
              id: 'selqH3VBCXVrwWvwC',
              name: 'FRESUBIN E DRINK VANILLA 200ML (Fresenius Kabi)',
            },
            {
              id: 'selJGv8TB9IatXAG5',
              name: 'FRESUBIN E PROTEIN VANILLA 200ML (Fresenius Kabi)',
            },
            {
              id: 'sel15Awx6eopIdYMF',
              name: 'FRESUBIN FIBRE 1000ML',
            },
            {
              id: 'selVCYFgpi4xyaU8R',
              name: 'FRESUBIN HP 500ML',
            },
            {
              id: 'seliNkllPEI95Tr0h',
              name: 'FRESUBIN ISOFIBRE 1000ML (Fresenius Kabi)',
            },
            {
              id: 'selRsuaFAROV6m40A',
              name: 'FRESUBIN LIQUID 1000ML',
            },
            {
              id: 'selgYwctoNh9d09c0',
              name: 'FRESUBIN LIQUID 200ML',
            },
            {
              id: 'selOINEajEUSUMafE',
              name: 'FRESUBIN ORIGINAL 1LT (Fresenius Kabi)',
            },
            {
              id: 'sel4bAqeB8qbdLwqR',
              name: 'FRESUBIN PROTEIN 200ML DRINK',
            },
            {
              id: 'sel5lLMJ7b4hbP9sm',
              name: 'FRUSEMIDE 40MG (BLISTER) TABS',
            },
            {
              id: 'selYx3xp8XhZO7d9C',
              name: 'FRUSEMIDE INJ 20MG /2ML',
            },
            {
              id: 'selsGerLI5hBPZ9pk',
              name: 'FUCICORT CREAM 15GMS',
            },
            {
              id: 'selIa6sctNgyNDloN',
              name: 'FUCIDIN CREAM 15GM',
            },
            {
              id: 'sel3GZDmUdcTwRDVl',
              name: 'FUCIDIN OINTMENT 15GM',
            },
            {
              id: 'selgTAKVV6oQPXgY9',
              name: 'FUCIDIN-H CREAM 15GMS',
            },
            {
              id: 'selVCvoU0QqFyzAoj',
              name: 'FULCOVER 100MG CAPS',
            },
            {
              id: 'selLafahd1MjQRtUl',
              name: 'FUTSIL SOLUTION',
            },
            {
              id: 'selI0xmfB8CLCraSb',
              name: 'FYBOGEL ORANGE DRINK',
            },
            {
              id: 'sel0QsI9Fy0chaUeX',
              name: 'Fentavera 100mg',
            },
            {
              id: 'selDQW5CpT3TwISxi',
              name: 'Fentavera 25mg',
            },
            {
              id: 'selLTzT195U8Q8UfL',
              name: 'Fentavera 50mg',
            },
            {
              id: 'seljH5nL0ORTNiISI',
              name: 'Fentavera 75mg',
            },
            {
              id: 'selxDVYeKT0PONKCa',
              name: 'Flexen gel',
            },
            {
              id: 'selmUQV7vu7iSslsg',
              name: 'Flora norm',
            },
            {
              id: 'selqtCMBopf5w0K6Q',
              name: 'Fluconazole',
            },
            {
              id: 'sel28QIyv63qzxCI7',
              name: 'Folic Acid 5mg',
            },
            {
              id: 'sel6idFwyAkkabPxs',
              name: 'Forxiga 10mg',
            },
            {
              id: 'selTLM81Gcm8DDW2b',
              name: 'Forxiga 20mg',
            },
            {
              id: 'seln5N8L1C9JfdXlz',
              name: 'Fosfomycin 3gm',
            },
            {
              id: 'selOAPztwmouGay3O',
              name: 'GABANERVE CAPS',
            },
            {
              id: 'seluSemq2utmsFvAx',
              name: 'GABBRORAL 250MG TABLETS',
            },
            {
              id: 'seltVqG50kB8unSpl',
              name: 'GABBRORAL SYRUP 125MG5ML',
            },
            {
              id: 'seluOCrLucf5PzhDP',
              name: 'GABICA CAPS 100MG',
            },
            {
              id: 'selFETswMBxZoO8uO',
              name: 'GABICA CAPS 150MG',
            },
            {
              id: 'selJ8YCzHT1XfA99I',
              name: 'GABICA CAPS 300MG',
            },
            {
              id: 'sellzCo1dCHMsgDC3',
              name: 'GABICA CAPS 50MG',
            },
            {
              id: 'selWHW6mErVzOxsQP',
              name: 'GABICA CAPS 75MG',
            },
            {
              id: 'sellvJTLbl2addr5B',
              name: 'GALVUS 50MG TABS',
            },
            {
              id: 'selYiOq44axvaSfdc',
              name: 'GALVUSMET 50/1000MG TABS',
            },
            {
              id: 'selqFfbCdvvEiPKbN',
              name: 'GALVUSMET 50/500MG TABS',
            },
            {
              id: 'selYgWn5Z4Ugg8aEw',
              name: 'GALVUSMET 50/850MG TABS',
            },
            {
              id: 'selLLleok2kGYVxGs',
              name: 'GAMALAT ORAL SOLUTION 80MLS',
            },
            {
              id: 'selWPuzgWG6f905rN',
              name: 'GAVISCON SYRUP 200ML( AFTER MEALS)',
            },
            {
              id: 'selbyTYsxX6wzR9Tw',
              name: 'GEMCAL CAPS',
            },
            {
              id: 'sel2AqFb7lgOrMd6p',
              name: 'GEMCITABINE 1G INJ',
            },
            {
              id: 'sel8LI2zz2zkkUzaP',
              name: 'GEMCITABINE 200MG INJ',
            },
            {
              id: 'selcfAWGMh4F6FrIx',
              name: 'GEMFOS 30MG TABS',
            },
            {
              id: 'selmiLauv9xSEsvtB',
              name: 'GENTAMYCIN 20MG INJ',
            },
            {
              id: 'sel1GuWZyWULxLjYv',
              name: 'GENTAMYCIN EYEEAR DROPS',
            },
            {
              id: 'selCt1T9z9L0ZPUv8',
              name: 'GENTAMYCIN INJ 80MG2ML',
            },
            {
              id: 'selRie276m5e1Rh76',
              name: 'GETRYL 1MG TABS',
            },
            {
              id: 'self6mvce8L65E8AS',
              name: 'GETRYL 2MG TABS',
            },
            {
              id: 'self4XzTmwHe3gFFw',
              name: 'GETRYL 3MG TABS',
            },
            {
              id: 'selEVjaPGhByD4VI9',
              name: 'GETRYL 4MG TABS',
            },
            {
              id: 'selLX0JWJIKJdb0aV',
              name: 'GIT  plus(itopride 150mg/rabeprazole 20mg)',
            },
            {
              id: 'selgbpMfsXeuz0X1I',
              name: 'GIT (itopride 150mg) (AFTER A MEAL)',
            },
            {
              id: 'selO2kQc5Be4WK1rO',
              name: 'GLEMONT-L.7S ( TAKE AT NIGHT)',
            },
            {
              id: 'sel65TAV2QtBucuDZ',
              name: 'GLENCET 5MG TABS',
            },
            {
              id: 'selnx75FN6gIRTc3k',
              name: 'GLEVONIX 250MG TABS.(AFTER A MEAL)',
            },
            {
              id: 'sel5u2xXLHUFWRips',
              name: 'GLEVONIX 500MG INJ.',
            },
            {
              id: 'selB9s0DiDpHapAdC',
              name: 'GLEVONIX 500MG TABS.(AFTER A MEAL)',
            },
            {
              id: 'selDOvEv7Hv4ZPKpX',
              name: 'GLIPIZIDE 5MG TABS',
            },
            {
              id: 'selnwVkGo9TbRlBTS',
              name: 'GLUCERNA DIABETIC POWDER (Abbott)',
            },
            {
              id: 'selFFaPLDZk2f5usU',
              name: 'GLUCERNA TRIPPLE CARE VANILLA POWDER',
            },
            {
              id: 'selBKEwyOU006tOWY',
              name: 'GLUCOPHAGE 1G TABS (WITH A MEAL)',
            },
            {
              id: 'selgxtm2sGebMIphC',
              name: 'GLUCOPHAGE 500MG TABLET (WITH A MEAL)',
            },
            {
              id: 'selvg2GxXT1nFm79u',
              name: 'GLUCOPHAGE TABLETS 850MG (WITH A MEAL)',
            },
            {
              id: 'selnrgeXz2Gft1TyF',
              name: 'GLUCOPHAGE XR 750MG (WITH A MEAL)',
            },
            {
              id: 'seli7wGdmWPqmVt3R',
              name: 'GLUCOPHAGE XR 850MG TABS SR (WITH A MEAL)',
            },
            {
              id: 'selSbn0dhrXczDNcJ',
              name: 'GLUCORED 4002.5MG TABS',
            },
            {
              id: 'seluJTvrBTUEuNqWK',
              name: 'GLUCORED FORTE TABS',
            },
            {
              id: 'selFj5oZnCuKlYoIU',
              name: 'GLUCOVANCE 500MG/2.5MG',
            },
            {
              id: 'selVC6qLgC71iQmSb',
              name: 'GLUCOVANCE 500MG/5MG ',
            },
            {
              id: 'seloDqS0XVOJzU0lq',
              name: 'GLUCOWELL 50MG TABS',
            },
            {
              id: 'selRDbsPjVHy1qzpN',
              name: 'GLUCOWELLMET 50/500MG',
            },
            {
              id: 'sel63QfYHAb3qu2Ae',
              name: 'GLYCERIN 1G INFANT SUPP.',
            },
            {
              id: 'selKT1mRPnyOSc0XG',
              name: 'GLYCERIN 2G [CHILD] SUPP.',
            },
            {
              id: 'sel5PqoQnCgkUtUpU',
              name: 'GLYCERIN 4G [ADULT] SUPP.',
            },
            {
              id: 'sel3WSIIGdlNlHBwv',
              name: 'GLYCERINE 100MLS',
            },
            {
              id: 'selkKkn2qNgjvRBJA',
              name: 'GLYCERYL TRINITRATE 5MG INJ',
            },
            {
              id: 'selhkWPnh7mgA6cGD',
              name: 'GLYCERYL TRINITRATE INJ 50MG',
            },
            {
              id: 'selkwFvUZpXs3EPDk',
              name: 'GLYCERYL TRINITRATE SPRAY',
            },
            {
              id: 'sel7qsdCjkeerPTUX',
              name: 'GLYCERYL TRINITRATE TABS',
            },
            {
              id: 'selt3MHVFtXtaxllg',
              name: 'GLYCINORM MR  30MG TABS',
            },
            {
              id: 'selrA2LKQEWQkDFnj',
              name: 'GLYCOPYLORATE 1MG TABLETS',
            },
            {
              id: 'sel9LcSe5MI14JcXE',
              name: 'GOUTGESIC 40MG',
            },
            {
              id: 'sel9qoZCMzPB6xK7T',
              name: 'GOUTGESIC-80MG',
            },
            {
              id: 'selYHvF1YIymYc9z2',
              name: 'GRABACIN 3 OINT. 15GM',
            },
            {
              id: 'sel75zSsnq7gmdTn3',
              name: 'GRABACIN POWDER 10GM',
            },
            {
              id: 'selqYaQyIXBti6Ywp',
              name: 'GRAMOCEF 400MG CAPS (AFTER A MEAL)',
            },
            {
              id: 'selPda8MVijNqQ49A',
              name: 'GRAMOCEF CV  TABLET(cefixime/clavulanic acid) (AFTER A MEAL)',
            },
            {
              id: 'sel2HerNnhaRLwwjn',
              name: 'GRAMOCEF O 200MG CAPS (AFTER A MEAL)',
            },
            {
              id: 'selvPhwybkzsXtElg',
              name: 'GRAMOCEF SUSP 50MG/5ML 100ML (AFTER A MEAL)',
            },
            {
              id: 'seld3PjkSMvzsoFA4',
              name: 'GRAMOCEF SYRUP 100MG/5ML (AFTER A MEAL)',
            },
            {
              id: 'selHYC3xyjGne1c8h',
              name: 'GRISEOFULVIN 125MG',
            },
            {
              id: 'selYWLlrceN0pOqXW',
              name: 'GRISEOFULVIN 125MG TABS',
            },
            {
              id: 'selGuAXzCJS1q0Fgv',
              name: 'GRISEOFULVIN 250MG TABS',
            },
            {
              id: 'selenAxOfg6uBz2GE',
              name: 'GRISEOFULVIN 500MG TABS',
            },
            {
              id: 'selGsASMn3XBIYVji',
              name: 'GTN 400mcg/Spray',
            },
            {
              id: 'selAf6rDgrQxmskYK',
              name: 'GYNAECOSID ',
            },
            {
              id: 'selod43gcgoYEkYQp',
              name: 'GYNO-DAKTARIN CREAM 40G',
            },
            {
              id: 'selNUDXZmfRyCEbOJ',
              name: 'GYNO-DAKTARIN OVULES 3S',
            },
            {
              id: 'selAhepPHx0pqEsbO',
              name: 'Gelofusine',
            },
            {
              id: 'selqgWRf4eQESt9ls',
              name: 'Glucomin 500mg',
            },
            {
              id: 'sell9qm1I017D4q7N',
              name: 'Glucophage 500mg ',
            },
            {
              id: 'selpjb7PJo5cpqsrq',
              name: 'HALOPERIDOL 5MG ( I.V.) INJECTION',
            },
            {
              id: 'selQG7oJksNMbkgfI',
              name: 'HALOPERIDOL 5MG TABS',
            },
            {
              id: 'selHfiXfyEntxw1FI',
              name: 'HALOPERIDOL L.A INJ 50MG',
            },
            {
              id: 'sel6opiBrZdvPcPpM',
              name: 'HARTMANS SOLN 0.5L',
            },
            {
              id: 'selk9VnCTHWTb03gT',
              name: 'HARTMANS SOLN 1LT',
            },
            {
              id: 'selTSJIlezB0ALPFw',
              name: 'HAVRIX PAED VACCINE',
            },
            {
              id: 'sellCndLPDqV0gYi5',
              name: 'HCQS',
            },
            {
              id: 'selcDSlw0EtXKwhQ5',
              name: 'HELIXDERM OINT.50GM',
            },
            {
              id: 'sel2bWvksGLsaio1b',
              name: 'HEPAMERZ GRANULES 5GM (Ornithine/Aspartate, Win-Medicare)',
            },
            {
              id: 'seloZdNDGbTVbtaGs',
              name: 'HEPAMERZ INFUSION 10ML (Ornithine /Aspartate, Win-Meidcare)',
            },
            {
              id: 'selhd06r00WohPYRP',
              name: 'HEPAMERZ TABLET (Ornithine/Aspartate, Win-Medicare)',
            },
            {
              id: 'selxwaWXfJnfLLTyM',
              name: 'HEPARIN 5000IU/ml in 5ml  (Prisma UK)',
            },
            {
              id: 'seliMvPTml3uJTOAS',
              name: 'HEPARIN INJ. 5000I.UML',
            },
            {
              id: 'selM2d7M94pzYOpsh',
              name: 'HEPATITIS A PAED (avaxim)',
            },
            {
              id: 'seltXWC7A6q2XbhN1',
              name: 'HEPATITIS A VACCINE [ADULT]',
            },
            {
              id: 'selKfQ8BQJ6R6A6yQ',
              name: 'HEPATITIS B IMMUNOGLOBULIN',
            },
            {
              id: 'seltttMB7iku0BHds',
              name: 'HEPATITIS B INJ ADULT',
            },
            {
              id: 'selZidvSBZ7ZqyTiz',
              name: 'HEPATITIS B INJ ADULT-MULTIDOSE',
            },
            {
              id: 'selNbgZrzJcWVmBxb',
              name: 'HEPATITIS B PAED. INJ',
            },
            {
              id: 'seltOFMiRmnor7MwG',
              name: 'HEPSAL INJ 10IU/ml in 10ml (, Wockhardt)',
            },
            {
              id: 'selaHjMglXmfpZH72',
              name: 'HERCEPTIN INJ 440mg/50ml vial (Pfizer)',
            },
            {
              id: 'selu7eAFSyteVaRtn',
              name: 'HERPERAX 200MG TABS',
            },
            {
              id: 'selWFOE9QWDeMg0nu',
              name: 'HERPERAX 800MG TABS',
            },
            {
              id: 'selJKg6EepkldGKaF',
              name: 'HERPERAX(ACYCLOVIR) OINT 5G',
            },
            {
              id: 'seluyNZO5KJgbMIL2',
              name: 'HEXAXIM INJ VACCINE',
            },
            {
              id: 'selayLHaUiHDXKYOA',
              name: 'HEXICORD SOLUTION 10ML',
            },
            {
              id: 'selLzThwtphgDuD90',
              name: 'HIDRASEC 100MG CAPS',
            },
            {
              id: 'selb4YteXS5i91cVg',
              name: 'HIDRASEC GRANULES 10MG',
            },
            {
              id: 'selVoYNaobWXwmMR3',
              name: 'HIDRASEC GRANULES 30MG',
            },
            {
              id: 'sel4kFqsMTHwoaExl',
              name: 'HIRUDOID CREAM - 40GM',
            },
            {
              id: 'selU5dIIf1ND4HYEG',
              name: 'HIRUDOID GEL 40GM',
            },
            {
              id: 'selmKr7lsQOkjsujB',
              name: 'HUMALOG CART. 3MLS (STORE IN FRIDGE)',
            },
            {
              id: 'selP1QBcD4n9SFyGU',
              name: 'HUMALOG KWIKPEN(PREFILLED) 3ML',
            },
            {
              id: 'selM5bFwTRz4l8mAe',
              name: 'HUMALOG MIX 25 KWIKPEN',
            },
            {
              id: 'selOI44xaaFhlvG9c',
              name: 'HUMALOG MIX 5050 CART 3ML (STORE IN FRIDGE)',
            },
            {
              id: 'selXboSV09m9kJt2y',
              name: 'HUMALOG MIX. 25 10ML VIAL ( STORE IN FRIDGE)',
            },
            {
              id: 'selaLqZcGyIs5qbzE',
              name: 'HUMALOG MIX. 25 CART( STORE IN FRIDGE)',
            },
            {
              id: 'selPnHZWrrZ9PBrc4',
              name: 'HUMALOG PLAIN [PER I.U]',
            },
            {
              id: 'selRfi8weH6xccoLG',
              name: 'HUMAN ALBUMIN 20% 100ML',
            },
            {
              id: 'sel0ULSxTVPjsj3EG',
              name: 'HUMAN ALBUMIN 20% 50ML',
            },
            {
              id: 'selRBP3caVuSaApFw',
              name: 'HUMAN UROKINASE 25000 IU',
            },
            {
              id: 'selDgl2U3097DNdTK',
              name: 'HUMULIN 7030 10ML VIAL(STORE IN FRIDGE)',
            },
            {
              id: 'selH1w2GjdRjR3yb2',
              name: 'HUMULIN 7030 3ML CARTIDGE(STORE IN FRIDGE)',
            },
            {
              id: 'sel06z0FcSnNWgFhJ',
              name: 'HUMULIN-N 3ML CARTRIDGE(STORE IN FRIDGE)',
            },
            {
              id: 'selROgC3p9ZwoWSOO',
              name: 'HUMULIN-R 3ML CARTRIDGE(STORE IN FRIDGE)',
            },
            {
              id: 'selsurlOOwXzH8Urn',
              name: 'HYDRALAZINE TABS 25MG',
            },
            {
              id: 'selWUOrJuRb8JjKvM',
              name: 'HYDREA 500MG CAPS',
            },
            {
              id: 'seljiZTf8S75waCHH',
              name: 'HYDROCHLOROTHIAZIDE 25MG TABS',
            },
            {
              id: 'selSWuoFryRGA8yO9',
              name: 'HYDROCHLOROTHIAZIDE 50MG TABS',
            },
            {
              id: 'selp4COUDsLGgUvDB',
              name: 'HYDROCORT CREAM 10G',
            },
            {
              id: 'selqOY8QGFAL5rmL0',
              name: 'HYDROCORTISONE 1% EYE DROPS',
            },
            {
              id: 'sel5QsLcngdw095kq',
              name: 'HYDROCORTISONE 10MG TABLETS',
            },
            {
              id: 'selmszdtMv9q5IDpz',
              name: 'HYDROCORTISONE INJ 100MG',
            },
            {
              id: 'sel19cqCpygFGKF4j',
              name: 'HYDROGEN PEROXIDE EAR DROPS (Sphinx)',
            },
            {
              id: 'sell81a5l4ikVXtFW',
              name: 'HYDROXYCHLOROQUINE 200MG TABS',
            },
            {
              id: 'selC6LuqlRI8mi6F4',
              name: 'HYLO-COMOD EYE DROPS',
            },
            {
              id: 'sel5Cw8YFRwWpXuTN',
              name: 'HYOSCINE BLISTER 10MG TABS',
            },
            {
              id: 'selV9qslfFKF3B9lM',
              name: 'HYOSCINE BUTYL BR.20MG INJ.',
            },
            {
              id: 'selzRDTXnlOddW2Ul',
              name: 'HYOSCINE SYRUP 100ML',
            },
            {
              id: 'sely8SJPskpDeLXxs',
              name: 'HYOSCINE SYRUP 60ML',
            },
            {
              id: 'selqEQB9bNbyo4HLQ',
              name: 'HYPOVASE (PRAZOSIN) 1MG TABS.',
            },
            {
              id: 'selnfTTNPs7IO2QY3',
              name: 'HYTRIN 2MG TABS',
            },
            {
              id: 'selUSTDJTe8joh27i',
              name: 'HYTRIN 5MG TABS',
            },
            {
              id: 'sel5YJxXT9EAa6DST',
              name: 'Hemsamic 250mg',
            },
            {
              id: 'selLzR5zPSvbDlU79',
              name: 'Hemsamic 500mg',
            },
            {
              id: 'selZvXwaN6Ai0rLhz',
              name: 'Hemsamic Inj 250mg',
            },
            {
              id: 'selbuUJwwWeNUtEhs',
              name: 'Hemsamic Inj 500mg',
            },
            {
              id: 'selzSWx88gvuf5Pyl',
              name: 'Hypovase 2mg',
            },
            {
              id: 'selQC77kiUps0jq3h',
              name: 'IBICAR 100MCG INHALER( 200MDI)',
            },
            {
              id: 'selxEHoKSe1iTnBEl',
              name: 'IBICAR 200MCG INHALER( 200MDI)',
            },
            {
              id: 'selibIuqTV6yvWB5E',
              name: 'IBICAR 250MCG INHALER( 200MDI)',
            },
            {
              id: 'sel88ebSn89fJJYsZ',
              name: 'IBICAR 50MCG INHALER( 200MDI)',
            },
            {
              id: 'selFI4YoUCzQwpdB8',
              name: 'IBICAR S 50/100mcg INHALER',
            },
            {
              id: 'selmHV7jXEWHzgiy7',
              name: 'IBIDROXIL 125MG5ML 60ML',
            },
            {
              id: 'selcbFnpGO9WOciyR',
              name: 'IBIDROXIL 250MG5ML 60ML',
            },
            {
              id: 'selUEmrg6B9gOXsF1',
              name: 'IBIDROXIL 500MG CAPS',
            },
            {
              id: 'selg1ADcXC7Deokhr',
              name: 'IDANIL ELIXIR',
            },
            {
              id: 'sel8If2oUhfGkOpqZ',
              name: 'IDANIL TABLETS',
            },
            {
              id: 'selCD3XTI83vQqgsT',
              name: 'IFOSFAMIDE INJ',
            },
            {
              id: 'sel0jyTTJ8BH9O0Kz',
              name: 'IGOL SATCHETS',
            },
            {
              id: 'selDcMEmNK61Jvx0T',
              name: 'ILAXTEN 20MG TABLET',
            },
            {
              id: 'selVfoRQ92JXD7p1G',
              name: 'IMDUR 60MG TABS.',
            },
            {
              id: 'selfSbtUDLsy2QCE7',
              name: 'IMIGRAN 100MG TABS',
            },
            {
              id: 'selqDX2fsF5blg9nE',
              name: 'IMIPRAMINE 10MG TABS',
            },
            {
              id: 'selqYJxS3qIy8vzsj',
              name: 'IMIPRAMINE 25MG TABS (blister)',
            },
            {
              id: 'selY28HeMHeYnJagT',
              name: 'IMMUNOGLOBIN  IG 5GM INJ',
            },
            {
              id: 'seluFy90Yom8QBx0J',
              name: 'IMODIUM 2MG CAPS.',
            },
            {
              id: 'seltrkm5UtMM0iVlL',
              name: 'IMOVANE 7.5MG TABS.',
            },
            {
              id: 'selSYySR2fp70kBz4',
              name: 'IMURAN 50MG TABLETS',
            },
            {
              id: 'seltEQTvyBIfQzXMb',
              name: 'INDAPAMIDE 2.5MG TABS.',
            },
            {
              id: 'selg4wCy7k7EdjFzu',
              name: 'INDERAL 10MG TABLETS',
            },
            {
              id: 'self0SY3ViNscolrS',
              name: 'INDERAL 160MG CAPS.',
            },
            {
              id: 'selQOr7yxdbg8bJ1F',
              name: 'INDERAL 20MG TABLETS',
            },
            {
              id: 'selaCtFsYLgh7Hrp6',
              name: 'INDERAL 40MG TABLETS',
            },
            {
              id: 'sel1W98i44fyIZPax',
              name: 'INDERAL 80MG TABLETS',
            },
            {
              id: 'sel7FmW0jDzqR5h85',
              name: 'INDERETIC 80MG TABLETS',
            },
            {
              id: 'selL5w2zeKd1NmWrO',
              name: 'INFA-V PESSARIES',
            },
            {
              id: 'selYs8KPPvjqgpERB',
              name: 'INFACOL LIQUID ( ORAL DROPS)',
            },
            {
              id: 'selPNfzWJ0m80gNlp',
              name: 'INFANRIX HEXA INJ (GSK)',
            },
            {
              id: 'selj09QTQzD3nNlyn',
              name: 'INFANRIX-HEXA VACCINE',
            },
            {
              id: 'selmbSS2oxo2IqW8U',
              name: 'INFLUVAC INJ 0.5ML',
            },
            {
              id: 'selSkrN5ClFqnys32',
              name: 'INNO-CILA INJECTION 500/500mg',
            },
            {
              id: 'selvQuDOnMwO8swb7',
              name: 'INNO-ZOPIP 4.5GM PIPERACILLIN/TAZOBACTAM',
            },
            {
              id: 'selxoqwa8waEipmzE',
              name: 'INNOSITA TABS 50MG',
            },
            {
              id: 'sel5I4Q96Zeh3wE0A',
              name: 'INSPRA 25MG TABS',
            },
            {
              id: 'selOv870288YNcIy3',
              name: 'INTAMINE CREAM 25G',
            },
            {
              id: 'sel75fVXtOiGwKKR1',
              name: 'INTAMINE SYRUP 60ML',
            },
            {
              id: 'selxjqzxpsjTHmtBk',
              name: 'INTEGRILIN 75MG  100ML',
            },
            {
              id: 'seliWuEMCpYOoTEQ9',
              name: 'INTESTAMINE 500ML (Fresenius Kabi)',
            },
            {
              id: 'selkX9NAUhjZr2L12',
              name: 'INTRALIPID 20% 100ML',
            },
            {
              id: 'selHlCScqv4M6Kw95',
              name: 'INTRALIPID 20% 500ML',
            },
            {
              id: 'seliPQjQjsacOBRNC',
              name: 'INVANZ (ERTAPENEM) 1G INJ',
            },
            {
              id: 'seleCZiW5FLVnq0lW',
              name: 'INVEGA 3MG (PALIPERIDONE)',
            },
            {
              id: 'sel18hzogdtEyNWbV',
              name: 'INVEGA 9MG (PALIPERIDONE)',
            },
            {
              id: 'selKNz6lF4gg2EsG2',
              name: 'INVEGA SUSTENA 150MG INJECTION',
            },
            {
              id: 'selOcKe3wQWUfKUeK',
              name: 'INVIRASE 500MG CAPS',
            },
            {
              id: 'selmahYyfsHY1046p',
              name: 'INVIRASE CAPS 200MG',
            },
            {
              id: 'selpn4fJ386DvAeVB',
              name: 'INVOKANA 100MG TABS',
            },
            {
              id: 'seluEbx4BrFIrzy0N',
              name: 'IRIFONE GEL 50G',
            },
            {
              id: 'selXJs6V16UOBb0hC',
              name: 'IRINOTECAN 100mg/vial INJ (Dabur)',
            },
            {
              id: 'selkcxSXEEVHjficc',
              name: 'IRINOTECAN 40mg/vial INJ (Dabur)',
            },
            {
              id: 'selDu0WmCwzb71HOG',
              name: 'IROVEL 150MG TABS',
            },
            {
              id: 'selRVDgGbdV3g0pg2',
              name: 'IROVEL 300MG TABS',
            },
            {
              id: 'selWMh1DAOImfKCyj',
              name: 'IROVEL H TABS',
            },
            {
              id: 'seltHslRDWd3BOcDP',
              name: 'IRUXOL GEL 10G',
            },
            {
              id: 'selReyTQo4Xyb4EYr',
              name: 'ISENTRESS 400MG TABS',
            },
            {
              id: 'selVo7lxlrUuutida',
              name: 'ISONIAZID 100MG TABS',
            },
            {
              id: 'sellK6YFYq4y2Ss0r',
              name: 'ISONIAZID 300MG TABS.',
            },
            {
              id: 'seltJcUpQjO1keQg1',
              name: 'ISONIAZID 50MG TABS.',
            },
            {
              id: 'selcyGM3YMhlvHPHo',
              name: 'ISOPRENALINE 2MG INJ.',
            },
            {
              id: 'sell0zN0mM5WUTp8u',
              name: 'ISOPTIN 40MG TABS',
            },
            {
              id: 'selrPq2qNqvDqxIaJ',
              name: 'ISOPTIN SR 240MG TABLETS',
            },
            {
              id: 'selSDsI8xRL26iC93',
              name: 'ISOPTIN TABLETS 80MG',
            },
            {
              id: 'selzVpWMLJs5Ogqf2',
              name: 'ISOSORBIDE MONOTRATE TABLET 20MG',
            },
            {
              id: 'selgFlM4x0ZUss47T',
              name: 'ITACARE CAPSULES',
            },
            {
              id: 'selxAGaNYMD003nQI',
              name: 'ITOPRIDE 50MG TABS',
            },
            {
              id: 'selPFlokoGrV8AVSg',
              name: 'IVERMECTIN 3MG TABS',
            },
            {
              id: 'selvtGZRiGnQ6FWiz',
              name: 'IVERMECTIN 6MG TABLETS',
            },
            {
              id: 'selB4FeARtL5sOELd',
              name: 'IVYCROM 2% DROPS',
            },
            {
              id: 'selPiOzBbB0fo15Gb',
              name: 'IVYDEXONE EYE DROPS',
            },
            {
              id: 'selP4OCefffaYVaxP',
              name: 'IVYSINE EYE DROPS',
            },
            {
              id: 'seltfB5Y9kfk8hHab',
              name: 'IVYTIMOL 0.5% EYE DROPS',
            },
            {
              id: 'sel1rECOdl88ry9V1',
              name: 'Ibuprofen 400mg',
            },
            {
              id: 'selsAEfELsBOWQyCE',
              name: 'Ilapraz 10mg',
            },
            {
              id: 'selPVvK6LzPHTqOT3',
              name: 'Influenza Vaccine',
            },
            {
              id: 'sel1qM1Kx8IPnWp6Z',
              name: 'Inspra 50mg',
            },
            {
              id: 'selSE0yRFxNZgStrE',
              name: 'Iodinated-povidone gargle',
            },
            {
              id: 'selB8RbWQnMT2XGjO',
              name: 'Ivadine 5mg',
            },
            {
              id: 'selream4K0d1Kgb2A',
              name: 'Ivadine 7.5mg',
            },
            {
              id: 'selUCM2zG3ZTkvicW',
              name: 'Ivygentacin 10ml',
            },
            {
              id: 'sel5aWhxwFF53BBVC',
              name: 'JADELLE IMPLANT 75mg',
            },
            {
              id: 'selGtqXeMHXV6QnGj',
              name: 'JANUMET 50/1000 MG',
            },
            {
              id: 'selMBGeWpvDWZxNpI',
              name: 'JANUMET 50/500MG',
            },
            {
              id: 'selZoyNLdoYDspriA',
              name: 'JANUMET 50/850 MG',
            },
            {
              id: 'seljx9B3udiv9fCFu',
              name: 'JANUVIA 50MG',
            },
            {
              id: 'selips3KhjBGFv4Sy',
              name: 'Januvia 100mg',
            },
            {
              id: 'selkaDUGEF84c3PUM',
              name: 'JusDee 60k',
            },
            {
              id: 'selbaRoKgeifOCA81',
              name: 'KABIVEN  CENTRAL 2LT',
            },
            {
              id: 'selkHIkMafNTI4CeP',
              name: 'KABIVEN 1900 2052ML (Fresenius Kabi)',
            },
            {
              id: 'sel3TRqz91R51gL1I',
              name: 'KABIVEN 900 1020ML (Fresenius Kabi)',
            },
            {
              id: 'selgx3IAozGORBRZD',
              name: 'KABIVEN CENTRAL 1LT',
            },
            {
              id: 'selOdGEWnjACZMwhz',
              name: 'KABIVEN PERIPHERAL 1.5LT',
            },
            {
              id: 'selCj6qzZKlyhMIBj',
              name: 'KABIVEN PERIPHERAL 1900ML (Fresenius Kabi)',
            },
            {
              id: 'selH13MZBLRTrDEPY',
              name: 'KAM RHO  300mcg/2mls (,Kamada)',
            },
            {
              id: 'selBb6vhxYWY70WVf',
              name: 'KARVOL DECONGESTANT CAPS (INHALANT CAPSULES)',
            },
            {
              id: 'selDctzSBDjD9U6y6',
              name: 'KEFSTAR 250MG TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selTrUjVV529fOKSY',
              name: 'KEFSTAR 500MG TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selMvKdg1iYtEZTiD',
              name: 'KEFSTAR SYRUP 125MG5ML 100ML(STORE IN FRIDGE)',
            },
            {
              id: 'seltMO6wvZGKyPFwU',
              name: 'KENALOG IN ORAL BASE 5G  (ORAL PASTE)',
            },
            {
              id: 'selRTBjgSp4GAxhTD',
              name: 'KEPPRA 250MG TABS',
            },
            {
              id: 'seltADJGuApn3CYXH',
              name: 'KEPPRA 750MG TABS',
            },
            {
              id: 'selxrZkLisWBhMjAM',
              name: 'KETESSE 25MG TABS.',
            },
            {
              id: 'selhfaUtmyBCaPc95',
              name: 'KETESSE 50MG/2ML INJECTION',
            },
            {
              id: 'selo9kPx8JRbKDxJC',
              name: 'KETOLORAC EYE DROPS',
            },
            {
              id: 'sel9Fx27OhUmk1MyF',
              name: 'KETOPLUS (KETOCONAZOLE)',
            },
            {
              id: 'seliBpsYZFHbIGWZi',
              name: 'KETOSTERIL TABS.',
            },
            {
              id: 'selV462GX5LPITRqa',
              name: 'KIDDI PHARMATON 100ML',
            },
            {
              id: 'selF26zLCL8jHvsBy',
              name: 'KIDDI PHARMATON 200ML',
            },
            {
              id: 'selrf6cHzu6nF7Vaw',
              name: 'KIVEXA 600/300MG',
            },
            {
              id: 'selEpEWrVTMXLAzMC',
              name: 'KLACID 250MG TAB',
            },
            {
              id: 'selHdHXKLiAkhKPpC',
              name: 'KLACID 500MG TAB',
            },
            {
              id: 'sel46WsThmXuyIUL1',
              name: 'KLACID INJ 500MG',
            },
            {
              id: 'selNNh8GcsRUv8mf0',
              name: 'KLACID SYR 125MG5ML',
            },
            {
              id: 'selIXuCdXRM4lLA8n',
              name: 'KLACID SYR 250MG5ML',
            },
            {
              id: 'sell1HBAvSwHRx2TQ',
              name: 'KLACID-XL TABS',
            },
            {
              id: 'selOpt0KjUa7oK7eR',
              name: 'KLEEN ENEMA 120ML',
            },
            {
              id: 'seld1WfcJP6R64l2E',
              name: 'KLENZIT GEL 15G',
            },
            {
              id: 'selHXSe0r23Eoxf60',
              name: 'KLENZIT-C CREAM',
            },
            {
              id: 'selpzhYxJeiudXcOK',
              name: 'KLIOGEST TABLET ',
            },
            {
              id: 'selJG21Xmp9PUiJbP',
              name: 'KLY GEL 42GM',
            },
            {
              id: 'selHFVKLwPnCyhVP6',
              name: 'KNAC-P 50MG TABS',
            },
            {
              id: 'seltDC8kKCqv0lqHz',
              name: 'KNAC-P 75MG TABS',
            },
            {
              id: 'selV8xcVPRP4RwRJz',
              name: 'KOACT 1.2G (COAMOXICLAV 1.2 INJ)',
            },
            {
              id: 'selvdZpNf5FwPTBT6',
              name: 'KOMBIGLYZE XR 2.5/1000MG TABS',
            },
            {
              id: 'sel3L4CmqLJhCwXYD',
              name: 'KOMBIGLYZE XR 5/1000MG TABS',
            },
            {
              id: 'selVOwZgSmsSe6zhR',
              name: 'KONAKION INJ 10MG',
            },
            {
              id: 'selVeRyIEI3WnM6tn',
              name: 'KONAKION INJ 10mg Roche',
            },
            {
              id: 'selewYtpOdqq3fDsl',
              name: 'KONAKION INJ 2MG',
            },
            {
              id: 'selav4xRagl2DbKPS',
              name: 'KONAKION INJ 2mg/0.5ml Roche',
            },
            {
              id: 'selc4oNNQhIzZ9lAA',
              name: 'KONTAB TABLETS(  BEFORE MEALS)',
            },
            {
              id: 'selkQXOCDqk1JQjFb',
              name: 'KUIN (CIPROFLOXACIN) 500MG TABS',
            },
            {
              id: 'selwDjaMF8tPj1B9i',
              name: 'KYTRIL INJ 1MG',
            },
            {
              id: 'sel1UXluHZ1S2sYTp',
              name: 'KYTRIL INJ 3MG',
            },
            {
              id: 'selQ7DsQz5F3oEoU6',
              name: 'L-MONTUS TABS (TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'self0W5oj6J3gWcAi',
              name: 'LABETALOL 100MG INJ',
            },
            {
              id: 'selbCOI07SqqvSVMt',
              name: 'LACTACYD 200ML',
            },
            {
              id: 'selQeZbgwMHpBUQ6v',
              name: 'LACTULAC 100ML SOLN',
            },
            {
              id: 'selX262v6rLVe0S9L',
              name: 'LACTULAC 400ML SOLN',
            },
            {
              id: 'selDqTUDGryE3Rpls',
              name: 'LACTULAC SOLN 200ML',
            },
            {
              id: 'sel17tm0TIfOHuVxm',
              name: 'LAMICTAL 25MG TABS.',
            },
            {
              id: 'selO7qqgi169DOInQ',
              name: 'LAMICTAL100MG TABS.',
            },
            {
              id: 'selerHQwooxvUlgy5',
              name: 'LAMISIL 125MG TABS',
            },
            {
              id: 'selgAgaPa5jZKjL07',
              name: 'LAMISIL 250MG TABS',
            },
            {
              id: 'selWAymhQPLnRJrKQ',
              name: 'LAMISIL SOLUTION 1% 30ML',
            },
            {
              id: 'selu0XcWe5jI56MSG',
              name: 'LAMITOR 100MG TABS',
            },
            {
              id: 'selqNSa0NgAuQLK18',
              name: 'LAMITOR 25MG TABS',
            },
            {
              id: 'selHhbMDqdQMcX0dZ',
              name: 'LANOLIN CREAM 50GM',
            },
            {
              id: 'selJkiNGGszBO3HtH',
              name: 'LANOMYCIN 500MG INJ',
            },
            {
              id: 'seldxvZgfcvdH3jAQ',
              name: 'LANOXIN 0.25MG TABS',
            },
            {
              id: 'selWXygm39ZhXhO3T',
              name: 'LANOXIN SYR 60ML',
            },
            {
              id: 'selugrESg4QjPDV0G',
              name: 'LANSEC 30MG CAPSULE',
            },
            {
              id: 'sel55L6N8iN5XTc8p',
              name: 'LANSEC DT 15MG TABS',
            },
            {
              id: 'seljKiuwjTZL0uYn2',
              name: 'LANTUS 3ML CARTRIDGE(STORE IN FRIDGE)',
            },
            {
              id: 'selcu2R806Mw5UQ3S',
              name: 'LANTUS SOLOSTAR(STORE IN FRIDGE)',
            },
            {
              id: 'sel6oYdmpXpD83RqY',
              name: 'LANZOL DT 15MG',
            },
            {
              id: 'selItrJlehgAIJMez',
              name: 'LARITHER INJ 40MG',
            },
            {
              id: 'seldfro87nYd3kpSE',
              name: 'LARITHER INJ 80MGML',
            },
            {
              id: 'selQSEKoD742k9zIe',
              name: 'LASIX INJ. 20MG',
            },
            {
              id: 'selcqMgP8pJoh63SX',
              name: 'LASIX TABLETS 40MG',
            },
            {
              id: 'selhdyaeqTzDqkm2T',
              name: 'LASOCLAV 228MG (COAMOXICLAV) SYRUP',
            },
            {
              id: 'seln2Yg0EVqW5lMML',
              name: 'LASOCLAV 457MG (COAMOXICLAV) SYRUP',
            },
            {
              id: 'selQvNjC09gm1kdi9',
              name: 'LASOPROL 30MG',
            },
            {
              id: 'selUoFC8xDpnvPeOR',
              name: 'LEFLOX 500MG INJ.',
            },
            {
              id: 'selzRk3LBbPW3IxBn',
              name: 'LEFLOX INJ.750MG VIAL',
            },
            {
              id: 'selqzkPlViSb37clE',
              name: 'LEFRA 20MG TABS.',
            },
            {
              id: 'selSPuPW7v1Doty3N',
              name: 'LENALIDOMIDE 25MG CAPS',
            },
            {
              id: 'selq2NcPLRAFUXWfs',
              name: 'LEPONEX TABLETS 100MG',
            },
            {
              id: 'selTysX91RGHD4BaH',
              name: 'LEPONEX TABLETS 25MG',
            },
            {
              id: 'selZAtX71xOYXyZuB',
              name: 'LETROZOLE 2.5MG TABS.',
            },
            {
              id: 'sel7NGIHBqu417zB4',
              name: 'LEUCOVORIN 15MG INJ',
            },
            {
              id: 'selje5KwbQPu6H3Id',
              name: 'LEUCOVORIN 15MG TABS',
            },
            {
              id: 'selLCNcz6N204j0Wb',
              name: 'LEUCOVORIN 200MG INJ',
            },
            {
              id: 'selV979o5TpVqNEkx',
              name: 'LEUCOVORIN 300MG INJ',
            },
            {
              id: 'selwJBw10uZAzJi9o',
              name: 'LEUCOVORIN 50MG INJ.',
            },
            {
              id: 'selfLvt9AhNS4ooP7',
              name: 'LEUCOVORIN INJ 100MG',
            },
            {
              id: 'selDiw8jEXXaJ82dE',
              name: 'LEUKERAN 2MG TABS',
            },
            {
              id: 'selpmjQpnBFQWapV5',
              name: 'LEVAFORM 1.25MG RESPULES',
            },
            {
              id: 'selrJoaJRko4Igf0l',
              name: 'LEVAFORM INHALER 50MCG/DOSE',
            },
            {
              id: 'selLBms8ipDQqMNnP',
              name: 'LEVAMISOLE 40MG TABS.',
            },
            {
              id: 'selJj8uyu2NAzP7hM',
              name: 'LEVAMISOLE SYRUP 15ML',
            },
            {
              id: 'selzmy3uqbO5jwiG0',
              name: 'LEVEMIR FLEXPEN 100U/ML(STORE IN FRIDGE)',
            },
            {
              id: 'selWeIuNeOua8v4ax',
              name: 'LEVITRA 20MG',
            },
            {
              id: 'sel73QaJbTXnqbUYZ',
              name: 'LEVOBACT 500MG (AFTER A MEAL)',
            },
            {
              id: 'sele2tSVW5j0yUhYX',
              name: 'LEVOBACT 750 INJECTION',
            },
            {
              id: 'selrUeugncjIZKx3F',
              name: 'LEVOBACT 750MG (AFTER A MEAL)',
            },
            {
              id: 'selFwivWKs2Hd9ZVS',
              name: 'LEVOLUKASK  ADULT 10MG TABS',
            },
            {
              id: 'sel7k9sYrsCeWNBfH',
              name: 'LEVOLUKAST KID(LEVOCETRIZINE 2.5MG/MONTELUKAST  4MG)( DISPERSIBLE)',
            },
            {
              id: 'sel2pMrOhzzrNvoze',
              name: 'LEVOSTAR (LEVOSALBUTAMOL) SYRUP',
            },
            {
              id: 'selrGpycxgoEVDmEY',
              name: 'LEXOTANIL 1.5MG TABS',
            },
            {
              id: 'selwrhz3QSwTnsoRX',
              name: 'LEXOTANIL 3MG TABS',
            },
            {
              id: 'selHs32Nib3qCKPjJ',
              name: 'LICEOMA LOTION 60MLS',
            },
            {
              id: 'sel0f8t9glGwsIgKh',
              name: 'LINEX CAPSULES',
            },
            {
              id: 'selJqnkmS9bHQAACG',
              name: 'LIOTON GEL 0.1% 30g Menarini',
            },
            {
              id: 'selOBEmScZnSDYZbA',
              name: 'LIOTON GEL 1000 30GM',
            },
            {
              id: 'selW1V8P0J2nOHjUg',
              name: 'LIPIGET 10MG TABS.(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selBPl4vokI4oO9XE',
              name: 'LIPIGET 20MG TABS.(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selKnuDfrCR1E02Ip',
              name: 'LIPIGET 40MG TABS. (TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selddiB4eC6BGXbfw',
              name: 'LIPITOR 10MG TABS.( TO BE TAKEN AT NIGHT)',
            },
            {
              id: 'selE8Y5gHTS7BM0X1',
              name: 'LIPITOR 20MG TABS.( TO BE TAKEN AT NIGHT)',
            },
            {
              id: 'selDC7dx03ff9qr6r',
              name: 'LIPITOR 40MG TABS.( TO BE TAKEN AT NIGHT)',
            },
            {
              id: 'seljErAcO66D9cBMM',
              name: 'LIPITOR 80MG TABS',
            },
            {
              id: 'selpBv40EZKyMrGbb',
              name: 'LIPOFUNDIN 20% FAT EMULSION',
            },
            {
              id: 'selp5iHkW26nlDMWa',
              name: 'LIPOSOMAL AMPHOTERICIN B 50MG NJ',
            },
            {
              id: 'selWn8zdBbRufCytW',
              name: 'LIPOVENOS 10% 500ML',
            },
            {
              id: 'sel1YIPrtAccCnxX0',
              name: 'LIPTOMIL PLUS 2',
            },
            {
              id: 'selzbSk8imHcfMVRg',
              name: 'LIPTOMIL PLUS1',
            },
            {
              id: 'selAQd63a8g4tgh52',
              name: 'LIQUID PARAFFIN 100MLS',
            },
            {
              id: 'selnMae7soLq6IdGe',
              name: 'LISTRIL 10MGTABS',
            },
            {
              id: 'selPeejlZou6QU8YN',
              name: 'LISTRIL 20MGTABS',
            },
            {
              id: 'selbqAcsXEz3X53UJ',
              name: 'LISTRIL 5MG TABS',
            },
            {
              id: 'selnYqGbhNtExLJZy',
              name: 'LIVIAL 2.5mg ',
            },
            {
              id: 'selDelhNK7Wa4v3eO',
              name: 'LIZOLID 600MG INJ.',
            },
            {
              id: 'selOiPLEcZ6001Uox',
              name: 'LIZOLID 600MG TABS.',
            },
            {
              id: 'selOwI31eS1zVF7iA',
              name: 'LMW ENOX 20MG INJ',
            },
            {
              id: 'sel6PZV0Uz1UDHPSO',
              name: 'LMW ENOX 40MG INJ',
            },
            {
              id: 'seliHXi1YrjYdMsJF',
              name: 'LMW ENOX 60MG INJ',
            },
            {
              id: 'sel2tZo39pckDcYlc',
              name: 'LMW ENOX 80MG INJ',
            },
            {
              id: 'selE57SDGAL5rPk55',
              name: 'LOCACORTEN VIOFORM CREAM',
            },
            {
              id: 'selM1VZticYOCa2ot',
              name: 'LOCACORTEN VIOFORM EAR DROPS',
            },
            {
              id: 'sel3jJBr9mo5Gm84Z',
              name: 'LOCACORTEN VIOFORM OINTMENT 15G',
            },
            {
              id: 'selqrBmAK0E13YesR',
              name: 'LOGIMAX TABLETS',
            },
            {
              id: 'selifmOunzl8nwrhF',
              name: 'LOLITA GEL 30GM',
            },
            {
              id: 'sel5Jv9g7viraW2Mj',
              name: 'LOPERAMIDE (DIALIN)2MG CAPS.',
            },
            {
              id: 'selY015TPIPuDXiZd',
              name: 'LORABIL PLUS (RABEPRAZOLE/ITOPRIDE) (1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selCtC1wLU42lDxwZ',
              name: 'LOSARTAN TABS. 50MG',
            },
            {
              id: 'sel9oHWb0ukD57E2c',
              name: 'LOSARTAS-HT TABS.',
            },
            {
              id: 'selRzXTAA0I7FPtBJ',
              name: 'LOTEM SUSP 100ML',
            },
            {
              id: 'seltPqrlR2tSO8ZcJ',
              name: 'LOXIAM 8MG (AFTER A MEAL)',
            },
            {
              id: 'selCtottK1iift0s1',
              name: 'LOXIAM MR 8MG (AFTER A MEAL)',
            },
            {
              id: 'selKWUzL9tjWHMsCi',
              name: 'LOXIAM PLUS 8MG (AFTER A MEAL)',
            },
            {
              id: 'selSub62WTZFsqh5N',
              name: 'LOXICAM',
            },
            {
              id: 'selmvj5txFyM5JhZt',
              name: 'LUCIDRIL 250MG TABS.',
            },
            {
              id: 'sel3qnYraZLjOkJiV',
              name: 'LUMIGAN EYE DROPS',
            },
            {
              id: 'selbzC4aCERCeuiBS',
              name: 'LUPRIDE 3.75MG INJ.',
            },
            {
              id: 'selTBHrey7W0mqr3U',
              name: 'LUPRIDE DEPOT 11.25MG INJ',
            },
            {
              id: 'selKaCxaI1VqAtdjn',
              name: 'LYDIA IUCD (CONTRACEPTIVE)',
            },
            {
              id: 'selkKDZsXSwoUnSBf',
              name: 'LYRICA CAPS 150MG',
            },
            {
              id: 'selerEC8f4x5mU2vw',
              name: 'LYRICA CAPS 25MG',
            },
            {
              id: 'sel7n6XvwF1fkj33k',
              name: 'LYRICA CAPS 75MG',
            },
            {
              id: 'sel5ErzjP84gv8M9b',
              name: 'LYSER-D 5010MG TABS..(AFTER MEALS)',
            },
            {
              id: 'seltxcvlqbqf2a099',
              name: 'Lantus',
            },
            {
              id: 'sel1wVLXMpZDhxCKo',
              name: 'Leflox 500mg tabs',
            },
            {
              id: 'selL6q8GwtMv6cpeM',
              name: 'Lefra',
            },
            {
              id: 'sel4HYYOnKidfWfyL',
              name: 'Lexotanil',
            },
            {
              id: 'selM83Le9IkXNVeju',
              name: 'Lipiget',
            },
            {
              id: 'selOQ45FGKpvMI5pw',
              name: 'Lofral 10mg ',
            },
            {
              id: 'selS12fpoFRSVpwDy',
              name: 'Lofral 5mg ',
            },
            {
              id: 'selp3pdt7cnhbINlp',
              name: 'Lokit 20mg',
            },
            {
              id: 'sel0n8lkiEtFvg73y',
              name: 'Lonart 40mg/240 mg',
            },
            {
              id: 'selTeZ32qRREV5Mof',
              name: 'MAALOX PLUS SUSP. 150ML',
            },
            {
              id: 'selOSF64Fi5bIW7sr',
              name: 'MAALOX PLUS SUSP. 350ML( AFTER MEALS)',
            },
            {
              id: 'selusUEJkRqvSqHmD',
              name: 'MAALOX PLUS TABLETS (CHEWABLE)',
            },
            {
              id: 'seldLm465uWE62pqL',
              name: 'MAALOX SUSPENSION 355ML',
            },
            {
              id: 'sel3OuC3qR64IPwZz',
              name: 'MAALOX TABLETS (CHEWABLE)',
            },
            {
              id: 'selgYvnW8Vkx4xTsw',
              name: 'MABTHERA 100MG INJ.',
            },
            {
              id: 'selVixUNoZEliZmYb',
              name: 'MABTHERA 500MG INJ.',
            },
            {
              id: 'seloIAG3YflIMDWWB',
              name: 'MAGNESIUM SULPHATE 1GM 10ML',
            },
            {
              id: 'selOkcphgG2USIFpn',
              name: 'MAGNESIUM SULPHATE 5G INJ',
            },
            {
              id: 'selbXlt8tRwfTVQ5G',
              name: 'MAGNESIUM SULPHATE INJ 4G',
            },
            {
              id: 'seliHjBDtbodSuL6K',
              name: 'MALANIL ADULT 250/100MG',
            },
            {
              id: 'selqe4UyYq5epiFw6',
              name: 'MALANIL PAEDIATRIC 62.5/25MG',
            },
            {
              id: 'sel9QZPPJKkw2hH3N',
              name: 'MALARONE TABS ADULT',
            },
            {
              id: 'selKhwucvMCFqNUFv',
              name: 'MALARONE TABS PAEDS',
            },
            {
              id: 'sel7U10jAGXN8zoML',
              name: 'MAXIDEX 1% EYE DROPS 5ML',
            },
            {
              id: 'seldq4LVZpExbyKvI',
              name: 'MAXIDEX OINTMENT',
            },
            {
              id: 'sel2KOm9ZD7C8Iai1',
              name: 'MAXITROL EYE DROPS',
            },
            {
              id: 'selhD33g7BqidXQtT',
              name: 'MAXITROL EYE OINTMENT',
            },
            {
              id: 'seloSBAI6LBVBZ0pu',
              name: 'MEBO OINT. 30G',
            },
            {
              id: 'selaZIIJVRbmjyL15',
              name: 'MEBO OINTMENT 15G',
            },
            {
              id: 'selnucoMdhrxt9Iqp',
              name: 'MEBO SCAR LOTION',
            },
            {
              id: 'selnYQu5gaU4v7yQg',
              name: 'MEBOSCAR OINTMENT 30G',
            },
            {
              id: 'selgA9f2i8e1DGmBQ',
              name: 'MEDI-KEEL LOZENGES (HON&LEM)',
            },
            {
              id: 'selIES550VsEpK21O',
              name: 'MEDIGEL 15G',
            },
            {
              id: 'sel8U5PuIZNXU4P4B',
              name: 'MEDITROL 0.25 TABS',
            },
            {
              id: 'seln79WdqKMXGnX8o',
              name: 'MEDIVEN CREAM 15G',
            },
            {
              id: 'selIkc2ZqT9scH4d0',
              name: 'MEDIVEN OINTMENT 15G',
            },
            {
              id: 'selCsnkunFCrfRtdQ',
              name: 'MEDIVEN-S OINTMENT 15G',
            },
            {
              id: 'selueGWUIxziLHLeL',
              name: 'MEDROL 4MG TABS.',
            },
            {
              id: 'sel3RGBKpynSS52MS',
              name: 'MEFDOL TABLETS (MEFENAMICACID/PARACETAMOL)(AFTER MEALS)',
            },
            {
              id: 'selc79cplES9J88OU',
              name: 'MEFEX 500MG TABS',
            },
            {
              id: 'selF12E0mt94WLA6b',
              name: 'MEFLOQUIN 250MG TABLETS',
            },
            {
              id: 'selnR8TdvmvvlNrf7',
              name: 'MEFTAL FORTE TABS (AFTER MEALS)',
            },
            {
              id: 'selcX5UeMnC8btuac',
              name: 'MEFTAL SPAS (MEFENAMIC ACID/DICYCLOMIN)',
            },
            {
              id: 'sel9a37uhoG0vUoFR',
              name: 'MEFTAL TABLETS 500MG',
            },
            {
              id: 'selCFJJiMBprd1Fy8',
              name: 'MEGACE TABLET 160mg ',
            },
            {
              id: 'selyRUn1oXVbAW5bU',
              name: 'MENACTRA VACCINE (MENINGOCOCCAL)',
            },
            {
              id: 'selPOgTXIFX6rCxCi',
              name: 'MENCEVAX VACCINE (GSK)',
            },
            {
              id: 'sel64BJhyXexaLuiS',
              name: 'MENINGOCOCCAL ACWY VACCINE',
            },
            {
              id: 'selBn6Ga7ikyRGe1u',
              name: 'MENOFOS-10 TABS',
            },
            {
              id: 'selhWRfnR8oYc4HM8',
              name: 'MEPHAQUIN 250MG TABS.',
            },
            {
              id: 'selxaKvYNa9nWXUzU',
              name: 'MERCAPTOPURINE 50MG TABLETS',
            },
            {
              id: 'selwPHkpfUrAuABvC',
              name: 'MEROGRAM IG INJ',
            },
            {
              id: 'selyU8s6posA4gepY',
              name: 'MERONEM 0.5GM',
            },
            {
              id: 'selsSqablZjqVOn8e',
              name: 'MERONEM 1GM INJ.',
            },
            {
              id: 'selBHZpi0kJSqRjwf',
              name: 'MESACOL 400MG TABS.',
            },
            {
              id: 'selFnOuGBFB5Q3ujM',
              name: 'MESNA 200mg/vial INJ (Fresenius Kabi)',
            },
            {
              id: 'selgGt7KkGGux39XC',
              name: 'MESNA 400MG/4ML',
            },
            {
              id: 'selfqFcY71mfQZHTW',
              name: 'MESPORIN 1G I.V',
            },
            {
              id: 'sel0l7QyZp3XojQkc',
              name: 'MESPORIN 250MG I.V',
            },
            {
              id: 'selRp8O8Pc3QFZMaC',
              name: 'MESPORIN 2G INJ IV',
            },
            {
              id: 'sel1j3nUVeGUCIJGX',
              name: 'MESPORIN INJ 500MG IV',
            },
            {
              id: 'selx0sBKYhmkda5rG',
              name: 'MESTINON, Valeant 60mg',
            },
            {
              id: 'selIKg6LZZnj1ufse',
              name: 'METAKELFIN TABLETS',
            },
            {
              id: 'seleLXG1sZgVadjuB',
              name: 'METALYSE TREATMENT SET 10000 IU',
            },
            {
              id: 'sel1la6nYUHiqsS8J',
              name: 'METHADONE 5MG TABS',
            },
            {
              id: 'selpX5qbLvl2zJSe9',
              name: 'METHADONE SYRUP 1MG/ML',
            },
            {
              id: 'selk3i3Uij3W4DprB',
              name: 'METHOTREXATE  2.5mg (GSK)',
            },
            {
              id: 'selI32CIidaI5zItZ',
              name: 'METHOTREXATE 15MG INJ',
            },
            {
              id: 'selesTXtq9o0jVC3T',
              name: 'METHOTREXATE 2.5MG TABS.',
            },
            {
              id: 'sel2GzTz5KkNCbWKL',
              name: 'METHOTREXATE 50MG INJ.',
            },
            {
              id: 'selvA8bBMkRdElBeK',
              name: 'METHYLDOPA 250MG TABS(B/PACK) remedica',
            },
            {
              id: 'selYgPXSL9o2hS9Uc',
              name: 'METOCLOPRAMIDE 10MG BLISTER (1/2 HOUR BEFORE MEALS)',
            },
            {
              id: 'selQLP8FnaXswObCu',
              name: 'METOCLOPRAMIDE 10MG TABS.(1/2  HOUR BEFORE A MEAL)',
            },
            {
              id: 'sel9nvxPTQP55GTlk',
              name: 'METOCLOPRAMIDE INJ.10MG',
            },
            {
              id: 'selpW9GMTX53AItBy',
              name: 'METOCLOPRAMIDE SYRUP 60ML',
            },
            {
              id: 'selv2JL27ewU4k6tQ',
              name: 'METOLAZONE(METOZ) 2.5MG TABS',
            },
            {
              id: 'selVReWtvMsElbonI',
              name: 'METOLAZONE(METOZ) 5MG TABS',
            },
            {
              id: 'selyD77RGi835LgkB',
              name: 'METROGYL DENTAL CREAM 20G',
            },
            {
              id: 'seljhbp4XWW5AKuli',
              name: 'METROGYL TOPICAL CREAM 30G',
            },
            {
              id: 'selKKL2sKR7qpLFmg',
              name: 'METRONIDAZOLE I.V 100ML',
            },
            {
              id: 'seliRVBMumJUX0Oqt',
              name: 'METYLASE 10000IU INJ.',
            },
            {
              id: 'selHotFsTw1hGRqsj',
              name: 'MGR 10 TABLETS',
            },
            {
              id: 'seltVr02RlajAlMy1',
              name: 'MI-REL (RETEPLASE 18 MG) IJN',
            },
            {
              id: 'selgaP6P0pCHTOwcD',
              name: 'MICARDIS 40MG TABLETS',
            },
            {
              id: 'selLjaflq5eIuNZB4',
              name: 'MICARDIS 80MG TABLETS',
            },
            {
              id: 'selhyBwDKaMqsvFXL',
              name: 'MICRO-NOVUM ',
            },
            {
              id: 'selSqSOUeqDg61kQT',
              name: 'MICROGYNON 30',
            },
            {
              id: 'sel9g9AzXVXi3jOOc',
              name: 'MICROGYNON 30 ',
            },
            {
              id: 'selCVsbsy2U2pXXnS',
              name: 'MICROMOX 400MG(AFTER A MEAL)',
            },
            {
              id: 'sel9qtXnhkVs2Dqjk',
              name: 'MICROMOX INFUSION 400MG',
            },
            {
              id: 'sellLQgCK3zczu04W',
              name: 'MICRONEMA 10ML BOTTLE',
            },
            {
              id: 'selUQ5BOFkaa13KO3',
              name: 'MICRONEMA 20ML BOTTLE',
            },
            {
              id: 'selUKOPbXBFQAgImS',
              name: 'MILK OF MAGNESIA 100ML',
            },
            {
              id: 'selbzEhHnzXNprltp',
              name: 'MILRINONE (PRIMACOR) 10MG INJECTION',
            },
            {
              id: 'selcnFgMEGqs6vOO3',
              name: 'MINIPRESS 1MG TABS.',
            },
            {
              id: 'selxxs6qvBKOSkfzs',
              name: 'MINIPRESS 2MG TABLETS',
            },
            {
              id: 'sell0NmRcXsIopCkd',
              name: 'MINOCYCLINE 100MG TABS.',
            },
            {
              id: 'selA6Ir0el8HcwLYh',
              name: 'MINOCYCLINE 50MG TABS.',
            },
            {
              id: 'seliFH7zL0ipbaEiQ',
              name: 'MINOXIDIL 2.5MG TABLETS',
            },
            {
              id: 'seltrtaMmsHp1wvhM',
              name: 'MINOXIDIL 5MG TABLETS',
            },
            {
              id: 'selYqV0e5zioPaoHY',
              name: 'MIOCAMEN 50MGML SUSP 120ML',
            },
            {
              id: 'selEc54Sd75vJNnqp',
              name: 'MIOCAMEN 600MG TABLETS',
            },
            {
              id: 'selMFJMo73LPr4wV9',
              name: 'MIRCERA 75MCG/0.3ML',
            },
            {
              id: 'seljhE0S1q7xtFA77',
              name: 'MIRENA IUCD',
            },
            {
              id: 'sels4Xdg6SoyTYqSs',
              name: 'MIRTAZ 15MG TABS.',
            },
            {
              id: 'selH2oImAVw1nwNgN',
              name: 'MIRTAZ 30MG TABS.',
            },
            {
              id: 'selLfO2Mo3yn3A0H6',
              name: 'MITOMYCIN 10mg/vial INJ (Kyowa Hakko,UK)',
            },
            {
              id: 'sel08QeTyBZlZcC0o',
              name: 'MIXAVIT DROPS 15ML',
            },
            {
              id: 'selbwRKs050kub1AE',
              name: 'MIXAVIT DROPS 15ML(ORAL DROPS)',
            },
            {
              id: 'seleuu7rmWvBQEFQp',
              name: 'MIXTARD 3070 100I.U 3MLS(STORE IN FRIDGE)',
            },
            {
              id: 'selne0gCQ3VlIndQs',
              name: 'MIXTARD 3070 10ML VIAL(STORE IN FRIDGE)',
            },
            {
              id: 'selNeZnaCDida8Wh5',
              name: 'MIXTARD FLEXPEN 100 IU/ML 3ML',
            },
            {
              id: 'selnGFb5oQaKChEoK',
              name: 'MOBIC 15MG TABLETS',
            },
            {
              id: 'selZL6gaIGlRQkTKz',
              name: 'MOBIC 7.5MG TABLETS',
            },
            {
              id: 'selXWBsWUz9q7a61h',
              name: 'MODURETIC TABLETS',
            },
            {
              id: 'selPCaTPZarRSSmZP',
              name: 'MOM 2 B CAPS',
            },
            {
              id: 'selq6PpcQfocgZnGv',
              name: 'MOMATE CREAM 15G',
            },
            {
              id: 'selawKxNirUX9Hp4l',
              name: 'MOMATE F (MOMETASONE/FUSIDIN) CREAM10G',
            },
            {
              id: 'sel8PBFtQJKIDSmF1',
              name: 'MOMATE NASAL SPRAY 50MCG 60 DOSES',
            },
            {
              id: 'selzUQFJDjEiWHCww',
              name: 'MOMATE OINT. 15GM',
            },
            {
              id: 'sell2qVF7pCYkygoq',
              name: 'MOMATE-AZ NASAL SPRAY',
            },
            {
              id: 'sellgdmsJFJ8nTuk6',
              name: 'MONOCEF-O (CEFPODOXIME) 100MG/5ML SYRUP',
            },
            {
              id: 'selG5NvyiOmwOrzhS',
              name: 'MONTALLERG TABS(TAKE AT NIGHT)',
            },
            {
              id: 'selu0z0YsIsfUW1zi',
              name: 'MONTEL (LEVOCETRIZINE/MONTELUKAST) (TAKE AT NIGHT)',
            },
            {
              id: 'selSonb4qCgEdU3EY',
              name: 'MONTIGET 10MG TABS.( TAKE AT NIGHT)',
            },
            {
              id: 'selpHaO8olmRdiUd9',
              name: 'MONTIGET 4MG SATCHETS (  TO LICK AT NIGHT DO NOT DISSOLVE IN WATER)',
            },
            {
              id: 'selHhh7iz8De5BVGB',
              name: 'MONTIGET 5MG TABS.(CHEWABLE AT NIGHT)',
            },
            {
              id: 'selTmfKc9kbv52Gvi',
              name: 'MONTIGET TABS 4MG',
            },
            {
              id: 'selq6dnZCs2XaSSGW',
              name: 'MORPHINE 10MG INJ.',
            },
            {
              id: 'selIUv8JosPFa7HJS',
              name: 'MORPHINE HCL 30MGML INJ.',
            },
            {
              id: 'selzFLjLC1dSh1Y8R',
              name: 'MORPHINE [MST] 10MG TABS.',
            },
            {
              id: 'selFoygQmvLxjYWXU',
              name: 'MORPHINE[MST] 30MG TABS.',
            },
            {
              id: 'selqSJ8HVcnjc5Ntp',
              name: 'MOTILIUM 10MG TABS (HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'selADe9cGFKw8y999',
              name: 'MOTILIUM SYRUP 100ML( HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'selVpECqziByz75WH',
              name: 'MOVICAL SATCHETS PAED',
            },
            {
              id: 'selWxXjpAgHFlphgo',
              name: 'MOVICOL SATCHETS ADULT',
            },
            {
              id: 'sel9oc4vk5bhtQkQl',
              name: 'MOXIFLOXACIN/DEXA EYE DROPS (APDROPS DX)',
            },
            {
              id: 'selNv5a5ZfC1sg0YC',
              name: 'MOZA 2.5MG TABS.',
            },
            {
              id: 'selgIaIWEaitijukC',
              name: 'MOZA [MOSAPRIDE] 5MG',
            },
            {
              id: 'selQFqM2o40wEjKTF',
              name: 'MPHETAS 500MG TABLETS',
            },
            {
              id: 'selq876DKMBcFrbK1',
              name: 'MUCOGEL SUSPENSION 300ML',
            },
            {
              id: 'selIDEw868tUYoA7U',
              name: 'MUCOSOLVAN 30MG TABLETS',
            },
            {
              id: 'selxHCjHTaZOWdVcd',
              name: 'MUCOSOLVAN L.A. 75MG CAPSULE',
            },
            {
              id: 'selTzkpilKl56velv',
              name: 'MUVERA 15MG TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selSQrJjZxyQlGABY',
              name: 'MUVERA 7.5MG TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selfS3ixIEsHxst2D',
              name: 'MYCOFIT TABS 500MG',
            },
            {
              id: 'selNi4BYoQDQIssrd',
              name: 'MYCOSPORE CREAM 15G',
            },
            {
              id: 'selkaHnIrLeJrUgHX',
              name: 'MYCOSPORE SOLUTION 15ML',
            },
            {
              id: 'selpG64ZMpvik1rW9',
              name: 'MYCOSTATIN CREAM 15G',
            },
            {
              id: 'sel5LnkkWleYkHLIJ',
              name: 'MYCOTA CREAM',
            },
            {
              id: 'selBlEEf4tYeMKac4',
              name: 'MYCOTA POWDER 70GM',
            },
            {
              id: 'seljx379sHuqx6i4b',
              name: 'MYDRIACYL EYE DROPS 1% 15ML (Alcon)',
            },
            {
              id: 'selfEVZfS2kidszcr',
              name: 'MYFORTIC (MOFILET) 360MG',
            },
            {
              id: 'selljoKGavcSujBa3',
              name: 'MYLERAN TABLET 2mg (Bisulphan, GSK)',
            },
            {
              id: 'sel9vJ9MDeoaHoSf9',
              name: 'MYOLGIN CAPSULES( MAY CAUSE DROWSINESS)',
            },
            {
              id: 'selpkpPxEgJxugEOc',
              name: 'MYOSPAS TABLETS( MAY CAUSE DROWSINESS)',
            },
            {
              id: 'selXqOB1dr27Wv87q',
              name: 'MYTEKA 10MG TABS.',
            },
            {
              id: 'selGaE6RCubsU0vcG',
              name: 'MYTEKA 4MG SATCHETS',
            },
            {
              id: 'selxZlL8aU2xidYgA',
              name: 'MYTEKA 5MG TABS.',
            },
            {
              id: 'selCiXGOg8rwPOSl9',
              name: 'MZ-CAL SUSP (MAG/Zc/CAL)',
            },
            {
              id: 'selcQJODAHlc9gM36',
              name: 'MZ-CAL TABS (MAG/Zc/CAL)',
            },
            {
              id: 'selOGisv9GELvUAiP',
              name: 'Mannitol 20%',
            },
            {
              id: 'seluAZJwNlQ1CpA44',
              name: 'Melcam 15mg ',
            },
            {
              id: 'selYNuKxeOYKdtyws',
              name: 'Melcam 7.5mg',
            },
            {
              id: 'seld65F6kcqWImhNA',
              name: 'Mephtas 500mg',
            },
            {
              id: 'selKeMJmvb1IoAUC4',
              name: 'Metcos 10mg',
            },
            {
              id: 'selQUiFd2Ba5f7ZCt',
              name: 'Metoprolol 100mg',
            },
            {
              id: 'selUkbgzdD7OKudSv',
              name: 'Metoprolol 25mg',
            },
            {
              id: 'selGBV2IoWz0pAhp4',
              name: 'Metoz 2.5mg',
            },
            {
              id: 'selM7vg5QQzgzpDgE',
              name: 'Metoz 5mg',
            },
            {
              id: 'selk13wcuvsG7UhEY',
              name: 'Metracycline 3.5gm',
            },
            {
              id: 'selqLIIXubRL72JC8',
              name: 'Monotrate 20mg',
            },
            {
              id: 'seltTvgddtravHZeG',
              name: 'Monotrate OD 50mg',
            },
            {
              id: 'selWjlMLQSE7kZUzI',
              name: 'Montel',
            },
            {
              id: 'selZhNTCv7JSisy4F',
              name: 'Montiget',
            },
            {
              id: 'selfQs5orZC4SdTU1',
              name: 'Mucosolvan 15mg/5ml 100ml',
            },
            {
              id: 'selHwG70YcS7VKMFn',
              name: 'Muvera',
            },
            {
              id: 'selIoq4lwMnMrQn2C',
              name: 'Mycophenolate',
            },
            {
              id: 'selm1pY3adgbv0zJ0',
              name: 'NADOXIN CREAM 20mg',
            },
            {
              id: 'selCP7uy1HnBK7v7n',
              name: 'NALIDIXIC ACID 500MG CAPS.',
            },
            {
              id: 'selXgoIQzX2URMebZ',
              name: 'NALOXONE 20MCG [ NEONATAL] INJ',
            },
            {
              id: 'sel4TzGslMDQd32QR',
              name: 'NALOXONE 400MCG INJ',
            },
            {
              id: 'selMVYtqCwCDKugUU',
              name: 'NALTREXONE 50MG TABLETS',
            },
            {
              id: 'selT94NjRIe201Bqg',
              name: 'NALTREXONE IPLANT',
            },
            {
              id: 'selfEHOduf3zGahF3',
              name: 'NAN 1 HYPOALLERIC 400GMS',
            },
            {
              id: 'sel2s4kmF21M6w93g',
              name: 'NAN-1 POWDER MILK 400GM',
            },
            {
              id: 'selwc4FHhTwjcLiIT',
              name: 'NAN-2 POWDER MILK 400GM',
            },
            {
              id: 'selEflJeQQ3MZVRR8',
              name: 'NASONEX NASAL spray',
            },
            {
              id: 'sel5amqqUiEBEDEPN',
              name: 'NATRILIX 2.5MG TABS.',
            },
            {
              id: 'selIUddCqmEvBjMVh',
              name: 'NATRILIX SR 1.5MG TABS.',
            },
            {
              id: 'sel6RCGzyPcd3tNZz',
              name: 'NATRIXAM 1.5MG/5MG (INDAPAMINE/AMLODIPINE)',
            },
            {
              id: 'seldJZInwIfHPS2AW',
              name: 'NATULAN TAB 50mg (Non Proprietary UK)',
            },
            {
              id: 'sel0JHQ6QECOFqcu3',
              name: 'NEBICARD 2.5MG TABS',
            },
            {
              id: 'selQfpJFpNgM1M1X3',
              name: 'NEBICARD 5MG TABS',
            },
            {
              id: 'selXY5tm5eEFntpxK',
              name: 'NEBILET 5MG (NEBIVOLOL) TABLETS',
            },
            {
              id: 'selmweEmz8t8Xbzjf',
              name: 'NEBILET 5MG/25MG (NEBVOLOL/HCTZ) TABLETS',
            },
            {
              id: 'sel01805VPviH9kc6',
              name: 'NEBILONG 5MG TAB',
            },
            {
              id: 'selB8YpNWjunqUNHI',
              name: 'NEBILONG AM TABS',
            },
            {
              id: 'selRkw6ch0KoBP6wb',
              name: 'NEBILONG H TABLETS',
            },
            {
              id: 'selljp3Uhb0TJK8xT',
              name: 'NELTOLON GEL 1% 15G',
            },
            {
              id: 'sel5ZmQrzkMWsssJ4',
              name: 'NEO-MEDROL ACNE LOTION 25ML',
            },
            {
              id: 'selneiYQeTLeZqgFs',
              name: 'NEO-NACLEX TABLETS 5MG',
            },
            {
              id: 'selFhQ9bRHIIoai4b',
              name: 'NEOPEPTINE DROPS 15ML',
            },
            {
              id: 'sel7xpEFxynlNte99',
              name: 'NEORAL 100MG TABS',
            },
            {
              id: 'selCpZxSTwgrGNSoX',
              name: 'NEORELAX A (AFTER A MEAL)',
            },
            {
              id: 'selEgUgtmtnklYV8P',
              name: 'NEOSTIGMINE 2.5MG INJ.',
            },
            {
              id: 'selxWGzWwSNoG23V3',
              name: 'NEOSTIGMINE INJ ',
            },
            {
              id: 'sel0iRmkxO3Ils5Rq',
              name: 'NEOSURF (BOVINE/BLES) INJ',
            },
            {
              id: 'sel67wAgdNCRbrG8P',
              name: 'NEPHROSTERIL 7% 500ML',
            },
            {
              id: 'selWslzgPJW6nLoX6',
              name: 'NETAZOX 200MG DT TALETS (AFTER A MEAL)',
            },
            {
              id: 'selslLvN1ASoK0zqY',
              name: 'NETAZOX 500MG TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selZJX36j9MpOuaY2',
              name: 'NETAZOX SYRUP 100MG5ML',
            },
            {
              id: 'sel0QsBZPqS1N32g0',
              name: 'NETAZOX-OF TABLETS (AFTER A MEAL)',
            },
            {
              id: 'seleLwRMwCkpLmUtq',
              name: 'NEUPOGEN 300MCG INJ',
            },
            {
              id: 'selsEDmcmiepZ7KIQ',
              name: 'NEURO FORTE TABLETS',
            },
            {
              id: 'selNCKqQf5LHbJYxy',
              name: 'NEUROBION PLUS TABLETS',
            },
            {
              id: 'seltLGHuyso5qPKaK',
              name: 'NEUROCARE FORTE CAPS',
            },
            {
              id: 'selF7QqUHqEOOoO27',
              name: 'NEUROCARE PLUS CAPSULES',
            },
            {
              id: 'selrvQjvddMlyeLjE',
              name: 'NEURONTIN 100MG CAPS',
            },
            {
              id: 'seluRM5qxESfyPmVP',
              name: 'NEURONTIN 300MG CAPS',
            },
            {
              id: 'selvqQ2ZRJurnEDCK',
              name: 'NEURORUBINE FORTE TABLETS',
            },
            {
              id: 'seluhm4Q9MLUStSCk',
              name: 'NEURORUBINE INJECTION',
            },
            {
              id: 'selsTMNCYmUdWveHX',
              name: 'NEVANAC EYE DROPS 5ML',
            },
            {
              id: 'sel5JAilRGgzFIXqW',
              name: 'NEXIKEN KIT-TAKE THREE TABLETS TWICE DAILY (MORNING AND EVENINGSIDE)',
            },
            {
              id: 'seluduu6wcfDvvZ4m',
              name: 'NEXITO 10MG TABS',
            },
            {
              id: 'selwMJXC0WNEgIoMP',
              name: 'NEXITO 20MG TABS',
            },
            {
              id: 'selKLJYKxRxHWiYJL',
              name: 'NEXITO 5MG TABLETS',
            },
            {
              id: 'selyjz4ldAqwB6VUl',
              name: 'NEXIUM 20MG TABS (HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'seljGHgLH6AZnK4S2',
              name: 'NEXIUM 40MG INJ',
            },
            {
              id: 'selH5ylJOT8FiZAL7',
              name: 'NEXIUM 40MG TABS (HALF HOUR BEFORE MEALS)',
            },
            {
              id: 'seliR2MaNw17Atc06',
              name: 'NEXIUM SATCHETS 10MG(DISSOLVED IN 15ML WATER)',
            },
            {
              id: 'selZ2K3tp8fBHxU21',
              name: 'NICORETTE GUM 2MG',
            },
            {
              id: 'selLznx4PFDlYyPE4',
              name: 'NICORETTE GUM 4MG',
            },
            {
              id: 'selhHHF0FH83QRS28',
              name: 'NICORETTE PATCH 5MG 7S',
            },
            {
              id: 'selTT7eZQMgZKTS87',
              name: 'NIFEDI-DENK 10MG TABS.',
            },
            {
              id: 'selUh16ao1YzRymG8',
              name: 'NIFEDI-DENK 20MG TABS',
            },
            {
              id: 'selkHEiNQ10HOVcYU',
              name: 'NIFEDIPINE R 20MG',
            },
            {
              id: 'selmAgwxQEu1fth5e',
              name: 'NILOL TABLETS',
            },
            {
              id: 'seliiDKSMTqueJyka',
              name: 'NIMENRIX INJ',
            },
            {
              id: 'selHHZYQpRCXd3XGx',
              name: 'NIMOTOP 10MG INJECTION 50ML',
            },
            {
              id: 'selyFAASKI7wYuhbS',
              name: 'NIMOTOP 30MG TABLETS',
            },
            {
              id: 'selRIDFD7tv9TcAh1',
              name: 'NIQUITIN PATCH STEP 3',
            },
            {
              id: 'selYJqGZNc6LR8GEA',
              name: 'NIQUITIN PATCH STEP2',
            },
            {
              id: 'seliyCvoWHZv8bBCV',
              name: 'NIQUITIN PATCHES STEP 1',
            },
            {
              id: 'seluXqCaKUDL0AkmC',
              name: 'NITREST 10MGS TABS',
            },
            {
              id: 'selogt4Dp96zNZvNz',
              name: 'NITROFURANTOIN 100MG TABS',
            },
            {
              id: 'selUDrLqolyxnkoxW',
              name: 'NOOTROPIL 1200MG TABS',
            },
            {
              id: 'selsPi1lGDTmwcroB',
              name: 'NOOTROPIL 800MG TABS',
            },
            {
              id: 'sel3uuNiU0b3ATov2',
              name: 'NORADRENALINE 2MG/2ML',
            },
            {
              id: 'sel1P1knNrSSefeIK',
              name: 'NORADRENALINE 4MG/2ML',
            },
            {
              id: 'selFHqPp9PKVsCsYT',
              name: 'NORADRENALINE 8MG/4ML',
            },
            {
              id: 'selUp85NfGchnJxYd',
              name: 'NORDETTE TABLET',
            },
            {
              id: 'sel1m3t8nQzTOijzY',
              name: 'NORMAL SALINE 0.5L',
            },
            {
              id: 'selgS6aiaE2OHqxtr',
              name: 'NORMAL SALINE 1LT',
            },
            {
              id: 'selNNryAy6JBK2pU0',
              name: 'NORMAL SALINE 250MLS',
            },
            {
              id: 'selOwLg9kUedJhnH8',
              name: 'NORMAL SALINE 2LT',
            },
            {
              id: 'selHqeRxBFJrA3es2',
              name: 'NORMAL SALINE NASAL DROPS',
            },
            {
              id: 'selqyFjmXuFJwE6pW',
              name: 'NORPLANT IMPLANT 75mg',
            },
            {
              id: 'selKF3neWKLhLxax5',
              name: 'NORPLAT 75MG TABS',
            },
            {
              id: 'selOj6seb8V3cDbgt',
              name: 'NORPLAT-S 7575MG TABS',
            },
            {
              id: 'sel5qthv0UTL3IhS6',
              name: 'NORTIZ (NORFLOXACIN/TINIDAZOLE) TABS (AFTER A MEAL)',
            },
            {
              id: 'selCvtfW92eE9052u',
              name: 'NORVASC 10MG TABS',
            },
            {
              id: 'sel6dGoandOOCgNnc',
              name: 'NORVASC 5MG CAPS',
            },
            {
              id: 'sel7V84jsX24e8zRS',
              name: 'NORVIR CAPS 100MG',
            },
            {
              id: 'seliJwvNsse76NEwb',
              name: 'NOSIC TABLETS( 1/2 HOUR BEFORE MEALS)',
            },
            {
              id: 'selEJ9JF6ofXBkono',
              name: 'NOSPA 40MG TABLET (AFTER A MEAL)',
            },
            {
              id: 'selzoPhWFilnaxke7',
              name: 'NOSPA FORTE TABS 80MG',
            },
            {
              id: 'selJMWAeJLPBiKJ7d',
              name: 'NOSPA INJ 40MG2ML',
            },
            {
              id: 'selNg3Xpiv6b8eNd6',
              name: 'NOVAPRESSIN 1MG INJ (TERLIPRESSIN)',
            },
            {
              id: 'selRksCqyA9tAHAp4',
              name: 'NOVOMIX 3ML CARTRIDGE (STORE IN FRIDGE)',
            },
            {
              id: 'sele1g7kHZJdeKqGB',
              name: 'NOVOMIX FLEXIPEN 3ML (STORE IN FRIDGE)',
            },
            {
              id: 'selhgF42s39ixKer3',
              name: 'NOVONORM TABS 0.5MG',
            },
            {
              id: 'selXlxZsFGJYd3eS4',
              name: 'NOVONORM TABS 1MG',
            },
            {
              id: 'seloY0EtJcL8ZtoPo',
              name: 'NOVONORM TABS 2MG',
            },
            {
              id: 'selkv9rfQan1xrmYO',
              name: 'NOVORAPID FLEXIPEN 100IU/ML(STORE IN FRIDGE)',
            },
            {
              id: 'selcTGdWVbVOVEkJV',
              name: 'NUFORCE G-CREAM 20G',
            },
            {
              id: 'selDB05rOvy1vT8vY',
              name: 'NUNALAC INFANT FORMULAR 400G',
            },
            {
              id: 'sel2euDihBlTJJ8pv',
              name: 'NUTRICOMP D DIABETES 500ML',
            },
            {
              id: 'sel4WElBK5O2YAhVg',
              name: 'NUTRICOMP DRINK PLUS FIBRE',
            },
            {
              id: 'selq7Rtcp2wifVHJ5',
              name: 'NUTRICOMP DRINK PLUS FIBRE VANILLA 200ML',
            },
            {
              id: 'selDoauHnKUVTE1MF',
              name: 'NUTRICOMP DRINK PLUS STRAWBERRY 200ML',
            },
            {
              id: 'selKBC7Db8QNRmBl6',
              name: 'NUTRICOMP GLUTAMINE PLUS 500ML',
            },
            {
              id: 'selcJVRnh2wW3pUuK',
              name: 'NUTRICOMP HEPA 500ML',
            },
            {
              id: 'selbhHB4SHqe7X83O',
              name: 'NUTRICOMP HP FIBRE 500MLS',
            },
            {
              id: 'selaCVesYJgYGqQwQ',
              name: 'NUTRICOMP HP NEUTRAL 500MLS',
            },
            {
              id: 'selg9iXFPzXCAwI13',
              name: 'NUTRICOMP PEPTIDE 500ML',
            },
            {
              id: 'selDLrkOW2kYEzKS6',
              name: 'NUTRICOMP RENAL DRINK 200ML',
            },
            {
              id: 'seliGVnalYEo2g3jU',
              name: 'NUTRICOMP STANDARD FIBRE 500MLS',
            },
            {
              id: 'selfK1lB3O7YFTPzZ',
              name: 'NUTRICOMP STANDARD FRBRE DIABETES 500MLS',
            },
            {
              id: 'selNgkvEEvOzorApk',
              name: 'NUTRICOMPDIABETIC DRINK 200ML',
            },
            {
              id: 'selT6AVjReGC823TK',
              name: 'NUTRIFLEX LIPID SPECIAL 1250ML',
            },
            {
              id: 'sellP0F0GOo5jidJd',
              name: 'NUTRIFLEX LIPID SPECIAL 1875MLS',
            },
            {
              id: 'selXtmah4ANx1V6kJ',
              name: 'NUTRIFLEX PERIPHERAL 1250ML',
            },
            {
              id: 'seleOgBhgTieTX5gU',
              name: 'NUTRIFLEX SPECIAL 1000MLS',
            },
            {
              id: 'seliN5raMCOngvEiX',
              name: 'NYSTATIN ORAL DROPS( TO BE USED ORALLY)',
            },
            {
              id: 'selAw00tmB036ylSB',
              name: 'Naproxen Tabs',
            },
            {
              id: 'seljtWPvjt6rSz2wB',
              name: 'Nebilong-AM',
            },
            {
              id: 'selbDVJJCdZcDiNhZ',
              name: 'Netazox',
            },
            {
              id: 'selD0G7L5tHDzRHGk',
              name: 'Neuroforte',
            },
            {
              id: 'sels4bE457Jpr6sO0',
              name: 'Nicorette Patch 10mg',
            },
            {
              id: 'sel6xzeIXx8qDIUy1',
              name: 'Nicorette Patch 15mg',
            },
            {
              id: 'selHfCGptwnpkhbJ0',
              name: 'Nicorette Patch 25mg',
            },
            {
              id: 'selJWux0aX9poGy0s',
              name: 'Nifedipine 5mg',
            },
            {
              id: 'selK0lFW7XLd3DS3Q',
              name: 'Nifpine retard 20mg',
            },
            {
              id: 'selOwJkvL2515Fdt0',
              name: 'Nitronal 1mg/1ml',
            },
            {
              id: 'selWRj3YfWHfgfirr',
              name: 'No drug',
            },
            {
              id: 'sel69NbGypuc9kbK8',
              name: 'Nogluc 5mg ',
            },
            {
              id: 'sel8PZZLbNt3arXSM',
              name: 'Norco',
            },
            {
              id: 'selelA05ejgjnS0PC',
              name: 'NovoRapid Flexpen',
            },
            {
              id: 'selURY6UZwHD6euI9',
              name: 'OCUFLUR EYE DROPS 5ML',
            },
            {
              id: 'selcouvjCOuQd7esn',
              name: 'OFLAN ER (OFLOXACIN)',
            },
            {
              id: 'selhYiaT5q3sfj4Xy',
              name: 'OFLOXACIN 200MG TABS',
            },
            {
              id: 'selFAhcEMZ3CtQe7I',
              name: 'OFTALAR EYE DROPS 5ML',
            },
            {
              id: 'selJUxfYDB2yIEfMz',
              name: 'OILATUM CREAM 40G',
            },
            {
              id: 'selKvifM3hyhPUkiY',
              name: 'OILATUM EMOLLIENT 250ML',
            },
            {
              id: 'selu3f9eeFZt4Wdn3',
              name: 'OILATUM JUNIOR CREAM',
            },
            {
              id: 'selH2DYPv9t7Gv27T',
              name: 'OILATUM SOAP 100G',
            },
            {
              id: 'selGEru7xyisJ2Rgw',
              name: 'OKAVAX VACCINE',
            },
            {
              id: 'selb2H4Xqy3uDjMy4',
              name: 'OLANZEPINE 10MG INJ.',
            },
            {
              id: 'selFUjTsdf6EktWPi',
              name: 'OLEANZ 10MG TABS',
            },
            {
              id: 'selYfrkTpZ7zrpOjs',
              name: 'OLEANZ 5MG TABS.',
            },
            {
              id: 'selzqBz0ptif8AZKs',
              name: 'OLFEN 100MG SUPP.',
            },
            {
              id: 'selrHgfVqg7ezcypW',
              name: 'OLFEN 25MG TABS(AFTER  A MEAL)',
            },
            {
              id: 'selI31C0K4w1TPmvR',
              name: 'OLFEN 75MG SR DEPOTABS (AFTER  A MEAL)',
            },
            {
              id: 'selK1w5INYdtteMKP',
              name: 'OLFEN SR 100MG CAPS (AFTER  A MEAL)',
            },
            {
              id: 'selm3QOV6YKY1xaCl',
              name: 'OLIGOCARE TABLETS',
            },
            {
              id: 'selbTjRyYtHlbpx5W',
              name: 'OLVANCE 20MG TABS',
            },
            {
              id: 'selOkY5RwthrKNfWl',
              name: 'OLVANCE20-HCT TABS',
            },
            {
              id: 'selRdkZfeoMDwOVsp',
              name: 'OLVANCE40-HCT TABS',
            },
            {
              id: 'selNX1hFZ2bc0nEco',
              name: 'OMASTIN 50MG5ML 35ML',
            },
            {
              id: 'selqI5YS4MLEkXf3K',
              name: 'OMASTIN CAPS 50MG',
            },
            {
              id: 'seleLaAsc0nl83UUz',
              name: 'OMEGA H3 CAPSULES',
            },
            {
              id: 'selTqosQvnTSqKYZp',
              name: 'ONAZIN EYE DROPS',
            },
            {
              id: 'selr3Ka2Qwo2fHc5K',
              name: 'ONDERM 4MG TABS',
            },
            {
              id: 'selhCccHSxRBidgis',
              name: 'ONGLYZA TABS 5MG',
            },
            {
              id: 'selvm8egUN3RJLPgb',
              name: 'OPTILUBE GEL 6ML',
            },
            {
              id: 'selYXCKxirag9zhdN',
              name: 'OPTIVE EYE DROPS 10ML',
            },
            {
              id: 'selTXHvRVtmsU1FhX',
              name: 'OPTIVE PLUS EYE DROPS 10ML',
            },
            {
              id: 'sel2CYKzPvQL60HMD',
              name: 'OPTIVE+ EYE DROPS',
            },
            {
              id: 'sel9AHuPqxNQvnSyA',
              name: 'OPTREX DROPS',
            },
            {
              id: 'selYKMu9GVFKvkjay',
              name: 'ORAL REHYDRATION SALTS',
            },
            {
              id: 'selNM97EtouVvIYqT',
              name: 'ORCLEN GEL 15ML',
            },
            {
              id: 'selRj84okukBIEFaT',
              name: 'ORELOX 100MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selRcQL0VXQEUIx9w',
              name: 'ORELOX 200MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selGMXNqIsnnXaZ7x',
              name: 'ORELOX 40MG5ML 100ML SYR(STORE IN FRIDGE)',
            },
            {
              id: 'seleXJRPj0JcqQK8d',
              name: 'ORELOX 40MG5ML 50ML(STORE IN FRIDGE)',
            },
            {
              id: 'selmKR5yiwTv4URKl',
              name: 'ORGAMETRIL 5mg ',
            },
            {
              id: 'seltvjC9jwJNOBh4e',
              name: 'ORNILOX TABS(AFTER A MEAL)',
            },
            {
              id: 'selC0cGY5oqtKbydo',
              name: 'ORUSH DROPS 15ML',
            },
            {
              id: 'selRqYd39d9Zq5nVJ',
              name: 'OSTEOCARE PLUS',
            },
            {
              id: 'sele6WIdH67fZqfvO',
              name: 'OSTEOCARE TABS',
            },
            {
              id: 'selp9YKq6AwtO010F',
              name: 'OTOREX EAR DROPS',
            },
            {
              id: 'sel2PpetXWV3OSXFs',
              name: 'OTRIVIN NASAL DROPS "A" (Novartis)',
            },
            {
              id: 'selpIRDcaOhdUx2To',
              name: 'OTRIVIN NASAL DROPS "C" (Novartis)',
            },
            {
              id: 'sel7p6xV6tkedDS7k',
              name: 'OVACARE CAPS',
            },
            {
              id: 'selLJ5ZOKVeBMpOnl',
              name: 'OVESTIN 1mg ',
            },
            {
              id: 'selddzt541BY8Ff3u',
              name: 'OXALIPLATIN 100MG INJ.',
            },
            {
              id: 'selzL21z9SSB1A5u2',
              name: 'OXALIPLATIN 50MG INJ',
            },
            {
              id: 'selCkce1ORW08SYJS',
              name: 'OXETOL 300MG TABS.',
            },
            {
              id: 'selXYWjfNfD5Zz1A5',
              name: 'OXIFAST P(lornoxicam 4mg/paracetamol 500mg)(AFTER A MEAL)',
            },
            {
              id: 'selOmHcD0A3GPBN1y',
              name: 'OXYBUTYNIN 5MG TABLETS',
            },
            {
              id: 'selXTRMVi9IKXNDiw',
              name: 'OXYCODON 10MG TABS',
            },
            {
              id: 'selTPMvl96rLzEl0B',
              name: 'OXYCODON 20MG TABS',
            },
            {
              id: 'selRGiWxbGKUJdiwg',
              name: 'OXYCODON 40MG TAB',
            },
            {
              id: 'selZXysETcC3qKY3B',
              name: 'OXYLIN EYE DROPS 15ML',
            },
            {
              id: 'selwhZtBOrCFbBjnZ',
              name: 'OZAPEX 10MG (OLANZEPINE)',
            },
            {
              id: 'selA38a1TcMBJbVbv',
              name: 'Ojen Oz',
            },
            {
              id: 'sel7VcPno2QzsIDSE',
              name: 'Olmat HCT 20mg',
            },
            {
              id: 'seljyXWtQPUSKrZhE',
              name: 'Olmat HCT 40mg',
            },
            {
              id: 'selP6WFc3wg53iT4S',
              name: 'Ondem 4mg injection',
            },
            {
              id: 'seldMleiW9uIApn0y',
              name: 'Onegaba 300mg',
            },
            {
              id: 'selmTAeP5PigM1oJ4',
              name: 'Orcef 400mg ',
            },
            {
              id: 'seljKsz6Bi7ZJzTqc',
              name: 'Orfix 200mg ',
            },
            {
              id: 'sel8SOIrH0484smMQ',
              name: 'Other',
            },
            {
              id: 'selk1petEyWxzMwel',
              name: 'Otipax',
            },
            {
              id: 'selY0TEIAOynFRA1i',
              name: 'Ozitas 10mg',
            },
            {
              id: 'selAa41aoYp7KJSE0',
              name: 'Ozitas 5mg',
            },
            {
              id: 'selF2F6vWreWGzjzu',
              name: 'PABAL (CARBETOCIN) 100MCG/ML',
            },
            {
              id: 'selhuGmL0DJ0aLyIY',
              name: 'PABRINEX 1&2 INJ. I.V',
            },
            {
              id: 'selfhQVOjIgsUeRlA',
              name: 'PACLITAXEL 100MG INJ.',
            },
            {
              id: 'sel4jSzzekfKdJXPr',
              name: 'PACLITAXEL 260MG INJ',
            },
            {
              id: 'selvooO82tDV5OqR2',
              name: 'PACLITAXEL 30MG INJ.',
            },
            {
              id: 'selsC6LkzJaEMaPrX',
              name: 'PALUDRIN 100MG TABLETS',
            },
            {
              id: 'selkpdhF8QwYdJtv8',
              name: 'PALUTHER 80MG INJ',
            },
            {
              id: 'selpOLQsTsy9J5Apm',
              name: 'PALUTHER INJ 40MG',
            },
            {
              id: 'sel3efMjgHLM7U3WR',
              name: 'PAM (PRALIDOXIME) INJ',
            },
            {
              id: 'selJ1vdW6E0sVAFgX',
              name: 'PANADOL 500MG TABLETS',
            },
            {
              id: 'selP9Vqkb3kP5ubgR',
              name: 'PANADOL ACTIFAST 500MG TABLETS',
            },
            {
              id: 'selT87vfDZ5UgfJ3r',
              name: 'PANADOL ADVANCE TABS 500MG',
            },
            {
              id: 'selcu9l5Ohl5E5BO3',
              name: 'PANADOL ELIXIR 100ML(5-12YRS)',
            },
            {
              id: 'self5HIt35uYIovxy',
              name: 'PANADOL EXTRA TABLETS',
            },
            {
              id: 'selxz56lANEBuCNZi',
              name: 'PANADOL LIQUID100ML(FROM 2 MONTHS)',
            },
            {
              id: 'selRBwiV3YXEoIf28',
              name: 'PANDERM CREAM',
            },
            {
              id: 'selBaI8HD4uSx58Hf',
              name: 'PANDERM OINTMENT',
            },
            {
              id: 'sel1yeoZx2RqTp84a',
              name: 'PANTOCID INJ 40MG',
            },
            {
              id: 'sel2WYXHH1BINcQvg',
              name: 'PANTOCID TABS 20MG( HALF HOUR BEFORE A MEAL)',
            },
            {
              id: 'seld2vVaduiJBhmLI',
              name: 'PANTOCID TABS 40MG( HALF HOUR BEFORE A MEAL)',
            },
            {
              id: 'sel4BUcxW7dylrmRA',
              name: 'PANTOGAR CAPSULES',
            },
            {
              id: 'selMZRyStXtRYVLqW',
              name: 'PANTOLOC TABS 20MG',
            },
            {
              id: 'selXIhg83Kbgzte4S',
              name: 'PANTOPRAZOLE 20MG (PAN-20) TABS(1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selD1XOuPft9wqqYL',
              name: 'PANTOPRAZOLE(PAN-40) 40MG INJ VIAL',
            },
            {
              id: 'sel4qz0yaBycke40c',
              name: 'PANTOPRAZOLE(PAN-40)TABS 40MG)(1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selwgzyM70wgyxFKE',
              name: 'PAPAVERINE HCL 30MG/ML (2ML)',
            },
            {
              id: 'selGsg5b5jTBRoHlS',
              name: 'PARACETAMOL 500 MG',
            },
            {
              id: 'selbQ47kJ5qjrZJNh',
              name: 'PARAFAST 1GM EFFERVESCENT TABS',
            },
            {
              id: 'selTwDTVp1OB4Cnez',
              name: 'PARAFAST 500MG EFFERVESCENT TABS',
            },
            {
              id: 'selldMGEIgpFDHXdi',
              name: 'PARIET 10MG (RABEPRAZOLE)',
            },
            {
              id: 'seltP5BLHmKKXh3Hk',
              name: 'PARIET 20MG TABS(1/2  HOUR BEFORE A MEAL)',
            },
            {
              id: 'sel5Itf0mb8KucrZO',
              name: 'PAROL SUSP 250MG/5MLS (PARACETAMO) 100ML',
            },
            {
              id: 'selb3GpXRxwqSyWFc',
              name: 'PATANOL 0.1% EYE DROPS ( ,Alcon)',
            },
            {
              id: 'selj9QZ89e9jkJ1uX',
              name: 'PAVULON, Organon Pharma Essex  INJ 4mg/ml in 1ml',
            },
            {
              id: 'selFa55F5F3ErJveN',
              name: 'PEDIAGOLD VANILLA FLAVOR 400MG-PD',
            },
            {
              id: 'self5E1GPgFpMFyK5',
              name: 'PEDIASURE NUT. POWDER 400G',
            },
            {
              id: 'sellMJTSJkGpZDwSG',
              name: 'PEDIASURE NUTRITION POWDER VANILLA 850G',
            },
            {
              id: 'seloNinO7cO6QdaZW',
              name: 'PEGLEC POWDER SATCHETS',
            },
            {
              id: 'sel37rdqzhgqjSRsc',
              name: 'PENAMOX 125MG5ML SYR',
            },
            {
              id: 'seljD0ZzhC9jSOSnL',
              name: 'PENAMOX 250MG BLISTER CAPS',
            },
            {
              id: 'selH2Z9aySbj3eSXA',
              name: 'PENAMOX 500MG(BLISTER)',
            },
            {
              id: 'selVN0pnoqhnP0w5d',
              name: 'PENAMOX FORTE 250MG5ML',
            },
            {
              id: 'selnhafovHz6o4h2W',
              name: 'PENICILLAMINE TAB 250mg (Alliance UK)',
            },
            {
              id: 'selClMG8ue9ApIJN0',
              name: 'PENICILLIN V TABS 250MG',
            },
            {
              id: 'selGuhKmxUlmz1FXi',
              name: 'PENTASURE CRITIPEP SATCHETS',
            },
            {
              id: 'selDb0L14HxEetxuJ',
              name: 'PENTASURE VANILLA 400GM',
            },
            {
              id: 'seld6DFJ8YAhxTCB1',
              name: 'PENTAXIM HIB INJ (Sanofi Aventis)',
            },
            {
              id: 'sel5YfxFmD8FTLBsj',
              name: 'PENTAXIM VACCINE',
            },
            {
              id: 'sel73iVZCSVNlo1WO',
              name: 'PERNEX AC 5% GEL',
            },
            {
              id: 'sel4bDc75hmekeDhw',
              name: 'PERSANTIN TABS 200MG',
            },
            {
              id: 'selL2vxvWZ6UVoaLf',
              name: 'PETHIDINE INJ 100MG',
            },
            {
              id: 'selaUzhriYPlGX5X1',
              name: 'PETHIDINE INJ 50MG',
            },
            {
              id: 'seleAtbrDrJCa3vAP',
              name: 'PHARMATON MATRUELLE ',
            },
            {
              id: 'sel8zDXuhgPzKIbw5',
              name: 'PHENORBABITONE INJ 120MG',
            },
            {
              id: 'selpO55fvlhhgHVti',
              name: 'PHENORBABITONE INJ 200MG',
            },
            {
              id: 'selk2wHRUkk90Dvye',
              name: 'PHENYTOIN INJ. 250MG',
            },
            {
              id: 'selTpkDoIt27GvZ6I',
              name: 'PHENYTOIN SODIUM 100MG',
            },
            {
              id: 'selWXqr3pQJKcd2UR',
              name: 'PHENYTOIN TABS. 50MG',
            },
            {
              id: 'selJVCaRTT5LMkTlE',
              name: 'PHLEBODIA TABLETS',
            },
            {
              id: 'selCeBnu14wxZcxTw',
              name: 'PHYSIOGEL A I LOTION 200ML',
            },
            {
              id: 'selnArGMp0bywJHNF',
              name: 'PHYSIOGEL CREAM 40ML',
            },
            {
              id: 'seluOMGEP7I7U0v9A',
              name: 'PHYSIOGEL CREAM 75ML',
            },
            {
              id: 'seln22L95SosQgtLV',
              name: 'PHYTORAL OINTMENT 15G',
            },
            {
              id: 'selzWWU6FsSSwehUR',
              name: 'PHYTORAL SHAMPOO 100ML',
            },
            {
              id: 'selGiw57Cy5TQ3HgS',
              name: 'PHYTORAL TABS 200MG',
            },
            {
              id: 'selBxW3XXneuGzLrH',
              name: 'PICOLAX SATCHETS',
            },
            {
              id: 'selF1GYnolTQ8Mhye',
              name: 'PILOCARPINE EYE DROPS 2%',
            },
            {
              id: 'selsxdcLIBzBFpxlc',
              name: 'PIODAY 15MG TABS',
            },
            {
              id: 'selUS8sADxBkahwlF',
              name: 'PIODAY 30MG TABS (WITH A MEAL)',
            },
            {
              id: 'selno5Imwq78UgNzZ',
              name: 'PIODAY M 15500MG TABS',
            },
            {
              id: 'selKMngiIAHldpKYk',
              name: 'PIOGLIT 15MG TABS.',
            },
            {
              id: 'selZpC39uqntHM0mx',
              name: 'PIOGLIT 30MG TABS',
            },
            {
              id: 'selU3L3DiLmEyYixn',
              name: 'PIOSAFE MF TABS',
            },
            {
              id: 'selGPppzh5Nay37Ux',
              name: 'PIPZO 4.5 INJECTION',
            },
            {
              id: 'sel4rYmIbVKtPcT5X',
              name: 'PIRFENEX(PIRFENIDONE) 200mg',
            },
            {
              id: 'selrn7Z9WD1XitwTZ',
              name: 'PIRITON EXPECTORANT',
            },
            {
              id: 'sel6eQM76Unn2Wm8V',
              name: 'PIRITON INJ 10MGML',
            },
            {
              id: 'selycmRFCfqpZyVjq',
              name: 'PIRITON SYRUP 2mg/5ml 100ml ',
            },
            {
              id: 'sel1mSWDomih0Ghq0',
              name: 'PIRITON TABLETS 4MG',
            },
            {
              id: 'seliLfHF54WJzCZCf',
              name: 'PITAVA 1MG TABS',
            },
            {
              id: 'selis9eoeQOKLWVrG',
              name: 'PITAVA 2MG TABS',
            },
            {
              id: 'selrfWC6q5UhnTWqJ',
              name: 'PLAVIX 75MG TABLETS',
            },
            {
              id: 'sel2FkzK6veKGzWsU',
              name: 'PLENDIL 10MG TABS',
            },
            {
              id: 'seled2y9k2yEZMsWE',
              name: 'PLENDIL 2.5MG TABS',
            },
            {
              id: 'selx6JI9jfSduebRZ',
              name: 'PLENDIL 5MG TABS',
            },
            {
              id: 'selUlxwunkWKHyKUD',
              name: 'PLETAL 100MG TABS',
            },
            {
              id: 'seljvwMzKfzxjSH2X',
              name: 'PLETAL 50MG TABS',
            },
            {
              id: 'selCTkTXFO6HLXnjT',
              name: 'PNEUMO-23',
            },
            {
              id: 'sel6MsQfHNXYVv4uU',
              name: 'PODOSAL OINTMENT',
            },
            {
              id: 'selmZ3ypyDIUgHXCC',
              name: 'PODOSAL PAINT 10ML',
            },
            {
              id: 'selYDEFtvolds81Hi',
              name: 'POLIO VAC SINGLE DOSE',
            },
            {
              id: 'sel7fJTp5jfKe6uH4',
              name: 'POLYGYNAX OVULES 12S',
            },
            {
              id: 'sell0pVeopeZFmgsm',
              name: 'POLYGYNAX OVULES 6S',
            },
            {
              id: 'selriDI7dY4eVBQ1b',
              name: 'PONSTAN 250MG CAPSULES (AFTER A MEAL)',
            },
            {
              id: 'sel0nc8mavXpsoC5S',
              name: 'PONSTAN FORTE 500MG TABS.(AFTER MEALS)',
            },
            {
              id: 'sel94LQKAPiSnwyDo',
              name: 'POSTINOR TABS 0.75MG',
            },
            {
              id: 'selWstQcquuAJJXux',
              name: 'POTASSIUM CHLORIDE INJ. 10ML',
            },
            {
              id: 'selyd9N3yvzgntAPY',
              name: 'POTASSIUM CITRATE SOLUTION',
            },
            {
              id: 'selUYKAn1fDyIjtrc',
              name: 'POWERCEF INJ 0.5MG I.MV',
            },
            {
              id: 'selWUSNv260BHXSAw',
              name: 'POWERCEF INJ 1GM I.MV',
            },
            {
              id: 'seluTcsnZRa341Ver',
              name: 'POWERGESIC GEL',
            },
            {
              id: 'selAtQj9oR0CZBLCG',
              name: 'POZINEG (CEFEPIME) 1G',
            },
            {
              id: 'selTG4JAu33X2BjpT',
              name: 'PRADAXA 110MG CAPS',
            },
            {
              id: 'sel5wwVz697f0oUKw',
              name: 'PRADAXA 150MG CAPS',
            },
            {
              id: 'selWKnN3B3uOXcSRy',
              name: 'PRADAXA CAPS 75MG',
            },
            {
              id: 'sels8oX4ROs96f83c',
              name: 'PRALIDOXIME 200MG INJ.',
            },
            {
              id: 'selRyOTSfGGp3EnBH',
              name: 'PRASUSAFE 10MG TABS',
            },
            {
              id: 'selWl4aKta0E3YPX1',
              name: 'PRE-NAN MILK 400G',
            },
            {
              id: 'sel6lGjQ7ODuq17s1',
              name: 'PRED FORTE EYE DROPS',
            },
            {
              id: 'sel1QxmAfCSgpf02E',
              name: 'PREDNISOLONE 5MG TABLETS',
            },
            {
              id: 'sel1JIaS3JTJyOiaI',
              name: 'PREDNISOLONE BLISTER 5MG (AFTER A MEAL)',
            },
            {
              id: 'sel3pKjnjygqQZbns',
              name: 'PREDNISOLONE ENEMA (PREDSOL) 100ML',
            },
            {
              id: 'sel2dzqfRICCVURRX',
              name: 'PREDNISOLONE EYE DROPS',
            },
            {
              id: 'selNiGF5bPf6y9UhQ',
              name: 'PREDNISONE TABLET 5mg (Cosmos)',
            },
            {
              id: 'selqNV4fpTWn0bVjK',
              name: 'PREDSOL 5MG/5ML SYRUP 50ML( AFTER A MEAL)',
            },
            {
              id: 'sel3igfeV34QI6mEA',
              name: 'PREDSOL FORTE 15MG/5ML SYRUP(AFTER A MEAL)',
            },
            {
              id: 'seltfzl6rNVw5cLgu',
              name: 'PREFRIN EYE DROPS 15ML',
            },
            {
              id: 'sel4RsA2qO8dESIjw',
              name: 'PREGNACARE CAPSULES',
            },
            {
              id: 'selV1jDxVSq277jWF',
              name: 'PREGNACARE PLUS OMEGA CAPS (TAKE A PAIR DAILY)',
            },
            {
              id: 'selyeJJdgXg4VZfRs',
              name: 'PRELONE SYRUP(PREDNISOLONE 15MG/5ML) 50ML',
            },
            {
              id: 'selcyb5kfak8hfSpW',
              name: 'PREMARIN 0.3MG TABS',
            },
            {
              id: 'seldUM6qOFCTEPkFT',
              name: 'PREMARIN 0.625MG TABS PACK',
            },
            {
              id: 'sel3Z0Vno6pwpto9V',
              name: 'PREMARIN 1.25MG TABS PACK',
            },
            {
              id: 'selq6SChVQedUQrgr',
              name: 'PREMARIN T 0.3mg',
            },
            {
              id: 'selFfz3xpiodfMQag',
              name: 'PREMARIN VAGINAL CREAM 14G',
            },
            {
              id: 'sel7TyffWsX30ZdFi',
              name: 'PREMARIN VAGINAL CREAM 62.5G',
            },
            {
              id: 'selmRQrohcKoW3ldU',
              name: 'PREMPAK-C 0.625MG/0.15MG',
            },
            {
              id: 'seldQxDPELOnLW8ow',
              name: 'PRESARTAN 25MG TABS',
            },
            {
              id: 'selbZyXTVsDGFy8Xe',
              name: 'PREVENAR 13 VACCINE',
            },
            {
              id: 'selukMUAWqj0EgY0n',
              name: 'PREZISTA 600MG TABS',
            },
            {
              id: 'selsV4Qa4PholyJyo',
              name: 'PRIMAQUIN TAB 7.5MG',
            },
            {
              id: 'selxssVmobZBnWZyX',
              name: 'PRIMAQUINE 15MG TABS',
            },
            {
              id: 'selBf2gzjJN2HADpB',
              name: 'PRIMOLUT DEPOT 250MG INJ.',
            },
            {
              id: 'selo9R0GRAH9dMlYX',
              name: 'PRIMOLUT N TAB 5mg ',
            },
            {
              id: 'selnhMCbptgz1NvPL',
              name: 'PRIORIX TETRA VACCINE',
            },
            {
              id: 'selXd6rVaA2873W62',
              name: 'PRIORIX [MMR] VACCINE',
            },
            {
              id: 'seluf0CTKuH02UDbE',
              name: 'PROBETA N DROPS 7.5ML',
            },
            {
              id: 'selAh4sMW0W2W0tvz',
              name: 'PROCORALAN 5MG TABS (IVABRADINE)',
            },
            {
              id: 'seltANbcHixHN6ctk',
              name: 'PROCORALAN(IVABRADINE) 7.5MG',
            },
            {
              id: 'selomfCLIicOAahJU',
              name: 'PROGUANIL TABS 100MG',
            },
            {
              id: 'selcEsMr2tDXJ6MGS',
              name: 'PROGYNOVA 2MG TABS',
            },
            {
              id: 'selAZjRdyd355RSSR',
              name: 'PROMETHAZINE 25MG TABLETS',
            },
            {
              id: 'self5mntViUwAmjlB',
              name: 'PROMETHAZINE INJ. 25MGML',
            },
            {
              id: 'selWVYEQkkkYbkpIo',
              name: 'PROPRANOLOL 40MG TABLETS',
            },
            {
              id: 'selqmNrBH60kOPjVF',
              name: 'PROSTIN 3MG TABS',
            },
            {
              id: 'sel2Fsg2FIovA2sqo',
              name: 'PROSTIN F2 ALPHA INJ 5MGML',
            },
            {
              id: 'selMzJKB1a8aff59D',
              name: 'PROTAMINE SULPHATE INJ 10mg/ml in 5ml ampoules (UCB Pharma)',
            },
            {
              id: 'sel8kZnbEBQoV0ODZ',
              name: 'PROTELOS SATCHET 2G',
            },
            {
              id: 'selcrWtxL58lno4qJ',
              name: 'PROVASK 10MG TABS',
            },
            {
              id: 'sel8Y1ToKW0Aa0byQ',
              name: 'PROVASK 5MG TABS',
            },
            {
              id: 'selnYIOVEE52xECyH',
              name: 'PROVERA 5MG TABLETS',
            },
            {
              id: 'selWVsCjYhbutwIkv',
              name: 'PROVIDE EXTRA DRINK 200ML',
            },
            {
              id: 'selYwfkrNaW8gKljV',
              name: 'PROZAC CAPSULES 20MG',
            },
            {
              id: 'selDfNdqCX1DdHxXA',
              name: 'PULMICORT 0.25MG NEB.SOLN',
            },
            {
              id: 'selas8f6LNq9TRQyU',
              name: 'PULMICORT 0.5MG NEB.SOLN',
            },
            {
              id: 'selqLjT09FxL5O9lo',
              name: 'PULMOCEF 1.5GM VIAL',
            },
            {
              id: 'sel5Q6WNTQUCc3zS3',
              name: 'PULMOCEF 500MG',
            },
            {
              id: 'selRvf9Gv7kF8zXKd',
              name: 'PULMOCEF INJ 750MG',
            },
            {
              id: 'selcLe93ZGB0qzY3f',
              name: 'PULMOFIRST  62.5MG TABS',
            },
            {
              id: 'selgFn136XI7fssWA',
              name: 'PULMOFIRST 125MG TABS',
            },
            {
              id: 'selw11PCVzgiDZHog',
              name: 'PURECAL SUSP 200ML',
            },
            {
              id: 'selLR5Aa7gMlLAMu0',
              name: 'PURECAL TABLETS (CHEWABLE)',
            },
            {
              id: 'selVSsODAzXrCgw4M',
              name: 'PURELAN 100 (LANOLIN) 7G',
            },
            {
              id: 'selYAAo3mVNy0kjwU',
              name: 'PURINETHOL TABLET 50mg (GSK)',
            },
            {
              id: 'selMGxN8KqqCoId3A',
              name: 'PYLORATE (GLYCOPYLORATE) 0.2MG/ML VIAL',
            },
            {
              id: 'selhNUDtPQq5fDC2q',
              name: 'PYNSTOP TABLETS ( AFTER MEALS)',
            },
            {
              id: 'selALcASMGNZ47FI8',
              name: 'PYRAMAX GRANULES 60/20MG',
            },
            {
              id: 'selJayqRePQOFfRgJ',
              name: 'PYRAMAX TABS 180MG/60MG(PYRONARIDINE TETRAPHOSPHATE/ARTESUNATE',
            },
            {
              id: 'sellzlToCj83qtixr',
              name: 'PYRAZINAMIDE 500MG TABLETS',
            },
            {
              id: 'selR9UJxCspQlxd56',
              name: 'PYRAZINAMIDE 750MG TABLETS',
            },
            {
              id: 'selgu29WCK0Y3fbp5',
              name: 'PYRAZINAMIDE SYRUP',
            },
            {
              id: 'selhlND4CNdYUrpF6',
              name: 'PYRIDOXINE 50MG TABLETS',
            },
            {
              id: 'selaYeUZSlKeyXcQM',
              name: 'Pantoprazole 40mg',
            },
            {
              id: 'selu4BHMjqolJS8cQ',
              name: 'Paracerol 1gm Injection',
            },
            {
              id: 'selW5a8JGcoFG2Aja',
              name: 'Paracetamol 2ml',
            },
            {
              id: 'selniD4hV8O00lWRH',
              name: 'Paracetamol 500mg',
            },
            {
              id: 'selPojY1U0OrOHrJ7',
              name: 'Paradenk 125mg ',
            },
            {
              id: 'sel2W1zfhDDgypolI',
              name: 'Paradenk 250mg ',
            },
            {
              id: 'selcTbgmYGOSBOKbD',
              name: 'Parafusiv 1gm',
            },
            {
              id: 'seljclLAgx1ivHDXM',
              name: 'Parafusiv 500mg ',
            },
            {
              id: 'selAhDZ8PgwH7U1Ey',
              name: 'Peditral',
            },
            {
              id: 'selSKyrjTDZi0oVEu',
              name: 'Peditral ',
            },
            {
              id: 'sela190WvcZWWwH3i',
              name: 'Phenobarbitone 30mg(Cosmos)',
            },
            {
              id: 'selTepDzEZdMQAn4F',
              name: 'Pitricin 20iu',
            },
            {
              id: 'selnonKrGOwEkOpCh',
              name: 'Preterax 5mg',
            },
            {
              id: 'selCYtsQbAhli9jZm',
              name: 'Prodep 20mg',
            },
            {
              id: 'seljJIpus1jFdMku3',
              name: 'Propranolol  40mg',
            },
            {
              id: 'selJDAhM7waTs1bRf',
              name: 'Pynstop',
            },
            {
              id: 'selwAwQm31YIdNcej',
              name: 'QUININE 600MG INJ',
            },
            {
              id: 'selRJG1l5c31jSC2W',
              name: 'QURION 100ML',
            },
            {
              id: 'seljQpzO4l3CYkZKe',
              name: 'QUTIPIN TABS 100MG',
            },
            {
              id: 'selB0bGs6llvWal2T',
              name: 'QUTIPIN TABS 200MG',
            },
            {
              id: 'selv0x9civGy9xenr',
              name: 'QUTIPIN TABS 300MG',
            },
            {
              id: 'sel63780PHyPGBYDv',
              name: 'QUTIPIN TABS 50MG',
            },
            {
              id: 'selGaudoMd9U2QxzM',
              name: 'Questran',
            },
            {
              id: 'sel0CQkKyGewjj7xT',
              name: 'Quinas 300mg',
            },
            {
              id: 'selqrjAh6Rz7Glr3I',
              name: 'RABELOC 20MG TABS (1/2 HOUR BEFORE A MEAL)',
            },
            {
              id: 'selwxQ8ZriSwGphdJ',
              name: 'RABELOC INJ 20MG',
            },
            {
              id: 'selkgzgqKct80a92x',
              name: 'RABIES IMMUNOGLOBULIN 150IU/ML (Pasteur Merieux)',
            },
            {
              id: 'selfBPjRTLVN2yt8D',
              name: 'RAMIPRIL 5MG TAB',
            },
            {
              id: 'selzSWuOPgMXvFR6u',
              name: 'RANCV (RANOLAZINE) 500MG',
            },
            {
              id: 'selHJh2Jq9XPo8FGJ',
              name: 'RANFERON CAPS',
            },
            {
              id: 'selOe1okW1rqSpk7V',
              name: 'RANFERON-12 SYR 200ML',
            },
            {
              id: 'sell8lDh6shzUEF9F',
              name: 'RAPEED 20MG (RABEPRAZOLE)',
            },
            {
              id: 'selDDg6ma9n24aG3R',
              name: 'RAZID M TABLETS',
            },
            {
              id: 'selFwwTICPnOmbdId',
              name: 'RECARTIX CAPS',
            },
            {
              id: 'selBy5aOz1kPT8fPM',
              name: 'RECARTIX FORTE TABLETS',
            },
            {
              id: 'selipP4CDcilpgnUi',
              name: 'RECORMON 5000 IU INJ',
            },
            {
              id: 'selLNQaPSYFKx5eK5',
              name: 'RECORMON INJ 2000IU',
            },
            {
              id: 'sel2dJiY2HnTIeb31',
              name: 'RECORMON INJ 5000IU/vial (Roche)',
            },
            {
              id: 'selBsSID6rgmigmHi',
              name: 'RECTOGESIC OINT. 30g',
            },
            {
              id: 'selT87nX2s5CRcvWW',
              name: 'REFRESH LIQUIGEL 10% 15ML',
            },
            {
              id: 'seliHVF01JhEALuco',
              name: 'REFRESH LIQUIGEL 15ML',
            },
            {
              id: 'selBdy7EwoJFsSqLK',
              name: 'REFRESH TEARS DROPS 15ML',
            },
            {
              id: 'seloeCqFkrJJ9oqGN',
              name: 'REGEN D-150 15ML',
            },
            {
              id: 'selxHZOFxdm2Wc8C5',
              name: 'REGEN D-60 15ML',
            },
            {
              id: 'selyX84co2isY0w5U',
              name: 'REGEN D-60 7.5ML',
            },
            {
              id: 'selWX8QENYDCvrNWk',
              name: 'REGEN-D 150 7.5ML',
            },
            {
              id: 'sel6mhjcgMfOYWlYC',
              name: 'REGENOVEX CAPSULES',
            },
            {
              id: 'selNvxiXpeV45CnLU',
              name: 'REGENOVEX CAPSULES ',
            },
            {
              id: 'selR9yrnB0ZkqxnGU',
              name: 'REKFA GOLD CAPSULES',
            },
            {
              id: 'selRA5aTzAtHFPU5w',
              name: 'RELCER GEL 180ML( AFTER MEALS)',
            },
            {
              id: 'selMXYMtqmu8i32Up',
              name: 'RELESTAT EYE DROPS',
            },
            {
              id: 'seloMFXanMJarlgcT',
              name: 'RELESTAT EYE DROPS 5ML',
            },
            {
              id: 'sel2LFsdOo7zxDacz',
              name: 'RELVAR ELLIPTA 100/25MCG 30D',
            },
            {
              id: 'selu5p7EfXrc4w7M4',
              name: 'RELVAR ELLIPTA 200/25MCG 30D',
            },
            {
              id: 'selStS9RZ2nTqHWuV',
              name: 'REMICADE 100MG',
            },
            {
              id: 'selQRkvYXzhbnbdtP',
              name: 'REMIDIN MWASH 100ML( DO NOT SWALLOW)',
            },
            {
              id: 'sel2ZS9fqh4ZbNF48',
              name: 'REPACE 50MG TABS.',
            },
            {
              id: 'seldy2KRbQycnsh1T',
              name: 'REPACE H TABS',
            },
            {
              id: 'selLwsjd0rNErX87B',
              name: 'RESONIUM A POWDER',
            },
            {
              id: 'seluMhb0xumPHlRcz',
              name: 'RETIN A CREAM 20G',
            },
            {
              id: 'selp7Vm54CfkSOgA8',
              name: 'RETIN A GEL 30G',
            },
            {
              id: 'selqyIr8s5ljqY2GW',
              name: 'REVELOL- XL 25MG',
            },
            {
              id: 'selUSSlegkbEmJgF5',
              name: 'REVELOL- XL 50MG',
            },
            {
              id: 'selCRWFIZVA3xA6m1',
              name: 'RHEUMA-DENK GEL 20G',
            },
            {
              id: 'selK5ySORFByWh8UH',
              name: 'RHINATHIOL ADULT SYR 125ML',
            },
            {
              id: 'selM2TFzGeqApuZ3L',
              name: 'RHINATHIOL INFANT 125ML',
            },
            {
              id: 'selqzHiNBJRBRmGed',
              name: 'RHINATHIOL SUGAR FREE 200ML',
            },
            {
              id: 'selsgIesFRtIPkTwo',
              name: 'RHINATHIOL WITH PROM SYR',
            },
            {
              id: 'selQorCXkyhPDHngO',
              name: 'RHINOCORT 32MCG SPRAY',
            },
            {
              id: 'selzhfOTOPI3PLlsy',
              name: 'RHINOCORT 64MCG SPRAY',
            },
            {
              id: 'selax3GysaYHsYXVX',
              name: 'RHIZIN SYRUP 60ML',
            },
            {
              id: 'selarWHbKAUlhqAKB',
              name: 'RHIZIN TABLETS',
            },
            {
              id: 'selk60Uz3ZVaVfi5k',
              name: 'RIFA-FOUR',
            },
            {
              id: 'selI4DM8PpJisxkZ6',
              name: 'RIFA-FOUR KIT',
            },
            {
              id: 'seliJbrQIWXXUDq6d',
              name: 'RIFAXA (RIFAXAMIN) 200MG TABS',
            },
            {
              id: 'selDU2yHOlfJVLyDw',
              name: 'RIFAXA (RIFAXAMIN) 550MG TABS',
            },
            {
              id: 'selmNBb7KmbQzYK8n',
              name: 'RIFINAH',
            },
            {
              id: 'sellinJHvrK6YW3DC',
              name: 'RIFOCIN INJ 250MG',
            },
            {
              id: 'seluzlhMy9LsH4cO7',
              name: 'RILIF PLUS',
            },
            {
              id: 'selAiNmrq6DWCr9rz',
              name: 'RISDONE 1MG TABS',
            },
            {
              id: 'sel2XKKikNZ38Xp4j',
              name: 'RISDONE TABLETS 2MG',
            },
            {
              id: 'selyz1ihtcPuiPdKi',
              name: 'RISEK 20MG SATCHET',
            },
            {
              id: 'selMkivuvFGeQDoa9',
              name: 'RISEK 40MG INJ',
            },
            {
              id: 'selFJ4ZmxEz961oxB',
              name: 'RISEK CAPS 20MG',
            },
            {
              id: 'selWhZNvJ9HNELFvc',
              name: 'RISEK CAPS 40MG',
            },
            {
              id: 'selc76MosNN0uyYQG',
              name: 'RISEK SACHETS 40MG(DISSOLVED IN 15-30ML WATER)',
            },
            {
              id: 'selol9haQ4Z9okS4c',
              name: 'RITALIN 10MG TABLETS',
            },
            {
              id: 'selfFiQpJoGxJu7u9',
              name: 'RITUXIMAB 100MG/10ML',
            },
            {
              id: 'selorAXIgi4W12ALb',
              name: 'RITUXIMAB 500MG/50ML',
            },
            {
              id: 'selw7G5ZTZXgWXRvu',
              name: 'RIVOTRIL 0.5MG TABLETS',
            },
            {
              id: 'selxmYVuKPhTAJiG0',
              name: 'RIVOTRIL 2MG TABLETS',
            },
            {
              id: 'selR2ev9POsbISPhI',
              name: 'RIZAT TABS 10MG',
            },
            {
              id: 'selodrPGoGmI8RC50',
              name: 'ROACCUTANE 10MG CAPSULES',
            },
            {
              id: 'selnBcWxXEOwHkYlE',
              name: 'ROACCUTANE 20MG CAPS',
            },
            {
              id: 'selwm1ExDKtnmSYgQ',
              name: 'ROBIDOM-SR CAPSULES (1/2 HOUR BEFORE MEALS)',
            },
            {
              id: 'selMPVWYUqYqlN5K8',
              name: 'ROCEPHINE 2G INJECTION',
            },
            {
              id: 'selDYkRtBbxD27yvg',
              name: 'ROCEPHINE INJ 1G I.M',
            },
            {
              id: 'selTd4zkPHZXzCmtm',
              name: 'ROCEPHINE INJ 1G I.V',
            },
            {
              id: 'selnpQTSjcnzVyAKP',
              name: 'ROCEPHINE INJ 250MG I.V',
            },
            {
              id: 'selVC4bVqRQqi1WVf',
              name: 'ROCEPHINE INJ 500MG I.M',
            },
            {
              id: 'sely46GTpk06p882J',
              name: 'ROCEPHINE INJ 500MG I.V',
            },
            {
              id: 'selNY0prltRQWPHef',
              name: 'ROCEPHINE INJ. 250MG I.M',
            },
            {
              id: 'selo4XVVakKvcS2Up',
              name: 'ROFERON-A 6MIU INJ',
            },
            {
              id: 'selcv4a6Z23R10G7a',
              name: 'ROHYPNOL TABLETS 1MG',
            },
            {
              id: 'selr6HgmQZjMth5Xf',
              name: 'ROHYPNOL TABLETS 2MG',
            },
            {
              id: 'selMj5q8m9s2AiKIK',
              name: 'ROLAC INJ 30MG',
            },
            {
              id: 'sel0737Y72tA6cF19',
              name: 'ROTARIX VACCINE',
            },
            {
              id: 'selKEjiS1LNWwdLbv',
              name: 'ROTATEQ VACCINE',
            },
            {
              id: 'sel3Sxg2EdCb77CAU',
              name: 'ROVISTA 10MG TABS (TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selOjFQeY2CA99qKF',
              name: 'ROVISTA 20MG TABS(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selYqzHQi5qceldQr',
              name: 'ROVISTA 5MG TABS(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selfJ25uuh4ta0srY',
              name: 'ROZAVEL 5MG TABS(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selPUjX6dbE7UCLR0',
              name: 'ROZAVEL TABS 10MG(TAKE AT NIGHT AFTER DINNER)',
            },
            {
              id: 'selEz90J5zvOCUfQc',
              name: 'Ranferon',
            },
            {
              id: 'selDtX9oSEjHh50Pa',
              name: 'Remidin Mouth wash',
            },
            {
              id: 'selFaLrpvrFBJ5e5c',
              name: 'S-26 200gm',
            },
            {
              id: 'selyk83qsZgtN06MF',
              name: 'S-26 LOW BIRTH WGT MILK',
            },
            {
              id: 'selxrquFZxmlAdKL9',
              name: 'S-26 POWDER MILK',
            },
            {
              id: 'selokKgzYIA1YPnvl',
              name: 'SAFECAL TABS',
            },
            {
              id: 'selKBpqh9fMiV2gel',
              name: 'SAFERON SYRUP 150ML',
            },
            {
              id: 'selu3S6WMUBr4w8sx',
              name: 'SAFERON TABLETS (CHEWABLE)',
            },
            {
              id: 'selE8P8p6TR5aTctg',
              name: 'SAFETELMI H',
            },
            {
              id: 'sela4Wh8VhdUaWRDj',
              name: 'SALAGEN 5MG',
            },
            {
              id: 'sel9TuT2dMagtkDHu',
              name: 'SALAZOPYRIN 500MG TABS',
            },
            {
              id: 'sel6My7D6nmYWWZXX',
              name: 'SALBUTAMOL SYRUP 100ML',
            },
            {
              id: 'selkzlidCo77VQt7C',
              name: 'SALBUTAMOL TABS 4MG',
            },
            {
              id: 'selPEpboUzxhsvtYV',
              name: 'SALINE NASAL SPRAY 30MLS(WITH EXPIRATOR)',
            },
            {
              id: 'selmM2piR0CO4uGSJ',
              name: 'SANDIMMUN 25MG CAPS',
            },
            {
              id: 'selKIG5cjCie0oAj5',
              name: 'SANDOSTATIN 50MCG',
            },
            {
              id: 'sel8Vd4hpUqtCYjRV',
              name: 'SATROGYL 300MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selBvi7QQfIxzPEHZ',
              name: 'SCABION CREAM 20G',
            },
            {
              id: 'selGjS6dyg6j2gOj4',
              name: 'SCHERIPROCT OINT 10GM',
            },
            {
              id: 'selLd140MP6zNiAyt',
              name: 'SCHERIPROCT OINT 30GM',
            },
            {
              id: 'selBH2u9aOg0nKAwE',
              name: 'SCHERIPROCT SUPPOSITORY (STORE IN FRIDGE)',
            },
            {
              id: 'selp0zxPm5MrQUetV',
              name: 'SCOTT EMULSION REGULAR 100ML',
            },
            {
              id: 'selHV7yn82iLnUlpW',
              name: 'SCOTTS EMULSION 200ML',
            },
            {
              id: 'selRVWd9FfI39FvTE',
              name: 'SEBA NIGHT CREAM 75ML',
            },
            {
              id: 'selxSNprBippeGe1E',
              name: 'SEBAMED MOIST LOTION',
            },
            {
              id: 'selGw0YwwkVL4J3Q7',
              name: 'SEBAMED MOISTURIZING CREAM',
            },
            {
              id: 'sel3Mwp2JLWM8fHPB',
              name: 'SEBAMED SUNCARE CREAM',
            },
            {
              id: 'sel4RT3nTbizki6KU',
              name: 'SECZOL DS 1GM TABS',
            },
            {
              id: 'selLgsQyM3i8WiO48',
              name: 'SEFARETIC 550MG TABLETS',
            },
            {
              id: 'selGZFVDk1aNqTqoa',
              name: 'SEKROL (AMBROXOL 15MG/5ML) PAEDIATRIC 100ML',
            },
            {
              id: 'selhUK2XwQsdu4cXN',
              name: 'SEKROL (AMBROXOL 30MG/5ML) ADULT 100ML',
            },
            {
              id: 'selfqdN1LaHsLhM6b',
              name: 'SENNA TABS',
            },
            {
              id: 'sellHYhaUwfniGU00',
              name: 'SENOKOT TABLETS',
            },
            {
              id: 'selOTL8LcS8lFI3R9',
              name: 'SEPTRIN DS TABLETS (TAKE PLENTY OF  WATER)',
            },
            {
              id: 'selxF3jJAdZsd8ldN',
              name: 'SEPTRIN INFUSION',
            },
            {
              id: 'selGIL0J0JeESxvUj',
              name: 'SEPTRIN SYRUP 100ML (TAKE PLENTY OF WATER)',
            },
            {
              id: 'sel9MwY2HV1t6Sc2x',
              name: 'SEPTRIN SYRUP 50ML (TAKE PLENTY OF  WATER)',
            },
            {
              id: 'selaxJoUKqMZqJFXq',
              name: 'SEPTRIN TABLETS',
            },
            {
              id: 'selNHPoTrLYf10lPL',
              name: 'SERETIDE ACCUHALER 50/100MCG',
            },
            {
              id: 'selrTDfj3qbu1tVkm',
              name: 'SERETIDE ACCUHALER 50/250MCG',
            },
            {
              id: 'selJozP93QNMhfZAV',
              name: 'SERETIDE ACCUHALER 50/500MCG',
            },
            {
              id: 'seleFATdQ1ikLvt0p',
              name: 'SERETIDE EVOHALER 25/125MCG',
            },
            {
              id: 'selGbeFZuQv9vT3X7',
              name: 'SERETIDE EVOHALER 25/250MCG',
            },
            {
              id: 'selIdyAg90B97nUAZ',
              name: 'SERETIDE EVOHALER 25/50MCG',
            },
            {
              id: 'seljDwbUWQwSV5854',
              name: 'SEROCORT 250MCG INHALER',
            },
            {
              id: 'selstNPvL4wI4ghmc',
              name: 'SEROXAT 20MG TABLET',
            },
            {
              id: 'sel7QdWOpaU6WldgM',
              name: 'SEVEN SEAS 100MLS',
            },
            {
              id: 'selD4DoPWaRaybA45',
              name: 'SEVEN SEAS 170ML',
            },
            {
              id: 'selyFgzQ8bAmwQmCV',
              name: 'SEVEN SEAS 170ML Range',
            },
            {
              id: 'selg3EG8NdYUekCmW',
              name: 'SEVEN SEAS 450 MLS',
            },
            {
              id: 'selGZUAOIB1BwEZpD',
              name: 'SEVEN SEAS CAPS + GLUCOSAMINE',
            },
            {
              id: 'selfOgKOISKpkHy9n',
              name: 'SEVEN SEAS CAPSULES[CODLIVER OLI]',
            },
            {
              id: 'sel7F1oFnzZ1A2VMR',
              name: 'SEVEN SEAS ORANGE 100ML',
            },
            {
              id: 'sel1wYAgSaI0s3g9f',
              name: 'SEVEN SEAS PROJOINT CAPS',
            },
            {
              id: 'selUssrKxO3QkSZqD',
              name: 'SHANCHOL 1 DOSE VIAL',
            },
            {
              id: 'selVLR153NJdkPM9S',
              name: 'SHANVAC B',
            },
            {
              id: 'selgqCxdbASdyY5jj',
              name: 'SICCAPOS GEL (URSAPharma, Germany)',
            },
            {
              id: 'selWX41eksvH2b3cn',
              name: 'SICCAPROTECT EYE DROP 10ML (URSAPharma, Germany)',
            },
            {
              id: 'selC1e1LILmTltaRV',
              name: 'SILDENAFIL 100MG',
            },
            {
              id: 'selfwAvdhZDfX2pG1',
              name: 'SILDENAFIL 50MG TABS',
            },
            {
              id: 'sellzKvFHK213fxk3',
              name: 'SILVEREX CREAM 10G',
            },
            {
              id: 'selOXqj4wr66Q21UP',
              name: 'SILVEREX CREAM 250G',
            },
            {
              id: 'selk4oTx0YcbGN6qy',
              name: 'SILVEREX CREAM 25G',
            },
            {
              id: 'selutYxkIppPpHm6O',
              name: 'SIMEPAR CAPSULES',
            },
            {
              id: 'sel47cZUbM2OPiTDo',
              name: 'SIMVASTATIN 20MG TABLET',
            },
            {
              id: 'seli9bhRd9OMGNTiD',
              name: 'SINAREST CAPS',
            },
            {
              id: 'seligiIEl0nYnQkeR',
              name: 'SINEMET 110 TABLETS',
            },
            {
              id: 'selcOBDjAYWcbFc9J',
              name: 'SINEMET CR 25/100MG TABS',
            },
            {
              id: 'selw3t3pK9EhsXX9x',
              name: 'SINEMET CR 50/200MG TABS',
            },
            {
              id: 'selRaYiavlkQt8l0c',
              name: 'SINEMET PLUS TABS',
            },
            {
              id: 'selTtZHNVlN3wLU3f',
              name: 'SINEMET TABLETS 275MG',
            },
            {
              id: 'sellcRkmyEizDKMCK',
              name: 'SINGULAR (MONTELUKAST) - 10MG( TAKE AT NIGHT)',
            },
            {
              id: 'sel4qQImuamALv953',
              name: 'SINGULAR (MONTELUKAST) - 5MG( CHEWABLE AT NIGHT)',
            },
            {
              id: 'selBlojnutcYqFyH7',
              name: 'SINGULAR (MONTELUKAST) 4MG SATCHETS(TAKE AT NIGHT)',
            },
            {
              id: 'selUntDJh7iFwE6WZ',
              name: 'SIZODON TABS 2MG',
            },
            {
              id: 'selm9GPrNZ4EzIcLw',
              name: 'SIZODONE 3MG TABS',
            },
            {
              id: 'selRze6wme31clLAM',
              name: 'SKILAX LAXATIVE DROPS 15ML',
            },
            {
              id: 'selNQ2llSznYfroX4',
              name: 'SLOW SODIUM CHLORIDE 600MG TABS',
            },
            {
              id: 'selHlLbywDRElpVMt',
              name: 'SLOW-K TABLETS 600MG',
            },
            {
              id: 'selpcF4isqihjbnzY',
              name: 'SODIUM BICARBONATE INJ. 10mls',
            },
            {
              id: 'selw23EBQxNnhr3ne',
              name: 'SODIUM BICARBONATE INJ. 20mls',
            },
            {
              id: 'sel3pWT6ID6AmbYdn',
              name: 'SODIUM BICARBONATE INJ. 50MLS',
            },
            {
              id: 'selqtuNpePEgilJB9',
              name: 'SODIUM BICARBONATE TABS 600MG',
            },
            {
              id: 'selFIK7XHs5E3i6VB',
              name: 'SODIUM CHLORIDE INJ 30% 10ML',
            },
            {
              id: 'selIb8VdwK1IBO23L',
              name: 'SOFDERM CREAM',
            },
            {
              id: 'selhFfb6LrwllQw22',
              name: 'SOFRADEX EYEEAR DROPS',
            },
            {
              id: 'selEsfeL320qK7Xvz',
              name: 'SOFRAMYCIN EYE DROPS',
            },
            {
              id: 'selIQOHDc8xqVSjj1',
              name: 'SOLIAN 100MG TABS',
            },
            {
              id: 'selrXVMpZXL9Gw0Qv',
              name: 'SOLIFEN 5MG',
            },
            {
              id: 'sel3VOY2duMzymQaQ',
              name: 'SOLU-MEDROL 125MG INJ.',
            },
            {
              id: 'selbyAQdiFyFQzrkz',
              name: 'SOLU-MEDROL 40MG INJ.',
            },
            {
              id: 'sel06ocYpt3PpJDaA',
              name: 'SOLU-MEDROL 500MG INJ.',
            },
            {
              id: 'selpbGiZjJHfZAYbd',
              name: 'SOLUBLE INSULIN I.U',
            },
            {
              id: 'selmVUQdcqHePNUBG',
              name: 'SOLUVIT 10ML VIAL (Fresenius Kabi)',
            },
            {
              id: 'selOOVRNbuMwOdMYF',
              name: 'SOLVIN PLUS EXPECT. 120ML',
            },
            {
              id: 'selxIHxK5TTnZzcrQ',
              name: 'SOLVIN PLUS EXPECT. 60ML',
            },
            {
              id: 'selFaqTYs8j6M8GQZ',
              name: 'SOLVIN PLUS TABLETS',
            },
            {
              id: 'seloONVGOJ87YjOEr',
              name: 'SOMAZINA 1000MG',
            },
            {
              id: 'selv9EfO5KhBvOi24',
              name: 'SOMPRAZ(ESOMEPRAZOLE) 40MG INJ',
            },
            {
              id: 'selOleXbsxzbWkWK9',
              name: 'SORAFENIB (SORANIB) 200MG',
            },
            {
              id: 'sel1VU64KnVKXlsJX',
              name: 'SORAL(TENOXICAM) 20MG CAPS',
            },
            {
              id: 'selEaWqd4qv9fWaxO',
              name: 'SOTALOL 80MG TABS',
            },
            {
              id: 'selL4A4dJKIHGeB3Q',
              name: 'SPASMOMEN 40MG TABS',
            },
            {
              id: 'selyCfc2Zasb2droV',
              name: 'SPIRIVA HANDIHALER',
            },
            {
              id: 'selqFIthJkE16Af1j',
              name: 'SPIRIVA REFILL CAPS 30S',
            },
            {
              id: 'selbBJ0TpxJ5uBt4d',
              name: 'SPIRONOLACTONE 100MG TABS',
            },
            {
              id: 'selx1BDACqme9MSdp',
              name: 'SPIRONOLACTONE 25MG TABS',
            },
            {
              id: 'selYJCskJq3ROIGCd',
              name: 'SPONGTAN SPECIAL 7CM*5CM*0.1CM',
            },
            {
              id: 'sel0pzz2DcoVmW2tI',
              name: 'SPORANOX CAPSULES 100MG',
            },
            {
              id: 'selFpmfaSpT8iO9GJ',
              name: 'STAMARIL VACCINE (GSK)',
            },
            {
              id: 'sel6Lp8aKmFg82bPV',
              name: 'STAMARIL VACCINE 1DOSE',
            },
            {
              id: 'selPuXRlDKCqNkNzo',
              name: 'STEDNAC GEL 30G',
            },
            {
              id: 'selLFpG4f54d3QcZi',
              name: 'STILBOESTROL TABLETS 5MG',
            },
            {
              id: 'selHvJFxvRG4yhunt',
              name: 'STILNOX 10MGS TABLETS',
            },
            {
              id: 'seljfHQ7FosN2TkjX',
              name: 'STOCRIN 600MG TABS',
            },
            {
              id: 'sellbrpibl5xKJY5x',
              name: 'STOP-ALLERGE DROPS',
            },
            {
              id: 'seli9M9gyf8e8CCB4',
              name: 'STRATTERA 10MG',
            },
            {
              id: 'sellWXCZarxcUU8Sk',
              name: 'STRATTERA 18MG CAPS',
            },
            {
              id: 'selrPQC6oJlVRsuun',
              name: 'STRATTERA 25MG CAPS',
            },
            {
              id: 'selDWipvrJtIbc6Sk',
              name: 'STRATTERA 40MG CAPS',
            },
            {
              id: 'selM65n7OLq2csn3B',
              name: 'STRATTERA 60MG CAPS',
            },
            {
              id: 'selogH9PkosezKM68',
              name: 'STREPTOMYCIN INJ 1GM',
            },
            {
              id: 'selJofP1mdM7sg7fE',
              name: 'STUGERON 25MG TABS',
            },
            {
              id: 'selCg0icFrxRnj9Ti',
              name: 'SUCRALFATE 1MG TAB',
            },
            {
              id: 'selyIAB2ICODR3Ft3',
              name: 'SUCRALFATE GEL 100ML',
            },
            {
              id: 'selwtoO5pAaJJQhcQ',
              name: 'SUDOCREAM 125G JAR',
            },
            {
              id: 'self5Qb49CbZoWC5y',
              name: 'SUMAFIX (SUMATRIPTAN) 100MG',
            },
            {
              id: 'selFnu4RifVzr5a8L',
              name: 'SUPPORTAN 200ML',
            },
            {
              id: 'selafIy7bwlt9Tn0X',
              name: 'SUPPORTAN 500ML',
            },
            {
              id: 'selx7ESgagH9j5LzV',
              name: 'SUPPORTAN CAPPUCINO 200ML',
            },
            {
              id: 'selA39jHPUKc2xTbU',
              name: 'SURVIMED 500ML (Fresenius Kabi)',
            },
            {
              id: 'selpwiTwz32gKVPKZ',
              name: 'SURVIMEDOPD HN 500ML',
            },
            {
              id: 'selRhIv5bqOjxPE6K',
              name: 'SUSTANON 250MG INJ',
            },
            {
              id: 'selm3SngaMh2HDf37',
              name: 'SUSTEN 100MG CAPS',
            },
            {
              id: 'selGaOFikiMnHmEbA',
              name: 'SUSTEN 200MG CAPS',
            },
            {
              id: 'selZj8VbRLApRlegH',
              name: 'SUSTEN 400MG CAPS',
            },
            {
              id: 'sel3C6NpnrWPe1Cql',
              name: 'SUXAMETHONIUM INJ 50mg/ml in 2ml ampoules',
            },
            {
              id: 'selRuCP1FI6pFsspB',
              name: 'SWICH CEFPODOXIME 200MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selfKXuzgcOpHoUsw',
              name: 'SYLATE INJ 250MG/2ML',
            },
            {
              id: 'sel7sjCQWT8dmIJAm',
              name: 'SYMBICORT 160MCG INH 120doses',
            },
            {
              id: 'selImI5aq2rc6eKZS',
              name: 'SYMBICORT 160MCG INH 60doses',
            },
            {
              id: 'selNedVo3XaN1HfPp',
              name: 'SYMBICORT 320MCG INH',
            },
            {
              id: 'seltphq3HyR2RjAkg',
              name: 'SYMBICORT 80MCG INH',
            },
            {
              id: 'selSJzD18ICzzxDjZ',
              name: 'SYMMETRIL 100MG CAPS',
            },
            {
              id: 'seldexsxLlYF0nQ5X',
              name: 'SYNACTHEN 250MCG INJ',
            },
            {
              id: 'selEDMwJcRvFxzXN9',
              name: 'SYNER-KINASE 25000 I.U',
            },
            {
              id: 'selRvi5jp1JuLgF3j',
              name: 'SYNFLORIX VACCINE',
            },
            {
              id: 'selaj0wfPXwjnUNEp',
              name: 'SYNRIAM TABS (ONE TABLET ONCE DAILY FOR 3 DAYS)',
            },
            {
              id: 'selhGQKLJDTpcrShB',
              name: 'SYNTOCINON INJ 10IUML',
            },
            {
              id: 'sel6uZEf4vaJTbH3i',
              name: 'SYSTANE EYE DROPS 10ML',
            },
            {
              id: 'sellTX8XBZZFhgNEH',
              name: 'Safetelmi H (12.5/40 mg)',
            },
            {
              id: 'selNfX7boU6kQbSgY',
              name: 'Secorin 100 ml',
            },
            {
              id: 'seljy0d4FaydHh9Yg',
              name: 'Senorm 5mg',
            },
            {
              id: 'selUTFhAA43uMwLnr',
              name: 'Seranace 5mg',
            },
            {
              id: 'selTKtjEUyTtyU1Y6',
              name: 'Siccaprotect eye drops',
            },
            {
              id: 'selDwDXSHJWMQAWwJ',
              name: 'Sompraz IT',
            },
            {
              id: 'selr10QwliNbu5x9D',
              name: 'Spectinomycin 2gm',
            },
            {
              id: 'sel1k8YJ0KNE1X9jz',
              name: 'Suprabact',
            },
            {
              id: 'selYAK0kDZzyr3n6m',
              name: 'TACROLIMUS 1MG TABS',
            },
            {
              id: 'selDGcOAvh8E3O3al',
              name: 'TACROVATE FORTE OINT',
            },
            {
              id: 'selWaKLG5UWAgFW4X',
              name: 'TACROVATE OINTMENT 10G',
            },
            {
              id: 'sel5arbqGSyerXJ2m',
              name: 'TACROZ FORTE (TACROLIMUS OIT 0.1%)',
            },
            {
              id: 'seluSMhsOVXPk53U7',
              name: 'TAGERA FORTE 1G TABS',
            },
            {
              id: 'selpX9hqn5vhgUNbN',
              name: 'TALGENTIS 20MG TABS',
            },
            {
              id: 'selsls3mHwc9dDOhw',
              name: 'TALGENTIS 5MG TABS',
            },
            {
              id: 'selA8z6qtpYAA7ego',
              name: 'TAMBOCOR 100MG TABS',
            },
            {
              id: 'selbFREVxMxckuj74',
              name: 'TAMIFLU 75MG CAPSULES',
            },
            {
              id: 'selXHV1W3FnVuoxHC',
              name: 'TAMOXIFEN TABLETS 10MG',
            },
            {
              id: 'selfrHP50pRYH121k',
              name: 'TAMOXIFEN TABLETS 20MG',
            },
            {
              id: 'selEisKy6s5luwgDA',
              name: 'TARGOCID 200MG INJ',
            },
            {
              id: 'selTJgfYmfR9z1kDT',
              name: 'TARGOCID 400MG  (TEICOPLANN) INJ',
            },
            {
              id: 'selUxpH8lvIqdbDhz',
              name: 'TARIVID 200MG INFUSION',
            },
            {
              id: 'selC49ie9hKnStK5q',
              name: 'TARIVID 200MG TABS',
            },
            {
              id: 'selbtPiwHOkJAcc4H',
              name: 'TAVANIC 500MG TABS.',
            },
            {
              id: 'selmtRcPCeIdIlpi1',
              name: 'TAVANIC INJ. 500MG',
            },
            {
              id: 'selI85ojka2W19PHl',
              name: 'TAXIM-O 50MG/5ML SYRUP (AFTER A MEAL)',
            },
            {
              id: 'selxSnTp7cEg4h1ba',
              name: 'TAXIM-O TABLETS 200MG (AFTER A MEAL)',
            },
            {
              id: 'selasA3EEgGfhZ3zE',
              name: 'TAXOTERE 20MG INJ',
            },
            {
              id: 'selCiBfz77rIotGJk',
              name: 'TAXOTERE 80MG',
            },
            {
              id: 'selbnTSoPOjIeBQfR',
              name: 'TAZOCIN (PIPERACILLIN/TAZOBACTUM) 2.25MG',
            },
            {
              id: 'seldaprzb2XscMXL2',
              name: 'TAZOCIN (PIPERACILLIN/TAZOBACTUM) 4.5MG',
            },
            {
              id: 'selgeX5Zvkk9OWumS',
              name: 'TEARS NATURAL DROPS',
            },
            {
              id: 'sel5nCBZQ7wlkZe3u',
              name: 'TEGRETOL 100MG TABS',
            },
            {
              id: 'selMlVQanxDTopomW',
              name: 'TEGRETOL 200MG TABS',
            },
            {
              id: 'seleNJqnEybRIX1Ba',
              name: 'TEGRETOL CR 200MG TABS',
            },
            {
              id: 'selO8cQHcEriRv9qF',
              name: 'TEGRETOL CR 400MG',
            },
            {
              id: 'selMbfuGLSXIgARvm',
              name: 'TEGRETOL SYRUP 100ML',
            },
            {
              id: 'sel198kDtz8rLdsVk',
              name: 'TELMI 40 AM (TELMISARTAN 40MG AMLODIPINE 5MG)',
            },
            {
              id: 'selwUqgfb1qBUdZBK',
              name: 'TELMI 40H TABLETS',
            },
            {
              id: 'seleiHb9ICDnU7KoX',
              name: 'TELMI 40MG TBAS',
            },
            {
              id: 'selASnwHdKA0EQ9PG',
              name: 'TELMI 80 AM H(TELMISARTAN 80MG AMLODIPINE 5MG HTZ)',
            },
            {
              id: 'selsawnwIVg4giDmo',
              name: 'TELMI 80 AM TABS(TELMISARTAN 80 + AMLODIPIN 5MG)',
            },
            {
              id: 'sel3f2ZoMNLgvOdMv',
              name: 'TELMI 80H TABLETS',
            },
            {
              id: 'selSoHSpiTB6G1SXW',
              name: 'TELMI 80MG TABS',
            },
            {
              id: 'selZs1LwqQOCfreBC',
              name: 'TENORET TAB 5012.5MG',
            },
            {
              id: 'selLISEM2pYCI2KpK',
              name: 'TENORETIC TABLETS 10025MG',
            },
            {
              id: 'selEhYOKCX9XqFgXZ',
              name: 'TENORIC 100/50MG TABS',
            },
            {
              id: 'sel1bvbxddErwUPqX',
              name: 'TENORIC-50 TABS (50/12.5)',
            },
            {
              id: 'seljHahnrIZ898E4F',
              name: 'TENORMIN 100MG TABS',
            },
            {
              id: 'sely6mmf6djnM2QOT',
              name: 'TENORMIN 50MG TABS',
            },
            {
              id: 'selDR8yyNKmfLxsAc',
              name: 'TERBIFIN 250MG TABS',
            },
            {
              id: 'selrRfo1TNgCsfdwO',
              name: 'TERBIFIN CREAM 15G',
            },
            {
              id: 'selU4dt06OEmmJtIq',
              name: 'TERBIN (TERBINAFINE) CREAM',
            },
            {
              id: 'selOx3yKmFKl3Skiq',
              name: 'TERBIN 250MG TABS',
            },
            {
              id: 'seleQdUD6lQn9XZka',
              name: 'TERRACORTRIL EYEEAR DROPS',
            },
            {
              id: 'selwYeuEjej60AAqY',
              name: 'TERRACORTRIL OINT 15G',
            },
            {
              id: 'selblzMzzcIYxuDrd',
              name: 'TERTROXIN 20MCG TABLETS',
            },
            {
              id: 'selNsEXcjXkRelX4b',
              name: 'TESS BUCCAL PASTE 5G',
            },
            {
              id: 'selOSh57aogWCFuAf',
              name: 'TETANUS IMMUNOGLOBULIN 250 IU',
            },
            {
              id: 'selUIdjrB03s5Q4sS',
              name: 'TETANUS TOXOID 0.5ML SINGLE DOSE (Serum Institute)',
            },
            {
              id: 'sel3stFWohpdfvoTK',
              name: 'TETRACAINE 15ML EYE DROPS (Alcon)',
            },
            {
              id: 'selTR8qIbKPFQBneR',
              name: 'TETRACYCLINE 1% EYE OINT',
            },
            {
              id: 'selN2fN8zz4IFwqx5',
              name: 'TETRACYCLINE 3% OINT 30G',
            },
            {
              id: 'selqYPpxxjmxVIZ78',
              name: 'TETRACYCLINE CAPSULE 250MG',
            },
            {
              id: 'selNI4c7qfqW0MCfE',
              name: 'TETRAXIM VACCINE',
            },
            {
              id: 'selFxulDW3rrMvB6u',
              name: 'THALIDOMIDE CAP 50mg (Celgene,UK)',
            },
            {
              id: 'sel2jAbFYQvLi7g18',
              name: 'THALIDOMIDE CAPS 100MG',
            },
            {
              id: 'selxRPTeOOMEfrfeK',
              name: 'THEMISET (PALONOSETRON) 75MCG INJECTION',
            },
            {
              id: 'selWsTMKRuHRYMzAk',
              name: 'THYROXINE TABS 100MCG',
            },
            {
              id: 'seljRjtaXIxOFf2fP',
              name: 'THYROXINE TABS 25MCG',
            },
            {
              id: 'sel6J5VqMgRfseNYT',
              name: 'THYROXINE TABS 50MCG',
            },
            {
              id: 'selbTkn2WGxPX6Jrl',
              name: 'TICPLAT (TEICOPLANIN) 200MG IM/IV VIAL',
            },
            {
              id: 'selfW6hZ0Vli6a47R',
              name: 'TIENAM 500MG INJ',
            },
            {
              id: 'seltc54zNVTyNGwYK',
              name: 'TIENAM INJ. 250MG',
            },
            {
              id: 'selvicTpUlxroWSc1',
              name: 'TILDIEM 60MG TABS',
            },
            {
              id: 'selVM4HvdukgsyDLM',
              name: 'TIMOPTOL 0.5% EYE DROPS',
            },
            {
              id: 'selGgbktOjFgIgDOZ',
              name: 'TIMOPTOL EYE DROPS 0.25%',
            },
            {
              id: 'seltBjKcDmKwlk0z0',
              name: 'TIVICAY 50MG TABS',
            },
            {
              id: 'selP1zJwV8lgYwVgP',
              name: 'TOBRADEX EYE DROPS',
            },
            {
              id: 'selaHGE5lmyAkf7QU',
              name: 'TOBRADEX OINTMENT',
            },
            {
              id: 'selgl2W8T16XRxJVq',
              name: 'TOBREX EYE DROPS',
            },
            {
              id: 'selSVxKKW3MeFw7Kg',
              name: 'TOFRANIL 25MG TABS.',
            },
            {
              id: 'selVtDESxR9ZUnslm',
              name: 'TOLVAT 15MG TABS',
            },
            {
              id: 'selTsLTnkXYxtybqA',
              name: 'TOLVAT 30MG TABS',
            },
            {
              id: 'sel1n4kHSZrz7k6db',
              name: 'TOPAMAX 25MG CAPS',
            },
            {
              id: 'selEhiiBCerz5L2sk',
              name: 'TOPAMAX 50MG CAPS',
            },
            {
              id: 'sel0PdoAoK9sEJzdv',
              name: 'TOPCORT - NASAL SPRAY',
            },
            {
              id: 'selxrFtQb4EsOFwVp',
              name: 'TOPCORT CREAM',
            },
            {
              id: 'selpGqF85wNOKxID0',
              name: 'TOPCORT OINTMENT',
            },
            {
              id: 'sel3fZWj7xHIS5H3n',
              name: 'TOPOTECAN INJ 2.5MG',
            },
            {
              id: 'selY6CMRaRFG47ltd',
              name: 'TORAS DENK 5MG',
            },
            {
              id: 'selokFI7iqXMHCLje',
              name: 'TRACRIUM , GSK 2.5 ml',
            },
            {
              id: 'sel1hnYBvWRCHYCSh',
              name: 'TRACRIUM, GSK 5ml',
            },
            {
              id: 'selsL6icgZQ0beHhC',
              name: 'TRAMAL RETARD 100MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selzrVkKkxggSGm5f',
              name: 'TRAVOCORT CREAM 15GM',
            },
            {
              id: 'sellgYry00AKn55VN',
              name: 'TRAVOGEN CREAM 20GM',
            },
            {
              id: 'seliXtePg8RbERKKM',
              name: 'TRES ORIX SYRUP 250ML',
            },
            {
              id: 'selRhkgalHpIwKDbd',
              name: 'TRES-ORIX FORTE 100ML(1/2 HOUR BEFORE MEALS)',
            },
            {
              id: 'selowdzCEGsdGqryA',
              name: 'TRES-ORIX FORTE 250ML(1/2 HOUR BEFORE MEALS)',
            },
            {
              id: 'seljLaP107fLnAYbI',
              name: 'TRES-ORIX FORTE CAPSULES',
            },
            {
              id: 'selns5NJpul1AMZXj',
              name: 'TREVIA 100MG TABS (WITH A MEAL)',
            },
            {
              id: 'selYLOiyuWDiqQaHz',
              name: 'TREVIA 50MG TABS (WITH A MEAL)',
            },
            {
              id: 'selaFrwSmogVPFq9M',
              name: 'TREVIA MET 50/1000MG TABS (WITH A MEAL)',
            },
            {
              id: 'selc4ntftGsdVGh6P',
              name: 'TREVIA MET 50/500MG TABS (WITH A MEAL)',
            },
            {
              id: 'sel7U7buoSmrUNJSu',
              name: 'TRIAMCINOLONE 40MG INJ',
            },
            {
              id: 'selE0VKOQ2muAyPCM',
              name: 'TRIMETABOL 150ML SYRUP (1/2 HOUR BEFORE MEALS)',
            },
            {
              id: 'selMspMoqAnzbsN1A',
              name: 'TRIMEX ADULT SYR 100ML',
            },
            {
              id: 'selR6I9fXTCLK7jw5',
              name: 'TRIMEX DIABETIC EXP. 100ML',
            },
            {
              id: 'selUQXBfFhfj1mWU3',
              name: 'TRIMEX PAED SYR 100ML',
            },
            {
              id: 'selkeFFf6rWBoluad',
              name: 'TRINERVE TABLETS',
            },
            {
              id: 'selIdXqymDQRd2HLX',
              name: 'TRIOKIT PACK',
            },
            {
              id: 'sel0CQDT9o3qkgMAS',
              name: 'TRIPLIXAM 10/2.5/10MG TABS',
            },
            {
              id: 'selrLyPzjpeBEDjJR',
              name: 'TRISEQUENS ',
            },
            {
              id: 'selOo1jhi8n6i6GEI',
              name: 'TRITACE 10MG',
            },
            {
              id: 'selM41HIGzxUHJZXL',
              name: 'TRITACE 2.5MG TABS',
            },
            {
              id: 'sel2iifvJ5Ggm5XPd',
              name: 'TRITACE 5MG TABS',
            },
            {
              id: 'selszIlH1a4IXsMqe',
              name: 'TRITAZIDE 525MG TABS',
            },
            {
              id: 'selOJYILVPsBFmF6A',
              name: 'TRIUMEQ TABS 50/300/600MG',
            },
            {
              id: 'selKYqBNksCjZsmDG',
              name: 'TRUVADA TABS',
            },
            {
              id: 'selOx3P7zOw3K750D',
              name: 'TUSPEL PLUS SYR 100ML',
            },
            {
              id: 'sel14Q6lnddz0V3E2',
              name: 'TUSPEL PLUS SYR 60ML',
            },
            {
              id: 'selWE91HXVLr6yNRm',
              name: 'TWYNSTA TABLETS 40+10MG 28s',
            },
            {
              id: 'selOOUONnWiPyaduD',
              name: 'TWYNSTA TABLETS 40+5MG 28s',
            },
            {
              id: 'selX7hvnMey1ExWQR',
              name: 'TWYNSTA TABLETS 80+10MG 28s',
            },
            {
              id: 'selItCHOIlnAeLbAh',
              name: 'TWYNSTA TABLETS 80+5MG 28s',
            },
            {
              id: 'selTOEPhJZqec7TbT',
              name: 'TX-MF',
            },
            {
              id: 'selzmBVivnnnG2Cy1',
              name: 'TYGACIL 50MG INJECTION',
            },
            {
              id: 'selOqCP3xEzkxBdAU',
              name: 'Tarivid 200mg ',
            },
            {
              id: 'selw14nY7jZMkhWvS',
              name: 'Telmi 40 AM',
            },
            {
              id: 'selgAF3sRZf2VqQW0',
              name: 'Tenoretic',
            },
            {
              id: 'selugnflqxXng1S0p',
              name: 'Texakind 500mg Injection',
            },
            {
              id: 'selDyltl8p5SSF5AF',
              name: 'Thiozone',
            },
            {
              id: 'selitTNyzqpOSZcAn',
              name: 'Topamax 100mg',
            },
            {
              id: 'sel24NNEXNV3Xlgfz',
              name: 'Topamax 50mg',
            },
            {
              id: 'selsD9sAR9bRX5BmF',
              name: 'Torpezil 10mg',
            },
            {
              id: 'selvJl1dE2ln5mhIR',
              name: 'Torpezil 5mg',
            },
            {
              id: 'sel41IiXW5oXRQBca',
              name: 'Tramadol- Denk 50mg',
            },
            {
              id: 'selAontSlPsvR3o6F',
              name: 'Trandate 100mg ',
            },
            {
              id: 'selrDPKtdkK8EoVGe',
              name: 'Trandate 200mg ',
            },
            {
              id: 'seleo7ai2gwVOmMUD',
              name: 'Trandate 5mg/ml',
            },
            {
              id: 'selL0RyUjXYci9VDS',
              name: 'Trap',
            },
            {
              id: 'selWdi5P7bFgzrBfd',
              name: 'Treviamet',
            },
            {
              id: 'selJij6lFvse2Z8pl',
              name: 'Tricet',
            },
            {
              id: 'selzvGSExRrKjz10v',
              name: 'Tzex 500mg',
            },
            {
              id: 'selcIi0OtSWbjtFeh',
              name: 'ULGICID GEL 200ML (MINT) (AFTER MEALS)',
            },
            {
              id: 'selRInFZZ4vEkLVky',
              name: 'ULINASTATIN INJ 100000 IU',
            },
            {
              id: 'selxXvzl2Ae4tbqmm',
              name: 'ULTIVA 1MG INJ',
            },
            {
              id: 'selr6EXoSE9pNMlea',
              name: 'ULTIVA 2MG INJ',
            },
            {
              id: 'selrjIncAvickW99F',
              name: 'ULTIVA INJ 5MG',
            },
            {
              id: 'selKcB4MopvKGAB7G',
              name: 'UNIBROL 250MG TABS',
            },
            {
              id: 'selxCMuycrGxYUEio',
              name: 'UNIBROL SYR 60ML',
            },
            {
              id: 'selpP1GQyh5rHgF6i',
              name: 'UNIGAN TABLETS 500/10MG.(AFTER MEALS)',
            },
            {
              id: 'sel2cSy87KcFdjmLg',
              name: 'UNITEL 80MG',
            },
            {
              id: 'seli0kQQj1nYbig8O',
              name: 'UNITEL H 40MG',
            },
            {
              id: 'selwRIl83YjsHTw1z',
              name: 'UNITEL H 80MG',
            },
            {
              id: 'selPUSeKKuWElyEx1',
              name: 'URGENDOL 50MG CAPSULES (AFTER A MEAL)',
            },
            {
              id: 'selSmwYAY7UzXVfe0',
              name: 'URGENDOL INJ 100MG AMP',
            },
            {
              id: 'selXUSKfEHXz04lqy',
              name: 'URGENDOL INJ 50MG',
            },
            {
              id: 'selsy4X2Zq9DoBTXa',
              name: 'URGENDOL SR 100MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selYRRx9EBw8ospWv',
              name: 'URGENDOL-P TABS. (AFTER A MEAL)',
            },
            {
              id: 'selb1E8MiQBurROi5',
              name: 'URISPAS TABLETS 200MG',
            },
            {
              id: 'selprdA4mFklpzq7Z',
              name: 'VAGIPLUS(Clindamycin100mg and Clotimazole) Pessaries',
            },
            {
              id: 'selN8iHGk2h5PthpI',
              name: 'VALCYTE 450MG (VALGANCYCLOVIR)',
            },
            {
              id: 'selMuVToKOyTGyu8v',
              name: 'VALDOXAN 25MG TABS',
            },
            {
              id: 'selu7x7s0E3bn5cph',
              name: 'VALIUM 10MG INJ.',
            },
            {
              id: 'selJJV4nX7rH0Khcb',
              name: 'VALIUM 10MG TABS',
            },
            {
              id: 'selDcrw4tmnbnxC7m',
              name: 'VALIUM 2MG TABS',
            },
            {
              id: 'sel1MfkBS1MyZmM53',
              name: 'VALIUM 5MG TABS',
            },
            {
              id: 'selg3wDaOZSX6q6Lb',
              name: 'VALTREX (VALACICLOVIR) 500MG TABS',
            },
            {
              id: 'selwfuzTKhWBGqpPB',
              name: 'VAMINOLACT 100ML',
            },
            {
              id: 'selw06bFmo22wLhmD',
              name: 'VANCOCIN 500MG INJ (IV/ORAL)',
            },
            {
              id: 'selWcdP1OsoBv1nRO',
              name: 'VANCOMYCIN 500MG INJ(VANCOLON)',
            },
            {
              id: 'selZApq7x4sgv6bh4',
              name: 'VARIACE 5MG TABS',
            },
            {
              id: 'selKNqlPD3RteCboL',
              name: 'VARICELLA VACCINE',
            },
            {
              id: 'selDRl9qrRcUv5gOH',
              name: 'VARILIX VIAL',
            },
            {
              id: 'selHxSDUdVBCvEQgw',
              name: 'VASOPRESSIN INJ 20IU (PITRESSIN)',
            },
            {
              id: 'selc7AJmcdhvaDf9t',
              name: 'VASTAREL MR TABS 35MG',
            },
            {
              id: 'sel7F4oRTUHURMQRK',
              name: 'VAXIGRIP ADULT',
            },
            {
              id: 'selyn2L4kYhgSlNSh',
              name: 'VAXIGRIP PAED',
            },
            {
              id: 'sel0ESeAnb3TOGXrb',
              name: 'VENOFER INJ 100mg/ml in 1ml (Synermed) ',
            },
            {
              id: 'selLPKfhoUwlZOc7S',
              name: 'VENTOLIN EXPECTORANT 100ML',
            },
            {
              id: 'sel9Pb5J5ZiklEWaG',
              name: 'VENTOLIN INHALER',
            },
            {
              id: 'selaTz9qZXeM496c9',
              name: 'VENTOLIN INJECTION 0.5MG',
            },
            {
              id: 'selb2sXNmXqji2rnR',
              name: 'VENTOLIN RESPIR. SOLN',
            },
            {
              id: 'selQPqKM4s0xuSiAR',
              name: 'VENTOLIN SYRUP 100ML',
            },
            {
              id: 'selbeOpCMmVdi1l9F',
              name: 'VENTOLIN TABLETS 2MG',
            },
            {
              id: 'selEa7EPvvebYNnxk',
              name: 'VENTOLIN TABLETS 4MG',
            },
            {
              id: 'selguQovgijdwenLC',
              name: 'VERAPAMIL 40MG TABS',
            },
            {
              id: 'selmKv5YljZyFLf1u',
              name: 'VERAPAMIL INJ 5MG',
            },
            {
              id: 'selsBaXquRILvUUrH',
              name: 'VERMOX 100MG TABLETS',
            },
            {
              id: 'selJ42nYuEdGIxJnJ',
              name: 'VERMOX 500MG TABLETS',
            },
            {
              id: 'sel0SKYJvpwA7oSkw',
              name: 'VESICARE (SOLIFENACIN) 10MG',
            },
            {
              id: 'selD5L3xRDIfuk2Kd',
              name: 'VFEND 200MG INJECTION',
            },
            {
              id: 'sel4nFX5NYAsFUNnk',
              name: 'VFEND 200MG TABS',
            },
            {
              id: 'sel68R2N29QFnYvMR',
              name: 'VIAGRA 25MG TABS',
            },
            {
              id: 'selv90iMrelLOPf5z',
              name: 'VIAGRA 50MG TABS',
            },
            {
              id: 'selHm58TXazPzXP7n',
              name: 'VIBRAMYCIN 100MG CAPS',
            },
            {
              id: 'seleemWPZj2IdtkvU',
              name: 'VICTOZA 6MG/ML 3ML PEN',
            },
            {
              id: 'selU51qDZfryPZVOR',
              name: 'VIGAMOX EYE DROPS 5ml (Alcon)',
            },
            {
              id: 'selXNgQvmyKvU3er0',
              name: 'VINBLASTIN INJ 10MG',
            },
            {
              id: 'selySeHc9sLHhoy7f',
              name: 'VINCRISTINE 1MG INJ',
            },
            {
              id: 'selvouZ30GZs71tNO',
              name: 'VINCRISTINE 2MG INJ',
            },
            {
              id: 'seliRhdXNUGBhO3yr',
              name: 'VINELBINE 10MG/ML',
            },
            {
              id: 'selfYZB3pTeXd7zIV',
              name: 'VINELBINE 50MG INJECTION',
            },
            {
              id: 'selrXTPFHXLFMKphM',
              name: 'VIRAMUNE 200MG TABLETS',
            },
            {
              id: 'seluAea30h0G2TqAq',
              name: 'VIRAMUNE SUSP 10MGML 240ML',
            },
            {
              id: 'selBB3OupnvXPqV8S',
              name: 'VIREAD 300MG TABS',
            },
            {
              id: 'selIM8NaRMfQKqkod',
              name: 'VISANNE 2MG TABLETS',
            },
            {
              id: 'seleprsrF1MqNDk9K',
              name: 'VISINE EYE DROPS',
            },
            {
              id: 'selPicIdqcmKlf6Il',
              name: 'VISKALDIX TABLETS',
            },
            {
              id: 'selrWUWBBPWbCngRp',
              name: 'VISTAMETHASONE DROPS',
            },
            {
              id: 'sel7s1CU6eIS9MC8m',
              name: 'VISTAMETHASONE-N DROPS',
            },
            {
              id: 'selaqzjRtVrBq09hs',
              name: 'VITACAP CAPS',
            },
            {
              id: 'selGju9NlRMEEL5P5',
              name: 'VITALIPID INJ',
            },
            {
              id: 'selrA3OWrGXiaJqsZ',
              name: 'VITAMIN B12 INJ 10ML',
            },
            {
              id: 'selrivFcfhmpd3n4E',
              name: 'VITAMIN D 400IU (JUSDEE) DROPS',
            },
            {
              id: 'selG0sCakesmou2WS',
              name: 'VITAMIN D3 INJ (600000)',
            },
            {
              id: 'selDxmnqWK5jtR19j',
              name: 'VITAMIN E 400MG CAPS.',
            },
            {
              id: 'selIhDsi79GjBfz5d',
              name: 'VITAMIN E CREAM 50G',
            },
            {
              id: 'seleuM4FZiDi6D9Ut',
              name: 'VITAXONE-S (CEFTRIAXONE/SALBACTAM)',
            },
            {
              id: 'selAOCO6PhvlimKlL',
              name: 'VOLINI GEL 30G',
            },
            {
              id: 'seln5cxcUbGUqM6hB',
              name: 'VOLTAREN 25MG TABS',
            },
            {
              id: 'selk4jeXbF6PObbrA',
              name: 'VOLTAREN 50MG TABS',
            },
            {
              id: 'selGOdEVRs6pDTPk4',
              name: 'VOLTAREN GEL 50G',
            },
            {
              id: 'selcvd7rPVLb0xT5u',
              name: 'VOLTAREN RETARD 100MG TABS',
            },
            {
              id: 'selGFlr7sAxMxbvWt',
              name: 'VOLTAREN SR 75MG TABS',
            },
            {
              id: 'seli13Li56UMyyRDe',
              name: 'VOLTFAST 50MG SATCHETS( DISSOLVED IN 1/4 GLASS OF WATER )',
            },
            {
              id: 'selEjERNAKpw7MDG6',
              name: 'VOLUVEN 6% INFUSION 500ML',
            },
            {
              id: 'selOkWAd5GeaK8hKq',
              name: 'VORICONAZOLE TABS 200MG',
            },
            {
              id: 'sel9RJfnWLUDmREoK',
              name: 'VORZOLE( voriconazole 200mg) INJ',
            },
            {
              id: 'selzE9JJYvs1X2sNF',
              name: 'Vdm kit',
            },
            {
              id: 'seleQGCxcAI7PKzhC',
              name: 'Veniz XR 150mg ',
            },
            {
              id: 'selKoQOgCzGNp8DSS',
              name: 'Veniz XR 37.5mg ',
            },
            {
              id: 'selMQpfNQ0BtWdQY7',
              name: 'Veniz XR 75mg ',
            },
            {
              id: 'selZqlE58JRrE1Ioa',
              name: 'Ventab xl 75mg',
            },
            {
              id: 'selr3uN6hd9OTPJIt',
              name: 'Visionance',
            },
            {
              id: 'selidELFcgwbBXoeU',
              name: 'Volini gel',
            },
            {
              id: 'selbrT6n5DS2vgc3J',
              name: 'Vorzole 200mg',
            },
            {
              id: 'selIBgrodf0GnjNJZ',
              name: 'WAXSOL EAR DROPS 10ML',
            },
            {
              id: 'selPFPwBtc51vBhOD',
              name: 'WELLWOMAN CAPS',
            },
            {
              id: 'self8mJqh3PTqn5mo',
              name: 'WEPOX INJ 2000IU',
            },
            {
              id: 'selOYsHdCXFkKpHN0',
              name: 'WEPOX INJ 4000IU',
            },
            {
              id: 'selE4b2oswPi6b7uE',
              name: 'WHITFIELDS OINTMENT 15G',
            },
            {
              id: 'sel3879Oovxv1YTr3',
              name: 'WOKADINE ASEPT 500ML',
            },
            {
              id: 'selqKFbtydplslTmY',
              name: 'WOKADINE MOUTHWASH',
            },
            {
              id: 'selgRe4AuOY36PPhM',
              name: 'Warfarin 1mg(UK Generics)',
            },
            {
              id: 'selxVT1McJUbECiON',
              name: 'Warfarin 3mg(UK Generics)',
            },
            {
              id: 'seleP2IpifoKc1rwm',
              name: 'Warfarin 5mg(UK Generics)',
            },
            {
              id: 'selBn1K3YRhAF0kQ2',
              name: 'XALATAN DROPS',
            },
            {
              id: 'selM8Icp8OQcdCUji',
              name: 'XARELTO 10MG TABS',
            },
            {
              id: 'selCRTvl76KZqkziL',
              name: 'XARELTO 20MG TABS',
            },
            {
              id: 'seldPHyNdoCQ60TUf',
              name: 'XARELTO TABS 15MG',
            },
            {
              id: 'selhWFMxGN6L3sBHF',
              name: 'XATRAL 2.5MG TABS',
            },
            {
              id: 'selSVNrNPH3z4FyQh',
              name: 'XATRAL 5MG TAB',
            },
            {
              id: 'selx2JanyRbvb5lur',
              name: 'XATRAL LP 10MG TABS',
            },
            {
              id: 'seleW3S09lLSxeuM7',
              name: 'XELODA 150MG',
            },
            {
              id: 'selA76AodJ2ZfG1Ko',
              name: 'XELODA 500MG TABS',
            },
            {
              id: 'selEuQB0iVS6mg1A8',
              name: 'XELODA TAB 150mg (Roche)',
            },
            {
              id: 'selZQnrovnwlaVise',
              name: 'XELODA TAB 500mg (Roche)',
            },
            {
              id: 'selDU9ZjOI4BNnc8h',
              name: 'XENICAL 120MG TABLETS',
            },
            {
              id: 'selkczL6TYSUoJYeX',
              name: 'XIBRA PLUS',
            },
            {
              id: 'selsSrVmnSse024IV',
              name: 'XONADINE 120MG(AFTER A MEAL)',
            },
            {
              id: 'selxRc4AcROSZbent',
              name: 'XONADINE 180MG (AFTER A MEAL)',
            },
            {
              id: 'selD5rtK3x6j9hhhJ',
              name: 'XYLO-MEPHA SPRAY 0.05%',
            },
            {
              id: 'sel04N9ckrDWos6R5',
              name: 'XYLOCAINE JELLY 30 GM',
            },
            {
              id: 'selONMtXOW83THceY',
              name: 'XYLOCAINE SPRAY 10% 50ML',
            },
            {
              id: 'selVizNi6c0rFSNb8',
              name: 'XYLOCAINE SPRAY 80G 10%',
            },
            {
              id: 'selHKVzzeRjzJlg9N',
              name: 'XYLOCAINE WITH ADRENALINE',
            },
            {
              id: 'selQZfSdDYmbrvE2c',
              name: 'XYLOPROCT OINT. 20G( STORE IN THE FRIDGE)',
            },
            {
              id: 'selh0IBOyDmBLmY6K',
              name: 'XYLOPROCT SUPPOSITORY [A]  (STORE IN THE FRIDGE)',
            },
            {
              id: 'selrddJmSJr3BBYCz',
              name: 'XYZAL SYRUP 75ML',
            },
            {
              id: 'seloihxn9LliM3Zxm',
              name: 'XYZAL TABS.',
            },
            {
              id: 'selkZU884URGgmQDT',
              name: 'Xibra',
            },
            {
              id: 'selEVNIfQJ9Y07nt6',
              name: 'YASMIN PILLS 21S',
            },
            {
              id: 'selyRHwvlcH94ppXI',
              name: 'Yescort 6mg',
            },
            {
              id: 'selezAuD250Mdyx8H',
              name: 'ZAART-50 TABS',
            },
            {
              id: 'selVTuI1pwao6BcSB',
              name: 'ZAXTER INJ 1GM (VIAL+WFI)',
            },
            {
              id: 'selBv4TngHBA3qANk',
              name: 'ZEDEX HERBAL(SUGAR FREE) SYR 100ML',
            },
            {
              id: 'selvxxAwlhzvZuMPz',
              name: 'ZEDEX SYR 100ML',
            },
            {
              id: 'sel4HQDk5kwvjwlw7',
              name: 'ZEEFEE SYRUP 200ML',
            },
            {
              id: 'seljMHMWz5lNQzdpI',
              name: 'ZEFCOLIN SYRUP',
            },
            {
              id: 'selhFBeym8ZA0Uhq0',
              name: 'ZENTEL 400MG (1S) TABS',
            },
            {
              id: 'seloEHgTrFnfmCZFl',
              name: 'ZENTEL SUSP 20ML',
            },
            {
              id: 'selOSu8BqHFWTfwGa',
              name: 'ZERODAL 100MG TAB (AFTER A MEAL)',
            },
            {
              id: 'selwRj67YGm2sCCgO',
              name: 'ZERODAL-P TABLETS( AFTER A MEAL)',
            },
            {
              id: 'selJj5c0GbZkAme7j',
              name: 'ZESTORETIC 20MG TABS.',
            },
            {
              id: 'self8zKXRa5Do9Tzx',
              name: 'ZESTRIL 10MG TABS.',
            },
            {
              id: 'selNzk8MYCXzxr9GG',
              name: 'ZESTRIL 20MG TABS.',
            },
            {
              id: 'selZC0kGfVT1lfkh1',
              name: 'ZESTRIL 5MG TABS.',
            },
            {
              id: 'selCU1R1HAIo2dXoS',
              name: 'ZIAGEN(ABACAVIR) SYR',
            },
            {
              id: 'sel1h1ac8uG8mJCCn',
              name: 'ZIAK (10/6.25)MG',
            },
            {
              id: 'sel9Y8Ih15ITwTZ9X',
              name: 'ZIAK 2.5/6.25MGS TABS',
            },
            {
              id: 'selVzteJsPVYe6izz',
              name: 'ZIAK 5/6.25MG TABS',
            },
            {
              id: 'selUSPIEmRgXCBklG',
              name: 'ZINACEF 750MG INJ',
            },
            {
              id: 'selPi9sMzysmTe78U',
              name: 'ZINC 20MGS TABS( DISPERSED IN 5ML WATER)',
            },
            {
              id: 'selBdFUCRF3j5RiIA',
              name: 'ZINC OXIDE PASTE 100G',
            },
            {
              id: 'selj0sxLnoR8DsT4Z',
              name: 'ZINC OXIDE WITH DEXPANTHENOL 150MG (BENNETTS)',
            },
            {
              id: 'selqjjRGfJJ9OGJNB',
              name: 'ZINC SULPHATE EYE DROPS',
            },
            {
              id: 'selUPJKWUt5tlzUM3',
              name: 'ZINC&CASTOR 100G CREAM',
            },
            {
              id: 'selRmTqqGgJjDjiM2',
              name: 'ZINC&CASTOR 225G CREAM',
            },
            {
              id: 'sel4DTk0K0ShM8mh3',
              name: 'ZINNAT 125MG TABLETS',
            },
            {
              id: 'selBEfJl7aMRzqNzy',
              name: 'ZINNAT 125MG5ML 100ML(STORE IN FRIDGE)',
            },
            {
              id: 'selu8rV5bUjWj5MrH',
              name: 'ZINNAT 125MG5ML 50ML(STORE IN FRIDGE)',
            },
            {
              id: 'sel4MjV9wG43MR27V',
              name: 'ZINNAT 250MG TABLETS (AFTER A MEAL)',
            },
            {
              id: 'selUr56ArNmSWMfEK',
              name: 'ZINNAT 250MG5ML SUSP(STORE IN FRIDGE)',
            },
            {
              id: 'selASFR1V1YuIcENf',
              name: 'ZINNAT 500MG TABLETS ( AFTER A MEAL)',
            },
            {
              id: 'selAOM1c0VGe6Pz5X',
              name: 'ZITHROMAX 500MG CAPS(1HOUR BEFORE A MEAL)',
            },
            {
              id: 'selROUwoJlKsWrDU1',
              name: 'ZITHROMAX INJ. 500MG VIAL',
            },
            {
              id: 'sel3ghhaaCOBxMz8Y',
              name: 'ZITHROMAX SUSP 15ML(1HOUR BEFORE A MEAL)',
            },
            {
              id: 'selsdEOe8a9g4WnG8',
              name: 'ZITHROMAX SUSP 30ML(1HOUR BEFORE A MEAL)',
            },
            {
              id: 'selauIla2xjmn8dMu',
              name: 'ZMAX ER 2G GRANULES',
            },
            {
              id: 'seldzkBjD42DZWy8y',
              name: 'ZOFRAN 4MG2ML INJ',
            },
            {
              id: 'sel6delV3fJ4v6ChV',
              name: 'ZOFRAN 8MG INJ',
            },
            {
              id: 'sel4IyLjFK2EGe4sA',
              name: 'ZOLADEX DEPOT 3.6MG INJ',
            },
            {
              id: 'selQEUFyQXIGHEolI',
              name: 'ZOLADEX INJ 10.8mg/vial ',
            },
            {
              id: 'selq28APb3PJlLUzf',
              name: 'ZOLADEX INJ 3.6mg/vial ',
            },
            {
              id: 'selVzBNVwqdG97cel',
              name: 'ZOLADEX LA 10.8MG',
            },
            {
              id: 'selcuLvV37jiV0dRy',
              name: 'ZOVIRAX CREAM',
            },
            {
              id: 'sel6cGD38L9CKfns5',
              name: 'ZOVIRAX CREAM 2G',
            },
            {
              id: 'selMJyAdOq1B2B1vR',
              name: 'ZOVIRAX CREAM 5%w/w 10g ',
            },
            {
              id: 'selPRw7JijKtQHM9x',
              name: 'ZOVIRAX INJ 250MG I.V',
            },
            {
              id: 'selwcNdk3m8cbuToZ',
              name: 'ZOVIRAX INJ 250mg/vial ',
            },
            {
              id: 'selafvNo9IfxW0SxX',
              name: 'ZOVIRAX SYRUP 200mg/5ml 125ml',
            },
            {
              id: 'selC5tcELXMhn1Bl5',
              name: 'ZOVIRAX TABLET 200mg ',
            },
            {
              id: 'sel8yQYF8dqvNm89P',
              name: 'ZOVIRAX TABLET 400mg ',
            },
            {
              id: 'selyYhBB4uhAFdb5i',
              name: 'ZUBRICIN-B OINT 15G',
            },
            {
              id: 'selffnN7oxzQNfwro',
              name: 'ZULU 100/500MG (AFTER MEALS)',
            },
            {
              id: 'sel5YzLZXQZoTaZna',
              name: 'ZULU MR TABS ( AFTER MEALS)',
            },
            {
              id: 'sel7ZorH0AwOALsi7',
              name: 'ZUPRICIN - B OINT 15G',
            },
            {
              id: 'sela9rekAMDfkgsWa',
              name: 'ZUPRICIN OINT.',
            },
            {
              id: 'sel4t8m03PVfxoYQV',
              name: 'ZYBAN TABS',
            },
            {
              id: 'selYTlDfBIjX4SUES',
              name: 'ZYFOSS 4MGS INJ',
            },
            {
              id: 'selYb6kOZHbfMJDMN',
              name: 'ZYLORIC 100MG TABS',
            },
            {
              id: 'selfXODesGbAXUveZ',
              name: 'ZYLORIC 300MG TABS',
            },
            {
              id: 'sel6RuXGGSIzwQH02',
              name: 'ZYPREXA 10MG TABS.',
            },
            {
              id: 'sel0ejkOaVJTBe27g',
              name: 'ZYPREXA 5MG TABS.',
            },
            {
              id: 'selS33W4O3edqYzdf',
              name: 'ZYRTAL GEL',
            },
            {
              id: 'sely4y0FeLCfqwD2K',
              name: 'ZYRTAL MR TABS ( AFTER A MEAL)',
            },
            {
              id: 'selCwiuNqRjvkjasQ',
              name: 'ZYRTAL OD 200MG TABS (AFTER A MEAL)',
            },
            {
              id: 'sely7k2g7i2ofOL6u',
              name: 'ZYRTAL PLUS',
            },
            {
              id: 'sel3GjqYsD076Y3kC',
              name: 'ZYRTAL SP 100MG TABS (AFTER A MEAL)',
            },
            {
              id: 'selPqK1dJMsiYzhGJ',
              name: 'ZYRTEC 10MG TABLETS (AT NIGHT)',
            },
            {
              id: 'selJ8jfrqLj7SOfkP',
              name: 'ZYRTEC SYRUP 75MLS',
            },
            {
              id: 'seln04orDceZrFI14',
              name: 'ZYTEC SYRUP 150ML',
            },
            {
              id: 'sel2I7wCHBXzh3iqq',
              name: 'Zaart-H',
            },
            {
              id: 'selsq5PpQELOboLm3',
              name: 'Zedcal',
            },
            {
              id: 'selyOegCZYaqUJz4b',
              name: 'Zimycin 200mg ',
            },
            {
              id: 'selQ55FGsVJNPuvKd',
              name: 'Zimycin 500mg ',
            },
            {
              id: 'seld1cIPKTiTbOhRg',
              name: 'Zinacef 750mg ',
            },
            {
              id: 'selHlKzACgjhbRGKm',
              name: 'Zinc Sulphate 20mg',
            },
            {
              id: 'sel9OhfWCq8CESFwt',
              name: 'Zoflam',
            },
            {
              id: 'seltBzJawaRXzHwMd',
              name: 'Zolam',
            },
            {
              id: 'selnN2l1a0HFqNQLp',
              name: 'Zoloft 50mg',
            },
            {
              id: 'seluqjSiqIKjPkhIn',
              name: 'Zosert 50mg',
            },
            {
              id: 'selOUE1aeFqz1hqRs',
              name: 'Zulu MR',
            },
            {
              id: 'sel2km3ze09sKgrCb',
              name: 'Zytec',
            },
            {
              id: 'sel15PyPpkCb80u8H',
              name: 'Zyvox 600mg',
            },
            {
              id: 'seljrf72jHF8ld2S0',
              name: 'airtal',
            },
            {
              id: 'selccGNlKQhfNi3wU',
              name: 'bazuka',
            },
            {
              id: 'selENwUbbkOHoBmv7',
              name: 'cabalin 25mg',
            },
            {
              id: 'selhIgwZZ0rh4G6BS',
              name: 'cabalin 75mg',
            },
            {
              id: 'selParIRvFXKcx5JW',
              name: 'calcigard 20 mg',
            },
            {
              id: 'selPB76l6eHiGvb1b',
              name: 'cefuroxime/ KEFSTAR  750MG INJECTION',
            },
            {
              id: 'selCSWxb9GF0aAhBt',
              name: 'cicloform',
            },
            {
              id: 'selVVXj6NOKlTEn5g',
              name: 'clotrimazole-betamethasone cream',
            },
            {
              id: 'selI9dbpoi782OUwv',
              name: 'clotriped',
            },
            {
              id: 'selYrWJmenlC5HUrZ',
              name: 'cyclopan',
            },
            {
              id: 'sel1a1ogbkQ1pwGes',
              name: 'dacilin 150mg',
            },
            {
              id: 'selvEV5mcGBrTpw5q',
              name: 'dacilin 300mg',
            },
            {
              id: 'sel6vdeSVZSWOk9Xl',
              name: 'deep relief',
            },
            {
              id: 'selnZKXyq5ExCzV93',
              name: 'dinapar Qps 4% spray',
            },
            {
              id: 'selNAeuTmqsrL0KG5',
              name: 'dobesil-H',
            },
            {
              id: 'selbujuIRy84L0XH6',
              name: 'erodal',
            },
            {
              id: 'selwbk5DUJiu0ozJR',
              name: 'fluconazole',
            },
            {
              id: 'selV2sIJLEn5zwXiJ',
              name: 'flux 500mg',
            },
            {
              id: 'selwZ6h8vkO2UuABS',
              name: 'itraconazole',
            },
            {
              id: 'sel16sG0u7mxLVKzL',
              name: 'labetalol 200mg tabs',
            },
            {
              id: 'selL381rGtrjUmcvX',
              name: 'liv 52',
            },
            {
              id: 'selxokVkXTV6eRlsj',
              name: 'mometasone cream',
            },
            {
              id: 'selrddzifyZJ48ysK',
              name: 'siclodon',
            },
            {
              id: 'sel4T69ETjtdmq9rV',
              name: 'xefo 8mg',
            },
          ],
        },
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
        options: null,
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
        options: null,
        symmetricColumnId: 'fld95BGdWauLUeE4L',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblYSNrfZJnzdSwmx',
        required: false,
        helper: '',
      },
      {
        id: 'fldhpN3z7ztLZjPMc',
        name: 'Dose',
        type: 'text',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'sellw1RV71ZgeROWT',
              name: 'Capsule(s)',
            },
            {
              id: 'selTqksELLGdPjo5D',
              name: 'Drop',
            },
            {
              id: 'selL80xzbZVcjOQjP',
              name: 'Gram(s)',
            },
            {
              id: 'seldOIiPCTQ9fKpXG',
              name: 'IU',
            },
            {
              id: 'selgzYQ9Qbfr6kn9C',
              name: 'Puff(s)',
            },
            {
              id: 'selazqJ0DMBLYqA50',
              name: 'Sachet(s)',
            },
            {
              id: 'selVRA5Tba3aBCISA',
              name: 'Tablespoon',
            },
            {
              id: 'selQtj5nXZtWsb9f4',
              name: 'Tablet(s)',
            },
            {
              id: 'sel9nHZzaG6jGV1h7',
              name: 'mg',
            },
            {
              id: 'selqJDaZGntSXMtlJ',
              name: 'ml',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fldmgFni4l4fDZeqF',
        name: 'Frequency',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selaKmNOUmrxA71j8',
              name: 'At night',
            },
            {
              id: 'selR2TQVoXX8x4siX',
              name: 'Every 8 hours',
            },
            {
              id: 'selr4iHnA8OMrIsMB',
              name: 'Every Hour',
            },
            {
              id: 'selYKH5VxdvXRgz28',
              name: 'Four times a day',
            },
            {
              id: 'sel22zf5xJU2Yd1op',
              name: 'Immediately',
            },
            {
              id: 'selGJbU7GJg4ETk0A',
              name: 'On alternate days',
            },
            {
              id: 'selJHrROiBpoEqgVz',
              name: 'Once a day',
            },
            {
              id: 'selX8wlPR4YzAREQo',
              name: 'Once a week',
            },
            {
              id: 'selz6CKsReNwbOoVl',
              name: 'Other',
            },
            {
              id: 'selZgsMl6Ll3XgMd6',
              name: 'Thrice a day',
            },
            {
              id: 'selaGLyrVVx2i0bhv',
              name: 'Thrice a week',
            },
            {
              id: 'selqrzrTea463vwzx',
              name: 'Twice a day',
            },
            {
              id: 'sel4OkGGtEMFpL8Yk',
              name: 'Twice a week',
            },
            {
              id: 'sel4fmV7NTuxg302f',
              name: 'When necessary',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selPADhH1LapzhQ8A',
              name: 'Ear',
            },
            {
              id: 'selLFdt56YH5bkH1w',
              name: 'Eye',
            },
            {
              id: 'selPz0ebVOHNGxlVd',
              name: 'Inhalation',
            },
            {
              id: 'selJ5CKMFd5AWWbcE',
              name: 'Inhalation',
            },
            {
              id: 'seld5GdPlEpSirh33',
              name: 'Intradermal',
            },
            {
              id: 'sel64czNO3pTXxgns',
              name: 'Intramuscular',
            },
            {
              id: 'selBrsQU1Tb9VC9ok',
              name: 'Intraosseous',
            },
            {
              id: 'sel5u0saHY26fsAsr',
              name: 'Intraperitoneal',
            },
            {
              id: 'selXVTGfuz2HYM7XQ',
              name: 'Intrathecal',
            },
            {
              id: 'sel2W5trJV9IvtIUG',
              name: 'Intravenous',
            },
            {
              id: 'selNkQMt62E31AhQC',
              name: 'Nasal',
            },
            {
              id: 'selLpYwQsqkcxhczy',
              name: 'Nasal',
            },
            {
              id: 'sel4qusq0LBLs0Q9d',
              name: 'Nasogastric',
            },
            {
              id: 'selxaNdvJkadNaJ3q',
              name: 'Oral',
            },
            {
              id: 'sel7gQgshRzRefQqe',
              name: 'Other',
            },
            {
              id: 'selMFu41AT6A4bJWS',
              name: 'Per Rectum',
            },
            {
              id: 'selTOymDGF83fK8AG',
              name: 'Per Vaginal',
            },
            {
              id: 'selOltUPbMrMeOEAR',
              name: 'Sub Cutaneous',
            },
            {
              id: 'selMdGPuzvUlxpfHo',
              name: 'Sub Lingual',
            },
            {
              id: 'selYOPYTrv7PymTcr',
              name: 'Topical',
            },
            {
              id: 'selWPrr0FCCRmm3n9',
              name: 'Topical',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selyNsICTY9QLSZiv',
              name: 'Bottle(s)',
            },
            {
              id: 'selgiHuMQsmRqfcJt',
              name: 'Capsule(s)',
            },
            {
              id: 'selQiBwqXAW9DOGVH',
              name: 'Drop(s)',
            },
            {
              id: 'selATDtXM7jIXBsfa',
              name: 'Grams(s)',
            },
            {
              id: 'selsJgl2UxyanLM5V',
              name: 'IU',
            },
            {
              id: 'selNUxSGLOS8drf8R',
              name: 'Inhaler(s)',
            },
            {
              id: 'selJiO5sGyUvKKuxx',
              name: 'Puff(s)',
            },
            {
              id: 'sel9La3Lw05uorMhW',
              name: 'Sachet(s)',
            },
            {
              id: 'selXAtnephaLc2obT',
              name: 'Tablespoon(s)',
            },
            {
              id: 'selmWV0vgKgZrYpnr',
              name: 'Tablet(s)',
            },
            {
              id: 'selUzdwI495dozeyC',
              name: 'ml(s)',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fldkJyzyyI2lqNPDS',
        name: 'Start Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selZ280rnRuAW9DOv',
              name: 'No',
            },
            {
              id: 'selW0GWUmtb6jUPrT',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel7IggjK7Gybeu13',
              name: 'After meals',
            },
            {
              id: 'selTgNhLcieZDOoOF',
              name: 'As directed',
            },
            {
              id: 'selJdSjgoc9Z87B1x',
              name: 'At bedtime',
            },
            {
              id: 'selvTVAWlppNW3NHo',
              name: 'Before meals',
            },
            {
              id: 'sel9d5s1kmjR6PxM6',
              name: 'Empty stomach',
            },
            {
              id: 'selykwSocu2DyCH2e',
              name: 'Immediately',
            },
            {
              id: 'selnU78OraRUiJIda',
              name: 'In the evening',
            },
            {
              id: 'selNjTx9wtUlAFG3Z',
              name: 'In the morning',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fldW9ZGlBPaVXDaPf',
        name: 'Refill facility (providers)',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fldsHV3Kh5t0QshVK',
        name: 'Change of medication',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selFKqytZ8vfCiGAe',
              name: 'No',
            },
            {
              id: 'sel1n5nqQ0KFQ7ZbZ',
              name: 'Yes',
            },
          ],
        },
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
    name: 'Appointments',
    id: 'tblZB4YOpd7XH3cYt',
    fields: [
      {
        id: 'fldafLUdREtVz9706',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel9y2jSL4hovcU3r',
              name: 'Scheduled',
            },
            {
              id: 'selwlxlRDWQeLaa7k',
              name: 'Unscheduled',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selsrAU0eFwWYfS1N',
              name: 'Baseline',
            },
            {
              id: 'selH28toKzievdkqT',
              name: 'Clinical review',
            },
            {
              id: 'selI0O1XyfjlW4Aox',
              name: 'Fitness',
            },
            {
              id: 'sel5zos3hlbe4183Z',
              name: 'HMP followup',
            },
            {
              id: 'sel2uGNh8fowtmXVH',
              name: 'Health Navigation Consultation',
            },
            {
              id: 'selirlQKLTFQeUkv0',
              name: 'Inpatient',
            },
            {
              id: 'selUVBcJ8IuZ0tMNV',
              name: 'Laboratory',
            },
            {
              id: 'selLf5CNeIJt3azea',
              name: 'Medication Pick-up',
            },
            {
              id: 'selu8y4MorofEPlmW',
              name: 'Mental Health Consultation',
            },
            {
              id: 'selkSbK6vFFwd54RR',
              name: 'Nutrition Consultation',
            },
            {
              id: 'seltGnbc7JQqRbvk6',
              name: 'Outpatient Procedure',
            },
            {
              id: 'selPyfgDAhtL9Y5uE',
              name: 'Physiotherapy Consultation',
            },
            {
              id: 'sel1Cg1wr7mcfjTh3',
              name: 'Radiology',
            },
            {
              id: 'selPQUPRkfmmUAbvc',
              name: 'Specialist Referral',
            },
            {
              id: 'selbzKf4TiJApj5JS',
              name: 'Urgent Care',
            },
            {
              id: 'sel0E8stfb7n5s2dg',
              name: 'Virtual Consult',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldbuRWZXgDIEY15t',
        name: 'Providers',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: 'fld8BxO6cY5WQ38v9',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
        required: false,
        helper: '',
      },
      {
        id: 'fldersOYzP3Kjx8on',
        name: 'Location (Other)',
        type: 'text',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fldQlXe2zComT4i3P',
        name: 'Status',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'sele3r7mFJRV75yOZ',
              name: 'Cancelled',
            },
            {
              id: 'selbGcKx7EIT7PU7S',
              name: 'CheckedIn',
            },
            {
              id: 'sel8yFdjiyWA7gzAu',
              name: 'Completed',
            },
            {
              id: 'selDfPtPJb1B76Rxw',
              name: 'Missed',
            },
            {
              id: 'selXUg8U2jrmqfYJA',
              name: 'Rescheduled by member',
            },
            {
              id: 'selIXpfr9ZcM7MTZb',
              name: 'Scheduled',
            },
          ],
        },
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
        options: null,
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
    fields: [
      {
        id: 'fld97KWfGQMlZeAT3',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
        symmetricColumnId: 'fld33jxyGnKOQkPgN',
        unreversed: true,
        relationship: 'one',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: true,
        helper: '',
      },
      {
        id: 'fldjL2gP5X6ZpRhEo',
        name: 'Date of Consultation',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sellm6diVRCvUd0im',
              name: 'Baseline',
            },
            {
              id: 'selnLqQH0nYM9b19L',
              name: 'Referral after Antara Virtual consultation',
            },
            {
              id: 'selWEvKRyeR8w0hI9',
              name: 'Referral from external facility',
            },
            {
              id: 'sel206bU6Vg1LoAHY',
              name: 'Routine health navigation',
            },
            {
              id: 'selXckbY8dEOOQsYv',
              name: 'Self-booking',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selrfeh3v9jjo0WjO',
              name: 'Chronic case consultation',
            },
            {
              id: 'sel0GNvJxPFAckW6w',
              name: 'Follow-up consultation',
            },
            {
              id: 'sel2Xhbi2y3JoKmPo',
              name: 'General consultation',
            },
            {
              id: 'sel6j9INLfDN56Yjb',
              name: 'Risk assessment',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selbmYd9DpGKZYpAN',
              name: 'Diabetes',
            },
            {
              id: 'seloIEiZH7NU4kQVV',
              name: 'High Blood Pressure',
            },
            {
              id: 'sel9ajNu0MZ5zqkrp',
              name: 'High Cholesterol',
            },
            {
              id: 'selh5KZEIdGBNBYzT',
              name: 'Osteoarthritis',
            },
            {
              id: 'seljtVdnE5fgcPHXg',
              name: 'Other',
            },
            {
              id: 'selWjeAnDmWYcftkb',
              name: 'Overweight',
            },
          ],
        },
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
        options: null,
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
        id: 'fld1CS9ZVxdfSs7Yh',
        name: 'Breakfast',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selU865JEpar5UPW8',
              name: 'Minimal',
            },
            {
              id: 'selOjxgaI53rm6SSA',
              name: 'No',
            },
            {
              id: 'seldtBL36R1WoLUII',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selWiVTJiZJYEDjxh',
              name: 'Comorbidity-related challenge',
            },
            {
              id: 'selmwiJLYt1gQdh63',
              name: 'Disordered eating pattern',
            },
            {
              id: 'selL1YG0kQ4w8KFyp',
              name: 'Harmful nutrition beliefs or attitudes',
            },
            {
              id: 'selNUGWg9YFBd9izo',
              name: 'Intake of unsafe foods/beverages',
            },
            {
              id: 'selYjJE9KZ4JKe1pJ',
              name: 'Lack of discipline/motivation',
            },
            {
              id: 'selHKtJUB7maz5JAN',
              name: 'Lack of monitoring data',
            },
            {
              id: 'selXheAYXgbTiaTlz',
              name: 'Limited access to healthy & fresh foods',
            },
            {
              id: 'selg3ywDnDZxDdsLl',
              name: 'Limited knowledge on food preparation',
            },
            {
              id: 'selHj3luo3sfTQzHm',
              name: 'Limited time for diet/lifestyle change',
            },
            {
              id: 'selPNjH0QMk1jWaRV',
              name: 'Limited variety of foods available',
            },
            {
              id: 'selBiKFmDdQJnTjE9',
              name: 'None',
            },
            {
              id: 'sel8IHvJfgFkZRSvV',
              name: 'Not ready for diet/lifestyle change',
            },
            {
              id: 'sel74cVibZE1Gwh9q',
              name: 'Other',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fldYbwXC8AvuQ9b8g',
        name: 'Assessment',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selPQo4Coh7ENJDpt',
              name: 'Antara virtual consultation',
            },
            {
              id: 'selR9R35RHqPP9BI7',
              name: 'Blood sugar & food diary chart',
            },
            {
              id: 'selEcsahxpp19Q0pM',
              name: 'Food diary',
            },
            {
              id: 'sel9kRHV0aiBZ0auB',
              name: 'Grocery shopping list',
            },
            {
              id: 'selHEnS6BOPQwSjEi',
              name: 'Meal plan',
            },
            {
              id: 'seluoiZGgWTQ499Pw',
              name: 'New diet plan/dietary guidelines',
            },
            {
              id: 'sel80sbMFWElVLysq',
              name: 'Nutrition education & counseling',
            },
            {
              id: 'selIILg6jdA8pOgyr',
              name: 'Other',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Click here to book the consultation on Calendly: <a href="https://calendly.com/antara-health/nutrition-consultation" target="_blank">https://calendly.com/antara-health/nutrition-consultation</a> ',
      },
      {
        id: 'fldDt5sfuzRfkev7Q',
        name: 'Put anything else you want to share here!',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: null,
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
    fields: [
      {
        id: 'fldbWJ9BNCnQjsBF9',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selylXskH8RLXBGD7',
              name: 'Measured by Antara',
            },
            {
              id: 'selygiVHudwhvD7cY',
              name: 'Measured by Facility',
            },
            {
              id: 'selwadw05EXiui4SP',
              name: 'Self-reported',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selc2Vm9OR5borwol',
              name: 'Abnormal rhythm',
            },
            {
              id: 'selqUev25eXqq5hH8',
              name: 'No abnormal rhythm',
            },
          ],
        },
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
    fields: [
      {
        id: 'fldY2oAahzsrtK3ye',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selAZ7q5z7SZeA3fG',
              name: 'Ad hoc BP measurement',
            },
            {
              id: 'selOJ2590QthNuCjI',
              name: 'App data collection',
            },
            {
              id: 'sel5RrJYUwSV87Yx5',
              name: 'Data collection for HMP',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selGqXsw049BHNbFh',
              name: 'Measured by Antara',
            },
            {
              id: 'sellV03Ud74eTW0tE',
              name: 'Measured by Facility',
            },
            {
              id: 'selMIWJRbWCe2jsiJ',
              name: 'Self-reported',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: 'fld1jEcoiqh4de3iq',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
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
        id: 'fld1Oqsf9qzTC6nSK',
        name: 'Morning Systolic',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
    fields: [
      {
        id: 'fld7jptb7F7xE7SH6',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selOfuPYZr4SOEw0S',
              name: 'Fasting',
            },
            {
              id: 'selkYcwuExF4NBASS',
              name: 'Non-fasting',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selBj1zrOz508Tx5d',
              name: 'Measured by Antara',
            },
            {
              id: 'sel0bXJAXlSWtYOVD',
              name: 'Measured by Facility',
            },
            {
              id: 'selWf8McmOUWxBpAx',
              name: 'Self-reported',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
    fields: [
      {
        id: 'fld2zAEadgjEC682h',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selmjjLxJpTHmxI0K',
              name: 'Measured by Antara',
            },
            {
              id: 'selb2HGajea7DOBQf',
              name: 'Measured by Facility',
            },
            {
              id: 'sellOlU7ximijTTKa',
              name: 'Self-reported',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fldp6xbxwTUDVt7QE',
        name: 'Morning BS timing',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selugQr78BLgGshIv',
              name: 'both',
            },
            {
              id: 'selcwjrCizZU50dhe',
              name: 'postprandial',
            },
            {
              id: 'selkYPwPmwkpFVA9k',
              name: 'preprandial',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selVlP2mDO2dRvJ3C',
              name: 'both',
            },
            {
              id: 'selcwjrCizZU50dhe',
              name: 'postprandial',
            },
            {
              id: 'selkYPwPmwkpFVA9k',
              name: 'preprandial',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selynyp9OIb52nqcY',
              name: 'both',
            },
            {
              id: 'selcwjrCizZU50dhe',
              name: 'postprandial',
            },
            {
              id: 'selkYPwPmwkpFVA9k',
              name: 'preprandial',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
    name: 'Member tasks',
    id: 'tbljwCFIDT2vG65AH',
    fields: [
      {
        id: 'fldkv6teX0vK710bJ',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selOkfpMZiyrI6sLD',
              name: 'Appointment Booking',
            },
            {
              id: 'selXtonDSvprkhrDQ',
              name: 'Data Collection',
            },
            {
              id: 'sel9c8m3f46Rk2XIi',
              name: 'HMP: Review',
            },
            {
              id: 'selypk9rURHNe9zv3',
              name: 'Open data sharing',
            },
            {
              id: 'selyYhuqlIVyTsGAW',
              name: 'Screening: Pre-baseline',
            },
            {
              id: 'sel6EWOIFLVtAKTph',
              name: 'Screening: Self Serve',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selsrUqVI0A9zd49o',
              name: 'Blood Pressure',
            },
            {
              id: 'selSUH6PrKPfrwZPv',
              name: 'Blood Sugar',
            },
            {
              id: 'selJ2z0veT6nahlxy',
              name: 'Vitals',
            },
          ],
        },
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
        name: "Task's duration",
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selGwevgmzyXKLqzc',
              name: 'Baseline',
            },
            {
              id: 'sel6CEdKNfgZ4qIbG',
              name: 'Health Navigator',
            },
            {
              id: 'seljm5MTAkCr0TlmA',
              name: 'Mental Health Clinician',
            },
            {
              id: 'selQcF89aJxl3Fmw0',
              name: 'Nutritionist',
            },
            {
              id: 'selSeRstPzegf5Mcw',
              name: 'Physiotherapist',
            },
            {
              id: 'selcoyRel6INkf9ie',
              name: 'Virtual Doctor',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seldbHj7dif4bjrsx',
              name: 'Not Started',
            },
          ],
        },
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
        options: null,
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
    name: 'HN Tasks',
    id: 'tblfH6lD7Cd1cGgSR',
    fields: [
      {
        id: 'fldlW5gNb9Pgl0CkX',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel94Pfoa861iRJOf',
              name: 'Appointment: Attendance empowerment',
            },
            {
              id: 'selFIRg4T4atZpYlF',
              name: 'Appointment: Attendance reminder',
            },
            {
              id: 'sel7cXYByeJ5wsXRT',
              name: 'Appointment: Checkin confirmation',
            },
            {
              id: 'selJsg5GZKQ9t8JYS',
              name: 'Appointment: PAFU',
            },
            {
              id: 'selnmtJnNGI02p3eF',
              name: 'BP Mon: Collect Data ',
            },
            {
              id: 'selSmioO47Gryupxk',
              name: 'CS task type',
            },
            {
              id: 'sel7WiuA2sMxX1Bkg',
              name: 'Call Avenue',
            },
            {
              id: 'selyeuqUh5XrbdQjX',
              name: 'Call Member',
            },
            {
              id: 'selhpluqH18g7Y4UD',
              name: 'Condition: review and update',
            },
            {
              id: 'sel9nA7FkEESyBIXI',
              name: 'Create new content',
            },
            {
              id: 'selD7YPMldPUzTYdC',
              name: 'Escalate member issue',
            },
            {
              id: 'selAuYIav04gjAXGB',
              name: 'Flag for Internal clinical review',
            },
            {
              id: 'seliI9uR7MEflVRP3',
              name: 'HMP: Collect condition data',
            },
            {
              id: 'selZd0lGDeFiqcn1m',
              name: 'HMP: Confirm Monitoring Plan and Kit Delivery',
            },
            {
              id: 'selM11ByInyJF098D',
              name: 'HMP: Confirm Monitoring Plan and Kit Delivery ',
            },
            {
              id: 'selC5B3mFFWJ6ZpiY',
              name: 'HMP: Follow',
            },
            {
              id: 'selWzkanMeULIoqMx',
              name: 'HMP: Followup',
            },
            {
              id: 'selOb9PErCCZwxIGC',
              name: 'HMP: Generate',
            },
            {
              id: 'selFLr4RqoVSWJwhi',
              name: 'HMP: Internal Review',
            },
            {
              id: 'selXmzU23W7xhL0Pf',
              name: 'HMP: Member Review',
            },
            {
              id: 'sellZDfa3Aoql6r2W',
              name: 'HMP: Send',
            },
            {
              id: 'sel7C3MVTx9pV3Bsi',
              name: 'HMP: Send Monitoring Plan & Coordinate Kit Delivery',
            },
            {
              id: 'sel7Cj5h4vvl1YTp1',
              name: 'HMP: book consult to review with member',
            },
            {
              id: 'selumX5gR2bHotiXO',
              name: 'Hand over tasks and meetings before holidays',
            },
            {
              id: 'sel6a7v6IrEriEMab',
              name: 'Inpatient follow up call',
            },
            {
              id: 'selz0guwJGtnMRPfZ',
              name: 'Intervention: review and update',
            },
            {
              id: 'selMBLt83D4CsSGF3',
              name: 'Nutrition: Perform Consultation',
            },
            {
              id: 'selIfSK5OM6wvvzmr',
              name: 'Nutrition: Schedule Consultation',
            },
            {
              id: 'selWItp5f6FURFm9P',
              name: 'Nutrition: Send Consultation Reminder',
            },
            {
              id: 'selJdrzelRiOTMDvf',
              name: 'Others',
            },
            {
              id: 'selT8ezn8q4pVeNsu',
              name: 'Post VC: Asthma score',
            },
            {
              id: 'selKwIRiG94hKPSH7',
              name: 'Post VC: Follow up on In-person review',
            },
            {
              id: 'sellwbN0P5jJjFygK',
              name: 'Post VC: Follow up on Monitoring data',
            },
            {
              id: 'selXEyLhwhhoVr9wC',
              name: 'Post VC: Follow up on Results',
            },
            {
              id: 'selgkc2gC09CwncZL',
              name: 'Post VC: Follow up on Symptom',
            },
            {
              id: 'selqPbHUonsHMExEd',
              name: 'Post VC: Health Education',
            },
            {
              id: 'selHgbOjmYYGaOiax',
              name: 'Post VC: Monitoring BP',
            },
            {
              id: 'selvxX9HGDcFCGRA5',
              name: 'Post VC: Monitoring Glucose',
            },
            {
              id: 'selkuTBw0lm6ERL1d',
              name: 'Post VC: Schedule Follow up VC review',
            },
            {
              id: 'selRGtqAsJVHuniSx',
              name: 'Post VC: Schedule Hba1c test',
            },
            {
              id: 'selH3G3fS9aivI6xs',
              name: 'Post VC: Send content',
            },
            {
              id: 'seliubA8JSh1WuwC3',
              name: 'Prescribe medication',
            },
            {
              id: 'selKLL5WPLsqDfVav',
              name: 'Refill Prescription',
            },
            {
              id: 'selPOvWgP7lB4DROa',
              name: 'Reschedule call',
            },
            {
              id: 'selcn1geGPzO7WTPJ',
              name: 'Rx: Followup',
            },
            {
              id: 'selKZtOcnnyTLHfp8',
              name: 'Rx: Refill',
            },
            {
              id: 'selM786VhNU6XY3PW',
              name: 'SMS to members',
            },
            {
              id: 'selpBwOOczhQt6Jk5',
              name: 'SMS to members (Appointment booking)',
            },
            {
              id: 'selp9P60ZCfm4KUsN',
              name: 'SMS to members (BP collection)',
            },
            {
              id: 'sels4beT7fO74KVDG',
              name: 'SMS to members (BS collection)',
            },
            {
              id: 'selJsJIZJkS28cXry',
              name: 'SMS to members (VC reminder)',
            },
            {
              id: 'selpGvueUOpB1mFDn',
              name: 'SMS to members (vitals)',
            },
            {
              id: 'seltKHbQdrYbzNCHd',
              name: 'Schedule Avenue visit',
            },
            {
              id: 'selAlFEKeU8Le8ilN',
              name: 'Schedule Fitness consultation',
            },
            {
              id: 'selK2LeGZv59BZ1Ex',
              name: 'Schedule HMP #1 follow-up',
            },
            {
              id: 'selivwMFFRdhk7u9f',
              name: 'Schedule HMP #2 follow-up',
            },
            {
              id: 'selY3ZE3JQ7mvC9dD',
              name: 'Schedule HMP #3 follow-up',
            },
            {
              id: 'selylC4z3xnH9HHuS',
              name: 'Schedule Home visit',
            },
            {
              id: 'selP43z1ptFsBZN5F',
              name: 'Schedule VC consultation',
            },
            {
              id: 'selgtVnMLif3XczNO',
              name: 'Schedule consultation non-Avenue specialist',
            },
            {
              id: 'sel1gVMewIGa6zYMh',
              name: 'Schedule: Avenue visit',
            },
            {
              id: 'seluIEkagImoHfl7L',
              name: 'Schedule: Fitness consultation',
            },
            {
              id: 'selb3SKTZDyH3AokZ',
              name: 'Schedule: Followup call',
            },
            {
              id: 'selTjwT0dHi5qD3sx',
              name: 'Schedule: Home visit',
            },
            {
              id: 'selujmJxr78TBAKVL',
              name: 'Schedule: Mental Health Consultation',
            },
            {
              id: 'selVIkISahRwE7IYH',
              name: 'Schedule: Physiotherapy',
            },
            {
              id: 'selav6BV0nGnSFQFh',
              name: 'Schedule: VC consultation',
            },
            {
              id: 'sel4AOlEe4AFD4yKi',
              name: 'Schedule: non-Avenue specialist',
            },
            {
              id: 'selacCIcLinqk8MEm',
              name: 'Send Check-in Message #1',
            },
            {
              id: 'selbxf5vpo8bsMNTb',
              name: 'Send clinical summary',
            },
            {
              id: 'seltw96NwJQbgof4i',
              name: 'Send clinical summary to AHC',
            },
            {
              id: 'selCTZd8ClTvZpiyY',
              name: 'Send consultation information',
            },
            {
              id: 'selWUYptp5wQL1RX4',
              name: 'VC: follow up call',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selfnmj6o1VTAAecT',
              name: 'Account Renewal',
            },
            {
              id: 'sel4nmrJhufV2Btde',
              name: 'Add member',
            },
            {
              id: 'selMeZ4pum0irGcN9',
              name: 'Add record in Life cover table',
            },
            {
              id: 'selFhkQuRO6araHls',
              name: 'App tech support',
            },
            {
              id: 'selGODCh7BHofeDJm',
              name: 'Baseline reminder 1 day before',
            },
            {
              id: 'selllKmQboaFDMQKg',
              name: 'Baseline reminder same day',
            },
            {
              id: 'selhPUNdLvCCJgNMg',
              name: 'Baseline rescheduling',
            },
            {
              id: 'selZ2KSlGtVsaHTBE',
              name: 'Call back request',
            },
            {
              id: 'sel3YnKhQG6Z9Ojly',
              name: 'Call for NPS',
            },
            {
              id: 'selIKREvAi0AVtYVm',
              name: 'Call with member: app sign up',
            },
            {
              id: 'selKlesPz04z3KBjf',
              name: 'Equipment & Health service pricing',
            },
            {
              id: 'selmh4mYsXhEEbqN3',
              name: 'Follow Up Call for NPS',
            },
            {
              id: 'selYRn3G5DUB470Fw',
              name: 'Follow up with member',
            },
            {
              id: 'selSdTIYgErzvekT6',
              name: 'HN task type',
            },
            {
              id: 'sel6fuUr8pDGzpjjA',
              name: 'Life insurance documentation',
            },
            {
              id: 'selIqGyZeEQZJZ205',
              name: 'Life insurance payment',
            },
            {
              id: 'selcZzKcPqIDnMdax',
              name: 'Life insurance register',
            },
            {
              id: 'selUvbUyhO0ZMsAhh',
              name: 'Logisitics (Equipment collection)',
            },
            {
              id: 'seluVGKGZ3RheAM3w',
              name: 'Logistics (Equipment delivery)',
            },
            {
              id: 'selNz8rqMpamUHuru',
              name: 'Logistics (Medical card pick up and delivery)',
            },
            {
              id: 'selnuxK6VM2WjlR99',
              name: 'Medical card follow up',
            },
            {
              id: 'selgnHQF4FUKm3c08',
              name: 'Medical card replacement',
            },
            {
              id: 'selAajgwpmkL1tSJF',
              name: 'Member invoice request',
            },
            {
              id: 'selGsBN073Hc3vunB',
              name: 'Member request for HN',
            },
            {
              id: 'selxvfUMkFWLspeaw',
              name: 'Other',
            },
            {
              id: 'selriObJZswda6tjQ',
              name: 'POC test coordination',
            },
            {
              id: 'selmzJ6i3Jkx0URQV',
              name: 'Plan Purchase Request',
            },
            {
              id: 'selbhowxK1kH86IsF',
              name: 'Plan status request',
            },
            {
              id: 'sel0BKItogfYlOyvj',
              name: 'Re-assign lead HN',
            },
            {
              id: 'selMnNasa3R6WO9uh',
              name: 'Renewal status confirmation',
            },
            {
              id: 'selzvYoSxRBHWbj7r',
              name: 'SMS (Antara intro)',
            },
            {
              id: 'selLoxZtO4cMB1i5r',
              name: 'SMS (Baseline reminder)',
            },
            {
              id: 'selloUGsaiIpJZXVP',
              name: 'SMS (HN on leave)',
            },
            {
              id: 'selwixZvK7uqdKMLR',
              name: 'SMS (NPS)',
            },
            {
              id: 'selVDfcHO4EmMQ9jT',
              name: 'SMS to members',
            },
            {
              id: 'sel6emoUmo8XvJhdM',
              name: 'SMS to members (Appointment booking)',
            },
            {
              id: 'selsW1wu1Z5IV0bI0',
              name: 'SMS to members (BP collection)',
            },
            {
              id: 'selblQqFzS9aQfcKO',
              name: 'SMS to members (BS collection)',
            },
            {
              id: 'selpvO0Ex2W2OvKFG',
              name: 'SMS to members (VC reminder)',
            },
            {
              id: 'sel7xY4CZpDsvngEx',
              name: 'SMS to members (vitals)',
            },
            {
              id: 'selkTgccruhAWmBgs',
              name: 'Update member Plan / Cover details',
            },
            {
              id: 'selfLPq4mdo4IGWOz',
              name: 'Update member bio data',
            },
            {
              id: 'selDiwIJKJ3Qvqq5k',
              name: 'Update member status',
            },
            {
              id: 'selEHsE1hUTjmWDOF',
              name: 'Update/Review member',
            },
            {
              id: 'sellwXetOcIbHdfzJ',
              name: 'call member: baseline booking',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
            ].some((r) => values.Type.includes(r))
          }
          return [
            'HMP: Follow',
            'HMP: Followup',
            'HMP: Internal Review',
            'HMP: Member Review',
            'HMP: Send',
            'HMP: Send Monitoring Plan & Coordinate Kit Delivery',
          ].includes(values.Type)
        },
      },
      {
        id: 'fldXclXvQtT3CDhBc',
        name: 'Collect Condition Data',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selas61vVhu6vKEUX',
              name: 'Blood Pressure',
            },
            {
              id: 'selInsDGjniJ09Ajs',
              name: 'Height',
            },
            {
              id: 'selYQCQfgB67yedlG',
              name: 'Other',
            },
            {
              id: 'selG65emasAGHdHjM',
              name: 'RBS/FBS',
            },
            {
              id: 'selPL7cDbmQW2arve',
              name: 'Weight',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'seluzVIZxcZVHTXZu',
              name: 'High',
            },
            {
              id: 'selsTWQwEvWnv1fXy',
              name: 'Low',
            },
            {
              id: 'selzjMr7HFlaXyETR',
              name: 'Medium',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selKIxKDYbLwLTUWp',
              name: 'Cancelled',
            },
            {
              id: 'selD1LYzVOWiQrQvB',
              name: 'Complete',
            },
            {
              id: 'selhJrQNPvIY29Yn6',
              name: 'In Progress',
            },
            {
              id: 'selWk1tIobWN903Sv',
              name: 'Not Applicable',
            },
            {
              id: 'selNOC9LOuazcSrFL',
              name: 'Not Started',
            },
            {
              id: 'sel1wNrvCTzbRnTmW',
              name: 'On Hold',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please select yourself here only if you want to be informed about the status of this task (especially if the task is supposed to be done by somebody else)',
      },
    ],
  },
  {
    name: 'Logistics Tasks',
    id: 'tblJmoQGSS2vl8u9g',
    fields: [
      {
        id: 'fldTJ6nR54ydrQSYR',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel9afUiPNgH2OAod',
              name: 'Admin task',
            },
            {
              id: 'selqau6N0BqoEwXUq',
              name: 'BP device delivery',
            },
            {
              id: 'selXsA9wSikwcA9Wj',
              name: 'BP device pick up',
            },
            {
              id: 'selDLEil9dDchsp3D',
              name: 'Blood Pressure measurement',
            },
            {
              id: 'selHVbRjiKyYFGYHb',
              name: 'Card delivery',
            },
            {
              id: 'selVZp7bf8oIq5SYw',
              name: 'Card pick up',
            },
            {
              id: 'selcH6z3v228Gt7nU',
              name: 'Check faulty BP device',
            },
            {
              id: 'selDYyNuREtRZkaEd',
              name: 'Check faulty glucometer device',
            },
            {
              id: 'sel8vDPEuJCHIU3YZ',
              name: 'Glucometer delivery',
            },
            {
              id: 'selpWJn7SegtgzCMf',
              name: 'Glucometer pick up',
            },
            {
              id: 'selQhDEVTMdrHhR3i',
              name: 'HB1AC measurement',
            },
            {
              id: 'selE7B1VHz6EUeMsp',
              name: 'Height measurement',
            },
            {
              id: 'selYdXM4CD6Ql8N9Q',
              name: 'Lipid panel measurement',
            },
            {
              id: 'selgPMNcgXECRXZ6v',
              name: 'Medication delivery',
            },
            {
              id: 'selrmnWwFU26epamL',
              name: 'Medication pick up',
            },
            {
              id: 'selFaUAOV37ZmqbTU',
              name: 'Mobile app installation & guidance',
            },
            {
              id: 'selXS5bC2kpqZiuPV',
              name: 'Other',
            },
            {
              id: 'sel5PoG6Yq97HDdGW',
              name: 'Oxygen saturation measurement',
            },
            {
              id: 'selUR4DXai5hN2PvM',
              name: 'Random Blood sugar measurement',
            },
            {
              id: 'selaPgYmsQ5VgsCIH',
              name: 'Temperature measurement',
            },
            {
              id: 'selJ0KvfbdJ3ne0i3',
              name: 'Weight measurement',
            },
          ],
        },
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'When the task is not linked to a member, you can add a beneficiary, who is the person that will received or delivered the item associated to the task.',
        conditionType: '',
      },
      {
        id: 'flduRFp9SDwo9Kr0j',
        name: 'BP Device #days',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: 'fldX1idlF8QkShQIK',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tbl3iBWzYVWEpdLje',
        required: false,
        helper:
          'Please add all the prescriptions records that will be delivered',
        conditionType: '',
        parentKey: 'Type',
        parentValues: ['Medication delivery'],
        condition: (values: any) => {
          if (Array.isArray(values.Type)) {
            return ['Medication delivery'].some((r) => values.Type.includes(r))
          }
          return ['Medication delivery'].includes(values.Type)
        },
      },
      {
        id: 'fldKa7QgVWngb1n3K',
        name: 'Location',
        type: 'text',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selZIL0cK8vBtrLWs',
              name: 'To do',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Tasks will be done as soon as possible, please enter the latest possible date at which you want the task to be performed.',
      },
      {
        id: 'fldFiJvTaVC3jK7tT',
        name: 'Priority',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selcfauaXBTDSexQX',
              name: 'Critical',
            },
            {
              id: 'sel67oKTdo6Agh3Cg',
              name: 'Normal',
            },
            {
              id: 'selpAoXvy86KHhey6',
              name: 'Urgent',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
    name: 'Interventions',
    id: 'tblTmMtBgwT76JrQN',
    fields: [
      {
        id: 'fldCgT1FPO8iK1SLi',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: 'fldM3NKbxpX4mj6Wf',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblMKwFctRYwBYHgt',
        required: false,
        helper: '',
      },
      {
        id: 'fldaNcgPoBcmBH07w',
        name: 'Intervention',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'seleegrn5HNUj2WBb',
              name: 'Activity Plan',
            },
            {
              id: 'selDxiXWU1Uqo7riE',
              name: 'Asthma Action Plan',
            },
            {
              id: 'sel2VdkuJP2xq5IOG',
              name: 'Asthma Trigger Management',
            },
            {
              id: 'selZEQhNofsVE4rQx',
              name: 'Caloric Reduction Plan',
            },
            {
              id: 'selh15zD7DT3sBr0y',
              name: 'Cholesterol Reduction',
            },
            {
              id: 'selvwv8Eag3OMMtVc',
              name: 'Diabetic Diet Plan',
            },
            {
              id: 'selvf7eHrtz77MQwd',
              name: 'Dietary Guidance',
            },
            {
              id: 'selk4OEigplt4PFwr',
              name: 'Fitness Plan',
            },
            {
              id: 'selR2bpinoa6dhe6c',
              name: 'Harm Reduction',
            },
            {
              id: 'selfaCwpMFzW2jOd4',
              name: 'Hemorrhoid Management Plan',
            },
            {
              id: 'sel8LgZG0uXZUyZiH',
              name: 'Medication Reduction',
            },
            {
              id: 'selcG56TDunycQuvH',
              name: 'Medications',
            },
            {
              id: 'seldl3pHnwjci8mjj',
              name: 'Monitoring Plan',
            },
            {
              id: 'seltwTxN6NEpvae2b',
              name: 'Muscle Strengthening Plan',
            },
            {
              id: 'seltafcW2WhHlMnsd',
              name: 'None',
            },
            {
              id: 'selhQK1Y5vHhl8NTT',
              name: 'Other',
            },
            {
              id: 'seleijLdmeVO0swXP',
              name: 'Pain reduction',
            },
            {
              id: 'selWl8lJ8eqtn2f3Z',
              name: 'Physiotherapy',
            },
            {
              id: 'selh2LZHFn4yijhl3',
              name: 'Potassium Rich Diet Plan',
            },
            {
              id: 'sel299IsEBDkmLtvu',
              name: 'Salt Reduction Plan',
            },
            {
              id: 'sel5uvw3T94hO5Mo6',
              name: 'Smoking Cessation',
            },
            {
              id: 'sel7E4zIYK2r9m5aa',
              name: 'Weight Gain Plan',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selNbYSazOsqWvYHS',
              name: 'Active',
            },
            {
              id: 'sellAoxYpd9fVy93B',
              name: 'Inactive',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selKg0NcKAUlnLVyo',
              name: 'In Progress',
            },
            {
              id: 'selTYkbGz2wW8itrE',
              name: 'In progress',
            },
            {
              id: 'selXuaErh5s5ji938',
              name: 'Opted out',
            },
            {
              id: 'selDGPs2ngPSH4fOe',
              name: 'Paused',
            },
            {
              id: 'selSp08M8zlP6Zx5F',
              name: 'Stopped',
            },
            {
              id: 'selkDfbU4PjIROkCE',
              name: 'Successful',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'The date the intervention gets back to effect',
        conditionType: '',
        parentKey: 'Status Cause',
        parentValues: ['Paused'],
        condition: (values: any) => {
          if (Array.isArray(values['Status Cause'])) {
            return ['Paused'].some((r) => values['Status Cause'].includes(r))
          }
          return ['Paused'].includes(values['Status Cause'])
        },
      },
      {
        id: 'fldMPzXAtbjKrLGB6',
        name: 'Started At',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldDOdcPCIRv2deLh',
        name: 'Starting activity - description',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selXsMgFGx7loZSDd',
              name: '0: 0 MET-minutes/week',
            },
            {
              id: 'sel6V449umivjjeWF',
              name: '1: < 500 MET-minutes/week',
            },
            {
              id: 'selq0fQkYeJ9H1koh',
              name: '2: 500 - 1499 MET-minutes/week',
            },
            {
              id: 'selFtBjqtKfWgmS9h',
              name: '3: 1500 - 2900 MET-minutes/week',
            },
            {
              id: 'sel9VmgErVv4pd0O9',
              name: '4: >= 3000 MET-minutes/week',
            },
            {
              id: 'selocdz5L2KcZT9tq',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel6V449umivjjeWF',
              name: '1: score of 24 - 25',
            },
            {
              id: 'sel4smhHTpsz0ht0V',
              name: '1: score of 25 - 27',
            },
            {
              id: 'selq0fQkYeJ9H1koh',
              name: '2: score of 21 - 23',
            },
            {
              id: 'selkn6iUbQJ8pQqnp',
              name: '2: score of 21 - 24',
            },
            {
              id: 'selJApzBJ1gvuMH6c',
              name: '3: score of 13 - 20',
            },
            {
              id: 'selFtBjqtKfWgmS9h',
              name: '3: score of 16 - 20',
            },
            {
              id: 'sel92ZXuM5OXBIWp6',
              name: '4: score < 12',
            },
            {
              id: 'sel9VmgErVv4pd0O9',
              name: '4: score < 15',
            },
            {
              id: 'selocdz5L2KcZT9tq',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selTNsZPwOwXOPjkE',
              name: '0: < 1500mg (recommended for hypertensives)',
            },
            {
              id: 'selx3OXBvhe2qQOa4',
              name: '1: 1500mg - 2500mg (normal)',
            },
            {
              id: 'selGRqggsHCzSowbP',
              name: '2: 2501mg - 3500mg (high)',
            },
            {
              id: 'sel2Qpld3K4V1EAzh',
              name: '3: 3501mg - 4500mg (very high)',
            },
            {
              id: 'selOihQtasLz6Yfm0',
              name: '4: > 4500mg (excessively high)',
            },
            {
              id: 'selpjeHDrKAjReAbl',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selS2vBDScnkxDkct',
              name: '1: BMI 25 - 30',
            },
            {
              id: 'selOuIlUyqrrg3ojF',
              name: '2: BMI 31 - 40',
            },
            {
              id: 'selQXORIc9yztREhW',
              name: '3: BMI > 40',
            },
            {
              id: 'selM7cFX5zbUQ96K7',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selC0BctsGH2UqPfY',
              name: '0: 80 - 180 (at risk)',
            },
            {
              id: 'selfbBcnRKtANQp8y',
              name: '1: < 80 (newly Dx)',
            },
            {
              id: 'selW2aaLkyF4ozBuo',
              name: '2: < 100 (1st line meds)',
            },
            {
              id: 'selmHg021abwyH2Cj',
              name: '3: < 180 (2nd line meds)',
            },
            {
              id: 'selyh2k2bYlBDe4LA',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selFQQQVtB94bAjnU',
              name: '0: < 200mg (recommended for those with heart disease)',
            },
            {
              id: 'selizT1eyjuX2S5FS',
              name: '1: 200mg - 300mg (normal)',
            },
            {
              id: 'seli1YmhqMlUeLTda',
              name: '2: 301mg - 500mg (high)',
            },
            {
              id: 'selgpXfbko9O0l79m',
              name: '3: > 500mg (very high)',
            },
            {
              id: 'selww6bZFU4d5bMVq',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seleYRgGU2Pmd7m8r',
              name: '0: > 3500mg (recommended)',
            },
            {
              id: 'selLvgE5PGlA7nmIL',
              name: '1: 2500mg - 3500mg (normal)',
            },
            {
              id: 'selTOhhpLcmhljok7',
              name: '2: 1500mg - 2499mg (low)',
            },
            {
              id: 'selwmHxCI32d46q4x',
              name: '3: < 1500mg (inadequate)',
            },
            {
              id: 'selJTqecR7AFn7mIr',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selaKhFdViY8mIfGD',
              name: '0: 0 MET-minutes/week',
            },
            {
              id: 'selp9m6GXHVdyN33G',
              name: '1: < 500 MET-minutes/week',
            },
            {
              id: 'selQZ417lvf2ASZG4',
              name: '2: 500 - 1499 MET-minutes/week',
            },
            {
              id: 'selYUalEE01YqPDO1',
              name: '3: 1500 - 2900 MET-minutes/week',
            },
            {
              id: 'selgCojHBogO9xev7',
              name: '4: >= 3000 MET-minutes/week',
            },
            {
              id: 'selPbYKQv8mlsa9AO',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selmUHPGYZ7o7w8PR',
              name: '1: score of 24 - 25',
            },
            {
              id: 'sel2JxD2odBQdkWRR',
              name: '1: score of 25 - 27',
            },
            {
              id: 'sel5xTkpyk5GzJaSG',
              name: '2',
            },
            {
              id: 'selo8Xb4jt19AdKsB',
              name: '2: score of 21 - 23',
            },
            {
              id: 'selZfec0WqQp9Wgyw',
              name: '2: score of 21 - 24',
            },
            {
              id: 'sel7MNZslohPlrnzY',
              name: '3',
            },
            {
              id: 'sel8vidrnMIJHOzlL',
              name: '3: score of 13 - 20',
            },
            {
              id: 'sel16i3ajEThgmK2V',
              name: '3: score of 16 - 20',
            },
            {
              id: 'selgdvOur0bFA8GC3',
              name: '4',
            },
            {
              id: 'selR2U5DHiHEiTo5r',
              name: '4: score < 12',
            },
            {
              id: 'selGzfEMqB2t5c1hU',
              name: '4: score < 15',
            },
            {
              id: 'selbi9PMhclhHU5ui',
              name: 'Level 1: score between 24 - 27',
            },
            {
              id: 'selPbYKQv8mlsa9AO',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selku5EgpIKntQLYQ',
              name: '0: > 3500mg (recommended)',
            },
            {
              id: 'selcDzrqREjbFbGfK',
              name: '1: 2500mg - 3500mg (normal)',
            },
            {
              id: 'selk0H7Gw1PDMAhAm',
              name: '2: 1500mg - 2499mg (low)',
            },
            {
              id: 'selqdUhLYDneU5s1b',
              name: '3: < 1500mg (inadequate)',
            },
            {
              id: 'selSLlQWq1Lo8aF6t',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seldesDGgsrC94CQx',
              name: '1% reduction',
            },
            {
              id: 'sel85vzjU9YODNHPO',
              name: '10% reduction',
            },
            {
              id: 'sel2oH1LdThv3aqjv',
              name: '2% reduction',
            },
            {
              id: 'sel9BXoRUaH3EwPWw',
              name: '3% reduction',
            },
            {
              id: 'selIz0YlcYuOV48Lx',
              name: '5% reduction',
            },
            {
              id: 'selLKwxLP6vvRSSc7',
              name: '7% reduction',
            },
            {
              id: 'sel8z1T8jM0rda52C',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selQP4kwOmRiLWyOU',
              name: '0: < 1500mg (recommended for hypertensives)',
            },
            {
              id: 'seluMod21YD7kdH3b',
              name: '0: < 1500mg (recommended for hypertensives) ',
            },
            {
              id: 'sellM2Yourofjhm6C',
              name: '1: 1500mg - 2500mg (normal)',
            },
            {
              id: 'selpyOu29EldqLfd6',
              name: '1: 1500mg - 2500mg (normal) ',
            },
            {
              id: 'seluOzmXdSceN7kEC',
              name: '2: 2501mg - 3500mg (high)',
            },
            {
              id: 'selXcBOIQxif17ysQ',
              name: '2: 2501mg - 3500mg (high) ',
            },
            {
              id: 'selmfOe1lcJqZ11J3',
              name: '3: 3501mg - 4500mg (very high) ',
            },
            {
              id: 'selrfBTPPV2tLLlMl',
              name: '4: > 4500mg (excessively high)',
            },
            {
              id: 'selVkIkcve5U3vowD',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selOuYqeTgNBgiIqk',
              name: '0: 80 - 180 (at risk)',
            },
            {
              id: 'selKKJj7w9FL83I7y',
              name: '0: 80 - 180 (at risk) ',
            },
            {
              id: 'selPJxt4aed1gbx2k',
              name: '1: < 80 (newly Dx)',
            },
            {
              id: 'selIg9BEx0XKn8Nuy',
              name: '1: < 80 (newly dx)',
            },
            {
              id: 'sel9KYR95027WvhKw',
              name: '2: < 100 (1st line meds)',
            },
            {
              id: 'seluPs0SOV0SuaBDT',
              name: '2: < 100 (1st line meds) ',
            },
            {
              id: 'selqvg0AyNEcoIou8',
              name: '3: < 180 (2nd line meds)',
            },
            {
              id: 'selxGreSNGZxzNHxs',
              name: 'N/A',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seluiBYlD2WEl1ZGy',
              name: '0: < 200mg (recommended for those with heart disease)',
            },
            {
              id: 'sel3ejUABBBWuIQ5m',
              name: '1: 200mg - 300mg (normal)',
            },
            {
              id: 'selM11dAO5L4cQoG4',
              name: '2: 301mg - 500mg (high)',
            },
            {
              id: 'selu07tkfbEIVOttb',
              name: '2: 301mg - 500mg (high) ',
            },
            {
              id: 'seljuLQeQNR3wUL9X',
              name: '3: > 500mg (very high)',
            },
            {
              id: 'selekOmgjy0XzerlM',
              name: 'N/A',
            },
          ],
        },
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
        options: null,
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
    fields: [
      {
        id: 'fldNk3FbUqzGHSR0T',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
        symmetricColumnId: 'fld438GVtObQK0PVH',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblidCJtioaFSYwvk',
        required: false,
        helper: '',
      },
      {
        id: 'fldNxiqs8cugeOGG3',
        name: 'Date',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selGlbqQZGuCoFV4g',
              name: 'John Muma',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel3DBtVMV75BrIeb',
              name: 'External / partner',
            },
            {
              id: 'selg5P8Ftd5H8dQmE',
              name: 'Health Navigator',
            },
            {
              id: 'sel3EpQ6Iz7ndgdfP',
              name: 'Other',
            },
            {
              id: 'selFRMrUMiKdb5a5d',
              name: 'Virtual Doctor',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selZlN9AdFi3fvVRq',
              name: 'In-person',
            },
            {
              id: 'sel0K9VuhmfxnxBP8',
              name: 'Virtual',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seln0qldQxiIjipw9',
              name: 'Follow-up',
            },
            {
              id: 'selun0iq9Tg0FUbkY',
              name: 'Initial',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'seltKY9Sdos3CrE8y',
              name: 'No',
            },
            {
              id: 'selBJeIE3pJjj4L1D',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selV7zO5TfbXLOYBE',
              name: 'No',
            },
            {
              id: 'selJaUq64JrFgAXzt',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel8U0n1y1wmGtRxH',
              name: '0',
            },
            {
              id: 'selAXdjD3SrhRcXeN',
              name: '1',
            },
            {
              id: 'sel3HfKV2r8qyh6k3',
              name: '10',
            },
            {
              id: 'selhi3VMd3qvtCYIY',
              name: '2',
            },
            {
              id: 'selKd4uxnchCVDCWX',
              name: '3',
            },
            {
              id: 'sel0yh8HHEVXxduCW',
              name: '4',
            },
            {
              id: 'selPt1YOkrwzExmoo',
              name: '5',
            },
            {
              id: 'selhewKWj1I4j1Sdh',
              name: '6',
            },
            {
              id: 'selTPBKlOKG9rpuLo',
              name: '7',
            },
            {
              id: 'selCzqrZAzDXC3ycv',
              name: '8',
            },
            {
              id: 'selWKE7wGx3NlD4vZ',
              name: '9',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selj6NMoGlybZuUFA',
              name: 'Ankle',
            },
            {
              id: 'sela5uhm121cGry7b',
              name: 'Elbow',
            },
            {
              id: 'selJJDDCJCiPvIyFb',
              name: 'Hip',
            },
            {
              id: 'selk4M8Gl4Q5ptVHh',
              name: 'Knee',
            },
            {
              id: 'selgQvsoBKO2vqoFS',
              name: 'Lumbar',
            },
            {
              id: 'sele8VfjubeUnnYg4',
              name: 'Neck',
            },
            {
              id: 'sel2dqsXm6DbLYmLp',
              name: 'Sacral',
            },
            {
              id: 'selbPAvQKYqXZOqai',
              name: 'Shoulder',
            },
            {
              id: 'sel5aDQdTpb9lQ4ZU',
              name: 'Thoracic',
            },
            {
              id: 'seluwlJRb2mHscnZT',
              name: 'Wrist',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selyUT7RWjUbT4uNk',
              name: 'Cervical Traction',
            },
            {
              id: 'selpNZ9I2L5jUGxyy',
              name: 'Cold Compression',
            },
            {
              id: 'seluDLhx6JR4KmP8Z',
              name: 'Cryotherapy',
            },
            {
              id: 'selzlYfQiaUOOjnG4',
              name: 'Hot Pack Therapy',
            },
            {
              id: 'selLo3J2GIGvpg81P',
              name: 'Joint Mobilization',
            },
            {
              id: 'sellWCQnrQqkYsYB4',
              name: 'Lumbar Traction',
            },
            {
              id: 'selrr6A6AzQGJYA5X',
              name: 'Other',
            },
            {
              id: 'selM6ELKnWdZpNDc4',
              name: 'Soft Tissue Manipulation (massage)',
            },
            {
              id: 'selhOILnTVUVj0BF2',
              name: 'Static Exercises',
            },
            {
              id: 'selV800FpZ0aseiL8',
              name: 'Stretching',
            },
            {
              id: 'selY3bcbGugVrreIN',
              name: 'TENS (Transcutaneous Electrical Nerve Stimulator)',
            },
            {
              id: 'selFoMJVZEmZtYUdR',
              name: 'Ultrasound Therapy',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selO8F7neG85Be9Tb',
              name: 'Continue with current management',
            },
            {
              id: 'selmGshvDTX2PCzFk',
              name: 'Other',
            },
            {
              id: 'selsRoOy0U4KelwbE',
              name: 'Patient education',
            },
            {
              id: 'selYDk5Yru1u8NehR',
              name: 'Prescribe Medication',
            },
            {
              id: 'sel1JO7YunhSD5HDm',
              name: 'Refer to a VC',
            },
            {
              id: 'selPLgxhHjjMigppM',
              name: 'Refer to a specialist',
            },
            {
              id: 'sel7fBtjFxd4SCetm',
              name: 'Schedule a Follow-up appointment',
            },
          ],
        },
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter the date of the next appointment. If you want to book the appointment now, please use the button in scribe dashboard',
      },
      {
        id: 'fldZhpOo75n9kc8oY',
        name: 'Notes',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please enter any additional comments or observation you think are important\n\nYou need to create a HN task? <a href="https://airtable.com/shrSPv5zEGvh1nm22" target="_blank">https://airtable.com/shrSPv5zEGvh1nm22</a>\n\nYou need to create a condition? \n<a href="https://airtable.com/shreJWFrTNVXs6RKW" target="_blank">https://airtable.com/shreJWFrTNVXs6RKW</a>',
      },
    ],
  },
  {
    name: 'Mental Health Consultation',
    id: 'tblQb2OzaAh2weE2Q',
    fields: [
      {
        id: 'fldyXLrbRtzpI1Tub',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selUtmuUPHRPSoGF5',
              name: 'Grace Waihuini',
            },
            {
              id: 'selcRPQyPvvg8SjDV',
              name: 'Margaret Njihia',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fldS7KUfbvkGO1R4a',
        name: 'Referral source',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'seldaqyRWRwC5A3aI',
              name: 'External / Partner',
            },
            {
              id: 'sel3QjoXfR0tDBQZN',
              name: 'Health Navigator',
            },
            {
              id: 'selvUYqhtwigrsG7C',
              name: 'Other',
            },
            {
              id: 'seludpPLRdUlqMXJT',
              name: 'Virtual Doctor',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seliHXbxH7BgPFIHQ',
              name: 'Home visit',
            },
            {
              id: 'selmMTkFarRdfT7KR',
              name: 'Hospital visit',
            },
            {
              id: 'selVljb5FnL5v2H8P',
              name: 'In-person',
            },
            {
              id: 'selY7ZSmk4szJkdtq',
              name: 'Virtual',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selYgdUXZApCODNDa',
              name: 'Couple',
            },
            {
              id: 'selNr8ITtFymXKezp',
              name: 'Family',
            },
            {
              id: 'sel46k2aTPcDG1sXa',
              name: 'Group',
            },
            {
              id: 'sel5Fa8xHhr0gmzXX',
              name: 'Member',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selvqKmQPXvjx1oaP',
              name: 'Crisis / Emergency',
            },
            {
              id: 'selcMDWVNTZJFm2Ml',
              name: 'Follow up',
            },
            {
              id: 'sel0jyqC6CGJXl0rH',
              name: 'Initial consultation',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
      },
      {
        id: 'fld7set1RG94aWg2x',
        name: '#follow up',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: '',
        conditionType: '',
        parentKey: 'Consultation type',
        parentValues: ['Follow up'],
        condition: (values: any) => {
          if (Array.isArray(values['Consultation type'])) {
            return ['Follow up'].some((r) =>
              values['Consultation type'].includes(r)
            )
          }
          return ['Follow up'].includes(values['Consultation type'])
        },
      },
      {
        id: 'fldhsMxOF6jOwSSAV',
        name: 'Psychiatric history',
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selim7Pjy0g8U0NF7',
              name: 'No',
            },
            {
              id: 'selMYG2BGn0FdFMKh',
              name: 'Yes',
            },
          ],
        },
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
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel9TttHsmZqFIGRZ',
              name: 'Interview / Mental health examination',
            },
            {
              id: 'selQNX3KzcSKG31Db',
              name: 'Test / Screen',
            },
          ],
        },
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
        type: 'text',
        format: '',
        isDateTime: false,
        options: null,
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
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selP4jFdW1IrcDIyn',
              name: 'Drug detox & rehabilitation',
            },
            {
              id: 'seloJ3UYygQTMuHG6',
              name: 'Pharmacology',
            },
            {
              id: 'selePe52bsrtnWCXt',
              name: 'Psychotherapy',
            },
            {
              id: 'sel2yrNrSbyzmKOHH',
              name: 'Referral',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: 'fldw0qdFv2DtYbvX1',
        unreversed: true,
        relationship: 'many',
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
        options: null,
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
        type: 'multilineText',
        format: '',
        isDateTime: false,
        options: null,
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
    name: 'Kits',
    id: 'tbl6PAXT80XyT7mAN',
    fields: [
      {
        id: 'fldw9UPlRjp4mJ5XQ',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel7GP4J8wrQyCS39',
              name: 'Blood Pressure Monitoring',
            },
            {
              id: 'sel7Wle7t1gevkUGg',
              name: 'Blood Sugar Monitoring',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selqRITLK5WnBU4Qg',
              name: 'Bene has their own kit',
            },
            {
              id: 'selZMCgPxQ1Iyb5iy',
              name: 'Kit collected ',
            },
            {
              id: 'selvknag6jQK0i3Uc',
              name: 'Kit with patient',
            },
            {
              id: 'selxIkpMD5s1IeIIy',
              name: 'Needs kit',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
    fields: [
      {
        id: 'fldoOlTXfHynyqhfe',
        name: 'Case ID',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selUJpX1WU0S9qzHp',
              name: 'no',
            },
            {
              id: 'selFebBiPtxPBoJ2S',
              name: 'yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selSUbCoPW4z0xUXd',
              name: 'In-person',
            },
            {
              id: 'selXn1jXaDuGkscgU',
              name: 'Virtual',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel71GVHZJa8gKF7a',
              name: 'Follow Up',
            },
            {
              id: 'sel2vW8V4ZvVGKNmc',
              name: 'Initial',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selfQRpkUzxFUh1l2',
              name: 'Antara Health',
            },
            {
              id: 'selr1Yf7fAOMMF871',
              name: 'GA insurance',
            },
            {
              id: 'selQY6RtYCFbONPQ7',
              name: 'Jubilee',
            },
            {
              id: 'selCON3iaVHR1oOm2',
              name: 'NHIF',
            },
            {
              id: 'selcCjetTmsSlfihv',
              name: 'Other',
            },
            {
              id: 'selISGqKPQr4wrSjT',
              name: 'Penda',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
      },
      {
        id: 'fld7papvjJHJd4IIH',
        name: 'Date of appointment',
        type: 'date',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selzEnwkQ2QWs2zLn',
              name: 'Routine',
            },
            {
              id: 'selxEqUvdW919AqwB',
              name: 'Urgent',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selKxUWUXyCG5opJG',
              name: 'Missed vaccination',
            },
            {
              id: 'selnsFh3kdilnzaBX',
              name: 'Opted out',
            },
            {
              id: 'selqRu5wfnhdkQQ3t',
              name: 'Vaccination up to date',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selGHLbRUgnsvuxSK',
              name: 'No',
            },
            {
              id: 'sel0wXXgK7lEBnuds',
              name: 'Unknown',
            },
            {
              id: 'selvkAj0JmNzmHJ7q',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selvVQnUj5EfTxngI',
              name: 'Cardiovascular',
            },
            {
              id: 'selGT4OhGA0fANpft',
              name: 'Dermatologic',
            },
            {
              id: 'selDc8injuUlTOtL3',
              name: 'Extremities',
            },
            {
              id: 'selw6JMFGcSuyDG3a',
              name: 'GU',
            },
            {
              id: 'seljiiUElZ76Jj4VY',
              name: 'Gastrointestinal',
            },
            {
              id: 'seleAooBCpwII6pqg',
              name: 'HEENT',
            },
            {
              id: 'selrW8TB2AeUKBaBK',
              name: 'Neck',
            },
            {
              id: 'selp88n6x1jCTKF48',
              name: 'Neurologic',
            },
            {
              id: 'selhfDsXiUJLvEmmR',
              name: 'Other',
            },
            {
              id: 'sel8RPA85jmQYIQ3B',
              name: 'Pulmonary',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selSkj39IjxCMp5wN',
              name: 'No',
            },
            {
              id: 'selj2ankGu29GHRiX',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selj2ankGu29GHRiX',
              name: 'In-person',
            },
            {
              id: 'selMtqPpBZDP0KqMP',
              name: 'Virtual',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seljfRsPTLcZ1lQKm',
              name: 'Cardiovascular',
            },
            {
              id: 'sellAc1sSLRoNVXCf',
              name: 'Dermatologic',
            },
            {
              id: 'selQV8gDJI7dNfdGh',
              name: 'Extremities',
            },
            {
              id: 'selKee2CuygctFKTE',
              name: 'GU',
            },
            {
              id: 'selSGpuekAt57j6xa',
              name: 'Gastrointestinal',
            },
            {
              id: 'selFhK9SpNgoT2SeH',
              name: 'HEENT',
            },
            {
              id: 'selHEOBNGmT7wObZf',
              name: 'Neuro',
            },
            {
              id: 'selsF6cPBKIaLsjR5',
              name: 'Other',
            },
            {
              id: 'selIN1Zx25qXxWnYH',
              name: 'Pulmonary',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'If you identify a new condition: <a href="https://airtable.com/shrduoUdDObJnDFTj" target="_blank">https://airtable.com/shrduoUdDObJnDFTj</a>',
      },
      {
        id: 'fldQ4GtalrF5Kumkb',
        name: 'Secondary Diagnosis',
        type: 'richText',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selkzunG5MyxWQS1A',
              name: 'Acute management',
            },
            {
              id: 'selokbzzqXnPVWmJD',
              name: 'Routine management of chronic condition',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selO7DsIJVaEeajep',
              name: 'Continue with current management',
            },
            {
              id: 'selyoNH8lj9vtLY5R',
              name: 'Emergency Protocol',
            },
            {
              id: 'selQcbZ99lsKrMv2s',
              name: 'Mental Health Counseling',
            },
            {
              id: 'selFDFzQwEHVKtdkg',
              name: 'Nutrition Consult',
            },
            {
              id: 'seliKirGFwS81PGxe',
              name: 'Observation',
            },
            {
              id: 'selfqT8Bpm78QPox2',
              name: 'Order Labs',
            },
            {
              id: 'selVGwkwurhCo8MTY',
              name: 'Order Radiologic Examinations',
            },
            {
              id: 'selpDJNHtTxkt9rEo',
              name: 'Other',
            },
            {
              id: 'selBaAW22PNE0a7c9',
              name: 'Patient Education',
            },
            {
              id: 'selKNflBk4KRcF7wS',
              name: 'Physiotherapy',
            },
            {
              id: 'selKUkXWVxpoWZYoj',
              name: 'Prescribe Medications',
            },
            {
              id: 'selrVoEHgJyRNIC5i',
              name: 'Refer for in-person Consultation',
            },
            {
              id: 'sel2AK5fkbVgPTTmY',
              name: 'Refer to a Specialist',
            },
            {
              id: 'sel5BSEKnT46ELguc',
              name: 'Schedule a follow-up appointment',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        id: 'fldkAHqczThmfdTfd',
        name: 'Sick days required',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selhcBBvrWBQTHBiq',
              name: 'No',
            },
            {
              id: 'sel0iHGKJFpgAR1ao',
              name: 'Yes',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: 'The member needs sick days?',
      },
      {
        id: 'fld5HbaoscMB9VcTe',
        name: 'Providers',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: 'fld6GPotzji1emgiL',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
        required: true,
        helper: 'Can be for referral, labs, imaging...',
        conditionType: '',
        parentKey: 'Plan',
        parentValues: [
          'Refer for in-person Consultation',
          'Refer to a Specialist',
          'Order Radiologic Examinations',
          'Order Labs',
        ],
        condition: (values: any) => {
          if (Array.isArray(values.Plan)) {
            return [
              'Refer for in-person Consultation',
              'Refer to a Specialist',
              'Order Radiologic Examinations',
              'Order Labs',
            ].some((r) => values.Plan.includes(r))
          }
          return [
            'Refer for in-person Consultation',
            'Refer to a Specialist',
            'Order Radiologic Examinations',
            'Order Labs',
          ].includes(values.Plan)
        },
      },
      {
        id: 'fldUY3O7pjQpY5kE6',
        name: 'What lab tests would you like to order?',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'seln8z5Sl1oFyQ8Cv',
              name: '(Total & Direct)',
            },
            {
              id: 'selsLTeIxppqXUdo8',
              name: '10- Panel Urine Toxicology (Drug Screening for Amphetamines',
            },
            {
              id: 'selcseWC8uPL2G2Jm',
              name: '5 - Panel Urine Toxicology Drug Screening for Amphetamines',
            },
            {
              id: 'selNJoG22dN2GfhjL',
              name: 'ABO Group/Rh factor',
            },
            {
              id: 'selFSUPeJIhJ5Su7C',
              name: 'ALP)',
            },
            {
              id: 'selMJtqpkBZQrZQDZ',
              name: 'APTT',
            },
            {
              id: 'seloXYqjXNdQ8Bshd',
              name: 'ASOT',
            },
            {
              id: 'selFSX9xPZwG7s3Bj',
              name: 'Acid fast Bacilli stain (ZN)',
            },
            {
              id: 'selQ4VcMLtI1IHvNP',
              name: 'Albumin',
            },
            {
              id: 'selHkz0ErZeoRF5Qv',
              name: 'Alkaline phosphatase (Total & Prostatic)',
            },
            {
              id: 'selEMQZa234RGKAAe',
              name: 'Amylase',
            },
            {
              id: 'sel9PXevjZ1dTitIK',
              name: 'Antinuclear antibody (ANA) screen',
            },
            {
              id: 'selXmjv8vX8Eu8mlK',
              name: 'Aspirate - Cell Count',
            },
            {
              id: 'seljdKwrJ5Fvq7TMA',
              name: 'Babiturates',
            },
            {
              id: 'sel4U9o1UrDVUpjy2',
              name: 'Bence Jones Proteins - Urine',
            },
            {
              id: 'sel9wXCSSGFwH7dFt',
              name: 'Benzodiazepine',
            },
            {
              id: 'selH9CghUThpFkvD1',
              name: 'Bilirubin',
            },
            {
              id: 'sele35noXJDtgXXND',
              name: 'Bleeding time',
            },
            {
              id: 'selVGm3tqqKzEGjuF',
              name: 'Blood culture',
            },
            {
              id: 'selCq35pagS6WSJT5',
              name: 'Brucella test',
            },
            {
              id: 'selZmPaUuwh9erqzt',
              name: 'C reactive protein',
            },
            {
              id: 'selzy0rDIZAUaHVXQ',
              name: 'CA 125',
            },
            {
              id: 'selJLhV7bVZZUiHot',
              name: 'CA 19-9',
            },
            {
              id: 'selRscCtscbGc1MDO',
              name: 'CEA',
            },
            {
              id: 'selt31QinrS06oiUr',
              name: 'CK',
            },
            {
              id: 'selewExLK5V40yai9',
              name: 'CKMB',
            },
            {
              id: 'sel47ND3bars0sOve',
              name: 'CPK',
            },
            {
              id: 'selJyEJuvFS66FF3A',
              name: 'CRAG',
            },
            {
              id: 'seli1Z0cCqrjFXl6f',
              name: 'CSF/Pleural/Pericardial/Peritoneal Including Culture',
            },
            {
              id: 'seltJhX37sK8N15ux',
              name: 'CSF/Pleural/Pericardial/Peritoneal Routine',
            },
            {
              id: 'selt8zAvhbBN8T8rJ',
              name: 'Calcium',
            },
            {
              id: 'sel2a9XstQZPqlxmp',
              name: 'Cannabinoids',
            },
            {
              id: 'selCXBmc7DWLIBu0V',
              name: 'Cardiac Enzymes (CKMB',
            },
            {
              id: 'selEkCmAeaEOBeI6b',
              name: 'Chloride',
            },
            {
              id: 'selyvqZuZiFq8vJ0d',
              name: 'Cholesterol',
            },
            {
              id: 'selKZth8nWaNxVwsB',
              name: 'Clotting time',
            },
            {
              id: 'selK2T9se1x3OiBBE',
              name: 'Coagulation screen (as below)',
            },
            {
              id: 'sel5JFtfuQArtTJ5y',
              name: 'Cocaine',
            },
            {
              id: 'selcvD4ce1LR5aSR0',
              name: 'Coombs direct',
            },
            {
              id: 'selVUZ8Mk0wZdxQnD',
              name: 'Coombs indirect',
            },
            {
              id: 'seldr8V1C7El5dhMk',
              name: 'Creatinine',
            },
            {
              id: 'selPlJqbHioB0z7xP',
              name: 'Creatinine Clearance',
            },
            {
              id: 'selgbTBRU9LtVld3N',
              name: 'Culture & sensitivity (All specimens excluding blood)',
            },
            {
              id: 'sel1tFil0duhY3KHc',
              name: 'D-Dimers',
            },
            {
              id: 'selzlnz9xDHAWpC7A',
              name: 'Drug Screening',
            },
            {
              id: 'selSGIZIS1WK0IqI3',
              name: 'Electrolytes',
            },
            {
              id: 'selXx8JR6jGmYz0ee',
              name: 'Erthrocyte Sedimentation Rate (ESR)',
            },
            {
              id: 'selJwByu0RvGosEOQ',
              name: 'FT3',
            },
            {
              id: 'selDfRQwKEAmPIpeK',
              name: 'FT4',
            },
            {
              id: 'sel3azIeeOFdtdPvR',
              name: 'Full Haemogram',
            },
            {
              id: 'selp0KBkwKPwJN67v',
              name: 'GGT',
            },
            {
              id: 'selEtnZZ7DFrahMt9',
              name: 'Gamma glutamyt transerase (GGT)',
            },
            {
              id: 'sel2rja3T1vTvsUDL',
              name: 'Glucose',
            },
            {
              id: 'selxmu2R0bJ2XSB58',
              name: 'Glycosated HB (HBA1C)',
            },
            {
              id: 'selwSuyUOUVDzlp2D',
              name: 'Gram stain',
            },
            {
              id: 'selmTIgbS7pqpjLxb',
              name: 'H. Pylori Ab test',
            },
            {
              id: 'selGAVwL5lwHruxw0',
              name: 'H. Pylori Ag test',
            },
            {
              id: 'sel5uT40E67yGIDSu',
              name: 'HBsAG',
            },
            {
              id: 'sellU5dA5z22qfHUY',
              name: 'HDL',
            },
            {
              id: 'selsnrkfZFUSjQTUg',
              name: 'HIV screen',
            },
            {
              id: 'selmrpc3my1lj4APN',
              name: 'Haemoglobin PCV',
            },
            {
              id: 'selzm0Qvuq4e8Uljg',
              name: 'Hepatitis A',
            },
            {
              id: 'selqWMyQEQYWS0Rj6',
              name: 'Hepatitis C',
            },
            {
              id: 'sel6vSoCc8nzyxLGm',
              name: 'Histology (Major - Above 10cm Specimen)',
            },
            {
              id: 'selJkRNnmh4PKcqDh',
              name: 'Histology (Medium - 2-10cm Specimen)',
            },
            {
              id: 'sel9pK4dsUsjo58Or',
              name: 'Histology (Minor - 0-1 cm Specimen)',
            },
            {
              id: 'sel3uoWRlPrdxAdXU',
              name: 'India ink prep',
            },
            {
              id: 'selt1phM9kFcGjJSl',
              name: 'KOH skin prep',
            },
            {
              id: 'selBs7f1j0WBOULlY',
              name: 'Ketones',
            },
            {
              id: 'selxKitmXEwRv9KNE',
              name: 'LDH',
            },
            {
              id: 'selXpSi86bbJGY9JK',
              name: 'LDL',
            },
            {
              id: 'selHYZH2ZjRvic6tw',
              name: 'Lipase',
            },
            {
              id: 'selGeZ8eZhRt3Id3b',
              name: 'Lipid Profile (Total Cholesterol',
            },
            {
              id: 'selHCkHbJAhnDCP0P',
              name: 'Liver function tests LFTs (Bilirubin',
            },
            {
              id: 'sel0P9IYq5g6ED9ji',
              name: 'Magnesium',
            },
            {
              id: 'selK5LIqWJYUd89WH',
              name: 'Malaria test (Smear and Antigen)',
            },
            {
              id: 'selZFsHJd6EiiXuBs',
              name: 'Mantoux',
            },
            {
              id: 'seliqPPyUWC4mw41y',
              name: 'Methadone',
            },
            {
              id: 'selzziV1BVOpNtUnV',
              name: 'Methamphetamine',
            },
            {
              id: 'selUd2hrvVNKMdhN3',
              name: 'Opiate',
            },
            {
              id: 'selBXFnoaIQB1lbrS',
              name: 'Oral Glucose Tolerance Test (OGTT)',
            },
            {
              id: 'sel0do8Wn8QtLTVfH',
              name: 'Other',
            },
            {
              id: 'selQfFbrfY5OfbVEG',
              name: 'PTI (INR)',
            },
            {
              id: 'sele7Z3FmhqqvdpqH',
              name: 'Pap smear for cytology',
            },
            {
              id: 'selhduA6cPrL4VatQ',
              name: 'Peripheral Blood Film',
            },
            {
              id: 'selF8HA5ArBH8UqTs',
              name: 'Phosphorus',
            },
            {
              id: 'selnzYbx7f2PDZMzO',
              name: 'Platelet count',
            },
            {
              id: 'selNJqzjgJMWxIseV',
              name: 'Pleural/Ascitic tap',
            },
            {
              id: 'seliGY3cNP7YdCToh',
              name: 'Potassium',
            },
            {
              id: 'selWzoYFbupn18MYY',
              name: 'Pregnancy test',
            },
            {
              id: 'sel26F5J2SznsjC7w',
              name: 'Procalcitonine',
            },
            {
              id: 'selqhSnFRpWwbEJ9c',
              name: 'Prostate specific antigen screen',
            },
            {
              id: 'selaIjfeyZww3avQi',
              name: 'Protein (Total)',
            },
            {
              id: 'selnFJtIeXbU4eL6m',
              name: 'Reticulocyte count',
            },
            {
              id: 'sellEivyLly1jd0xR',
              name: 'Rheumatoid factor',
            },
            {
              id: 'sel0sQD5BVa2DlsLY',
              name: 'Rota / Adeno Virus',
            },
            {
              id: 'seljABkBdwvcV0luv',
              name: 'Routine urinalysis',
            },
            {
              id: 'sel1HrproZ1d6bgCG',
              name: 'SGOT',
            },
            {
              id: 'selWc1Cf4GavGONex',
              name: 'SGPT',
            },
            {
              id: 'seleuiAyJT3Wp7HCt',
              name: 'Salmonella antigen',
            },
            {
              id: 'selSrFI0xAAJdauzR',
              name: 'Semenalysis',
            },
            {
              id: 'selqWTMZbWaFl9CB1',
              name: 'Sickle cell prep',
            },
            {
              id: 'selwDpIKixUv44nGT',
              name: 'Sodium',
            },
            {
              id: 'selfO5NG0FjTYdQpW',
              name: 'Stool ova and cyst',
            },
            {
              id: 'selEBiprqZj8qUeLg',
              name: 'Stool-occult blood',
            },
            {
              id: 'sel5jkphjABw4R2yk',
              name: 'T4',
            },
            {
              id: 'selibRbMDlL16fxzh',
              name: 'TGL)',
            },
            {
              id: 'sel62zlFZXR6zmB3q',
              name: 'TROPONIN I)',
            },
            {
              id: 'selEGcwwwjVmgSGWR',
              name: 'TSH (each)',
            },
            {
              id: 'selcy6B9zJshz0uLn',
              name: 'TSH)',
            },
            {
              id: 'sel82aP5mqg3edKyG',
              name: 'Thyroid function tests (T3',
            },
            {
              id: 'selXPbvByG8G5oTrN',
              name: 'Troponin',
            },
            {
              id: 'selllUqtHXc9eHwHI',
              name: 'Type & Cross-match',
            },
            {
              id: 'seldHUrbQp799hAea',
              name: 'Urea',
            },
            {
              id: 'selviTT6n88Vmmh6l',
              name: 'Urea / Electrolytes',
            },
            {
              id: 'selysV0ghA6YKt8Ta',
              name: 'Urea/Electrolytes/Creatinine (U/E/C)',
            },
            {
              id: 'sel3Wpg2rqvrGM8pw',
              name: 'Uric acid',
            },
            {
              id: 'selB2JrxYZGycVIF4',
              name: 'Urinary Microalbumin',
            },
            {
              id: 'selBQ8hJrPXOxcWTx',
              name: 'VDRL/RPR',
            },
            {
              id: 'selgRxZZZie5zxM2o',
              name: 'VLDL',
            },
            {
              id: 'sel1rE3KLUjpoGGJt',
              name: 'WBC/differential',
            },
            {
              id: 'selahO1Mu8SoSSYIE',
              name: 'Wet prep',
            },
            {
              id: 'selouhbGE46uITPQf',
              name: 'inorganic',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel1G31EX3LlKNgNE',
              name: 'CT Scan',
            },
            {
              id: 'sel2DGHtJEC6WIS9z',
              name: 'Echocardiogram',
            },
            {
              id: 'selyl7AO74tI2nCt2',
              name: 'MRI',
            },
            {
              id: 'selQGCLT6BIOynSYn',
              name: 'Ultrasound',
            },
            {
              id: 'seljUNJN4cTOWQVzK',
              name: 'X-Ray',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seleElRKuIxgKOvPb',
              name: 'Abdominal',
            },
            {
              id: 'selgIMB4iF8krCG8Z',
              name: 'Chest',
            },
            {
              id: 'selagZluCSw65PHpC',
              name: 'Lower Extremity',
            },
            {
              id: 'selCwlZGYYBF9AlGw',
              name: 'Other:',
            },
            {
              id: 'selVXL9piWzID6r2a',
              name: 'Spinal',
            },
            {
              id: 'selyCsA4n1DbRmtCG',
              name: 'Upper Extremity',
            },
            {
              id: 'selb0TIxv0q3qQAsB',
              name: 'kull',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selGHH1e1GYOIDWCs',
              name: 'Abdominal',
            },
            {
              id: 'seleGGYGcf1ouGvti',
              name: 'Chest',
            },
            {
              id: 'selgiVShSwg22SZe8',
              name: 'GU',
            },
            {
              id: 'selFZmpY8dovn9g0m',
              name: 'Head',
            },
            {
              id: 'selTY8xdPRaJmdn2M',
              name: 'Joint',
            },
            {
              id: 'sel5cUUSIsG3qvmgM',
              name: 'Other:',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seliRDgJ6hysnreg7',
              name: 'Abdominal',
            },
            {
              id: 'selhSDdWX1taYL0wt',
              name: 'Back',
            },
            {
              id: 'selL0gU8sAFS0FUiA',
              name: 'Chest',
            },
            {
              id: 'selUbRTKAVLgDNvlf',
              name: 'Extremity',
            },
            {
              id: 'selnQCSoAHggsxwXQ',
              name: 'Head',
            },
            {
              id: 'sel2JMaVzf9etw07w',
              name: 'Neck',
            },
            {
              id: 'selBPcrNdOvlCg7C3',
              name: 'Other:',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'seloPN8eOaKaFkIYb',
              name: 'Chest',
            },
            {
              id: 'selTVv4IL4mXkCy7h',
              name: 'Head',
            },
            {
              id: 'selJcylozaCwOBMBD',
              name: 'Joint',
            },
            {
              id: 'seleHNfLDZXmw7pih',
              name: 'Neck',
            },
            {
              id: 'selgXjQR6ADq7HMsv',
              name: 'Other:',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please click here to write a medication prescription: <a href="https://airtable.com/shrY7UhjHNpZxNfNK" target="_blank">https://airtable.com/shrY7UhjHNpZxNfNK</a>',
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
        id: 'fldgb3pmJRmhwoYa8',
        name: 'Next appointment',
        type: 'date',
        format: '',
        isDateTime: true,
        options: null,
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'This is the place you can write anything you want to document about the patient\n\nNeed to create a task for the HN team? <a href="https://airtable.com/shrSPv5zEGvh1nm22" target="_blank">https://airtable.com/shrSPv5zEGvh1nm22</a>',
      },
      {
        id: 'fldPDOnQ4PpfE46WY',
        name: 'Consultation type - billing',
        type: 'multiSelect',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'sel0TT27LwBcoBaHf',
              name: 'Chronic case consultation',
            },
            {
              id: 'selTibDP6R6JbyTDh',
              name: 'Chronic case consultation - FU',
            },
            {
              id: 'selflQyz3bUzMjYHp',
              name: 'Diagnosed. Fulfill prescription, lab,imaging',
            },
            {
              id: 'selnr4h6PGSMg5TaO',
              name: 'Diagnosed. No prescription',
            },
            {
              id: 'selec3WP5raPArKK0',
              name: 'Diagnosed. Referred to Antara',
            },
            {
              id: 'sel6vGOAt2GzxgvLF',
              name: 'Diagnosed. Referred to lab /imaging',
            },
            {
              id: 'sel4oHuC9OVRvt8hZ',
              name: 'Diagnosed. Referred to provider/speciality',
            },
            {
              id: 'selT7Kneza0Qew58D',
              name: 'Follow up call after 24 hrs',
            },
            {
              id: 'selMmUVKfgWI7EDDu',
              name: 'Follow up call within 24 hrs',
            },
            {
              id: 'selxDDL2vZjpAv10t',
              name: 'General consultation',
            },
            {
              id: 'selxFhibtvEwmZBwQ',
              name: 'General consultation - FU',
            },
            {
              id: 'sel5clqNFF6sOiXtf',
              name: 'Initial consultation to initiate tracking of progress',
            },
            {
              id: 'selMxMGlT5L3CgywI',
              name: 'N/A',
            },
            {
              id: 'selPTOQygarEPsU4m',
              name: 'Second opinion consult initiated by HN',
            },
            {
              id: 'selOmvcDSsuA3ZM5R',
              name: 'Second opinion consult initiated by member',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper: 'Only for billing purpose',
      },
      {
        id: 'fldn4t3Jv9RheLWZU',
        name: 'Sick days number',
        type: 'number',
        format: 'integer',
        isDateTime: false,
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel7tXTWErEeS6PoU',
              name: 'No',
            },
            {
              id: 'sel2696TLZwKXANVn',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
    fields: [
      {
        id: 'flddquJOgORTpcHUT',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selNISGqFgxkaJ6mL',
              name: '1',
            },
            {
              id: 'selTUBm3F5IudxbuO',
              name: '2',
            },
            {
              id: 'seljbseus4igzB6OY',
              name: '3',
            },
            {
              id: 'selDLp5Np3fp8uqM1',
              name: '4',
            },
            {
              id: 'selAH9fNNWlMmNGXU',
              name: '5',
            },
            {
              id: 'selqJGeCu0GJvWYv7',
              name: '6',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selAIhL6k5LrPL5O1',
              name: 'Completed',
            },
            {
              id: 'selc1o2keS6HGx4L5',
              name: 'In Progress',
            },
            {
              id: 'selUrARid7rMsikc5',
              name: 'Not Started',
            },
            {
              id: 'seltKaaHueb1YkA4U',
              name: 'On Hold',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selCkkuAigkb8H4yu',
              name: 'Data Collection',
            },
            {
              id: 'selYVUmoGqBEC1Ehn',
              name: 'Data Collection Preparation',
            },
            {
              id: 'selnkRUvC1xIW4qVA',
              name: 'Ended',
            },
            {
              id: 'selrDuVgGmguxUbBO',
              name: 'Evaluation',
            },
            {
              id: 'selvpGYHeej4icCHK',
              name: 'External review (member)',
            },
            {
              id: 'sel98BaLhyFxfWjid',
              name: 'Generate',
            },
            {
              id: 'sel2rjjDAXBrVPdoT',
              name: 'Internal review',
            },
            {
              id: 'sel22eK7MLsATnhul',
              name: 'Share with member',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
    fields: [
      {
        id: 'fld2x7JNi1J2WcXyD',
        name: 'Member',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
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
        options: {
          choices: [
            {
              id: 'selgw3vns7Jc6ql1Z',
              name: 'Inpatient',
            },
            {
              id: 'selW1Qg7VApBtgpNv',
              name: 'Outpatient',
            },
            {
              id: 'selK51pf7jtGnswbM',
              name: 'Virtual Consultation',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel3ugxGzUJxLtKuD',
              name: 'Completed',
            },
            {
              id: 'sel6RAhc8hDa3ZVI7',
              name: 'Missed',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: true,
        helper:
          'If the appointment has been missed, you can fill a new appointment form here: <a href="https://airtable.com/shrZWjIcj1g2zMA5S" target="_blank">https://airtable.com/shrZWjIcj1g2zMA5S</a>',
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
        id: 'fldBlHuol20yLN2MH',
        name: 'Provider',
        type: 'foreignKey',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: 'flduYXmaBEpAV8H12',
        unreversed: true,
        relationship: 'many',
        foreignTableId: 'tblOnZn7Vo8N9wznR',
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
        id: 'fldu9qXCd8ZkwnN0C',
        name: 'Other provider',
        type: 'text',
        format: '',
        isDateTime: false,
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper: '',
        conditionType: '',
      },
      {
        id: 'fld7bh8tSoQEvygHA',
        name: 'Received reminder',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selAkiQFhQJbE9V0X',
              name: 'False',
            },
            {
              id: 'selnldAwG9pcxAiQH',
              name: 'True',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selAkiQFhQJbE9V0X',
              name: 'No',
            },
            {
              id: 'selnldAwG9pcxAiQH',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selqfj1xjDf51vCxX',
              name: 'False',
            },
            {
              id: 'selhIJY7HlilIiB5N',
              name: 'True',
            },
            {
              id: 'selksAOI1VAsFYn1v',
              name: 'Unknown',
            },
          ],
        },
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
        options: null,
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
        id: 'fldfy6pieOjk5VMlK',
        name: 'Had lab test',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selKPVsZYxMlqjpAR',
              name: 'False',
            },
            {
              id: 'selWrwhom0uf462FJ',
              name: 'True',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'sel49TWi2Kz7zVngC',
              name: 'False',
            },
            {
              id: 'selRMspMyDUw01lbG',
              name: 'True',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'sel3XlHj2akpGlIgu',
              name: 'False',
            },
            {
              id: 'selaquXExZcdz2vkX',
              name: 'True',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selKL7cwYpkbxjcsy',
              name: 'False',
            },
            {
              id: 'selymxNTa5RjOKX2i',
              name: 'True',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selGkRFDOwk90NnKX',
              name: 'False',
            },
            {
              id: 'selZq8LRUBQ45kDQR',
              name: 'True',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: 'fldkoxiSLYTqZFB7R',
        unreversed: true,
        relationship: 'many',
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Please describre the referral and inform CS that they need to add the provider in our blue base',
        conditionType: '',
      },
      {
        id: 'fldyDZpY0yspXyZhV',
        name: 'Referral appointment booked?',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selgr4eLDhsGl0mH3',
              name: 'No',
            },
            {
              id: 'selq6gelgPb8PKqsa',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selOxZ6iGgYygWzuF',
              name: 'False',
            },
            {
              id: 'selxbdawzNgdOo7yN',
              name: 'True',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selKC4jIfRIZwZLby',
              name: 'No',
            },
            {
              id: 'sel4pCvNM2G4KQIvC',
              name: 'Yes',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selyd8BXvjrLXeADD',
              name: 'False',
            },
            {
              id: 'selsy22bK3RPVCFhT',
              name: 'True',
            },
          ],
        },
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
        options: null,
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
        id: 'fldK8jQHBoDTizGZa',
        name: 'Know medication purpose',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selc3BdHWA9WlcWce',
              name: 'False',
            },
            {
              id: 'selOkWkHhIPvTDgMk',
              name: 'True',
            },
          ],
        },
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
        options: null,
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Describe the BN understanding of why the medication was prescribed',
        conditionType: '',
      },
      {
        id: 'fldOwUtLyyufZZfgE',
        name: 'Health management plan',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selZwyCTBdyiWlBZ9',
              name: 'False',
            },
            {
              id: 'sele66X0Sbae0b5HM',
              name: 'True',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selgu7JMsl5RYoGZh',
              name: 'New Symptoms',
            },
            {
              id: 'selkqdsF6TxyYBO9o',
              name: 'No change',
            },
            {
              id: 'selzzOeiZdvRmimKJ',
              name: 'Positive progress',
            },
            {
              id: 'selUGClvRcrt2dECQ',
              name: 'Resolved/Well',
            },
            {
              id: 'selvzQ80sa2ha1qjC',
              name: 'Worsening Symptoms',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selA4atw7JZnzrIdb',
              name: 'False',
            },
            {
              id: 'selzePk3uy53Jwrfb',
              name: 'True',
            },
          ],
        },
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
        options: {
          choices: [
            {
              id: 'selZk5SG7BuI3P2KC',
              name: 'No',
            },
            {
              id: 'selkLt6Tam0XuakcQ',
              name: 'Yes',
            },
          ],
        },
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selBWz8WCvwu6hv4M',
              name: 'False',
            },
            {
              id: 'seloMTjwS4MjAErHF',
              name: 'True',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: {
          choices: [
            {
              id: 'selLzjfz6K6UPbaSj',
              name: '0',
            },
            {
              id: 'selPKJAXhGrCES0UA',
              name: '1',
            },
            {
              id: 'selCSuKPVE42qmT1C',
              name: '10',
            },
            {
              id: 'selG18zwPTHB2yF5F',
              name: '2',
            },
            {
              id: 'selzYdm4cPWQrcrRC',
              name: '3',
            },
            {
              id: 'seljxAPTECnemagsy',
              name: '4',
            },
            {
              id: 'seljw6SgW4XOuYrxh',
              name: '5',
            },
            {
              id: 'selIwmdd7h9AbMljh',
              name: '6',
            },
            {
              id: 'sel7SvO3Bzr7XdQDs',
              name: '7',
            },
            {
              id: 'selXMcLnZz8dEvbgY',
              name: '8',
            },
            {
              id: 'selDBlYVX4kV29bMD',
              name: '9',
            },
          ],
        },
        symmetricColumnId: null,
        unreversed: false,
        relationship: null,
        foreignTableId: null,
        required: false,
        helper:
          'Only ask this question when the provider is related to Avenue HealthCare',
        conditionType: '',
      },
      {
        id: 'flda8qzIWDXQcpjwA',
        name: 'On a scale of 0 to 10, how likely are you to recommend Antara Health to your friends and family based on today’s experience? (0=very unlikely to 10=very likely)',
        type: 'select',
        format: '',
        isDateTime: false,
        options: {
          choices: [
            {
              id: 'selLzjfz6K6UPbaSj',
              name: '0',
            },
            {
              id: 'selPKJAXhGrCES0UA',
              name: '1',
            },
            {
              id: 'selCSuKPVE42qmT1C',
              name: '10',
            },
            {
              id: 'selG18zwPTHB2yF5F',
              name: '2',
            },
            {
              id: 'selzYdm4cPWQrcrRC',
              name: '3',
            },
            {
              id: 'seljxAPTECnemagsy',
              name: '4',
            },
            {
              id: 'seljw6SgW4XOuYrxh',
              name: '5',
            },
            {
              id: 'selIwmdd7h9AbMljh',
              name: '6',
            },
            {
              id: 'sel7SvO3Bzr7XdQDs',
              name: '7',
            },
            {
              id: 'selXMcLnZz8dEvbgY',
              name: '8',
            },
            {
              id: 'selDBlYVX4kV29bMD',
              name: '9',
            },
          ],
        },
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
        options: null,
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
        options: null,
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
        options: null,
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
