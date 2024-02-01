import React from 'react'
import { AlertCircle } from 'react-feather'
import PrimaryButton from 'src/components/buttons/primary'

type Props = {
  replaceFile: () => void
  closeDrawer: () => void
}

function ReplaceFile({ replaceFile, closeDrawer }: Props) {
  return (
    <div className=" font-rubik">
      <div className="flex flex-col items-center justify-center gap-1 font-medium">
        <AlertCircle className="w-[50px] h-[50px] text-orange-50" />
        <p className="text-dark-blue-70 text-center text-xl">
          Looks like this file already exists
        </p>
      </div>
      <div className="w-full flex items-center justify-center gap-8 mt-8">
        <PrimaryButton onClick={replaceFile}>Replace</PrimaryButton>
        <PrimaryButton onClick={closeDrawer} variant="outlined">
          Cancel
        </PrimaryButton>
      </div>
    </div>
  )
}

export default ReplaceFile
