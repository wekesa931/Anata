import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import filterFields from 'src/utils/airtable/field-utils'

const APPOINTMENT_FIELDS = [
  'App Sign-up (from Member)',
  'Assignee Name',
  'Calendly Cancellation URL',
  'Calendly Reschedule URL',
  'Calendly event ID',
  'Clinical Consultation',
  'Comments',
  'Consultation Type (from Clinical Consultation)',
  'Data Source',
  'Days left before Appointment',
  'DaysSinceLastStatusUpdate',
  'Internal vs External',
  'LastStatusUpdate',
  'Minor Health Check (from Member)',
  'Plan (from Clinical Consultations)',
  'Primary Diagnosis (from Clinical Consultations)',
  'Service',
  'Baseline',
  'Source',
  'Start_date_time_month_of_the_year',
  'State Machine ID',
  'Status',
  'Summary',
  'Tags (from Member)',
  'Tasks',
  'created_by',
  'created_at',
  'end_date_time',
  'last_modified_by_',
  'start_date_time',
  'start_day_of_week_int',
  'start_time_hour_int',
  'status_last_modified_at',
  'updated_by',
  'Rescheduled',
  'Missed',
  'PAFU',
  'visit id',
]

export const useAppointmentsData = () => {
  const { member } = useMember()

  const getAppointments = async () => {
    if (!member?.airtableRecordId) return []

    return airtableFetch(
      `appointments/list?filterByFormula=FIND("${
        member?.airtableRecordId
      }", {Member Record ID})&${filterFields(APPOINTMENT_FIELDS)}`
    )
  }

  return {
    getAppointments,
  }
}
