import React, { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useGoogleLogout } from 'react-google-login'
import storage from 'src/storage/secure-storage'
import { User } from 'src/types/user'
import keys from 'src/config/constants'

dayjs.extend(utc)
type AuthContextType = {
  user: User
  setCurrentUser: (user: User) => void
  logout: () => void
  isLoggedIn: () => boolean
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setCurrentUser: (user: any) => {
    return user || null
  },
  logout: () => null,
  isLoggedIn: () => false,
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

  const isLoggedIn = () => !!currentUser

  const providerValue = React.useMemo(
    () => ({
      user: currentUser,
      setCurrentUser,
      logout,
      isLoggedIn,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  )

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
// @adams132021bf
