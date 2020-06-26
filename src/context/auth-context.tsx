import React, { useState } from 'react'
import { User } from '../types/user'
import keys from '../constants/session-storage'

type AuthContextType = {
  user: User
  setCurrentUser: (user: User) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setCurrentUser: (user: any) => {
    return user || null
  },
  logout: () => null,
})

function AuthProvider({ user, children }: any) {
  const session = sessionStorage.getItem(keys.USER)
    ? JSON.parse(sessionStorage.getItem(keys.USER) || '')
    : null
  const [currentUser, setCurrentUser] = useState(user || session)

  const logout = () => {
    sessionStorage.removeItem(keys.USER)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ user: currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
