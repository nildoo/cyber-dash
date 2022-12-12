/* eslint-disable */
import React, { useState } from 'react'
import { TeamOutlined, BarChartOutlined } from '@ant-design/icons'
import { Paper, Typography, Stack, Grid, Box } from '@mui/material'
import { useGetTotalCampaingsQuery, useGetTotalClientsQuery } from '../../generated/graphql'

const DashboardDefault = () => {

  const { data: totalClients } = useGetTotalClientsQuery()
  const { data: totalCampaings } = useGetTotalCampaingsQuery()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ padding: 3 }}>
          <Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography fontSize={16}>Total de clientes</Typography>
              <Box>
                <TeamOutlined style={{ fontSize: 30 }} />
              </Box>
            </Stack>
            <Typography fontSize={40} fontWeight="700">{totalClients?.totalClients}</Typography>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ padding: 3 }}>
          <Stack>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Typography fontSize={16}>Total de campanhas</Typography>
              <Box>
                <BarChartOutlined style={{ fontSize: 30 }} />
              </Box>
            </Stack>
            <Typography fontSize={40} fontWeight="700">{totalCampaings?.totalCampaings}</Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DashboardDefault
