import { Button, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import Header from 'src/assets/img/vector/header.svg'
import LogoutIcon from '@mui/icons-material/ExitToApp'
import TasksIcon from '@mui/icons-material/ViewQuilt'
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import WorkflowsIcon from '@mui/icons-material/Assignment'
import RegisterIcon from '@mui/icons-material/PersonAddAlt1'
import MenuIcon from '@mui/icons-material/Menu'
import CallSplitIcon from '@mui/icons-material/CallSplit'
import SearchInput from 'src/components/search'
import { useAuth } from 'src/context/auth'
import { useUser } from 'src/context/user'
import useAnalytics from 'src/hooks/analytics'
import HnTasksView from 'src/modules/tasks/views/hn-tasks-view'
import MemberRegistration from 'src/modules/member/views/member-registration/member-registration-selection'
import { useHomePageAnalytics } from 'src/views/dashboard/main/analytics'
import { useRegistrationForm } from 'src/context/member-registration'
import WorkflowView from 'src/modules/workflows/views/workflow-dashboard-view'
import EngagementsView from 'src/modules/engagements/views/engagements-dashboard-view'

function RedirectToTasks({
  setActive,
}: {
  setActive: (active: Active) => void
}) {
  const { trackUserRedirectedToTasksPage } = useHomePageAnalytics()
  const user = useUser()

  useEffect(() => {
    // capture the event when the user navigates to the dashboard
    if (user) {
      trackUserRedirectedToTasksPage()
      setActive(Active.MY_TASKS)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return <Navigate to="/my-tasks" />
}

enum Active {
  MY_TASKS = '/my-tasks',
  MY_WORKFLOWS = '/my-workflows',
  REGISTER_MEMBER = '/register-member',
  MY_RECOMMENDATIONS = '/my-recommendations',
}

function MainDashboard() {
  const [toggled, setToggled] = useState(false)
  const user = useUser()
  const auth = useAuth()
  const { identifyUser } = useAnalytics()
  const {
    trackUserNavigatedToTasksPage,
    trackUserNavigatedToWorkflowsPage,
    trackUserNavigatedToEngagementsPage,
    trackUserOpenedRegistration,
    trackUserLoggedOut,
  } = useHomePageAnalytics()
  const [collapsed, setCollapsed] = useState(true)
  const { isDataLoading } = useRegistrationForm()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [broken, setBroken] = useState(false)
  const [sidebarLoaded, setSidebarLoaded] = useState(false)

  const location = useLocation()
  const [active, setActive] = useState<Active>(
    (location.pathname as Active) || Active.MY_TASKS
  )

  React.useEffect(() => {
    setActive(location.pathname as Active)
  }, [location])

  React.useEffect(() => {
    document.title = `Scribe Home`
  }, [])

  React.useEffect(() => {
    if (user) {
      identifyUser(user)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  React.useEffect(() => {
    let timeout: NodeJS.Timeout

    if (collapsed) {
      timeout = setTimeout(() => {
        setSidebarLoaded(false)
      }, 150)
    } else {
      timeout = setTimeout(() => {
        setSidebarLoaded(true)
      }, 150)
    }

    return () => clearTimeout(timeout)
  }, [collapsed])
  const activeStyle = (active: boolean) => {
    const globalStyles = collapsed
      ? 'rounded-2xl w-[90%] ml-[6px]'
      : 'rounded-2xl  w-[95%] ml-[6px]'

    const activeStyles = active
      ? 'bg-primary-button text-white mb-2 hover:bg-primary-button'
      : 'text-grey-main mb-2 hover:bg-blue-20'

    return `${activeStyles} ${globalStyles}`
  }

  const logout = () => {
    auth.logout()
    trackUserLoggedOut()
  }
  const navigate = useNavigate()

  return (
    <div className="flex h-full font-rubik flex-col w-full overflow-x-hidden relative ">
      <nav className="flex border-bottom items-center w-full h-14 sticky top-0 bg-dashboard-blue gap-4 py-[2%] px-4 ml-1.5 z-20">
        <IconButton
          className="bg-blue-20 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuIcon />
        </IconButton>
        <Header className="ml-4" />

        <div className="p-2 w-1/3">
          <SearchInput source="main" />
        </div>
      </nav>
      <div className="flex overflow-x-hidden h-full z-10">
        <Sidebar
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          backgroundColor="#EBF6FF"
          collapsed={collapsed}
          transitionDuration={500}
          className="border-none"
          width="254px"
          onBreakPoint={setBroken}
        >
          <div className="my-4 flex-1 text-sm">
            <Menu>
              <MenuItem
                icon={<TasksIcon className="align-bottom" />}
                onClick={() => {
                  setActive(Active.MY_TASKS)
                  trackUserNavigatedToTasksPage()
                }}
                className={activeStyle(active === Active.MY_TASKS)}
                component={<NavLink to="/my-tasks" />}
              >
                My Tasks
              </MenuItem>
              <MenuItem
                icon={<WorkflowsIcon />}
                onClick={() => {
                  setActive(Active.MY_WORKFLOWS)
                  trackUserNavigatedToWorkflowsPage()
                }}
                className={activeStyle(active === Active.MY_WORKFLOWS)}
                component={<NavLink to="/my-workflows" />}
              >
                My Workflows
              </MenuItem>
              <MenuItem
                icon={<CallSplitIcon />}
                onClick={() => {
                  setActive(Active.MY_RECOMMENDATIONS)
                  trackUserNavigatedToEngagementsPage()
                }}
                className={activeStyle(active === Active.MY_RECOMMENDATIONS)}
                component={<NavLink to="/my-recommendations" />}
              >
                My Recommendations
              </MenuItem>

              {!isDataLoading && (
                <MenuItem
                  icon={<RegisterIcon />}
                  onClick={() => {
                    navigate('/register-member?register=true')
                    trackUserOpenedRegistration()
                  }}
                  className={`text-grey-main mb-2 hover:bg-blue-20  ml-1.5 rounded-2xl ${
                    collapsed ? 'w-[90%]' : 'w-[95%] hover:w-[95%]'
                  }`}
                >
                  Register new member
                </MenuItem>
              )}
            </Menu>
          </div>
          {!collapsed ? (
            <div
              className={`fixed bottom-0 mb-2 w-64 ${
                sidebarLoaded ? 'transition-all duration-100' : 'hidden'
              }`}
            >
              <div className="flex flex-col items-center gap-1 p-2 text-center">
                <p className="text-xs text-grey-main">
                  {user?.name || user?.fullName || user?.given_name} |{' '}
                  {user?.team}{' '}
                </p>
                <p className="text-xs text-dark-grey">{user?.email}</p>
                <Button
                  variant="outlined"
                  className="border-light-grey text-grey-main text-xs normal-case flex gap-2 mt-2"
                  onClick={logout}
                >
                  Logout
                  <LogoutIcon />
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <Tooltip title="Logout">
                <IconButton onClick={logout} className="fixed bottom-0 mb-2">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </Sidebar>
        <main className="w-full h-full overflow-scroll bg-dashboard-blue px-4">
          <div className="rounded-2xl bg-white p-4 h-full overflow-scroll">
            <Routes>
              <Route
                path="/my-tasks"
                element={
                  <div className="h-full">
                    <HnTasksView user={user} />
                  </div>
                }
              />
              <Route
                path="/my-workflows"
                element={
                  <div className="h-full">
                    <WorkflowView user={user} />
                  </div>
                }
              />
              <Route
                path="/my-recommendations"
                element={
                  <div className="h-full">
                    <EngagementsView />
                  </div>
                }
              />
              <Route
                path="/register-member"
                element={
                  <div className="h-full">
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
