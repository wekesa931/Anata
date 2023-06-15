import React from 'react'
import { useRegistrationForm } from 'src/context/member-registration'
import PrimaryModal from 'src/components/modals/primary'
import ConfirmationDialog from 'src/components/dialog'
import MemberRegistrationForm from './member-registration-selection'

function MemberRegistration() {
  const { isFormOpen, setIsFormOpen } = useRegistrationForm()
  const [isEdited, setIsEdited] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)

  const closeModal = () => {
    if (isEdited) {
      setShowCloseDialog(true)
    } else {
      setIsFormOpen(false)
      setShowCloseDialog(false)
    }
  }

  return (
    <PrimaryModal
      open={isFormOpen}
      onClose={() => closeModal()}
      aria-labelledby="member-registration-form"
      aria-describedby="member-registration-form"
    >
      <>
        <MemberRegistrationForm setIsEdited={setIsEdited} />

        <ConfirmationDialog
          open={showCloseDialog}
          setOpen={setShowCloseDialog}
          onConfirm={() => {
            setIsEdited(false)
            setIsFormOpen(false)
            setShowCloseDialog(false)
          }}
          onReject={() => {
            setShowCloseDialog(false)
          }}
        />
      </>
    </PrimaryModal>
  )
}

export default MemberRegistration
