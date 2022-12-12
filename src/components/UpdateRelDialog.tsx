/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { DataFormNetwork } from '../@types/clients';

export const UpdateRelDialog = ({
  opened,
  closeModal,
  handleAddNetWork,
  loading,
  socialMedia,
}: {
  opened: boolean,
  closeModal: () => void,
  handleAddNetWork: (dafaForm: DataFormNetwork) => void,
  loading: boolean,
  socialMedia: string | undefined
}) => {

  const [followers, setFollowers] = useState<number | null>(null)
  const [likes, setLikes] = useState<number | null>(null)
  const [comments, setComments] = useState<number | null>(null)
  const [reached, setReached] = useState<number | null>(null)
  const [profileViews, setProfileViews] = useState<number | null>(null)
  const [posts, setPosts] = useState<number | null>(null)

  const [dataform, setDataform] = useState<DataFormNetwork | null>(null)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (followers && likes && comments && reached && profileViews && posts) {
      setDataform({
        name: socialMedia!.toLowerCase(),
        followers,
        likes,
        comments,
        reached,
        profileViews,
        posts
      })
      setDisabled(false)
    } else {
      setDisabled(true)
    }

  }, [followers, likes, comments, reached, profileViews, posts])
  ''
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
        <DialogTitle id="dialog-title" sx={{ fontSize: 20 }}>
          Atualizar rede social <Typography sx={{ textTransform: 'capitalize' }}>{socialMedia}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={0}>
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
          }} disabled={disabled || loading}>{loading ? 'Salvando...' : 'Atualizar'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

