import React from 'react'
import InteractionLogs from './interaction-logs/interaction-logs.component'
import Tabs from '../../utils/tabs/tabs.component'

const Actions = () => {
  return (
    <div>
      <h2>Actions</h2>
      <Tabs>
        <div label="Interaction Logs">
          <InteractionLogs />
        </div>
        <div label="Actions" />
        <div label="Settings">
          See ya later, <em>Alligator</em>!
        </div>
      </Tabs>
    </div>
  )
}

export default Actions
