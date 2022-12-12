import React from 'react'
import { Box, Grid } from '@mui/material'

import { LogoSection } from '../../components/Logo'
import { AuthFooter } from '../../components/cards/AuthFooter'

import AuthBackground from '../../assets/images/auth/AuthBackground'
import AuthCard from './AuthCard'
import { AuthWrapperProps } from '../../@types/cyber'

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => (
  <Box>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <LogoSection />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 200px)', md: 'calc(100vh - 134px)', overflow: 'hidden' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
)
