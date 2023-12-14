import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { ArrowDropDown } from '@mui/icons-material'

function ProgressBar({ value, target }: any) {
  const normalizedValue = (value / target) * 100

  return (
    <div className="pt-1 w-full">
      <div className="flex items-center justify-between text-xs text-black mt-2">
        <div
          className="flex justify-end"
          style={{
            width: `calc(25% + ${normalizedValue / 2}% + 12px)`,
          }}
        >
          {normalizedValue < 100 && (
            <p className="flex items-center ">
              Your progress: {Number(normalizedValue).toFixed(0)} %{' '}
              <ArrowDropDown className="text-green-100" />
            </p>
          )}
        </div>
        <div
          style={{
            width: `calc(25% - 12px)`,
            transform: `translateX(calc(-25% + 12px))`,
          }}
        >
          <p className="flex items-center">
            <ArrowDropDown className="text-orange-50" /> Target: 100%
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-1/2 h-1 bg-gray-200 rounded mt-2">
          <LinearProgress
            variant="determinate"
            value={normalizedValue}
            className="rounded h-1 bg-[#D9D9D9]"
            color="primary"
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#34C759',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
