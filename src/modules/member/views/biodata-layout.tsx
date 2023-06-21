import React from 'react'
import { useMember } from 'src/context/member'
import { Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import PersonalSection from 'src/modules/member/views/personal-section'
import ClinicalSection from 'src/modules/member/views/clinical-section'
import { TitleSkeleton } from 'src/modules/member/components/skeleton-loaders'
import {getAgeFull} from 'src/utils/date-time/helpers'

function MemberBiodataLayout() {
  const { member } = useMember()
  const [value, setValue] = React.useState<string>('personal')

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white-100 flex justify-start flex-col overflow-y-auto border-l border-2 border-solid border-dark-blue-10">
        <div className="py-2 px-0 bg-white-bg min-h-[48px] flex items-center justify-between">
          {member ? (
            <h3 className="font-rubik font-medium text-xl pl-4 text-dark-blue-100 ">
              {`${member.fullName} (${getAgeFull(member?.birthDate)})`} 
              {member?.sex && (
                <span className="w-6 h-6 bg-red-50 text-white rounded-[50%] ml-1 py-[2px] px-[6px]">
                  {member?.sex.charAt(0) || ''}
                </span>
              )}
            </h3>
          ) : (
            <TitleSkeleton />
          )}
        </div>
        <div className="flex flex-col h-full">
          <TabContext value={value}>
            <div className="flex justify-between items-center font-rubik font-medium">
              <TabList onChange={handleChange}>
                <Tab label="clinical" className="uppercase" value="clinical" />
                <Tab label="personal" className="uppercase" value="personal" />
              </TabList>
            </div>
            <div>
              <TabPanel value="personal" className="p-0">
                <PersonalSection />
              </TabPanel>
            </div>
            <div>
              <TabPanel value="clinical" className="p-0">
                <ClinicalSection />
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </div>
  )
}

export default MemberBiodataLayout
