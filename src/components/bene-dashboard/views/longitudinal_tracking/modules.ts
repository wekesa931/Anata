import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export interface ILongitudinalTrackingData {
  appointments: AppointmentsData[]
  conditions: ConditionsData[]
  medications: MedicationsData[]
  interventions: InterventionsData[]
  memberTask: MemberTasksData[]
  hntasks: HNTasksData[]
  bp: BPMonData[]
  dm: DMMonData[]
  chl: ChlMonData[]
  vitals: VitalsData[]
  hmp: HMPData[]
}

interface HMPData {
  'HMP #': string
  'HMP Phase': string
  'HMP Day': string
  'HMP Send Date': string
  'HN Notes': string
  created_at: string
  'Record ID': string
  last_modified_at: string
}

interface VitalsData {
  Date: string
  'Type of Reading': string
  Temperature: string
  RR: string
  SPO2: string
  Height: number
  'Height (m)': number
  Weight: string
  BMI: number
  '6-Lead ECG Findings': string
  height_latest: number
  'Muscle mass (kgs)': string
  'Body fat': string
  'Visceral fat': string
  'Waist circumference': string
  'Hip circumference': string
  'Waist:Hip ratio': string
  'Bone density': string
  'Water content': string
  'Muscle mass: weight ratio': string
  'Mid-Upper Arm Circumference(MUAC)': string
  Notes: string
  'Record ID': string
}

interface ChlMonData {
  'Test Date': string
  'Type of reading': string
  'Lipid panel test type': string
  HDL: string
  LDL: string
  'Total Cholesterol': string
  Triglyceride: string
  'Record ID': string
}

interface DMMonData {
  'Record ID': string
  'Test Date': string
  'Type of reading': string
  'Morning BS timing': string
  'Morning postprandial BS': number
  'Fasting Blood Sugar': number
  'Afternoon BS timing': string
  'Afternoon preprandial BS': number
  'Afternoon postprandial BS': number
  'Evening BS timing': string
  'Evening preprandial BS': number
  'Evening postprandial BS': number
  HbA1c: number
  Notes: string
  created_at: string
}

interface BPMonData {
  'Record ID': string
  Date: string
  Summary: string
  'Average Daily Systolic': number
  'Average Daily Diastolic': number
  'Average Pulse': number
  'Morning Systolic': number
  'Morning Pulse': number
  'Type of reading': string
  'Evening Diastolic': number
  'Evening Pulse': number
  'BP Reading Type': string
  Notes: string
  last_modified: string
  'Evening Systolic': number
  'Morning Diastolic': number
}

interface AppointmentsData {
  'Record ID': string
  created_at: string
  status_last_modified_at: string
  Status: string
  Member: string
  Service: string
  'Assignee Name': string
  Comments: string
}

interface ConditionsData {
  'Record ID': string
  created_at: string
  'Date of Diagnosis/Condition': string
  'Condition Status': string
  'Current stage': string
  status_last_modified_at: string
  Condition: string
  'Starting Stage': string
  'Starting clinical status': string
  'Condition Notes': string
  'Diagnosis Stage': string
  'Engagement Level': string
  'Key goal - all conditions': string
  'Current clinical status': string
  'Acute vs Chronic': string
}

interface MedicationsData {
  'Record ID': string
  'Medication Name (from Medication Base)': string
  'Start Date': string
  Status: string
  status_last_modified_at: string
  Quantity: string
  Refillable: string
  'Quantity Units': string
  Frequency: string
  Duration: string
  Route: string
  'Dosage Unit': string
  'Refill Date calculated': string
  'Days until Refill': string
  Stopped: string
  'Stop Date (Calculated)': string
  Notes: string
}

interface InterventionsData {
  'Record ID': string
  Status: string
  'Target date': string
  created_at: string
  status_last_modified_at: string
  'Current condition stage (from Conditions Data tracking)': string
  Intervention: string
  'Starting Measurement - all interventions': string
  'Starting Level - all interventions': string
  Notes: string
  'Milestone Target - all interventions': string
  "Intervention's final result": string
  'last recorded milestone attainment': string
  'Last recorded persona': string
  'Ranking #': string
}

