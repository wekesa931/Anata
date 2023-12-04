import {
  AccountCircleOutlined,
  ChildCareOutlined,
  Person2Outlined,
} from '@mui/icons-material'
import React from 'react'
import SuccesfullRegistration from 'src/modules/member/views/member-registration/components/success-registration'
import type { Member } from 'src/modules/member/db/models'
import { RegistrationFormsNames } from 'src/modules/member/types'
import RegistrationForm from 'src/modules/member/views/member-registration/registration-form'
import { useRegistrationForm } from 'src/context/member-registration'

type MemberRegistrationFormProps = {
  setIsEdited?: (isEdited: boolean) => void
  openForm?: RegistrationFormsNames | null
}

export type RegistrationItemProps = {
  title: string
  subtitle: string
  Icon: React.ComponentType<any>
  handleClick: () => void
}

function RegistrationItem({
  title,
  subtitle,
  Icon,
  handleClick,
}: RegistrationItemProps) {
  return (
    <button
      className="
        flex justify-start gap-4 items-center p-2 bg-white-100 border border-greyscale-1 rounded-md cursor-pointer
        hover:bg-light-blue
      "
      onClick={handleClick}
    >
      <Icon className="w-[40px] text-grey-main" />
      <div className="flex flex-col justify-start items-start gap-2 text-left">
        <h3 className="text-dark-blue-100 font-medium text-base">{title}</h3>
        <p className="text-grey-main text-sm font-normal">{subtitle}</p>
      </div>
    </button>
  )
}

type RegistrationForms =
  | {
      name: RegistrationFormsNames
      member?: Member
      completed: boolean
      title: string
      primaryMember?: Member
    }
  | undefined

function MemberRegistrationForm({
  setIsEdited,
  openForm,
}: MemberRegistrationFormProps) {
  const getTitleFormForm = (formName: RegistrationFormsNames) => {
    switch (formName) {
      case 'primary':
        return 'Primary member registration'
      case 'dependent':
        return 'Adult dependent registration'
      case 'child':
        return 'Child registration'
      default:
        return ''
    }
  }

  const handleEdited = (edited: boolean) => {
    setIsEdited && setIsEdited(edited)
  }

  const [selectedForm, setSelectedForm] = React.useState<RegistrationForms>(
    openForm
      ? {
          name: openForm,
          member: undefined,
          completed: false,
          title: getTitleFormForm(openForm),
        }
      : undefined
  )

  const { member: rosterMember } = useRegistrationForm()

  const handleClick = (selection: RegistrationForms) => {
    setSelectedForm(selection)
  }
  const name = selectedForm?.member?.fullName
  return (
    <div className="w-full font-rubik">
      {!selectedForm && (
        <div>
          <h1 className="text-dark-blue-100 text-xl font-medium">
            Select the member type you want to register
          </h1>
          <div className="flex justify-start flex-col gap-4 mt-4">
            <RegistrationItem
              title="Primary member"
              subtitle="This is the main account holder"
              Icon={AccountCircleOutlined}
              handleClick={() =>
                handleClick({
                  name: RegistrationFormsNames.PRIMARY,
                  member: undefined,
                  completed: false,
                  title: getTitleFormForm(RegistrationFormsNames.PRIMARY),
                })
              }
            />
            <RegistrationItem
              title="Adult Dependent"
              subtitle="This is an adult dependent to the primary member"
              Icon={Person2Outlined}
              handleClick={() =>
                handleClick({
                  name: RegistrationFormsNames.DEPENDENT,
                  member: undefined,
                  completed: false,
                  title: getTitleFormForm(RegistrationFormsNames.DEPENDENT),
                })
              }
            />
            <RegistrationItem
              Icon={ChildCareOutlined}
              title="Child"
              subtitle="This is a child dependent to the primary member"
              handleClick={() =>
                handleClick({
                  name: RegistrationFormsNames.CHILD,
                  member: undefined,
                  completed: false,
                  title: getTitleFormForm(RegistrationFormsNames.CHILD),
                })
              }
            />
          </div>
        </div>
      )}

      {!!selectedForm && (
        <>
          {selectedForm.completed ? (
            <>
              <SuccesfullRegistration
                title={selectedForm.title}
                member={selectedForm.member}
                formFilled={selectedForm.name}
                primaryMember={selectedForm.primaryMember}
                setSelectedForm={setSelectedForm}
                isRosterMember={!!rosterMember}
                successMessage={`${name} has been successfully registered`}
                headerMessage="Add a dependent to this member?"
                customMessage={`The dependent you register will be automatically linked to ${name}`}
              />
            </>
          ) : (
            <RegistrationForm
              closeForm={() => setSelectedForm(undefined)}
              setIsEdited={handleEdited}
              setCompleted={(member?: Member, primaryMember?: Member) =>
                setSelectedForm({
                  ...selectedForm,
                  member,
                  completed: true,
                  primaryMember,
                })
              }
              formName={selectedForm.name}
              title={selectedForm.title}
              primaryMember={selectedForm.member}
            />
          )}
        </>
      )}
    </div>
  )
}

export default MemberRegistrationForm
