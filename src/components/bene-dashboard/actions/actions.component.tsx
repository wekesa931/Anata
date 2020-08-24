import React from 'react'
import InteractionLogs from './interaction-logs/interaction-logs.component'
import Tabs from '../../utils/tabs/tabs.component'
import Communication from './communication/communication.component'
import Tasks from './tasks/tasks.component'

const Actions = ({ member }: any) => {
  return (
    <div>
      <h2>Actions</h2>
      <Tabs currentTab={1}>
        <div label="Actions">
          <Communication member={member} />
          <Tasks />
        </div>
        <div label="Interaction Logs">
          <InteractionLogs />
        </div>
        <div label="Settings">Settings</div>
      </Tabs>
    </div>
  )
}

export default Actions
