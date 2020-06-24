import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from './login/login.component'
import Dashboard from '../pages/dashboard/dashboard'
import NavBar from './navbar/navbar.component'
import PatientDashboard from './patient-dashboard/patient-dashboard.component'
import { useUser } from '../context/user-context'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path="/member/:recId">
          <PatientDashboard />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  )
}

function ProtectedRoute({ children, ...rest }: any) {
  const user = useUser()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <>
            <NavBar />
            {children}
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default Routes
