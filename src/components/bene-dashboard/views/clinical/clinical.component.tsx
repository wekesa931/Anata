import React from 'react'
import Labs from './labs/labs.component'
import Vitals from './vitals/vitals.component'
import FilledForms from './filled-forms/filled-forms.component'
import Appointments from './appointments/appointments.component'
import Medications from './medications/medications.component'
import Consultation from '../consultation/consultation'
import DateFilterView from './date-filter.component'
import styles from './date-filter.component.css'

function Clinical() {
  return (
    <div>
      <DateFilterView />
      <div className="flex-wrap">
        <div className={styles.containerFlex}>
          <Consultation />
          <Labs />
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
