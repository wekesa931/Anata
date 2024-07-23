import React from 'react'
import type { Member } from 'src/modules/member/db/models'
import SearchField from 'src/components/forms/fields/search'
import { useMemberSearch } from 'src/hooks/members-search'
import type { V2MemberType } from 'src/modules/member/types'
import { NextButton, PreviousButton } from 'src/components/buttons/primary'
import { useRegistrationData } from 'src/modules/member/hooks/registration'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import { useMember } from 'src/context/member'

type PrimaryMemberSearchProps = {
  setPrimaryMember: (value: Member) => void
  handleCloseForm: () => void | Promise<void>
}

export default function PrimaryMemberSearch({
  setPrimaryMember,
  handleCloseForm,
}: PrimaryMemberSearchProps) {
  const { querySearch } = useMemberSearch()
  const { createMemberInstance } = useRegistrationData()
  const { notify } = useNotifications()
  const { member } = useMember()

  const v =
    member?.isMinor || !!member?.hasPrimary
      ? {}
      : {
          displayName: member?.displayName,
          antaraId: member?.antaraId,
        }

  const initialValue = v as V2MemberType

  const handleChange = (value: V2MemberType) => {
    if (value) {
      createMemberInstance(null, value, [])
        .then((newPrimary) => {
          setPrimaryMember(newPrimary)
        })
        .catch((error) => {
          logError(error)
          notify('An error occurred while selecting a primary member')
        })
    }
  }

  const handleNext = () => {
    if (member) {
      setPrimaryMember(member)
    }
  }

  return (
    <div>
      <SearchField
        label="Primary member"
        search={querySearch}
        handleChange={handleChange}
        initialValue={initialValue}
      />

      <div className="flex justify-between gap-4 mt-6 grow-0">
        <PreviousButton
          type="button"
          variant="outlined"
          onClick={handleCloseForm}
        >
          {' '}
          Previous{' '}
        </PreviousButton>
        <NextButton type="button" onClick={handleNext}>
          Next
        </NextButton>
      </div>
    </div>
  )
}
