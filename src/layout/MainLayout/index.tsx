/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@mui/material/styles'
import { Box, Toolbar, useMediaQuery } from '@mui/material'
import { openDrawer } from '../../store/reducers/menu'
import Header from './Header'
import { MainDrawer } from './Drawer'
import { StateReduxProps } from '../../@types/cyber'

const MainLayout = () => {
  const theme = useTheme()
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'))
  const dispatch = useDispatch()

  const { drawerOpen } = useSelector(({ menu }: { menu: StateReduxProps }) => menu)

  const [open, setOpen] = useState(drawerOpen)
  const handleDrawerToggle = () => {
    setOpen(!open)
    dispatch(openDrawer({ drawerOpen: !open }))
  }

  useEffect(() => {
    setOpen(!matchDownLG)
    dispatch(openDrawer({ drawerOpen: !matchDownLG }))
  }, [matchDownLG])

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen)
  }, [drawerOpen])


  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 }, overflow: 'hidden' }}>
        <Toolbar />
        {/* <Breadcrumbs navigation={navigation} card={false} divider={true} /> */}
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
