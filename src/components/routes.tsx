import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import Login from './login/login.component'
import NavBar from './navbar/navbar.component'
import { useUser } from '../context/user-context'
import Sidebar from './sidebar/sidebar.component'
import Dashboard from './main-dashboard/main-dashboard'
import PatientDashboard from './bene-dashboard/bene-dashboard.component'
import history from '../constants/history'

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path="/member">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path="/member/:recId">
          <PatientDashboard />
        </ProtectedRoute>
      </Switch>
    </Router>
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'hidden',
                backgroundColor: 'var(--nav-bg)',
              }}
            >
              <NavBar />
              <div className="dashboard-container">{children}</div>
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
