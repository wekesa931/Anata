import React, { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useGoogleLogout } from 'react-google-login'
import storage from '../helpers/secure-storage'
import { User } from '../types/user'
import keys from '../constants/storage'

dayjs.extend(utc)
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
  let loggedInUser = storage.get(keys.USER)
  const { signOut } = useGoogleLogout({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
  })

  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser)
  }

  const [currentUser, setCurrentUser] = useState(user || loggedInUser)
  const logout = () => {
    storage.removeAll()
    setCurrentUser(null)
    signOut()
  }

  return (
    <AuthContext.Provider value={{ user: currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
// @adams132021bf
