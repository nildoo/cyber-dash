/* eslint-disable */
import React from 'react'
import { Box } from '@mui/material'
import menuItems from '../../../../../menu-items'
import NavGroup from './NavGroup'

const Navigation = () => {

  const navGroups = menuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />
      default:
        return (
          <NavGroup key={item.id} item={item} />
        )
    }
  })

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>
}

export default Navigation
