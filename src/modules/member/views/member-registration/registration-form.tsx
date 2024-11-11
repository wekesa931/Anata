import React, { useEffect } from 'react'
import type { Member } from 'src/modules/member/db/models'
import {
  MemberRegistrationWizardLayout,
  BiodataSection,
  ContactsSection,
  AddressSection,
  InsuranceSection,
  BillingSection,
} from 'src/modules/member/views/member-registration/components/wizard-layout'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import BioDataForm from 'src/modules/member/components/forms/biodata-form'
import ContactsForm from 'src/modules/member/components/forms/contacts-form'
import AddressesForm from 'src/modules/member/components/forms/addresses-form'
import InsuranceForm from 'src/modules/member/components/forms/insurance-form'
import BillingFormComponent from 'src/modules/member/components/forms/billing/components/billing-method-form'
import PrimaryMemberSearch from 'src/modules/member/components/primary-member-search'
import { RegistrationFormsNames } from 'src/modules/member/types'
import { useRegistrationForm } from 'src/context/member-registration'
import { useMember } from 'src/context/member'

type RegistrationFormProps = {
  primaryMember?: Member
  closeForm: () => void
  setIsEdited: (value: boolean) => void
  setCompleted: (member?: Member, primaryMember?: Member) => void
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
  const { member: rosterMember } = useRegistrationForm()
  const { member: currentMember } = useMember()

  useEffect(() => {
    createDefaultMemberInstance(rosterMember, currentMember?.primaryInsuranceId)
      .then((newMember) => {
        setMember(newMember)
      })
      .catch((error) => {
        logError(error)
        notify('Failed to create member instance', 'error')
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

  const getInsuranceDetails = (): any[] => {
    const data = localStorage.getItem('registration_insurance')
    return data ? JSON.parse(data) : []
  }

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

  const insuranceData = getInsuranceDetails()

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
            primaryMember={selectedPrimaryMember}
            rosterMember={rosterMember}
          />
        )}
      </BiodataSection>
      <ContactsSection>
        <ContactsForm
          member={member}
          setIsEdited={setIsEdited}
          isChildRegistration={formName === 'child'}
        />
      </ContactsSection>
      <AddressSection>
        <AddressesForm member={member} />
      </AddressSection>
      <InsuranceSection>
        <InsuranceForm member={member} primaryMember={selectedPrimaryMember} />
      </InsuranceSection>
      <BillingSection>
        <BillingFormComponent
          insuranceData={insuranceData}
          setBillingEditMode={setIsEdited}
          member={member}
          handleFormCompletion={setCompleted}
          type="billing-method"
          primaryMember={selectedPrimaryMember}
        />
      </BillingSection>
    </MemberRegistrationWizardLayout>
  )
}

export default RegistrationForm
