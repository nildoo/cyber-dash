/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { DataFormNetwork } from '../@types/clients';

const networks = ['Facebook', 'Instagram', 'Linkedin', 'TikTok', 'Twitter']

export const AddNetworkModal = ({
  opened,
  closeModal,
  handleAddNetWork,
  loading,
  medias
}: {
  opened: boolean,
  closeModal: () => void,
  handleAddNetWork: (dafaForm: DataFormNetwork) => void,
  loading: boolean,
  medias: string[]
}) => {

  const [network, setNetwork] = useState('')
  const [followers, setFollowers] = useState<number | null>(null)
  const [likes, setLikes] = useState<number | null>(null)
  const [comments, setComments] = useState<number | null>(null)
  const [reached, setReached] = useState<number | null>(null)
  const [profileViews, setProfileViews] = useState<number | null>(null)
  const [posts, setPosts] = useState<number | null>(null)

  const [dataform, setDataform] = useState<DataFormNetwork | null>(null)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (network && followers && likes && comments && reached && posts && profileViews) {
      setDataform({
        name: network,
        followers,
        likes,
        comments,
        reached,
        posts,
        profileViews
      })
      setDisabled(false)
    } else {
      setDisabled(true)
    }

  }, [network, followers, likes, comments, reached, posts, profileViews])

  const empty = !!!networks.filter(n => !medias.includes(n.toLowerCase())).map(a => a).length

  return (
    <div>
      <Dialog
        open={opened}
        onClose={closeModal}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        {!empty
          ? <>
            <DialogTitle id="dialog-title" sx={{ fontSize: 20 }}>
              Cadastrar rede social
            </DialogTitle>
            <DialogContent>
              <Grid item mt={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="network" sx={{ marginTop: 0.2, paddingTop: 0.2 }}>Rede social</InputLabel>
                  <Select
                    labelId="network"
                    id="network"
                    value={network}
                    label='Rede social'
                    onChange={e => setNetwork(e.target.value)}
                  >
                    {medias.length > 0 && networks.filter(n => !medias.includes(n.toLowerCase())).map(a => <MenuItem key={a} value={a.toLowerCase()}>{a}</MenuItem>)}
                    {medias.length === 0 && networks.map(n => <MenuItem key={n} value={n.toLowerCase()}>{n}</MenuItem>)}

                  </Select>
                </FormControl>
              </Grid>
              <Grid container mt={2} spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="followers" style={{ paddingTop: 0.5, marginTop: 0.2 }}>Seguidores</InputLabel>
                    <OutlinedInput
                      id="followers"
                      type="number"
                      value={followers}
                      name="followers"
                      onChange={e => setFollowers(parseInt(e.target.value))}
                      placeholder="Número inteiro ex: (23657) = 23k"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="likes" style={{ paddingTop: 2 }}>Curtidas</InputLabel>
                    <OutlinedInput
                      id="likes"
                      type="number"
                      value={likes}
                      name="likes"
                      onChange={e => setLikes(parseInt(e.target.value))}
                      placeholder="Número inteiro ex: (23657) = 23k"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="comments" style={{ paddingTop: 2 }}>Comentários</InputLabel>
                    <OutlinedInput
                      id="comments"
                      type="number"
                      value={comments}
                      name="comments"
                      onChange={e => setComments(parseInt(e.target.value))}
                      placeholder="Número inteiro ex: (23657) = 23k"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="reached" style={{ paddingTop: 2 }}>Contas alcançadas</InputLabel>
                    <OutlinedInput
                      id="reached"
                      type="number"
                      value={reached}
                      name="reached"
                      onChange={e => setReached(parseInt(e.target.value))}
                      placeholder="Número inteiro ex: (23657) = 23k"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="profileViews" style={{ paddingTop: 2 }}>Visitas ao perfil</InputLabel>
                    <OutlinedInput
                      id="profileViews"
                      type="number"
                      value={profileViews}
                      name="profileViews"
                      onChange={e => setProfileViews(parseInt(e.target.value))}
                      placeholder="Número inteiro ex: (23657) = 23k"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="posts" style={{ paddingTop: 2 }}>Posts</InputLabel>
                    <OutlinedInput
                      id="posts"
                      type="number"
                      value={posts}
                      name="posts"
                      onChange={e => setPosts(parseInt(e.target.value))}
                      placeholder="Número inteiro ex: (23657) = 23k"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Cancelar</Button>
              <Button onClick={() => {
                if (dataform === null) return
                handleAddNetWork(dataform)
              }} disabled={disabled || loading}>{loading ? 'Salvando...' : 'Cadastrar'}</Button>
            </DialogActions>
          </>
          : <DialogTitle id="dialog-title" sx={{ fontSize: 16 }} textAlign="center">
            Todas as redes sociais disponíveis cadastradas
          </DialogTitle>}
      </Dialog>
    </div>
  );
}

