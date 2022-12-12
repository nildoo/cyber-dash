/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, Grid, Input, InputLabel, Typography } from '@mui/material';
import { ConsultantData } from '../@types/consultants'
import { useUdpatePasswordMutation } from '../generated/graphql'

export const ConsultantDetailDialog = ({
  opened,
  setModalStatus,
  consultant,
  handleReload
}: {
  opened: boolean,
  setModalStatus: (value: boolean) => void,
  consultant: ConsultantData
  handleReload: () => void
}) => {

  const [updatePassword, { data, loading, error }] = useUdpatePasswordMutation()

  const [disabled, setDisabled] = useState(true)
  const [password, setPassword] = useState('')
  const [editPasswordMode, setEditPasswordMode] = useState(false)


  const handleSubmit = () => {
    updatePassword({
      variables: {
        input: {
          consultantId: consultant.id,
          password,
        }
      }
    })

  }

  useEffect(() => {
    if (!loading && data) {
      setModalStatus(false)
      handleReload()
    }
  }, [loading, data])


  useEffect(() => {
    if (!password) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [password])

  return (
    <div>
      <Dialog
        open={opened}
        onClose={() => setModalStatus(false)}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="dialog-title" sx={{ fontSize: 24 }} fontWeight="700">
          Consultor
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant='overline'>
                Consultor:
              </Typography>
              <Typography variant='h5'>
                {consultant.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='overline'>
                Email:
              </Typography>
              <Typography variant='h5'>
                {consultant.email}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Typography variant='overline'>
                Cargo:
              </Typography>
              <Typography variant='h5'>
                {consultant.office}
              </Typography>
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} variant='outlined' onClick={() => setEditPasswordMode(!editPasswordMode)}>{editPasswordMode ? 'Cancelar edição' : 'Alterar senha'}</Button>
          {editPasswordMode && <Grid item xs={12} sm={8} mt={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="password">Nova senha</InputLabel>
              <Input
                id="title"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Grid>}
        </DialogContent>
        {editPasswordMode && <DialogActions>
          <Button onClick={() => setModalStatus(false)}>Cancelar</Button>
          <Button onClick={() => handleSubmit()} disabled={disabled}>Salvar</Button>
        </DialogActions>}
      </Dialog>
    </div >
  );
}

