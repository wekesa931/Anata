import React from 'react'
import { useAuth } from "./auth-context";

const UserContext = React.createContext({});

const UserProvider = (props: any) => (
  <UserContext.Provider value={useAuth().user} {...props} />
);

const useUser = () => React.useContext(UserContext)

export {UserProvider, useUser}