interface MemberTasksData {
  'Record ID': string
  Type: string
  Status: string
  Created: string
  'Due Date': string
  created_at: string
  status_last_modified_at: string
  'Data collection type': string
  'Appointment booking type': string
  Priority: string
  Notes: string
  'days overdue': string
  'Task duration': string
}

interface HNTasksData {
  'Record ID': string
  'Due Date': string
  Status: string
  Type: string
  created_at: string
  status_last_modified_at: string
  'Task Priority': string
  'Task Notes': string
  'Auto Generated': boolean
  'Assignee Name': string
  'ME task type': string
}

export interface InteractionsData {
  feedback: any
  healthNavigator: {
    fullName: string
  }
  id: string
  inboundInteractionCategory: any
  outboundInteractionCategory: any
  interactionDirection: 'OUTBOUND_INTERACTION' | 'INBOUND_INTERACTION'
  interactionSummaryNotes: string
  interactionStartedAt: string
  interactorType: string
  modeOfCommunication: string
  outcome: string
  flagForReview: string
}

type TResourceId = string

interface IEventDetails {
  name: string
  id: string
  data: { [key: string]: any }
}

export interface IEvent {
  title: string
  start: string
  end: string
  id: string
  resourceId: TResourceId
  getEventDetails: () => IEventDetails
}

export interface IResource {
  id: TResourceId
  title: string
  order: number
  getEvents: (start: string, end: string) => IEvent[] | IGroupedEvent
  events: IEvent[]
}

export type TEventSlotInfo = {
  date: string
  level: number
}

export interface IDocument {
  id: string
  addedBy: string
  category: string
  createdAt: string
  description: string
  fileCategory: string
  mimeType: string
  title: string
  sharedFileSet?: {
    folder: string
    read: boolean
    sharedBy: string
    member: string
    sharedAt: string
    readAt: string
  }
}

export class Iterator<T> {
  private index = 0

  private data: T[]

  constructor(data: T[]) {
    this.data = data
  }

  next(): T | null {
    if (this.index < this.data.length) {
      // eslint-disable-next-line no-plusplus
      return this.data[this.index++]
    }

    return null
  }

  prev(): T | null {
    if (this.index > 0) {
      // eslint-disable-next-line no-plusplus
      return this.data[this.index--]
    }

    return null
  }

  first(): T | null {
    if (this.data.length > 0) {
      return this.data[0]
    }

    return null
  }

  from(index: number): T[] {
    // return all elements from index to the end of the array
    return this.data.slice(index)
  }
}

export interface IGroupedEvent extends IEvent {
  next: () => IEvent | null
  prev: () => IEvent | null
  first: () => IEvent | null
  from: (index: number) => IEvent[]
  eventType: 'grouped'
}

export const getSlotLabelContent = (info: TEventSlotInfo) => {
  if (info.level === 0) {
    return dayjs(info.date).format('MMMM')
  }

  const start = dayjs(info.date).startOf('week').format('MM/DD')
  const end = dayjs(info.date).endOf('week').format('MM/DD')
  return `${start} - ${end}`
}

const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD')

export const filterEventsBetween =
  (events: IEvent[]) => (start: string, end: string) => {
    const fetched = events.filter((event: IEvent) => {
      return (
        dayjs(event.start).isBetween(start, end, 'day', '[]') ||
        dayjs(event.end).isBetween(start, end, 'day', '[]')
      )
    })

    return fetched
  }

const GroupedEvents = (events: IEvent[], resourceId: string): IGroupedEvent => {
  const iterator = new Iterator(events)
  const firstEvent = iterator.first()

  return {
    title: `${events.length}`,
    id: 'grouped-events',
    resourceId,
    eventType: 'grouped',
    start: firstEvent ? firstEvent.start : '',
    end: firstEvent ? firstEvent.end : '',
    next: () => iterator.next(),
    prev: () => iterator.prev(),
    first: () => iterator.first(),
    from: (index: number) => iterator.from(index),
    getEventDetails: () =>
      firstEvent?.getEventDetails() || { name: '', id: '', data: {} },
  }
}

