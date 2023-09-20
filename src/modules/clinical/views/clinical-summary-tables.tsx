import React from 'react'
import FilledForms from 'src/modules/clinical/clinical-modules/filled-forms/filled-forms.component'
import Appointments from 'src/modules/clinical/clinical-modules/appointments/appointments.component'
import Medications from 'src/modules/clinical/clinical-modules/medications/components/medications.component'
import Consultation from 'src/modules/consultation'
import Logistic from 'src/modules/clinical/clinical-modules/logistic-task/components/logistic-task.component'
import DateFilterView from 'src/modules/clinical/components/date-filter.component'
import styles from 'src/modules/clinical/components/date-filter.component.css'
import LabRequest from 'src/modules/clinical/clinical-modules/labs/components/lab-request.component'
import VitalsDisplay from 'src/modules/vitals/views/displays'

function Clinical() {
  return (
    <div>
      <DateFilterView />
      <div className="mt-[6rem]">
        <div className="flex-1">
          <Consultation />
          <Logistic />
          <LabRequest />
          <div className="mt-4">
            <h4>Labs & Vitals </h4>
            <div className="border border-blue-light rounded p-2 my-2">
              <VitalsDisplay />
            </div>
          </div>
        </div>
        <div className={styles.flex1}>
          <div className="margin-bottom-16">
            <FilledForms />
            <Medications />
            <Appointments />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clinical
