import React from 'react'
import { X } from 'react-feather'
import { getMimeIcon } from 'src/modules/udm/utils'
import PrimaryButton from 'src/components/buttons/primary'

type UploadDrawerHeaderProps = {
  fileName?: string
  closeDrawer: () => void
}

export function UploadDrawerHeader({
  fileName,
  closeDrawer,
}: UploadDrawerHeaderProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl text-black font-medium">Upload New File</h3>
        <X className="w-6 h-6 cursor-pointer" onClick={closeDrawer} />
      </div>
      <div className="flex justify-between items-center">
        <p className="flex justify-start items-center gap-2">
          <span>{fileName && getMimeIcon(fileName)}</span>
          <span className="truncate text-base text-black">
            {fileName || 'No file selected'}
          </span>
        </p>
        <PrimaryButton variant="text" onClick={closeDrawer}>
          Cancel
        </PrimaryButton>
      </div>
    </div>
  )
}

export default UploadDrawerHeader
