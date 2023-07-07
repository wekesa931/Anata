import React from 'react'
import Labs from 'src/modules/clinical/clinical-modules/labs/labs.component'
import Vitals from 'src/modules/clinical/clinical-modules/vitals/vitals.component'
import FilledForms from 'src/modules/clinical/clinical-modules/filled-forms/filled-forms.component'
import Appointments from 'src/modules/clinical/clinical-modules/appointments/appointments.component'
import Medications from 'src/modules/clinical/clinical-modules/medications/medications.component'
import Consultation from 'src/modules/consultation'
import Logistic from 'src/modules/clinical/clinical-modules/logistic-task/components/logistic-task.component'
import DateFilterView from 'src/modules/clinical/components/date-filter.component'
import styles from 'src/modules/clinical/components/date-filter.component.css'
import LabRequest from 'src/modules/clinical/clinical-modules/labs/components/lab-request.component'

function Clinical() {
  return (
    <div>
      <DateFilterView />
      <div className="mt-[6rem]">
        <div className="flex-1">
          <Consultation />
          <Logistic />
          <Labs />
          <LabRequest />
          <Vitals />
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
