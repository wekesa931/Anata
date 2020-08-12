import React from 'react'
import InteractionLogs from './interaction-logs/interaction-logs.component'
import Tabs from '../../utils/tabs/tabs.component'
import Communication from './communication/communication.component'

const Actions = ({ member }: any) => {
  return (
    <div>
      <h2>Actions</h2>
      <Tabs>
        <div label="Actions">
          <Communication member={member} />
        </div>
        <div label="Interaction Logs">
          <InteractionLogs />
        </div>
        <div label="Settings">
          See ya later, <em>Alligator</em>!
        </div>
      </Tabs>
    </div>
  )
}

export default Actions
