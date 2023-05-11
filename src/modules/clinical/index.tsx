import React from 'react'
import Labs from './labs/labs.component'
import Vitals from './vitals/vitals.component'
import FilledForms from './filled-forms/filled-forms.component'
import Appointments from './appointments/appointments.component'
import Medications from './medications/medications.component'
import Consultation from '../consultation'
import Logistic from './logistic-task/components/logistic-task.component'
import DateFilterView from './date-filter.component'
import styles from './date-filter.component.css'
import LabRequest from './labs/components/lab-request.component'

function Clinical() {
  return (
    <div>
      <DateFilterView />
      <div className="flex-wrap">
        <div className={styles.containerFlex}>
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
