import React from 'react'

export function FilterButton({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`unset px-8 py-1 rounded-2xl flex-grow text-sm font-medium border border-dark-blue-20 ${
        active
          ? 'bg-blue-10 text-blue-100 border-blue-100'
          : 'bg-white text-dark-blue-50'
      }`}
    >
      {children}
    </button>
  )
}

export default FilterButton
