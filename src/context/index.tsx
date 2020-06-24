import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { UserProvider } from './user-context'
import { AuthProvider } from './auth-context'
import theme from '../styles/theme'

const AppContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default AppContexts
