import React, { Fragment } from 'react'

import { useTheme } from '@mui/material/styles'
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import HeaderContent from './HeaderContent/index'
import AppBarStyled from './AppBarStyled'
import { HeaderProps } from '../../../@types/cyber'

const Header: React.FC<HeaderProps> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  const iconBackColor = 'grey.100'
  const iconBackColorOpen = 'grey.200'

  const mainHeader = (
    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  )

  return <Fragment>{
    !matchDownMD
      ? <AppBarStyled theme={theme} open={open} position="fixed" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{mainHeader}</AppBarStyled>
      : <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>{mainHeader}</AppBar>
  }</Fragment>
}

export default Header
