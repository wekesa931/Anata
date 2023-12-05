import React from 'react'
import { MenuItem, Menu, ListItemIcon, ListItemText } from '@mui/material'
import TasksIcon from '@mui/icons-material/ViewQuilt'
import WorkflowsIcon from '@mui/icons-material/Assignment'
import { useNavigate } from 'react-router-dom'

type FloatingMenuProps = {
  anchorEl: any
  open: boolean
  handleClose: () => void
}

function FloatingMenu({ anchorEl, open, handleClose }: FloatingMenuProps) {
  const navigate = useNavigate()
  const openLink = (link: string) => {
    navigate(link)
    handleClose()
  }
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            bgcolor: 'var(--dark-blue-100)',
            color: 'background.paper',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        },
      }}
    >
      <MenuItem
        className="hover:bg-greyscale-6 hover:text-white cursor-pointer px-4 py-2"
        onClick={() => openLink('/my-tasks')}
      >
        <ListItemIcon className="text-white">
          <TasksIcon />
        </ListItemIcon>
        <ListItemText> My Tasks</ListItemText>
      </MenuItem>
      <MenuItem
        className="hover:bg-greyscale-6 hover:text-white cursor-pointer px-4 py-2"
        onClick={() => openLink('/my-workflows')}
      >
        <ListItemIcon className="text-white">
          <WorkflowsIcon />
        </ListItemIcon>
        <ListItemText> My Workflows</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default FloatingMenu
