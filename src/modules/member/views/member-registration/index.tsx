import React, { useEffect } from 'react'
import { useRegistrationForm } from 'src/context/member-registration'
import PortalWindow from 'src/components/portal'
import { useMember } from 'src/context/member'
import { useParams, useSearchParams } from 'react-router-dom'
import MemberRegistrationForm from './member-registration-selection'
import { RegistrationFormsNames } from '../../types'

function MemberRegistration() {
  const { isFormOpen, setIsFormOpen } = useRegistrationForm()
  const [isEdited, setIsEdited] = React.useState(false)
  const { isLoading, member } = useMember()
  const { antaraId } = useParams()

  const [openForm, setOpenForm] = React.useState(false)
  const [searchParams] = useSearchParams()

  const getOpenFormFromSearchParams = () => {
    const form = searchParams.get('registrationForm')

    if (form === 'dependent' || form === 'child' || form === 'primary') {
      return form as RegistrationFormsNames
    }

    return null
  }

  useEffect(() => {
    if (!isLoading) {
      if (antaraId && member) {
        // we're in members dashboard
        setOpenForm(isFormOpen)
      } else {
        // we're in the main dashboard
        setOpenForm(isFormOpen)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFormOpen, member, antaraId])

  const closeModal = () => {
    setIsFormOpen(false)
    setOpenForm(false)
  }

  return (
    openForm && (
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
          <MemberRegistrationForm
            setIsEdited={setIsEdited}
            openForm={getOpenFormFromSearchParams()}
          />
        </div>
      </PortalWindow>
    )
  )
}

export default MemberRegistration
