import React from 'react'
import {
  Route,
  BrowserRouter,
  Routes as SwitchRoutes,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { FcmProvider } from 'src/context/fcm/fcm.context'
import { CallProvider } from 'src/context/calls'
import CallConsole from 'src/modules/comms/calls/components/call-console'
import Login from 'src/views/login'
import { useUser } from 'src/context/user'
import NavBar from 'src/components/navbar'
import MainDashboard from 'src/views/dashboard/main'
import BeneDashboard from 'src/views/dashboard/bene'

function ProtectedRoute({ children }: any) {
  const user = useUser()
  const location = useLocation()

  return user ? (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 overflow-auto bg-white">
        <NavBar />
        <div className="bg-white flex-1 h-dashboard-height">{children}</div>
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
          <CallConsole />
          <SwitchRoutes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member"
              element={
                <ProtectedRoute>
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/:recId"
              element={
                <ProtectedRoute>
                  <BeneDashboard />
                </ProtectedRoute>
              }
            />
          </SwitchRoutes>
        </CallProvider>
      </FcmProvider>
    </BrowserRouter>
  )
}

export default Routes
