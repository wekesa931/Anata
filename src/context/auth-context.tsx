import React from 'react';

const AuthContext = React.createContext({user: null, logout: () => null});

function AuthProvider({ user, children }:any) {
  const logout = () => {
      // todo: clear the token in localStorage/cookier and the user data
      console.log('Logging out...');
  }
  return (
    <AuthContext.Provider value={{logout, user}}>{children}</AuthContext.Provider>
  )
}
const useAuth = () => React.useContext(AuthContext)
export {AuthProvider, useAuth}