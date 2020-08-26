import React from 'react'
import Tabs from '../../utils/tabs/tabs.component'
import Clinical from './clinical/clinical.component'

const Views = () => {
  return (
    <div>
      <h2>Views</h2>
      <Tabs>
        <div label="Clinical Summary">
          <Clinical />
        </div>
        <div label="Health Mgmt Plans">
          <h1>HMPs</h1>
        </div>
        <div label="AHC Virtual Care">Partner Views</div>
      </Tabs>
    </div>
  )
}

export default Views
