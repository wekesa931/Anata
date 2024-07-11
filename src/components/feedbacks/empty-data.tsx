import React from 'react'
import EmptyDataIcon from 'src/assets/img/icons/empty-data.svg'

export function EmptyData({ title }: { title?: string }) {
  return (
    <div className="flex flex-col justify-start items-center font-rubik my-2">
      <EmptyDataIcon />
      <p className="text-base font-medium">No data</p>
      <p className="text-sm text-dark-blue-100">
        {' '}
        Looks like there are no {title || 'data'} for this member
      </p>
      <p>Please check back again later</p>
    </div>
  )
}

export default EmptyData
