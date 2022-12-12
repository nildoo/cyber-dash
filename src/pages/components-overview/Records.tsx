import React from 'react'
import { Typography, Box, Paper, Card, CardContent, Grid } from '@mui/material'

export default function Records () {
  return <Box>
    <Paper sx={{ padding: 2 }}>
      <Typography component='h4' variant='h4'>
        Cadastros
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={2} mt={2}>
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography component='h6' variant='h6' fontSize={35}>
                +
              </Typography>
              <Typography component='h6' variant='h6' fontSize={20} textAlign="center" whiteSpace="nowrap">
                Rede social
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3} lg={2} mt={2}>
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography component='h6' variant='h6' fontSize={35}>
                +
              </Typography>
              <Typography component='h6' variant='h6' fontSize={20} textAlign="center" whiteSpace="nowrap">
                Tipo de campanha
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  </Box >
}
