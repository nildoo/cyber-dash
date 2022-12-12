import React, { useMemo } from 'react'

import { useTheme } from '@mui/material/styles'
import { Box, Drawer, useMediaQuery } from '@mui/material'

import { drawerWidth } from '../../../config'
import DrawerContent from './DrawerContent/index'
import DrawerHeader from './DrawerHeader/index'
import MiniDrawerStyled from './MiniDrawerStyled'
import { PropsDrawer } from '../../../@types/cyber'

export const MainDrawer: React.FC<PropsDrawer> = ({ open, handleDrawerToggle, window }) => {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  const container = window !== undefined ? () => window?.document.body : undefined

  const drawerContent = useMemo(() => <DrawerContent />, [])
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open])

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD
        ? (<MiniDrawerStyled variant="permanent" open={open}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>)
        : (<Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {open && drawerHeader}
          {open && drawerContent}
        </Drawer>)
      }
    </Box>
  )
}