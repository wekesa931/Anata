import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { File } from 'react-feather'
import ListItemButton from '@mui/material/ListItemButton'

type Props = {
  title: string
  subtitle: string
  onClick: () => void
}

function DocListItem({ title, subtitle, onClick }: Props) {
  return (
    <div className="flex items-center border-b-1 border-b border-dark-blue-20 mt-1">
      <ListItemButton onClick={onClick} className="h-[50px] pl-0">
        <ListItem className="gap-2">
          <File width={25} height={20} className="text-dark-blue-50" />
          <ListItemText
            primary={<span className="text-dark-blue-100">{title}</span>}
            secondary={
              <span className="text-dark-blue-50 text-sm break-words">
                {subtitle}
              </span>
            }
          />
        </ListItem>
      </ListItemButton>
    </div>
  )
}

export default DocListItem
