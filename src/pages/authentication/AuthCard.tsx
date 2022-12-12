import React from 'react'
import { alpha, Box, useTheme } from '@mui/material'
import { MainCard } from '../../components/MainCard'

const AuthCard = ({ children, ...other }: { children: JSX.Element, other?: any }) => {
  const theme = useTheme()

  return <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
    border={false}
    boxShadow
    shadow={`0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`}
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
  </MainCard>
}

export default AuthCard
