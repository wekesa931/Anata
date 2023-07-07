import React from 'react'
import { Check } from 'react-feather'
import PrimaryButton from 'src/components/buttons/primary'
import { ChildCareOutlined, Person2Outlined } from '@mui/icons-material'
import type { Member } from 'src/modules/member/db/models'

type SuccesfullRegistrationProps = {
  title: string
  member?: Member
  formFilled: 'primary' | 'dependent' | 'child'
  setSelectedForm: (form: any) => void
}

function SuccesfullRegistration({
  title,
  member,
  formFilled,
  setSelectedForm,
}: SuccesfullRegistrationProps) {
  const name = member?.fullName

  return (
    <div className="p-2 flex flex-col gap-4 font-rubik text-left">
      <h1 className="w-full text-left text-dark-blue-100 font-rubik text-xl font-medium mb-2">
        {title}{' '}
      </h1>
      <div className="bg-green-10 rounded-lg p-2 flex justify-start items-center gap-4">
        <Check size={24} className="text-green-100" />
        <div className="font-rubik text-dark-blue-100 text-base">
          <h2 className="font-medium">Success!</h2>
          <p>{name} has been successfully registered</p>
        </div>
      </div>

      <div className="text-grey-main">
        <h2 className="text-lg">Add a dependent to this member?</h2>
        <p className="text-base">
          The dependent you register will be automatically linked to {name}
        </p>
        <div className="flex justify-between items-center gap-2 mt-4">
          {formFilled === 'primary' && (
            <PrimaryButton
              variant="outlined"
              startIcon={<Person2Outlined />}
              onClick={() =>
                setSelectedForm({
                  name: 'dependent',
                  member,
                  completed: false,
                  title: 'Adult dependent registration',
                })
              }
            >
              Add a dependent
            </PrimaryButton>
          )}
          <PrimaryButton
            variant="outlined"
            startIcon={<ChildCareOutlined />}
            onClick={() =>
              setSelectedForm({
                name: 'child',
                member,
                completed: false,
                title: 'Child registration',
              })
            }
          >
            {formFilled === 'child' ? 'Add another child' : 'Add a child'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default SuccesfullRegistration
