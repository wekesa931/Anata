import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useGoogleLogout } from 'react-google-login'
import storage from '../helpers/secure-storage'
import { User } from '../types/user'
import keys from '../constants/storage'
import airtableFetch from '../resources/airtable-fetch'

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
  useEffect(() => {
    if (currentUser) {
      let userAirtableId = null
      airtableFetch(
        `team/list?filterByFormula=FIND("${currentUser.email}", {Email})&fields[]=Record ID`
      ).then((res) => {
        if (typeof res === 'object' && !Array.isArray(res) && res !== null) {
          Object.keys(res).forEach((key) => {
            if (/^rec\w+/.test(key)) {
              userAirtableId = key
            }
          })
          setCurrentUser({ ...currentUser, userAirtableId })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <AuthContext.Provider
      value={{ user: currentUser, setCurrentUser, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
// @adams132021bf
