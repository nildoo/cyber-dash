import React, { useEffect, useRef, useState } from 'react'

import { alpha, useTheme } from '@mui/material/styles'
import { AppBar, Box, ClickAwayListener, IconButton, Paper, Popper, Toolbar } from '@mui/material'

import { MoreOutlined } from '@ant-design/icons'
import { Transitions } from '../../../../components/@extended/Transitions'
import Search from './Search'
import Profile from './Profile'

const MobileSection = () => {
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLAnchorElement | null>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return
    }

    setOpen(false)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current) {
        anchorRef.current.focus()
      }
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          component="span"
          disableRipple
          sx={{
            bgcolor: open ? 'grey.300' : 'grey.100'
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <MoreOutlined />
        </IconButton>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{
          width: '100%'
        }}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}` }}>
              <ClickAwayListener onClickAway={handleClose}>
                <AppBar color="inherit" sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Toolbar>
                    {/* <Search /> */}
                    <Profile />
                  </Toolbar>
                </AppBar>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}

export default MobileSection
