import React, { useState, MouseEvent } from 'react'
import { useTheme } from '@mui/material/styles'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { useNavigate } from 'react-router'

const ProfileTab = ({ handleLogout }: { handleLogout: () => void }) => {
  const theme = useTheme()
  const navigation = useNavigate()

  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      {/* <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => {
        handleListItemClick(event, 1)
        navigation('/myaccount')
      }}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Minha conta" />
      </ListItemButton>

      {/* <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton> */}
      {/* <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton> */}
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  )
}

export default ProfileTab
