import React, { useEffect } from 'react'
import Communication from './communication/communication.component'
import Forms from './forms/forms.component'
import Meetings from './meetings/meetings.component'
import Tasks from './tasks/tasks.component'
import Icon from '../../utils/icon/icon.component'
import CallsCallout from './calls/calls.component'
import CallFloatingBox from './calls/callConsole.component'
import { useCall } from '../../../context/calls-context'

const Actions = () => {
  const tabs = ['Actions', 'Forms', 'Meetings']
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0])
  const tabAction = (tab: string) => {
    setActiveTab(tab)
  }
  const { setCounterValue } = useCall()

  useEffect(() => {
    setCounterValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="full-height d-flex flex-column">
      <CallFloatingBox />
      <div className="d-flex flex-between">
        <div className="d-flex flex-between text-blue-base relative">
          {tabs.map((tab) => (
            <button
              className={`tab-btn btn ${
                activeTab === tab ? 'action-btn text-bold' : 'btn-unstyled'
              }`}
              onClick={() => tabAction(tab)}
              key={tab}
            >
              <p
                className={`btn-text ${
                  activeTab === tab ? 'btn-active-text' : 'btn-passive-text'
                }`}
              >
                {tab}
              </p>
            </button>
          ))}
        </div>
        <div className="d-flex flex-between communication-icons">
          <button
            className="btn"
            style={{
              color: activeTab === 'Messages' ? '#58a9f3' : '#af9090',
              backgroundColor: activeTab === 'Messages' ? '#e7f3fd' : '#e8eaed',
            }}
            onClick={() => tabAction('Messages')}
          >
            <Icon name="message-circle" fill="#efefef" width={16} height={16} />
          </button>
          <CallsCallout />
        </div>
      </div>
      <div className="flex-scroll">
        <div className={activeTab === tabs[0] ? '' : 'hidden'}>
          <Tasks />
        </div>
        <div className={activeTab === tabs[1] ? '' : 'hidden'}>
          <Forms />
        </div>
        <div className={activeTab === tabs[2] ? '' : 'hidden'}>
          <Meetings />
        </div>
        <div className={activeTab === 'Messages' ? '' : 'hidden'}>
          <Communication />
        </div>
      </div>
    </div>
  )
}

export default Actions
