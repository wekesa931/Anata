import React, { useState } from 'react'

type DateSortContextType = {
  sort: 'desc' | 'asc'
  setSort: any
}

const DateSortContext = React.createContext<DateSortContextType>({
  sort: 'desc',
  setSort: (sort: string) => sort,
})

function DateSortProvider({ children }: any) {
  const [currentSort, setCurrentSort] = useState<'desc' | 'asc'>('desc')

  return (
    <DateSortContext.Provider
      value={{ sort: currentSort, setSort: setCurrentSort }}
    >
      {children}
    </DateSortContext.Provider>
  )
}
const useDateSort = () => React.useContext(DateSortContext)

export { DateSortProvider, useDateSort }
