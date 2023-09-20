import dayjs from 'dayjs'

type CampMetric = {
  name: string
  metric: string
  'Actual Reading': string
  'Normal Range': string
}

export const transformMedicalCampData = (data: any): CampMetric[] => {
  let metrics: CampMetric[] = Object.entries(data).map(
    ([k, v]: [k: string, v: any]) => {
      let value = v?.healthMetric?.mean
      value = isNaN(value) ? value : parseInt(value)

      const normalRange = v?.normalRange
      const name = v?.healthMetricName || normalRange?.healthMetric?.name || k
      const readableNormalRange = normalRange
        ? `${normalRange?.minimumValue} - ${normalRange.maximumValue}`
        : 'N/A'

      return {
        name,
        'Actual Reading': value,
        'Normal Range': readableNormalRange,
        metric: k,
      }
    }
  )

  // fitler out the null values
  metrics = metrics.filter((m) => !!m['Actual Reading'])

  // find both systolic and diastolic
  const systolicIndex = metrics.findIndex((f) => f.metric === 'systolic')
  const diastolicIndex = metrics.findIndex((f) => f.metric === 'diastolic')
  let bp: any = {
    name: 'Blood pressure',
    metric: 'bp',
  }

  if (systolicIndex !== -1 && diastolicIndex !== -1) {
    const systolic = metrics[systolicIndex]
    const diastolic = metrics[diastolicIndex]

    bp = {
      ...bp,
      'Actual Reading': `${systolic['Actual Reading']} / ${diastolic['Actual Reading']}`,
      'Normal Range': `
        ${systolic['Normal Range']} systolic /
        ${diastolic['Normal Range']} diastolic
      `,
    }

    // remove the item at systolic index
    metrics.splice(systolicIndex, 1)
    metrics.splice(diastolicIndex, 1)
    metrics.push(bp)
  }

  return metrics
}

type Progress = {
  earliest: any
  recent: any
}

type LabsAndVitalsProgress = {
  bp: Progress
  bs: Progress
  hba1c: Progress
  chl: Progress
  vitals: Progress
}

const formatTime = (time: string) => {
  return dayjs(time).format('DD MMM YYYY')
}

const humanizeBp = (bp: any) => {
  const systolic = bp?.systolic
  const diastolic = bp?.diastolic
  const time = bp?.timestamp

  const display = systolic && diastolic ? `${systolic} / ${diastolic}` : ''
  return time ? `${display} on (${formatTime(time)})` : ''
}

const processBpProgress = (data: Progress) => {
  const { earliest, recent } = data

  return {
    key: 'BP (mmHg)',
    startingMeasurement: humanizeBp(earliest || {}),
    recentMeasurement: humanizeBp(recent || {}),
  }
}

const humanizeVitals = (vitals: any) => {
  const {
    timestamp,
    weight,
    height,
    bmi,
    respiratoryRate,
    oxygenSaturation,
    temperature,
  } = vitals
  const formattedTime = timestamp ? formatTime(timestamp) : ''

  return {
    'Weight (kg)':
      formattedTime && weight ? `${weight} on (${formattedTime})` : '',
    'Height (kg)':
      formattedTime && height ? `${height} on (${formattedTime})` : '',
    BMI: formattedTime && bmi ? `${parseInt(bmi)} on (${formattedTime})` : '',
    RR:
      formattedTime && respiratoryRate
        ? `${respiratoryRate} on (${formattedTime})`
        : '',
    SP02:
      formattedTime && oxygenSaturation
        ? `${oxygenSaturation} on (${formattedTime})`
        : '',
    Temperature:
      formattedTime && temperature
        ? `${temperature} on (${formattedTime})`
        : '',
  }
}

const processVitalsProgress = (data: Progress) => {
  const { earliest, recent } = data

  const startingMeasurement: any = humanizeVitals(earliest || {})
  const recentMeasurement: any = humanizeVitals(recent || {})

  const keys = Object.keys(startingMeasurement)
  return keys.map((key) => {
    return {
      key,
      startingMeasurement: startingMeasurement[key],
      recentMeasurement: recentMeasurement[key],
    }
  })
}

const humanizeBs = (bs: any) => {
  const { timestamp, randomBloodGlucose, fastingBloodGlucose } = bs
  const formattedTime = timestamp ? formatTime(timestamp) : ''

  return {
    'RBS (mmol/l)':
      formattedTime && randomBloodGlucose
        ? `${randomBloodGlucose} on (${formattedTime})`
        : '',
    'FBS (mmol/l)':
      formattedTime && fastingBloodGlucose
        ? `${fastingBloodGlucose} on (${formattedTime})`
        : '',
  }
}

const processBsProgress = (data: Progress) => {
  const { earliest, recent } = data

  const startingMeasurement: any = humanizeBs(earliest || {})
  const recentMeasurement: any = humanizeBs(recent || {})

  const keys = Object.keys(startingMeasurement)
  return keys.map((key) => {
    return {
      key,
      startingMeasurement: startingMeasurement[key],
      recentMeasurement: recentMeasurement[key],
    }
  })
}

const humanizeHba1c = (data: any) => {
  const { timestamp, hba1c } = data

  return timestamp && hba1c ? `${hba1c} on (${formatTime(timestamp)})` : ''
}

const processHba1cProgress = (data: Progress) => {
  const { earliest, recent } = data

  return {
    key: 'HBA1C',
    startingMeasurement: humanizeHba1c(earliest || {}),
    recentMeasurement: humanizeHba1c(recent || {}),
  }
}

const humanizeChl = (measurements: any) => {
  const { timestamp, data } = measurements
  const { hdl, ldl, triglycerides, total_cholesterol } = data
  const formattedTime = timestamp ? formatTime(timestamp) : ''

  return {
    HDL: formattedTime && hdl ? `${hdl?.value} on (${formattedTime})` : '',
    LDL: formattedTime && ldl ? `${ldl?.value} on (${formattedTime})` : '',
    Triglycerides:
      formattedTime && triglycerides?.value
        ? `${triglycerides?.value} on (${formattedTime})`
        : '',
    'Total Cholesterol':
      formattedTime && total_cholesterol?.value
        ? `${total_cholesterol?.value} on (${formattedTime})`
        : '',
  }
}
const processChlProgress = (readings: Progress) => {
  const { earliest, recent } = readings

  const startingMeasurement: any = humanizeChl(earliest || {})
  const recentMeasurement: any = humanizeChl(recent || {})

  const keys = Object.keys(startingMeasurement)
  return keys.map((key) => {
    return {
      key,
      startingMeasurement: startingMeasurement[key],
      recentMeasurement: recentMeasurement[key],
    }
  })
}

export const transformLabsAndVitalsProgressReport = (
  data: LabsAndVitalsProgress
) => {
  const { bp, bs, hba1c, chl, vitals } = data

  const vitalsReport = [
    processBpProgress(bp || {}),
    ...processVitalsProgress(vitals || {}),
  ]

  const labs = [
    ...processBsProgress(bs || {}),
    processHba1cProgress(hba1c || {}),
    ...processChlProgress(chl || {}),
  ]

  // process bs
  return {
    vitals: vitalsReport,
    labs,
  }
}
