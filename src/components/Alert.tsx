/* eslint-disable */
import React, { SyntheticEvent, useState } from 'react'
import { Alert, Snackbar } from "@mui/material"

export const MyAlert: React.FC<AlertProps> = ({ openAlert, setOpenAlert, alert }) => {

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ 'horizontal': 'left', 'vertical': 'bottom' }}>
    <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%', fontSize: 14 }}>
      {alert.message}
    </Alert>
  </Snackbar>
}
