import React from 'react'
import Button from 'src/components/buttons/html-button'
import PortalWindow from 'src/components/portal'
import EmptyBlock from 'src/modules/member/components/empty-block'

type ModalChildProps = {
  handleClose: () => void
  handleOpen: () => void
  setIsEdited: (isEdited: boolean) => void
}

type MissingInfoBlockProps = {
  children: (modalProps: ModalChildProps) => React.ReactElement
  title: string
  modalTitle?: string
}

function UpdateForm({
  title,
  modalTitle = 'Edit member details',
  children,
}: MissingInfoBlockProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [isEdited, setIsEdited] = React.useState(false)

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <EmptyBlock text={title}>
          <Button
            className="text-blue-100 mr-2 font-rubik normal-case"
            onClick={handleOpen}
          >
            +<span> Add </span>
          </Button>
        </EmptyBlock>
      </div>

      {open && (
        <PortalForm
          handleClose={handleClose}
          modalTitle={modalTitle}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          handleOpen={handleOpen}
        >
          {children}
        </PortalForm>
      )}
    </>
  )
}

type PortalFormProps = {
  handleClose: () => void
  handleOpen: () => void
  setIsEdited: (isEdited: boolean) => void
  modalTitle?: string
  isEdited: boolean
  children: (modalProps: ModalChildProps) => React.ReactElement
}

export function PortalForm({
  handleClose,
  modalTitle = 'Edit member details',
  isEdited,
  setIsEdited,
  children,
  handleOpen,
}: PortalFormProps) {
  return (
    <PortalWindow
      closeWindow={handleClose}
      title={modalTitle}
      isEdited={isEdited}
      setIsEdited={setIsEdited}
    >
      <div className="p-4">
        {children({ handleClose, handleOpen, setIsEdited })}
      </div>
    </PortalWindow>
  )
}

export default UpdateForm
