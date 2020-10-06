import React from 'react'
import Communication from './communication/communication.component'
import Forms from './forms/forms.component'
import Tasks from './tasks/tasks.component'

const Actions = ({ member }: any) => {
  const tabs = ['Actions', 'Forms', 'Settings']
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0])
  return (
    <div className="full-height d-flex" style={{ flexDirection: 'column' }}>
      <h2>Actions</h2>
      <div className="margin-top-16 d-flex text-blue-base">
        {tabs.map((tab) => (
          <button
            className={`btn ${
              activeTab === tab ? 'btn-secondary text-bold' : 'btn-unstyled'
            }`}
            style={{ marginRight: '24px', height: '44px' }}
            onClick={() => setActiveTab(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        style={{
          overflowY: 'scroll',
          marginTop: '32px',
          flex: 1,
        }}
      >
        <div className={activeTab === tabs[0] ? '' : 'hidden'}>
          <Communication member={member} />
          <Tasks />
        </div>
        <div className={activeTab === tabs[1] ? '' : 'hidden'}>
          <Forms />
        </div>
        <div className={activeTab === tabs[2] ? '' : 'hidden'}>Settings</div>
      </div>
    </div>
  )
}

export default Actions
