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
        <FilledForms />
        <Appointments />
        <Medications />
      </div>
    </div>
  )
}

export default Clinical
