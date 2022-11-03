import React from 'react'
import Labs from './labs/labs.component'
import Vitals from './vitals/vitals.component'
import FilledForms from './filled-forms/filled-forms.component'
import Appointments from './appointments/appointments.component'
import Medications from './medications/medications.component'
import Consultation from '../consultation/consultation'

function Clinical() {
  return (
    <div className="flex-wrap">
      <div style={{ flex: 1, marginRight: '24px' }}>
        <Consultation />
        <Labs />
        <Vitals />
      </div>
      <div style={{ flex: 1 }}>
        <div className="margin-bottom-16">
          <FilledForms />
          <Medications />
          <Appointments />
        </div>
      </div>
    </div>
  )
}

export default Clinical