const getEventTitle = (start: string, end: string) => {
  return `${dayjs(start).format('DD/MM/YY')} - ${dayjs(end).format('DD/MM/YY')}`
}

const HMP = (hmpData: HMPData[]) => {
  const events = hmpData.map((hmp: HMPData) => {
    return {
      title: hmp['HMP #'],
      start: hmp.created_at,
      end: hmp.last_modified_at,
      id: hmp['Record ID'],
      resourceId: 'hmp',
      getEventDetails: () => {
        const name = getEventTitle(hmp.created_at, hmp.last_modified_at)
        return {
          name,
          id: hmp['Record ID'],
          data: {
            'HMP #': hmp['HMP #'],
            'HMP Phase': hmp['HMP Phase'],
            'HMP Day': hmp['HMP Day'],
            'HMP Send Date': hmp['HMP Send Date'],
            'HN Notes': hmp['HN Notes'],
            'Last updated': formatDate(hmp.last_modified_at),
          },
        }
      },
    }
  })

  return {
    id: 'hmp',
    title: 'HMP',
    order: 4,
    getEvents: (start: string, end: string) => {
      const filtered = filterEventsBetween(events)(start, end)
      if (filtered.length > 1) {
        return GroupedEvents(filtered, 'hmp')
      }

      return filtered
    },
    events,
  }
}

const Vitals = (vitalsData: VitalsData[]) => {
  const events = vitalsData.map((vital: VitalsData) => {
    return {
      title: vital['Type of Reading'],
      start: vital.Date,
      end: vital.Date,
      id: vital['Record ID'],
      resourceId: 'vitals',
      getEventDetails: () => {
        const name = getEventTitle(vital.Date, vital.Date)
        return {
          name,
          id: vital['Record ID'],
          data: {
            Date: vital.Date,
            'Type of reading': vital['Type of Reading'],
            Temperature: vital.Temperature,
            RR: vital.RR,
            SPO2: vital.SPO2,
            Height: vital.Height,
            'Height (m)': vital['Height (m)'],
            Weight: vital.Weight,
            BMI: vital.BMI,
            '6-Lead ECG Findings': vital['6-Lead ECG Findings'],
            height_latest: vital.height_latest,
            'Muscle mass (kgs)': vital['Muscle mass (kgs)'],
            'Body fat': vital['Body fat'],
            'Visceral fat': vital['Visceral fat'],
            'Waist circumference': vital['Waist circumference'],
            'Hip circumference': vital['Hip circumference'],
            'Waist:Hip ratio': vital['Waist:Hip ratio'],
            'Bone density': vital['Bone density'],
            'Water content': vital['Water content'],
            'Muscle mass: weight ratio': vital['Muscle mass: weight ratio'],
            'Mid-Upper Arm Circumference(MUAC)':
              vital['Mid-Upper Arm Circumference(MUAC)'],
            Notes: vital.Notes,
          },
        }
      },
    }
  })

  return {
    id: 'vitals',
    title: 'Vitals',
    order: 9,
    getEvents: (start: string, end: string) => {
      const filtered = filterEventsBetween(events)(start, end)
      if (filtered.length > 1) {
        return GroupedEvents(filtered, 'vitals')
      }

      return filtered
    },
    events,
  }
}

const CHLMonitoring = (chMonitoringData: ChlMonData[]) => {
  const events = chMonitoringData.map((ch: ChlMonData) => {
    return {
      title: ch['Type of reading'] || dayjs(ch['Test Date']).format('ddd MM'),
      start: ch['Test Date'],
      end: ch['Test Date'],
      id: ch['Record ID'],
      resourceId: 'chl-monitoring',
      getEventDetails: () => {
        const name = getEventTitle(ch['Test Date'], ch['Test Date'])
        return {
          name,
          id: ch['Record ID'],
          data: {
            'Test Date': ch['Test Date'],
            'Type of reading': ch['Type of reading'],
            'Lipid panel test type': ch['Lipid panel test type'],
            HDL: ch.HDL,
            LDL: ch.LDL,
            'Total Cholesterol': ch['Total Cholesterol'],
            Triglyceride: ch.Triglyceride,
          },
        }
      },
    }
  })

  return {
    id: 'chl-monitoring',
    title: 'CHL Monitoring',
    order: 8,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 1) {
        return GroupedEvents(filteredEvents, 'chl-monitoring')
      }

      return filteredEvents
    },
    events,
  }
}

