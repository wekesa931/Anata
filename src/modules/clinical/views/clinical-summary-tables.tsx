import React from 'react'
import FilledForms from 'src/modules/clinical/clinical-modules/filled-forms/filled-forms.component'
import Appointments from 'src/modules/clinical/clinical-modules/appointments/appointments.component'
import Medications from 'src/modules/clinical/clinical-modules/medications/components/medications.component'
import Consultation from 'src/modules/consultation'
import Logistic from 'src/modules/clinical/clinical-modules/logistic-task/components/logistic-task.component'
import DateRangeFiltered from 'src/context/date-range-filter'
import LabRequest from 'src/modules/labs/views/table'
import VitalsDisplay from 'src/modules/vitals/views/displays'
import VitalsTables from 'src/modules/vitals/views/tables'
import HealthMetrics from 'src/modules/conditions/views/tables'

function Clinical() {
  return (
    <DateRangeFiltered monthSlots={[1, 3, 6, 12]}>
      <div className="mt-1">
        <div className="flex-1">
          <Consultation />
          <Logistic />
          <LabRequest />
          <div className="my-4">
            <h4>Labs & Vitals </h4>
            <div className="border border-blue-light rounded p-2 my-2">
              <VitalsDisplay />
            </div>
          </div>
          <VitalsTables />
          <HealthMetrics />
        </div>
        <div className="flex-1">
          <div className="margin-bottom-16">
            <FilledForms />
            <Medications />
            <Appointments />
          </div>
        </div>
      </div>
    </DateRangeFiltered>
  )
}

export default Clinical
