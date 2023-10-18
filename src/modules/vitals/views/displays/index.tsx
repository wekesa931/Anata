import { TabContext, TabPanel } from '@mui/lab'
import { Tab, Tabs } from '@mui/material'
import { ErrorBoundary } from '@sentry/react'
import React from 'react'
import BloodPressureView from 'src/modules/vitals/views/displays/blood-pressure'
import BMIView from 'src/modules/vitals/views/displays/bmi'
import LipidsView from 'src/modules/vitals/views/displays/lipids'
import BsView from 'src/modules/vitals/views/displays/bs-hba1c-views'
import { useModuleAnalytics } from 'src/modules/analytics'

function VitalsDisplay() {
  const [value, setValue] = React.useState<string>('blood-pressure')
  const { trackLabsAndVitalsTypeSelected } = useModuleAnalytics()
  return (
    <div className="font-rubik">
      <TabContext value={value}>
        <Tabs
          onChange={(event, newValue) => {
            setValue(newValue)
            trackLabsAndVitalsTypeSelected(newValue)
          }}
          aria-label="vitals tabs"
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          value={value}
        >
          <Tab
            label="Blood Pressure"
            value="blood-pressure"
            className="text-xs font-bold p-0"
          />
          <Tab
            label="Lipids"
            value="lipids"
            className="text-xs font-bold p-0"
          />
          <Tab
            label="Blood sugar"
            value="bs"
            className="text-xs font-bold p-0"
          />
          <Tab label="BMI" value="bmi" className="text-xs font-bold p-0" />
        </Tabs>

        <TabPanel value="blood-pressure" className="p-0">
          <ErrorBoundary>
            <BloodPressureView />
          </ErrorBoundary>
        </TabPanel>

        <TabPanel value="lipids" className="p-0">
          <ErrorBoundary>
            <LipidsView />
          </ErrorBoundary>
        </TabPanel>

        <TabPanel value="bs" className="p-0">
          <ErrorBoundary>
            <BsView />
          </ErrorBoundary>
        </TabPanel>

        <TabPanel value="bmi" className="p-0">
          <ErrorBoundary>
            <BMIView />
          </ErrorBoundary>
        </TabPanel>
      </TabContext>
    </div>
  )
}

export default VitalsDisplay
