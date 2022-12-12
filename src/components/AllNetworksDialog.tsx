/* eslint-disable */
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { IResult } from '../@types/network'

export const AllNetworks = ({
  openDialog,
  setOpenDialog,
  networks,
  type
}: {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  networks: IResult[]
  type: string
}) => {

  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle fontSize={20} fontWeight="700">{type}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {networks.map(net => <Grid item key={net._id} xs={12} md={6}>
              <Paper sx={{ padding: 2 }} >
                <Typography variant='overline'>{type}</Typography>
                <Typography variant='subtitle1' fontSize={16}>{net.title}</Typography>
                <Stack flexDirection='row' gap={1} alignItems="center" justifyContent="space-between">
                  <Typography variant='subtitle1' fontSize={30}>{net.value}</Typography>
                </Stack>
              </Paper>
            </Grid>)}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
