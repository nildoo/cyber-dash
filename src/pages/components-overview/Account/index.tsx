/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Box, Typography, Grid } from "@mui/material"
import { useAuth } from "../../../hooks/useAuth"
import { useConsultantLazyQuery } from "../../../generated/graphql"

export default function MyAccount() {
  const { user } = useAuth()

  const offices = {
    social_media: 'Social Media',
    client_success: 'Sucesso do Cliente',
    designer: 'Designer',
    traffic: 'Tráfego',
    adverts: 'Anúncios'
  }

  return <Box>
    <Typography variant="h3">{user?.name}</Typography>
    <Typography variant="h6" color="primary">{user?.email}</Typography>
    <Grid mt={3}>
      <Typography variant="overline">cargo</Typography>
      <Typography variant="h5">{user?.role === 'consultant' ? offices[user.office as keyof typeof offices] : 'Administrador'}</Typography>
    </Grid>
  </Box>
}
