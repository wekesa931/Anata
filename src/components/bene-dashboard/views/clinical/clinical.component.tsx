import React from 'react'
import Labs from './labs/labs.component'
import Vitals from './vitals/vitals.component'
import FilledForms from './filled-forms/filled-forms.component'
import Appointments from './appointments/appointments.component'
import Medications from './medications/medications.component'

const Clinical = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '48px', maxWidth: '336px' }}>
        <Labs />
        <Vitals />
      </div>
      <div>
        <div className="margin-bottom-16">
          <FilledForms />
        </div>
        <div className="margin-bottom-16">
          <Appointments />
        </div>
        <div className="margin-bottom-16">
          <Medications />
        </div>
      </div>
    </div>
  )
}

export default Clinical
