import React, { useState } from 'react'

type MemberContextType = {
  member: any
  setCurrentMember: (member: any) => void
}

const MemberContext = React.createContext<MemberContextType>({
  member: null,
  setCurrentMember: (member: any) => {
    return member || null
  },
})

function MemberProvider({ member, children }: any) {
  const [currentMember, setCurrentMember] = useState(member)

  return (
    <MemberContext.Provider value={{ member: currentMember, setCurrentMember }}>
      {children}
    </MemberContext.Provider>
  )
}
const useMember = () => React.useContext(MemberContext)

export { MemberProvider, useMember }