const DMMonitoring = (dmMonitoringData: DMMonData[]) => {
  const events = dmMonitoringData.map((dm: DMMonData) => {
    return {
      title: dm['Type of reading'] || dayjs(dm.created_at).format('dd MM'),
      start: dm.created_at,
      end: dm.created_at,
      id: dm['Record ID'],
      resourceId: 'dm-monitoring',
      getEventDetails: () => {
        const name = getEventTitle(dm.created_at, dm.created_at)
        return {
          name,
          id: dm['Record ID'],
          data: {
            'Type of reading': dm['Type of reading'],
            'Morning BS timing': dm['Morning BS timing'],
            'Morning postprandial BS': dm['Morning postprandial BS'],
            'Fasting Blood Sugar': dm['Fasting Blood Sugar'],
            'Afternoon BS timing': dm['Afternoon BS timing'],
            'Afternoon preprandial BS': dm['Afternoon preprandial BS'],
            'Afternoon postprandial BS': dm['Afternoon postprandial BS'],
            'Evening BS timing': dm['Evening BS timing'],
            'Evening preprandial BS': dm['Evening preprandial BS'],
            'Evening postprandial BS': dm['Evening postprandial BS'],
            HbA1c: dm.HbA1c,
            Notes: dm.Notes,
            'Test Date': dm['Test Date'],
          },
        }
      },
    }
  })

  return {
    id: 'dm-monitoring',
    title: 'DM Monitoring',
    order: 7,
    getEvents: (start: string, end: string) => {
      const filtered = filterEventsBetween(events)(start, end)
      if (filtered.length > 1) {
        return GroupedEvents(filtered, 'dm-monitoring')
      }

      return filtered
    },
    events,
  }
}

const BPMonitoring = (bpMonitoringData: BPMonData[]) => {
  const events = bpMonitoringData.map((bp: BPMonData) => {
    return {
      title: bp.Summary,
      start: bp.Date,
      end: bp.last_modified,
      id: bp['Record ID'],
      resourceId: 'bp-monitoring',
      getEventDetails: () => {
        const name = getEventTitle(bp.Date, bp.last_modified)
        return {
          name,
          id: bp['Record ID'],
          data: {
            Date: bp.Date,
            'BP reading type': bp['BP Reading Type'],
            'Type of reading': bp['Type of reading'],
            'Average daily systolic': bp['Average Daily Systolic'],
            'Average daily diastolic': bp['Average Daily Diastolic'],
            'Average pulse': bp['Average Pulse'],
            'Morning systolic': bp['Morning Systolic'],
            'Evening systolic': bp['Evening Systolic'],
            'Morning diastolic': bp['Morning Diastolic'],
            'Evening diastolic': bp['Evening Diastolic'],
            'Morning Pulse': bp['Morning Pulse'],
            'Evening Pulse': bp['Evening Pulse'],
            Notes: bp.Notes,
            'Last modified': bp.last_modified,
          },
        }
      },
    }
  })

  return {
    id: 'bp-monitoring',
    title: 'BP Monitoring',
    order: 6,
    getEvents: (start: string, end: string) => {
      const fetched = filterEventsBetween(events)(start, end)
      if (fetched.length > 1) {
        return GroupedEvents(fetched, 'bp-monitoring')
      }

      return fetched
    },
    events,
  }
}

