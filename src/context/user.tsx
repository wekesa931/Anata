import React from 'react'
import { useAuth } from 'src/context/auth'
import { User } from 'src/types/user'

const UserContext = React.createContext<User>(null)

function UserProvider(props: any) {
  return <UserContext.Provider value={useAuth().user} {...props} />
}

const useUser = () => React.useContext(UserContext)

export { UserProvider, useUser }
