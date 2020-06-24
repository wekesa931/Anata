import React from 'react'
import { useAuth } from './auth-context'
import { User } from '../types/user'

const UserContext = React.createContext<User>(null)

const UserProvider = (props: any) => (
  <UserContext.Provider value={useAuth().user} {...props} />
)

const useUser = () => React.useContext(UserContext)

export { UserProvider, useUser }
