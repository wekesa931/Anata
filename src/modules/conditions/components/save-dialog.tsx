import { Button, FormControl, FormLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import Modal from 'src/components/modals'
import * as yup from 'yup'

type Props = {
  saveEdits: (values: any) => void
  closeModal: () => void
  formValues: any
  open: boolean
}

const reasonForClinicalStatusChangeSchema = yup
  .string()
  .required('Reason for status change is required')

export function SaveDialogModal({
  open,
  closeModal,
  saveEdits,
  formValues,
}: Props) {
  const [reasonForClinicalStatusChange, setReasonForChange] = useState('')
  const [validationError, setValidationError] = useState<string | undefined>()

  const handleSubmit = () => {
    if (
      !reasonForClinicalStatusChangeSchema.isValidSync(
        reasonForClinicalStatusChange
      )
    ) {
      setValidationError('Reason for status change is required')
      return
    }

    closeModal()
    saveEdits({ ...formValues, reasonForClinicalStatusChange })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReasonForChange(e.target.value)

    if (e.target.value) {
      setValidationError(undefined)
    }
  }

  return open ? (
    <Modal open={closeModal} height="auto" width="40%" closeOption={false}>
      <div className="font-medium text-lg mb-3">Clinical status changed!</div>
      <FormControl fullWidth required>
        <FormLabel>Reason for status change</FormLabel>

        <OutlinedInput
          size="small"
          value={reasonForClinicalStatusChange}
          onChange={handleChange}
          required
          error={!!validationError}
        />
        <p className="mb-2.5 whitespace-pre-line font-rubik text-xs text-red-100">
          {validationError}
        </p>
      </FormControl>
      <div className="flex flex-col gap-2 mt-5">
        <Button
          className="border hover:!bg-[#FF9500]"
          sx={{
            backgroundColor: '#FF9500',
            border: '1px #FF9500 solid',
            color: '#ffff',
          }}
          onClick={handleSubmit}
          // disabled={!reasonForClinicalStatusChange}
        >
          Save edits
        </Button>

        <Button
          className="border hover:!bg-[#E8EAED]"
          sx={{
            backgroundColor: '#E8EAED',
            border: '1px #E8EAED solid',
            color: '#8B95A5',
          }}
          onClick={closeModal}
        >
          No, Discard edits
        </Button>
      </div>
    </Modal>
  ) : null
}
