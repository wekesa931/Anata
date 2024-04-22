import { Paper } from '@mui/material'
import React from 'react'
import dayjs from 'dayjs'
import { useMemberPreferences } from 'src/modules/comms/calls/hooks/member-preferences.data'
import LoadingComponent from 'src/components/loaders/table-loader'

const getTimeOfDayHumanized = (date: Date) => {
  const hour = date.getHours()
  if (hour >= 5 && hour < 12) return 'Morning'

  if (hour >= 12 && hour < 17) return 'Afternoon'

  if (hour >= 17 && hour < 21) return 'Evening'

  return 'Night'
}

function MemberPreferences() {
  const { error, loading, memberPreferences, lastCall } = useMemberPreferences()

  const isTodayInPrefferedDays = () => {
    const today = dayjs().format('dddd')
    return (memberPreferences?.preferredDays || []).includes(today)
  }

  const isCallInTime = () => {
    const timeOfDay = getTimeOfDayHumanized(new Date())
    return memberPreferences?.timeOfCalling === timeOfDay
  }

  const hasErrors = !isTodayInPrefferedDays() || !isCallInTime() || error

  const getLastCalled = (call: any) => {
    const createdAt = call?.createdAt
    return createdAt ? dayjs(createdAt).fromNow() : '-'
  }

  return (
    <div>
      <Paper className="p-4 bg-green-20 mb-2 font-rubik">
        <div className="flex flex-col gap-2">
          <div className="text-dark-blue-100 flex justify-between items-center">
            <p className="text-sm font-bold">Member Preferences</p>
          </div>
          {loading ? (
            <div>
              <LoadingComponent message="Loading member preferences" />
            </div>
          ) : (
            <>
              {memberPreferences ? (
                <div className="table text-left text-xs">
                  <div className="table-row">
                    <p
                      className={`table-cell text-dark-blue-100 font-medium ${
                        isCallInTime() ? 'text-dark-blue-100' : 'text-red-100'
                      }`}
                    >
                      {' '}
                      Time of calling:
                    </p>
                    <p
                      className={`table-cell text-dark-blue-100 font-medium ${
                        isCallInTime() ? 'text-dark-blue-100' : 'text-red-100'
                      }`}
                    >
                      {memberPreferences?.timeOfCalling}
                    </p>
                  </div>
                  <div className={`table-row `}>
                    <p
                      className={`table-cell text-dark-blue-100 font-medium ${
                        isTodayInPrefferedDays()
                          ? 'text-dark-blue-100'
                          : 'text-red-100'
                      }`}
                    >
                      Preferred days:{' '}
                    </p>
                    <p
                      className={`table-cell text-dark-blue-100 font-medium ${
                        isTodayInPrefferedDays()
                          ? 'text-dark-blue-100'
                          : 'text-red-100'
                      }`}
                    >
                      {(memberPreferences?.preferredDays || [])?.join(', ')}
                    </p>
                  </div>
                  <div className="table-row">
                    <p className="table-cell text-dark-blue-100 font-medium ">
                      Calling frequency:{' '}
                    </p>
                    <div className="table-cell text-dark-blue-100 font-medium ">
                      <p className="flex gap-2 items-center">
                        <span>{memberPreferences?.frequency}</span>
                        <small>(Last called - {getLastCalled(lastCall)})</small>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-md font-rubik text-dark-blue-100 font-bold">
                  No preferences set. Please update the baseline form
                </p>
              )}
            </>
          )}
          {hasErrors && !loading && (
            <p className="text-sm font-rubik text-red-100">
              Please confirm that you&apos;d like to call the member anyway
              inspite of their preferences
            </p>
          )}
        </div>
      </Paper>
    </div>
  )
}

export default MemberPreferences
