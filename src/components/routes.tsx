import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from './login/login.component'
import Dashboard from '../pages/dashboard/dashboard'
import NavBar from './navbar/navbar.component'
import PatientDashboard from './patient-dashboard/patient-dashboard.component'
import { useUser } from '../context/user-context'
import Sidebar from './sidebar/sidebar.component'
import Forms from './forms/forms.component'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/">
          <h1>Members!</h1>
        </ProtectedRoute>
        <ProtectedRoute exact path="/bene/">
          <h1>Bene Dashboard</h1>
        </ProtectedRoute>
        <ProtectedRoute exact path="/tasks">
          <h1>Tasks!</h1>
        </ProtectedRoute>
        <ProtectedRoute exact path="/population">
          <h1>Population and charts</h1>
        </ProtectedRoute>
        <ProtectedRoute exact path="/forms">
          <Forms />
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
          <div className="d-flex" style={{ height: '100%' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
              <NavBar />
              <div className="dashboard">
                <div className="dashboard-container">{children}</div>
              </div>
            </div>
          </div>
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
