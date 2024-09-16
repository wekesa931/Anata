import React from 'react'
import CircleIcon from '@mui/icons-material/Circle'

import { getStatusColor } from 'src/modules/conditions/utils/statusUtils'

export function StatusLabel({ option }: any) {
  return (
    <div>
      <div
        className={`flex items-center mr-2 font-normal text-xs ${getStatusColor(
          option?.label
        )}`}
      >
        <h1 className="font-medium">{option?.label}:</h1>
        <CircleIcon
          className={` ${getStatusColor(option?.label)} w-3 h-3 ml-1 mr-1`}
        />
      </div>
    </div>
  )
}

export function Label({ option }: any) {
  return (
    <div className=" mr-2 font-normal text-xs text-[#666666] font-rubik">
      {option?.label}
    </div>
  )
}
