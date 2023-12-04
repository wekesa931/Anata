import { Button, Divider, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  Sidebar,
  Menu,
  MenuItem,
  // menuClasses,
  MenuItemStyles,
} from 'react-pro-sidebar'
import Header from 'src/assets/img/vector/header.svg?react'
import LogoutIcon from '@mui/icons-material/ExitToApp'
import TasksIcon from '@mui/icons-material/ViewQuilt'
import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import WorkflowsIcon from '@mui/icons-material/Assignment'
import RegisterIcon from '@mui/icons-material/PersonAddAlt1'
import MenuIcon from '@mui/icons-material/Menu'
import SearchInput from 'src/components/search'
import { useAuth } from 'src/context/auth'
import { useUser } from 'src/context/user'
import useAnalytics from 'src/hooks/analytics'
import HnTasksView from 'src/modules/tasks/views/hn-tasks-view'
import MemberRegistration from 'src/modules/member/views/member-registration/member-registration-selection'
import { useHomePageAnalytics } from 'src/views/dashboard/main/analytics'
import { useRegistrationForm } from 'src/context/member-registration'

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold">Coming Soon</h1>
      <p className="text-xl font-medium">We are working on this feature</p>
    </div>
  )
}

function RedirectToTasks({
  setActive,
}: {
  setActive: (active: Active) => void
}) {
  const { trackUserRedirectedToTasksPage } = useHomePageAnalytics()

  useEffect(() => {
    // capture the event when the user navigates to the dashboard
    trackUserRedirectedToTasksPage()
    setActive(Active.MY_TASKS)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Navigate to="/my-tasks" />
}

enum Active {
  MY_TASKS = '/my-tasks',
  MY_WORKFLOWS = '/my-workflows',
  REGISTER_MEMBER = '/register-member',
}

function MainDashboard() {
  const [toggled, setToggled] = useState(false)
  const user = useUser()
  const auth = useAuth()
  const { identifyUser } = useAnalytics()
  const { trackUserNavigatedToTasksPage } = useHomePageAnalytics()
  const [collapsed, setCollapsed] = useState(true)
  const { setIsFormOpen, isDataLoading } = useRegistrationForm()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [broken, setBroken] = useState(false)

  const location = useLocation()
  const [active, setActive] = useState<Active>(
    (location.pathname as Active) || Active.MY_TASKS
  )

  React.useEffect(() => {
    document.title = `Scribe Home`
  }, [])

  React.useEffect(() => {
    if (user) {
      identifyUser(user)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const menuItemStyles: MenuItemStyles = {
    button: {
      '&:hover': {
        backgroundColor: '#CFE6FC',
        color: 'white',
        ...(!collapsed
          ? {
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
            }
          : {
              borderRadius: '16px',
            }),
      },
    },
  }

  const activeStyle = `bg-primary-button text-white ${
    collapsed
      ? 'rounded-2xl transition ease-in-out delay-500'
      : 'rounded-tr-2xl rounded-br-2xl'
  }`

  return (
    <div className="flex h-screen font-rubik flex-col w-screen">
      <nav className="flex border-bottom items-center w-full h-14 sticky top-0 bg-dashboard-blue gap-4 p-4">
        <IconButton
          className="bg-blue-20 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuIcon />
        </IconButton>
        <Header />

        <div className="p-2 w-1/3">
          <SearchInput />
        </div>
      </nav>
      <div className="flex overflow-x-hidden">
        <Sidebar
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          backgroundColor="#EBF6FF"
          collapsed={collapsed}
          transitionDuration={500}
          className="border-none"
          width="240px"
          onBreakPoint={setBroken}
        >
          <div className="my-4 flex-1 text-sm">
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<TasksIcon className="align-bottom" />}
                onClick={() => {
                  setActive(Active.MY_TASKS)
                  trackUserNavigatedToTasksPage()
                }}
                className={
                  active === Active.MY_TASKS ? activeStyle : 'text-grey-main'
                }
                component={<NavLink to="/my-tasks" />}
              >
                My Tasks
              </MenuItem>
              <MenuItem
                icon={<WorkflowsIcon />}
                onClick={() => {
                  setActive(Active.MY_WORKFLOWS)
                }}
                className={
                  active === Active.MY_WORKFLOWS
                    ? activeStyle
                    : 'text-grey-main'
                }
                component={<NavLink to="/my-workflows" />}
              >
                My Workflows
              </MenuItem>
              {!collapsed ? (
                <p className="my-4 text-grey-main text-sm pl-5">Onboarding</p>
              ) : (
                <Divider />
              )}
              {!isDataLoading && (
                <MenuItem
                  icon={<RegisterIcon />}
                  onClick={() => {
                    setIsFormOpen(true)
                  }}
                  className="text-grey-main"
                >
                  Register new member
                </MenuItem>
              )}
            </Menu>
          </div>
          {!collapsed ? (
            <div className="fixed bottom-0">
              <div className="flex flex-col items-center gap-1 p-2 text-center">
                <p className="text-xs text-grey-main">
                  {user?.name || user?.fullName || user?.given_name} |{' '}
                  {user?.team}{' '}
                </p>
                <p className="text-xs text-dark-grey">{user?.email}</p>
                <Button
                  variant="outlined"
                  className="border-light-grey text-grey-main text-xs normal-case flex gap-2 mt-2"
                  onClick={auth.logout}
                >
                  Logout
                  <LogoutIcon />
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <Tooltip title="Logout">
                <IconButton onClick={auth.logout} className="fixed bottom-0">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Sidebar>
        <main className="w-full h-full overflow-scroll bg-dashboard-blue p-4">
          <div className="rounded-2xl bg-white p-6">
            <Routes>
              <Route
                path="/my-tasks"
                element={
                  <div className="h-screen">
                    <HnTasksView user={user} />
                  </div>
                }
              />
              <Route path="/my-workflows" element={<ComingSoon />} />
              <Route
                path="/register-member"
                element={
                  <div className="h-screen">
                    <MemberRegistration />
                  </div>
                }
              />
              <Route
                path="*"
                element={<RedirectToTasks setActive={setActive} />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainDashboard
