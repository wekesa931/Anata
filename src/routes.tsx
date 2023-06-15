import React, { useState } from 'react'
import {
  Route,
  BrowserRouter,
  Routes as SwitchRoutes,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom'
import { FcmProvider } from 'src/context/fcm/fcm.context'
import { CallProvider } from 'src/context/calls'
import CallConsole from 'src/modules/comms/calls/components/call-console'
import Login from 'src/views/login'
import { useUser } from 'src/context/user'
import NavBar from 'src/components/navbar'
import MainDashboard from 'src/views/dashboard/main'
import BeneDashboard from 'src/views/dashboard/bene'
import MemberRegistration from 'src/modules/member/views/member-registration'
import { MemberProvider } from 'src/context/member'

function ProtectedRoute({ children }: any) {
  const user = useUser()
  const location = useLocation()
  const [recId, setRecId] = useState<string>()
  const params = useParams<any>()

  if (params.antaraId && recId !== params.antaraId) {
    setRecId(params.antaraId)
  }

  return user ? (
    <>
      <MemberProvider antaraId={recId}>
        <div className="flex h-full">
          <div className="flex flex-col flex-1 overflow-auto bg-white">
            <NavBar />
            <div className="bg-white flex-1 h-dashboard-height">{children}</div>
          </div>
          <MemberRegistration />
        </div>
      </MemberProvider>
    </>
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
              path="/member/:antaraId"
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
