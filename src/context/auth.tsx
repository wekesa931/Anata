import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import storage from 'src/storage/secure-storage'
import { User } from 'src/types/user'
import keys from 'src/config/constants'
import useAntaraStaff from 'src/hooks/antara-staff.hook'
import { logError } from 'src/utils/logging/logger'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { toTitleCase } from 'src/utils/text-utils'

dayjs.extend(utc)
type AuthContextType = {
  user: User
  setCurrentUser: (user: User) => void
  logout: () => Promise<void>
  isLoggedIn: () => boolean
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setCurrentUser: (user: any) => {
    return user || null
  },
  logout: () => Promise.resolve(),
  isLoggedIn: () => false,
})

type Props = {
  user?: User
  children: React.ReactNode
}

function AuthProvider({ user, children }: Props) {
  let loggedInUser = storage.get(keys.USER)
  const navigate = useNavigate()

  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser)
  }

  const { getStaffByUser } = useAntaraStaff()
  const [currentUser, setCurrentUser] = useState(user || loggedInUser)
  const logout = async () => {
    storage.removeAll()
    setCurrentUser(null)
    googleLogout()
    navigate('/login')
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

  useEffect(() => {
    if (currentUser && !currentUser.userAirtableId && currentUser.email) {
      getStaffByUser(currentUser)
        .then((data) => {
          if (data) {
            const updatedUser = {
              ...currentUser,
              userAirtableId: data?.atRecordId,
              fullName: data?.fullName,
              team: toTitleCase(data?.team),
            }
            setCurrentUser(updatedUser)
            storage.set(keys.USER, JSON.stringify(updatedUser))
          } else {
            navigate('/user-not-found')
          }
        })
        .catch((e) => {
          logError(e)
          logout()
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
// @adams132021bf
