/* eslint-disable */
import React, { useRef, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { DialogContent, Grid, ListItemButton, ListItemIcon, Stack, TextField } from '@mui/material'
import { SimpleDialogProps } from '../@types/cyber'
import { Client, useClientByNameLazyQuery } from '../generated/graphql'
import { ClientProps } from '../@types/clients'
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router'

function SimpleDialog({ onClose, selectedValue, open }: SimpleDialogProps) {
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState<{
    __typename?: "Client" | undefined;
    _id?: string | null | undefined;
    name: string;
  }[]>([])

  const navigation = useNavigate()

  const [recents, setRecents] = useState<string[]>([])
  const [getClients, { data, loading, error }] = useClientByNameLazyQuery();

  const textFiledRef = useRef<HTMLDivElement | null>(null)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string, id: string) => {
    navigation(`/clients/detail/${id}`)
    onClose(value)
  }


  const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value)
  }

  const searchWord = (word: string) => {
    if (textFiledRef.current) {
      const input = textFiledRef.current.children[1].children[0] as HTMLInputElement
      input.value = word
    }
    getClients({ variables: { name: word } })
    if (data) {
      setClients(data.clientByName)
    }
  }

  const test = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (!!!search.length) return
      if (!recents.includes(search)) {
        setRecents([...recents, search])
      }
      setTimeout(() => {
        getClients({ variables: { name: search } })
        if (data) {
          setClients(data.clientByName)
        }
      }, 500)
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle fontSize={25}>Selecionar Cliente</DialogTitle>
      <Grid padding={2}>
        <TextField
          ref={textFiledRef}
          id="standard-search"
          label="Nome do cliente..."
          type="search"
          variant="standard"
          autoFocus
          fullWidth
          onKeyUp={e => test(e)}
          disabled={loading}
          autoComplete="off"
          onChange={e => handleSearch(e)}
        />
      </Grid>
      <DialogContent style={{
        padding: 2
      }}>
        <List sx={{ pt: 0 }}>
          {!!recents.length && <ListItem><ListItemText><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pesquisas recentes</Typography></ListItemText></ListItem>}
          {!!recents.length && recents.map(word =>
            <ListItemButton onClick={() => searchWord(word)} key={word}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={word} sx={{ marginLeft: 1 }} />
            </ListItemButton>
          )}
          {data && <ListItem><ListItemText><Typography variant="h6" sx={{ fontWeight: 'bold' }}>Clientes</Typography></ListItemText></ListItem>}
          {data && data.clientByName.map(client => <ListItem button onClick={() => handleListItemClick(client.name, client._id!)} key={client._id!}>
            <ListItemText primary={client.name} />
          </ListItem>)}
          {data && data.clientByName.length === 0 && <ListItem><ListItemText primary='Nenhum cliente encontrado' /></ListItem>}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export const SimpleDialogDemo: React.FC<ClientProps> = ({ client }) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(client.name)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setSelectedValue(value)
  }

  return (
    <div>
      <Stack mt={2} direction='row' alignItems="center" justifyContent="space-between">
        <Typography variant="h3" >{selectedValue}</Typography>
        <Button variant='outlined' onClick={() => handleClickOpen()}>Alterar cliente</Button>
      </Stack>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}
