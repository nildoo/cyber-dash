import React from 'react'
import PropTypes from 'prop-types'

import { useTheme } from '@mui/material/styles'
import { Stack, Typography } from '@mui/material'

import { LogoCyber } from '../../../../components/Logo/Logo'
import DrawerHeaderStyled from './DrawerHeaderStyled'

const DrawerHeader = ({ open }: { open: boolean }) => {
  const theme = useTheme()

  return <DrawerHeaderStyled theme={theme} open={open}>
    <Stack direction="row" spacing={1} alignItems="center">
      <LogoCyber />
      <Typography fontSize={30} fontWeight="700">Cyber</Typography>
    </Stack>
  </DrawerHeaderStyled>
}

export default DrawerHeader
