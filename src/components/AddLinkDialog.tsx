/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import { useAddLinkMutation } from '../generated/graphql'

export const AddLink = ({
  openDialogLink,
  setOpenDialogLink,
  handleReload,
  campaingId
}: {
  openDialogLink: boolean
  setOpenDialogLink: (value: boolean) => void
  handleReload: () => void
  campaingId: string

}) => {
  const [addLink, { data, loading, error }] = useAddLinkMutation()
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [disabled, setDisabled] = useState(true)


  const handleAddLink = () => {
    addLink({
      variables: {
        input: {
          id: campaingId,
          link,
          title
        }
      }
    })
  }

  useEffect(() => {
    if (!link || !title) {
      setDisabled(true)
    } else {
      ''
      setDisabled(false)
    }
  }, [link, title])

  useEffect(() => {
    if (!loading || data) {
      setOpenDialogLink(false)
      handleReload()
    }
  }, [data, loading])


  return (
    <div>
      <Dialog open={openDialogLink} onClose={() => setOpenDialogLink(false)} fullWidth>
        <DialogTitle fontSize={20} fontWeight="700">Adicionar link</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
            <InputLabel htmlFor="link">Título</InputLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <InputLabel htmlFor="link">Link</InputLabel>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              startAdornment={<InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={() => setOpenDialogLink(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAddLink} disabled={disabled}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
