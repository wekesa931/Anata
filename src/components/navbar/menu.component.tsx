import React from 'react'
import {
  MenuItem,
  Menu,
  Avatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSidebar } from 'src/context/sidebar'
import analytics from 'src/config/analytics'
import config from 'src/config/hnos_views'
import { useUser } from 'src/context/user'
import MenuItems from './menu.items'

type FloatingMenuProps = {
  anchorEl: any
  open: boolean
  handleClose: () => void
}

function FloatingMenu({ anchorEl, open, handleClose }: FloatingMenuProps) {
  const { handleOnClick, activeIndex } = useSidebar()
  const { iframes } = config
  const user = useUser()

  const navigate = useNavigate()
  const { pathname: path } = useLocation()

  const customizedView = (name: any) => {
    if (user && iframes && iframes[user?.email] && iframes[user?.email][name]) {
      return iframes[user.email][name]
    }
    return iframes && iframes.default[name]
  }

  let items: any = []
  if (path === '/') {
    items = MenuItems
    items.map((item: any) => {
      if (item.name !== 'Tasks') {
        // eslint-disable-next-line no-param-reassign
        item.rootUrl = `https://airtable.com/embed/${customizedView(
          item.name
        )}?viewControls=on`
      }
      return item
    })
  }

  const handleMenuClick = (item: any, index: number) => {
    analytics.page({
      title: `Main Dashboard: ${item.name}`,
    })
    handleOnClick(index)
    // navigate to the menu
    path.includes('member') && navigate('/')
    handleClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
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
      }}
    >
      {MenuItems.map((item: any, index: any) => {
        return (
          <MenuItem
            key={`menu-item-${index}`}
            sx={{
              '&:hover': {
                backgroundColor: 'var(--greyscale-6)',
                color: 'var(--white)',
              },
              padding: '0.5rem 1rem',
            }}
            onClick={() => {
              handleMenuClick(item, index)
            }}
            selected={activeIndex === index}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {item?.icon || <Avatar />}
            </ListItemIcon>
            <ListItemText> {item?.name}</ListItemText>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default FloatingMenu
