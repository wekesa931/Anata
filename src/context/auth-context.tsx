import React, { useState } from 'react'
import { User } from '../types/user'

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
  const session = sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user') || '')
    : null
  const [currentUser, setCurrentUser] = useState(user || session)

  const logout = () => {
    sessionStorage.removeItem('user')
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
