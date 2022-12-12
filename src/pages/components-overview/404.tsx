/* eslint-disable */
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router';

export default function Error404() {

  const navigation = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 110px)',
        flexDirection: 'column',
        backgroundColor: 'primary',
      }}
    >
      <Typography variant="h1" color='primary'>
        404
      </Typography>
      <Typography variant="h6" color='primary' sx={{ padding: 2, fontSize: 20 }}>
        Página não encontrada
      </Typography>
      <Button variant="contained" onClick={() => navigation(-1)}>Voltar</Button>
    </Box>
  );
}