const Appointments = (appointmentsData: AppointmentsData[]) => {
  const events = appointmentsData.map((appointment: AppointmentsData) => {
    return {
      title: appointment.Service,
      start: appointment.created_at,
      end: appointment.status_last_modified_at,
      id: appointment['Record ID'],
      resourceId: 'appointment',
      getEventDetails: () => {
        const name = getEventTitle(
          appointment.created_at,
          appointment.status_last_modified_at
        )
        return {
          name,
          id: appointment['Record ID'],
          data: {
            'Assignee Name': appointment['Assignee Name'],
            Status: appointment.Status,
            Service: appointment.Service,
            'Start Date': formatDate(appointment.created_at),
            Comments: appointment.Comments,
            'Last modified': formatDate(appointment.status_last_modified_at),
          },
        }
      },
    }
  })

  return {
    title: 'Appointment',
    id: 'appointment',
    order: 5,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'appointment')
      }

      return filteredEvents
    },
    events,
  }
}

const Conditions = (conditionsData: ConditionsData[]) => {
  const events = conditionsData.map((condition: ConditionsData) => {
    return {
      title: condition.Condition,
      start: condition['Date of Diagnosis/Condition'],
      end: condition.status_last_modified_at,
      id: condition['Record ID'],
      resourceId: 'condition',
      getEventDetails: () => {
        return {
          name: getEventTitle(
            condition['Date of Diagnosis/Condition'],
            condition.status_last_modified_at
          ),
          id: condition['Record ID'],
          data: {
            'Date of Diagnosis/Condition': formatDate(
              condition['Date of Diagnosis/Condition']
            ),
            Condition: condition.Condition,
            'Acute vs Chronic': condition['Acute vs Chronic'],
            'Starting clinical status': condition['Starting clinical status'],
            'Current clinical status': condition['Current clinical status'],
            'Starting stage': condition['Starting Stage'],
            'Current stage': condition['Current stage'],
            'Key goal': condition['Key goal - all conditions'],
            'Engagement level': condition['Engagement Level'],
            Notes: condition['Condition Notes'],
          },
        }
      },
    }
  })

  return {
    title: 'Condition',
    id: 'condition',
    order: 1,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'condition')
      }

      return filteredEvents
    },
    events,
  }
}

const Medications = (medicationsData: MedicationsData[]) => {
  const events = medicationsData.map((medication: MedicationsData) => {
    return {
      title: medication['Medication Name (from Medication Base)'],
      start: medication['Start Date'],
      end: medication.status_last_modified_at,
      id: medication['Record ID'],
      resourceId: 'medication',
      getEventDetails: () => {
        return {
          name: getEventTitle(
            medication['Start Date'],
            medication.status_last_modified_at
          ),
          id: medication['Record ID'],
          data: {
            'Medication Name':
              medication['Medication Name (from Medication Base)'],
            Status: medication.Status,
            Refillable: medication.Refillable,
            Frequency: medication.Frequency,
            Duration: medication.Duration,
            Route: medication.Route,
            Quantity: medication.Quantity,
            'Quantity Units': medication['Quantity Units'],
            'Dosage Unit': medication['Dosage Unit'],
            'Start Date': formatDate(medication['Start Date']),
            'Refill Date calculated': medication['Refill Date calculated'],
            'Days until Refill': medication['Days until Refill'],
            Stopped: medication.Stopped,
            'Stop Date (Calculated)': medication['Stop Date (Calculated)'],
            Notes: medication.Notes,
            'Last updated': formatDate(medication.status_last_modified_at),
          },
        }
      },
    }
  })

  return {
    title: 'Medication',
    id: 'medication',
    order: 3,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'medication')
      }

      return filteredEvents
    },
    events,
  }
}

