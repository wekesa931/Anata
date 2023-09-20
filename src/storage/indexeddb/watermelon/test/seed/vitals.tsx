import { Database } from '@nozbe/watermelondb'
import type {
  Vitals,
  Cholesterol,
  Hba1c,
  BloodPressure,
  BloodGlucose,
} from 'src/modules/vitals/db/models'
import { CollectionType } from 'src/storage/types'

export const seedVitals = async (database: Database) => {
  const vitalsCollection = database.collections.get<Vitals>(
    CollectionType.VITALS
  )
  const chCollection = database.collections.get<Cholesterol>(
    CollectionType.CHOLESTEROL
  )
  const hba1cCollection = database.collections.get<Hba1c>(CollectionType.HBA1C)
  const bpCollection = database.collections.get<BloodPressure>(
    CollectionType.BLOOD_PRESSURE
  )
  const bgCollection = database.collections.get<BloodGlucose>(
    CollectionType.BLOOD_GLUCOSE
  )

  await database.write(async () => {
    await vitalsCollection.create((v) => {
      v.antaraId = 'TEST-1234'
      v.measurer = 'TEST-MEASURER'
      v.weight = 100
      v.height = 1.7
      v.timestamp = '2021-09-01T00:00:00.000Z'
      v.temperature = 36.5
      v.oxygenSaturation = 100
      v.sixLeadEcgFindings = 'TEST-6-LEAD-ECG-FINDINGS'
      v.respiratoryRate = 100

      // eslint-disable-next-line no-underscore-dangle
      v._raw.id = 'TEST-VITALS-ID'
    })
  })

  await database.write(async () => {
    await chCollection.create((c) => {
      c.antaraId = 'TEST-1234'
      c.measurer = 'TEST-MEASURER'
      c.totalCholesterol = 100
      c.triglyceride = 100
      c.timestamp = '2021-09-01T00:00:00.000Z'
      c.ldl = 100
      c.hdl = 100
      c.lipidPanelTestType = 'TEST-LIPID-PANEL-TEST-TYPE'

      // eslint-disable-next-line no-underscore-dangle
      c._raw.id = 'TEST-CHOLESTEROL-ID'
    })
  })

  await database.write(async () => {
    await hba1cCollection.create((h) => {
      h.antaraId = 'TEST-1234'
      h.measurer = 'TEST-MEASURER'
      h.hba1c = 100
      h.timestamp = '2021-09-01T00:00:00.000Z'

      // eslint-disable-next-line no-underscore-dangle
      h._raw.id = 'TEST-HBA1C-ID'
    })
  })

  await database.write(async () => {
    await bpCollection.create((b) => {
      b.antaraId = 'TEST-1234'
      b.measurer = 'TEST-MEASURER'
      b.timestamp = '2021-09-01T00:00:00.000Z'
      b.eveningDiastolic = 100
      b.eveningPulse = 100
      b.eveningSystolic = 100
      b.morningDiastolic = 100
      b.morningPulse = 100
      b.morningSystolic = 100

      // eslint-disable-next-line no-underscore-dangle
      b._raw.id = 'TEST-BP-ID'
    })
  })

  await database.write(async () => {
    await bgCollection.create((b) => {
      b.antaraId = 'TEST-1234'
      b.measurer = 'TEST-MEASURER'
      b.timestamp = '2021-09-01T00:00:00.000Z'
      b.fastingBloodGlucose = 100
      b.morningBloodGlucoseTiming = 'TEST-MORNING-BLOOD-GLUCOSE-TIMING'

      // eslint-disable-next-line no-underscore-dangle
      b._raw.id = 'TEST-BG-ID'
    })
  })
}
