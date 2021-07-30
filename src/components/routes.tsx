import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import Login from './login/login.component'
import NavBar from './navbar/navbar.component'
import { useUser } from '../context/user-context'
import Sidebar from './sidebar/sidebar.component'
import Dashboard from './main-dashboard/main-dashboard'
import BeneDashboard from './bene-dashboard/bene-dashboard.component'
import history from '../constants/history'
import InteractionLogsForm from './bene-dashboard/actions/forms/interaction-logs/interaction-logs-form.component'
import GlobalNotifications from './utils/notification/global-notifications'
import { CallProvider } from '../context/calls-context'
import CallFloatingBox from './bene-dashboard/actions/calls/callConsole.component'

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <GlobalNotifications>
          <CallProvider>
            <CallFloatingBox />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/">
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute exact path="/member">
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute exact path="/member/:recId">
              <BeneDashboard />
            </ProtectedRoute>
            <ProtectedRoute path="/member/:recId/interaction/create">
              <InteractionLogsForm />
            </ProtectedRoute>
          </CallProvider>
        </GlobalNotifications>
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
