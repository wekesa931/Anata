import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles'
import Login from './login/login.component'
import NavBar from './navbar/navbar.component'
import { useUser } from '../context/user-context'
import Sidebar from './sidebar/sidebar.component'
import Dashboard from './main-dashboard/main-dashboard'
import BeneDashboard from './bene-dashboard/bene-dashboard.component'
import history from '../constants/history'
import InteractionLogsForm from './bene-dashboard/actions/forms/interaction-logs/interaction-logs-form.component'
import { FcmProvider } from '../context/fcm/fcm.context'
import { CallProvider } from '../context/calls-context'
import CallFloatingBox from './bene-dashboard/actions/calls/callConsole.component'
// https://mui.com/guides/interoperability/#global-css

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          flexGrow: 0,
          fontFamily: 'Rubik',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.29,
          letterSpacing: '-0.28px',
          textAlign: 'left',
          color: 'var(--dark-blue-50)',
        },
      },
    },
  },
})

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <FcmProvider>
          <CallProvider>
            <ThemeProvider theme={theme}>
              <StyledEngineProvider injectFirst>
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
              </StyledEngineProvider>
            </ThemeProvider>
          </CallProvider>
        </FcmProvider>
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
                backgroundColor: 'var(--white)',
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
