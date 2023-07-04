import React, { useEffect } from 'react'
import type { Member } from 'src/modules/member/db/models'
import {
  MemberRegistrationWizardLayout,
  BiodataSection,
  ContactsSection,
  AddressSection,
  InsuranceSection,
} from 'src/modules/member/views/member-registration/components/wizard-layout'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import BioDataForm from 'src/modules/member/views/member-registration/components/forms/biodata-form'
import ContactsForm from 'src/modules/member/views/member-registration/components/forms/contacts-form'
import AddressesForm from 'src/modules/member/views/member-registration/components/forms/addresses-form'
import InsuranceForm from 'src/modules/member/views/member-registration/components/forms/insurance-form'
import PrimaryMemberSearch from 'src/modules/member/views/member-registration/components/primary-member-search'
import { RegistrationFormsNames } from 'src/modules/member/types'

type RegistrationFormProps = {
  primaryMember?: Member
  closeForm: () => void
  setIsEdited: (value: boolean) => void
  setCompleted: (member?: Member) => void
  formName: RegistrationFormsNames
  title: string
}

function RegistrationForm({
  primaryMember,
  closeForm,
  setIsEdited,
  setCompleted,
  formName,
  title,
}: RegistrationFormProps) {
  const [selectedPrimaryMember, setSelectedPrimaryMember] = React.useState<
    Member | undefined
  >(primaryMember)
  const { createDefaultMemberInstance } = useRegistrationData()
  const { notify } = useNotifications()
  const [member, setMember] = React.useState<Member | null>(null)

  useEffect(() => {
    createDefaultMemberInstance()
      .then((newMember) => {
        setMember(newMember)
      })
      .catch((error) => {
        logError(error)
        notify('Failed to create member instance', 1000)
      })

    return () => {
      if (member) {
        member.destroy().then(() => {
          setMember(null)
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseForm = async () => {
    await Promise.all([
      member?.destroy(),
      selectedPrimaryMember?.destroy(),
    ]).then(() => {
      setMember(null)
      setSelectedPrimaryMember(undefined)
      closeForm()
    })
  }

  return (
    <MemberRegistrationWizardLayout
      title={title}
      subtitle={
        formName !== 'primary'
          ? `Primary member: ${selectedPrimaryMember?.fullName || ''}`
          : ''
      }
    >
      <BiodataSection>
        {!selectedPrimaryMember && formName !== 'primary' ? (
          <PrimaryMemberSearch
            setPrimaryMember={setSelectedPrimaryMember}
            handleCloseForm={handleCloseForm}
          />
        ) : (
          <BioDataForm
            onPrev={() => {
              if (formName !== 'primary') {
                setSelectedPrimaryMember(undefined)
              } else {
                handleCloseForm()
              }
            }}
            setIsEdited={setIsEdited}
            member={member}
            isChildRegistration={formName === 'child'}
          />
        )}
      </BiodataSection>
      <ContactsSection>
        <ContactsForm member={member} setIsEdited={setIsEdited} />
      </ContactsSection>
      <AddressSection>
        <AddressesForm member={member} />
      </AddressSection>
      <InsuranceSection>
        <InsuranceForm
          member={member}
          setCompleted={setCompleted}
          primaryMember={selectedPrimaryMember}
        />
      </InsuranceSection>
    </MemberRegistrationWizardLayout>
  )
}

export default RegistrationForm
