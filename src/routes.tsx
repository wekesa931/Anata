import React, { useState } from 'react'
import {
  Route,
  Routes as SwitchRoutes,
  Navigate,
  useLocation,
  useParams,
  useNavigate,
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
import { Button } from '@mui/material'
import NotFoundIcon from 'src/assets/img/icons/404-not-found.svg'
import NoDataIcon from 'src/assets/img/icons/no-data.svg'
import { DataProvider } from 'src/storage/indexeddb/watermelon/db'
import { useAuth } from './context/auth'

function ProtectedRoute({ children }: any) {
  const user = useUser()
  const location = useLocation()
  const [recId, setRecId] = useState<string>()
  const params = useParams<any>()

  if (params.antaraId && recId !== params.antaraId) {
    setRecId(params.antaraId)
  }

  const currentPathWithParams = location.pathname + location.search

  return user ? (
    <>
      <DataProvider>
        <MemberProvider antaraId={recId}>
          <div className="flex h-full">
            <div className="flex flex-col flex-1 overflow-auto bg-white">
              {!!user.userAirtableId && <NavBar />}
              <div className="bg-white flex-1 h-dashboard-height">
                {children}
              </div>
            </div>
            <MemberRegistration />
          </div>
        </MemberProvider>
      </DataProvider>
    </>
  ) : (
    <Navigate to="/login" state={{ from: currentPathWithParams }} />
  )
}

function UserNotFound() {
  const user = useUser()
  const { logout } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
      <p className="text-3xl font-bold text-dark-blue-100">
        Your account does not exist in member db!
      </p>
      <NoDataIcon height="30%" />

      <p className="text-base text-dark-blue-100">
        Account email: {user?.email}
      </p>
      <p className="text-base text-dark-blue-100">
        Please contact your administrator
      </p>

      <div className="flex justify-center items-center gap-4">
        <Button variant="contained" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  )
}

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-2">
      <NotFoundIcon height="50%" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/member')}
      >
        Home page
      </Button>
    </div>
  )
}

function Routes() {
  return (
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
            path="/member/:antaraId"
            element={
              <ProtectedRoute>
                <BeneDashboard />
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
            path="/user-not-found"
            element={
              <ProtectedRoute>
                <UserNotFound />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </SwitchRoutes>
      </CallProvider>
    </FcmProvider>
  )
}

export default Routes