const Interventions = (interventionsData: InterventionsData[]) => {
  const events = interventionsData.map((intervention: InterventionsData) => {
    return {
      title: intervention.Intervention,
      start: intervention.created_at,
      end: intervention.status_last_modified_at,
      id: intervention['Record ID'],
      resourceId: 'intervention',
      getEventDetails: () => {
        return {
          name: getEventTitle(
            intervention.created_at,
            intervention.status_last_modified_at
          ),
          id: intervention['Record ID'],
          data: {
            Intervention: intervention.Intervention,
            Status: intervention.Status,
            Ranking: intervention['Ranking #'],
            'Starting measurement - all interventions':
              intervention['Starting Measurement - all interventions'],
            'Starting level - all interventions':
              intervention['Starting Level - all interventions'],
            'Milestone target - all interventions':
              intervention['Milestone Target - all interventions'],
            'Last recorded milestone attainment':
              intervention['last recorded milestone attainment'],
            Notes: intervention.Notes,
            "Intervention's final result":
              intervention["Intervention's final result"],
            'Last recorded persona': intervention['Last recorded persona'],
            'Last modified': formatDate(intervention.status_last_modified_at),
          },
        }
      },
    }
  })

  return {
    title: 'Intervention',
    id: 'intervention',
    order: 2,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'intervention')
      }

      return filteredEvents
    },
    events,
  }
}

const MemberTasks = (memberTasksData: MemberTasksData[]) => {
  const events = memberTasksData.map((memberTask: MemberTasksData) => {
    return {
      title: memberTask.Type,
      start: memberTask.created_at,
      end: memberTask.status_last_modified_at,
      id: memberTask['Record ID'],
      resourceId: 'member-task',
      getEventDetails: () => {
        return {
          name: getEventTitle(
            memberTask.created_at,
            memberTask.status_last_modified_at
          ),
          id: memberTask['Record ID'],
          data: {
            Type: memberTask.Type,
            'Data collection type': memberTask['Data collection type'],
            'Appointment booking type': memberTask['Appointment booking type'],
            'Due Date': formatDate(memberTask['Due Date']),
            Priority: memberTask.Priority,
            Status: memberTask.Status,
            Notes: memberTask.Notes,
            'days overdue': memberTask['days overdue'],
            'Task duration': memberTask['Task duration'],
            'Last Modified': formatDate(memberTask.status_last_modified_at),
          },
        }
      },
    }
  })

  return {
    title: 'Member Task',
    id: 'member-task',
    order: 11,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'member-task')
      }

      return filteredEvents
    },
    events,
  }
}

const HNTasks = (hnTasksData: HNTasksData[]) => {
  const events = hnTasksData.map((hnTask: HNTasksData) => {
    return {
      title: hnTask.Type,
      start: hnTask.created_at,
      end: hnTask.status_last_modified_at,
      id: hnTask['Record ID'],
      resourceId: 'hn-task',
      getEventDetails: () => {
        return {
          name: getEventTitle(
            hnTask['Due Date'],
            hnTask.status_last_modified_at
          ),
          id: hnTask['Record ID'],
          data: {
            Type: hnTask.Type,
            'ME Task type': hnTask['ME task type'],
            Assignee: hnTask['Assignee Name'],
            'Due Date': formatDate(hnTask['Due Date']),
            Status: hnTask.Status,
            Priority: hnTask['Task Priority'],
            'Task Notes': hnTask['Task Notes'],
            'Auto generated': hnTask['Auto Generated'] ? 'Yes' : 'No',
            'Last Modified': formatDate(hnTask.status_last_modified_at),
          },
        }
      },
    }
  })

  return {
    title: 'HN Task',
    id: 'hn-task',
    order: 12,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'hn-task')
      }

      return filteredEvents
    },
    events,
  }
}

export type TInteractions = ReturnType<typeof Interactions>

export const Interactions = (interactionsData: InteractionsData[]) => {
  const events = interactionsData.map((interaction: InteractionsData) => {
    return {
      title: interaction.modeOfCommunication,
      start: interaction.interactionStartedAt,
      end: '',
      id: interaction.id,
      resourceId: 'interaction',
      getEventDetails: () => {
        return {
          name: getEventTitle(
            interaction.interactionStartedAt,
            interaction.interactionStartedAt
          ),
          id: interaction.id,
          data: {
            'Encounter Date': formatDate(interaction.interactionStartedAt),
            'Interactor type': interaction.interactorType,
            'Inbound category': interaction.inboundInteractionCategory,
            'Outbound category': interaction.outboundInteractionCategory,
            'Mode of communication': interaction.modeOfCommunication,
            Notes: interaction.interactionSummaryNotes,
            'Plan/outcome': interaction.outcome,
            'Created by': interaction.healthNavigator?.fullName,
            'Flag for review': interaction.flagForReview,
          },
        }
      },
    }
  })

  return {
    title: 'Interaction',
    id: 'interaction',
    order: 0,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'interaction')
      }

      return filteredEvents
    },
    events,
  }
}

