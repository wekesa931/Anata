import { Button, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { Trash2 } from 'react-feather'

type ConfirmButtonProps = {
  onConfirm: () => Promise<void>
}

function ConfirmButton({ onConfirm }: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="ml-2.5 mb-2.5">
      {confirming && (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onConfirm().finally(() => {
              setConfirming(false)
            })
          }}
          className="rounded-[3px] py-0 px-2 font-rubik text-sm font-medium normal-case text-white "
        >
          Confirm
        </Button>
      )}
      {!confirming && (
        <Tooltip title="Delete Module">
          <Trash2
            className="pointer"
            onClick={() => setConfirming(true)}
            color="var(--white-50)"
            width={18}
            height={18}
          />
        </Tooltip>
      )}
    </div>
  )
}

export default ConfirmButton
