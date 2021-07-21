import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { useCall } from '../../../../context/calls-context'
import { GET_ANTARA_STAFF } from '../../../../gql/staff'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import logError from '../../../utils/Bugsnag/Bugsnag'
import Notification from '../../../utils/notification/notification.component'

interface IAntaraStaff {
  emailUsername: string
  fullName: string
  email: string
  id: string
  phone: string
  slackId: string
}

interface IProps {
  staff: IAntaraStaff
  selected: string
  setSelected: (staff: IAntaraStaff) => void
}

const AvailableHnOrCs = ({ staff, selected, setSelected }: IProps) => {
  const isActiveCsOrHn = staff.id === selected
  return (
    <button
      data-testid="staff-to-transfer"
      onClick={() => setSelected(staff)}
      style={{ background: isActiveCsOrHn ? '#e7f3fd' : '' }}
      className="d-flex pointer cs-hn-name"
    >
      <span data-testid="check-mark" className="hn-name-check">
        {isActiveCsOrHn && (
          <span data-testid="check-mark-icon">
            <Check className="active-staff" />
          </span>
        )}
      </span>
      <p className="hn-name">{staff.fullName}</p>
    </button>
  )
}
const HNAndCSList = ({
  displayList,
}: {
  displayList: (show: boolean) => void
}) => {
  const { initiateTransfer } = useCall()
  const [selected, setselected] = useState<IAntaraStaff | null>(null)
  const [antaraStaffData, setantaraStaffData] = useState<IAntaraStaff[]>([])
  const [error, seterror] = useState<string | null>(null)
  const { data, loading } = useQuery(GET_ANTARA_STAFF)
  const disableTransferButton = !selected

  const initiateCallTransfer = () => {
    displayList(false)
    if (selected) {
      try {
        initiateTransfer(selected)
      } catch (e) {
        seterror(e.message)
        logError(e.message)
      }
    }
  }
  useEffect(() => {
    if (data) {
      const staffData: IAntaraStaff[] = data.antaraStaff.edges.map(
        (allStaff: { node: IAntaraStaff | any }) => {
          return { ...allStaff.node, email: allStaff.node.historyUserIdField }
        }
      )
      setantaraStaffData(staffData)
    }
  }, [data])
  if (loading) {
    return (
      <div className="p-absolute staff-list">
        <span className="d-flex flex-center full-width mt-twenty">
          <LoadingIcon />
        </span>
      </div>
    )
  }

  return (
    <div className="p-absolute staff-list">
      {error && <Notification title="Error" message={error} />}
      <div className="staff-names scroll">
        {antaraStaffData.map((staff) => (
          <div className="single" key={staff.id}>
            <AvailableHnOrCs
              selected={selected ? selected.id : ''}
              setSelected={setselected}
              staff={staff}
            />
          </div>
        ))}
      </div>
      <div className="transfer d-flex flex-between">
        <button
          className="danger-btn"
          onClick={() => {
            setselected(null)
            displayList(false)
          }}
        >
          <p>Cancel</p>
        </button>
        <button
          style={{ background: disableTransferButton ? '#87c1f7' : '#1084ee' }}
          disabled={disableTransferButton}
          onClick={initiateCallTransfer}
        >
          <p>Transfer call</p>
        </button>
      </div>
    </div>
  )
}

export default HNAndCSList