export const Documents = (documentsData: IDocument[]) => {
  const events = documentsData.map((document: IDocument) => {
    return {
      title: document.title,
      start: document.createdAt,
      end: '',
      id: document.id,
      resourceId: 'document',
      getEventDetails: () => {
        return {
          name: getEventTitle(document.createdAt, document.createdAt),
          id: document.id,
          data: {
            title: document.title,
            'File Type': document.category,
            Category: document.fileCategory,
            'Added By': document.addedBy,
            description: document.description,
            'Created At': formatDate(document.createdAt),
            'Shared By': document.sharedFileSet?.sharedBy,
            'Shared At': document.sharedFileSet?.sharedAt,
            Folder: document.sharedFileSet?.folder,
            read: document?.sharedFileSet?.read ? 'Yes' : 'No',
            readAt: document?.sharedFileSet?.readAt,
          },
        }
      },
    }
  })

  return {
    title: 'Document',
    id: 'document',
    order: 10,
    getEvents: (start: string, end: string) => {
      const filteredEvents = filterEventsBetween(events)(start, end)
      if (filteredEvents.length > 2) {
        return GroupedEvents(filteredEvents, 'document')
      }

      return filteredEvents
    },
    events,
  }
}

type IDataValue = IEvent[] | IGroupedEvent

export type ILongitudinalData = ReturnType<typeof LongitudinalData>

export const LongitudinalData = (
  longitudinalData: ILongitudinalTrackingData | undefined,
  interactionsData: InteractionsData[] | undefined,
  documents: IDocument[] | undefined
) => {
  const data = new Map<string, IResource>()

  const addLongitudinalData = (rawData?: ILongitudinalTrackingData) => {
    if (!rawData) return
    const appointments = Appointments(rawData?.appointments)
    const conditions = Conditions(rawData?.conditions)
    const medications = Medications(rawData?.medications)
    const interventions = Interventions(rawData?.interventions)
    const memberTasks = MemberTasks(rawData?.memberTask)
    const hnTasks = HNTasks(rawData?.hntasks)
    const bp = BPMonitoring(rawData?.bp)
    const dm = DMMonitoring(rawData?.dm)
    const chl = CHLMonitoring(rawData?.chl)
    const vitals = Vitals(rawData?.vitals)
    const hmp = HMP(rawData?.hmp)

    data.set('appointments', appointments)
    data.set('conditions', conditions)
    data.set('medications', medications)
    data.set('interventions', interventions)
    data.set('memberTasks', memberTasks)
    data.set('hnTasks', hnTasks)
    data.set('bp', bp)
    data.set('dm', dm)
    data.set('chl', chl)
    data.set('vitals', vitals)
    data.set('hmp', hmp)
  }

  const addInteractions = (rawInteractionsData?: InteractionsData[]) => {
    if (!rawInteractionsData) return
    const parsed = Interactions(rawInteractionsData)
    data.set('interactions', parsed)
  }

  const addDocuments = (documentsData?: IDocument[]) => {
    if (!documentsData) return
    const docs = Documents(documentsData)
    data.set('documents', docs)
  }

  addLongitudinalData(longitudinalData)
  addInteractions(interactionsData)
  addDocuments(documents)

  const getResources = () => {
    return Array.from(data.values())
  }

  const getEvents = (start: string, end: string) => {
    const events: IDataValue[] = []

    data.forEach((resource: IResource) => {
      events.push(resource.getEvents(start, end))
    })

    return events.flat()
  }

  return {
    getResources,
    getEvents,
    addLongitudinalData,
    addInteractions,
  }
}

export default LongitudinalData
