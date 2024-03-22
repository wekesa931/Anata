import * as React from 'react'
import { useCall } from 'src/context/calls'
import Notification from 'src/components/notification'
import { useMember } from 'src/context/member'
import { X } from 'react-feather'
import { Button, Divider, Paper, Popper } from '@mui/material'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import { useNotifications } from 'src/context/notifications'
import MemberPreferences from './member-preferences'

export interface IProps {
  onCallInitiated: (callDetails?: any) => void
  tasksType?: string
  error?: any
  setError: (error: any) => void
  phoneNumbers: any[]
  handleNewCalls: () => void
  anchorEl?: any
  closeWindow: () => void
}

function ContactList({
  onCallInitiated,
  tasksType,
  error,
  setError,
  phoneNumbers,
  handleNewCalls,
  anchorEl,
  closeWindow,
}: IProps) {
  const [isRinging, setisRinging] = React.useState<any>({})
  const { member } = useMember()
  const { initiateCall } = useCall()
  const { notify } = useNotifications()

  const calloutChange = async (e: any, relevantContact: any) => {
    e.stopPropagation()
    setisRinging((prev: any) => ({ ...prev, [relevantContact]: true }))

    try {
      initiateCall({
        memberDetails: member,
        callContact: relevantContact,
        onCallInitiated,
        type: tasksType,
      })
    } catch (error: any) {
      notify(error.message)
    } finally {
      setTimeout(() => {
        setisRinging((prev: any) => ({ ...prev, [relevantContact]: false }))
      }, 4000)
    }
  }

  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="bottom-start"
      className="z-20 max-w-[30rem] rounded-lg"
    >
      <Paper className="rounded-xl p-0">
        <div className="h-12 bg-dark-blue-70 p-4 w-full text-white text-left text-base rounded-tl-xl rounded-tr-xl font-bold">
          Outbound call
        </div>
        <MemberPreferences />
        <div data-testid="phone-list">
          {error && (
            <div className="p-relative">
              <X
                className="calls-error"
                color="var(--red-100)"
                width={18}
                height={18}
                onClick={() => setError(null)}
              />
              <Notification
                title="Error"
                message={error ?? ''}
                buttonMargin="0"
                buttonPadding="15px 8px"
              />
            </div>
          )}
          <div className="p-2">
            {member ? (
              <div>
                {phoneNumbers.length > 0 ? (
                  phoneNumbers?.map((con, i) => (
                    <div
                      className="flex items-center justify-between gap-2 mb-3 p-2 font-rubik"
                      key={i}
                    >
                      <div className="table flex-grow text-dark-blue-100">
                        <div className="table-row border-r-dark-blue-20">
                          <div className="table-cell border-r-4 border-r-dark-blue-20 w-[10rem]">
                            <p className="text-sm">{con?.name}</p>
                            <p className="text-xs text-dark-blue-50">
                              {con?.label}
                            </p>
                          </div>
                          <div className="table-cell pl-2 text-sm">
                            {con?.phone}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="text-blue-100 border-blue-100 font-medium flex items-center gap-2 normal-case"
                        variant="outlined"
                        onClick={(e: any) => calloutChange(e, con?.phone)}
                      >
                        <PhoneForwardedIcon />
                        {isRinging[con?.phone] ? 'Calling' : 'Call'}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div>
                <Notification
                  title="Error"
                  message="No contact found for member"
                />
              </div>
            )}
          </div>
          <Divider />
          <div className="w-full flex items-center justify-between gap-2 p-2 font-rubik px-4">
            <Button
              className="text-white border-blue-100 bg-blue-100 font-medium flex items-center gap-2 normal-case"
              variant="contained"
              onClick={handleNewCalls}
            >
              <PhoneForwardedIcon />
              Call another phone
            </Button>
            <Button
              className="text-white font-medium bg-dark-blue-50 normal-case"
              variant="contained"
              onClick={closeWindow}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Paper>
    </Popper>
  )
}

export default ContactList
