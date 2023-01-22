import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import {
  participantCallAction,
  useCall,
} from '../../../../context/calls-context'
import { GET_ANTARA_STAFF } from '../../../../gql/staff'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import logError from '../../../utils/error_handling/sentry'
import Notification from '../../../utils/notification/notification.component'
import Modal from '../../../utils/modals/modal.component'

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

function AvailableHnOrCs({ staff, selected, setSelected }: IProps) {
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
function HNAndCSList({
  displayList,
}: {
  displayList: (show: boolean) => void
}) {
  const { initiateTransfer } = useCall()
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setselected] = useState<IAntaraStaff | null>(null)
  const [antaraStaffData, setantaraStaffData] = useState<IAntaraStaff[]>([])
  const [error, seterror] = useState<string | null>(null)

  const [getAntaraStaff, { loading }] = useLazyQuery(GET_ANTARA_STAFF, {
    onCompleted: (data) => {
      const staffData: IAntaraStaff[] = data.antaraStaff.edges.map(
        (allStaff: { node: IAntaraStaff | any }) => {
          return {
            ...allStaff.node,
            email: `${allStaff.node.emailUsername}@antarahealth.com`,
          }
        }
      )
      setantaraStaffData(staffData)
    },
  })
  const disableTransferButton = !selected

  const initiateCallTransfer = (action: string) => {
    displayList(false)
    if (selected) {
      try {
        initiateTransfer({ ...selected, transferAction: action })
      } catch (e: any) {
        seterror(e?.message)
        logError(e?.message)
      }
    }
  }
  useEffect(() => {
    getAntaraStaff()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="p-absolute staff-list">
        <span className="d-flex flex-center full-width mt-twenty">
          <LoadingIcon />
        </span>
      </div>
    )
  }
  const shouldTransferCall = (action: string) => {
    setModalOpen(false)
    initiateCallTransfer(action)
  }
  return (
    <div className="p-absolute staff-list">
      <Modal
        open={modalOpen}
        setModalOpen={setModalOpen}
        heading={null}
        height="140px"
      >
        <div className="hold-option">
          Do you want to put the participant on hold?
        </div>
        <div className="d-flex align-center flex-center mt-ten">
          <button
            className="confirm-btn agree"
            onClick={() => shouldTransferCall(participantCallAction.HOLD)}
          >
            Yes
          </button>
          <button
            className="confirm-btn abort"
            onClick={() => shouldTransferCall(participantCallAction.NONE)}
          >
            No
          </button>
        </div>
      </Modal>
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
          onClick={() => setModalOpen(true)}
        >
          <p>Transfer call</p>
        </button>
      </div>
    </div>
  )
}

export default HNAndCSList
