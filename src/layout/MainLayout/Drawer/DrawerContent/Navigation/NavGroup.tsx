import React from 'react'
/* eslint-disable */

import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

import { NavItem } from './NavItem'
import { NavGroupProps, StateReduxProps } from '../../../../../@types/cyber'
import { useAuth } from '../../../../../hooks/useAuth'

export const NavGroup: React.FC<NavGroupProps> = ({ item }) => {

  const { user, currentPathName } = useAuth()

  const menu = useSelector(({ menu }: { menu: StateReduxProps }) => menu)
  const { drawerOpen } = menu

  const consultantPathsIdNotAllowed = ['clients', 'dashboard', 'myaccount']


  const linksAllowed = user?.role === 'consultant' ? item.children.filter(i => consultantPathsIdNotAllowed.includes(i.id)) : item.children

  const navCollapse = linksAllowed.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />
      default:
        return <NavItem key={menuItem.id} item={menuItem} level={1} />
    }
  })

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  )
}

export default NavGroup
