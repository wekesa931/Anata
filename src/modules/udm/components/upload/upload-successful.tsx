import React from 'react'
import { CheckCircle } from 'react-feather'
import PrimaryButton from 'src/components/buttons/primary'

type Props = {
  closeDrawer: () => void
}

function UploadSuccessful({ closeDrawer }: Props) {
  return (
    <div className="flex flex-col mt-2.5 items-center justify-center font-rubik gap-2 text-center">
      <CheckCircle className="w-12 h-12 text-green-100" />
      <p className="text-sm text-dark-blue-70 font-medium ">
        Upload Successful
      </p>
      <p className="text-sm text-dark-blue-70">
        Your document has been uploaded successfully
      </p>
      <PrimaryButton variant="outlined" onClick={closeDrawer}>
        Close
      </PrimaryButton>
    </div>
  )
}

export default UploadSuccessful
