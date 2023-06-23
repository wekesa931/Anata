import React from 'react'
import { useRegistrationForm } from 'src/context/member-registration'
import PortalWindow from 'src/components/portal'
import MemberRegistrationForm from './member-registration-selection'

function MemberRegistration() {
  const { isFormOpen, setIsFormOpen } = useRegistrationForm()
  const [isEdited, setIsEdited] = React.useState(false)

  const closeModal = () => {
    setIsFormOpen(false)
  }

  return (
    isFormOpen && (
      <PortalWindow
        closeWindow={() => closeModal()}
        aria-labelledby="member-registration-form"
        aria-describedby="member-registration-form"
        isEdited={isEdited}
        setIsEdited={setIsEdited}
        title="Member Registration"
        width={50}
      >
        <div className="p-6">
          <MemberRegistrationForm setIsEdited={setIsEdited} />
        </div>
      </PortalWindow>
    )
  )
}

export default MemberRegistration
