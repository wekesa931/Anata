import { DeleteOutline } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import FlexRow from 'src/components/layouts/flex-row'

type DeleteFormEntryProps = {
  title: string
  onDelete: () => void
  showDeleteButton: boolean
}

export default function DeleteFormEntry({
  title,
  onDelete,
  showDeleteButton,
}: DeleteFormEntryProps) {
  return (
    <FlexRow>
      <h3 className="text-dark-blue-100 text-base my-4 font-medium font-rubik">
        {' '}
        {title}{' '}
      </h3>
      {showDeleteButton && (
        <Button
          variant="text"
          onClick={onDelete}
          className="normal-case my-2 text-dark-red-100 text-base font-medium font-rubik"
          startIcon={<DeleteOutline />}
        >
          Delete
        </Button>
      )}
    </FlexRow>
  )
}
