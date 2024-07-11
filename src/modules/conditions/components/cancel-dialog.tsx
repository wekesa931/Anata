import React from 'react'
import Modal from 'src/components/modals'
import { Button } from '@mui/material'
import { shouldShowReasonForStatusChange } from '../utils'

type DetailsProps = {
  condition: any
  cancelModal: boolean
  handleDiscardEdits: (conditionId: any) => void
  handleEdit: (values: any) => void
  formValues: any
  setShowStatusChange: (conditionId?: string) => void
}

export function CancelDialog({
  condition,
  cancelModal,
  handleDiscardEdits,
  handleEdit,
  formValues,
  setShowStatusChange,
}: DetailsProps) {
  const confirmHandler = () => {
    const show = shouldShowReasonForStatusChange(condition, formValues)

    show ? setShowStatusChange(condition?.id) : handleEdit(formValues)
  }
  return (
    <>
      {cancelModal && (
        <Modal open={cancelModal} height="auto" width="40%" closeOption={false}>
          <div className="font-medium text-lg mb-3">Heads up!</div>
          <p>
            You have unsaved changes on this page. Do you want to save them
            before exiting?
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button
              className="border hover:!bg-[#FF9500]"
              sx={{
                backgroundColor: '#FF9500',
                border: '1px #FF9500 solid',
                color: '#ffff',
              }}
              onClick={confirmHandler}
            >
              Yes, Save edits
            </Button>
            <Button
              className="border hover:!bg-[#E8EAED]"
              sx={{
                backgroundColor: '#E8EAED',
                border: '1px #E8EAED solid',
                color: '#8B95A5',
              }}
              onClick={() => handleDiscardEdits(condition.id)}
            >
              No, Discard edits
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CancelDialog
