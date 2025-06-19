import { ChildCareOutlined, Person2Outlined } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { Check, X } from 'react-feather'
import PrimaryButton from 'src/components/buttons/primary'
import useAnalytics from 'src/hooks/analytics'
import { Member } from 'src/modules/member/db/models'
import { useNavigate } from 'react-router-dom'

type SuccessfulProps = {
  title?: string
  member?: Member
  formFilled?: 'primary' | 'dependent' | 'child' | 'pdfGenerate'
  setSelectedForm?: (form: any) => void
  isRosterMember?: boolean
  successMessage: string
  headerMessage?: string
  customMessage?: string
  handleClose?: () => void
  fileId?: string
  primaryMember?: Member
  folder?: string
}

function SuccessPrompt({
  title,
  member,
  formFilled,
  setSelectedForm,
  isRosterMember,
  successMessage,
  headerMessage,
  customMessage,
  handleClose,
  primaryMember,
}: SuccessfulProps) {
  const analytics = useAnalytics('Member registration')

  useEffect(() => {
    if (formFilled !== 'pdfGenerate') {
      analytics.track('Member registered', {
        source: isRosterMember ? 'Roster' : 'Form',
        // eslint-disable-next-line no-underscore-dangle
        member: member?._raw,
        registrationType: formFilled,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()

  return (
    <div className="p-2 flex flex-col gap-4 font-rubik text-left">
      <h1 className="w-full text-left text-dark-blue-100 font-rubik text-xl font-medium mb-2">
        {title}{' '}
      </h1>
      <div className="bg-green-10 rounded-lg p-2 flex justify-start items-center gap-4">
        <Check size={24} className="text-green-100" />
        <div className="font-rubik text-dark-blue-100 text-base">
          <h2 className="font-medium">Success!</h2>
          <p>{successMessage}</p>
        </div>
      </div>
      <div className="text-grey-main">
        <h2 className="text-lg">{headerMessage}</h2>
        <p className="text-base">{customMessage}</p>
        <div className="flex justify-between items-center gap-2 mt-4">
          {formFilled === 'primary' && setSelectedForm && (
            <PrimaryButton
              variant="outlined"
              startIcon={<Person2Outlined />}
              onClick={() =>
                setSelectedForm({
                  name: 'dependent',
                  member: primaryMember || member,
                  completed: false,
                  title: 'Adult dependent registration',
                })
              }
            >
              Add a dependent
            </PrimaryButton>
          )}
          {setSelectedForm && (
            <PrimaryButton
              variant="outlined"
              startIcon={<ChildCareOutlined />}
              onClick={() =>
                setSelectedForm({
                  name: 'child',
                  member: primaryMember || member,
                  completed: false,
                  title: 'Child registration',
                })
              }
            >
              {formFilled === 'child' ? 'Add another child' : 'Add a child'}
            </PrimaryButton>
          )}
          {formFilled === 'pdfGenerate' && (
            <>
              <PrimaryButton
                fullWidth
                variant="outlined"
                onClick={handleClose}
                startIcon={
                  <X className="w-6 h-6 rounded-full bg-blue-btn text-white hover:bg-blue-btn" />
                }
              >
                Close
              </PrimaryButton>
            </>
          )}
        </div>
        {formFilled === 'primary' && setSelectedForm && (
          <PrimaryButton
            type="button"
            fullWidth
            variant="contained"
            className="mb-4 capitalize mt-5"
            onClick={() => {
              member && navigate(`/member/${member.antaraId}`)
            }}
          >
            View Member Profile
          </PrimaryButton>
        )}
      </div>
    </div>
  )
}

export default SuccessPrompt
