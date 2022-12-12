import React from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import AuthLogin from './auth-forms/AuthLogin'
import { AuthWrapper } from './AuthWrapper'

const Login: React.FC<{}> = (): JSX.Element => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Login</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
)

export default Login
