import React, { useState, MouseEvent } from 'react'
import { useTheme } from '@mui/material/styles'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import CommentOutlined from '@ant-design/icons/CommentOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined'

const SettingTab = () => {
  const theme = useTheme()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
    </List>
  )
}

export default SettingTab
