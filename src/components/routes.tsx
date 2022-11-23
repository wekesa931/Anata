import React from 'react'
import {
  Route,
  BrowserRouter,
  Routes as SwitchRoutes,
  Navigate,
  useLocation,
} from 'react-router-dom'
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

function ProtectedRoute({ children }: any) {
  const user = useUser()
  const location = useLocation()

  return user ? (
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
    <Navigate to="/login" state={{ from: location }} />
  )
}

function Routes() {
  return (
    <BrowserRouter>
      <FcmProvider>
        <CallProvider>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <CallFloatingBox />
              <SwitchRoutes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      {' '}
                      <Dashboard />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/member"
                  element={
                    <ProtectedRoute>
                      {' '}
                      <Dashboard />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/member/:recId"
                  element={
                    <ProtectedRoute>
                      {' '}
                      <BeneDashboard />{' '}
                    </ProtectedRoute>
                  }
                />
              </SwitchRoutes>
            </StyledEngineProvider>
          </ThemeProvider>
        </CallProvider>
      </FcmProvider>
    </BrowserRouter>
  )
}

export default Routes
