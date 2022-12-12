/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, Grid, Input, InputAdornment, InputLabel } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAddMeetMutation } from '../generated/graphql'

export const AddMeet = ({
  openDialogMeet,
  setOpenDialogMeet,
  handleReload,
  campaingId
}: {
  openDialogMeet: boolean
  setOpenDialogMeet: (value: boolean) => void
  handleReload: () => void
  campaingId: string

}) => {

  const [addMeet, { data, loading, error }] = useAddMeetMutation()

  const [title, setTitle] = useState('')
  const [disabled, setDisabled] = useState(true)

  const [value, setValue] = useState<Dayjs | null>(dayjs());


  const handleAddMeet = () => {
    if (value) {
      addMeet({
        variables: {
          input: {
            campaingId,
            title,
            date: value.toISOString()
          }
        }
      })
    }
  }

  useEffect(() => {
    if (!title || !value) {
      setDisabled(true)
    } else {
      ''
      setDisabled(false)
    }
  }, [title, value])

  useEffect(() => {
    if (!loading || data) {
      setOpenDialogMeet(false)
      handleReload()
    }

    if (error) {
      console.log(error)
    }
  }, [data, loading, error])

  return (
    <div>
      <Dialog open={openDialogMeet} onClose={() => setOpenDialogMeet(false)} fullWidth>
        <DialogTitle fontSize={20} fontWeight="700">Dados da reunião</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
                <InputLabel htmlFor="link">Título</InputLabel>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  label="Data da reunião"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={() => setOpenDialogMeet(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAddMeet} disabled={disabled}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
