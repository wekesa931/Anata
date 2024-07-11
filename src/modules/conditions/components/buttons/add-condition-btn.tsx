import React, { useState } from 'react'
import PortalWindow from 'src/components/portal'
import { useNotifications } from 'src/context/notifications'
import useFormsData from 'src/modules/workflows/hooks/forms-data'
import { CreateCondition } from '../../views/forms'

type AddConditionButtonProps = {
  refetch?: () => void
}

export function AddConditionButton({ refetch }: AddConditionButtonProps) {
  const { createEmptyForm } = useFormsData()
  const [form, setForm] = useState<any>(null)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const { notify } = useNotifications()

  const handleSuccess = () => {
    notify('Condition created successfully')
    refetch && refetch()
  }
  const handleError = (error: any) => {
    notify(error?.message ?? 'Error creating condition')
  }

  const saveInput = () => {
    setIsEdited(true)
  }

  const openForm = async () => {
    const newForm = await createEmptyForm('Condition')
    setForm(newForm)

    setOpen(true)
  }

  const closeWindow = async () => {
    await form.delete()
    setForm(null)
    setOpen(false)
  }

  return (
    <div>
      <button
        className="unset bg-[#FAFAFA] text-black px-8 py-1 text-base font-medium"
        onClick={openForm}
      >
        + New condition
      </button>
      {open && (
        <PortalWindow
          closeWindow={closeWindow}
          title="Create Condition"
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        >
          <CreateCondition
            refetch={refetch}
            form={form}
            handleSubmissionSuccess={handleSuccess}
            handleSubmissionError={handleError}
            saveInput={saveInput}
            closeWindow={closeWindow}
          />
        </PortalWindow>
      )}
    </div>
  )
}

export default AddConditionButton
