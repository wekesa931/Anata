import React, { useState } from 'react'
import { UserTask, Priority } from 'src/modules/tasks/types'
import { Link } from 'react-router-dom'
import PrimaryButton from 'src/components/buttons/primary'
import { ClickAwayListener, IconButton, Popper } from '@mui/material'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseIcon from '@mui/icons-material/Close'
import NotesIcon from '@mui/icons-material/Notes'

type Props = {
  value: UserTask
}

export function TaskPriorityComponent({ value }: Props) {
  const getColor = (priority?: Priority) => {
    switch (priority) {
      case Priority.P0:
        return 'bg-status-terminated'
      case Priority.P1:
        return 'bg-status-provisioned'
      default:
        return 'bg-dark-blue-50'
    }
  }
  return (
    <p
      className={`flex font-rubik items-center justify-center text-center text-white rounded-2xl w-[150px] ${getColor(
        value?.priority
      )}`}
    >
      {value?.priority}
    </p>
  )
}

export function StatusComponent({ value }: Props) {
  const getColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'complete':
        return 'text-green-100 border-green-100'
      case 'in progress':
        return 'text-orange-100 border-orange-100'
      case 'not started':
        return 'text-blue-70 border-blue-70'
      case 'cancelled':
        return 'text-status-terminated border-status-terminated'
      default:
        return 'text-blue-70 border-blue-70'
    }
  }
  return (
    <p
      className={`flex items-center font-rubik justify-center border rounded-2xl text-center max-w-[100px] ${getColor(
        value?.status
      )}`}
    >
      {value?.status}
    </p>
  )
}

export function ActionComponent({ value }: any) {
  return (
    <PrimaryButton className="bg-orange-100 text-xs font-rubik normal-case text-white hover:bg-orange-100 hover:text-white shadow-none">
      <Link to={`/member/${value?.antaraId}`} className="font-rubik">
        {' '}
        Open dashboard{' '}
      </Link>
    </PrimaryButton>
  )
}

export function TaskNotes({ value }: any) {
  const [selected, setSelected] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleShowDetails = (show: boolean) => (e: any) => {
    e.stopPropagation()
    setShowDetails(show)
    setAnchorEl(e.currentTarget)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelected(false)
  }

  return (
    <>
      <ClickAwayListener onClickAway={closeDetails}>
        <>
          <div
            className={`cursor-pointer relative box-content max-h-[4rem] ${
              selected && ' outline outline-dark-blue-20 p-2'
            }`}
            onClick={() => setSelected(true)}
            role="presentation"
          >
            <p className="font-rubik max-w-md overflow-hidden">
              {value?.notes}
            </p>
            {selected && (
              <div className="absolute top-0 right-0">
                <IconButton
                  className="text-dark-blue-50 h-5 w-5"
                  onClick={toggleShowDetails(!showDetails)}
                >
                  {showDetails ? (
                    <CloseIcon className="h-4 w-4" />
                  ) : (
                    <OpenInFullIcon className="h-4 w-4" />
                  )}
                </IconButton>
              </div>
            )}
          </div>
          <Popper
            open={showDetails}
            anchorEl={anchorEl}
            className="z-10"
            placement="top"
          >
            <ClickAwayListener onClickAway={closeDetails}>
              <div className="bg-white rounded-md p-6 max-w-2xl font-rubik">
                <div className="flex justify-between items-start flex-col gap-3 text-left">
                  <p className="flex justify-start items-center gap-2 text-xl text-dark-blue-50">
                    <NotesIcon className="h-6 w-6" />
                    Tasks Notes
                  </p>
                  <p className="text-sm font-rubik break-all">{value?.notes}</p>
                </div>
              </div>
            </ClickAwayListener>
          </Popper>
        </>
      </ClickAwayListener>
    </>
  )
}
